
//IMPORT
const express = require('express');
const contractRouter = express.Router();
const {handleCreateNewContract,
    handleGetAllContracts,getDashboardData} = require("../controllers/contracts.controllers");


contractRouter.post("/contracts/add-contract", handleCreateNewContract);

contractRouter.get('/contracts/get-all-contracts',handleGetAllContracts );

contractRouter.get('/dashboard',getDashboardData);

module.exports = contractRouter;


module.exports = contractRouter;
