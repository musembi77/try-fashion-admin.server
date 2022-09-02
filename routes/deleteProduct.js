const express = require('express');
const Product = require("../model/product.js")
const { db } = require('../model/product.js');

const router = express.Router();

router.post('/',async(req,res)=>{
	const {id} = req.body;

	console.log(id)
	//find product
	if(!id){
		return res.status(201).send("no request id found, try again")
	}
	const existingProduct = await Product.findOne({_id:id})
	console.log(existingProduct)
	if(!existingProduct){
		return res.status(201).send("could not find this product, try again")
	}
	//change product details
	try{
		db.collection('products').findOneAndDelete({_id:existingProduct._id} );
        return res.status(200).send('successfully removed this product');
	}catch(err){
		console.log(err)
		return res.status(401).send('failed try again in a few minutes')
	}
	//return status
})

module.exports = router