<script>
import Print from './Print.vue';


export default {
  name: 'Form',
  components: {
    Print
  },
  data(){
    return{
      showPrint: false,
      name: "",
      surname: "",
      dateOfBirth: "",
      age:"",
      height: 0,
      normalWeight: 0,
      actualWeight: 0,
      bmi: 0,
      ecoType: "accrescimento",
      ecoNumber: "singola",
      biometriaFetale: [
      {
          name: "Diametro biparietale (DBP)",
          value: "",
          unit: "mm",
          percentile: 0
        },
        {
          name: "Circonferenza cranica (CC)",
          value: "",
          unit: "mm",
          percentile: 0
        },
        {
          name: "Cisterna magna (CM)",
          value: "",
          unit: "mm",
          percentile: 0
        },
        {
          name: "Cervelletto tr (TCD)",
          value: "",
          unit: "mm",
          percentile: 0
        },
        {
          name: "Circonferenza addominale (CA)",
          value: "",
          unit: "mm",
          percentile: 0
        },
        {
          name: "Lungh, Femore (LF)",
          value: "",
          unit: "mm",
          percentile: 0
        },
        {
          name: "Circ. cranica/ cird. addominale",
          calc: true,
          value: "",
          unit: "",
          percentile: 0
        },
        {
          name: "Stima del peso fetale (Hadlock)",
          calc: true,
          value: "",
          unit: "g",
          percentile: 0
        },
      ],
      heart: true,
      liquid: "normale",
      direction: "cefalica",
      placenta: "",
      activeDateSelection: "start",
      pregnancy: {},
      startDate: "",
      endDate: "",
      epocaGestazionale: "",
      decimalWeeks: 0,
      patientMore: false,
      pregnancyMore: false,
      ecoMore: false,
      biometriaMore: false,
      lastMore: false,
      patientMoreText: "",
      pregnancyMoreText: "",
      ecoMoreText: "",
      biometriaMoreText: "",
      lastMoreText: "",

    }
  },
  created(){
  },
  watch: {
  },
  methods:{
    changeBirth(){
      let today = dayjs();
      let dateOfBirth = dayjs(this.dateOfBirth);
      let b = dayjs();
      this.age = today.diff(dateOfBirth, "year");
    },
    calcBMI(){
      let meterHeight = this.height/100;
      this.bmi = parseFloat(this.actualWeight / (meterHeight * meterHeight)).toFixed(2)
    },  
    calcPercentile(index){
      let femore = false;
      let circonferenzaC = false;
      let circonferenzaCValue;
      let circonferenzaA = false;
      let circonferenzaAValue;
      this.biometriaFetale.forEach((el)=>{
        if(el.name === "Lungh, Femore (LF)" && el.value){
          femore = true;
        } else if(el.name === "Circonferenza cranica (CC)" && el.value){
          circonferenzaC = true;
          circonferenzaCValue = el.value;
        } else if(el.name === "Circonferenza addominale (CA)" && el.value){
          circonferenzaA = true;
          circonferenzaAValue = el.value;
        }
      })
      if(circonferenzaC && circonferenzaA){
        this.biometriaFetale.forEach(el=>{
          if(el.name === "Circ. cranica/ cird. addominale"){
            el.value = circonferenzaCValue / circonferenzaAValue;
            // calcolo percentile
            el.percentile = 30
          }
        })
      }

      if(femore && circonferenzaC && circonferenzaA){
        console.log("posso calcolare Hadlock");
        this.Hadlock();
      } else{
        console.log("non posso calcolare Hadlock");
      }
      this.biometriaFetale[index].percentile = 20;
    }, 
    calcPregnancyDate(){
      if(this.activeDateSelection === "start"){
        // ho settato l'ultima mestruazione
        this.endDate = dayjs(this.startDate).add(280, 'day').format('DD/MM/YYYY');
        this.pregnancy.start = this.startDate;
        this.pregnancy.end = this.endDate;
      } else if(this.activeDateSelection === "end"){
        // ho settato data presunta parto
        this.startDate = dayjs(this.startDate).subtract(280, 'day').format('DD/MM/YYYY');
        this.pregnancy.end = this.endDate;
        this.endDate = dayjs(this.endDate).format('DD/MM/YYYY');
      }
      let today = dayjs();
      let dayDiff = (today.diff(this.startDate, 'day')) % 7;
      let weekDiff = today.diff(this.startDate, 'week');
      this.decimalWeeks = weekDiff + (10 * dayDiff / 7);
      this.epocaGestazionale = `${weekDiff} settiname + ${dayDiff} gg`
      this.pregnancy.epocaGestazionale = this.epocaGestazionale;
    },
    Hadlock(){
      let hc = this.biometriaFetale[1].value * 0.1;
      let ac = this.biometriaFetale[4].value * 0.1;
      let fl = this.biometriaFetale[5].value * 0.1;
      let esponente = 1.326 + (0.0107 * hc) + (0.0438 * ac) + (0.158 * fl) - (0.00326 * ac * fl);
      let efw = 10 ** (esponente);
      this.biometriaFetale[this.biometriaFetale.length -1].value = efw.toFixed(2);
      console.log(efw);
      // calcolo percentile stima peso
      let ga = this.decimalWeeks;
      let eX = getExpectedMeans(ga);
      let cv = getCV(ga);
      let sk = getSkewness(ga);
      let lnEfw = Math.log(efw)
      let zScore = getZScore(sk, cv, lnEfw, eX)
      console.log(zScore);
      const normDist = new NormalDistribution(0, 1);
      let percentile = normDist.cdf(zScore) * 100;
      this.biometriaFetale[this.biometriaFetale.length -1].percentile = percentile.toFixed(1);
    },
    print(){
      this.showPrint = true;
    }
  }
}
</script>

<template>
  <div v-if="!showPrint" class="form">
    <section class="patient">
      <div class="title">Dati Paziente</div>
      <div class="section-content">
        <div class="left">
          <div class="name">
            <label for="name">Nome</label>
            <input v-model="name" id="name" type="text" placeholder="Nome">
          </div>
          <div class="surname">
            <label for="surname">Cognome</label>
            <input v-model="surname" id="surname" type="text" placeholder="Cognome">
          </div>
          <div class="birth-date">
            <label for="birthDate">Data di nascita</label>
            <input @change="changeBirth" v-model="dateOfBirth" id="birthDate" type="date" placeholder="Data di nascita">
          </div>
          <div class="age">
            <label for="age">Età</label>
            <input v-model="age" id="age" type="number" placeholder="Età">
          </div>
        </div>
        <div class="right">
          <div class="height">
            <label for="height">Altezza</label>
            <input @change="calcBMI" v-model="height" id="height" type="number" placeholder="Altezza">
          </div>
          <div class="normal-weight">
            <label for="normalWeight">Peso Normale</label>
            <input v-model="normalWeight" id="normalWeight" type="number" placeholder="Peso Normale">
          </div>
          <div class="actual-weight">
            <label for="actualWeight">Peso Attuale</label>
            <input @change="calcBMI" v-model="actualWeight" id="actualWeight" type="number" placeholder="Peso Attuale">
          </div>
          <div class="bmi">
            <label for="bmi">BMI</label>
            <input v-model="bmi" id="bmi" type="number" placeholder="BMI">
          </div>
        </div>
      </div>
      <div class="more-info">
        <div v-if="!patientMore" class="add-more" @click="patientMore = true">
          +
        </div>
        <textarea 
          v-else 
          v-model="patientMoreText" 
          placeholder="Aggiungi ulteriori informazioni" 
          rows="4">
        </textarea>
      </div>

    </section>
    <div class="double">
      <section class="pregnancy">
        <div class="title">Gravidanza</div>
        <div class="switch">
          <div 
            @click="activeDateSelection = 'start'"
            class="selStart"
            :class="activeDateSelection === 'start' ? 'act' :''"
          >
            Ultima mestruazione
          </div>
          <div
            @click="activeDateSelection = 'end'"
            :class="activeDateSelection === 'end' ? 'act' :''"
            class="selEnd">Data prevista parto
          </div>
          <div 
            class="active" 
            :class="activeDateSelection"
          ></div>
        </div>
        <input 
          v-if="activeDateSelection=='start'" 
          @change="calcPregnancyDate"
          v-model="startDate" 
          type="date"
        >
        <input 
          v-else-if="activeDateSelection=='end'" 
          @change="calcPregnancyDate"
          v-model="endDate" 
          type="date"
        >
        <div class="calc-date">
          Data prevista per il parto:
          {{ endDate }}
        </div>
        <div class="epoca-gestazionale">
          Epoca gestazionale: 
          {{ epocaGestazionale }}
        </div>
        <div class="more-info">
          <div v-if="!pregnancyMore" class="add-more" @click="pregnancyMore = true">
            +
          </div>
          <textarea 
            v-else 
            v-model="pregnancyMoreText" 
            placeholder="Aggiungi ulteriori informazioni" 
            rows="4">
          </textarea>
        </div>

      </section>
      <section class="eco">
        <div class="title">Ecografia</div>
        <div class="type">
          <label for="type">Tipo</label>
          <select v-model="ecoType">
            <option value="accrescimento">Controllo Accrescimento</option>
            <option value="morfologica">Morfologica</option>
          </select>
        </div>
        <div class="number">
          <label for="number">Gravidanza</label>
          <select v-model="ecoNumber">
            <option value="singola">Singola</option>
            <option value="gemellare">Gemellare</option>
          </select>
        </div>
        <div class="more-info">
          <div v-if="!ecoMore" class="add-more" @click="ecoMore = true">
            +
          </div>
          <textarea 
            v-else 
            v-model="ecoMoreText" 
            placeholder="Aggiungi ulteriori informazioni" 
            rows="4">
          </textarea>
        </div>
      </section>
    </div>
    <section class="biometria-fetale">
      <div class="title">
        Biometria Fetale
        <span>(Rappresentazione del 5°-95° percentile)</span>
      </div>
      
      <div 
        class="biometria-item" 
        v-for="(item, index) in biometriaFetale"
        :key="index"
      >
        <label :for="'b-' + index">{{ item.name }}</label>
        <div v-if="item.calc" class="calc">{{ item.value }}</div>
        <!-- <div v-if="item.calc" class="calc">{{ item.value !== '' && item.value !== 0 ? item.value.toFixed(2) : '' }}</div> -->
        <input v-else @change="calcPercentile(index)" v-model="item.value" type="number">
        <div class="unit">{{ item.unit }}</div>
        <div v-if="item.percentile > 0" class="percentile">{{ item.percentile }}° p</div>
      </div>
      <div class="more-info">
        <div v-if="!biometriaMore" class="add-more" @click="biometriaMore = true">
          +
        </div>
        <textarea 
          v-else 
          v-model="biometriaMoreText" 
          placeholder="Aggiungi ulteriori informazioni" 
          rows="4">
        </textarea>
      </div>
    </section>
    <section class="more">
      <div class="title">
        Altro
      </div>
      <div class="att-card">
        <div class="name">
          Attività cardiaca
        </div>
        <input v-model="heart" type="radio" name="att-card" id="att-card-pres" :value="true">
        <label for="att-card-pres">Presente</label>
        <input v-model="heart" type="radio" name="att-card" id="att-card-ass" :value="false">
        <label for="att-card-ass">Assente</label>
      </div>
      <div class="presentazione">
        <div class="name">Presentazione</div>
        <select v-model="direction">
          <option value="cefalica">Cefalica</option>
          <option value="podalica">Podalica</option>
          <option value="trasverso">Trasverso</option>
        </select>
      </div>
      <div class="liq-amn">
        <div class="name">Liquido amniotico</div>
        <select v-model="liquid" @change="changeLiquid">
          <option value="normale">Normale</option>
          <option value="oligoamnios">Oligoamnios</option>
          <option value="polioamnios">Polioamnios</option>
        </select>

      </div>
      <div class="placenta">
        <div class="name">Placenta</div>
        <input v-model="placenta" type="text">
      </div>
      <div class="more-info">
        <div v-if="!lastMore" class="add-more" @click="lastMore = true">
          +
        </div>
        <textarea 
          v-else 
          v-model="lastMoreText" 
          placeholder="Aggiungi ulteriori informazioni" 
          rows="4">
        </textarea>
      </div>

    </section>

    <button @click="print">
      Print
    </button>
  </div>
  <Print v-else
    :patient="name + ' ' + surname"
    :dateOfBirth="dateOfBirth"
    :age="age"
    :normalWeight="normalWeight"
    :actualWeight="actualWeight"
    :bmi="bmi"
    :pregnancy="pregnancy"
    :decimalWeeks="decimalWeeks"
    :ecoType="ecoType"
    :ecoNumber="ecoNumber"
    :biometriaFetale="biometriaFetale"
    :heart="heart"
    :direction="direction"
    :liquid="liquid"
    :placenta="placenta"
    :patientMore= "patientMoreText"
    :pregnancyMore= "pregnancyMoreText"
    :ecoMore="ecoMoreText"
    :biometriaMore="biometriaMoreText"
    :lastMore=lastMoreText
  />

</template>


<style lang="scss" scoped>
  .form{
    display: flex;
    flex-direction: column;
    .double{
      display: flex;
      justify-content: space-between;
      section{
        width: 48%;
        // flex-grow: 1;
        // flex-basis: 300px;
      }
    }
    section{
      text-align: left;
      width: 100%;
      background-color: rgba(255,255,255,.04);
      border-radius: 8px;
      margin: 18px 0;
      padding: 10px;
      .more-info{
        margin-top: 8px;
        .add-more{
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          font-weight: 700;
          border-radius: 8px;
          border: 1px solid transparent;
          background-color: #1a1a1a;
          cursor: pointer;
          transition: border-color 0.25s;
          &:hover{
            border-color: #646cff;
          }
        }
        textarea{
          width: 100%;
          resize: none;
        }
      }
      &.patient{
        .section-content{
          display: flex;
          .left, .right{
            flex-grow: 1;
          }
        }
      }
      .title{
        font-weight: bold;
        margin-bottom: 10px;
        span{
          font-weight: normal;
        }
      }
      label{
        display: inline-block;
        width: 150px;
      }
      input{
        width: 200px;
      }
      &.pregnancy{
        input{
          width: 150px;
        }
      }
      .switch{
        display: flex;
        position: relative;
        &>.selStart, &>.selEnd{
          margin: 5px 15px 10px 5px;
          padding-bottom: 5px;
          color: #888;
          cursor: pointer;
          &.act{
            color: rgba(255, 255, 255, 0.87);
          }
        }
        .active{
          position: absolute;
          bottom: 10px;
          height: 2px;
          background-color: rgb(133, 133, 133);
          transition: all .3s;
          &.start{
            width: 135px;
            left: 10px;
          }
          &.end{
            width: 128px;
            left: 175px;
          }
        }

        // justify-content: space-between;
        // width: 280px;
        // padding: 5px 10px;
        // border-radius: 25px;
        // border: 1px solid rgb(133, 133, 133);
      }
      &.eco{
        select{
          width: 200px;
        }
      }
      &.biometria-fetale{
        .biometria-item{
          display: flex;
        }
        label{
          width: 35%;
        }
        input, .calc{
          width: 15%;
          margin-right: 10px;
        }
        .unit{
          width: 30px;
          margin-right: 30px;
        }
      }
      &.more{
        &>div{
          margin: 5px 0;
        }
        .att-card{
          display: flex;
          height: 30px;
          align-items: center;
          input{
            width: 25px;
          }
          label{
            width: 100px;
          }
        }
        .presentazione, .liq-amn, .placenta{
          display: flex;
          select{
            width: 200px;
            margin-left: 10px;
          }
          input{
            width: 300px;
            margin-left: 10px;
          }
        }
        .name{
          width: 20%;
        }
      }

    }
  }
</style>
