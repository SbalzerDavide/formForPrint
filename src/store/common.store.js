import Vuex from "vuex"

export const commonStore = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})