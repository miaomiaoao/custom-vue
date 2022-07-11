export default {
  namespaced: true,
  state: {
    age: 444
  },
  actions: {

  },
  mutations: {
    changeAge(state, payload) {
      state.age += payload
    }
  }
}