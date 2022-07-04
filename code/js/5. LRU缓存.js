// LRU（Least Recently Used）是一种常见的页面置换算法

// // lru

// LRU的设计原理就是，当数据在最近一段时间经常被访问，那么它以后也会经常被访问，这就意味着，如果经常访问的数据，我们需要其能够快速被命中，而不经常访问的数据，我们在容量超出限制后，将其淘汰

// 解题思路
// -  哈希表，即key， value的形式，存取的时间复杂度是O(1)
// -  有序，可以清理最近不经常被访问的数据
// ps：Object虽然也是key value的形式，但是不是有序的
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
    // 更新key和value
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
