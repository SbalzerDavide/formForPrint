<script>
import Form from '@/pages/Form.vue';

export default {
  components: {
    Form
  },
  data(){
    return{
      showForm: false,
    }
  },
  mounted(){
    let theme = localStorage.getItem("theme");
    if(theme === "dark"){
      document.body.classList.add("theme-dark");
    } else if(theme === "light"){
      document.body.classList.add("theme-light");
    } else{
      document.body.classList.add("theme-dark");
    }
    // leggo se è impostato sul sistema un tema chiaro o scuro
    if(window.matchMedia("(prefers-color-scheme: dark)")?.matches){
      // sistema con tema dark 
      document.body.classList.add("system-dark");
    } else if(window.matchMedia("(prefers-color-scheme: light)")?.matches){
      // sistema con tema light 
      document.body.classList.add("system-light");
    }
    this.$refs.openApp.focus();
  },
  methods:{
    openForm(){
      this.showForm = true;
    }
  }
}

</script>

<template>
  <div v-if="!showForm" class="home">
    <h1>
      Form For Print 
    </h1>
    <div class="first-selection d-flex">
      <button ref="openApp" class="create-new" @click="openForm">Ecografia ostetrica</button>
      <button ref="openApp" class="create-new" @click="openForm">Visita ginecologica</button>
      <button ref="openApp" class="create-new" @click="openForm">Visita ostetrica</button>

    </div>
  </div>
  <Form v-else/>
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
