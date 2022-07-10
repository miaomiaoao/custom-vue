## 路由的两种模式
### hash
根据hash值不同显示不同的内容，比较丑，上线不采用这种
```html
<a href="#a">a页面</a>
<a href="#b">b页面</a>
```
```js
  // 原理
  let fn = function() {
    app.innerHTML = window.location.hash
  }

  fn()
  window.addEventListener('hashchange', fn)
```

### history

需要服务端支持，否则一刷新页面就404了

> 原理 history.pushState({}, null, '/a') // arg1: 传入的数据  arg2: 标题 arg3: 路径

```html
<a onClick="goA()">a</a>
<a onClick="goB()">b</a>
```
```js
  let fn = function() {
    app.innerHTML = window.location.pathname
  }

  function goA() {
    history.pushState({}, null, '/a')
  }

  function goB() {
    history.pushState({}, null, '/b')
  }
  //路由切换信息变了
  window.addEvent('popState', function() {
    fn()
  })
```


## 原型上的方法
$router, $route
$route上面都是一些属性 
$router上面都是一些方法


## vue-router 路由守卫，完整解析流程 一定要记住
## router.beforeEach 实际上是发布订阅