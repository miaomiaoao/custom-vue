import { forEachValue } from "../util"
import Module from "./module"

class ModuleCollection {
  constructor(options) {
    this.register([], options) // 树 + 栈
  }

  getNamespaced(path) {
    let root = this.root // 从根模块找起来

    return path.reduce((str, key) => {
      root = root.getChild(key) // 不停的去找当前的模块
      return str + root.namespced ? key + '/' : ''
    }, '')
  }
  register(path, rootModule) {
    let newModule = new Module(rootModule)

    if (path.length === 0) {
      // 根模块
      this.root = newModule
    } else {
      // [a]
      // [b]
      // 如果是[a,c] 先找a，再找c
      path.slice(0, -1).reduce((memo, current) => {
        return memo.getChild(current)
      }, this.root)
      parent.addChild(path[path.length - 1], newModule)

      // 错误写法
      // this.root._children[path[path.length - 1]] = newModule
    }

    if (rootModule.module) {
      forEachValue(rootModule.module, (module, moduleName) => {
        // 注册
        this.register(path.concat(moduleName), module)
      })
    }
  }
}

export default ModuleCollection


// 算法题经常会遇到对象转换为树
// this.root = {
//   _raw: '根模块',
//   _children: {
//     a: {
//       _raw: 'a模块',
//       _childern: {
//         _raw: 'c模块',
//         children: [],
//         state: 'c的状态'
//       },
//       state: 'a的状态'
//     },
//     b: {
//       _raw: 'b模块',
//       _childern: {},
//       state: 'b的状态'
//     }
//   },
//   state: '根模块自己的状态'
// }