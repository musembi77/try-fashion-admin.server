const express = require('express')
const Product = require('../model/product.js');

let router = express.Router();

router.post('/',async(req,res)=>{
    //get query params
    const { query } = req.body;
    console.log( query );
    //use query to find products
    try{
        const products = await Product.find();
        //applying query params to get results
        const response = (products?.filter((item)=>
                                        item.name?.toLowerCase().includes(query.name? query.name : "") && item.category?.includes(query.category? query.category : "") && item.subcategory?.toString().includes(query.subcategory? query.subcategory : "") 
                                    ));
        // console.log(response)
        return res.status(200).json(response)
    }catch(err){
        console.log(err);
    }
})

module.exports = router;