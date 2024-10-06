const Contract = require('../models/contracts.model');
const {Sale} = require('../models/sales.model');
const {Product} = require('../models/inventory.model');

// Create a new contract
handleCreateNewContract = async (req, res) => {
  try {
    const { contractType, contractName, duration, details, additionalTerms, effectiveDate, endDate, status, partyDetails } = req.body;

    const newContract = new Contract({
      contractType,
      contractName,
      duration,
      details,
      additionalTerms,
      effectiveDate,
      endDate,
      status,
      partyDetails,
    });

    const savedContract = await newContract.save();
    res.status(201).json({ message: 'Contract created successfully', contract: savedContract });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create contract', error });
  }
};

// Get all contracts
handleGetAllContracts = async (req, res) => {
  try {
    const contracts = await Contract.find();
    res.status(200).json(contracts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve contracts', error });
  }
};

// Get a single contract by ID
handleGetContractById = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }
    res.status(200).json(contract);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve contract', error });
  }
};

// Update a contract by ID
handleUpdateContractById = async (req, res) => {
  try {
    const { contractType, contractName, duration, details, additionalTerms, effectiveDate, endDate, status, partyDetails } = req.body;

    const updatedContract = await Contract.findByIdAndUpdate(
      req.params.id,
      {
        contractType,
        contractName,
        duration,
        details,
        additionalTerms,
        effectiveDate,
        endDate,
        status,
        partyDetails,
      },
      { new: true } // Return the updated contract
    );

    if (!updatedContract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    res.status(200).json({ message: 'Contract updated successfully', contract: updatedContract });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update contract', error });
  }
};

// Delete a contract by ID
handleDeleteContractById = async (req, res) => {
  try {
    const deletedContract = await Contract.findByIdAndDelete(req.params.id);

    if (!deletedContract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    res.status(200).json({ message: 'Contract deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete contract', error });
  }
};

getDashboardData = async(req,res)=>{
  try{
    console.log("HITTTT");
    

    const active = await Contract.find({status:"Active"});
    const completed = await Contract.find({status:"Completed"});

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

        const products = await Product.find(); // Fetch all products from the database

    // Calculate the total price of the inventory
        const { totalInventoryPrice, totalCount } = products.reduce(
          (acc, product) => {
            acc.totalInventoryPrice += product.price * product.quantity;
            acc.totalCount += product.quantity; // Count each product based on its quantity
            return acc;
          },
          { totalInventoryPrice: 0, totalCount: 0 }
        );


    res.status(200).json({
      success:true,
      active:active.length,
      completed:completed.length,
      totalSalesPrice:totalSalesPrice,
      totalInventoryPrice:totalInventoryPrice,
      totalCount:totalCount
    });



  }catch(e){
    res.status(500).json({
      success:false,
      message : e.message
    });
  }
}

module.exports = {
    handleCreateNewContract,
    handleGetAllContracts,
    handleGetContractById,
    handleUpdateContractById,
    handleDeleteContractById,
    getDashboardData
};