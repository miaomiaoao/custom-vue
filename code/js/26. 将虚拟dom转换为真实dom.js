/*
{
  tag: 'DIV',
  attrs:{
  id:'app'
  },
  children: [
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] }
      ]
    },
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] },
        { tag: 'A', children: [] }
      ]
    }
  ]
}
把上诉虚拟Dom转化成下方真实Dom
<div id="app">
  <span>
    <a></a>
  </span>
  <span>
    <a></a>
    <a></a>
  </span>
</div>
*/
// 将虚拟dom转换为真实dom

function _render(vnode) {
  if (typeof vnode === 'number') {
    vnode = String(vnode)
  }

  if (typeof vnode === 'string') {
    return document.createTextNode(vnode)
  }

  const dom = document.createElement(vnode.tag)

  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
      const value = vnode.attrs[key]
      dom.setAttribute(key, value)
    })
  }

  vnode.children.forEach(child => dom.appendChild(_render(child)))
  return dom
}