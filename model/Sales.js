const mongoose = require('mongoose')

const SalesSchema = new mongoose.Schema({
	sale : 				{	type:Number},
    createdAt:          	{ type: Date, default: Date.now}
},{timestamps:true})

module.exports = mongoose.model('Sale',SalesSchema)