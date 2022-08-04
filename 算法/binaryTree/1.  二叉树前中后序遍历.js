/**
 * @description 二叉树的中序遍历
 * @param {*} root 
 * @returns 
 * 1. 将所有根节点和左节点都放入栈中
 * 2. 栈顶元素出栈，存入结果的数组，将出栈的元素作为根节点
 * 3. 查看该根节点是否有右节点，若有就入栈，若没有就继续出栈
 * 
 * 中序遍历就是二叉树的深度优先遍历
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

/**
 * 头左右
 * 利用栈结构，如果有右孩子，就把右孩子入栈，如果有左孩子就把左孩子入栈
 * 每次从栈中取出一个节点
 * @param {*} root 
 * @returns 
 */
function preOrderTravel(root) {
  if (root === null) return []

  const stack = [root]
  const res = []
  
  while(stack.length) {
    const node = stack.pop()
    res.push(node.val)
    if (node.right) {
      stack.push(node.right)
    }
    if (node.left) {
      stack.push(node.left)
    }
  }
  return res
}

  //     3

  //  9     20
    
  // 1  2 15   7
// 前序： 先右再做
// 后序 左右头  1 2 9 15 7 20 3
// 后序： 先左入栈 再右入栈

function posOrderTraversal(root) {
  if (root === null) return []
  const res = [], stack = [root]

  while(stack.length) {
    
  }
  
  return res
}

const root = {
  val: 3,
  left: {
    val: 9,
    left: {
      val: 1
    },
    right: {
      val: 2
    }
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
// console.log(preOrderTravel(root))
console.log(temp(root))