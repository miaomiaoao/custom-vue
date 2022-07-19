/**
 * 题目描述:给定一颗二叉树，你需要计算它的直径长度。一颗二叉树的
 * 直径长度是任意两个节点路径长度中的最大值。这条路径可能穿过也可能不穿过根节点
 * 
 * 结果，返回3 它的长度是路径[4, 2, 1, 3] 或者 [5, 2, 1, 3]
 * 
 * 
 * 解题思路：遇到二叉树的问题，我们在遍历的时候通常是采用深度优先遍历或者官渡优先遍历。这里需要
 * 求直径，我们就想到了深度优先遍历
 * 从根节点进行遍历，在遍历到每个节点的时候，将其左右子树的最大深度加在一起，与结果res对比，并且将最大
 * 的值赋予给res。这样使res一直保持是最大的值
 */

//     1
//    / \
//   2   3
//  / \     
// 4   5    


function diameterOfBinaryTree(root) {
  let res = 0

  function depth(rootNode) {
    if (!rootNode) return 0

    let l = depth(rootNode.left)
    let r = depth(rootNode.right)

    res = Math.max(res, l + r) // 计算最大直径l + r 更新res
    return Math.max(l, r) + 1 // 返回以该节点为根的子树的深度
  }

  depth(root)
  return res
}