export class MyQueue {
  private stack1: number[] = []
  private stack2: number[] = []

  add(n: number) {
    this.stack1.push(n)
  }

  delete():number | null {
    let res
    const stack1: number[] = this.stack1
    const stack2: number[] = this.stack2
    // 将stack1中所有元素移动到stack2中
    while(stack1.length) {
      const n = stack1.pop()
      if(n !== null && n !== undefined) {
        stack2.push(n)
      }
    }

    // stack2 pop

    res = stack2.pop()
    // 将stack2中的元素再还给stack1
    while(stack2.length) {
      const n = stack2.pop()
      if(n !== null && n !== undefined) {
        stack1.push(n)
      }
    }

    return res || null
  }

  get length(): number {
    return this.stack1.length
  }
}

const queue = new MyQueue()
queue.add(1)
queue.add(2)
console.log(queue.length)
console.log(queue.delete())
console.log(queue.length)