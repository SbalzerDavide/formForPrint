<script>
  import EcografiaOstetricaPrint from '@/components/printTemplates/Ecografia-ostetrica-print.vue'
  import VisitaGinecologiaPrint from '@/components/printTemplates/Visita-ginecologia-print.vue'

  export default {
    name: 'Print',
    components: {
      EcografiaOstetricaPrint,
      VisitaGinecologiaPrint
    },
    data() {
      return {}
    },
    computed: {
      printType() {
        return this.$store.state.printType
      }
    },
    created() {
      let app = document.getElementById('app')
      app.classList.add('appOnPrint')

      // scrolla a top
      window.scrollTo(0, 0)
    },
    methods: {
      print() {
        window.print()
      },
      comeBack() {
        this.$router.back()
      }
    }
  }
</script>

<template>
  <div class="print">
    <button class="confirm hide-print" @click="print">Conferma</button>
    <button class="come-back-to-form hide-print" @click="comeBack">Modifica dati</button>
    <EcografiaOstetricaPrint v-if="printType === 'ecografia-ostetrica'" />
    <VisitaGinecologiaPrint v-if="printType === 'visita-ginecologica'" />
  </div>
</template>

<style lang="scss" scoped>
  @use '../assets/print';
</style>
