const http = require('http')
const app = require('./_app.js')

const server = http.createServer(app)

const port = 5000;

server.listen(port, (req,res)=>{
	console.log(`connected at http://localhost:${port}`)
})