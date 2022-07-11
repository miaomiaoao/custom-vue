export default {
  namespaced: true,
  state: {
    age: 10
  },
  actions: {

  },
  mutations: {
    changeAge(state, payload) {
      state.age += payload
    }
  }
}