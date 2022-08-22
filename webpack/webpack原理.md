Object.defineProperty(obj, key, descriptor)

参数 对象  属性  属性描述器

```js
Object.defineProperty(obj, 'age', {
    writable:true,
    value: 10,
    configurable: false,
    enumerable: false,
    set() {}
    get() {}s
})

// set get 和 writable value 不能同时存在
```

webpack 只支持commonjs



## commonjs 引入 es module

require.d defineProperty 定义属性

commonjs 加载 esmodule 也会转换为commonjs， 但是会挂两个属性

如果一个模块出现export 和 import 的话，就会加上Symbol(Symbol.toStringTag): 'Module' 和 __esModule: true



## es module 加载 es module

## es module 加载commonJs





## 模块加载的规律

- commonjs 打包后不变
- 如果是es module 打包后会增加 _esModule = true 默认导出挂在exports.default上，其它属性正常

## 异步加载

```js
// 点击按钮时，异步加载title模块
let button = document.getElementById('load')
button.addEventListener('click', () => {
    import(/* webpackChunkName: 'title' */'./title').then(res => {
        console.log(res)
    })
})
```

- import是js的内置语法，webpack遇到import方法是，会把它当成一个代码分割点

```js
// 通过JSONP异步加载代码块title, 取出.title文件后，需要把title.js模块定义合并到modules对象
require.e('title')
// 源码的核心实现
require.find.jsonp(chunkId, promises)

// 通过require 去加载title.js模块  加载完成后就可以传递给result
.then(require.t.bind(require, './src/title.js', 23)).then(result => {
	console.log(result)
})

```

## AST树

ast 抽象语法树 利用树的结构来表达语法。利用语法书来对代码实现检查，分析等操作

### 用途

- 代码语法检查，代码格式检查
- 代码混淆压缩
- 代码变更，打包工具 webpack,rollup等
- 模块之间代码规范转换 commonjs， amd，cmd，umd
- coffeeScript, typepscript， jsx 等转换为原生js

### javascript parser

- javascript parser javascript源代码转化为抽象语法树的解析器
- 浏览器会把javascript源码通过分析转为抽象语法树，再进一步转化为字节码或者直接生成机器码
- 一般来说每个js引擎都有自己的抽象语法树格式，chrome的v8引擎，firefox的spiderMonkey引擎等等，mdn提供了详细的spiderMonkey ast format 的详细说明，算是业界的标准

### 常用的javascript parser

- vue 用的 js-code
- esprimar
- traceur
- acorn
- shift



## babel转换

webpack 的插件，实际上就是一个对象，里面有一个visitor属性 拦截不同的节点

### 箭头函数转换

```js
// babel的核心包， 1. 把源代码转换为语法树 2. 可以遍历语法树 3. 根据转换后的语法树，生成新的源码
// 本身并不知道如何转换代码
let babelCore = require('@babel/core')
// babel的工具包，判断某个节点是不是某个类型，动态创建某个类型的节点
let types = require('babel-types')
// 插件其实就是一个钩子函数，在遍历语法树的过程中，可以捕获某些特别类型的节点并进行转换
// 每个ES6语法，都会对应一个这样的插件
// 每个插件都会捕获自己的语法节点，转换对应的ES5语法
// 因为有很多语法，不能一个一个的去安装插件，所有的插件打成一个包，就是@babel/preset-env，包括基本上所有的ES6转换插件
let ArrowFunctionsPlugin = require('babel-plugin-transform-es2015-arrorw-functions')
let sourceCode = `
	const sum = (a, b) => {
		console.log(this)
		return a + b
	}
`
// 插件就是一个对象，对象里会有一个visitor的访问器
let ArrowFunctionsPlugin2 = {
    // 每个插件都有自己的访问器, 设计模式，访问者模式
    visitor: {
          // 处理所有的箭头函数节点
          ArrorFunctionExpression(nodePath) { // 参数是节点所在的路径
              let {node} = nodePath
              // 处理this指针的问题
              hoistFunctionEnvironment(nodePath)
              node.type = 'FunctionExpression' // 本来是一个箭头函数，我们把它改成一个普通函数
          }
    }
}

function hoistFunctionEnvironment(fnPath) {
    const thisEnvFn = fnPath.findPart(p => { // 向上查找this, 因为箭头函数的this是继承上级的
        // 停止条件是，p是一个函数，但不是一个箭头函数， ES5 中的作用域，全局作用域和函数作用域
        // 或者是普通函数，或者是全局作用域
        return (p.isFunction() && !p.isArrayFunctionExpress()) || p.isProgram()
    })
    // 找一找当前作用域内哪些地方用了this
    let thisPaths = getScopeInformation(fnPath)
    // 先声明一个变量this => _this 把this变成_this
    let thisBinding = '_this'
    // 如果子节点里有this指针调用的话
    if (this.Paths.length > 0) {
        // 生成 var _this = this
        // 向此路径的作用域内添加一个变量
        thisEnvFn.scope.push({
            id: types.identifier(thisBinding), // 生成一个标识符
            init: types.thisExpression() // 生成一个this调用
        })
        // 修改变量 this => _this
        thisPaths.forEach(item => {
            let thisBindingIdentifier = types.ntifier(thisBinding) // _this
            // 把此路径上面挂在的节点进行替换
            thisPath.replaceWith(this.BindingIdentifier)
        })
    }
}

function getScopeInformation(fnPath) {
    let thisPaths = []
    // 遍历当前路径的子路径
    // 从当前的路径向下查找，如果遇到ThisExpression节点，就把它的路径添加到thisPaths数组里
    fnPath.traverse({
        // ThisExpression: 放了一个访问器
        ThisExpression(thisPath) {
            thisPaths.push(thisPath)
        }
    })
    return thisPaths
}
let targetCode = babelCore.transform(sourceCode, {
    plugins: [ArrowFunctionsPlugin]
})

console.log(targetCode.code)


```

```js
// 原始的ES6箭头函数
const sum = (a, b) => {
    console.log(this)
    return a + b
}

// 转换后
var _this = this
const sum = function(a, b) => {
    console.log(_this)
    return a + b
}

// 节点
let node = {
    type: 'Identifier',
    identifierName: 'sum',
    name: 'sum'
}

// 什么是路径, node指向node节点
let nodePath = {
    node: node
}

// nodePath将node替换为新的节点
nodePath.replaceWith(newNode)
```



- 访问器模式，每个访问器只会处理自己感兴趣的节点





### 类转换为函数

```js
let PluginTransformClasses2 = {
    visitor: {
        classDeclaration(nodePath) { // 拦截类的声明
            let { node } = nodePath
            let id = node.id // { type: Identifier, name: Persion }
            
            let classMethods = node.body.body
            let nodes = []
            classMethods.forEach(classMethod => {
                if (classMethod.kind === 'constructor') { // 如果这个方法是构造函数
                    // 复用之前的
                    let constructor = types.functionDeclaration(id, classMethod.params, 					classMethod.body)
                    nodes.push(constructor)
                } else { // 如果是普通函数的话
                    // 创建赋值语句右侧的表达式
                    let functionExpression = types.functionExpression(classMethod.key, 							classMethod.params, classMethod,body)
                    // Person.prototype
                    let prototypeExpression = types.memberExpression(id, types.identifier('property'))
                    // Person.prototype.getName
                    let memberExpression = types.memeberExpression(prototypeMemberExpression, classMethod.key)
                    
                    let assignmentExpression = types.assignmenetExpression('=', memberExpression, functionExpression)
                    
                    nodes.push(assignmentExpression)
                }
            })
            
            if (nodes.length === 1) {
                nodePath.replaceWith(nodes[0]) // 单节点替换
            } else {
                nodePath.replaceWithMultiple(nodes) // 多节点替换
            }
        }
    }
}
```

## 实现tree-shaking

### 使用babel实现组件的按需加载

- 如果不适用按需加载，只引入两个方法，但是会将所有的方法都打包进来
- 按需加载时需要哪个方法，引入哪个方法

 ```js
rules: [
    {
        test: /\.js$/,
        use: {
            loader: 'babel-loader',
            options: {
                // 官方提供的， 只支持antd lodash antd-mobile 等...库
                plugins: [
                    ['import', {
                        'libraryName': 'lodash',
                        'libraryDirectory': ''
                    }]
                ]
                
                // 自己写的
                plugins: [
                	[
                		path.resolve(__dirname, 'plugins/babel-plugin-import.js'),
            			{
            				// 意思是，只有lodash的库才会使用babel-plugin-import这个插件
            				libraryName: 'lodash'
        				}
                	]
                ]
            }
        }
    }
]
 ```



```js
// 在未引用按需加载的情况下,这种写法会引入整个lodash库
import { flatten, concat } from 'lodash' 

// 这种写法不会，只会打包两个模块
import flatten from 'lodash/flatten'
import concat from 'lodash/flatten'

// 那么按需加载的原理就是把第一种写法，变成第二种方法就可以了

let babelPluginImport = {
    visitor: {
        // 取的是type 具体可以去astexplorer.net 里面解析
        // 拦截导入语句
        ImportDecalration: {
            enter(nodePath, state={opts}) {
                
                // 拿到所有标识符， 导入的标识符
                const specifiers = nodePath.node.specifiers
                const source = nodePath.node.source // 模块名字
                // 判断是否是默认导入, 才会进来，防止递归
                // 第一句是判断只有lodash才可以使用
                if (state.opts.libraryName === 'lodash' && !types.isImportDefaultSpecifier(specifiers[0])) {
                    const importDeclarations = specifiers.map((specifier, index) => {
                        return types.importDeclaration([
                            types.importDefaultSpecifier(specifier.local)
                        ], types.stringLiteral(`${source.value}/${specifier.local.name}`)) // lodash/concat
                    })
                    nodePath.replceWithMultiple(importDeclarations)
                }
            }
        }
    }
}
```



- webpack 有自带的treeshaking ，按需导入和tree-shaking并不矛盾  tree-shaking只支持esm 不支持common.js
- 什么要的库才支持按需引入。比如lodash，它的每一个方法，都是一个独立的文件或者文件夹。像jquery 是一个大文件，就不行了

## webpack 工作流

### 调试webpack

使用node调试

```js

```



使用launch.json调试

```js

```



debugger.js。可以拿到各种信息

```js
const webpack = require('webpack')
const webpackOptions = require('./webpack.config')

// compiler代表整个编译过程
const compiler = webpack(webpackOptions)
// 调用它的run方法可以启动编译
compiler.run((err, status) => {
    console.log(err)
    console.log(stats.toJSON({
        files: true, // 产出了哪些文件
        assets: true, // 生成了哪些资源
        chunk: true, // 生成哪些代码块
        module: true, // 模块信息
        entries: true, // 入口信息
    }))
})
```

### 工作流

webpack的编译流程是

> 1. 初始化参数：从配置文件和shell语句中读取并合并参数，得出最终的配置对象
> 2. 开始编译：用上一步得到的参数初始化compiler对象
> 3. 加载所有配置的插件
> 4. 执行对象的run方法开始执行编译
> 5. 确定入口：根据配置中的entry找出所有的入口文件
> 6. 从入口文件出发，调用所有配置的loader对模块进行编译
> 7. 再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
> 8. 根据入口和模块之间的依赖关系，组成一个个包含多个模块的chunk
> 9. 再把每个chunk转换为一个单独的文件加入到输出列表
> 10. 在确定好输出的内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统中

以上过程中，webpack会在特定的时间点广播特定的事件，插件在监听到感兴趣的时间后会执行相应的逻辑，并且插件可以调用webpack提供的API改变webpack的运行结果



webpack编译过程中有两个最重要的对象

- Compiler 生产产品的工厂
- Compilation 代表一个生产过程，一次编译过程。多入口，也是一次编译一个complication
- loader事实上是一个函数
- plugin是一个类，会有一个apply()方法
- loader执行顺序，从右往左，从下往上





- entries， modules， chunks，assets， files 在webpack4中都是数组，在webpack5中都是set 为了防止重复



## loader

- loader知识一个导出为函数的js模块，它会接收上一个loader产生的结果或者资源文件(resource file)作为入参，也可以用多个loader函数组成loader chain
- compiler需要得到最后一个loader产生的处理结果。这个处理结果应该是String 或者 Buffer(被转换为一个string)

- webpack 只认识js 或者 json文件 所以其他文件才需要用loader转换
- loader 什么时候工作的，加载一个模块的时候工作的

```js
// 怎么判断一个loader是前置，内联还是后置呢。主要看enforce这个参数。
// 没有给默认是normal
// 这个配置是runner.js里面的
module: {
    rules: [
        {
            test: /\.js$/,
            use: ['normal-loader']
        },
        {
            test: /\.js$/,
            use: ['pre1-loader'],
            enforce: 'pre'
        }, 
        {
            test： /\.js$/,
            use: ['post-loader'],
        	enforce: 'post'
        }
    ]
}
```

### 实现babel-loader

###  实现file-loader， url-loader

### 实现less-loader， style-loader

- css-selector-tokenizer css生成语法树
- 如果是最后一个loader或者说最后的loader，参数就是模块的内容。如果不是最后一个，参数就是上一个loader返回的内容
- css 是用来处理import 和 url的 

## webpack 优化

### 缩小文件查找范围

```js
{
    // 使用它可以不写扩展名，找到几率大的尽量往前放
    resolve: {
    	extensions: ['.js', '.json', '.jsx'],
        alias: {
            'bootstrap': bootstrap // 别名
        },
        // 去node_modules里面去查找文件, 如果当前目录找不到 就去父级的node_modules
        modules: ['node_modules'],
        // 默认情况下package.json文件按照文件中main字段的文件名来查找文件
        // 配置taget === 'web' 或者 taget === 'webworker' 时 mainFields字段默认值是
        mainFields: ['browser', 'module', 'main'],
        // node环境
        // mainFields: ['module', 'main']
            
          // 如何解析一个包或者一个模块，  
          // 1.先找这个目录下对应的package.json main 字段，如果存在此字段，找到了，直接返回
          // 2. 如果没有这个字段，需要找对应mainFiles， 默认就是index.js
       mainFiles: ['index']
    },
        // 字段和resolve是相同的。如何查找loader的配置
        resolveLoader: {
            
        }
}
```



