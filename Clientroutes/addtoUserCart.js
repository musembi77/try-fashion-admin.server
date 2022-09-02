const express = require('express');
const Client = require('../model/Client.js');
const { db } = require('../model/Client.js');

const router = express.Router();

router.post('/',async(req,res)=>{
    //get info for user
    const { product } = req.body;
    console.log(product)
    //find existing user
    if(!product){
        return res.status(201).send('We could not add this item to the cart, please try again')
    }
    //get user
    const existinguser = await Client.findOne({email:product.email})
    if(!existinguser ){
        return res.status(201).send('could not find an account , try again in a few minutes')
    }
    const cartItem = {
        "prodctId":product.pid,
        "qty":product.qty,
        "sizes":product.size,
        "color":product.color,
        "price":product.price
    }
    console.log(cartItem)
    //update user cart
    try{
        const query = {_id:existinguser._id};
        const update = { $push: {"cart": {"$each": [cartItem]}}};
        const options = { };
        
        db.collection('clients').updateOne( query, update, options);
    }catch(err){
        console.log(err)
    }
    //return a success
    return res.status(200).send('successfully added item to your cart');
})

module.exports = router ;