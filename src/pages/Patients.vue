<script>
  import Header from '@/components/sections/Header.vue'
  import PopupMessage from '@/components/PopupMessage.vue'
  import { localDb, loadVisitIntoStore, errorMessage, VisitTypes } from '@/utils/localDb'

  export default {
    name: 'Patients',
    components: {
      Header,
      PopupMessage
    },
    props: {
      // Dalla rotta /pazienti/:patientId
      patientId: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        patients: [],
        loaded: false,
        search: '',
        visits: [],
        dbInfo: null,
        triggerPopup: false,
        popupMessage: '',
        popupType: 'success'
      }
    },
    computed: {
      selectedPatient() {
        return this.patients.find((p) => p.id === Number(this.patientId)) ?? null
      },
      breadcrumbs() {
        if (!this.patientId) return [{ label: 'Pazienti' }]
        return [
          { label: 'Pazienti', to: { name: 'Pazienti' } },
          {
            label: this.selectedPatient
              ? `${this.selectedPatient.surname} ${this.selectedPatient.name}`
              : `Paziente ${this.patientId}`
          }
        ]
      },
      filteredPatients() {
        const search = this.search.trim().toLowerCase()
        if (!search) return this.patients
        return this.patients.filter((p) =>
          `${p.surname} ${p.name}`.toLowerCase().includes(search) ||
          `${p.name} ${p.surname}`.toLowerCase().includes(search)
        )
      }
    },
    watch: {
      patientId: {
        immediate: true,
        async handler(patientId) {
          this.visits = patientId && localDb ? await localDb.visits.listByPatient(Number(patientId)) : []
        }
      }
    },
    async created() {
      this.$store.commit('SET_ACTIVE_PAGE', 'Pazienti')
      if (!localDb) return
      this.patients = await localDb.patients.list()
      this.loaded = true
      this.dbInfo = await localDb.info()
    },
    methods: {
      formatDate(date) {
        return date ? dayjs(date).format('DD/MM/YYYY') : ''
      },
      formatDateTime(date) {
        return dayjs(date).format('DD/MM/YYYY HH:mm')
      },
      visitLabel(type) {
        return VisitTypes[type]?.label ?? type
      },
      selectPatient(patient) {
        this.$router.push({ name: 'Paziente', params: { patientId: patient.id } })
      },
      reprint(visit) {
        loadVisitIntoStore(this.$store, visit)
        this.$router.push({ name: 'Print' })
      },
      edit(visit) {
        loadVisitIntoStore(this.$store, visit)
        this.$router.push({ name: VisitTypes[visit.type].route })
      },
      async exportBackup() {
        try {
          const filePath = await localDb.backup.export()
          if (filePath) {
            this.popupMessage = `Backup salvato in ${filePath}`
            this.popupType = 'success'
            this.triggerPopup = true
          }
        } catch (error) {
          this.popupMessage = `Backup non riuscito: ${errorMessage(error)}`
          this.popupType = 'error'
          this.triggerPopup = true
        }
      }
    }
  }
</script>

<template>
  <Header :breadcrumbs="breadcrumbs"></Header>
  <div class="patients-page">
    <p v-if="loaded && !patients.length" class="empty">
      Nessuna paziente salvata. Le visite vengono salvate quando confermi la stampa o premi "Salva".
    </p>

    <div v-else class="columns">
      <section class="patient-list">
        <input v-model="search" type="search" placeholder="Cerca paziente" />
        <ul>
          <li
            v-for="patient in filteredPatients"
            :key="patient.id"
            :class="{ active: selectedPatient?.id === patient.id }"
            @click="selectPatient(patient)"
          >
            <div class="patient-name">{{ patient.surname }} {{ patient.name }}</div>
            <div class="patient-meta">
              ID {{ patient.id }} ·
              <span v-if="patient.dateOfBirth">{{ formatDate(patient.dateOfBirth) }} · </span>
              {{ patient.visitCount }} {{ patient.visitCount === 1 ? 'visita' : 'visite' }}
            </div>
          </li>
        </ul>
      </section>

      <section class="visit-list">
        <p v-if="!patientId" class="empty">Seleziona una paziente per vedere le visite.</p>
        <p v-else-if="loaded && !selectedPatient" class="empty">Paziente non trovata.</p>
        <template v-else-if="selectedPatient">
          <h3>
            {{ selectedPatient.surname }} {{ selectedPatient.name }}
            <span class="patient-id">ID {{ selectedPatient.id }}</span>
          </h3>
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Tipo</th>
                <th>Operatore</th>
                <th>Ambulatorio</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="visit in visits" :key="visit.id">
                <td>{{ formatDateTime(visit.createdAt) }}</td>
                <td>{{ visitLabel(visit.type) }}</td>
                <td>{{ visit.data.user?.name }} {{ visit.data.user?.surname }}</td>
                <td>{{ visit.data.office?.label }}</td>
                <td class="actions">
                  <button @click="reprint(visit)">Ristampa</button>
                  <button @click="edit(visit)">Modifica</button>
                </td>
              </tr>
            </tbody>
          </table>
        </template>
      </section>
    </div>

    <footer class="backup">
      <button @click="exportBackup">Esporta backup</button>
      <span v-if="dbInfo" class="db-path">Database: {{ dbInfo.dbPath }}</span>
    </footer>

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
  .patients-page {
    text-align: left;
    margin-top: 20px;
  }
  .columns {
    display: flex;
    gap: 20px;
    align-items: flex-start;
  }
  .patient-list {
    flex: 0 0 300px;
    input {
      width: 100%;
      padding: 6px;
      margin-bottom: 10px;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      max-height: 60vh;
      overflow-y: auto;
    }
    li {
      padding: 8px 10px;
      border-radius: 6px;
      cursor: pointer;
      &:hover {
        background-color: rgba(127, 127, 127, 0.15);
      }
      &.active {
        background-color: rgba(85, 145, 127, 0.3);
      }
    }
    .patient-name {
      font-weight: bold;
    }
    .patient-meta {
      font-size: 0.85em;
      opacity: 0.8;
    }
  }
  .visit-list {
    flex: 1;
    h3 {
      margin-top: 0;
    }
    .patient-id {
      font-size: 0.7em;
      font-weight: normal;
      opacity: 0.7;
      margin-left: 8px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th,
    td {
      padding: 6px 8px;
      border-bottom: 1px solid rgba(127, 127, 127, 0.3);
    }
    .actions {
      text-align: right;
      white-space: nowrap;
      button {
        padding: 4px 10px;
        margin-left: 6px;
      }
    }
  }
  .empty {
    opacity: 0.8;
  }
  .backup {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-top: 30px;
    .db-path {
      font-size: 0.8em;
      opacity: 0.7;
      word-break: break-all;
    }
  }
</style>
