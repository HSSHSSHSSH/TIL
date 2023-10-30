const http = require('http');
const url = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  console.log('aaaa!!!');
  const data = {
    x: 10
  };
  res.setHeader('Content-Type', 'text/plain');
  // 允许跨域
  res.setHeader('Access-Control-Allow-Origin', '*');
  // console.log(`${callback}(${JSON.stringify(data)})`);
  // res.end(`${callback}(${JSON.stringify(data)})`);
  res.end(JSON.stringify(data));
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
