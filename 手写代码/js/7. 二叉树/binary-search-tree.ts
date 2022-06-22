/**
 * @description 搜索二叉树
 */

interface ITreeNode {
  value: number,
  left: ITreeNode | null,
  right: ITreeNode | null 
}

const arr: number[] = []

// 链表拿到头，可以获取整个链表， 树需要拿到根

// 前序遍历
function preOrderTraverse(node: ITreeNode | null) {
  if (node === null) return
  // console.log(node.value)
  arr.push(node.value)
  preOrderTraverse(node.left)
  preOrderTraverse(node.right)
}

// 中序遍历
function inOrderTraverse(node: ITreeNode | null) {

  if(node == null) return 
  inOrderTraverse(node.left)
  // console.log(node.value)
  arr.push(node.value)
  inOrderTraverse(node.right)

}

// 后序遍历
function postOrderTraverse(node: ITreeNode | null) {
  if(node == null) return 
  postOrderTraverse(node.left) 
  postOrderTraverse(node.right)
  // console.log(node.value)
  arr.push(node.value)
}

function getKthValue(node: ITreeNode, k: number): number | null {
  inOrderTraverse(node)
  return arr[k] || null
}


const bst: ITreeNode = {
  value: 5,
  left: {
    value: 3,
    left: {
      value: 2,
      left: null,
      right: null
    },
    right: {
      value: 4,
      left: null,
      right: null
    },
  },
  right: {
    value: 7,
    left: {
      value: 6,
      left: null,
      right: null
    },
    right: {
      value: 8,
      left: null,
      right: null
    },
  }
}
// preOrderTraverse(bst)