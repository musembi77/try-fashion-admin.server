const mongoose = require('mongoose')

const AdminAuthSchema = new mongoose.Schema({
	email: {type:String, unique:true},
	password: {type:String},
	name: {type:String},
	token: {type:String}
})

module.exports = mongoose.model('admin',AdminAuthSchema)