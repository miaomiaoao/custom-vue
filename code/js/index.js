const PENDING = 'PENDING'
const FULLFILLED = 'FULLFILLED'
const REJECTED = 'REJECTED'
class customPromise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined

    try {
      executor(this.resolve, this.reject)
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
      this.reason = this.reason
    }
  }
}

const promise = new customPromise((resolve, reject) => {
  resolve(123)
}).then(res => {
  console.log(res)
}, () => {

})

// then有两个参数，一个