const express = require('express');
const {
  getAllCategories,
  addCategory,
  deleteCategory,
  getProductsByCategory,
  addProductToCategory,
  deleteProductFromCategory
} = require('../controllers/inventory.controller');

const inventoryRouter = express.Router();

// Get all product categories
inventoryRouter.get('/categories', getAllCategories);

// Add a new product category
inventoryRouter.post('/categories', addCategory);

// Delete a product category
inventoryRouter.delete('/categories/:categoryId', deleteCategory);

// Get all products for a specific category
inventoryRouter.get('/categories/:categoryId/products', getProductsByCategory);

// Add a product to a specific product category
inventoryRouter.post('/categories/:categoryId/products', addProductToCategory);

// Delete a product from a specific product category
inventoryRouter.delete('/categories/:categoryId/products/:productId', deleteProductFromCategory);

module.exports = inventoryRouter;
