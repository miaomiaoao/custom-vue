
export function patch(oldVnode, vnode) {
  const isRealElement = oldVnode.nodeType
  if (isRealElement) {
    // 删除老节点，根据vnode创建新节点，替换掉老节点
    const elm = createElm(vnode)
    const parentNode = oldVnode.parentNode
    // 先把节点插入到oldVnode节点后面，再remove oldVnode
    parentNode.insertBefore(elm, oldVnode.nextSlibling)
    parentNode.removeChild(oldVnode)
    return elm
  } else {
    // 判断是否为相同节点，如果不是相同节点，直接删除，不用对比孩子节点
    if (!isSameVnode(oldVnode, vnode)) {
      return oldVnode.el.parentNode.replaceChild(createElm(vnode), oldVnode.el)
    }

    // 如果是文本的话，直接更新就可以了，因为文本没孩子节点
    let el = vnode.el = oldVnode.el // 复用节点
    if (!oldVnode.tag) {
      if (oldVnode.text !== vnode.text) {
        return el.textContent = vnode.text
      }
    }

    // 元素，新的虚拟节点
    updateProperties(vnode, oldVnode.data)

    // 相同节点，更新了属性之后，比较儿子节点

    let oldChildren = oldVnode.children || []
    let newChildren = vnode.children || []

    // 1. 老的有，新的没有， 直接删除
    if (oldChildren.length > 0 && newChildren.length == 0) {
      el.innerHTML = ''
    } else if (newChildren.length > 0 && oldChildren.length === 0) {
      newChildren.forEach(child => el.appendChild(createElm(child)))
    } else {
      updateChildren(el, oldChildren, newChildren)
    }

    return el
  }
}

export function createElm(vnode) {
  let { tag, children, text } = vnode

  if (typeof tag === 'string') {
    vnode.el = document.createElement(tag)
    updateProperties(vnode)
    children.forEach(child => {
      vnode.el.appendChild(createElm(child))
    })
  } else {
    // 创建text
    vnode.el = document.createTextNode(text)
  }
  return vnode.el
}


function isSameVnode(newVnode, oldVnode) {
  return (newVnode.tag === oldVnode.tag) && (newVnode.key === oldVnode.key)
}


function updateProperties(vnode, oldProps={}) {
  // 可能是初次渲染，直接用oldProps给vnode的el赋值即可
  let el = vnode.el
  let newProps = vnode.data || {}
  // 新旧对比，如何对比两个对象的差异
  let newStyle = newProps.style || {}
  let oldStyle = oldProps.style || {}

  // 在老的样式，但是不在新的样式中，删除
  for (let key in oldStyle) {
    if (!newStyle[key]) {
      el.style[key] = ''
    }
  }

  // 新的样式有，老的没有或者都有，直接用老的替换新的
  for (let key in newProps) {
    if (key == 'style') {
      el.style[key] = newStyle[key]
    } else {
      el.setAttribute(key, newProps[key])
    }
  }

  for (let key in oldProps) {
    if (!newProps[key]) {
      el.removeAttribute(key)
    }
  }
}

function updateChildren(el, oldChildren, newChildren) {
  // vue2中 如何做的diff算法
  // vue2内部做了优化，尽量提升性能，如果实在不行，就暴力对比

  // 1. 在列表中新增和删除的情况
  let oldStartIndex = 0
  let oldStartVnode = oldChildren[0]
  let oldEndIndex = oldChildren.length - 1
  let oldEndVnode = oldChildren[oldEndIndex]

  let newStartIndex = 0
  let newStartVnode = newChildren[0]
  let newEndIndex = newChildren.length - 1
  let newEndVnode = newChildren[newEndIndex]

  while(oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (!oldStartVnode) {
      oldStartVnode = oldChildren[++oldStartIndex]
    } else if(!oldEndVnode) {
      oldEndVnode = oldChildren[--oldEndIndex]
      // 头头比较
    } else if (isSameVnode(oldStartVnode, newStartVnode)) { // 头头比较
      patch(oldStartVnode, newStartVnode); // 递归比较子节点，同时比较这两个的差异
      oldStartVnode = oldChildren[++oldStartIndex]
      newStartVnode = newChildren[++newStartIndex]
    } else if (isSameVnode(oldEndVnode, newEndVnode)) { // 尾尾比较
      patch(oldEndVnode, newEndVnode)
      oldEndIndex = oldChildren[--oldEndIndex]
      newEndIndex = newChildren[--newEndIndex]
    } else if (isSameVnode(oldStartVnode, newEndVnode)) { // 头尾
      patch(oldStartVnode, newEndVnode)
      // !!!!!!!!! 这句的逻辑没看懂 !!!!!!!!!!!!!!
      el.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSlibling)
      oldStartVnode = oldChildren[++oldStartIndex]
      newEndVnode = newChildren[--newEndIndex]
    } else if(isSameVnode(oldEndVnode, newStartVnode)) { // 尾头
      patch(oldEndVnode, newStartVnode)
      el.insertBefore(createElm(newStartVnode), oldStartVnode.el.nextSlibling)
      oldEndVnode = oldChildren[--oldEndIndex]
      newStartVnode = newChildren[++newStartIndex]
    } else {
      // 无规律乱序
      let moveIndex = mapping[newStartVnode.key]
      if (moveIndex == undefined) {
        // 没有直接将节点插入到开头的前面
        el.insertBefore(createElm(newStartVnode), oldStartVnode.el)
      } else {
        // 有需要的话，复用
        let moveVnode = oldChildren[moveIndex]
        patch(moveVnode, newStartVnode)
        el.insertBefore(moveVnode.el, oldStartVnode.el)
        oldChildren[moveIndex] = undefined // 将移动的节点标记为空
      }
      newStartVnode = newChildren[++newStartIndex]
    }
  }

}