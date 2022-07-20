let PENDING = 'pending'
let FULLFILLED = 'fullfilled'
let REJECTED = 'rejected'
class myPromise {
  constructor(func) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    try {
      // 之前的写法是 func(this.resolve.bind(this), this.reject.bind(this))
      func(this.resolve.bind(this), this.reject.bind(this))
    } catch(error) {
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
    if (this.status === FULLFILLED) {
      setTimeout(() => {
        onFulfilled(this.value)
      }, 0)
    }

    if (this.status == REJECTED) {
      setTimeout(() => {
        onRejected(this.reason)
      }, 0)
    }
  }
 
  resolve(value) {
    if (this.status === PENDING) {
      this.status = FULLFILLED
      this.value = value
    }
  }

  reject(reason) {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason
    }
  }
}


// 此时的打印顺序为什么不对？因为先执行了promise.then。此时还未resolve，状态还是pending。所以promise无法执行
console.log(1)
let promise1 = new myPromise((resolve, reject) => {
  console.log(2)
  setTimeout(() => {
    resolve(111)
  }, 0)
})
promise1.then(value => {
  console.log('fulfilled:', value)
}, reason => {
  console.log('rejected:', reason)
})

console.log(3)

// new Promise((resolve, reject) => {
//   console.log('promise1')
//   resolve()
// }).then(() => {
//   console.log('then11')
//   new Promise((resolve, reject) => {
//     console.log('promise2')
//     resolve()
//   }).then(() =>{
//     console.log('then21')
//   }).then(() =>{
//     console.log('then23')
//   })
// }).then(() => {
//   console.log('then12')
// })