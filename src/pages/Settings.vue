<script>
  import Header from '@/components/sections/Header.vue'
  import PopupMessage from '@/components/PopupMessage.vue'
  import { localDb, errorMessage } from '@/utils/localDb'
  import { getTheme, setTheme } from '@/utils/theme'

  export default {
    name: 'Settings',
    components: {
      Header,
      PopupMessage
    },
    data() {
      return {
        localDb: localDb,
        theme: getTheme(),
        themes: [
          { value: 'light', label: 'Chiaro', icon: 'fa-solid fa-sun' },
          { value: 'dark', label: 'Scuro', icon: 'fa-solid fa-moon' }
        ],
        dbInfo: null,
        importing: false,
        importReport: null,
        triggerPopup: false,
        popupMessage: '',
        popupType: 'success'
      }
    },
    watch: {
      theme(theme) {
        setTheme(theme)
      }
    },
    async created() {
      this.$store.commit('SET_ACTIVE_PAGE', 'Impostazioni')
      if (localDb) {
        this.dbInfo = await localDb.info()
      }
    },
    methods: {
      showPopup(message, type) {
        this.popupMessage = message
        this.popupType = type
        this.triggerPopup = true
      },
      async importPatients() {
        this.importing = true
        try {
          const result = await localDb.patients.importCsv()
          if (result) this.importReport = result
        } catch (error) {
          this.showPopup(`Importazione non riuscita: ${errorMessage(error)}`, 'error')
        } finally {
          this.importing = false
        }
      },
      async exportPatients() {
        try {
          const result = await localDb.patients.exportCsv()
          if (result) {
            this.showPopup(`${result.count} pazienti esportate in ${result.filePath}`, 'success')
          }
        } catch (error) {
          this.showPopup(`Esportazione non riuscita: ${errorMessage(error)}`, 'error')
        }
      },
      async exportBackup() {
        try {
          const filePath = await localDb.backup.export()
          if (filePath) this.showPopup(`Backup salvato in ${filePath}`, 'success')
        } catch (error) {
          this.showPopup(`Backup non riuscito: ${errorMessage(error)}`, 'error')
        }
      }
    }
  }
</script>

<template>
  <Header :breadcrumbs="[{ label: 'Impostazioni' }]"></Header>
  <div class="settings">
    <section aria-labelledby="appearanceTitle">
      <h2 id="appearanceTitle" class="section-label">Aspetto</h2>
      <div class="row">
        <div class="row-text">
          <span id="themeLabel" class="row-title">Tema</span>
          <span class="row-description">La scelta resta salvata su questo computer.</span>
        </div>
        <div class="segmented" role="radiogroup" aria-labelledby="themeLabel">
          <label v-for="option in themes" :key="option.value" :class="{ checked: theme === option.value }">
            <input v-model="theme" type="radio" name="theme" :value="option.value" />
            <font-awesome-icon :icon="option.icon" aria-hidden="true" />
            {{ option.label }}
          </label>
        </div>
      </div>
    </section>

    <template v-if="localDb">
      <section aria-labelledby="patientsTitle">
        <h2 id="patientsTitle" class="section-label">Pazienti</h2>
        <div class="row">
          <div class="row-text">
            <span class="row-title">Importa pazienti da CSV</span>
            <span class="row-description">
              Da un file esportato da un'altra installazione o compilato con Excel. Prima di importare
              viene mostrato un riepilogo e fatto un backup.
            </span>
          </div>
          <button :disabled="importing" @click="importPatients">Importa…</button>
        </div>

        <div v-if="importReport" class="import-report" aria-live="polite">
          <div class="report-head">
            <strong>
              {{ importReport.applied ? 'Importazione completata' : 'Nessuna paziente da importare' }}
            </strong>
            <button class="close" aria-label="Chiudi resoconto" @click="importReport = null">
              <font-awesome-icon icon="fa-solid fa-xmark" />
            </button>
          </div>
          <p>
            Nuove: {{ importReport.summary.created }} · Aggiornate:
            {{ importReport.summary.updated }} · Già aggiornate: {{ importReport.summary.unchanged }}
          </p>
          <template v-if="importReport.summary.duplicates.length">
            <p class="report-title">
              Saltate perché esiste già una paziente con stessi nome, cognome e data di nascita (da
              verificare a mano):
            </p>
            <ul>
              <li v-for="item in importReport.summary.duplicates" :key="item.line">
                Riga {{ item.line }}: {{ item.label }}
              </li>
            </ul>
          </template>
          <template v-if="importReport.summary.errors.length">
            <p class="report-title">Saltate per errori nei dati:</p>
            <ul>
              <li v-for="item in importReport.summary.errors" :key="item.line">
                Riga {{ item.line }}<template v-if="item.label">, {{ item.label }}</template>:
                {{ item.message }}
              </li>
            </ul>
          </template>
          <router-link v-if="importReport.applied" :to="{ name: 'Pazienti' }" class="link">
            Vai alle pazienti
          </router-link>
        </div>

        <div class="row">
          <div class="row-text">
            <span class="row-title">Esporta pazienti in CSV</span>
            <span class="row-description">
              File apribile con Excel. Contiene dati sanitari in chiaro: conservalo con attenzione.
            </span>
          </div>
          <button @click="exportPatients">Esporta…</button>
        </div>
      </section>

      <section aria-labelledby="dataTitle">
        <h2 id="dataTitle" class="section-label">Dati e backup</h2>
        <div class="row">
          <div class="row-text">
            <span class="row-title">Esporta backup del database</span>
            <span class="row-description">
              Copia completa di pazienti e visite. Un backup automatico viene fatto a ogni avvio
              (ultime 10 copie).
            </span>
          </div>
          <button @click="exportBackup">Esporta…</button>
        </div>
        <dl v-if="dbInfo" class="paths">
          <dt>Database</dt>
          <dd>{{ dbInfo.dbPath }}</dd>
          <dt>Backup automatici</dt>
          <dd>{{ dbInfo.backupDir }}</dd>
        </dl>
      </section>
    </template>

    <PopupMessage
      :content="popupMessage"
      position="bottom"
      :type="popupType"
      :show="triggerPopup"
      @showBack="triggerPopup = false"
    />
  </div>
</template>

<style lang="scss" scoped>
  .settings {
    max-width: 760px;
    margin: 32px auto 0;
    text-align: left;
  }

  section + section {
    margin-top: 40px;
  }

  .section-label {
    margin: 0 0 8px;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--muted);
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 16px 0;
    border-bottom: 1px solid var(--line);
  }
  .row-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    max-width: 60ch;
  }
  .row-title {
    font-size: 1.05rem;
    font-weight: 600;
  }
  .row-description {
    font-size: 0.92rem;
    color: var(--muted);
  }

  .row > button {
    flex-shrink: 0;
    padding: 8px 16px;
    border: 1px solid var(--line);
    background: transparent;
    color: inherit;
    &:hover {
      background: var(--hover);
      border-color: var(--line);
    }
    &:disabled {
      opacity: 0.5;
      cursor: default;
    }
  }

  button:focus-visible,
  .segmented label:focus-within,
  .link:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  /* Selettore del tema */
  .segmented {
    display: inline-flex;
    flex-shrink: 0;
    padding: 3px;
    border: 1px solid var(--line);
    border-radius: 8px;
    label {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: 6px;
      cursor: pointer;
      color: var(--muted);
      &:hover {
        color: inherit;
      }
      &.checked {
        background: var(--hover);
        color: inherit;
        font-weight: 600;
      }
    }
    input {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }
  }

  /* Resoconto importazione */
  .import-report {
    margin: 12px 0 4px;
    padding: 14px 18px;
    border: 1px solid var(--line);
    border-radius: 8px;
    .report-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .close {
      padding: 2px 8px;
      background: transparent;
      color: inherit;
    }
    .report-title {
      margin-top: 12px;
      font-weight: 600;
    }
    ul {
      margin: 4px 0 0;
      padding-left: 20px;
    }
  }
  .link {
    display: inline-block;
    margin-top: 10px;
    color: var(--accent);
    &:hover {
      text-decoration: underline;
    }
  }

  .paths {
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: 6px 16px;
    margin: 16px 0 0;
    font-size: 0.85rem;
    dt {
      color: var(--muted);
    }
    dd {
      margin: 0;
      word-break: break-all;
    }
  }
</style>
