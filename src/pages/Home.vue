<script>
export default {
  name: 'Home',
  data(){
    return{
      showForm: false,
    }
  },
  mounted() {
    this.$refs.openApp.focus();
  },
  methods: {
    goTo(route) {
      this.$router.push({ name: route });
    }
  },
}

</script>

<template>
  <div class="home">
    <h1>
      Form For Print 
    </h1>
    <div class="first-selection d-flex">
      <button ref="openApp" class="create-new" @click="goTo('EcografiaOstetrica')">Ecografia ostetrica</button>
      <button ref="openApp" class="create-new" @click="goTo('VisitaGinecologica')">Visita ginecologica</button>
      <button ref="openApp" class="create-new" @click="goTo('VisitaOstetrica')">Visita ostetrica</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.first-selection{
  display: flex;
  justify-content: center;
  gap: 15px;
}
  .create-new{
    background: #55917F;
  }
</style>
