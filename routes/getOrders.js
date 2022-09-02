const express = require('express')
const Order = require('../model/Order.js');

let router = express.Router();

router.post('/',async(req,res)=>{
    //get query params
    const { query } = req.body;
    console.log( query );
    //use query to find products
    try{
        const orders = await Order.find();
        //applying query params to get results
        const response = (orders?.filter((item)=>
                                        item.status?.includes(query.queryvalue? query.queryvalue : "") || item.customerId?.includes(query.queryvalue? query.queryvalue : "")
                                    )).reverse();
        console.log(response)
        return res.status(200).json(response)
    }catch(err){
        console.log(err);
    }
})

module.exports = router;