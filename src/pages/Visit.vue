<script>
  export default {
    name: 'Visit',
    data() {
      return {}
    },
    mounted() {
      // USO
      this.fetchAndParseCSV('/patients.csv')
        .then((patients) => {
          this.$store.commit('SET_PATIENTS', patients)
        })
        .catch((error) => console.error('Errore nel parsing CSV:', error))
    },
    methods: {
      async fetchAndParseCSV(url) {
        const response = await fetch(url)
        const csvText = await response.text()

        // Rimuove righe vuote e spazi finali
        const lines = csvText.trim().split('\n')

        // Estrae l'intestazione e le colonne
        const headers = lines[0].split(';').filter((h) => h !== '')

        // Mappa ogni riga in un oggetto
        const data = lines.slice(1).map((line) => {
          const values = line.split(';')
          const obj = {}

          headers.forEach((header, index) => {
            obj[header] = values[index]
          })

          return obj
        })

        return data
      }
    }
  }
</script>

<template>
  <div class="visit">
    <!-- <h1>Visit template</h1> -->
  </div>
  <router-view></router-view>
</template>

<style lang="scss" scoped></style>
