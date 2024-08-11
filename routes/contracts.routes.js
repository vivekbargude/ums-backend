//IMPORT
const express = require('express');
const contractRouter = express.Router();


contractRouter.post("/contracts/add-contract",(req,res)=>{

    try{


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