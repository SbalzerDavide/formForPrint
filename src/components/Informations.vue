<script>
export default {
  name: 'Informations',
  props: {
    ecoType: {
      name: String,
      value: String
    },
  },
}
</script>

<template>
  <section class="informativa">
    <div v-if="ecoType.value === '1T'"></div>
    <div v-else-if="ecoType.value === '2T'"></div>
    <div v-else-if="ecoType.value === '3T'"></div>
  </section>
</template>
