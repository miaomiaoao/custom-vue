import ModuleCollection from "./module/module-collection";

export let Vue;
export class Store {
  constructor(options) {
    const state = options.state

    // 数据的格式化 格式化成为我想要的结果(树)
    this._modules = new ModuleCollection(options)
  }
}