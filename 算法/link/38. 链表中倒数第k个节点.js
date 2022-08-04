/**
 * 输入一个链表，输出该链表中倒数第k个节点。
 * 输入 1 -> 2 -> 3 -> 4 -> 5 和 k = 2  返回链表 4 -> 5
 * 
 * 解题思路，使用快慢指针来解决，初始化slow 和 fast两个指针，开始时两个指针都在链表的头部
 * 
 * 首先让快指针fast先走，向后走k个节点，这个样快指针和慢指针相差k个节点，所以此时慢指针所指向的节点就是倒数第k个节点
 */

function getKthFromEnd(head, k) {
  let slow = head, fast = head
  let cur = 0
  while (cur < k) {
    fast = fast.next
    cur++
  }
  while(fast) {
    fast = fast.next
    slow = slow.next
  }
  return slow
}