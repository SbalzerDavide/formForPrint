<script>
  import { storeModel } from '@/utils/storeModel'
  import { localDb, loadPatientIntoStore } from '@/utils/localDb'
  export default {
    name: 'Patient',
    components: {},
    data() {
      return {
        patientMore: false,
        selectedPatient: null,
        localDb: localDb,
        savedPatients: []
      }
    },
    computed: {
      name: storeModel('name', 'SET_NAME'),
      surname: storeModel('surname', 'SET_SURNAME'),
      dateOfBirth: storeModel('dateOfBirth', 'SET_DATE_OF_BIRTH'),
      age: {
        get() {
          return this.$store.state.age
        }
      },
      bmi: {
        get() {
          return this.$store.state.bmi
        }
      },
      patients: {
        get() {
          return this.$store.state.patients
        }
      },
      height: storeModel('height', 'SET_HEIGHT'),
      normalWeight: storeModel('normalWeight', 'SET_NORMAL_WEIGHT'),
      actualWeight: storeModel('actualWeight', 'SET_ACTUAL_WEIGHT'),
      patientMoreText: storeModel('patientMoreText', 'SET_PATIENT_MORE_TEXT'),
      // Paziente selezionata ('' = nuova paziente, verrà creata al salvataggio)
      savedPatientId: {
        get() {
          return this.$store.state.patientId ?? ''
        },
        set(id) {
          const patient = this.savedPatients.find((p) => p.id === id)
          loadPatientIntoStore(
            this.$store,
            patient ?? { name: '', surname: '', dateOfBirth: '', height: 0, normalWeight: 0, actualWeight: 0 }
          )
          this.$store.commit('SET_PATIENT_ID', patient ? patient.id : null)
          this.patientMore = !!this.patientMoreText
        }
      },
      // Paziente già salvata con gli stessi dati di quella nuova che si sta inserendo
      possibleDuplicate() {
        if (this.$store.state.patientId) return null
        const name = this.name.trim().toLowerCase()
        const surname = this.surname.trim().toLowerCase()
        if (!name || !surname) return null
        return (
          this.savedPatients.find(
            (p) =>
              p.name.toLowerCase() === name &&
              p.surname.toLowerCase() === surname &&
              p.dateOfBirth === this.dateOfBirth
          ) ?? null
        )
      }
    },
    async mounted() {
      if (localDb) {
        this.savedPatients = await localDb.patients.list()
      }
      this.patientMore = !!this.patientMoreText
    },
    methods: {
      formatDate(date) {
        return dayjs(date).format('DD/MM/YYYY')
      },
      changePatient() {
        const [day, month, year] = this.selectedPatient.dateOfBirth.split('-').map(Number)

        // Add padding to month and day to ensure they always have two digits
        const paddedMonth = month.toString().padStart(2, '0')
        const paddedDay = day.toString().padStart(2, '0')

        this.$store.commit('SET_NAME', this.selectedPatient.Name)
        this.$store.commit('SET_SURNAME', this.selectedPatient.Surname)
        this.$store.commit('SET_DATE_OF_BIRTH', `${year}-${paddedMonth}-${paddedDay}`)
        this.$store.commit('SET_HEIGHT', parseInt(this.selectedPatient.Height))
        this.$store.commit('SET_NORMAL_WEIGHT', parseInt(this.selectedPatient.Weight))
        if (this.selectedPatient.MoreInfo) {
          this.patientMore = true
          this.$store.commit('SET_PATIENT_MORE_TEXT', this.selectedPatient.MoreInfo)
        }
      }
    }
  }
</script>

<template>
  <section class="patient">
    <div class="title">Dati Paziente</div>
    <!-- <div class="d-flex align-center">
      <div class="patients-label">Seleziona un paziente registrato</div>
      <select v-model="selectedPatient" @change="changePatient()">
        <option v-for="patient in patients" :key="patient.id" :value="patient">
          {{ patient.Name }} {{ patient.Surname }}
        </option>
      </select>
    </div> -->

    <div v-if="localDb" class="saved-patient d-flex align-center">
      <label class="patients-label" for="savedPatient">Paziente registrata</label>
      <select v-model="savedPatientId" id="savedPatient">
        <option value="">-- Nuova paziente --</option>
        <option v-for="patient in savedPatients" :key="patient.id" :value="patient.id">
          {{ patient.surname }} {{ patient.name }}
          <template v-if="patient.dateOfBirth">({{ formatDate(patient.dateOfBirth) }})</template>
          · ID {{ patient.id }}
        </option>
      </select>
    </div>
    <p v-if="possibleDuplicate" class="duplicate-warning">
      Esiste già una paziente con questi dati (ID {{ possibleDuplicate.id }}). Se è lei, selezionala
      da "Paziente registrata", altrimenti al salvataggio verrà creata una nuova paziente.
    </p>

    <div class="section-content">
      <div class="left">
        <div class="name">
          <label for="name">Nome</label>
          <input v-model="name" id="name" type="text" placeholder="Nome" />
        </div>
        <div class="surname">
          <label for="surname">Cognome</label>
          <input v-model="surname" id="surname" type="text" placeholder="Cognome" />
        </div>
        <div class="birth-date">
          <label for="birthDate">Data di nascita</label>
          <input v-model="dateOfBirth" id="birthDate" type="date" placeholder="Data di nascita" />
        </div>
        <div class="age">
          <label for="age">Età</label>
          <input v-model="age" id="age" type="number" placeholder="Età" />
        </div>
      </div>
      <div class="right">
        <div class="height">
          <label for="height">Altezza</label>
          <input
            @change="calcBMI"
            v-model="height"
            id="height"
            type="number"
            placeholder="Altezza"
          />
        </div>
        <div class="normal-weight">
          <label for="normalWeight">Peso Normale</label>
          <input
            v-model="normalWeight"
            id="normalWeight"
            type="number"
            placeholder="Peso Normale"
          />
        </div>
        <div class="actual-weight">
          <label for="actualWeight">Peso Attuale</label>
          <input
            @change="calcBMI"
            v-model="actualWeight"
            id="actualWeight"
            type="number"
            placeholder="Peso Attuale"
          />
        </div>
        <div class="bmi">
          <label for="bmi">BMI</label>
          <input v-model="bmi" id="bmi" type="number" placeholder="BMI" />
        </div>
      </div>
    </div>
    <div class="more-info">
      <div v-if="!patientMore" class="add-more" @click="patientMore = true">+</div>
      <textarea
        v-else
        v-model="patientMoreText"
        placeholder="Aggiungi ulteriori informazioni"
        rows="4"
      ></textarea>
    </div>
  </section>
</template>

<style>
  .patients-label {
    margin-right: 10px;
    font-weight: bold;
  }
  .saved-patient {
    margin-bottom: 10px;
  }
  .duplicate-warning {
    margin: 0 0 10px;
    padding: 6px 10px;
    border-radius: 6px;
    background-color: #fff3cd;
    color: #856404;
  }
</style>
