function maxOfLine(node, level = 0, res=[]) {
  if (!node) return
  res[level] = Math.max(res[level] || -1, node.val)
  maxOfLine(node.left, d + 1, res)
  maxOfLine(node.right, d + 1, res)
  return res
}