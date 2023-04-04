<script>
import Form from '@/components/Form.vue';

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
    <button ref="openApp" class="create-new" @click="openForm">Crea nuovo</button>
  </div>
  <Form v-else/>
</template>

<style lang="scss" scoped>
  button.create-new{
    background: #55917F;
  }
</style>
