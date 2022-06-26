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

// 所有的promise实现的库都可以相互调用  比如 bluebird q es6-promise 靠的就是resolvePromise
const resolvePromise = (promise2, x, resolve, reject) => {
  // 循环引用，自己等待吗自己完成
  if (promise2 === x) {
    return reject(new TypeError('类型错误'))
  }
  

  // 后续的条件要严格判断  保证代码能和别的库一起使用
  let called; // 只能执行一次
  if (typeof x === 'object' && x != null || typeof x === 'function') {
    // 要继续判断
    try {
      let then = x.then;
      if (typeof then === 'function') { // 只能认为是一个promise了
        // 不要写成x.then 直接then.call就可以了 因为x.then可能会再次取值
        then.call(x, y => { // 根据promise的 状态来判断成功还是失败
          if(called) return;
          called = true;
          // 不停处理y的结果，知道它是一个普通值而不是一个promise。为了解决下面的问题
          resolvePromise(promise2, y, resolve, reject)

          // let promise2 = p.then(data => {
          //   return new Promise((resolve, reject) => {
          //     setTimeout(() => {
          //       resolve(new Promise((resolve, reject) => {
          //         setTimeout(() => {
          //           resolve(2000)
          //         }, 1000)
          //       })) 
          //     }, 1000)
          //   })
          // })



        }, e => {
          if(called) return;
          called = true;
          reject(e)
        });
      } else { // { then: '23' }
        resolve(x)
      }
    } catch(e) {
      if(called) return;
      called = true;
      reject(e)
    }
  } else {
    resolve(x)
  }
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
    onFullFilled = typeof onFullFilled === 'function' ? onFullFilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : err => throw err
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

// let p = new Promise((resolve, reject) => {
//   resolve(1)
// })


// let promise2 = p.then(data => {

// }).then(data => {

// })

// // 这两个promise2不是同一个，因为第一个是两个then的返回值，第二个是一个then的返回值


// let promise2 = p.then(data => {

// })

// promise2.then(data => {

// })




// 引用错误
// promise2 = p.then(data => {
//   return promise2
// })



// 测试自己写的库是否符合规范  有一个库区跑测试用例
// promises-aplus-test