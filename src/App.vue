<script>
import Form from '@/components/Form.vue';

export default {
  components: {
    Form
  },
  data(){
    return{
      showForm: false,
      patients: [
        {
          name: "Chiara",
          surname: "Beluzzi"
        },
        {
          name: "Emma",
          surname: "Watson"
        },
      ]
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
    <div class="start-choice">
      <div class="start-box new">
        <div class="top">
          <h4>Nuovo Paziente</h4>
        </div>
        <div class="main">
          <font-awesome-icon :icon="['fas', 'user-plus']" />
        </div>
        <div class="bottom">
          <button ref="openApp" class="create-new" @click="openForm">Crea nuovo</button>
        </div>

      </div>
      <div class="start-box known-patient">
        <h4>Paziente Registrato</h4>
        <label for="patient">Seleziona un paziente</label>
        <select name="patient" id="">
          <option v-for="(patient, index) in patients" :key="index" value="index">{{ patient.name }} {{ patient.surname }}</option>
        </select>
        <button ref="openApp" class="create-new" @click="openForm">Aggiungi visita</button>
        <button>Visualizza scheda paziente</button>
      </div>

    </div>

    <!-- <div class="select-patient">
      <label for="patient">Seleziona un paziente</label>
      <select name="patient" id="">
        <option v-for="(patient, index) in patients" :key="index" value="index">{{ patient.name }} {{ patient.surname }}</option>
      </select>
    </div>
    <button ref="openApp" class="create-new" @click="openForm">Crea nuovo</button> -->
  </div>
  <Form v-else/>
</template>

<style lang="scss">
  @import "@/assets/main";

  button.create-new{
    background: #55917F;
  }
  .start-choice{
    display: flex;
    justify-content: center;
    .start-box{
      display: flex;
      flex-direction: column;
      margin: 20px;
      padding: 20px;
      background-color: rgba(255,255,255,.04);
      border-radius: 8px;
      transition: all .2s;
      .main{
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      select{
        padding: 5px;
        margin: 0 10px;
      }
      svg{
        font-size: 30px;
      }
      h4{
        margin: 0 0 10px 0;
      }
      button{
        margin-top: 10px;
      }
      &:hover{
        transform: scale(1.08);
      }
    }
  }
</style>
