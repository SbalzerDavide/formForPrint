// Espone all'interfaccia solo le funzioni del database locale, senza accesso diretto a Node
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('localDb', {
  info: () => ipcRenderer.invoke('db:info'),
  patients: {
    list: () => ipcRenderer.invoke('patients:list'),
    get: (id) => ipcRenderer.invoke('patients:get', id)
  },
  visits: {
    save: (visit) => ipcRenderer.invoke('visits:save', visit),
    listByPatient: (patientId) => ipcRenderer.invoke('visits:listByPatient', patientId),
    get: (id) => ipcRenderer.invoke('visits:get', id)
  },
  backup: {
    export: () => ipcRenderer.invoke('backup:export')
  }
})
