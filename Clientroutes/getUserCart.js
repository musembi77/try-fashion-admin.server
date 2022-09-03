const express = require('express');
const Client = require('../model/Client.js');

let router = express.Router();

router.post('/',async(req,res)=>{
    //get token
    const { token } = req.body;
    console.log(token)
    //find user
    const user = await Client.findOne({access_token:token});
    console.log(user)
    //returnuser
    if(user){
        return res.status(200).json(user.cart);
    }
    return res.status(201).send('failed to fetch cart,Try again.')
})

module.exports = router;