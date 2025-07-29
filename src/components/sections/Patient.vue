<script>
  import { storeModel } from '@/utils/storeModel'
  export default {
    name: 'Patient',
    components: {},
    data() {
      return {
        patientMore: false,
        selectedPatient: null
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
      patientMoreText: storeModel('patientMoreText', 'SET_PATIENT_MORE_TEXT')
    },
    mounted() {},
    methods: {
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
</style>
