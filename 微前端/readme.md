## 什么是微前端
将项目拆分成子应用，再合并到一起


## single spa实战
single-spa是一个用于前端微服务化的js前端解决方案(本身没有处理样式隔离, js执行隔离) 但是实现了路由劫持和应用加载
## qiankun 实战
基于single-spa， 在single-spa的基础上做了资源的加载和应用之间的隔离
提供了开箱即用的API(single-spa + sandbox + import-html-entry)做到了与技术栈无关、并且接入简单(向iframe一样)
> 总结：子应用可以独立构建，运行时加载，主子应用完全解耦，技术栈无关，靠的是协议接入(子应用必须导出bootstrap(首次渲染)， mount(挂载)，unmount(卸载)方法)


iframe: 如果使用iframe，iframe中的子应用切换路由时，用户刷新页面，路由 会丢失

### 资源加载
- 首先配置的资源由自建的import-html-entry中importEntry方法来处理，调用后返回template和execScripts
- template 就是要插入到页面的内容，在加载微应用时会把它插入到配置的container节点中
- 如果是由url的link样式，会通过网络请求转换为style的形式。这样做便于隔离
- 所有的脚本内容会从template中去掉，使用execScripts来执行脚本，执行时会在脚本内容中加上with(global)然后来执行，这样会影响全局对象进而进行脚本隔离

### 应用通信
- 基于URL来进行数据传递，但是传递消息能力弱
- 基于CustomEvent实现通信
- 基于props主子应用通信
- 使用全局变量、redux进行通信
- 抽离公共依赖 cdn -externals
- webpack 联邦模块
  
### 沙盒
沙盒主要作用就是隔离微应用之间的脚本和样式影响，需要处理style、link、script类型的标签。对于处理的时机第一个是在首次加载的时候，第二个是在微应用运行中。在运行中的处理方案就是乾坤重写了下面这些原生的方法，这样就可以监听到新添加的节点，然后对style、link、script标签进行处理。
```js
if (
    //原始方法未被替换
    HTMLHeadElement.prototype.appendChild === rawHeadAppendChild &&
    HTMLBodyElement.prototype.appendChild === rawBodyAppendChild &&
    HTMLHeadElement.prototype.insertBefore === rawHeadInsertBefore
) {
    //替换原始方法
    HTMLHeadElement.prototype.appendChild = getOverwrittenAppendChildOrInsertBefore({
      rawDOMAppendOrInsertBefore: rawHeadAppendChild,
      containerConfigGetter,
      isInvokedByMicroApp,
    }) as typeof rawHeadAppendChild;
    ...
}
```
### css 隔离方案
子应用之间样式隔离：Dynamic Stylesheet 动态样式表，当应用切换时移除老应用样式，添加新应用样式

主应用与子应用之间的样式隔离：
- BEM(Block Element Modifier)约定项目前缀
- CSS-Modules 打包时生成不冲突的选择器名
- Shadow DOM 真正意义上的隔离
- css-in-js 
  
```js
// Shadow DOM实现
<html>
  <body>
    <div>
      <p>hello world</p>
      <div id="shadow"></div>
    </div>
    <script>
      let shadowDOM = shadow.attachShadow({ mode: 'closed' }) // 外界无法访问 shadow dom
      let pElm = document.createElement(p)
      pElm.innerHTML = 'hello world'
      let styleElm = document.createElement('style')

      // 加了这句之后，只有shadow DOM中的p标签颜色变了
      styleElem.textContent = 'p{color: red}'

      shadowDOM.appendChild(styleElm)
      shadowDOM.appendChild(pElm)

    </script>
  </body>
</html>
```


### js沙箱机制 
快照是为了还原

1. 快照沙箱 1年前拍一张 再拍一张  将区别保存起来  再回到一年前

```js
class SnapShotSandbox {
  constructor() {
    this.proxy = window;
    this.modifyPropsMap = {}; // 记录在window上的修改
    this.active();
  }

  active() {
    this.windowSnapshot = {}; // 拍照
    for (const prop in window) {
      if (window.hasOwnProperty(prop)) {
        this.windowSnapshot[prop] = window[prop]
      }
    }
    // 激活的时候把上次的修改赋值给window
    Object.keys(this.modifyPropsMap).forEach(prop => {
      window[prop] = this.modifyPropsMap[prop];
    })
  }

  inactive() {
    // 对比现在的属性和之前有什么区别
    for (const prop in window) {
      if (window.hasOwnProperty(prop)) {
        if ( window[prop] !== this.windowSnapshot[prop]) {
          this.modifyPropsMap[prop] = window[prop];
          // 失活的时候再把window属性还原回去
          window[prop] = this.windowSnapshot[prop];
        }
      }
    }
  }
}
let sandbox = new SnapShotSandbox()

((window) => {
  window.a = 1;
  window.b = 2;
  console.log(window.a, window.b)
  sandbox.inactive()
  console.log(window.a, window.b)
  sandbox.active()
  console.log(window.a, window.b)
})(sandbox.proxy) // sandbox.proxy就是window
```

如果是子应用 ，就不能使用这种方式了，要使用es6的proxy
代理沙箱可以实现多应用沙箱，把不同的应用用不同的代理来处理

2. proxy
微应用中的script内容都会加with(global)来执行，这里global是全局对象，如果是proxy的隔离方式那么他就是下面新创建的proxy对象。我们知道with可以改变里面代码的作用域，也就是我们的微应用全局对象会变成下面的这个proxy。当设置属性的时候会设置到proxy对象里，在读取属性时先从proxy里找，没找到再从原始的window中找。也就是你在微应用里修改全局对象的属性时不会在window中修改，而是在proxy对象中修改。因为不会破坏window对象，这样就会隔离各个应用之间的数据影响。
```js
class ProxySandbox {
  constructor() {
    const rawWindow = window;
    const fakeWindow = {};
    const proxy = new Proxy(fakeWindow, {
      set(target, p, value) {
        target[p] = value;
        return true
      },
      get(target, p) {
        return target[p] || rawWindow[p] // 取不到再去原来的window上取
      }
    });
    this.proxy = proxy
  }
}

let sandbox1 = new ProxySandbox();
let sandbox2 = new ProxySandbox();

window.a = 1;
((window) => {
  window.a = 'hello'
  console.log(window.a)
})(sandbox1.proxy);
((window) => {
  window.a = 'world'
  console.log(window.a)
})(sandbox2.proxy);
```


## 常见问题
1. 子应用之间如何跳转
  history.pushState
2. 微应用跨域支持跨域访问
  import-html-entry库通过fetch请求相关资源，所以需要微应用支持跨域访问；在webpack devServer中加入以下代码即可
```js
headers: {
　'Access-Control-Allow-Origin': '*'
},
```
3. 微应用对应生命周期钩子函数具体是做啥的
  - bootstrap：只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。

  - mount：应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法。

  - unmount：应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例。