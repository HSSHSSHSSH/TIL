'use strict'
const http = require('http')

http.createServer(function (req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"})
    res.end('Hello Node\n')
}).listen(3000, "127.0.0.1")

console.log('Serve is running at https://127.0.0.1:3000')
