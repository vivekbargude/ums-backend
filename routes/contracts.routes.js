
//IMPORT
const express = require('express');
const contractRouter = express.Router();
const {handleCreateNewContract, handleGetActiveContracts} = require("../controllers/contracts.controllers")


contractRouter.post("/contracts/add-contract", handleCreateNewContract);

contractRouter.get('/contracts/get-active-contracts',handleGetActiveContracts );

module.exports = contractRouter;


module.exports = contractRouter;