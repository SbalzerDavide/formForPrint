<script>
import Form from './components/Form.vue';

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
      App per chiarella 
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
