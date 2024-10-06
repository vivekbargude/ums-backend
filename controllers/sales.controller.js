const { Product } = require('../models/inventory.model');
const { Sale } = require('../models/sales.model');

// Create a new sale and update inventory
exports.createSale = async (req, res) => {
    const { buyerName, productId, quantitySold, dateOfPurchase } = req.body;

    try {
        // Find the product in the inventory
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Check if enough quantity is available
        if (product.quantity < quantitySold) {
            return res.status(400).json({ error: 'Insufficient quantity in inventory' });
        }

        const totalsales = product.price*quantitySold;


        // Create a new sale
        const sale = new Sale({
            buyerName,
            product: product.name,
            quantitySold,
            dateOfPurchase: dateOfPurchase || Date.now(), // Use provided date or current date
            totalsales 
            
        });

        // Save the sale
        await sale.save();

        // Update the product quantity in inventory
        product.quantity -= quantitySold;
        await product.save();

        res.status(201).json({ message: 'Sale recorded and inventory updated', sale });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get the latest sales
exports.getLatestSales = async (req, res) => {
    try {
        // Fetch the sales sorted by dateOfPurchase in descending order (latest first)
        const latestSales = await Sale.find().sort({ dateOfPurchase: -1 }).limit(10);

        res.status(200).json(latestSales);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllProducts = async (req,res) => {

    try {
        // Fetch all products, but only return the ID, name, and quantity fields
        const products = await Product.find({});

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }


};


exports.getSalesAnalysis = async (req, res) => {
    try {
        console.log("hshdshsdahg");
        
        const salesData = await Sale.aggregate([
            {
                $group: {
                    _id: "$product",   // Group by product ID
                    totalQuantitySold: { $sum: "$quantitySold" },  // Sum up the quantities sold
                    salesDates: { $push: "$dateOfPurchase" } // Collect all sales dates for each product
                }
            },
            {
                $lookup: {
                    from: 'products',       // Join with the product collection
                    localField: '_id',      // Match the product ID
                    foreignField: '_id',
                    as: 'productInfo'       // Store the result in productInfo
                }
            },
            {
                $unwind: "$productInfo"   // Decompose productInfo array
            },
            {
                $project: {
                    _id: 0,  // Exclude the product ID from the response
                    productName: "$productInfo.name",  // Extract product name
                    totalQuantitySold: 1,  // Keep the total quantity sold
                    salesDates: 1          // Keep the sales dates
                }
            }
        ]);

        res.status(200).json(salesData);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getTodaysTotalSales = async (req, res) => {
    try {
        // Get the current date
        const today = new Date();
        
        // Get the start of today (midnight) and end of today (23:59:59)
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));
        
        // Find all sales that occurred today
        const sales = await Sale.find({
            dateOfPurchase: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        });

        // Calculate total sales price for today
        const totalSalesPrice = sales.reduce((total, sale) => {
            return total + (sale.totalsales || 0); // Assuming totalsales is calculated and stored in each sale
        }, 0);

        res.status(200).json({ totalSalesPrice });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};