export default {
  name: 'routerLink',
  props: {
    to: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      default: 'a'
    }
  },
  methods: {
    handler(to) { 
      this.$router.push(to)
    }
  },
  // 建议写组件库都用jsx来写
  render() {
    let { tag, to } = this
    return <tag onClick={this.handler.bind(this, to)}>{this.$slots.default}</tag>
  }
}