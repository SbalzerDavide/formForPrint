import { DatabaseSync } from 'node:sqlite'

export const VISIT_TYPES = ['ecografia-ostetrica', 'visita-ginecologica', 'visita-ostetrica']

// Ogni migrazione porta il database alla versione successiva (PRAGMA user_version).
// Non modificare quelle esistenti: aggiungerne di nuove in coda.
const MIGRATIONS = [
  `
  CREATE TABLE patients (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    surname TEXT NOT NULL,
    date_of_birth TEXT NOT NULL DEFAULT '',
    data TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    UNIQUE (name COLLATE NOCASE, surname COLLATE NOCASE, date_of_birth)
  );

  CREATE TABLE visits (
    id INTEGER PRIMARY KEY,
    patient_id INTEGER NOT NULL REFERENCES patients (id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    data TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE INDEX visits_patient_id ON visits (patient_id, created_at);
  `
]

export function openDatabase(dbPath) {
  const db = new DatabaseSync(dbPath)
  db.exec('PRAGMA foreign_keys = ON')
  migrate(db)
  return db
}

function migrate(db) {
  const { user_version: version } = db.prepare('PRAGMA user_version').get()
  for (let i = version; i < MIGRATIONS.length; i++) {
    transaction(db, () => {
      db.exec(MIGRATIONS[i])
      db.exec(`PRAGMA user_version = ${i + 1}`)
    })
  }
}

function transaction(db, fn) {
  db.exec('BEGIN')
  try {
    const result = fn()
    db.exec('COMMIT')
    return result
  } catch (error) {
    db.exec('ROLLBACK')
    throw error
  }
}

const now = () => new Date().toISOString()

function rowToPatient(row) {
  return {
    id: row.id,
    name: row.name,
    surname: row.surname,
    dateOfBirth: row.date_of_birth,
    ...JSON.parse(row.data),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    ...(row.visit_count !== undefined && {
      visitCount: row.visit_count,
      lastVisitAt: row.last_visit_at
    })
  }
}

function rowToVisit(row) {
  return {
    id: row.id,
    patientId: row.patient_id,
    type: row.type,
    data: JSON.parse(row.data),
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}

export function listPatients(db) {
  const rows = db
    .prepare(
      `SELECT p.*, COUNT(v.id) AS visit_count, MAX(v.created_at) AS last_visit_at
       FROM patients p
       LEFT JOIN visits v ON v.patient_id = p.id
       GROUP BY p.id
       ORDER BY p.surname COLLATE NOCASE, p.name COLLATE NOCASE`
    )
    .all()
  return rows.map(rowToPatient)
}

export function getPatient(db, id) {
  const row = db.prepare('SELECT * FROM patients WHERE id = ?').get(id)
  return row ? rowToPatient(row) : null
}

// Aggiorna la paziente con stesso nome, cognome e data di nascita, altrimenti la crea.
// Correggere uno di questi campi crea quindi una nuova paziente invece di sovrascriverne un'altra.
function upsertPatient(db, patient) {
  const name = String(patient.name ?? '').trim()
  const surname = String(patient.surname ?? '').trim()
  const dateOfBirth = String(patient.dateOfBirth ?? '')
  if (!name || !surname) {
    throw new Error('Inserire nome e cognome della paziente')
  }
  const data = JSON.stringify({
    height: patient.height ?? null,
    normalWeight: patient.normalWeight ?? null,
    moreInfo: patient.moreInfo ?? ''
  })

  const existing = db
    .prepare(
      `SELECT id FROM patients
       WHERE name = ? COLLATE NOCASE AND surname = ? COLLATE NOCASE AND date_of_birth = ?`
    )
    .get(name, surname, dateOfBirth)

  if (existing) {
    db.prepare('UPDATE patients SET name = ?, surname = ?, data = ?, updated_at = ? WHERE id = ?').run(
      name,
      surname,
      data,
      now(),
      existing.id
    )
    return existing.id
  }

  const timestamp = now()
  const { lastInsertRowid } = db
    .prepare(
      `INSERT INTO patients (name, surname, date_of_birth, data, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
    .run(name, surname, dateOfBirth, data, timestamp, timestamp)
  return Number(lastInsertRowid)
}

// Salva una visita: se visitId è indicato la aggiorna, altrimenti ne crea una nuova.
export function saveVisit(db, { visitId, patient, type, data }) {
  if (!VISIT_TYPES.includes(type)) {
    throw new Error(`Tipo di visita non valido: ${type}`)
  }
  return transaction(db, () => {
    const savedPatientId = upsertPatient(db, patient)
    const json = JSON.stringify(data)

    if (visitId) {
      const { changes } = db
        .prepare('UPDATE visits SET patient_id = ?, type = ?, data = ?, updated_at = ? WHERE id = ?')
        .run(savedPatientId, type, json, now(), visitId)
      if (changes > 0) return { patientId: savedPatientId, visitId }
    }

    const timestamp = now()
    const { lastInsertRowid } = db
      .prepare(
        `INSERT INTO visits (patient_id, type, data, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?)`
      )
      .run(savedPatientId, type, json, timestamp, timestamp)
    return { patientId: savedPatientId, visitId: Number(lastInsertRowid) }
  })
}

export function listVisitsByPatient(db, patientId) {
  const rows = db
    .prepare('SELECT * FROM visits WHERE patient_id = ? ORDER BY created_at DESC')
    .all(patientId)
  return rows.map(rowToVisit)
}

export function getVisit(db, id) {
  const row = db.prepare('SELECT * FROM visits WHERE id = ?').get(id)
  return row ? rowToVisit(row) : null
}
