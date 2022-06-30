


// 深度优先遍历
// 深度优先是中序遍历
function visitNode(n: Node) {
  if(n instanceof Comment) {
    // 注释
    console.info('Comment node ----', n.textContent)
  }
  
  if(n instanceof Text) {
    // 文本
    console.info('Text node ----', n.textContent?.trim())
  }
  
  if(n isntanceof HTMLElement) {
    // element
    console.info('Element node ----', `<${n.tagName.toLowerCase()}>`)
  }
}


function depthFirstTraverse(root: Node) {
  visitNode(root)
  
  // .children 和 .childNods的区别。childNodes 包含所有Node类型(包含注释和元素) children不会获取
  const childNodes = root.childNodes
  if(childNodes.length) {
    childNodes.forEach(child => {
      depthFirstTraverse(child)
    })
  }
}
// 广度优先遍历
// 广度优先就是一层一层遍历。广度优先遍历用队列
function breadthFirstTraverse(root: Node) {
  const queue: Node[] = []
  // 根节点如队列
  queue.unshift(root)
  // 只要queue.length 大于0  出队
  while(queue.length > 0) {
    const curNode = queue.pop()
    if(curNode == null) break
    
    visitNode(curNode)
    
    const childNodes = curNode.childNodes
    if(childNodes.length) {
      childNodes.forEach(child => queue.unshift(child))
    }
  }
}
