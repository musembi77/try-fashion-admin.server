const express = require('express');
const Product = require("../model/product.js")
const { db } = require('../model/product.js');

const router = express.Router();

router.post('/',async(req,res)=>{
	const {details} = req.body;

	console.log(details)
	//find product
	if(!details){
		return res.status(201).send("no details found, to make changes")
	}
	const existingProduct = await Product.findOne({_id:details.id})
	console.log(existingProduct)
	if(!existingProduct){
		return res.status(201).send("could not find this product")
	}
	//change product details
	try{
		const query = {_id:existingProduct._id};
        const update = { $set: {
            name:details.name,
            price:details.price,
            category:details.category,
            sizes:details.sizes,
            stock:details.stock,
            discount:details.discount,
            description:details.description,
            colors:details.colors,
            subcategory:details.subcategory,
        }};
        const options = { };
        db.collection('products').updateOne( query, update, options);
        //login user
        return res.status(200);
	}catch(err){
		console.log(err)
	}
	//return status
})

module.exports = router