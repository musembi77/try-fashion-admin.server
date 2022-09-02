const express = require('express');
const Category = require('../model/Category.js');

let router = express.Router();

router.get('/',async(req,res)=>{
    try{
        const categories = await Category.find();
        //applying query params to get results
		return res.status(200).json(categories)
    }catch(err){
        console.log(err);
    }
})

module.exports = router;