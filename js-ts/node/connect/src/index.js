const connect = require('./connect.js');
const http = require('http');

var app = connect();

app.use(function middleware1(req, res, next) {
    // middleware 1
    console.log('middleware 1');
    next();
  });
  app.use(function middleware2(req, res, next) {
    // middleware 2
    console.log('middleware 2');
    next();
  });

  app.use('/', function(req, res, next) {
    console.log('访问根路径/');
    res.write('Hello World');
    next();
  });

  app.use('/user', function(req, res, next) {
    console.log('访问用户路径/user');
    res.write('Hello User');
    res.end();
  });


http.createServer(app).listen(3000, () => {
    console.log('Server is running on port 3000');
});
