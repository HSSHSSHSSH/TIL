const request = require('request');
const MyPromise = require('./promise');

// // 基本使用
// var promise1 = new MyPromise((resolve, reject) => {
//   request('https://www.baidu.com', function (error, response) {
//     if(!error && response.statusCode === 200) {
//       resolve('request1 succeed')
//       console.log('蛙叫你');
//     } else {
//       reject('request1 failed')
//     }
//   })
// })


// promise1.then((value) => {
//   console.log('value of promise1', value);
// },(reason) => {
//   console.log('reason of promise1', reason);
// })


// var promise2 = new Promise((resolve, reject) => {
//   request('https://www.baidu.com', function (error, response) {
//     if(!error && response.statusCode === 200) {
//       reject('蛙叫你失败')
//       console.log('蛙叫你promise2');
//     } else {
//       resolve('request2 failed')
//     }
//   })
// })

// promise2.then((value) => {
//   console.log('value of promise2', value);
// }, (reason) => {
//   console.log('reason of promise2', reason);
// })

//--=-=-=--=-=-=-=-=-=-=----==-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=

// then 的链式调用

// 当 onFulfilled 或 onRejected 抛出异常 e 时，promise2 必须拒绝执行，并返回拒因 e

// var p3 = new MyPromise((resolve, reject) => {
//   request('https://www.baidu.com', function (error, response) {
//     if(!error && response.statusCode === 200) {
//       resolve('request3 succeed')
//       console.log('蛙叫你00110001010');
//     } else {
//       reject('request3 failed')
//     }
//   })
// })

// console.log('开始执行 then 方法');

// let p4 = p3.then((value) => {
//   console.log('p3 onFulfilled 执行', value);
//   console.log('p3 then 方法执行', p3);
//   throw new Error('p3在onFulfilled中抛出异常')
//   // return 'p3 then 1'
// },(reason) => {
//   console.log('p3 onRejected 执行', reason);
//   // throw new Error('p3在onRejected中抛出异常')
//   // return 'p3 then 2'
// })

// p4.then((value) => {
//   console.log('p4', p4);
//   console.log('p4 onFulfilled 执行', value);
// },(reason) => {
//   console.log('p4', p4);
//   console.log('p4 onRejected 执行', reason);

// })
//--=-=-=--=-=-=-=-=-=-=----==-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=

// // 若 onFulfilled 不是函数且 promise1 成功执行， promise2 必须成功执行并返回相同的值

// var p1 = new MyPromise((resolve, reject) => {
//   request('https://www.baidu.com', function (error, response) {
//     if(!error && response.statusCode === 200) {
//       resolve('request3 succeed')
//       console.log('蛙叫你00110001010');
//     } else {
//       reject('request3 failed')
//     }
//   })
// })

// // p1 的 then 方法中 onFulfilled 不是一个函数

// var p2 = p1.then('not a function but everything', (reason) => {
//   console.log('p1 onRejected 执行', reason);
// })

// p2.then((value) => {
//   console.log('p2 onFulfilled 执行', value);
// },(reason) => {
//   console.log('p2 onRejected 执行', reason);
// })
//--=-=-=--=-=-=-=-=-=-=----==-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=
// // 若 onRejected 不是函数且 promise1 拒绝执行， promise2 必须拒绝执行并返回相同的据因

// var p1 = new MyPromise((resolve,reject) => {
//   // 异步操作
//   setTimeout(() => {
//     request('https://www.baidu.com', function(error, response) {
//       if(!error && response.statusCode === 200) {
//         console.log('异步操作失败log');
//         reject('p1 丝败了')
//       }
//     })
//   }, 1000)
//   // // 同步操作
//   // console.log('同步操作失败log');
//   // reject('p1 丝败了')
// })

// var p2 = p1.then((value) => {
//   console.log('p1 onFulfilled 执行', value);
// }, 'not a function but everything')

// p2.then((value) => {
//   console.log('p2 onFulfilled 执行', value);
// },(reason) => {
//   console.log('p2 onRejected 执行', reason);
// })

//// 当 onFulfilled 或 onReject 的返回值为 x, 执行 Promise 解决过程 [[Resolve]](promise2, x)

//// 若 x 与 promise2 相同，则抛出 TypeError 错误，reject promise2 以拒绝
var p1 = new MyPromise((resolve, reject) => {
  request('https://www.baidu.com', (error, response) => {
    if(!error && response.statusCode === 200) {
      console.log('异步操作成功');
      reject(200)
    }
  })
})

var p2 = p1.then((value) => {
  console.log('p1 onFulfilled 执行', value);
  return {}
}, (reason => {
  console.log('p1 onRejected 执行', reason);
  return {}
}))

p2.then((value) => {
  console.log('p2 onFulfilled 执行', value);
}, (reason) => {
  console.log('p2 onRejected 执行', reason);
})
