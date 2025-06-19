import Vuex from "vuex"

export const commonStore = new Vuex.Store({
  state: {
    name: '',
    surname: '',
    dateOfBirth: '',
    age: null,
    height: 0,
    normalWeight: 0,
    actualWeight: 0,
    bmi: 0,
    user: {},
    office: {},
    ecoTool: 'Samsung WS80',

  },
  mutations: {
    setOperator(state, operator) {
      state.user = operator
    },
    setOffice(state, office) {
      state.office = office
    },
    setEcoTool(state, ecoTool) {
      state.ecoTool = ecoTool
    }
  },
  getters: {
    user: (state) => {
      return state.user
    },
    office: (state) => {
      return state.office
    },
    ecoTool: (state) => {
      return state.ecoTool
    }
  }
})