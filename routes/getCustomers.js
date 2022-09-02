const express = require('express')
const Client = require('../model/Client.js');

let router = express.Router();

router.post('/',async(req,res)=>{
    //get query params
    const { query } = req.body;
    console.log( query );
    //use query to find products
    try{
        const customers = await Client.find();
        //applying query params to get results
        const response = (customers?.filter((item)=>
                                        item.email?.toLowerCase().includes(query.queryvalue? query.queryvalue : "")|| item.mobile?.includes(query.queryvalue? query.queryvalue : "") 
                                    ));
        console.log(response)
        return res.status(200).json(response)
    }catch(err){
        console.log(err);
    }
})

module.exports = router;