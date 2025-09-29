import Vuex from "vuex"
import { Users } from '@/const/users.js'
import { Offices } from '@/const/offices.js'

export const commonStore = new Vuex.Store({
  state: {
    activePage: 'Home',
    // office 
    user: Users[0], // Default user
    office: null,
    ecoTool: 'Samsung WS80',
    patients: [],
    // patient 
    name: '',
    surname: '',
    dateOfBirth: '',
    age: null,
    height: 0,
    normalWeight: 0,
    actualWeight: 0,
    bmi: 0,

    patientMoreText: '',

  },
  mutations: {
    SET_ACTIVE_PAGE(state, page) {
      state.activePage = page
    },
    SET_USER(state, user) {
      state.user = user
    },
    SET_PATIENTS(state, patients) {
      state.patients = patients
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
    },
    SET_DATE_OF_BIRTH(state, dateOfBirth) {
      let today = dayjs()
      let formattedDate = dayjs(dateOfBirth)
      const age = today.diff(formattedDate, 'year')
      state.dateOfBirth = dateOfBirth
      state.age = age
    },
    SET_HEIGHT(state, height) {
      const meterHeight = height / 100
      const bmi = parseFloat(state.actualWeight / (meterHeight * meterHeight)).toFixed(2)

      state.height = height
      state.bmi = bmi
    },
    SET_NORMAL_WEIGHT(state, normalWeight) {
      state.normalWeight = normalWeight
    },
    SET_ACTUAL_WEIGHT(state, actualWeight) {
      const meterHeight = state.height / 100
      const bmi = parseFloat(actualWeight / (meterHeight * meterHeight)).toFixed(2)

      state.actualWeight = actualWeight
      state.bmi = bmi
    },
    SET_PATIENT_MORE_TEXT(state, patientMoreText) {
      state.patientMoreText = patientMoreText
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