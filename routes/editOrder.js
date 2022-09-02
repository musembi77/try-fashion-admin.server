const express = require('express');
const Order = require("../model/Order.js")
const { db } = require('../model/Order.js');

const router = express.Router();

router.post('/',async(req,res)=>{
	const {details} = req.body;

	console.log(details)
	//find order
	if(!details){
		return res.status(201).send("no details found, make changes and try again")
	}
	const existingOrder = await Order.findOne({_id:details.id})
	if(!existingOrder){
		return res.status(201).send("could not find this order")
	}
	//change order details
	try{
		const query = {_id:existingOrder._id};
        const update = { $set: {
            status:details.status,
        }};
        const options = { };
        db.collection('orders').updateOne( query, update, options);
        return res.status(200);
	}catch(err){
		console.log(err)
	}
	//return status
})

module.exports = router