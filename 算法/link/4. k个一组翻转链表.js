/**
 * 链表: 1 -> 2 -> 4 -> 5
 * 当k = 2时, 应该返回: 2 -> 1 -> 4 -> 3 -> 5
 * 当k = 3时, 应该返回: 3 -> 2 -> 1 -> 4 -> 5
 */

function reverseKGroup(head, k) {
  // node用来存第k个数的变量
  let pre = null, cur = head, node = head
  for (let i = 0; i < k; i++) {
    if (node === null) {
      return head
    }
    node = node.next
  }

  // 反转链表
  for (let i = 0; i < k; i++) {
    let next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }

  head.next = reverseKGroup(cur, k)
  return pre
}


let head = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {
        val: 4,
        next: {
          val: 5
        }
      }
    }
  }
}

reverseKGroup(head, 2)