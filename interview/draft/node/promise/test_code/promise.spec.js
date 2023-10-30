const MyPromise = require('../source_code/promise')
const request = require('request')
// describe('sum', () => {
//   test('1 + 1 = 2', () => {
//     expect(sum(1, 1)).toBe(2)
//   })

//   test('1 + 2 = 3', () => {
//     expect(sum(1, 2)).toBe(3)
//   })
// })
describe('MyPromise', () => {
  test('base use', () => {
    // 基本使用
    let result, error
    var p1 = new MyPromise((resolve, reject) => {
      request('https://www.baidu.com', function (error, response) {
        if (!error && response.statusCode === 200) {
          resolve(200)
        } else {
          reject('request3 failed')
        }
      })
    })

    

    p1.then((value) => {
      expect(value).toBe(200)
    },(reason) => {
      expect(reason).toBe(500)
    })


  })

  /**
   * promise2 = promise1.then(onFulfilled, onRejected)
   * 当 onFulfilled 或 onRejected 中抛出异常 e 时，promise2 必须拒绝执行，并返回拒因 e
   */
  test('onFulfilled or onRejected throw error', () => {
    let p1 = new MyPromise((resolve, reject) => {
      request('https://www.baidu.com', function (error, response) {
        if (!error && response.statusCode === 200) {
          resolve(200)
        } else {
          reject('request3 failed')
        }
      })
    })

    let p2 = p1.then((value) => {
      throw new Error('onFulfilled throw error')
    }, (reason) => {
      throw new Error('onRejected throw error')
    })

    // p2 拒绝执行且返回 e
    p2.then((value) => {
      console.log('p2 onFulfilled 执行', value);
    }, (reason) => {
      expect(reason.message).toBe('onFulfilled throw error')
    })

  })

})
