let var const 的区别
1. var 有变量提升，在声明之前就可以用var 但是取值是undefined
2. let 和 const 没有变量提升  let 和 const 在未定义之前，不可以使用  称为暂时性死去
3. let const 是块级作用域  var是函数作用域
4. const 必须有初始值  let 和 var可以没有初始值
5. const 是定义常量的  const 一旦定义的话  值不可改变 如果是引用类型的话 就是它的地址是不可变  let var 是可以修改的
6. 如果var 定义在全局的话 它的作用域如果在浏览器环境就是window  在node 环境下就是global；
7. 重复声明