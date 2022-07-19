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

  then(onFulfilled, onRejected) {
    if (this.status === FULLFILLED) {
      onFulfilled(this.value)
    }

    if (this.status == REJECTED) {
      onRejected(this.reason)
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

let promise1 = new myPromise((resolve, reject) => {
  resolve(111)
})


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