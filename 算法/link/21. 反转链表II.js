/**
 * 反转从m到n位置的链表.请使用一趟扫描完成反转
 * 
 * 1 -> 2 -> 3 -> 4 -> 5 -> null m = 2, n = 4
 * 1 -> 4 -> 3 -> 2 -> 5 -> null
 * 
 * 解题思路：将m到n的节点进行反转，然后将m-1指向n， 将m指向n+1
 */

function reverseBetween(head, m, n) {
  // 定义虚拟头节点
  let dummy = new ListNode()
  dummy.next = head

  // 寻找第m+1节点
  let p = dummy
  // m = 2 i < 2 - 1 i < 1  i只有两个值 0 和 1
  for (let i = 0; i < m - 1; i++) {
    p = p.next
  }

  // 定义当前节点和前驱节点，当前节点指向m节点
  let pre = null
  let cur = p.next

  // 1 -> 2 -> 3 -> 4 -> 5 -> null
  for (let i = 0; i <= n - m; i++) {
    let next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }

  // 将反转的局部链表和原链表拼接
  p.next.next = cur
  p.next = pre

  return dummy.next
}