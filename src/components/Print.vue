<script>

export default {
  name: 'Print',
  components: {
  },
  props: {
    patient: {
      type: String,
      default: "Pico della Mirandola"
    },
    dateOfBirth: {
      type: String,
      default: "24.02.1463"
    },
    age: {
      type: Number,
      default: 0
    },
    normalWeight: {
      type: Number,
      default: 0
    },
    actualWeight: {
      type: Number,
      default: 0
    },
    bmi: {
      type: Number,
      default: 0
    }
  },
  data(){
    return{
      date: "",
    }
  },
  created(){
    let date = new Date();
    this.date = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`;

  },
  methods:{
  }
}
</script>

<template>
  <div class="print">
    <div class="header">
      <h2>Azienda Socio Sanitaria del Garda</h2>
      <h3>Presidio ospedaliero di Chiara Beluzzi</h3>
      <h4>Unità operativa per smaltimento feti vivi</h4>
      <div class="date">Data: {{ date }}</div>
    </div>

    <main>
      <section class="patient">
        Paziente: {{ patient }}, data di nascita: {{ dateOfBirth }}
      </section>
      <section class="medical-history">
        <div class="title-par">Anamnesi</div>
        Età materna: {{ age }} anni, Altezza {{ height }}cm, Peso normale {{ normalWeight }}kg, Peso attuale {{ actualWeight }}kg, (BMI {{ bmi }})
      </section>
      <section class="pregnancy-date">
        <div class="title-par">Data ultime mestruazioni:</div>
        <div class="title-par">Data prevista per il parto da U.M.:</div>
        <div class="title-par">Epoca gestazionale:</div>
      </section>
      <section class="biometria-fetale">
        <div class="title-par">
          Biometria Fetale 
          <span>(Rappresentazione del 5°-95° percentile)</span>
        </div>
      </section>

    </main>
  </div>
</template>


<style lang="scss" scoped>
  .print{
    width: 210mm;
    min-height: calc(100vh - 40px);
    margin: 0 auto;
    padding: 15px 30px;
    background-color: #fff;
    color: #1a1a1a;
    h1{
      margin: 10px 0;
    }
    h2, h3, h4{
      margin: 8px 0;
    }
    .title-par{
      display: flex;
      align-items: center;
      font-weight: bold;
      height: 20px;
      span{
        margin-left: 5px;
        font-weight: normal;
      }
    }
    .date{
      text-align: right;
    }
    main{
      display: flex;
      flex-direction: column;
      text-align: left;
      section{
        margin: 18px 0;
      }
      .medical-history{
        h4{
          margin-bottom: 5px;
        }
      }
    }
  }
  @page {
    size: A4;
    margin: 0;
  }

  @media print {
  html, body {
      width: 210mm;
      height: 297mm;        
  }
  .print{
      margin: 0;
      border: initial;
      border-radius: initial;
      width: initial;
      min-height: initial;
      box-shadow: initial;
      background: initial;
      page-break-after: always;
  }
  .hide-print{
    display: none;
  }
}

</style>
