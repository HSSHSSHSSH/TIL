const express = require('express');
var path = require('path');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use(express.static('public'));


// 代理 /api 请求到 sitB
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:8081', 
  changeOrigin: true,
}))

app.listen(8080, () => {
  console.log('server is running at port 8080');
})

