// 利用栈结构，先把root放入栈中。如果有子节点，则当前出栈，子节点入栈。如果没有子节点则出栈
function dfsTravel(root) {  
  const stack = [root]
  const res = []
  while(stack.length) {
    const node = stack.pop()
    res.push(node.val)
    if (node.left) {
      stack.push(node.left)
    }
    if (node.right) {
      stack.push(node.right)
    }
  }
  return res
}