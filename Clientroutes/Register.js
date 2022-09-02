const express = require('express');
const Client = require('../model/Client.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

let router = express.Router()

router.post('/',async (req,res,next)=>{
    //get email,password,name from req.body
    const { user } = req.body;
    console.log(user)
    //check if all params are available
    if(!(user.email || user.name || user.password || user.mobile)){
        return  res.status(201).send('all inputs are required');
    }
    //check if user already exists
    const existingUser = await Client.findOne({email:user.email});
    
    //console.log(existingUser)

    if(existingUser){
        return res.status(201).send('User already exists, please log in');
    }
    //sign a token and encrypt password
    const salt = bcrypt.genSaltSync(10);
    const encryptpassword = bcrypt.hashSync(user.password, salt);
    // const encryptpassword = await bcrypt.hash(user.password,10);
    //console.log(encryptpassword)
    const email = user.email
    try{
        const token = jwt.sign(
            {email},
            process.env.TOKEN_KEY,
            {
                expiresIn: '2d'
            }
        )
        //console.log(token)
        const newUser = await Client.create({
            name: user.name ,
            email: user.email,
            password: encryptpassword,
            access_token: token,
            mobile: user.mobile,
            cart: [],
            adress: '',
        })
        //console.log(newUser)       
        return res.status(200).json(newUser.access_token)
        //console.log(newUser.access_token);
    }catch(err){
        return res.status(201).send('Could not sign up user, try again')
    }
    return res.status(200);
});

module.exports = router