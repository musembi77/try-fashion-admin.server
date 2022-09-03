const express = require('express');
const Client = require('../model/Client.js');

let router = express.Router();

router.post('/',async(req,res)=>{
    //get token
    const { email } = req.body;
    console.log(email)
    //find user
    const user = await Client.findOne({email:email});
    console.log(user)
    //returnuser
    if(user){
        return res.status(200).json(user.cart);
    }
    return res.status(201).send('failed to fetch cart,Try again.')
})

module.exports = router;