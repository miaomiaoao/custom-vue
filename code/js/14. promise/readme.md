- 高阶函数: 如果一个函数的参数是一个函数(回调函数就是一种高阶函数)  
- 如果一个函数返回一个函数没当前这个函数也是一个高阶函数

### 函数柯里化 
判断类型的四种方法：  
1. typeof 不能判断对象  
2. constructor 可以找到这个变量是通过谁构造出来的
3. instanceof 谁是谁的实例
4. Object.prototype.toString.call()  缺陷是不能区分实例


### 发布订阅
- 发布订阅分为 on  emit
- on 就是把一些函数维护到一些数组中
- emit 数组中的函数依次执行
### 观察者 
- 观察者模式有观察者和被观察者。观察者需要放到被观察者中，被观察者的状态变化需要通知观察者，我变化了
- 内部也是基与发布定于模式 收集观察者  状态变化后通知被观察者

```js
class Subject { // 被观察者
  constructor(name) {
    this.name = name
    this.state = 'smile'
    this.observers = []
  }

  attach(o) {
    this.observers.push(o)
  }

  setState(newState) {
    this.state = newState;
    this.observers.forEach(o => o.update(this))
  }
}

class Observer { // 观察者
  constructor(name) {
    this.name = name
  }

  update(this) {
    console.log('被通知了')
  }
}

let baby = new Subject('little baby')
let dad = new Observer('dad')
let mother = new Observer('mom')
baby.attach(dad)
baby.attach(mother)
baby.setState('angry')


```