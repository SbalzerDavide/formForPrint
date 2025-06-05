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
  }
}

</script>

<template>
  <div class="home">
    <h1>
      Form For Print 
    </h1>
    <div class="first-selection d-flex">
      <router-link class="create-new" to="/visita-ginecologica">Go to Foo</router-link>
      <button ref="openApp" class="create-new" @click="openForm">Ecografia ostetrica</button>
      <button ref="openApp" class="create-new" @click="openForm">Visita ginecologica</button>
      <button ref="openApp" class="create-new" @click="openForm">Visita ostetrica</button>
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
