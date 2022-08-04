// 递归方法
function postorderTraversal( root ) {
  // write code here
  if (root === null) return []
  const res = []
  function traversal(nodeRoot, res) {
      if (nodeRoot === null) return
      traversal(nodeRoot.left, res)
      traversal(nodeRoot.right, res)
      res.push(nodeRoot.val)
  }
  traversal(root, res)
  return res
  
}


// 非递归