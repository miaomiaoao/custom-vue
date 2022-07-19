 //   3
 //  / \
 // 9  20
 //   /  \
 //  15   7
 // 层序遍历的结果
 // [[3], [9, 20], [15, 7]]

 /**
  * 二叉树的层序遍历
  * 创建一个数组存放结果，一个队列存放二叉树的节点，根据输出的要求，设置一个level，
  * 存储当前层数，如果存放二叉树的队列不为空，重复下面的步骤：
  *  1) 将队列的第一个节点作为根节点，并放入当前层的结果数组中
  *  2) 如果该节点的左子树不为空，就将其放入队列中
  *  3) 如果该节点的右子树不为空，就将其放入队列中
  *  4) 遍历完改层之后，就遍历下一层
  */

 // 关键词 bfs, 加一个存层数的变量
 function levelOrder(root) {
   if (!root) return []
   let queue = [root]
   let result = []
   let level = 0

   while (queue.length !== 0) {
     result[level] = []
     let levelNum = queue.length

     while (levelNum--) {
       let node = queue.shift()
       result[level].push(node.val)

       if (node.left) {
         queue.push(node.left)
       }
       if (node.right) {
         queue.push(node.right)
       }
     }
     level++
   }

   return result
 }
