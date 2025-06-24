import Vuex from "vuex"
import { Users } from '@/const/users.js'
import { Offices } from '@/const/offices.js'


export const commonStore = new Vuex.Store({
  state: {
    // office 
    user: Users[0], // Default user
    office: Offices[0], // Default office
    ecoTool: 'Samsung WS80',

    // patient 
    // name: '',
    // surname: '',
    // dateOfBirth: '',
    // age: null,
    // height: 0,
    // normalWeight: 0,
    // actualWeight: 0,
    // bmi: 0,

  },
  mutations: {
    SET_USER(state, user) {
      console.log(user);

      state.user = user
    },
    SET_OFFICE(state, office) {
      if (office.id === 'pralboino') {
        state.ecoTool = 'Samsung HS50'
      } else if (office.id === 'desenzano') {
        state.ecoTool = 'Samsung WS80'
      }
      state.office = office
    },
    SET_ECO_TOOL(state, ecoTool) {
      state.ecoTool = ecoTool
    },
    SET_NAME(state, name) {
      state.name = name
    },
    SET_SURNAME(state, surname) {
      state.surname = surname
    }
  },
  // getters: {
  //   user: (state) => {
  //     return state.user
  //   },
  //   office: (state) => {
  //     return state.office
  //   },
  //   ecoTool: (state) => {
  //     return state.ecoTool
  //   }
  // }
})