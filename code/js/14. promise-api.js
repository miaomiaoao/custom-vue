/**
 * Promise.all()
 * Promise.any()
 * Promise.race()
 * Promise.allSettled()
 * Promise.prototype.catch()
 * Promise.prototype.finally()
 * Promise.prototype.then()
 * Promise.reject()
 * Promise.resolve()
 */

/**
 * Promise.resolve() 将给定的值装换位promise对象
 * 1. 如果这个值是promise，那么返回promise
 * 2. 如果这个值是thenable, 返回promise跟随这个thenable对象
 * 3. 将返回的promise以此值完成，即以此值执行resolve()方法
 */

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
      func(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }

  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {
      throw reason
    }

    const promise2 = new myPromise((resolve, reject) => {
      if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })

        this.onRejectedCallbacks.push(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }

      if (this.status === FULLFILLED) {
        setTimeout(() => {
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

  static resolve(value) {
    if (value instanceof myPromise) {
      return value
    } else if (value instanceof Object && 'then' in value) {
      return new myPromise((resolve, reject) => {
        value.then(resolve, reject)
      })
    }

    return new myPromise((resolve, reject) => {
      resolve(value)
    })
  }

  static reject(reason) {
    return new myPromise((resolve, reject) => {
      reject(reason)
    })
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  finally(callback) {
    return this.then(callback, callback)
  }

  /**
   * all方法接收一个可迭代(iterable)的类型(Array,Map,Set)
   * 并且返回一个promise实例
   * 
   * 需要判断传入的是否是一个数组，如果不是数组的话，要注意抛出异常
   * 
   * 传入的参数要判断是否是promise对象，如果不是就直接返回值，如果是要等待promise解决完成之后
   * 
   * 再返回值
   */
  static all(promises) {
    return new myPromise((resolve, reject) => {
      if(Array.isArray(promises)) {

        let result = []
        let count = 0

        if (promises.length === 0) {
          resolve(promises)
        }

        promises.forEach((item, index) => {
          if (item instanceof myPromise) {
            myPromise.resolve(item).then(value => {
              count++,
              result[index] = value
              count === promises.length && resolve(result)
            },
            reason => {
              reject(reason)
            })
          } else {
            // 参数里面的非promise值
            count++
            result[index] = item
            count === promises.length && resolve(result)
          }
        })


      } else {
        return reject(new Error('参数类型不正确'))
      }
    })
  }
  /**
   * allSettled方法返回一个在所有给定的promise都已经fulfilled
   * 或者rejected后的promise，并带有一个对象数组，每个对象都表示
   * 对应的promise结果
   * 
   * 1. 当妮有多个彼此不依赖的异步任务成功完成时，或者你总想知道每个promise的
   * 结果时，通常使用它
   * 2. 相比之下，promise.all更适合彼此相互依赖或者在其中任何一个reject时立即结束
   * @param {*} promises 
   */
  static allSettled(promises) {
    return new Promise((resolve, reject) => {
      if (Array.isArray(promises)) {
        let result = []
        let count = 0
        if (promises.length === 0) return Promise.resolve(promises)
        promises.forEach((item, index) => {
          myPromise.resolve(item).then(
            value => {
              count++
              result[index] = {
                value,
                status: 'fullfilled'
              }
              count === promises.length && resolve(result)
            },
            reason => {
              count++
              result[index] = {
                reason,
                status: 'rejected'
              }
              count === promises.length && resolve(result)
            }
          )
        })
      } else {
        return reject(new TypeError('Argument is not iterable'))
      }
    })
  }


  /**
   * any 只要有一个返回成功的，就算成功
   */
  static any(promises) {
    return new Promise((resolve, reject) => {
      if(Array.isArray(promises)) {
        let errors = []
        let count = 0
        if (promises.length === 0) return reject(new AggregateError('All promises were rejected'))
        promises.forEach((item) => {
          myPromise.resolve(item).then(
            value => {
              resolve(value)
            },
            reason => {
              count++
              errors.push(reason)
              count === promises.length && reject(new AggregateError(errors))
            }
          )
        })
      } else {
        return reject(new TypeError('Argument is not iterable'))
      }
    })
  }

  /**
   * race 返回最开始执行完的
   */
  static race(promises) {
    return new Promise((resolve, reject) => {
      if (Array.isArray(promises)) {
        if (promises.length > 0) {
          promises.forEach(item => {
            myPromise.resolve(item).then(resolve, reject)
          })
        }
      } else {
        return reject(new TypeError('Argument is not iterable'))
      }
    })
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) {
    return reject(new TypeError('chaining cyle detected for promise'))
  }

  if (x instanceof myPromise) {
    if (x.status === PENDING) {
      x.then(y => {
        resolvePromise(promise2, y, resolve, reject)
      }, reject)
    } else if (x.status === FULLFILLED) {
      resolve(this.value)
    } else if (x.status === REJECTED) {
      reject(this.reason)
    }

  } else if (x !== null && ((typeof x === 'object') || (typeof x === 'function'))) {
    try {
      var then = x.then
    } catch (e) {
      return reject(e)
    }

    if (typeof then === 'function') {
      let called = false; // 避免多次调用
      try {
        then.call(
          x,
          y => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          r => {
            if (called) return;
            called = true;
            reject(r);
          }
        )
      } catch (e) {
        if (called) return;
        called = true;
        reject(e);
      }
    } else {
      resolve(x);
    }

  } else {
    return resolve(x)
  }

}

// 测试promise.all
// const promise1 = myPromise.resolve(3);
// console.log(promise1)
// const promise2 = 42;
// const promise3 = new myPromise((resolve, reject) => {
//   setTimeout(resolve, 100, 'foo');
// });

// myPromise.all([promise1, promise2, promise3]).then((values) => {
//   console.log(values);
// });

// 测试promise.allSettled
// const promise1 = myPromise.resolve(3);
// const promise2 = 1;
// const promises = [promise1, promise2];

// myPromise.allSettled(promises).
// then((results) => results.forEach((result) => console.log(result)));

// setTimeout(() => {
//   const p1 = myPromise.resolve(3);
//   const p2 = new myPromise((resolve, reject) => setTimeout(reject, 100, 'foo'));
//   const ps = [p1, p2];

//   myPromise.allSettled(ps).
//   then((results) => results.forEach((result) => console.log(result)));
// }, 1000);

// myPromise.allSettled([]).then((results) => console.log(results))

// 测试promise.any()
// 发现报错了， 提示 AggregateErro 没有定义， 这里不是我们代码的问题， 是因为这个 AggregateErro， node v14 .15 .4 版本没有支持， 按理说这个版本已经很高了， 为什么还没有支持呢？
// 和 Promise.any() 一样， 这个 AggregateError 也是一个实验中的功能， 处于Stage 3 Draft(第三阶段草案)：

// 我们通过升级 node 版本来兼容这些处于草案阶段的实验功能~

// 从 node v14.15.4 升级到最新的 node v16.13.0
myPromise.any([]).catch(e => {
  console.log(e);
});

const pErr = new Promise((resolve, reject) => {
  reject("总是失败");
});

const pSlow = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "最终完成");
});

const pFast = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "很快完成");
});

Promise.any([pErr, pSlow, pFast]).then((value) => {
  console.log(value);
  // 期望输出: "很快完成"
})


const pErr1 = new myPromise((resolve, reject) => {
  reject("总是失败");
});

const pErr2 = new myPromise((resolve, reject) => {
  reject("总是失败");
});

const pErr3 = new myPromise((resolve, reject) => {
  reject("总是失败");
});

myPromise.any([pErr1, pErr2, pErr3]).catch(e => {
  console.log(e);
})
