
  //  前序遍历 preorder = [3, 9, 20, 15, 7]
  //  中序遍历 inorder = [9, 3, 15, 20, 7]
  //   3
  //  / \
  // 9  20
  //   /  \
  //  15   7

/**
 * 根据一颗树的前序遍历与中序遍历构造二叉树
 * 注意： 你可以假设树中没有重复的元素
 *
 */


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
  if (!inorder.length) return null
  let tmp = preorder[0]
  let mid = inorder.indexOf(tmp)

  let root = new TreeNode(tmp)
  root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid))
  root.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1))
  return root
};
