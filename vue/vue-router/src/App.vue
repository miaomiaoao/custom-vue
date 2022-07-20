<template>
  <div id="app">
    <router-link to="/">首页</router-link>
    <router-link to="/about">关于</router-link>
    <router-link to="/about/a">about-a</router-link>
    <router-link to="/about/b">about-b</router-link>
    <router-view></router-view>
    <!-- {{ $store.state.age }}
    {{ $store.getters.myAge }}
    <button @click="$store.commit('changeAge', 5)">更新年龄</button>


    a模块的年龄: {{ $store.state.a.age }}
    b模块的年龄：{{ $store.state.b.age }} -->
  </div>
</template>

<script>

function mapState(stateArr) {
  let obj = {}

  for (let i = 0; i < stateArr.length; i++) {
    let stateName = stateArr[i]
    obj[stateName] = function() {
      return this.$storage.state[stateName]
    }
  }

  return obj
}


export default {
  name: 'App',
  // 辅助函数
  computed: {
    ...mapState(['age'])
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
