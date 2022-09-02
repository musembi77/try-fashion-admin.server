const express =  require('express')
require('./config/database.js').connect();
require('dotenv').config()
const cors = require('cors');

//admin routes
const adminauth = require('./routes/adminsignin.js');
//products
const addProduct = require('./routes/addProduct.js');
const editProduct = require('./routes/editProduct.js');
const deleteProduct = require('./routes/deleteProduct.js');
const getProducts = require('./routes/getProducts.js');
const getProduct = require('./routes/getProduct.js');
//category
const addCategory = require('./routes/addCategory.js');
const getCategory = require('./routes/getCategory.js');
//orders
const getOrders = require('./routes/getOrders.js');
const getOrder = require('./routes/getOrder.js');
const editOrder = require('./routes/editOrder.js');
const dispatchOrder =require('./routes/dispatchOrder');
const cancelOrder = require('./routes/cancelOrder.js')
//customers
const getCustomers = require('./routes/getCustomers');
const getCustomerinfo = require('./routes/getCustomer.js');
//sales
const getSales = require('./routes/getSales.js');


//Client routes
//auth
const SignIn = require('./Clientroutes/Signin.js');
const Register = require('./Clientroutes/Register.js');
const editUser = require('./Clientroutes/editUser.js');
const deleteUser = require('./Clientroutes/deleteUser.js');
const getUser = require('./Clientroutes/getUser.js');
//cart
const addtoUserCart = require('./Clientroutes/addtoUserCart.js');
const getUserCart = require('./Clientroutes/getUserCart.js');
const deleteItemFromCart = require('./Clientroutes/deleteItemFromCart.js');
const clearcartafterorder = require('./Clientroutes/clearcartafterorder.js');
//orders
const createOrder = require('./Clientroutes/createOrder.js');
//const getUserOrders = require('./Clientroutes/getUserOrders.js')
//products
const recommendProducts = require('./Clientroutes/recommendProducts.js');
const addReview = require('./Clientroutes/addReview.js');

const app = express();

let origins = ['https://try-fashion-admin-web.vercel.app','https://try-fashion-client-web.vercel.app'];
app.use(cors({credentials:true, origin: origins}));
app.use(express.json())

app.get("/",(req,res)=>{
	res.send('home')
})

//Admin

//auth
app.use("/api/adminsignin",adminauth);
//products apis
app.use("/api/addproduct",addProduct);
app.use('/api/editproduct',editProduct);
app.use('/api/deleteproduct',deleteProduct);
app.use('/api/getproducts',getProducts);
app.use('/api/getproduct',getProduct);

app.use('/api/addcategory',addCategory);
app.use('/api/getcategory',getCategory);
//orders
app.use('/api/getorders',getOrders);
app.use('/api/getorder',getOrder);
app.use('/api/editorder',editOrder);
app.use('/api/dispatchorder',dispatchOrder);
app.use('/api/cancelorder',cancelOrder);
//customers
app.use('/api/getcustomers',getCustomers)
app.use('/api/getcustomerinfo',getCustomerinfo)
//sales
app.use('/api/getsales',getSales)
//Client
//Auth
app.use("/api/signin",SignIn);
app.use("/api/register",Register);
app.use("/api/getuser",getUser);
app.use("/api/edituser",editUser);
app.use("/api/deleteuser",deleteUser);
//cart
app.use("/api/addtocart",addtoUserCart);
app.use("/api/getcart",getUserCart);
app.use("/api/deleteitem",deleteItemFromCart);
app.use("/api/clearcart",clearcartafterorder);
//order
app.use("/api/createorder",createOrder);
//products
// app.use("/api/getproducts",getUsersProducts);
// app.use('/api/getproduct',getUsersProducts);
app.use('/api/recommendproducts',recommendProducts);
app.use('/api/addreview',addReview);

module.exports = app