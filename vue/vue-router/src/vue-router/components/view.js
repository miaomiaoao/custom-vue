export default {
  name: 'routerView',
  functional: true, // 函数式组件， 特点 性能高，不需要创建实例  等价于react函数组件
  // 一般的组件都需要  new Ctor().$mount
  // 没有管理任何状态，也没有监听任何传递给它的状态，也没有生命周期方法。实际上，它只接收一些prop的函数
  // 没有响应式数据，页没有this上下文
  render(h, context) { // 调用render方法，说明它一定是一个routerView组件
    debugger;
    let {parent, data} = context
    // 获取当前对应要渲染的记录
    let route = parent.$route // 当前组件的父亲

    // 依次进行渲染操作
    /**
     * 第一个router-view渲染第一个record  第二个router-view渲染第二个
     */

    let depth = 0
    data.routerView = true

    // App.vue渲染组件时 默认调用render函数 父亲中没有data.routeView属性
    while (parent) { // router-view的父标签
      if (parent.$vnode && parent.$vnode.data.routerView) { // 指的是组件的名字
        depth++
      }
      parent = parent.$parent // 并的找父亲
    }

    let record = route.matched[depth]

    if (!record) {
      return h() // empty-vnode 注释节点
    } 

    return h(record.component, data)
  }
}