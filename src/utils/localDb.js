import { Users } from '@/const/users.js'
import { Offices } from '@/const/offices.js'

// Disponibile solo nell'app desktop (Electron), non sul sito web
export const localDb = window.localDb ?? null

export const VisitTypes = {
  'ecografia-ostetrica': {
    label: 'Ecografia ostetrica',
    route: 'EcografiaOstetrica',
    printData: 'ecografiaOstetricaPrintData',
    mutation: 'SET_ECOGRAFIA_OSTETRICA_PRINT_DATA'
  },
  'visita-ginecologica': {
    label: 'Visita ginecologica',
    route: 'VisitaGinecologica',
    printData: 'visitaGinecologicaPrintData',
    mutation: 'SET_VISITA_GINECOLOGICA_PRINT_DATA'
  },
  'visita-ostetrica': {
    label: 'Visita ostetrica',
    route: 'VisitaOstetrica',
    printData: 'visitaOstetricaPrintData',
    mutation: 'SET_VISITA_OSTETRICA_PRINT_DATA'
  }
}

// Gli errori lanciati nel processo principale arrivano con un prefisso tecnico
export function errorMessage(error) {
  return String(error?.message ?? error).replace(/^Error invoking remote method '[^']+': (Error: )?/, '')
}

// Copia semplice dei dati: gli oggetti reattivi di Vue non possono passare all'IPC
const plain = (value) => JSON.parse(JSON.stringify(value ?? null))

// Salva la visita in stampa con i dati della paziente; se è già stata salvata la aggiorna.
// La paziente è quella selezionata (patientId), altrimenti ne viene creata una nuova.
export async function saveCurrentVisit(store) {
  const state = store.state
  const visitType = VisitTypes[state.printType]

  const result = await localDb.visits.save({
    visitId: state.currentVisitId,
    patientId: state.patientId,
    type: state.printType,
    patient: plain({
      name: state.name,
      surname: state.surname,
      dateOfBirth: state.dateOfBirth,
      height: state.height,
      normalWeight: state.normalWeight,
      moreInfo: state.patientMoreText
    }),
    data: plain({
      patient: {
        name: state.name,
        surname: state.surname,
        dateOfBirth: state.dateOfBirth,
        age: state.age,
        height: state.height,
        normalWeight: state.normalWeight,
        actualWeight: state.actualWeight,
        bmi: state.bmi,
        patientMoreText: state.patientMoreText
      },
      user: state.user,
      office: state.office,
      ecoTool: state.ecoTool,
      printData: state[visitType.printData]
    })
  })
  store.commit('SET_PATIENT_ID', result.patientId)
  store.commit('SET_CURRENT_VISIT_ID', result.visitId)
  return result
}

export function loadPatientIntoStore(store, patient) {
  store.commit('SET_NAME', patient.name)
  store.commit('SET_SURNAME', patient.surname)
  store.commit('SET_DATE_OF_BIRTH', patient.dateOfBirth)
  store.commit('SET_NORMAL_WEIGHT', patient.normalWeight ?? 0)
  store.commit('SET_PATIENT_MORE_TEXT', patient.moreInfo ?? patient.patientMoreText ?? '')
  if (patient.actualWeight !== undefined) {
    store.commit('SET_ACTUAL_WEIGHT', patient.actualWeight)
  }
  // Dopo il peso attuale, così il BMI viene ricalcolato
  store.commit('SET_HEIGHT', patient.height ?? 0)
}

// Rimette nello store una visita salvata, per ristamparla o modificarla
export function loadVisitIntoStore(store, visit) {
  const { patient, user, office, ecoTool, printData } = visit.data
  const visitType = VisitTypes[visit.type]

  loadPatientIntoStore(store, patient)
  store.commit('SET_PATIENT_ID', visit.patientId)
  // Le select confrontano gli oggetti: si usano quelli delle costanti
  store.commit('SET_USER', Users.find((u) => u.operatorId === user?.operatorId) ?? user)
  store.commit('SET_OFFICE', Offices.find((o) => o.id === office?.id) ?? office)
  store.commit('SET_ECO_TOOL', ecoTool)
  store.commit(visitType.mutation, printData)
  store.commit('SET_PRINT_TYPE', visit.type)
  store.commit('SET_CURRENT_VISIT_ID', visit.id)
}
