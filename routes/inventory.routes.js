const express = require('express');
const mongoose = require('mongoose');
const { Product, ProductCategory } = require('../models/inventory.model');

const inventoryRouter = express.Router();

// Get all product categories
inventoryRouter.get('/categories', async (req, res) => {
  try {
    const categories = await ProductCategory.find();
    res.status(200).json({
      success: true,
      categories : categories
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new product category
inventoryRouter.post('/categories', async (req, res) => {
  const { categoryName } = req.body;
  try {
    const category = new ProductCategory({ categoryName });
    await category.save();
    res.status(201).json({
      success: true,
      message: 'Product category added successfully',
      category
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a product category
inventoryRouter.delete('/categories/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  try {
    const category = await ProductCategory.findByIdAndDelete(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Product category not found' });
    }

    // Also delete all products that belong to this category
    await Product.deleteMany({ category: categoryId });

    res.status(200).json({ 
      success: true, 
      message: 'Product category and associated products deleted successfully' 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all products for a specific category
inventoryRouter.get('/categories/:categoryId/products', async (req, res) => {
  const { categoryId } = req.params;

  try {
    // Find the category to ensure it exists
    const category = await ProductCategory.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Product category not found' });
    }

    // Find all products that belong to this category
    const products = await Product.find({ category: categoryId });

    res.status(200).json({
      success: true,
      products
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a product to a specific product category
inventoryRouter.post('/categories/:categoryId/products', async (req, res) => {
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
});

// Delete a product from a specific product category
inventoryRouter.delete('/categories/:categoryId/products/:productId', async (req, res) => {
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
});

module.exports = inventoryRouter;
