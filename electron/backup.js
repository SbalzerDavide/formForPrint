import { backup } from 'node:sqlite'
import fs from 'node:fs/promises'
import path from 'node:path'

const KEEP_BACKUPS = 10
const BACKUP_PREFIX = 'formforprint-'

const timestamp = () => new Date().toISOString().replace(/[:.]/g, '-').replace('Z', '')

export function backupFileName() {
  return `${BACKUP_PREFIX}${timestamp()}.db`
}

// Copia del database in backupDir, mantenendo solo le ultime KEEP_BACKUPS copie
export async function rotateBackup(db, backupDir) {
  await fs.mkdir(backupDir, { recursive: true })
  await backup(db, path.join(backupDir, backupFileName()))

  const files = (await fs.readdir(backupDir))
    .filter((file) => file.startsWith(BACKUP_PREFIX) && file.endsWith('.db'))
    .sort()
  const toDelete = files.slice(0, Math.max(0, files.length - KEEP_BACKUPS))
  await Promise.all(toDelete.map((file) => fs.unlink(path.join(backupDir, file))))
}

export async function exportBackup(db, destination) {
  await backup(db, destination)
}
