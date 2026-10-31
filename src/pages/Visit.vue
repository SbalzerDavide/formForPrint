<script>
  import Header from '@/components/sections/Header.vue'
  import { localDb, VisitTypes, visitTypeByRoute } from '@/utils/localDb'
  export default {
    name: 'Visit',
    components: {
      Header
    },
    data() {
      return {}
    },
    computed: {
      // Home › [Pazienti › Paziente ›] Visita › Anteprima di stampa
      breadcrumbs() {
        const state = this.$store.state
        const isPrint = this.$route.name === 'Print'
        const visitType = VisitTypes[isPrint ? state.printType : visitTypeByRoute(this.$route.name)]
        if (!visitType) return null

        const crumbs = []
        if (localDb && state.patientId) {
          crumbs.push(
            { label: 'Pazienti', to: { name: 'Pazienti' } },
            {
              label: `${state.surname} ${state.name}`.trim() || `Paziente ${state.patientId}`,
              to: { name: 'Paziente', params: { patientId: state.patientId } }
            }
          )
        }

        const visitLabel = state.currentVisit
          ? `${visitType.label} del ${dayjs(state.currentVisit.createdAt).format('DD/MM/YYYY')}`
          : `${visitType.label} (nuova)`
        if (isPrint) {
          crumbs.push({ label: visitLabel, to: { name: visitType.route } }, { label: 'Anteprima di stampa' })
        } else {
          crumbs.push({ label: visitLabel })
        }
        return crumbs
      }
    }
  }
</script>

<template>
  <Header :breadcrumbs="breadcrumbs"></Header>
  <router-view></router-view>
</template>

<style lang="scss" scoped></style>
