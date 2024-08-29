const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: 
  { 
    type: String, 
    required: true 
  },
  quantity: 
  { 
    type: Number, 
    required: true 
  },
  description: 
  { 
    type: String 
  }
});

module.exports = mongoose.model('Inventory', inventorySchema);
