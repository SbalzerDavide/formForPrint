<script>
import { Users, operatorLabel } from '@/const/users.js'
import { Offices } from '@/const/offices.js'
import { storeModel } from '@/utils/storeModel.js'
import { localDb, loadVisitIntoStore, startNewVisit, VisitTypes } from '@/utils/localDb'

const VISIT_DESCRIPTIONS = {
  'ecografia-ostetrica': 'I, II e III trimestre, accrescimento',
  'visita-ginecologica': 'Controllo, PAP test, HPV, contraccezione',
  'visita-ostetrica': 'Gravidanza, anamnesi ed esami'
}

const RECENT_VISITS = 8
const MAX_RESULTS = 6

export default {
  name: 'Home',
  data() {
    return {
      localDb: localDb,
      users: Users,
      offices: Offices,
      patients: [],
      recentVisits: [],
      loaded: false,
      search: '',
      activeResult: 0,
      shortcutKey: navigator.platform.toUpperCase().includes('MAC') ? '⌘' : 'Ctrl+'
    }
  },
  computed: {
    user: storeModel('user', 'SET_USER'),
    office: storeModel('office', 'SET_OFFICE'),
    visitTypes() {
      return Object.entries(VisitTypes).map(([type, visitType], index) => ({
        type,
        label: visitType.label,
        description: VISIT_DESCRIPTIONS[type],
        key: index + 1
      }))
    },
    results() {
      const search = this.search.trim().toLowerCase()
      if (!search) return []
      return this.patients
        .filter(
          (p) =>
            `${p.surname} ${p.name}`.toLowerCase().includes(search) ||
            `${p.name} ${p.surname}`.toLowerCase().includes(search)
        )
        .slice(0, MAX_RESULTS)
    }
  },
  watch: {
    search() {
      this.activeResult = 0
    }
  },
  async mounted() {
    // Tornando alla home si inizia una nuova visita
    this.$store.commit('SET_CURRENT_VISIT', null)
    window.addEventListener('keydown', this.onShortcut)

    if (localDb) {
      this.$refs.search?.focus()
      ;[this.patients, this.recentVisits] = await Promise.all([
        localDb.patients.list(),
        localDb.visits.listRecent(RECENT_VISITS)
      ])
      this.loaded = true
    }
  },
  unmounted() {
    window.removeEventListener('keydown', this.onShortcut)
  },
  methods: {
    operatorLabel,
    newVisit(type) {
      startNewVisit(this.$store, this.$router, type)
    },
    // ⌘1 / Ctrl+1, 2, 3: nuova visita del tipo corrispondente
    onShortcut(event) {
      if (!(event.metaKey || event.ctrlKey) || event.altKey || event.shiftKey) return
      const visitType = this.visitTypes.find((v) => String(v.key) === event.key)
      if (!visitType) return
      event.preventDefault()
      this.newVisit(visitType.type)
    },
    onSearchKeydown(event) {
      if (event.key === 'ArrowDown' && this.results.length) {
        event.preventDefault()
        this.activeResult = (this.activeResult + 1) % this.results.length
      } else if (event.key === 'ArrowUp' && this.results.length) {
        event.preventDefault()
        this.activeResult = (this.activeResult - 1 + this.results.length) % this.results.length
      } else if (event.key === 'Enter' && this.results[this.activeResult]) {
        this.openPatient(this.results[this.activeResult])
      } else if (event.key === 'Escape') {
        this.search = ''
      }
    },
    openPatient(patient) {
      this.$router.push({ name: 'Paziente', params: { patientId: patient.id } })
    },
    formatDate(date) {
      return date ? dayjs(date).format('DD/MM/YYYY') : ''
    },
    formatWhen(date) {
      const day = dayjs(date)
      if (day.isSame(dayjs(), 'day')) return `Oggi ${day.format('HH:mm')}`
      if (day.isSame(dayjs().subtract(1, 'day'), 'day')) return `Ieri ${day.format('HH:mm')}`
      return day.format('DD/MM/YYYY')
    },
    visitLabel(type) {
      return VisitTypes[type]?.label ?? type
    },
    reprint(visit) {
      loadVisitIntoStore(this.$store, visit)
      this.$router.push({ name: 'Print' })
    },
    open(visit) {
      loadVisitIntoStore(this.$store, visit)
      this.$router.push({ name: VisitTypes[visit.type].route })
    }
  }
}
</script>

<template>
  <div class="home" :class="{ 'no-db': !localDb }">
    <header class="topbar">
      <span class="wordmark">Form for Print</span>
      <div class="context">
        <label class="visually-hidden" for="homeUser">Operatore</label>
        <select id="homeUser" v-model="user">
          <option v-for="(item, index) in users" :key="index" :value="item">
            {{ operatorLabel(item) }}
          </option>
        </select>
        <span class="dot" aria-hidden="true">·</span>
        <label class="visually-hidden" for="homeOffice">Ambulatorio</label>
        <select id="homeOffice" v-model="office">
          <option :value="null" disabled>Ambulatorio</option>
          <option v-for="item in offices" :key="item.id" :value="item">{{ item.label }}</option>
        </select>
        <router-link :to="{ name: 'Impostazioni' }" class="settings-link" title="Impostazioni">
          <font-awesome-icon icon="fa-solid fa-gear" />
          <span class="visually-hidden">Impostazioni</span>
        </router-link>
      </div>
    </header>

    <main class="columns">
      <section class="new-visit" aria-labelledby="newVisitTitle">
        <h2 id="newVisitTitle" class="section-label">Nuova visita</h2>
        <ul>
          <li v-for="visitType in visitTypes" :key="visitType.type">
            <button class="visit-type" @click="newVisit(visitType.type)">
              <kbd>{{ shortcutKey }}{{ visitType.key }}</kbd>
              <span class="visit-text">
                <span class="visit-title">{{ visitType.label }}</span>
                <span class="visit-description">{{ visitType.description }}</span>
              </span>
              <font-awesome-icon class="arrow" icon="fa-solid fa-arrow-right" aria-hidden="true" />
            </button>
          </li>
        </ul>
      </section>

      <section v-if="localDb" class="patient" aria-labelledby="patientTitle">
        <h2 id="patientTitle" class="section-label">Paziente</h2>
        <div class="search">
          <font-awesome-icon class="search-icon" icon="fa-solid fa-magnifying-glass" aria-hidden="true" />
          <input
            ref="search"
            v-model="search"
            type="search"
            placeholder="Cerca per nome o cognome"
            aria-label="Cerca paziente"
            role="combobox"
            aria-autocomplete="list"
            :aria-expanded="results.length > 0"
            aria-controls="patientResults"
            :aria-activedescendant="results.length ? `patient-result-${activeResult}` : undefined"
            @keydown="onSearchKeydown"
          />
        </div>
        <ul v-if="results.length" id="patientResults" class="results" role="listbox">
          <li
            v-for="(patient, index) in results"
            :id="`patient-result-${index}`"
            :key="patient.id"
            role="option"
            :aria-selected="index === activeResult"
            :class="{ active: index === activeResult }"
            @mouseenter="activeResult = index"
            @click="openPatient(patient)"
          >
            <span class="result-name">{{ patient.surname }} {{ patient.name }}</span>
            <span class="result-meta">
              <template v-if="patient.dateOfBirth">{{ formatDate(patient.dateOfBirth) }} · </template>
              ID {{ patient.id }}
            </span>
          </li>
        </ul>
        <p v-else-if="search.trim()" class="hint">
          Nessuna paziente trovata. Per una paziente nuova, inizia la visita da "Nuova visita".
        </p>

        <h2 class="section-label recent-label">Visite recenti</h2>
        <ul v-if="recentVisits.length" class="recent">
          <li v-for="visit in recentVisits" :key="visit.id">
            <span class="when">{{ formatWhen(visit.updatedAt) }}</span>
            <span class="recent-patient">{{ visit.patientSurname }} {{ visit.patientName }}</span>
            <span class="recent-type">{{ visitLabel(visit.type) }}</span>
            <span class="recent-actions">
              <button class="link" @click="reprint(visit)">Ristampa</button>
              <button class="link" @click="open(visit)">Apri</button>
            </span>
          </li>
        </ul>
        <p v-else-if="loaded" class="hint">
          Le visite salvate compariranno qui, pronte da riaprire o ristampare.
        </p>

        <router-link :to="{ name: 'Pazienti' }" class="all-patients">
          Tutte le pazienti<template v-if="patients.length"> ({{ patients.length }})</template>
          <font-awesome-icon icon="fa-solid fa-arrow-right" aria-hidden="true" />
        </router-link>
      </section>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.home {
  max-width: 1080px;
  margin: 0 auto;
  text-align: left;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

button:focus-visible,
select:focus-visible,
input:focus-visible,
a:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* Barra in alto */
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--line);
}
.wordmark {
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 0.01em;
}
.home .context {
  display: flex;
  align-items: center;
  gap: 6px;
  select {
    padding: 6px 8px;
    border: 1px solid transparent;
    border-radius: 6px;
    background: transparent;
    color: inherit;
    font: inherit;
    cursor: pointer;
    &:hover {
      border-color: var(--line);
    }
    option {
      color: #1a1a1a;
    }
  }
  .dot {
    color: var(--muted);
  }
  .settings-link {
    margin-left: 12px;
    padding: 6px;
    border-radius: 6px;
    color: var(--muted);
    &:hover {
      color: inherit;
    }
  }
}

/* Colonne */
.columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 40px;
}
.new-visit {
  padding-right: 48px;
}
.patient {
  padding-left: 48px;
  border-left: 1px solid var(--line);
}
.no-db .columns {
  grid-template-columns: minmax(0, 560px);
}

.section-label {
  margin: 0 0 14px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--muted);
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Nuova visita */
.visit-type {
  display: grid;
  grid-template-columns: 3.2rem 1fr auto;
  align-items: center;
  gap: 12px;
  width: 100%;
  margin-bottom: 6px;
  padding: 16px 14px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: inherit;
  text-align: left;
  &:hover {
    background: var(--hover);
    .arrow {
      color: var(--accent);
      transform: translateX(3px);
    }
  }
}
kbd {
  justify-self: start;
  padding: 2px 6px;
  border: 1px solid var(--line);
  border-radius: 4px;
  font-family: inherit;
  font-size: 0.75rem;
  color: var(--muted);
}
.visit-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.visit-title {
  font-size: 1.2rem;
  font-weight: 600;
}
.visit-description {
  font-size: 0.92rem;
  font-weight: 400;
  color: var(--muted);
}
.arrow {
  color: var(--muted);
}

/* Ricerca paziente */
.home .search {
  position: relative;
  .search-icon {
    position: absolute;
    left: 13px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--muted);
    pointer-events: none;
  }
  input {
    width: 100%;
    height: 46px;
    padding: 0 12px 0 40px;
    border: 1px solid var(--line);
    border-radius: 8px;
    background: transparent;
    color: inherit;
    font: inherit;
    font-size: 1.05rem;
    &::placeholder {
      color: var(--muted);
    }
  }
}
.results {
  margin-top: 6px;
  padding: 4px;
  border: 1px solid var(--line);
  border-radius: 8px;
  li {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 6px;
    cursor: pointer;
    &.active {
      background: var(--accent-soft);
    }
  }
  .result-name {
    font-weight: 600;
  }
  .result-meta {
    color: var(--muted);
    font-size: 0.9rem;
    white-space: nowrap;
  }
}
.hint {
  margin: 10px 0 0;
  color: var(--muted);
  font-size: 0.92rem;
}

/* Visite recenti */
.recent-label {
  margin-top: 36px;
}
.recent li {
  display: grid;
  grid-template-columns: 6.5rem 1fr auto;
  grid-template-areas:
    'when patient actions'
    'when type actions';
  column-gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid var(--line);
  &:first-child {
    border-top: 1px solid var(--line);
  }
}
.when {
  grid-area: when;
  color: var(--muted);
  font-size: 0.9rem;
  font-variant-numeric: tabular-nums;
  padding-top: 2px;
}
.recent-patient {
  grid-area: patient;
  font-weight: 600;
}
.recent-type {
  grid-area: type;
  color: var(--muted);
  font-size: 0.9rem;
}
.recent-actions {
  grid-area: actions;
  align-self: center;
  display: flex;
  gap: 4px;
}
button.link {
  padding: 4px 8px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--accent);
  font-size: 0.92rem;
  font-weight: 500;
  &:hover {
    background: var(--hover);
  }
}
.all-patients {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
  color: var(--accent);
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .arrow {
    transition:
      transform 180ms cubic-bezier(0.25, 1, 0.5, 1),
      color 180ms ease-out;
  }
  .visit-type,
  button.link {
    transition: background-color 150ms ease-out;
  }
}

@media (max-width: 760px) {
  .columns {
    grid-template-columns: 1fr;
    row-gap: 32px;
  }
  .new-visit {
    padding-right: 0;
  }
  .patient {
    padding-left: 0;
    border-left: 0;
  }
}
</style>
