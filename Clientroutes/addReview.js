const express = require('express');
const Product = require('../model/product.js');
const { db } = require('../model/product.js');

const router = express.Router();

router.post("/",async(req,res)=>{
	//get product id 
	const {review} = req.body;

	console.log(review)

	if(!review.email){
		return res.status(201).send('You did not submit all inputs of the review, check your contents and try again.')
	}
	//use house id to look for product and push reviews to it
	//check if product exists
    const existingProduct = await Product.findOne({_id:review.pid});
    
    //console.log(existingProduct.email)
    if(!existingProduct && existingProduct === null){
        return res.status(401).send('no product found, could not add this review')
    }
    //console.log(existingProduct)
    //update product
    reviewitem = {
        'email': review.email,
        'body': review.body
    }

    try{
        const query = {_id:existingProduct._id};
        const update = { $push: {"reviews": {"$each": [reviewitem]}}};
        const options = { };
        	  
        db.collection('products').updateOne( query, update, options);
        console.log('Success')
        return res.status(200).send('Success');
    }catch(err){
        res.status(401).send(err)
    }
    return res.status(200)
	// get user
	
})
module.exports = router;