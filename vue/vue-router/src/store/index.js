import Vue from 'vue'
import Vuex from '../vuex'
Vue.use(Vuex)
import a from './a'
import b from './b'

function persists() {
  return function(store) { // store是默认传的
    let data = localStorage.getItem('VUEX:STATE')
    if (data) {
      store.replaceState(JSON.parse(data));
    }
    store.subscribe((mutation, state) => {
      localStorage.setItem('VUEX:STATE', JSON.stringify(state))
    })
  }
}

const store = new Vuex.Store({
  plugins: [
    persists() // vuex-persists
  ],
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