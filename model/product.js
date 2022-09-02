const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
	name: 					{type:String},
	price: 					{type:Number},
	discount : 				{type:Number},
	description: 			{type: String},
	category: 				{type: String},
	subcategory: 			{type: String},
	stock: 					{type: Number},
	sizes: 					{type: String},
	colors:					{type: String},
	images:  				[{type: String}],
	reviews:            	[ { name: String,
                            	body: String}],
	sold: 					{type: 	Number},
	likes: 					{type:  Number},
    createdAt:          	{ type: Date, default: Date.now}
},{
    collection: 'products'
},{timestamps:true})

module.exports = mongoose.model('Product',ProductSchema)