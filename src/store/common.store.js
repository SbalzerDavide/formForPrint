import Vuex from "vuex"
import { Users } from '@/const/users.js'
import { Offices } from '@/const/offices.js'

export const commonStore = new Vuex.Store({
  state: {
    activePage: 'Home',
    printType: '',
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

    // Ecografia Ostetrica Print Data
    ecografiaOstetricaPrintData: {
      pregnancy: null,
      ecoType: null,
      ecoMethod: '',
      fetusNumber: 1,
      decimalWeeks: null,
      enableCRLReDate: false,
      externalCRLReDate: false,
      decimalWeeksFromCRL: null,
      biometriaFetale: [],
      anatomy: [],
      doppler: [],
      heart: true,
      liquid: 'normale',
      direction: '',
      placenta: '',
      patientMore: '',
      pregnancyMore: '',
      ecoMore: '',
      biometriaMore: '',
      lastMore: '',
      conclusion: '',
      policyType: null
    },
    visitaGinecologicaPrintData: {
      reason: '',
      allergies: [],
      familyAnamnesis: '',
      trombo: 'false',
      pathologicalAnamneses: [],

      // paptest
      papTestYear: null,
      papTestResult: '',
      hpv: '',
      hpvDate: null,

      gynecologicalAnamnesis: {
        paraP: 0,
        paraX: 0,
        paraY: 0,
        paraZ: 0,
        paraDesc: '',
        lastMenstruationDate: null,
        lastMenstruationDesc: '',
        mammografiaDesc: '',
        allergiesDesc: ''
      },
      objectiveExam: {
        es: '',
        eog: '',
        eco_tv: ''
      },
      conclusionNormale: false,
      conclusionContraccettivoDesc: '',
      conclusion: ''
    },
    visitaOstetricaPrintData: {
      pregnancy: null,
      reason: '',
      allergies: [],
      familyAnamnesis: '',
      trombo: 'false',
      pathologicalAnamneses: [],

      // paptest
      papTestYear: null,
      papTestResult: '',
      hpv: '',
      hpvDate: null,

      obstetricAnamnesis: {
        paraP: 0,
        paraX: 0,
        paraY: 0,
        paraZ: 0,
        paraDesc: '',
        lastMenstruationDate: null,
        emogruppo: '',
        coombs: '',
        ogtt: '',
        testCombinato: '',
        nipt: '',

      },
      objectiveExam: {
        es: '',
        eog: '',
        eco_tv: '',
        pa: ''
      },
      conclusion: ''

    }

  },
  mutations: {
    SET_ACTIVE_PAGE(state, page) {
      state.activePage = page
    },
    SET_PRINT_TYPE(state, printType) {
      state.printType = printType
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
    },

    SET_PREGNANCY(state, pregnancy) {
      state.ecografiaOstetricaPrintData.pregnancy = pregnancy
    },
    SET_ECO_TYPE(state, ecoType) {
      state.ecografiaOstetricaPrintData.ecoType = ecoType
    },
    SET_ECO_METHOD(state, ecoMethod) {
      state.ecografiaOstetricaPrintData.ecoMethod = ecoMethod
    },
    SET_FETUS_NUMBER(state, fetusNumber) {
      state.ecografiaOstetricaPrintData.fetusNumber = fetusNumber
    },
    SET_DECIMAL_WEEKS(state, decimalWeeks) {
      state.ecografiaOstetricaPrintData.decimalWeeks = decimalWeeks
    },
    SET_ENABLE_CRL_RE_DATE(state, enableCRLReDate) {
      state.ecografiaOstetricaPrintData.enableCRLReDate = enableCRLReDate
    },
    SET_EXTERNAL_CRL_RE_DATE(state, externalCRLReDate) {
      state.ecografiaOstetricaPrintData.externalCRLReDate = externalCRLReDate
    },
    SET_DECIMAL_WEEKS_FROM_CRL(state, decimalWeeksFromCRL) {
      state.ecografiaOstetricaPrintData.decimalWeeksFromCRL = decimalWeeksFromCRL
    },
    SET_BIOMETRIA_FETALE(state, biometriaFetale) {
      state.ecografiaOstetricaPrintData.biometriaFetale = biometriaFetale
    },
    SET_ANATOMY(state, anatomy) {
      state.ecografiaOstetricaPrintData.anatomy = anatomy
    },
    SET_DOPPLER(state, doppler) {
      state.ecografiaOstetricaPrintData.doppler = doppler
    },
    SET_HEART(state, heart) {
      state.ecografiaOstetricaPrintData.heart = heart
    },
    SET_LIQUID(state, liquid) {
      state.ecografiaOstetricaPrintData.liquid = liquid
    },
    SET_DIRECTION(state, direction) {
      state.ecografiaOstetricaPrintData.direction = direction
    },
    SET_PLACENTA(state, placenta) {
      state.ecografiaOstetricaPrintData.placenta = placenta
    },
    SET_PATIENT_MORE(state, patientMore) {
      state.ecografiaOstetricaPrintData.patientMore = patientMore
    },
    SET_PREGNANCY_MORE(state, pregnancyMore) {
      state.ecografiaOstetricaPrintData.pregnancyMore = pregnancyMore
    },
    SET_ECO_MORE(state, ecoMore) {
      state.ecografiaOstetricaPrintData.ecoMore = ecoMore
    },
    SET_BIOMETRIA_MORE(state, biometriaMore) {
      state.ecografiaOstetricaPrintData.biometriaMore = biometriaMore
    },
    SET_LAST_MORE(state, lastMore) {
      state.ecografiaOstetricaPrintData.lastMore = lastMore
    },
    SET_CONCLUSION(state, conclusion) {
      state.ecografiaOstetricaPrintData.conclusion = conclusion
    },
    SET_POLICY_TYPE(state, policyType) {
      state.ecografiaOstetricaPrintData.policyType = policyType
    },

    SET_PAPTEST_YEAR(state, { papTestYear, visit }) {
      state[visit].papTestYear = papTestYear
    },
    SET_PAPTEST_RESULT(state, { papTestResult, visit }) {
      state[visit].papTestResult = papTestResult
    },
    SET_HPV(state, { hpv, visit }) {
      state[visit].hpv = hpv
    },
    SET_HPV_DATE(state, { hpvDate, visit }) {
      state[visit].hpvDate = hpvDate
    },

    // Mutations for Ecografia Ostetrica Print Data
    SET_ECOGRAFIA_OSTETRICA_PRINT_DATA(state, data) {
      state.ecografiaOstetricaPrintData = { ...state.ecografiaOstetricaPrintData, ...data }
    },
    SET_VISITA_GINECOLOGICA_PRINT_DATA(state, data) {
      state.visitaGinecologicaPrintData = { ...state.visitaGinecologicaPrintData, ...data }
    },
    SET_VISITA_OSTETRICA_PRINT_DATA(state, data) {
      state.visitaOstetricaPrintData = { ...state.visitaOstetricaPrintData, ...data }
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