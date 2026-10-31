import { app, BrowserWindow, net, protocol, shell } from 'electron'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Build di Vite per Electron (separata da dist/, usata da GitHub Pages)
const distDir = path.join(__dirname, '..', 'dist-app')

// In sviluppo: `electron . --dev-server=http://localhost:5173`
const devServerArg = process.argv.find((arg) => arg.startsWith('--dev-server='))
const devServerUrl = devServerArg?.split('=')[1]

// L'app viene servita tramite il protocollo app:// invece di file://,
// così fetch() (es. patients.csv) funziona come sul web
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: { standard: true, secure: true, supportFetchAPI: true }
  }
])

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

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    autoHideMenuBar: true,
    webPreferences: {
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

app.whenReady().then(() => {
  serveDist()
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
