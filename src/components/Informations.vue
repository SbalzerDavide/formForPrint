<script>
  import Concents11_13Weeks from '../components/consents/11-13Weeks.vue'
  import ConcentsIITrimestre from '../components/consents/IITrimestre.vue'
  import ConcentsIIITrimestre from '../components/consents/IIITrimestre.vue'
  export default {
    name: 'Informations',
    components: {
      Concents11_13Weeks,
      ConcentsIITrimestre,
      ConcentsIIITrimestre
    },
    props: {
      ecoType: {
        name: String,
        value: String
      },
      weeks: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<template>
  <section class="informativa">
    <h2>Informativa</h2>
    <div v-if="ecoType.value === '1T' && weeks >= 11 && weeks <= 13">
      <Concents11_13Weeks />
    </div>
    <div v-else-if="ecoType.value === '2T'">
      <ConcentsIITrimestre />
    </div>
    <div v-else-if="ecoType.value === '3T'">
      <ConcentsIIITrimestre />
    </div>
  </section>
</template>
