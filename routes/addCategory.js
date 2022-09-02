const express = require('express')
const Category = require('../model/Category.js');

const router = express.Router();

router.post('/',async(req,res)=>{
	const {details} = req.body;

	if(!details ){
		return res.status(201).send('Kindly provide content to add')
	}
	try{
		const newCategory = await Category.create({
			category:details.category,
			subcategory:details.subcategory
		})
		return res.status(200).send('Category added successfully')
	}catch(err){
		console.log(err)
		return res.status(201).send('Could not add category successfully')
	}
})

module.exports = router