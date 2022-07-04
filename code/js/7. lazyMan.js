//  能够链式调用
//   无论firstSleep在什么位置都最先执行
//   当firstSleep执行完毕之后，后面按照链式调用的顺序执行
//   遇到sleep函数，会阻止函数执行，必须等延迟结束之后再按照顺序执行

// 思路：
//   由于有sleep功能，函数不能直接在调用的时候触发
//   初始化一个列表，把函数注册进去
//   由每个item出发next执行(遇到sleep则异步触发)
/**
* 
* 链式调用
* 任务队列
* 延迟触发
*/
class LazyMan {
  constructor(name='') {
    this.name = name;
    this.tasks = [];

    setTimeout(() => {
      this.next()
    }, 0)
  }

   next () {
    const task = this.tasks.shift() // 去除当前第一个task
    if (task) task()
  }

  eat (food) {
    const task = () => {
      console.log(`${this.name} eat ${food}`)
      this.next()
    }
    this.tasks.push(task)
    return this
  }

  firstSleep (second) {
    const task = () => {
      console.log(`${this.name} first sleep`)
      setTimeout(() => {
        this.next()
      }, second * 1000)
    }

    this.tasks.unshift(task)
    return this
  }

  sleep (second) {
    const task = () => {
      console.log(`${this.name} 开始睡觉`)
      setTimeout(() => {
        console.log(`${this.name}已经睡完了 开始执行下一个任务`)
        this.next()
      }, second * 1000)
    }
    this.tasks.push(task)
    return this
  }
}

const lazyMan = new LazyMan('xuying')

lazyMan.eat('苹果').firstSleep(10).eat('香蕉').sleep(10).eat('橙子')