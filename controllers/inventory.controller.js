const { Product, ProductCategory } = require('../models/inventory.model');

// Get all product categories
const getAllCategories = async (req, res) => {
  try {
    console.log("hit");
    
    const categories = await ProductCategory.find();
    res.status(200).json({
      success: true,
      categories: categories
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new product category
const addCategory = async (req, res) => {
  const { categoryName, categorydesc, categoryImageUrl } = req.body;
  try {
    const category = new ProductCategory({ categoryName, categorydesc, categoryImageUrl });
    await category.save();
    res.status(201).json({
      success: true,
      message: 'Product category added successfully',
      category: category
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a product category
const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const category = await ProductCategory.findByIdAndDelete(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Product category not found' });
    }
    await Product.deleteMany({ category: categoryId });
    res.status(200).json({
      success: true,
      message: 'Product category and associated products deleted successfully'
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all products for a specific category
const getProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const category = await ProductCategory.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Product category not found' });
    }
    const products = await Product.find({ category: categoryId });
    res.status(200).json({
      success: true,
      products
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a product to a specific product category
const addProductToCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { name, description, price, quantity } = req.body;
  try {
    const category = await ProductCategory.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Product category not found' });
    }
    const product = new Product({
      name,
      description,
      price,
      quantity,
      category: categoryId
    });
    await product.save();
    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      product
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a product from a specific product category
const deleteProductFromCategory = async (req, res) => {
  const { categoryId, productId } = req.params;
  try {
    const product = await Product.findOneAndDelete({
      _id: productId,
      category: categoryId
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found in this category' });
    }
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getInventory = async(req,res)=>{
  try{
    const inventory = await Product.find();
    res.status(200).json(inventory);
  }catch(e){
    res.status(500).json({message:e.message});
  }
}

// Get all products in the inventory (regardless of category)
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from the database
    res.status(200).json({
      success: true,
      products: products,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  getAllCategories,
  addCategory,
  deleteCategory,
  getProductsByCategory,
  addProductToCategory,
  deleteProductFromCategory,
  getInventory,
  getAllProducts
};
