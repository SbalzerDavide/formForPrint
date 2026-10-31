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
  `,
  // Le pazienti sono identificate solo dall'id (mai riutilizzato): si toglie il vincolo
  // di unicità su nome, cognome e data di nascita, così sono ammesse le omonime
  `
  CREATE TABLE patients_new (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    surname TEXT NOT NULL,
    date_of_birth TEXT NOT NULL DEFAULT '',
    data TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  INSERT INTO patients_new SELECT * FROM patients;
  DROP TABLE patients;
  ALTER TABLE patients_new RENAME TO patients;
  `
]

// Il database va poi preparato con migrateDatabase(), che attiva anche le foreign key.
// node:sqlite le attiva di default: qui restano spente, perché durante le migrazioni
// ricreare una tabella cancellerebbe a cascata le righe collegate (es. le visite).
export function openDatabase(dbPath) {
  return new DatabaseSync(dbPath, { enableForeignKeyConstraints: false })
}

export function migrateDatabase(db) {
  migrate(db)
  db.exec('PRAGMA foreign_keys = ON')
}

// A fine migrazione si verifica che i riferimenti tra tabelle siano ancora validi
function migrate(db) {
  const { user_version: version } = db.prepare('PRAGMA user_version').get()
  for (let i = version; i < MIGRATIONS.length; i++) {
    transaction(db, () => {
      db.exec(MIGRATIONS[i])
      if (db.prepare('PRAGMA foreign_key_check').all().length > 0) {
        throw new Error(`Migrazione ${i + 1}: riferimenti non validi tra visite e pazienti`)
      }
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

// Aggiorna la paziente con l'id indicato, oppure ne crea una nuova se l'id manca.
function upsertPatient(db, patientId, patient) {
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

  if (patientId) {
    const { changes } = db
      .prepare(
        `UPDATE patients SET name = ?, surname = ?, date_of_birth = ?, data = ?, updated_at = ?
         WHERE id = ?`
      )
      .run(name, surname, dateOfBirth, data, now(), patientId)
    if (changes === 0) {
      throw new Error(`Paziente con ID ${patientId} non trovata`)
    }
    return patientId
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
// La paziente è quella con patientId; se manca ne viene creata una nuova.
export function saveVisit(db, { visitId, patientId, patient, type, data }) {
  if (!VISIT_TYPES.includes(type)) {
    throw new Error(`Tipo di visita non valido: ${type}`)
  }
  return transaction(db, () => {
    const savedPatientId = upsertPatient(db, patientId, patient)
    const json = JSON.stringify(data)

    if (visitId) {
      const { changes } = db
        .prepare('UPDATE visits SET patient_id = ?, type = ?, data = ?, updated_at = ? WHERE id = ?')
        .run(savedPatientId, type, json, now(), visitId)
      if (changes > 0) {
        const { created_at } = db.prepare('SELECT created_at FROM visits WHERE id = ?').get(visitId)
        return { patientId: savedPatientId, visitId, createdAt: created_at }
      }
    }

    const timestamp = now()
    const { lastInsertRowid } = db
      .prepare(
        `INSERT INTO visits (patient_id, type, data, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?)`
      )
      .run(savedPatientId, type, json, timestamp, timestamp)
    return { patientId: savedPatientId, visitId: Number(lastInsertRowid), createdAt: timestamp }
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
