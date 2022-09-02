const mongoose = require('mongoose')
require('dotenv').config()
const URI = process.env.MONGO_URI

exports.connect=()=>{
	mongoose.connect(
			URI
		).then(()=>{
			console.log('database connected successfully')
		}).catch((err)=>{
			console.log(err)
		})
}