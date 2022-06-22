/**
 * @description 实现一个lru缓存
 * 第一种：Map实现
 */


class LRUCache {
  constructor(length) {
    this.data = new Map()
    this.length = length
  }

  get(key) {
    if (this.data.has(key)) {
      const targetValue = this.data.get(key)
      this.data.delete(key)
      this.data.set(key, targetValue)
      console.log(targetValue)
      console.log(this.data)
      return targetValue
    } else {
      return -1
    }
  }

  set(key, value) {
    if (this.data.has(key)) {
      this.data.delete(key)
    }
    this.data.set(key, value)

    if (this.data.size > this.length) {
      const delKey = this.data.keys().next().value
      this.data.delete(delKey)
    }

    console.log(this.data)
  }
}

const lruCache = new LRUCache(2)

console.log(lruCache.get(1)) // -1 不存在

lruCache.set(1, 1) // Map { 1 => 1 }

lruCache.set(2, 2) // Map { 1 => 1, 2 => 2 }

lruCache.get(1) // 1 Map { 2 => 2, 1 => 1 } 因为1最近被使用过，所以放在前面

lruCache.set(3, 3) // Map { 1 => 1, 3 => 3 } 2超出容量限制，被删除

/**
 * 第二种：双向链表
 */