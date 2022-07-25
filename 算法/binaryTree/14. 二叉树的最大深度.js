//     1
//    / \
//   2   3
//  / \     
// 4   5 

// 这个题比上一道题简单，上一道题求知直径还要做加法。这道题直接返回l 或者 r 的最大值

function maxDepthOfBinaryTree(root) {
  if (!root) return 0

  const l = dfs(rootNode.left)
  const r = dfs(rootNode.right)

  return Math.max(l, r) + 1
}