/**
 * @description 二叉树的中序遍历
 * @param {*} root 
 * @returns 
 * 1. 将所有根节点和左节点都放入栈中
 * 2. 栈顶元素出栈，存入结果的数组，将出栈的元素作为根节点
 * 3. 查看该根节点是否有右节点，若有就入栈，若没有就继续出栈
 */
function inorderTraversal(root) {
  if (!root) {
    return []
  }
  const result = []
  const stack = []

  while (stack.length !== 0 || root) {
    while (root) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    result.push(root.val)
    root = root.right
  }

  return result
}
