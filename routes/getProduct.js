const express = require('express')
const Product = require('../model/product.js');

let router = express.Router();

router.post('/',async(req,res)=>{
    //get query id
    const { id } = req.body;
    console.log( id );
    //use id to find product
    if(!id){
    	return res.status(201).send("we could not fetch the item, try again ")
    }
    try{
        const existingProduct = await Product.findOne({_id:id});
        console.log(existingProduct)
        if(!existingProduct){
        	return res.status(201).send('Could not find the item, check query parameters and try again')
        }
        return res.status(200).json(existingProduct)
    }catch(err){
        console.log(err);
        return res.status(201).send("we could not fetch the item, try again  in a few minutes")
    }
})

module.exports = router;