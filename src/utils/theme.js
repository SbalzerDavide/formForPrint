// Tema dell'app: classe 'theme-light' / 'theme-dark' sul body, scelta salvata in localStorage

export function getTheme() {
  return document.body.classList.contains('theme-light') ? 'light' : 'dark'
}

export function setTheme(theme) {
  document.body.classList.remove('theme-light', 'theme-dark')
  document.body.classList.add(`theme-${theme}`)
  try {
    localStorage.setItem('theme', theme)
  } catch {
    // localStorage non disponibile: il tema vale solo per questa sessione
  }
}
