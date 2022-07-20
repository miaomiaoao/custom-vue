// https: //juejin.cn/post/7043758954496655397#heading-8
let PENDING = 'pending'
let FULLFILLED = 'fullfilled'
let REJECTED = 'rejected'
class myPromise {
  constructor(func) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledCallbacks = [] // 保存成功回调
    this.onRejectedCallbacks = [] // 保存失败的回调
    try {
      // 之前的写法是 func(this.resolve.bind(this), this.reject.bind(this))
      func(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }

  }
  /**
   * promise规范， 如果onFulfilled和onRejected不是函数， 就忽略他们
   * 忽略不是什么都不做，对于onFulfilled来说忽略就是将value原封不动的返回
   */

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {
      throw reason
    }

    const promise2 = new myPromise((resolve, reject) => {
      if (this.status === PENDING) {
        //  this.onFulfilledCallbacks.push(onFulfilled)
        //  this.onRejectedCallbacks.push(onRejected)
        this.onFulfilledCallbacks.push(() => {
          try {
            let x = onFulfilled(this.value)
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })

        this.onRejectedCallbacks.push(() => {
          try {
            let x = onRejected(this.reason)
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }

      if (this.status === FULLFILLED) {
        setTimeout(() => {
          // 2.2.7.1规范，如果onFulfilled或者onRejected返回一个值x
          // 则运行下面的Promise解决过程[[Resolve]](promise2, x)

          // 2.2.7.2 如果onFulFilled或者onRejected抛出一个异常e，则promise2必须
          // 拒绝执行，并返回拒绝原因e
          try {
            let x = onFulfilled(this.value)
            resolve(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }

      if (this.status == REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolve(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
    })

    return promise2

  }

  resolve(value) {
    // 加了settimeout是因为resolve和reject需要在事件末尾去执行
    if (this.status === PENDING) {
      setTimeout(() => {
        this.status = FULLFILLED
        this.value = value
        this.onFulfilledCallbacks.forEach(cb => {
          cb(value)
        })
      })
    }
  }

  reject(reason) {
    if (this.status === PENDING) {
      setTimeout(() => {
        this.status = REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(cb => {
          cb(reason)
        })
      })
    }
  }


  /**
   * promise的解决过程 [[Resolve]](promise2, x)
   * 就是对resolve()和reject() 进行改造增强，针对resolve()
   * 和reject()中不同情况进行处理
   * 
   * resolve()和reject()返回的x值的几种情况
   * 1. 普通值
   * 2. Promise对象
   * 3. thenable对象/函数
   * 
   * promise2 promise1.then方法返回的新的promise对象
   * x promise1中onFulfilled火onRejected的返回值
   * resolve promise2的resolve方法
   * rejeect promise的reject方法
   * 
   */
  resolvePromise(promise2, x, resolve, reject) {
    // 如果从onFulfilled或者onRejected中返回的x是promise2，会导致引用报错
    // 详情看示例
    if (x === promise2) {
      return reject(new TypeError('chaining cyle detected for promise'))
    }

    // 2.3.2 如果x未promise，则接受x的状态
    if (x instanceof myPromise) {
      /**
       * 2.3.2.1 如果x处于等待的状态，promise需要保持为等待直至x被执行或者拒绝
       * 注意直至x被执行或者拒绝这句话
       * 这句话的意思是：x被执行x，如果执行的时候拿到一个y，还要继续执行y
       */
      if (x.status === PENDING) {
        x.then(y => {
          this.resolvePromise(promise2, y, resolve, reject)
        }, reject)
      } else if (x.status === FULLFILLED) {
        // 2.3.2.2 如果x处于执行状态，用相同的值执行promise
        resolve(this.value)
      } else if (x.status === REJECTED) {
        // 2.3.2.3 如果x处于拒绝状态，用相同的原因拒绝promise
        reject(this.reason)
      }

    } else if (x !== null && ((typeof x === 'object') || (typeof x === 'function'))) {
      // 2.3.3 如果xWie对象或者函数
      try {

        // 2.3.3.1 把x.then赋值给then
        var then = x.then
      } catch (e) {
        // 2.3.3.2 如果取x.then的值抛出异常，则e未拒绝promise的理由
        return reject(e)
      }

      /**
       * 2.3.3 如果then是函数，将x作为函数的作用于this调用之，
       * 传递两个回调函数作为参数
       * 第一个参数叫resolvePromise， 第二个参数叫rejectPromise
       */

      if (typeof then === 'function') {
        // 2.3.3.3.3 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
        let called = false; // 避免多次调用
        try {
          then.call(
            x,
            // 2.3.3.3.1 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
            y => {
              if (called) return;
              called = true;
              resolvePromise(promise2, y, resolve, reject);
            },
            // 2.3.3.3.2 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
            r => {
              if (called) return;
              called = true;
              reject(r);
            }
          )
        } catch (e) {
          /**
           * 2.3.3.3.4 如果调用 then 方法抛出了异常 e
           * 2.3.3.3.4.1 如果 resolvePromise 或 rejectPromise 已经被调用，则忽略之
           */
          if (called) return;
          called = true;
          /**
           * 2.3.3.3.4.2 否则以 e 为据因拒绝 promise
           */
          reject(e);
        }
      } else {
        // 2.3.3.4 如果 then 不是函数，以 x 为参数执行 promise
        resolve(x);
      }

    } else {
      // 2.3.4 如果不为对象或者函数，以x为参数执行promise
      return resolve(x)
    }

  }
}

module.exports = myPromise

/**
 * 此时的打印顺序为什么不对？ 因为先执行了promise.then。 此时还未resolve， 状态还是pending。 所以promise无法执行
 * 我们需要创建一个数组，保存then里面的函数
 * 为什么使用数组来保存这些回调呢。因为promise实例可能会多次then。也就是经典的链式调用。
 * 而且数组是先入先出的顺序
 * 
 * 在执行resolve或者reject的时候，去遍历回调函数并且执行
 */

// console.log(1)
// let promise1 = new myPromise((resolve, reject) => {
//   console.log(2)
//   setTimeout(() => {
//     resolve(111)
//   }, 0)
// })
// promise1.then(value => {
//   console.log('fulfilled:', value)
// }, reason => {
//   console.log('rejected:', reason)
// })

// console.log(3)
new myPromise((resolve, reject) => {
  console.log('promise1')
  resolve('promise1')
}).then(() => { 
  console.log('then11')
  new myPromise((resolve, reject) => {
    console.log('promise2')
    resolve('promise2') // 调用resolve的时候，已经执行settimeout(() => { 执行成功回调函数 })
  }).then(() =>{
    console.log('then21')
    return 'then21'
  }).then(() =>{
    console.log('then23')
  })
  return 'then11' 
}).then(() => {
  console.log('then12')
  return 'then12'
})

/**
 * 1. 先执行new Promise()时传入的函数，执行console.log('promise1'), 执行resolve()
 * 因为resolve()源码中使用了settimeout，所以需要在下一轮事件循环执行settimeout里面的方法
 * 2. 执行then11，创建一个新的promise2， 并返回promise2， 因为此时的状态是pending，所以将回调函数加入到回调队列中
 * 3. 执行then12， 创建一个promise3， 并返回promise3， 因为此时的状态是pending， 所以将回调函数加入到回调队列中
 * 注意，这两个步骤创建的是不同的promise，任务队列也是两个
 * 4. 执行resolve方法，状态变为fullfilled,执行第一个then方法
 */

// x等于promise2的例子
// const promise = new Promise((resolve, reject) => {
//   resolve(100)
// })
// const p1 = promise.then(value => {
//   console.log(value)
//   return p1
// })