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
          name: "Circ. cranica, cird. addominale",
          value: "",
          unit: "mm",
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
      startDate: "",
      endDate: "",
      epocaGestazionale: ""
    }
  },
  created(){
    // const normDist = new NormalDistribution(0, 1);
    // console.log(normDist);
  },
  watch: {
    // liquid(newLiquid, oldLiquid) {
    //   if(newLiquid === "oligo"){

    // }

    // }
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
      let diametro = false;
      let circonferenzaC = false;
      let circonferenzaA = false;
      this.biometriaFetale.forEach((el, index)=>{
        if(el.name === "Diametro biparietale (DBP)"){
          diametro = true;
        } else if(el.name === "Circonferenza cranica (CC)"){
          circonferenzaC = true;
        } else if(el.name === "Circonferenza addominale (CA)"){
          circonferenzaA = true;
        }
      })
      if(diametro && circonferenzaC && circonferenzaA){
        // posso calcolare stima peso

      }
      this.biometriaFetale[index].percentile = 20;
      console.log(this.biometriaFetale[index]);
    }, 
    calcPregnancyDate(){
      if(this.activeDateSelection === "start"){
        // ho settato l'ultima mestruazione
        this.endDate = dayjs(this.startDate).add(280, 'day').format('DD/MM/YYYY');

      } else if(this.activeDateSelection === "end"){
        // ho settato data presunta parto
        this.startDate = dayjs(this.startDate).subtract(280, 'day').format('DD/MM/YYYY');
        this.endDate = dayjs(this.endDate).format('DD/MM/YYYY');
      }

      let today = dayjs();
      let dayDiff = (today.diff(this.startDate, 'day')) % 7;
      let weekDiff = today.diff(this.startDate, 'week');
      this.epocaGestazionale = `${weekDiff} settiname + ${dayDiff} gg`

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

    </section>
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
    </section>
    <section class="eco">
      <div class="title">Ecografia</div>
    </section>
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
        <div v-if="item.calc" class="calc"></div>
        <input v-else @change="calcPercentile(index)" v-model="item.value" type="number">
        <div class="unit">{{ item.unit }}</div>
        <div v-if="item.percentile > 0" class="percentile">{{ item.percentile }}° p</div>
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
    :biometriaFetale="biometriaFetale"
    :heart="heart"
    :direction="direction"
    :liquid="liquid"
  />

</template>


<style lang="scss" scoped>
  .form{
    display: flex;
    flex-direction: column;
    section{
      text-align: left;
      width: 100%;
      background-color: rgba(255,255,255,.04);
      border-radius: 8px;
      margin: 18px 0;
      padding: 10px;
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
