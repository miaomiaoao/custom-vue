class eventEmitter {
  constructor() {
    this.events = {}
  }


  on(type, fn) {
    if (!this.events[type]) {
      this.events[type] = [fn]
    } else {
      this.events[type].push(fn)
    }
  }

  emit(type, ...rest) {
    this.events[type] && this.events[type].forEach(fn => fn.apply(this, rest))
  }

  once() {

  }

  off(type, fn) {
    if (this.events[type]) {
      this.events[type] = this.events.filter(item => {
        item !== fn
      })
    }
  }
}

const eventBus = new eventEmitter()
eventBus.on('click', function(args) {
  console.log(args)
  console.log('click方法执行')
})
eventBus.emit('click', 'aaaa')