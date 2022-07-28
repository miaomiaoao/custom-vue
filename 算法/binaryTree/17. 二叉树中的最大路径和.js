// 输入：[1,2,3]
//        1
//       / \
//      2   3
// 输出：6

// 输入：[-10,9,20,null,null,15,7]
//    -10
//    / \
//   9  20
//     /  \
//    15   7
// 输出：42

/**
 * 解题思路：我们可以使用递归遍历二叉树，需要的是最大的路径和，所以某个节点左右子树
 * 路径和，和这个节点的值的和的最大值就是我们要求的解
 * 
 * 需要注意：一条从父节点延伸下来的路径，只能进入左子树或者右子树，不能同时进入左右子树
 * 只有在最大贡献值大于0时，才会选取对应子节点
 */

function maxPathSum(root) {
  let sum = Number.MIN_SAFE_INTEGER

  const dfs = (root) => {
    if (!root) return 0
    // 计算左右子树的最大路径和
    const left = dfs(root.left)
    const right = dfs(root.right)

    // 计算总的最大路径和
    const maxSum = left + root.val + right
    sum = Math.max(sum, maxSum)

    // 返回当前计算出的最大路径
    const max = root.val + Math.max(left, right)
    return max < 0 ? 0 : max
  }
  dfs(root)
  return sum
}