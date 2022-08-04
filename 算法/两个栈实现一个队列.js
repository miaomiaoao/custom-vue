// 队列是先进先出
class Queue {
  constructor() {
    this.stack1 = []
    this.stack2 = []
  }

  add(value) {
    this.stack1.push(value)
  }

  delete() {
    let res
    const stack1 = this.stack1
    const stack2 = this.stack2

    // 将stack1中所有元素移动到stack2
    while(stack1.length) {
      const n = stack1.pop()
      if (n !== null) {
        stack2.push(n)
      }
    }

    res = stack2.pop()

    while(stack2.length) {
      const n = stack2.pop()
      if (n !== null) {
        stack1.push(n)
      }
    }

    return res || null
  }

  get length() {
    return this.stack1.length
  }
}

const queue = new Queue()
queue.add(1)
queue.add(2)
queue.add(3)

console.log(queue.stack1)

queue.delete()

console.log(queue.stack1)