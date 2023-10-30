# Promises/A+规范

原文链接 https://promisesaplus.com/

promise 代表着异步操作的最终结果，与 promise 交互的方法是通过 then 方法，在 then 方法中，注册了两个方法：

onFulfilled 可接受 promise 的最终结果，onRejected 可接受 promise 失败的原因。

promises/A+ 规范详述了 then 方法的行为，规范的核心不在于如何创建、实现、拒绝 promise，在于如何提供一个可操作的 then 方法上。

## 术语

- promise：一个对象或函数；包含一个 then 方法，then 方法的行为遵循 Promises/A+ 规范
- <span id="thenable">thenable</span>：一个对象或函数；定义了一个 then 方法
- value：一个合法的 js 值，包括 undifined, thenable, promise
- exception：一个用 throw 语句抛出的值
- reasopn：一个合法的 js 值，指出 promise 被拒绝的原因

## 必要条件

### promise state

promise 当前的状态，包括 pending、fulfilled、rejected，promise 在不同状态下的行为：

- pending：状态可转化为 fulfilled 或 rejected
- fulfilled：状态不可发生变化， 包含一个不可更改的 value  
- rejected：状态不可发生变化，包含一个不可更改的 reason

### then 方法

promise 实例必须提供一个可操作 value 或 reason 的 then 方法，then 方法接受两个参数：

```js
promise.then(onFulfilled, onRejected)
```

- onFulfilled 与 onRejected 都是可选参数，若 onFulfilled 或 onRejected 不是函数时就会被忽略
- onFulfilled 是函数时，有：
  - 必须在 promise 状态转化为 fulfilled 之后调用，value 作为其第一个参数
  - 在 promise 状态转化为 fulfilled 之前不可调用
  - 只可调用一次

- onRejected 是函数时，有：
  - 必须在 promise 状态转化为 rejected 之后调用，reason 作为其第一个参数
  - 在 promise 状态转化为 rejected 之前不可调用
  - 只可调用一次
- onFulfilled 与 onRejected 的调用遵循事件循环的规则，即 宏任务  &rarr; 同步代码 &rarr; 微任务  
- onFulfilled 与 onRejected 必须当作函数调用，且若函数中存在 this , 在严格模式下为 undefined，非严格模式下为全局变量
- 同一 promise 对象，其 then 方法可多次调用，根据 promise 的状态，有：
  - fulfilled: onFulfilled 的调用顺序与其声明顺序一致，即按代码顺序执行
  - rejected: onRejected 的调用顺序与其声明顺序一致，即按代码顺序执行

- then 方法必须返回一个 promise 实例，即 promise2 = promise1.then(onFulfilled, onRejected)
  - 若 onFulfilled 或 onRejected 返回了一个 value x，则运行 Promise 解析程序 \[[Resolve]](promise2, x) <font color=red>(有疑问)</font>
  - 若 onFulfilled 或 onRejected 抛出了异常 e, 则 promise2 会被 rejected 且 reason = e
  - 若 onFulfilled 不是一个函数，则 promise2 的状态将会转换为 fulfilled 且 value 与 promise1 的相同
  - 若 onRejected 不是一个函数，则 promise2  的状态将会转换为 rejected 且 reason 与 promise1的相同
    - 若执行了 onFulfilled 函数且未返回值时，则 promise2 的状态将转换为 fulfilled 且 value 为 undifined
  - 若执行了 onRejected 函数且未返回值时，则 promise2 的状态将转换为 fulfilled 且 value 为 undifined
  - 其他细节参见 https://juejin.cn/post/7159493194160275492#heading-3

### Promise 解析程序 （Promise Resolution Procedure）

Promise Resolution Procedure 是一个抽象的操作，接受一个 promise 实例与一个 value 为参数，记为 \[[Resolve]](promise, x), 若 x 满足 [[thenable]](#thenable) ，则尽量将 x 看作一个 Promise 实例，且尝试将 promise 的状态转化为 x 的状态，若 x 不满足 thenable , 则 promise 的状态将转化为 fulfilled 且值为 x.

这对于thenable的处理使得Promise实现能够互操作，只要它们公开符合Promises/A+规范的then方法。这也允许Promises/A+实现"吸收"那些不符合规范但具有合理then方法的实现。

运行 \[[Resolve]](promise, x)，遵循以下步骤：

- 若 promise 与 x 为同一对象的引用，则 promise 的状态转化为 reject，TypeError 作为 reason <font color=blue>(防止死循环)</font>
- 若 x 是一个 Promise 实例，则 promise 的状态转化为 x 的状态，根据 x 的不同状态，有：
  - pending：promise 的状态一直保持在 pending，直到 x 的状态发生转化
  - fulfilled：promise 以相同的 value 将状态转化为 fulfilled
  - rejected：promise 以相同的 reason 将状态转化为 rejected
- x 是一对象或函数 <font color=red>(有疑问)</font>
  - then = x.then
  - 若在检索 x.then 的过程中发生异常 e , 则 reject promise with reason e. <font color=purple>(未复现)</font>
  - 若 x 是一个函数，则以 x 作为 this 指向调用，第一个参数为 resolvePromise , 第二个参数为 rejectPromise , 满足：
    - 若 resolvePromise 被调用且得到 value y , 则运行 \[[Resolve]](promise, y)
    - 若 rejectPromise 被调用且得到 reason r ,  则 reject promise with reason r
    - 如果同时调用了 resolvePromise 和 rejectPromise，或者对同一参数进行了多次调用，则第一次调用优先，并且忽略任何进一步的调用。
    - 若在 then 的调用过程成中抛出了异常 e , 则有：
      - 若 resolvePromise 或 rejectPromise 被调用，则忽略
      - 若 resolvePromise 或 rejectPromise 未被调用，则 reject promise with reason e
- x 不是一个对象或函数，则 fulfilled promise with value x