const express = require("express")
const Order = require('../model/Order.js')
const Sale = require('../model/Sales.js')
const router = express.Router();
const { db } = require('../model/Order.js');

router.post('/',async(req,res)=>{
	const { payload } = req.body;
	//console.log(payload)
	if(!payload){
		return res.status(201).send("No order deails found")
	}
	const cartarr = payload.cart
	
	// const cartItem = {
	// 	'color': cartarr.color,
	// 	'sizes':cartarr.sizes,
	// 	'prodctId':cartarr.prodctId,
	// 	'qty':cartarr.qty,
	// 	'price':cartarr.price
	// }
	try{
		const newOrder = await Order.create({
						customerId: 	payload.customerId,
						products: 		[],
						status: 		'pending',
						total: 			payload.total
					})
		console.log(newOrder._id)
		for(let i = 0 ; i < cartarr.length; i++){
			console.log(i)
			try{
		        const query = {_id:newOrder._id};
		        const update = { $push: {"products": {"$each": [cartarr[i]]}}};
		        const options = { };
		        	  
		        db.collection('orders').updateOne( query, update, options);
		        console.log('Success')
		        //return res.status(200);
		    }catch(err){
		        //res.status(401).send(err)
		        console.log(err)
		    }
		}
		try{
			const newSale = await Sale.create({
				sale: payload.total
			})
			console.log(newSale)
		}catch(err){
			console.log(err)
		}
		
		return res.status(200).send("Order created Successfully")
	}catch(err){
		console.log(err)
		return res.status(201).send("Could not create your order")
	}
	
})

module.exports = router;