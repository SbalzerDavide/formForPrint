<script>
  import { papTestResults } from '@/const/visits'

  export default {
    name: 'PapTest',
    data() {
      return {
        papTestResults: papTestResults
      }
    },

    props: {
      visitStore: {
        type: String,
        required: true,
        default: 'visitaGinecologicaPrintData'
      }
    },

    created() {
      this.loadDataFromStore()
    },

    computed: {
      papTestYear: {
        get() {
          return this.$store.state[this.visitStore].papTestYear
        },
        set(value) {
          this.$store.commit('SET_PAPTEST_YEAR', { papTestYear: value, visit: this.visitStore })
        }
      },
      papTestResult: {
        get() {
          return this.$store.state[this.visitStore].papTestResult
        },
        set(value) {
          console.log(value)

          this.$store.commit('SET_PAPTEST_RESULT', { papTestResult: value, visit: this.visitStore })
        }
      },
      hpv: {
        get() {
          return this.$store.state[this.visitStore].hpv
        },
        set(value) {
          this.$store.commit('SET_HPV', { hpv: value, visit: this.visitStore })
        }
      },
      hpvDate: {
        get() {
          return this.$store.state[this.visitStore].hpvDate
        },
        set(value) {
          this.$store.commit('SET_HPV_DATE', { hpvDate: value, visit: this.visitStore })
        }
      }
    },
    methods: {
      loadDataFromStore() {
        const storeData = this.$store.state[this.visitStore]
        if (storeData) {
          if (storeData.papTestYear) {
            this.papTestYear = storeData.papTestYear
          }
          if (storeData.papTestResult) {
            this.papTestResult = storeData.papTestResult
          }
        }
      },

      setPapTestResult(value) {
        this.papTestResult = value
      }
    }
  }
</script>

<template>
  <div class="d-flex align-items-start gap-4">
    <div class="w-48">Pap test</div>
    <input type="number" placeholder="Anno Pap test" id="papTestYear" v-model="papTestYear" />
    <select @change="setPapTestResult($event.target.value)">
      <option disabled selected value>-- select an option --</option>
      <option v-for="result in papTestResults" :key="result.value" :value="result.value">
        {{ result.label }}
      </option>
    </select>
  </div>
  <div class="d-flex align-items-start gap-4">
    <div class="w-48"></div>
    <textarea
      class="flex-grow"
      placeholder="Risultato Pap test"
      name="papTestResult"
      id="papTestResult"
      v-model="papTestResult"
    ></textarea>
  </div>
  <div class="d-flex align-items-start gap-4">
    <div class="w-48">HPV test</div>
    <div class="d-flex align-items-center gap-1">
      <input type="date" class="hpv-input" name="hpvDate" id="hpvDate" v-model="hpvDate" />
      <div class="d-flex gap-2 align-items-center">
        <input
          class="custom-input w-4"
          type="radio"
          id="hpvPos"
          name="hpv"
          value="true"
          v-model="hpv"
        />
        <label for="TromboPos">Positivo</label>
      </div>
      <div class="d-flex gap-2 align-items-center">
        <input
          class="custom-input w-4"
          type="radio"
          id="hpvNeg"
          name="hpv"
          value="false"
          v-model="hpv"
        />
        <label for="hpv">Negativo</label>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .hpv-input {
    margin-bottom: 0px !important;
  }
</style>
