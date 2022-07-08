/*
<div>
  <span>
    <a></a>
  </span>
  <span>
    <a></a>
    <a></a>
  </span>
</div>

把上诉dom结构转成下面的JSON格式

{
  tag: 'DIV',
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
*/

function dom2JSON(domTree) {
  let obj = {}
  obj.name = domTree.tagName
  obj.children = []
  domTree.childNodes.forEach(node => {
    obj.children.push(dom2JSON(node))
  })
  return obj
}

/**
 * vue的模板编译，把html模板转换为字符串, 先利用正则匹配标签、属性等。匹配完成后截取字符串，继续匹配。
 */