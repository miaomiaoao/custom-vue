/**
 * 给定一颗二叉树，找出其最大深度
 * 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数
 * 
 * 
 * 最大深度是3
 * 
 * 解题思路： 当节点为空时就返回0，节点不为空的时候就对左右子树分别递归，
 * 求出左右子树的最大高度，则该树的最大高度就是左右子树中高度的最大值
 * 
 */

//  3
//  / \
// 9  20
//   /  \
//  15   7


function maxDeepOfBinaryTree(root) {
  if (!root) return 0
  
  let l = maxDeepOfBinaryTree(root.left)
  let r = maxDeepOfBinaryTree(root.right)

  return Math.max(l, r) + 1
}