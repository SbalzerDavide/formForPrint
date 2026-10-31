<script>
  import EcografiaOstetricaPrint from '@/components/printTemplates/Ecografia-ostetrica-print.vue'
  import VisitaGinecologiaPrint from '@/components/printTemplates/Visita-ginecologia-print.vue'
  import VisitaOstetricaPrint from '@/components/printTemplates/Visita-ostetrica-print.vue'
  import PopupMessage from '@/components/PopupMessage.vue'
  import { localDb, saveCurrentVisit, errorMessage, VisitTypes } from '@/utils/localDb'

  export default {
    name: 'Print',
    components: {
      EcografiaOstetricaPrint,
      VisitaGinecologiaPrint,
      VisitaOstetricaPrint,
      PopupMessage
    },
    data() {
      return {
        localDb: localDb,
        saving: false,
        triggerPopup: false,
        popupMessage: '',
        popupType: 'success'
      }
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
      showPopup(message, type) {
        this.popupMessage = message
        this.popupType = type
        this.triggerPopup = true
      },
      // Salva la visita nel database locale; restituisce false se non è stato possibile
      async save() {
        if (!localDb || this.saving) return false
        this.saving = true
        try {
          await saveCurrentVisit(this.$store)
          this.showPopup('Visita salvata', 'success')
          return true
        } catch (error) {
          this.showPopup(`Visita non salvata: ${errorMessage(error)}`, 'error')
          return false
        } finally {
          this.saving = false
        }
      },
      async print() {
        await this.save()
        window.print()
      },
      comeBack() {
        // Torna al modulo della visita (anche quando si arriva dalla pagina Pazienti)
        const visitType = VisitTypes[this.printType]
        if (visitType) {
          this.$router.push({ name: visitType.route })
        } else {
          this.$router.back()
        }
      }
    }
  }
</script>

<template>
  <div class="print">
    <button class="confirm hide-print" @click="print" :disabled="saving">Conferma</button>
    <button class="come-back-to-form hide-print" @click="comeBack">Modifica dati</button>
    <button v-if="localDb" class="save-visit hide-print" @click="save" :disabled="saving">
      Salva
    </button>
    <EcografiaOstetricaPrint v-if="printType === 'ecografia-ostetrica'" />
    <VisitaGinecologiaPrint v-if="printType === 'visita-ginecologica'" />
    <VisitaOstetricaPrint v-if="printType === 'visita-ostetrica'" />
    <PopupMessage
      class="hide-print"
      :content="popupMessage"
      position="bottom"
      :type="popupType"
      :show="triggerPopup"
      @showBack="triggerPopup = false"
    />
  </div>
</template>

<style lang="scss" scoped>
  @use '../assets/print';
</style>
