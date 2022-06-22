
class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
  }
}

function inorderTraversal(root: TreeNode | null): number[] {
  const res:number[] = []
  const traversal = function(root: TreeNode | null) {
    if(root === null) return 
    traversal(root.left)
    res.push(root.val)
    traversal(root.right)
  }
  traversal(root)
  console.log(res)
  return res
}

inorderTraversal([1,null,2,3])