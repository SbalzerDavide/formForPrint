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
    },
    biometriaFetale:{
      type: Array,
      default: []
    },
    heart:{
      type: Boolean,
      defalut: true
    },
    liquid:{
      type: String,
      default: "normale"
    },
    placenta:{
      type: String,
      defalut: ""
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
    pointPercentile(value){
      return `left: ${value}px`;
    }
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
        <!-- <div class="biometria-items"> -->
          <div 
            class="biometria-item"
            v-for="(item, index) in biometriaFetale"
            :key="index"
          >
            <div class="name">
              {{ item.name }}
            </div>
            <div class="value">
              {{ item.value }}
            </div>
            <div class="unit">
              {{ item.unit }}
            </div>
            <div class="chart-percentile">
              <div class="line"></div>
              <div class="base">
                <div class="middle"></div>
                <div 
                  class="point"
                  :style="pointPercentile(item.percentile)"
                ></div>
              </div>
              <div class="line"></div>
            </div>
            <div class="percentile">
              {{ item.percentile }}°p
            </div>
          </div>
        <!-- </div> -->
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
      .biometria-item{
        display: flex;
        width: 100%;
        .name{
          width: 35%;
        }
        .value{
          width: 30px;
        }
        .unit{
          width: 8%;
        }
        .chart-percentile{
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20%;
          margin-right: 10px;
          .base{
            position: relative;
            width: 100px;
            height: 1.5px;
            background: #1a1a1a;
            .middle{
              position: absolute;
              left: 50px;
              top: -4px;
              width: 1.5px;
              height: 9px;
              background: #1a1a1a;
            }
            .point{
              position: absolute;
              top: -3px;
              width: 7px;
              height: 7px;
              transform: rotate(-45deg);
              background: #1a1a1a;
            }
          }
          .line{
            height: 12px;
            width: 1.5px;
            background: #1a1a1a;
          }
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
