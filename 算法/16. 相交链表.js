/**
 * 找单链表相交的节点
 * 解题思路： 一个比较直接的方法就是用双指针来解决，思路就是将链表拼成ab和ba这样就消除了两者的高度差
 * 如果a和b右相交的部分，那么ab和ba也一定有相交的部分。
 * 1. 定义两个指针p1和p2
 * 2. p1从链表a的头部开始走，走完再从链表b的头部开始走
 * 3. p2从链表b的头部开始走，走完再从链表a的头部开始走
 * 4. 如果存在相交的点，就直接返回p1或者p2
 * 
 */

function getIntersectionNode(headA, headB) {
  let pA = headA
  let pB = headB

  while(pA !== pB) {
    pA = pA === null ? headB : pA.next
    pB = pB === null ? headA : pB.next
  }

  return pA
}