function treeNode(val) {
  this.val = val
  this.left = this.right = null
}

  // 二叉树广度优先
function bfsTravel(root) {
  if (root === null) return root
  const queue = [root]
  const res = []

  while(queue.length > 0) {
    const node = queue.shift()
    res.push(node.val)

    if (node.left) {
      queue.push(node.left)
    }

    if (node.right) {
      queue.push(node.right)
    }
  }
  return res
}

 const root = {
  val: 3,
  left: {
    val: 9
  },
  right: {
    val: 20,
    left: {
      val: 15
    },
    right: {
      val: 7
    }
  }
}