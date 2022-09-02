const express = require('express');
const Order = require('../model/Order.js');
const { db } = require('../model/Order.js');

const router = express.Router();

router.post("/",async(req,res)=>{
	//get query id
    const { id } = req.body;
    console.log( id );
    //use id to find order
    if(!id){
    	return res.status(201).send("we could not fetch the order, try again ")
    }
    const existingOrder = await Order.findOne({_id:id});
    console.log(existingOrder)
    //console.log(existingProduct)
    //update product
    try{
        const query = 	{_id:existingOrder._id};
        const update = 	{ $set: {status: "cancelled"}};
        const options = { };
        	  
        db.collection('orders').updateOne( query, update, options);
        console.log('Success')
        return res.status(200).send('Success');
    }catch(err){
        res.status(401).send(err)
    }
    return res.status(200)
	// get user
	
})
module.exports = router;