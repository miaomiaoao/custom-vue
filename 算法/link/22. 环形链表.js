/**
 * 给定一个链表，判断链表中是否又环
 * 为了表示给定链表中是否有环，我们使用整数pos来表示链表尾连接到链表中的位置(索引从0开始)
 * 如果pos是-1，则在该链表中没有环
 * 
 * 输入: head = [3, 2, 0, -4] pos = 1
 * 输出: true
 * 
 * 解题思路: 标记遍历过的每个点，后面再遇到他说明有环
 */
function hasCycle(head) {
  while(head) {
    if (head.flag) {
      return true
    } else {
      head.flag = true
      head = head.next
    }
  }

  return false
}
