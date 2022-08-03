import Watcher from "./observe/watcher";
import { patch } from "./vdom/patch";

export function mountComponent(vm) {

    // 初始化流程
    let updateComponent = () => {
        vm._update(vm._render()); // render()  _c _v _s
    }

    callHook(vm,'beforeCreate')
    new Watcher(vm, updateComponent, () => {
        console.log('后续增添更新钩子函数 update')
        callHook(vm,'created');
    }, true);
    callHook(vm,'mounted');
}

// render函数编译过程
/**
 * 1. 如果是传了一个template模板的话，将模板转化为ast树
 * 2. ast树生成render函数 render执行with + Function
 * 3. 调用render函数返回对应的虚拟节点
 * 4. 调用update函数，传入虚拟节点，执行diff算法
 * 5. diff算法实际上是执行源码中的patch方法
 * 
 */
export function lifeCycleMixin(Vue) {
    Vue.prototype._update = function(vnode) {
      const vm = this;
      let preVnode = vm._prevVnode;
      // 第一次渲染 是根据虚拟节点 生成真实节点，替换掉原来的节点
      vm._prevVnode = vnode
      // 如果是第二次 生成一个新得虚拟节点 ，和老的虚拟节点进行对比

      if(!preVnode){ // 没有节点就是初次渲染
          vm.$el = patch(vm.$el, vnode)
      }else{
          vm.$el = patch(preVnode, vnode)
      }
    }
}
export function callHook(vm, hook) {
    let handlers = vm.$options[hook];
    handlers && handlers.forEach(fn => {
        fn.call(vm); 
    })
}
