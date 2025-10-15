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
    <input type="number" id="papTestYear" v-model="papTestYear" />
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
</template>
