/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
 var reverseList = function(head) {
  // 设置指针指向前驱节点和当前节点
  let pre = null
  let cur = head
  // 遍历链表，直到链表节点为空
  while (cur!= null){
      // 记录当前的节点，用于后面的遍历
      let next = cur.next
      // 调转链表的指针方向
      cur.next = pre
      // 向后移动指针
      pre = cur
      cur = next
  }
  return pre
};
