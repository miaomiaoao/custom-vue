/**
 * 1. LRU是一种常见的页面置换算法
 * 2. 最近常用的需要快速命中，不常用的当超出容量后将其淘汰
 */
// 第一种解法：map
class LruCache {
  constructor(size) {
    this.map = new Map()
    this.size = size
  }

  set(key, value) {
    if(this.map.has(key)) {
      this.map.delete(key)
    }

    this.map.set(key, value)

    if (this.map.size > this.size) {
      // 删除超出长度的数据
      // this.map.keys() 返回一个迭代器iterator { value: '', done: false}
      const delKey = this.map.keys().next().value
      this.map.delete(delKey)
    }
  }

  get(key) {
    if (this.map.has(key)) {
      const value = this.map.get(key)
      this.map.delete(key)
      this.map.set(key, value)
    } else {
      return -1;
    }
  }
}

const lruCache = new LruCache(2)
lruCache.set(1, 1)
lruCache.set(2, 2)

console.log(lruCache.get(1, 1))
console.log(lruCache.map)
lruCache.set(3, 3)
console.log(lruCache.map)




// 第二种解法：链表