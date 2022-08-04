function preorderTraversal( root ) {
  if (!root) return []
  // write code here
  const stack = [root]
  const res = []
  while(stack.length) {
      root = stack.pop()
      res.push(root.val)
      root.right && stack.push(root.right)
      root.left && stack.push(root.left)
  }
  return res
}