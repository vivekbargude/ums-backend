const express = require('express');
const inventoryRouter = express.Router();
const Inventory = require('../models/inventory.model');


// Get all inventory items
inventoryRouter.get('/inventory/get-all-inventory', async (req, res) => {
  try {
    const inventoryItems = await Inventory.find();
    res.status(200).json({
        success : true,
        inventory : inventoryItems
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add inventory item
inventoryRouter.post('/inventory/add-inventory', async (req, res) => {
  const { name, quantity, description } = req.body;
  const newInventory = new Inventory({ name, quantity, description });

  try {
    const savedInventory = await newInventory.save();
    res.status(201).json(
        {success: true,
        message: 'Inventory added successfully',
        data : savedInventory
        }
    );
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = inventoryRouter;
