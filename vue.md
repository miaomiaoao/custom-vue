

## 2.`Vue`中如何检测数组变化?
vue2中检测数组的变化并没有采用defineProperty 因为修改索引的情况不多(如果直接使用defineProperty会浪费大量性能)。 采用重写数组的变异方法来实现 （函数劫持）

> initData -> observe -> 对我们传入的数组进行原型链修改，后续调用的方法都是重写后的方法  -》 对数组中每个对象也再次进行代理

修改数组索引 ，修改长度是无法进行监控的   arr[1] = 100;  arr.length = 300;  不会触发视图更新的 

arr[0].xxx = 100; 因为数组中的对象会被observe


## 3.`Vue`中如何进行依赖收集？
- 所谓的依赖收集 （观察者模式） 被观察者指代的是数据 (dep)， 观察者（watcher 3中渲染wather、计算属性、用户watcher）
- 一个watcher中可能对应着多个数据 watcher中还需要保存dep （重新渲染的时候可以让属性重新记录watcher） 计算属性也会用到

> 多对多的关系 一个dep 对应多个watcher ， 一个watcher有多个dep 。 默认渲染的时候会进行依赖收集（会触发get方法）， 数据更新了就找到属性对应的watcher去触发更新

![](http://www.zhufengpeixun.com/jg-vue/assets/img/fow.34669a8f.png)


取值的时候收集依赖，设值的时候更新视图 

$forceUpdate 实际上是调用了 vm._watcher.update() 将页面重新渲染

cleanupDeps 
第一次渲染的时候，视图需要渲染name name => watcher
第二次渲染的时候 渲染的是age属性  age => watcher （如果更新name watcher不更新）
如果不清理的话，会导致修改name的时候重新渲染一次

主要是清理watcher和dep之间的关系


如果属性没有用到，并不会进行依赖收集


## 14.既然Vue通过数据劫持可以精准探测数据变化，为什么还需要虚拟DOM进行`diff`检测差异
- 如果给每个属性都去增加watcher , 而且粒度太小也是不好控制, 降低watcher的数量 （每一个组件都有一个watcher） 可以通过diff算法来优化渲染过程。  通过diff算法和响应式原理折中处理了一下


## 16.谈一谈对Vue组件化的理解
组件的优点：  组件的复用可以根据数据渲染对应的组件 ， 把组件相关的内容放在一起 （方便复用）合理规划组件，可以做到更新的时候是组件级更新  (组件化中的特性  属性， 事件， 插槽)

> Vue中怎样处理组件 1） Vue.extend  根据用户的传入的对象生成一个组件的构造函数   2） 根据组件产生对应的虚拟节点 data:{hook:init}   3）做组件初始化 将我们的虚拟节点转化成真实节点 （组件的init方法）  new Sub().$mount()

## 17.`Vue`的组件渲染流程  （init）
- vm.$options.components['my'] = {my:模板}
- 创造组件的虚拟节点  createComponent    {tag:'my',data:{hook:{init}},componentOptions:{Ctor:Vue.extend( {my:模板})}}
- 创造真实节点的 createComponent  init -> new 组件().$mount()  -> vm.componentInstance 
- vm.$el 插入到父元素中

## 18.`Vue`组件更新流程     （prepatch）
- 组件更新会触发 组件的prepatch方法，会复用组件，并且比较组件的 属性 事件 插槽
- 父组件给子组件传递的属性是(props) 响应式的  , 在模板中使用会做依赖收集 收集自己的组件watcher
- 稍后组件更新了 会重新给props赋值  ， 赋值完成后会触发watcher重新更新

## 19.`Vue`中异步组件原理
Vue中异步组件的写法有很多， 主要用作。大的组件可以异步加载的  markdown组件 editor组件。  就是先渲染一个注释标签，等组件加载完毕，最后在重新渲染 forceUpdate (图片懒加载)  使用异步组件会配合webpack

> 原理： 异步组件默认不会调用Vue.extend方法 所有Ctor上没有cid属性， 没有cid属性的就是异步组件。 会先渲染一个占位符组件. 但是如果有loading会先渲染loading ， 第一轮就结束了。 如果用户调用了resolve， 会将结果赋予给factory.resolved上面， 强制重新渲染。 重新渲染时候再次进入到resolveAsyncComponent中， 会直接拿到factory.resolved结果来渲染

## 27.Vue中.sync修饰符的作用，用法及实现原理
- 和v-model 一样，这个api是为了实现状态同步的， 这个东西在vue3中被移除了，因为不好用
  
如果要同步两个属性,不能写成v-model="msg" v-model="info"

语法糖： 属性和事件的语法糖


```js
function render() {
  with(this) {
    return _c('my', {
      attrs: {
        "xx": info
      },
      on: {
        "update:xx": function ($event) {
          info = $event
        }
      }
    })
  }
}
```
## 30.组件中写name选项有哪些好处及作用？v

### 可以实现递归组件
- 在vue中有name属性的组件可以被递归调用  （在写模板语法的时候 我们可以通过name属性来递归调用自己）
- 在声明组件的时候 Sub.options.components[name] = Sub


### 起到标识作用 
- 我们用来标识组件 通过name 来找到对应的组件 . 自己封装跨级通信
- name属性可以用作devtool调试工具 来标明具体的组件



## vue的内置指令
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b46ec8b051246858211c4c7ec129fb3~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)


## vue-router 组件复用导致路由参数失效怎么办？
1. 通过watch监听路由参数再发请求
  ```js
  watch: { //通过watch来监听路由变化
    "$route": function(){
      this.getData(this.$route.params.xxx);
    }
  }
  ```
2. 通过传入:key阻止路由复用
```js
<router-view :key="$route.fullPath" />
```

## vuex
vuex是专门为vue提供的状态管理系统，用于多个组件中数据共享，数据缓存等(无法持久化，内部核心原理是通过创建一个全局实例new Vue)
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb545e2edc0a4dcb94a412db0625799c~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

主要包括以下模块：
- states 定义了应用状态的数据结构，可以在这里设置默认的初始值
- getters 允许组件从store中获取数据，mapGetters辅助函数将store中的getter映射到局部计算属性
- mutation 唯一修改store状态的方法，必须是同步函数
- action 用于提交mutation 不能直接变更状态 可以包括异步操作
- module 将单一的store拆分为多个store且同时保存在单一的状态树中
  
## vuex页面刷新数据丢失怎么办uuj
做vuex数据持久化，可以使用本地存储方案来保存。或者使用插件 vuex-persist。
它是为vuex持久化而生的一个插件，不需要手动存储storage

## vuex为什么要分模块并且加命名空间
模块：由于使用单一状态树，应用的所有状态都会集中到一个比较大的对象中。当应用变得复杂的时候，store对象有可能很臃肿。为了解决以上问题，所以vuex将store分割为模块(module)。每个模块拥有自己的state，mutation，action，getter甚至是嵌套子模块

命名空间：默认情况下，模块内部的action，mutation和getter是注册在全局命名空间中的
这样使得多个模块能够对同一个mutation或者action做出相应。如果你的模块需要更高的封装度和复用性，你可以通过添加namespaced: true的方式使其成为带命名空间的模块。当模块被注册后，它的所有getter，action以及mutation都会自动根据模块注册的路径调整命名

## vue中的设计模式
1. 观察者模式(响应式数据)
2. 发布订阅模式(vue事件机制)
3. 工厂模式(传入参数即可创建实例)(虚拟dom根据参数的不同，返回基础标签的vnode和组件vnode)
4. 单例模式(整个程序只有一个实例)(vuex和vue-router的插件注册install方法，判断系统存在实例就直接返回掉)
5. 策略模式(vue.mixin合并参数使用策略模式)
6. 装饰器模式
   