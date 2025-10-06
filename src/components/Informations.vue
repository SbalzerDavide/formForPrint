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
    <h3>Informativa</h3>
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

<style>
  .informativa p,
  .informativa li {
    font-size: 14px;
    line-height: 1.6;
  }
  .informativa h3 {
    margin: 14px 0;
  }
  .informativa h4 {
    margin: 10px 0;
  }
</style>
