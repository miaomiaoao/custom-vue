/**
 * 给定一颗二叉树，想像自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值
 * 
 * 解题思路： 常用方法，就是深度优先遍历(DFS) 和 广度优先遍历(BFS) 
 */

//  输入: [1,2,3,null,5,null,4]
//  输出: [1, 3, 4]
//  解释:
 
//     1            <---
//   /   \
//  2     3         <---
//   \     \
//    5     4       <---
 


// ----------- first DFS --------
/**
 * 1. 设置一个level来保存当前遍历二叉树的层级，初始值为0
 * 2. 由于我们需要返回的是右视图的节点值，所以先遍历右节点的值，将右节点保存在结果数组中
 * 3. 然后遍历左节点
 * 4. 当结果数组的长度和二叉树当前的层级相同时，就将当前的节点值保存
 * 5. 重复上述步骤，知道遍历完二叉树的所有节点
 */


function rightSideView(root) {
  if (!root) return []

  let res = []

  dfs(root, 0, res)

  return res
}

function dfs(root, level, res) {
  if(root) {
    if (res.length === level){
      res.push(root.val)
    }

    dfs(root.right, level + 1, res)
    dfs(root.left, level + 1, res)
  }
}




// ----------- first BFS --------
/**
 * 使用广度优先遍历来遍历二叉树，这就相当于二叉树的层序遍历，对于每一层的遍历结果，取
 * 最后一个即可，这里我们使用队列来处理
 * 
 * 1. 初始化一个队列，将根节点加入到队列中
 * 2. 当队列不为空的时候，就将队列的元素出队，将最后一个元素加入到结果数组中
 * 3. 在元素出队列的时候，将元素的左右节点分别加入到队列中
 * 4. 重复上面二三步，直到队列为空
 */


function rightSideView2(root) {
  if (!root) return []
  let res = []
  let queue = [root]
  const length = queue.length

  while(length--) {
    let node = queue.shift()

    if (length === 1) {
      res.push(node.val)
    }

    if (node.left) {
      queue.push(node.left)
    }

    if (node.right) {
      queue.push(node.right)
    }

  }

  return res
}
