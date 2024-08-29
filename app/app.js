const express = require('express');
const app = express();
const contractRouter = require('../routes/contracts.routes');
const inventoryRouter = require('../routes/inventory.routes');

app.use(express.json());

// define routes here 
app.use('/',contractRouter);
app.use('/',inventoryRouter);

module.exports = app;