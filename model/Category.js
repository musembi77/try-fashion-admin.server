const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
	category : 	{type:String},
	subcategory: {type: String}
})

module.exports = mongoose.model('category',CategorySchema)