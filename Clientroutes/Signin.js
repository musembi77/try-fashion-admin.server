const express = require('express');
const Client = require('../model/Client.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../model/Client.js');
require('dotenv').config();

let router = express.Router();

router.post('/', async(req,res)=>{
    //get details from user
    const { user } = req.body;
    //find user exists
    if(!user){
        return res.status(201).send('all inputs are required');
    }
    const existingUser = await Client.findOne({email:user.email});
    //console.log(user.password);
    if(!existingUser){
        return res.status(201).send('no account found please register an account or use the right email')
    }
    let id = existingUser._id
    //compare passwords
    const email = user.email
    if(bcrypt.compareSync(user.password , existingUser.password)){
        //create a refresh token
        const token = jwt.sign(
            {email,id},
            process.env.TOKEN_KEY,
            {
                expiresIn:'2d',
            }
        )
        //update access token
        try{
            const query = {email:email};
            const update = { $set: {access_token:token}};
            const options = { };
            
            db.collection('clients').updateOne( query, update, options);
            //login user
            return res.status(200).send(token);
        }catch(err){
            console.log(err)
        }
    }
    return res.status(201).send('Wrong password, please try again');

})

module.exports = router;