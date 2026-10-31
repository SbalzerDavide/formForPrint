import { randomUUID } from 'node:crypto'
import { toCsv, parseCsv } from './csv.js'
import {
  listPatients,
  findPatientByUid,
  findPatientsByIdentity,
  writeImportedPatient,
  transaction
} from './db.js'

// Colonne del CSV esportato. Nell'importazione sono accettati anche i nomi del vecchio
// patients.csv (Name;Surname;dateOfBirth;Weight;Height;MoreInfo).
const COLUMNS = [
  { key: 'uid', header: 'Codice', aliases: ['codice', 'uid'] },
  { key: 'surname', header: 'Cognome', aliases: ['cognome', 'surname'] },
  { key: 'name', header: 'Nome', aliases: ['nome', 'name'] },
  { key: 'dateOfBirth', header: 'Data di nascita', aliases: ['data di nascita', 'dateofbirth'] },
  { key: 'height', header: 'Altezza (cm)', aliases: ['altezza (cm)', 'altezza', 'height'] },
  { key: 'normalWeight', header: 'Peso (kg)', aliases: ['peso (kg)', 'peso', 'weight'] },
  { key: 'moreInfo', header: 'Note', aliases: ['note', 'moreinfo'] },
  { key: 'updatedAt', header: 'Ultima modifica', aliases: ['ultima modifica', 'updatedat'] }
]

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

// --- Esportazione ---

// AAAA-MM-GG -> GG/MM/AAAA
function formatDate(isoDate) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate ?? '')
  return match ? `${match[3]}/${match[2]}/${match[1]}` : ''
}

// Virgola decimale, come la legge Excel in italiano; 0 o vuoto -> cella vuota
function formatNumber(value) {
  return value ? String(value).replace('.', ',') : ''
}

export function exportPatientsCsv(db) {
  const rows = listPatients(db).map((p) => [
    p.uid,
    p.surname,
    p.name,
    formatDate(p.dateOfBirth),
    formatNumber(p.height),
    formatNumber(p.normalWeight),
    p.moreInfo ?? '',
    p.updatedAt
  ])
  return { csv: toCsv([COLUMNS.map((c) => c.header), ...rows]), count: rows.length }
}

// --- Importazione ---

// Accetta GG/MM/AAAA, GG-MM-AAAA e AAAA-MM-GG; restituisce AAAA-MM-GG, '' se vuota, null se non valida
function parseDate(value) {
  const text = value.trim()
  if (!text) return ''
  let day, month, year
  let match = /^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/.exec(text)
  if (match) {
    ;[, day, month, year] = match
  } else if ((match = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(text))) {
    ;[, year, month, day] = match
  } else {
    return null
  }
  const date = new Date(Date.UTC(year, month - 1, day))
  if (date.getUTCFullYear() !== Number(year) || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== Number(day)) {
    return null
  }
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

// Numero positivo (accetta la virgola decimale); null se vuoto, NaN se non valido
function parseNumber(value) {
  const text = value.trim().replace(',', '.')
  if (!text) return null
  const number = Number(text)
  return Number.isFinite(number) && number >= 0 ? number : NaN
}

function readRow(fields, columnIndex) {
  const get = (key) => (columnIndex[key] === undefined ? '' : (fields[columnIndex[key]] ?? '').trim())
  const errors = []

  const patient = {
    uid: get('uid').toLowerCase(),
    name: get('name'),
    surname: get('surname'),
    dateOfBirth: parseDate(get('dateOfBirth')),
    height: parseNumber(get('height')),
    normalWeight: parseNumber(get('normalWeight')),
    moreInfo: get('moreInfo'),
    updatedAt: get('updatedAt')
  }

  if (!patient.name || !patient.surname) errors.push('nome e cognome sono obbligatori')
  if (patient.uid && !UUID.test(patient.uid)) errors.push('codice non valido')
  if (patient.dateOfBirth === null) errors.push(`data di nascita non valida ("${get('dateOfBirth')}")`)
  if (Number.isNaN(patient.height)) errors.push(`altezza non valida ("${get('height')}")`)
  if (Number.isNaN(patient.normalWeight)) errors.push(`peso non valido ("${get('normalWeight')}")`)
  if (patient.updatedAt && Number.isNaN(Date.parse(patient.updatedAt))) {
    errors.push(`ultima modifica non valida ("${patient.updatedAt}")`)
  }
  return { patient, errors }
}

// Analizza il CSV senza modificare il database: cosa verrebbe creato, aggiornato o saltato.
//
// Regole:
// - riga con codice già presente: aggiornata solo se nel file è più recente, altrimenti invariata
// - riga con codice nuovo, o senza codice (es. file fatto a mano): creata, salvo che esista già
//   una paziente con stessi nome, cognome e data di nascita (nel database o più su nel file):
//   in quel caso viene saltata come possibile doppione, da verificare a mano
export function planPatientsImport(db, text) {
  const rows = parseCsv(text)
  if (rows.length === 0) throw new Error('Il file è vuoto')

  const header = rows[0].map((h) => h.trim().toLowerCase())
  const columnIndex = {}
  for (const column of COLUMNS) {
    const index = header.findIndex((h) => column.aliases.includes(h))
    if (index !== -1) columnIndex[column.key] = index
  }
  if (columnIndex.name === undefined || columnIndex.surname === undefined) {
    throw new Error('Intestazione non riconosciuta: servono almeno le colonne "Nome" e "Cognome"')
  }

  const plan = { create: [], update: [], unchanged: 0, duplicates: [], errors: [] }
  const seenUids = new Set()
  const seenIdentities = new Set()
  const timestamp = new Date().toISOString()

  rows.slice(1).forEach((fields, index) => {
    const line = index + 2
    const { patient, errors } = readRow(fields, columnIndex)
    const label = `${patient.surname} ${patient.name}`.trim()

    if (errors.length) {
      plan.errors.push({ line, label, message: errors.join(', ') })
      return
    }
    if (patient.uid && seenUids.has(patient.uid)) {
      plan.errors.push({ line, label, message: 'codice ripetuto nel file' })
      return
    }

    patient.height = patient.height ?? null
    patient.normalWeight = patient.normalWeight ?? null
    patient.updatedAt = patient.updatedAt ? new Date(patient.updatedAt).toISOString() : timestamp

    if (patient.uid) {
      seenUids.add(patient.uid)
      const existing = findPatientByUid(db, patient.uid)
      if (existing) {
        if (patient.updatedAt > existing.updatedAt) {
          plan.update.push(patient)
        } else {
          plan.unchanged++
        }
        return
      }
    }

    const identity = [patient.name, patient.surname, patient.dateOfBirth].join('|').toLowerCase()
    if (seenIdentities.has(identity) || findPatientsByIdentity(db, patient).length > 0) {
      plan.duplicates.push({ line, label })
      return
    }
    seenIdentities.add(identity)
    plan.create.push({ ...patient, uid: patient.uid || randomUUID() })
  })

  return plan
}

export function applyPatientsImport(db, plan) {
  transaction(db, () => {
    for (const patient of [...plan.create, ...plan.update]) {
      writeImportedPatient(db, patient)
    }
  })
}

export function summarizePlan(plan) {
  return {
    created: plan.create.length,
    updated: plan.update.length,
    unchanged: plan.unchanged,
    duplicates: plan.duplicates,
    errors: plan.errors
  }
}
