const mongoose = require('mongoose')

const ClientSchema = new mongoose.Schema({
	name: 		{type: String},
	email: 		{type: String},
	password: 	{type: String},
	mobile: 	{type:String},
	adress: 	{type:String},
	access_token:   { type:  String},
	cart: 		[
					{
						prodctId:String,
						qty:Number,
						sizes:String,
						color:String,
						price:Number,
					}
				]
},{
    collection: 'clients'
},{timestamps:true})

module.exports = mongoose.model('Client',ClientSchema)