const express = require('express');
const Product = require('../model/product.js');

const router = express.Router();

router.post('/',async(req,res)=>{
	//get details param
    //params:-price- school- type 
	const {param}  = req.body;
	//filter best results-
    //randomize the suggestions
	try{
        const products = await Product.find();
        //applying param params to get results
        const response = (products?.filter((item)=>
                                       item.category?.includes(param.category? param.category : "") && item.subcategory?.includes(param.subcategory? param.subcategory : "") 
                                    )).slice(0,3)
        let currentIndex = response.length,  randomIndex;

          // While there remain elements to shuffle.
          while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [response[currentIndex], response[randomIndex]] = [
              response[randomIndex], response[currentIndex]];
          }                                         
        //console.log(response)
        return res.status(200).json(response)
    }catch(err){
        console.log(err);
    }
	//return results
})

module.exports = router;