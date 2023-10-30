const express = require('express');
var path = require('path');
const app = express();

app.use(express.static('public'));

app.get('/api', (req, res) => {
  res.statusCode = 200;
  console.log('bbb!!!');
  const data = {
    x: 10
  };
  res.setHeader('Content-Type', 'text/plain');
  // 允许跨域
  // res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(`${JSON.stringify(data)}`);
})

app.listen(8081, () => {
  console.log('server is running at port 8081');
})

