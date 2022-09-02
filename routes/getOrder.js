const express = require('express')
const Order = require('../model/Order.js');

let router = express.Router();

router.post('/',async(req,res)=>{
    //get query id
    const { id } = req.body;
    console.log( id );
    //use id to find order
    if(!id){
    	return res.status(201).send("we could not fetch the order, try again ")
    }
    try{
        const existingOrder = await Order.findOne({_id:id});
        console.log(existingOrder)
        if(!existingOrder){
        	return res.status(201).send('Could not find the order, check query parameters and try again')
        }
        return res.status(200).json(existingOrder)
    }catch(err){
        console.log(err);
        return res.status(201).send("Error !! we could not fetch the order, try again  in a few minutes")
    }
})

module.exports = router;