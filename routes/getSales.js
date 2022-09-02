const express = require('express')
const Sales = require('../model/Sales.js');

let router = express.Router();

router.get('/',async(req,res)=>{
    try{
        const sales = await Sales.find();
        //applying query params to get results
		return res.status(200).json(sales)
    }catch(err){
        console.log(err);
    }
})

module.exports = router;