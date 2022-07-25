//     1
//    / \
//   2   3
//  / \     
// 4   5    
/**
 * 返回3 它的长度是[4, 2, 1, 3] 或者[5, 2, 1, 3]
 * 将其左右子树的最大深度相加在一起，与结果夹对比
 */

function dimaterOfBinaryTree(root) {
  if (!root) return 0
  let res = 0
  function dfs(rootNode) {
    let l = dfs(rootNode.left)
    let r = dfs(rootNode.right)

    res = Math.max(res, l + r) // 计算直径l + r
    return Math.max(l, r) + 1 // 返回该节点为根子树的深度
  }

  dfs(root)

  return res
}
