/**
 * 1. promise是一个类
 * 2. promise有三个状态: fullfilled, rejected, pending
 * 3. 用户自己决定失败的原因和成功的原因 成功和失败也是用户定义的
 * 4. promise的实例都拥有一个then方法，一个参数是成功的回调，另外一个是失败的回调
 * 5. 如果执行函数时发生了异常，也会执行失败逻辑
 * 6. promise一旦成功或失败，就不能再改变状态。只有pending时可以改变状态
 */

/**
 * 1. promise成功和失败的回调的返回，都可以传递到外层的下一个then
 * 2. 如果无论上一个then是成功或者失败，只要返回的是普通值的话(传递到下一次的成功中)
 * 3. 出错的情况一定会走到下一次的失败中
 * 4. 返回promise，会根据promise的状态，决定下一次是成功还是失败。
 * 5. 错误处理，如果离自己最近的then没有错误处理 会向下找
 * 6. 每次在then中，都要返回一个新的promise 不能返回this
 */

// then返回100，下一个then可以取到这个值
// const promise = new Promise((resolve, reject) => {
//   resolve('aaa')
// })
// promise.then(() => {
//   return 100
// }).then(data => {
//   console.log(data)
// })

const FULLFILLED = 'FULLFILLED';
const REJECTED = 'REJECTED';
const PENDING = 'PENDING';

const resolvePromise = (promise2, x, resolve, reject) => {

}


class CustomPromise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    // 如果excutor中有一个异步方法，不能马上执行。就需要收集回调函数。
    // 发布订阅模式
    this.onFullfilledCbs = []
    this.onRejectedCbs = []
    let resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULLFILLED
        this.value = value
      }
    }

    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
      }
    }
    // try, catch无法捕获到异步代码错误
    try {
      executor(resolve, reject)
    } catch(e) {
      reject(e)
    }
    
  }

  then(onFullFilled, onRejected) {
    // new Promise要等到里面代码都执行完才会返回promise2
    let promise2 = new CustomPromise((resolve, reject) => {
      if (this.status === FULLFILLED) {
        setTimeout(() => {
          try {
            let x = onFullFilled(this.value)
            // 为了获取到prmise2 可以加一个定时器
            resolvePromise(promise2, x, resolve, reject)
          } catch(e) {
            reject(e)
          }
        }, 0)
      }
  
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch(e) {
            reject(e)
          }
        }, 0)
      }
  
      if (this.status === PENDING) {
        this.onFullfilledCbs.push(() => {
          // todo
          setTimeout(() => {
            try {
            let x = onFullFilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch(e) {
            reject(e)
          }
          }, 0)
        })
  
        this.onRejectedCbs.push(() => {
          // todo 
          setTimeout(() => {
            try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch(e) {
            reject(e)
          }
          }, 0)
        })
      }
    })

    return promise2
  
  }
}


let fs = require('fs')

// error first 错误第一 异步方法无法通过try，catch捕获异常
fs.readFile('./name.txt', 'utf8', (err, data) => {

})

// 调用 p1.resolve(100) => p1.then(data => {})
// p2.resolve(1) => p2.then(data)
let p1 = new Promise((resolve, reject) => {
  resolve(100);
})

let p2 = p1.then(data => {
  return 1;
})

p2.then(data => {
  console.log(data)
})