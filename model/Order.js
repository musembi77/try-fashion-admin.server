const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
	customerId: 	{type: String},
	products: 		[{color: String,sizes:String,prodctId:String,qty:Number,price:Number}],
	total:          {type: Number},
	status: 		{type: String},
	createdAt:  	{ type: Date, default: Date.now}
},{
    collection: 'orders'
},{timestamps:true})

module.exports = mongoose.model('Order',OrderSchema)