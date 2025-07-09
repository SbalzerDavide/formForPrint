<script>
  import { storeModel } from '@/utils/storeModel'
  export default {
    name: 'Patient',
    components: {},
    data() {
      return {
        patientMore: false
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
      height: storeModel('height', 'SET_HEIGHT'),
      normalWeight: storeModel('normalWeight', 'SET_NORMAL_WEIGHT'),
      actualWeight: storeModel('actualWeight', 'SET_ACTUAL_WEIGHT'),
      patientMoreText: storeModel('patientMoreText', 'SET_PATIENT_MORE_TEXT')
    },
    mounted() {},
    methods: {}
  }
</script>

<template>
  <section class="patient">
    <div class="title">Dati Paziente</div>
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
          <input
            @change="changeBirth"
            v-model="dateOfBirth"
            id="birthDate"
            type="date"
            placeholder="Data di nascita"
          />
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
