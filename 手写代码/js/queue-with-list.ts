/**
 * @description 用链表实现队列
 */

interface ILinkListNode {
  value: number,
  next: ILinkListNode | null // 等于 next: ILinkListNode | null
}

export class MyQueue {
  private head? : ILinkListNode
  private tail? : ILinkListNode
  private len = 0
  /**
   * 在tail入队
   * @param n number
   */
  add(n: number) {
    const newNode: ILinkListNode = {
      value: n,
      next: null
    }

    // 处理head
    if(this.head == null) {
      this.head = newNode
    }

    // 处理tail
    const tailNode = this.tail
    if(tailNode) {
      tailNode.next = newNode
    }
    this.tail = newNode

    // 记录长度
    this.len++
  }

  /**
   * 出队，从head删除
   */
  delete(): number | null {
    // @ts-ignore
    const headNode:ILinkListNode = this.head
    if(headNode === null || headNode === undefined) return null
    if(this.len <= 0) return null
    
    const value = headNode.value

    // @ts-ignore
    this.head = headNode.next
    this.len--
    return value

  }

  // 如果一个方法前面加了get，就可以像属性一样调用它，不用加括号
  get length(): number {
    // 单独存储,不能遍历链表来存储
    return this.len
  }
}

// const queue = new MyQueue()
// queue.add(1)
// queue.add(2)
// queue.add(3)
// console.log(queue.length)
// console.log(queue.delete())

// 性能测试
// 17ms
const q1 = new MyQueue()
console.time('queue with list')
for(let i = 0; i < 10 * 10000; i++) {
  q1.add(i)
}

for(let i = 0; i < 10 * 10000; i++) {
  q1.delete()
}
console.timeEnd('queue with list')



// 431ms
const q2 = []
console.time('queue with array')
for(let i = 0; i < 10 * 10000; i++) {
  q2.push(i)
}

for(let i = 0; i < 10 * 10000; i++) {
  q2.shift()
}
console.timeEnd('queue with array')