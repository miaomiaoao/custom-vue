/**
 * 给定一个二叉树，判断它是否是高度平衡的二叉树
 * 
 * 平衡二叉树：一个二叉树每个叶子节点的左右两个子树的高度差绝对值不能超过1 
 * 
 * 解题思路: 递归 + dfs
 */


//  3
//  / \
// 9  20
//   /  \
//  15   7
// 返回true

// 1
// / \
// 2   2
// / \
// 3   3
// / \
// 4   4
// 返回false



function isBalancedTree(root) {
  let flag = true
  function dfs(root) {
    if (!root || !flag) return 0

    const left = dfs(root.left)
    const right = dfs(root.right)

    if (Math.abs(left - right) > 1) {
      flag = false
    }

    return Math.max(left, right + 1)
  }

  dfs(root)
  return flag
}