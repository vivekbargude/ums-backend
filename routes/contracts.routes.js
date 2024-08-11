
//IMPORT
const express = require('express');
const contractRouter = express.Router();
const Contract = require('../models/contracts.model');


contractRouter.post("/contracts/add-contract", async (req,res)=>{

    try{

        const {
            siteName, 
            contractType, 
            contractID, 
            status, 
            effectiveDate, 
            expirationDate, 
            contractTerm, 
            renewalTerms, 
            partiesInvolved
        } = req.body;

        // Check if partiesInvolved is provided for Private contracts
        if (contractType === 'Private' && (!partiesInvolved || partiesInvolved.length === 0)) {
            return res.status(400).json({
                success: false,
                message: 'Private contracts must include at least one party involved.',
            });
        }

        // Check if partiesInvolved is empty for Government contracts
        if (contractType === 'Government' && partiesInvolved && partiesInvolved.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Government contracts should not include parties involved.',
            });
        }

        // Creating a new contract
        const newContract = new Contract({
            siteName,
            contractType,
            contractID,
            status,
            effectiveDate,
            expirationDate,
            contractTerm,
            renewalTerms,
            partiesInvolved : [],
        });

        // Save the contract to the database
        await newContract.save();

        res.status(201).json({
            success: true,
            message: 'Contract added successfully',
            contract: newContract,
        });

    }catch(e){

        res.status(500).json({
            success : false ,
            msg : e.message
        });
    }

});

contractRouter.get("contracts/get-all-contracts",(req,res)=>{

    try{


    }catch(e){

        res.status(500).json({
            success : false ,
            msg : e.message
        });
    }

});

module.exports = contractRouter;