const FULLFILLED = 'FULLFILLED';
const REJECTED = 'REJECTED';
const PENDING = 'PENDING';

class customPromise {
  constructor(executor) {
    this.status = 'PENDING'
    this.value = undefined
    this.reason = undefined

    let resolve = (value) => {
      if (this.status === 'PENDING') {
        
      }
    }

    let reject = reason => {

    }
    try {
      executor(resolve, reject)
    } catch(e) {
      reject(e)
    }
  }
}


const promise = new CustomPromise((resolve, reject) => {
  console.log('111')
});