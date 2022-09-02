const express = require('express');
const Product = require('../model/product.js')

const router = express.Router()

router.post('/',async(req,res)=>{
	const {product} = req.body;
	console.log(product)

	if(!product){
		return res.status(201).send('No details were found')
	}
	try{
		const newProduct = await Product.create({
				name: 			product.name,
				price: 			product.price,
				discount: 		product.discount,
				description: 	product.description,		
				category: 		product.category,		
				subcategory: 	product.subcategory,	
				stock: 			product.stock,	
				sizes: 			product.sizes,
				colors:			product.colors,
				images:  		product.newimagearray,
				reviews:      	[],
				sold: 			0,
				likes: 			0,
		})
		return res.status(200).send('Product Added successfully')
	}catch(err){
		console.log(err)
		return res.status(201).send('Failed!! Could not add this item')
	}
	
})

module.exports = router;