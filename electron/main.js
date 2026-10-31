import { app, BrowserWindow, dialog, ipcMain, net, protocol, shell } from 'electron'
import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import {
  openDatabase,
  migrateDatabase,
  listPatients,
  getPatient,
  saveVisit,
  listVisitsByPatient,
  listRecentVisits,
  getVisit
} from './db.js'
import { backupFileName, exportBackup, rotateBackup } from './backup.js'
import {
  exportPatientsCsv,
  planPatientsImport,
  applyPatientsImport,
  summarizePlan
} from './patientsCsv.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Build di Vite per Electron (separata da dist/, usata da GitHub Pages)
const distDir = path.join(__dirname, '..', 'dist-app')

// In sviluppo: `electron . --dev-server=http://localhost:5173`
const devServerArg = process.argv.find((arg) => arg.startsWith('--dev-server='))
const devServerUrl = devServerArg?.split('=')[1]

// In sviluppo i dati vanno in una cartella separata, per non toccare quelli reali
if (devServerUrl) {
  app.setPath('userData', path.join(app.getPath('appData'), `${app.getName()} (dev)`))
}

// L'app viene servita tramite il protocollo app:// invece di file://,
// così fetch() (es. patients.csv) funziona come sul web
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: { standard: true, secure: true, supportFetchAPI: true }
  }
])

let db
let dbPath
let backupDir

function serveDist() {
  protocol.handle('app', (request) => {
    const { pathname } = new URL(request.url)
    const filePath = path.normalize(path.join(distDir, decodeURIComponent(pathname)))

    // Blocca richieste fuori dalla cartella dist
    if (!filePath.startsWith(distDir + path.sep)) {
      return new Response('Not found', { status: 404 })
    }
    return net.fetch(pathToFileURL(filePath).toString())
  })
}

async function initDatabase() {
  const dataDir = app.getPath('userData')
  dbPath = path.join(dataDir, 'formforprint.db')
  backupDir = path.join(dataDir, 'backups')

  fs.mkdirSync(dataDir, { recursive: true })
  const isNew = !fs.existsSync(dbPath)
  db = openDatabase(dbPath)

  // Backup automatico a ogni avvio, prima di eventuali migrazioni
  // (non serve per un database appena creato)
  if (!isNew) {
    await rotateBackup(db, backupDir).catch((error) => console.error('Backup non riuscito:', error))
  }
  migrateDatabase(db)
}

// Accetta richieste solo dalla pagina dell'app
function isTrustedSender(event) {
  const url = event.senderFrame?.url ?? ''
  return url.startsWith('app://bundle/') || (devServerUrl && url.startsWith(devServerUrl))
}

function handle(channel, fn) {
  ipcMain.handle(channel, (event, ...args) => {
    if (!isTrustedSender(event)) throw new Error('Richiesta non autorizzata')
    return fn(event, ...args)
  })
}

function toId(value) {
  const id = Number(value)
  if (!Number.isInteger(id) || id <= 0) throw new Error('Id non valido')
  return id
}

function registerIpc() {
  handle('db:info', () => ({ dbPath, backupDir }))
  handle('patients:list', () => listPatients(db))
  handle('patients:get', (event, id) => getPatient(db, toId(id)))
  handle('visits:save', (event, visit) =>
    saveVisit(db, {
      ...visit,
      visitId: visit.visitId ? toId(visit.visitId) : null,
      patientId: visit.patientId ? toId(visit.patientId) : null
    })
  )
  handle('visits:listByPatient', (event, patientId) => listVisitsByPatient(db, toId(patientId)))
  handle('visits:get', (event, id) => getVisit(db, toId(id)))
  handle('visits:listRecent', (event, limit) => listRecentVisits(db, Math.min(toId(limit), 100)))
  handle('backup:export', async (event) => {
    const { canceled, filePath } = await dialog.showSaveDialog(
      BrowserWindow.fromWebContents(event.sender),
      {
        title: 'Esporta backup',
        defaultPath: path.join(app.getPath('documents'), backupFileName()),
        filters: [{ name: 'Database SQLite', extensions: ['db'] }]
      }
    )
    if (canceled || !filePath) return null
    await exportBackup(db, filePath)
    return filePath
  })
  handle('patients:exportCsv', async (event) => {
    const date = new Date().toISOString().slice(0, 10)
    const { canceled, filePath } = await dialog.showSaveDialog(
      BrowserWindow.fromWebContents(event.sender),
      {
        title: 'Esporta pazienti',
        defaultPath: path.join(app.getPath('documents'), `pazienti-${date}.csv`),
        filters: [{ name: 'CSV', extensions: ['csv'] }]
      }
    )
    if (canceled || !filePath) return null
    const { csv, count } = exportPatientsCsv(db)
    await fsp.writeFile(filePath, csv, 'utf8')
    return { filePath, count }
  })
  handle('patients:importCsv', async (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    const { canceled, filePaths } = await dialog.showOpenDialog(win, {
      title: 'Importa pazienti',
      properties: ['openFile'],
      filters: [{ name: 'CSV', extensions: ['csv', 'txt'] }]
    })
    if (canceled || !filePaths.length) return null

    const plan = planPatientsImport(db, await fsp.readFile(filePaths[0], 'utf8'))
    const summary = summarizePlan(plan)
    if (summary.created + summary.updated === 0) {
      return { applied: false, summary }
    }

    const { response } = await dialog.showMessageBox(win, {
      type: 'question',
      buttons: ['Importa', 'Annulla'],
      defaultId: 0,
      cancelId: 1,
      message: `Importare le pazienti da ${path.basename(filePaths[0])}?`,
      detail: [
        `Nuove: ${summary.created}`,
        `Da aggiornare: ${summary.updated}`,
        `Già aggiornate: ${summary.unchanged}`,
        `Possibili doppioni, saltate: ${summary.duplicates.length}`,
        `Righe con errori, saltate: ${summary.errors.length}`,
        '',
        'Prima di importare viene fatto un backup del database.'
      ].join('\n')
    })
    if (response !== 0) return null

    await rotateBackup(db, backupDir)
    applyPatientsImport(db, plan)
    return { applied: true, summary }
  })
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  })

  // I link esterni si aprono nel browser di sistema
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http')) shell.openExternal(url)
    return { action: 'deny' }
  })

  if (devServerUrl) {
    win.loadURL(devServerUrl)
  } else {
    win.loadURL('app://bundle/index.html')
  }
}

app.whenReady().then(async () => {
  try {
    await initDatabase()
  } catch (error) {
    dialog.showErrorBox('Database non disponibile', error.message)
    app.quit()
    return
  }
  registerIpc()
  serveDist()
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('will-quit', () => {
  db?.close()
})
