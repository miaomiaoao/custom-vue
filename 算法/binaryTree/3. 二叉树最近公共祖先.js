
/**
 * 二叉树的最近公共祖先
 * 题目描述：给定一个二叉树，找到该树中两个指定节点的最近公共祖先
 * 最近公共祖先的定义：对于有树根T的两个节点p，q，最近公共祖先表示为一个节点x，
 * 满足x是p、q的祖先且x的深度尽可能大(一个节点也可以是它自己的祖先)
 * 
 * p=5, q=1, 最近公共祖先是节点3
 * p=5, q=4, 最近公共祖先是5
 * 
 * 
 * 解题思路：
 * 1. 如果树为空树或者根节点等于p、q任意节点，那么p和q的最近公共祖先节点就是根节点root
 * 2. 如果树不为空树，并且p、q和根节点不相等，那么就递归遍历左右子树
 *   1) 如果p和q节点左右子树的最近公共祖先节点都存在，说明p、q分布在左右子树上，
 *      则它们的最近公共祖先就是根节点root
 *   2) 如果只有一个子树，递归有结果，说明p和q都在这个子树中，那么就返回该树的递归的结果
 *   3) 如果两个子树递归结果都为null，说明p和q不在这两个子树中，那么就返回根节点root
 * 
 * 时间复杂度: O(n) 空间复杂度：O(n)
 * 
 * 
 */

//      3
//    /   \
//    5     1
//   / \   / \
//  6   2  0  8
//      / \  
//     7   4


function commonAncestor(root, p, q) {
  if (!root || root === p || root === q) {
    return root
  }

  const left = commonAncestor(root.left, p, q)
  const right = commonAncestor(root.right, p, q)

  if (!left) return right
  if (!right) return left

  return root
}

