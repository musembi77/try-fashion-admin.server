const express = require('express')
const axios = require('axios')
const router = express.Router()

router.post('/',async(req,res)=>{
	const {
		fname,
        lname,
        email,
        mobile ,
        budget ,
        details ,
        transid ,
        app_time ,
        app_date ,
        category ,
        key } = req.body;
    console.log(fname,
        lname,
        email,
        mobile ,
        budget ,
        details ,
        transid ,
        app_time ,
        app_date ,
        category ,
        key)
    if(!fname)return res.status(400).send('no user found')
    try{
        await axios.post('https://cuteprofit.com/account/api/njia',{
            fname,
            lname,
            email,
            mobile ,
            budget ,
            details ,
            transid ,
            app_time ,
            app_date ,
            category ,
            key ,
        })
        console.log('success')
        return res.status(200).send('success')
    }catch(err){
        console.log(err)
    }
})

module.exports = router