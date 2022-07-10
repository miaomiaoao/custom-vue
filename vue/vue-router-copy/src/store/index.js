import Vue from 'vue'
import Vuex from '../vuex'
Vue.use(Vuex)
import a from './a'
import b from './b'
const store = new Vuex.Store({
  state: {
    age: 1
  },
  getters: {
    myAge(state) {
      return state.age + 2
    }
  },
  mutations: {
    changeAge(state, payload) {
      state.age += payload
    }
  },
  actions: { // 异步操作，做完后结果提交给mutation
    changeAge({commit}, payload) {
      commit('changeAge', payload)
    }
  },

  modules: {
    a,
    b
  }

})

export default store