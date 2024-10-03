const express = require('express');
const router = express.Router();
const saleController = require('../controllers/sales.controller');

// Route to create a new sale
router.post('/sales', saleController.createSale);

// Route to get the latest sales
router.get('/sales/latest', saleController.getLatestSales);

router.get('/sales/products', saleController.getAllProducts);

router.get('/sales/analysis', saleController.getSalesAnalysis);

module.exports = router;
