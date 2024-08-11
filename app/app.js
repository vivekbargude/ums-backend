const express = require('express');
const app = express();
const contractRouter = require('../routes/contracts.routes');


app.use(express.json());

// define routes here 
app.use('/',contractRouter);



module.exports = app;