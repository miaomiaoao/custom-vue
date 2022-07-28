  //   2
  //  / \
  // 1   3
  // true

  //   5
  //  / \
  // 1   4
  //    / \
  //   3   6
  // false
/**
 * 如何判断是否为一个有效的二叉搜索树
 * 二叉搜索树的特征：
 * 1. 节点左子树只包含小于当前节点的数
 * 2. 节点右子树只包含大于当前节点的数
 * 3. 所有左子树和右子树自身必须也是二叉搜索树
 * 
 * 
 * 解题思路:
 * 1. 使用dfs递归遍历整棵树，检验每颗子树中是否都满足左 < 根 < 右
 * 这样的关系。设定两个值：最大值和最小值分别是正无穷和负无穷，然后通过判断左孩子
 * 的值是否小于根节点，右孩子的值是否大于根节点来判断该二叉树是否为二叉搜索树
 * 2. 使用中序遍历
 */

function isValidBST(root) {
  function dfs(root, minValue, maxValue) {
    if (!root) return true
    if (root.val <= minValue || root.val >= maxValue) {
      return false
    }
    return dfs(root.left, minValue, root.val) && dfs(root.right, root.val, maxValue)
  }

  return dfs(root, -Infinity, Infinity)
}


// 中序遍历
function isValidBST2(root) {
  const queue = []
  function dfs(root) {
    if (!root) return true
    if (root.left) {
      dfs(root.left)
    }
    if (root) {
      queue.push(root.val)
    }
    if (root.right) {
      dfs(root.right)
    }
  }
  dfs(root)
  // 验证遍历的结果是否有序
  for (let i = 0; i < queue.length - 1;i++) {
    if (queue[i] >= queue[i + 1]) {
      return false
    }
  }
  return true
}
