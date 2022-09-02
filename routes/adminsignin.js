//adminAuth
const express = require('express')
const Admin = require('../model/AdminAuth.js');
const { db } = require('../model/AdminAuth.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/',async(req,res)=>{
	const {auth} = req.body;

	console.log(auth)
	if(!auth){
			return res.status(201).send('no auth details provided')
		}
	//check if user is  exists create user and is accepted by admin
	const admin = await Admin.findOne({email:auth.email})
	console.log(admin)
	if(!admin){
		return res.status(201).send('no account found')
	}
	try{
		if(admin && bcrypt.compareSync(auth.password , admin.password)){
			console.log('signup successful')
			return res.status(200).send(admin.token)
		}
		return res.status(201).send('You are not authorised, contact Administarator or check your credentials')
	}catch(err){
		console.log(err)
	}
	// if(!admin){
	// 	//encrypt password
	// 	const salt = bcrypt.genSaltSync(10);
 //    	const encryptpassword = bcrypt.hashSync(auth.password, salt);
 //    	const aemail = auth.email
 //    	const token = jwt.sign(
 //            {aemail},
 //            process.env.TOKEN_KEY,
 //            {
 //                expiresIn: '2d'
 //            }
 //        )

	// 	const newAdmin = await Admin.create({
	// 		email: auth.email, 
	// 		name: 'sam',
	// 		password: encryptpassword,
	// 		token: token
	// 	})
		
	// 	console.log(newAdmin)
	// 	return res.status(200).send(token)
	// }
	// return res.status(201)
	//create user
	//return user
})

module.exports = router
