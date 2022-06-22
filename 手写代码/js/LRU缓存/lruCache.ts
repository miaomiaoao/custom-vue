interface IListNode {
  value: any,
  key: string,
  prev?: IListNode
  next?: IListNode
}

class LRUCache {
  private length: number
  private data: { [key: string]: IListNode } = {}
  private dataLength: number = 0
  private listHead: IListNode | null = null
  private listTail: IListNode | null = null
  constructor(length: number) {
    if (length < 1) throw new Error('invalid length')
    this.length = length
  }

  private moveToTail(curNode: IListNode) {
    const listTail = this.listTail
    
    if (listTail === curNode) return

    // 1. 让prevNode 和 nextNode 与 curNode断开联系
    const prevNode = curNode.prev
    const nextNode = curNode.next

    if (prevNode) {
      if (nextNode) {
        prevNode.next = nextNode
      } else {
        delete prevNode.next
      }
    }

    if (nextNode) {
      if (prevNode) {
        nextNode.prev = prevNode
      } else {
        delete nextNode.prev
      }
    }

    // 2. 断开curNode 与 preNode 和 nextNode 的关系
    if (curNode.prev) delete curNode.prev
    if (curNode.next) delete curNode.next

    // 3. 在list尾部重新建立curNode的新关系
    if (listTail) {
      listTail.next = curNode
      curNode.prev = listTail
    }

    this.listTail = curNode

  }

  private tryClean() {
    while (this.dataLength > this.length) {
      const head = this.listHead
      if (head === null) throw new Error('head is null')

      const headNext = head.next
      if (headNext === null) throw new Error('headNext is null')

      // 1. 断绝head和next的关系
      delete headNext.prev
      delete head.next

      // 2. 重新赋值listHead
      this.listHead = headNext

      // 3. 清理data， 重新计数

      delete this.data[head.key]

      this.dataLength = this.dataLength - 1
    }
  }

  get(key: string):any {
    const data = this.data
    const curNode = data[key]

    if (!curNode) return -1

    // 如果在最后一个位置
    if (this.listTail === curNode) {
      return curNode.value
    }

    // 如果不在最后一个位置
    this.moveToTail(curNode)

    return curNode.value
  }

  set(key: string, value: any) {
    const data = this.data
    const curNode = data[key]

    if (curNode) {
      // 修改现有数据
      curNode.value = value
      this.moveToTail(curNode)
    } else {
      const newNode: IListNode = { key,  value }

      data[key] = newNode
      this.dataLength++

      this.moveToTail(newNode)

      if (this.dataLength === 1) this.listHead = newNode

      this.tryClean()
    }
  }


}