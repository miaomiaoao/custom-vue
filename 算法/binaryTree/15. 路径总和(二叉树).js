//       5
//      / \
//     4   8
//    /   / \
//   11  13  4
//  /  \    / \
// 7    2  5   1
// 目标和sum = 22
// 返回 [
    //   [5, 4, 11, 2],
    //   [5, 8, 4, 5]
    // ]


/**
 * 给定一个二叉树和一个目标和，找到所有从根节点到叶子节点路径总和等于给定
 * 目标和的路径
 * 说明：叶子节点是指没有子节点的节点
 * 
 * 深度优先遍历
 * 1. 首先，遍历到节点时，先将当前节点的值放到一个数组中
 * 2. 分别遍历左右子节点，遍历时sum减去当前值，就等于后面还需要相加的和
 * 3. 如果当前节点没有左右子节点，并且当前节点的值与还需要相加的值相等，就将暂存路径值的数组arr的值保存到数组结果中
 * 4. 最后不要忘了每次遍历完，将暂存路径节点的数组做出数组操作。以此进行回溯操作
 */

function pathSum(root, sum) {
  const res = []
  fn(root, sum, res, [])
  return res
}

function fn(root, sum, res, arr) {
  if (!root) return 
  arr.push(root.val)
  // 当节点没有左右子树的时候，并且根节点等于当前sum值时，就将当前路径的值保存在结果中
  if (!root.left && !root.right && root.val === sum) {
    res.push([...arr])
  }
  fn(root.left, sum - root.val, res, arr)
  fn(root.right, sum - root.val, res, arr)
  arr.pop() // 将当前节点出数组
}

//       5
//      / \
//     4   8
//    /   / \
//   11  13  4
//  /  \    / \
// 7    2  5   1
const root = {
  val: 5,
  left: {
    val: 4,
    left: {
      val: 11,
      left: {
        val: 7
      },
      right: {
        val: 2
      }
    }
  },
  right: {
    val: 8,
    left: {
      val: 13
    },
    right: {
      val: 4,
      left: {
        val: 5
      },
      right: {
        val: 1
      }
    }
  }
}


console.log(pathSum(root, 22))