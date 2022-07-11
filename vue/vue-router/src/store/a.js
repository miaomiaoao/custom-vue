import c from './c'
export default {
  namespaced: true,
  state: {
    age: 222
  },
  actions: {

  },
  mutations: {
    changeAge(state, payload) {
      state.age += payload
    }
  },
  modules: {
    c
  }
}