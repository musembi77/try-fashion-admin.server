const express = require('express');
const Client = require('../model/Client.js');
const { db } = require('../model/Client.js');

const router = express.Router();

router.post('/',async(req,res)=>{
	//get info for user
	const { edituser } = req.body;
	//console.log(edituser)
	//find existing user
	if(!edituser){
		return res.status(201).send('no changes were made')
	}
	//get user
	const existinguser = await Client.findOne({email:edituser.email})
	if(!existinguser ){
		return res.status(201).send('could not find this account , try again in a few minutes')
	}
	//update user info
	try{
		const query = {_id:existinguser._id};
        const update = { $set: {
            name:           edituser.name,
		    mobile:         edituser.mobile,
		    email:          edituser.email,
		    adress: 		edituser.adress,
        }};
        const options = { };
        
        db.collection('clients').updateOne( query, update, options);
	}catch(err){
		console.log(err)
	}
	//return a success
	return res.status(200).send('successfully updated your profile');
})

module.exports = router ;