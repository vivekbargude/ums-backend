
//IMPORT
const express = require('express');
const contractRouter = express.Router();
const {handleCreateNewContract,
    handleGetAllContracts,} = require("../controllers/contracts.controllers");


contractRouter.post("/contracts/add-contract", handleCreateNewContract);

contractRouter.get('/contracts/get-all-contracts',handleGetAllContracts );

module.exports = contractRouter;


module.exports = contractRouter;
