/**
 * 能够链式调用
 * 无论firstSleep在什么位置都最先执行
 * 当firstSleep执行完毕之后，后面按照链式调用的顺序执行
 * 遇到sleep函数，会阻止函数执行，必须等延迟结束之后再按照顺序执行
 * 
 * 链式调用
 * 任务队列
 * 延迟触发
 */
class LazyMan {
  private name: string
  private tasks: Function[] = [] // 任务队列
  constructor(name: string) {
    this.name = name

    setTimeout(() => {
      this.next()
    }, 0)
  }

  private next() {
    const task = this.tasks.shift() // 去除当前第一个task
    if (task) task()
  }

  eat(food: string) {
    const task = () => {
      console.log(`${this.name} eat ${food}`)
      this.next()
    }
    this.tasks.push(task)
    return this
  }

  firstSleep(second: number) {
    const task = () => {
      console.log(`${this.name} first sleep`)
      setTimeout(() => {
        this.next()
      }, second * 1000)
    }

    this.tasks.unshift(task)
    return this
  }

  sleep(second: number) {
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