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
      policyType: {
        type: String,
        default: null
      }
    }
  }
</script>

<template>
  <section class="informativa">
    <h2>Informativa</h2>
    <div v-if="policyType == '1'">
      <Concents11_13Weeks />
    </div>
    <div v-else-if="policyType == '2'">
      <ConcentsIITrimestre />
    </div>
    <div v-else-if="policyType == '3'">
      <ConcentsIIITrimestre />
    </div>
  </section>
</template>
