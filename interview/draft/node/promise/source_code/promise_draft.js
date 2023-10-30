const request = require('request');

var p1 = new Promise((resolve, reject) => {
  request('https://www.baidu.com', (error, response) => {
    if(!error && response.statusCode === 200) {
      console.log('异步操作成功');
      reject(200)
    }
  })
})

var p2 = p1.then((value) => {
  console.log('p1 onFulfilled 执行', value);
  return null
}, (reason => {
  console.log('p1 onRejected 执行', reason);
  return null
}))

p2.then((value) => {
  console.log('p2 onFulfilled 执行', value);
}, (reason) => {
  console.log('p2 onRejected 执行', reason);
})

