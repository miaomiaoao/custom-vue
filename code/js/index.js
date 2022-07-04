class lazyMan {
  constructor(name='') {
    this.name = name
    this.task = []

    setTimeout(() => {
      this.next()
    }, 0)
  }

  next() {
    const task = this.tasks.shift() 
    if (task) task()
  }

  eat(food) {
    const task = () => {
      console.log(`${this.name} eat ${food}`)
      this.next()
    }

    this.task.push(task)
    return this
  }

  sleep(second) {
    const task = () => {
      console.log(`${this.name} sleep`)
      setTimeout(() => {
        console.log(`${this.name}已经睡完了，开始执行下一个任务`)
        this.next()
      }, second * 1000)
    }

    this.tasks.push(task)
    return this
  }


  sleepFirst(second) {
    const task = () => {
      console.log(`${this.name} first sleep`)
      setTimeout(() => {
        this.next()
      }, second * 1000)
    }

    this.tasks.unshift(task)
    return this
  }
}


const lazyMan = new LazyMan('xuxu')

