<script>

export default {
  name: 'Print',
  components: {
  },
  props: {
    office: {
      type: String,
      default: ""
    },
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
    height: {
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
    pregnancy: Object,
    ecoType: {
      type: String,
      defalut: ""
    },
    ecoTool:{
      type: String,
      default: ""
    },
    ecoMethod:{
      type: String,
      default: ""
    },
    // ecoNumber: {
    //   type: String,
    //   defalut: ""
    // },
    fetusNumber: {
      type: Number,
      defalut: 1
    },
    decimalWeeks: Number,
    biometriaFetale:{
      type: Array,
      default: []
    },
    anatomy:{
      type: Array,
      default: []
    },
    doppler:{
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
    direction:{
      type: String,
      default: "cefalica"
    },
    placenta:{
      type: String,
      defalut: ""
    },
    patientMore:{
      type: String,
      defalut: ""
    }, 
    pregnancyMore:{
      type: String,
      defalut: ""
    }, 
    ecoMore:{
      type: String,
      defalut: ""
    },
    biometriaMore:{
      type: String,
      defalut: ""
    },
    lastMore:{
      type: String,
      defalut: ""
    },
    conclusion:{
      type: String,
      defalut: ""
    },
  },
  data(){
    return{
      date: "",
      xPosition: 0,
    }
  },
  created(){
    let date = new Date();
    this.date = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`;
    this.xPosition = 60.5 + ((this.decimalWeeks - 15) * 286.5 / 25)
    this.calcYPosHc();
    // scrolla a top
    window.scrollTo(0, 0);
  },
  methods:{
    pointPercentile(value){
      return `left: ${value}px`;
    },
    calcYPosHc(){
      let hc = this.biometriaFetale.filter(el=>{
        el.name === "Circonferenza cranica (CC)"
      })
      // console.log(hc);
      // let pos = 50 + ()
    },
    print(){
      window.print();
    }
  }
}
</script>

<template>
  <div class="print">
    <button 
      class="confirm hide-print"
      @click="print"
    >
      Conferma
    </button>
    <header>
      <div class="img">
        <img class="img-dese" v-if="office === 'Desenzano'" src="/headerDese.jpg">
        <img class="img-pralboino" v-else-if="office === 'Pralboino'" src="/headerPralboino.jpg">
      </div>
      <!-- <h2>Ambulartorio di {{ office }}</h2> -->
      <!-- <h3>Presidio ospedaliero di Chiara Beluzzi</h3>
      <h4>Unità operativa per smaltimento feti vivi</h4> -->
      <div class="date">Data: {{ date }}</div>
    </header>

    <main>
      <section class="patient">
        Paziente: {{ patient }}, data di nascita: {{ dateOfBirth }}
        <p v-if="patientMore!==''">{{ patientMore }}</p>
      </section>
      <section class="medical-history">
        <div class="title-par">Anamnesi</div>
        Età materna: {{ age }} anni, Altezza {{ height }}cm, Peso normale {{ normalWeight }}kg, Peso attuale {{ actualWeight }}kg, (BMI {{ bmi }})
      </section>
      <section class="pregnancy-date">
        <div v-show="pregnancy?.start" class="title-par">Data ultime mestruazioni: {{ pregnancy?.start?.replaceAll('-', '/') }}</div>
        <div class="title-par">Data prevista per il parto da U.M.: {{ pregnancy?.end }}</div>
        <div class="title-par">Epoca gestazionale: {{ pregnancy?.epocaGestazionale }}</div>
        <p v-if="pregnancyMore!==''">{{ pregnancyMore }}</p>
      </section>
      <section class="eco">
        <div class="title-par">{{ ecoType }}</div>
        <div>
          <span v-if="ecoMethod" class="eco-method">Metodo ecografico: {{ ecoMethod }}, </span>
          <span v-if="ecoTool" class="tool">Strumento utilizzato: {{ ecoTool }}</span>
        </div>
        <div v-if="fetusNumber === 1">Gravidanza singola</div>
        <div v-else>Gravidanza gemellare ({{ fetusNumber }} feti)</div>
        <!-- Gravidanza {{ ecoNumber }}  -->
        <p v-if="ecoMore!==''">{{ ecoMore }}</p>
      </section>
      <section class="anatomy">
        <div class="title-par">Anatomia</div>
        <div class="anatomy-container">
          <div 
            class="anatomy-box"
            v-for="(element, index) in anatomy"
            :key="index"
          >
            <div class="anatomy-el"  v-if="element.checked || element.comment">
              {{ element.name }}
              <span v-if="element.comment">{{ element.comment }},</span>
              <span v-else-if="element.checked">normale,</span>
            </div>

          </div>

        </div>
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
          <div v-if="item.percentile" class="biometria-box">
            <div class="name">
              {{ item.text }}
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
          </div>
        <!-- </div> -->
        <p v-if="biometriaMore!==''">{{ biometriaMore }}</p>

      </section>
      <section class="biometria-fetale">
        <div class="title-par">
          Doppler 
        </div>
          <div 
            class="doppler-item"
            v-for="(item, index) in doppler"
            :key="index"
          >
            <div v-if="item.percentile" class="doppler-box">
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
          </div>
        <!-- </div> -->
        <p v-if="dopplerMore!==''">{{ dopplerMore }}</p>

      </section>
      <section class="more">
        <span v-if="heart">Attività cardiaca presente, </span>
        <span>Presentazione: {{ direction }}, </span>
        <span>Liquido amniotico: {{ liquid }}, </span>
        <span v-if="placenta">Placenta: {{ placenta }}, </span>
        <p v-if="lastMore!==''">{{ lastMore }}</p>
      </section>
      <section class="conclusion">
        <div class="title-par">
          Conclusioni 
        </div>
        <p>{{ conclusion }}</p>
      </section>
      <!-- <section class="charts">
        <div class="bpd">
          <div class="title">
            Diametro Biparietale
          </div>
          <div class="y-axis">mm</div>
          <img src="../../public/Biparietal diameter.png" alt="">
          <div class="x-axis">settimane</div>
          <div 
            class="my-val"
            :style="`left:${xPosition}px`"
          ></div>
        </div>
        <div class="hc">
          <div class="title">
            Circonferenza Cefalica
          </div>
          <div class="y-axis">mm</div>
          <img src="../../public/Head circunference.png" alt="">
          <div class="x-axis">settimane</div>
          <div 
            class="my-val"
            :style="`left:${xPosition}px`"
          ></div>
        </div>

      </section> -->

    </main>
    <footer>
      <img class="footer-pralboino" v-if="office === 'Pralboino'" src="/footerPralboino.jpg">
    </footer>
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
    position: relative;
    .confirm{
      position: absolute;
      right: -150px;
      top: 30px;
    }
    h1{
      margin: 10px 0;
    }
    h2, h3, h4{
      margin: 8px 0;
    }
    header{
      .img{
        display: flex;
      }
      .img-dese{
        height: 250px;
      }
      .img-pralboino{
        height: 90px;
      }
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
      .charts{
        display: flex;
        &>div{
          flex-basis: 200px;
          flex-grow: 1;
          position: relative;
          img{
            margin-left: 5%;
            width: 95%;
          }
        }
        .title{
          text-align: center;
        }
        .y-axis{
          position: absolute;
          transform: rotate(-90deg);
          top: 40%;

        }
        .x-axis{
          text-align: center;
        }
        .my-val{
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: red;
          bottom: 50px;
        }
      }
      .medical-history{
        h4{
          margin-bottom: 5px;
        }
      }
      .anatomy{
        .anatomy-container{
          display: flex;
          flex-wrap: wrap;
          .anatomy-el{
            margin-right: 5px;
          }
        }
      }
      .biometria-box, .doppler-box{
        display: flex;
        width: 100%;
        .name{
          width: 35%;
        }
        .value{
          width: 70px;
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
    footer{
      .footer-pralboino{
        width: 90%;
      }
      // display: none;
    }
  }
  @page {
    size: A4;
    margin: 0;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  @media print {
  html, body {
      width: 210mm;
      height: 297mm;        
  }
  .print{
      margin: 0;
      padding-top: 0;
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
  footer{
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
      .footer-pralboino{
        width: 90%;
      }
    }
}

</style>
