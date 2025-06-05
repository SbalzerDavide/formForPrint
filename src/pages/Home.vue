<script>
import Form from '@/pages/Form.vue';

export default {
  name: 'Home',
  components: {
    Form
  },
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
  button.create-new{
    background: #55917F;
  }
</style>
