const express = require('express');
const app = express();
const contractRouter = require('../routes/contracts.routes');
const inventoryRouter = require('../routes/inventory.routes');
const salesRouter = require('../routes/sales.routes');

app.use(express.json());

// define routes here 
app.use('/',contractRouter);
app.use('/',inventoryRouter);
app.use('/',salesRouter);

module.exports = app;