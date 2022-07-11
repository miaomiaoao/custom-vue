import { forEachValue } from "../util"

class Module {
  get namespced() {
    return !!this._raw.namespced // !!代表强制转成布尔，写成1,2,3页可以转成布尔
  }

  constructor(newModule) {
    this._raw = newModule
    this._children = {}
    this.state = newModule.state
  }

  getChild(key) {
    return this._children[key]
  }

  addChild(key, module) {
    this._children[key] = module
  }

  forEachMutation(fn) {
    if (this._raw.mutations) {
      forEachValue(this._raw.mutations, fn)
    }
  }

  forEachAction(fn) {
    if (this._raw.actions) {
      forEachValue(this._raw.actions, fn)
    }
  }

  forEachGetter(fn) {
    if (this._raw.getters) {
      forEachValue(this._raw.getters, fn)
    }
  }

  forEachChild(fn) {
    forEachValue(this._children, fn)
  }
}

export default Module