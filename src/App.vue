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
  created(){
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
    <button @click="openForm">Crea nuovo</button>
  </div>
  <Form v-else/>
</template>

<style lang="scss" scoped>
</style>
