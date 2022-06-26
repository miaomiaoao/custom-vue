/**
 * 1. promise是一个类
 * 2. promise有三个状态: fullfilled, rejected, pending
 * 3. 用户自己决定失败的原因和成功的原因 成功和失败也是用户定义的
 * 4. promise的实例都拥有一个then方法，一个参数是成功的回调，另外一个是失败的回调
 * 5. 如果执行函数时发生了异常，也会执行失败逻辑
 * 6. promise一旦成功或失败，就不能再改变状态。只有pending时可以改变状态
 */

const FULLFILLED = 'FULLFILLED';
const REJECTED = 'REJECTED';
const PENDING = 'PENDING';


class Promise {
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
    try {
      executor(resolve, reject)
    } catch(e) {
      reject(e)
    }
    
  }

  then(onFullFilled, onRejected) {
    if (this.status === FULLFILLED) {
      onFullFilled(this.value)
    }

    if (this.status === REJECTED) {
      onRejected(this.reason)
    }

    if (this.status === PENDING) {
      this.onFullfilledCbs.push(() => {
        // todo
        onFullFilled(this.value)
      })

      this.onRejectedCbs.push(() => {
        // todo 
        onRejected(this.reason)
      })
    }
  }
}


let fs = require('fs')

// error first 错误第一 异步方法无法通过try，catch捕获异常
fs.readFile('./name.txt', 'utf8', (err, data) => {

})