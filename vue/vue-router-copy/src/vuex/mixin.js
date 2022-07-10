export default function applyMixin(Vue) {
  Vue.mixin({
    beforeCreate: vuexInit
  })
}

function vuexInit() {
  const options = this.$options // 获取用户所有选项

  if (options.store) { // 如果选项中有store，根实例
    this.$store = options.store
  } else if(options.parent && options.parent.$store) { // 如果有父组件，一定是子组件
    this.$store = options.parent.$store
  }
}

// Vue.use的核心原理
// Vue.use = function(plugin) {
//   plugin.intall(this)
// }