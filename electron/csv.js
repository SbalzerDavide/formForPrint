// CSV compatibile con Excel in italiano: separatore ';', campi tra virgolette quando serve,
// BOM UTF-8 in testa così Excel riconosce gli accenti.

const BOM = '﻿'

function escapeField(value, separator) {
  const text = value === null || value === undefined ? '' : String(value)
  return /["\r\n]/.test(text) || text.includes(separator) ? `"${text.replace(/"/g, '""')}"` : text
}

export function toCsv(rows, separator = ';') {
  return BOM + rows.map((row) => row.map((v) => escapeField(v, separator)).join(separator)).join('\r\n') + '\r\n'
}

// Restituisce le righe come array di campi. Il separatore (';' o ',') si ricava dalla prima riga.
export function parseCsv(text) {
  const input = text.startsWith(BOM) ? text.slice(1) : text
  const firstLine = input.split(/\r?\n/, 1)[0]
  const separator = firstLine.split(';').length >= firstLine.split(',').length ? ';' : ','

  const rows = []
  let row = []
  let field = ''
  let inQuotes = false

  for (let i = 0; i < input.length; i++) {
    const char = input[i]
    if (inQuotes) {
      if (char === '"' && input[i + 1] === '"') {
        field += '"'
        i++
      } else if (char === '"') {
        inQuotes = false
      } else {
        field += char
      }
    } else if (char === '"') {
      inQuotes = true
    } else if (char === separator) {
      row.push(field)
      field = ''
    } else if (char === '\n' || char === '\r') {
      if (char === '\r' && input[i + 1] === '\n') i++
      row.push(field)
      rows.push(row)
      row = []
      field = ''
    } else {
      field += char
    }
  }
  if (field !== '' || row.length > 0) {
    row.push(field)
    rows.push(row)
  }
  // Righe completamente vuote ignorate
  return rows.filter((r) => r.some((value) => value.trim() !== ''))
}
