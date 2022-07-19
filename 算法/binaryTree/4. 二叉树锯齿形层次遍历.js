/**
 * 给定一个二叉树，返回其节点值的锯齿形层次遍历(即从左往右，在)
 * 例如：
 * 给定二叉树 [3,9,20,null,null,15,7],
 * 
 * 解题思路：可以采用递归的方式来解答，每层都创建一个数组，奇数层从左
 * 往右依次插入数组，偶数层从右往左依次插入数组
 * 
 * 用 i & 1来判断层数奇偶
 * 
 * i & 1 == 1 奇数
 * i & 1 == 0 偶数
 */


//  3
//  / \
// 9  20
//   /  \
//  15   7

/**
 * 返回
 * [
 *  [3],
 *  [20, 9],
 *  [15, 7]
 * ]
 */


function zigzagLevelOrder (root) {
  const res = []
  function dfs(i, current) {
    if (!current) return
    if (Array.isArray(res[i])) {
      res[i] = []
    }

    if (i & 1) {
      res[i].unshift(current.val)
    } else {
      res[i].push(current.val)
    }

    dfs(i + 1, current.left)
    dfs(i + 1, current.right)
  }

  dfs(0, root)
}
