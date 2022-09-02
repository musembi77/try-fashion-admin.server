const http = require('http')
const app = require('./_app.js')

require('dotenv').config();

const server = http.createServer(app)

const port = process.env.PORT || 5000;

server.listen(port, (req,res)=>{
	console.log(`connected at http://localhost:${port}`)
})