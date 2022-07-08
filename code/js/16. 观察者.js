class Subject {
  constructor() {
    this.observers = []
  }

  add(observe) {
    this.observers.push(observe)
    this.observers = [...new Set(this.observers)]
  }

  notify(...args) {
    this.observers.forEach(observer => observer.update(...args))
  }

  remove(observer) {
    let observers = this.observers
    for(let i = 0; i < observers.length; i++) {
      if (observers[i] === observer) observers.splice(i, 1)
    }
  }
}

class Observer {
  update(...args) {
    console.log(`更新了: ${args}`)
  }
}


// 观察者1
let observer1 = new Observer()
// 观察者2
let observer2 = new Observer()

// 创建主体
let sub = new Subject()
sub.add(observer1)
sub.add(observer2)

sub.notify('send msg')