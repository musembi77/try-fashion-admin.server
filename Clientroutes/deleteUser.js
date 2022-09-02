const express = require('express');
const Client = require('../model/Client.js');
const { db } = require('../model/Client.js');

let router = express.Router()

router.post("/",async (req,res)=>{
    //get user tokens
    const { token } = req.body;

    //console.log(token)
    //validate property
    if(!token){
        return res.status(201).send('no token found')
    }
    //check if user exists
    const existinguser = await Client.findOne({access_token:token})
    
    if(!existinguser && existinguser === null){
        return res.status(201).send('no user found')
    }
    //console.log(existinguser.name)
    try{
        db.collection('clients').findOneAndDelete({_id:existinguser._id} );
        //delete user
        console.log('deleted')
        return res.status(200).send('success');
    }catch(err){
        console.log(err)
    return res.status(201).send("Process failed")
    }
})

module.exports = router;