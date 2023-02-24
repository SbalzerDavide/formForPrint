<script>
import { isVoidTag } from '@vue/shared';
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
      office: "Desenzano",
      ecoTypesList: [
        {
          name: "Ecografia di screening del I trimestre",
          value: "1T"
        },
        {
          name: "Ecografia di screening del II trimestre",
          value: "2T"
        },
        {
          name: "Ecografia di screening del III trimestre",
          value: "3T"
        },
        {
          name: "Controllo accrescimento",
          value: "CA"
        },
      ],
      ecoMethod: "transaddominale",
      ecoTool: "Samsung HS50",
      otherTool: "",
      ecoType: 
        {
          name: "Ecografia di screening del I trimestre",
          value: "1T"
        },
      ecoNumber: "singola",
      fetusNumber: 1,
      biometriaFetale: [
      {
          text: "Diametro biparietale (BPD)",
          name: "BPD",
          value: "",
          unit: "mm",
          percentile: null,
          ecoType: ["1T", "2T", "3T", "CA"]
        },
        {
          text: "Lunghezza vertice-sacro (CRL)",
          name: "CRL",
          value: "",
          unit: "mm",
          percentile: null,
          ecoType: ["1T"]
        },
        {
          text: "Translucenza nucale (NT)",
          name: "NT",
          value: "",
          unit: "mm",
          percentile: null,
          ecoType: ["1T"]
        },
        {
          text: "Frequenza cardiaca fetale",
          name: "FCF",
          value: "",
          unit: "bpm",
          percentile: null,
          ecoType: ["1T", "2T"]
        },
        {
          text: "Circonferenza cranica (CC)",
          name: "CC",
          value: "",
          unit: "mm",
          percentile: null,
          ecoType: ["2T", "3T", "CA"]
        },
        {
          text: "Cisterna magna (CM)",
          name: "CM",
          value: "",
          unit: "mm",
          right: null,
          ecoType: ["2T", "3T", "CA"]
        },
        {
          text: "Ventricolo posteriore (VP)",
          name: "VP",
          value: "",
          unit: "mm",
          right: null,
          ecoType: ["2T", "3T", "CA"]
        },
        {
          text: "Circonferenza addominale (CA)",
          name: "CA",
          value: "",
          unit: "mm",
          percentile: null,
          ecoType: ["2T", "3T", "CA"]
        },
        {
          text: "Lungh, Femore (LF)",
          name: "LF",
          value: "",
          unit: "mm",
          percentile: null,
          ecoType: ["2T", "3T", "CA"]
        },
        {
          text: "Omero",
          name: "LO",
          value: "",
          unit: "mm",
          percentile: null,
          ecoType: ["2T", "3T", "CA"]
        },
        // {
        //   text: "Circ. cranica/ cird. addominale",
        //   name: "CC/CA",
        //   calc: true,
        //   value: "",
        //   unit: "",
        //   percentile: null,
        //   ecoType: ["1T", "2T", "3T", "CA"]
        // },
        {
          text: "Cervelletto",
          name: "TCD",
          value: "",
          unit: "mm",
          percentile: null,
          ecoType: ["2T", "3T", "CA"]
        },
        {
          text: "Stima del peso fetale (Hadlock)",
          name: "HADLOCK",
          calc: true,
          value: "",
          unit: "g",
          percentile: null,
          ecoType: ["2T", "3T", "CA"]
        },
      ],
      anatomy: [
      {
          name: "Cranio encefalo",
          value: "cranio",
          checked: false,
          ecoType: ["1T"],
          comment: "",
          showComment: false
        },
        {
          name: "Stomaco",
          value: "stomaco",
          checked: false,
          ecoType: ["1T"],
          comment: "",
          showComment: false
        },
        {
          name: "Vescica",
          value: "vescica",
          checked: false,
          ecoType: ["1T", "2T", "3T", "CA"],
          comment: "",
          showComment: false
        },
        {
          name: "Parete addominale",
          value: "addome",
          checked: false,
          ecoType: ["1T"],
          comment: "",
          showComment: false
        },
        {
          name: "Arti superiori",
          value: "artiS",
          checked: false,
          ecoType: ["1T"],
          comment: "",
          showComment: false
        },
        {
          name: "Arti inferiori",
          value: "artiI",
          checked: false,
          ecoType: ["1T"],
          comment: "",
          showComment: false
        },
        {
          name: "3 vasi nel cordone",
          value: "cordone",
          checked: false,
          ecoType: ["1T"],
          comment: "",
          showComment: false
        },
        {
          name: "Trigono del ventricolo laterale distale",
          value: "trigono",
          checked: false,
          ecoType: ["2T", "3T", "CA"],
          comment: "",
          showComment: false
        },
        {
          name: "Cavo del setto pellucido",
          value: "cavo",
          checked: false,
          ecoType: ["2T", "3T", "CA"],
          comment: "",
          showComment: false
        },
        {
          name: "Cervelletto",
          value: "cervelletto",
          checked: false,
          ecoType: ["2T", "3T", "CA"],
          comment: "",
          showComment: false
        },
        {
          name: "Cisterna magna",
          value: "cisterna",
          checked: false,
          ecoType: ["2T", "3T", "CA"],
          comment: "",
          showComment: false
        },
        {
          name: "Orbite",
          value: "orbite",
          checked: false,
          ecoType: ["2T", "3T", "CA"],
          comment: "",
          showComment: false
        },
        {
          name: "Labbro superiore",
          value: "labbro",
          checked: false,
          ecoType: ["2T", "3T", "CA"],
          comment: "",
          showComment: false
        },
        {
          name: "Colonna vertebrale",
          value: "colonna",
          checked: false,
          ecoType: ["2T", "3T", "CA"],
          comment: "",
          showComment: false
        },
        {
          name: "Situs cardiaco",
          value: "situs",
          checked: false,
          ecoType: ["2T", "3T", "CA"],
          comment: "",
          showComment: false
        },
        {
          name: "4 camere cardiache",
          value: "4Camere",
          checked: false,
          ecoType: ["2T", "3T", "CA"],
          comment: "",
          showComment: false
        },
        {
          name: "Efflussi cardiaci sinistro e destro",
          value: "eflussi",
          checked: false,
          ecoType: ["2T", "3T", "CA"],
          comment: "",
          showComment: false
        },
        {
          name: "Parete addominale anteriore",
          value: "pareteAddominale",
          checked: false,
          ecoType: ["2T", "3T", "CA"],
          comment: "",
          showComment: false
        },
        {
          name: "Bolla gastirica",
          value: "bolla",
          checked: false,
          ecoType: ["2T", "3T", "CA"],
          comment: "",
          showComment: false
        },
        {
          name: "Reni",
          value: "reni",
          checked: false,
          ecoType: [ "2T", "3T", "CA"],
          comment: "",
          showComment: false
        },
        {
          name: "Ossa lunghe degli arti superiori e inferiori",
          value: "ossaLunghe",
          checked: false,
          ecoType: ["2T", "3T", "CA"],
          comment: "",
          showComment: false
        },
        {
          name: "Mani e piedi",
          value: "maniPiedi",
          checked: false,
          ecoType: ["2T", "3T", "CA"],
          comment: "",
          showComment: false
        },
      ],
      doppler: [
      {
          text: "PI - Uterina destra",
          name: "PIUDX",
          value: "",
          unit: "",
          percentile: null,
          ecoType: ["1T", "2T", "3T", "CA"],
          incisura: null
        },
        {
          text: "PI - Uterina sinistra",
          name: "PIUSX",
          value: "",
          unit: "",
          percentile: null,
          ecoType: ["1T", "2T", "3T", "CA"],
          incisura: null
        },
        // {
        //   text: "RI - Uterine",
        //   name: "RIU",
        //   value: "",
        //   unit: "",
        //   percentile: null,
        //   ecoType: ["1T", "2T", "3T", "CA"]
        // },
        {
          text: "PI - Ombellicale",
          name: "PIO",
          value: "",
          unit: "",
          percentile: null,
          ecoType: ["1T", "2T", "3T", "CA"],
          incisura: null
        },
        {
          text: "Celebrale media (MCA)",
          name: "MCA",
          value: "",
          unit: "",
          MoM: null,
          ecoType: ["1T", "2T", "3T", "CA"]
        },
      ],
      uterineStd95: {},
      ombellicaleStd95:{},
      heart: true,
      liquid: "normale",
      direction: "cefalica",
      placenta: "",
      activeDateSelection: "start",
      pregnancy: {},
      startDate: "",
      deliveryDate: "",
      deliveryDateCRL: "",
      deliveryDateCRLInput: "",
      deliveryDateFormatting: "",
      deliveryDateCRLFormatting: "",
      epocaGestazionale: "",
      decimalWeeks: 0,
      decimalWeeksFromCRL: 0,
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
      conclusion: "",
      redatingPanel: false,
      enableCRLReDate: false,
      daysFromCRL: 0,
      weeksFromCRL: 0,
      // weeksCRL: 0,
      // daysCRL: 0,
    }
  },
  created(){
    this.changeEcoType();
    this.uterineStd95 = window.uterineStd95;
    this.ombellicaleStd95 = window.ombellicaleStd95;
  },
  watch: {
    deliveryDate(val) {
      this.deliveryDateFormatting = dayjs(val).format('DD/MM/YYYY');
    },
    // deliveryDateCRL(val){
    //   console.log(val);
    //   // this.deliveryDateCRLFormatting = dayjs(val).format('DD/MM/YYYY');
    // },
    enableCRLReDate(){
      // cambiata l'epoca gestazionale aggiorno tutti i valori dei percentili 
      let vue = this;
      this.biometriaFetale.forEach((el, index)=>{
        vue.manageBiometriaFetale(index);
      })
      this.doppler.forEach((el, index)=>{
        if(el.value){
          vue.manageDopler(index);
        }
      });
    },
    // weeksFromCRL(val){
    //   this.decimalWeeksFromCRL = val + (this.daysFromCRL/7);
    //   // aggiorno anche data a calendario
    // },
    // daysFromCRL(val){
    //   this.decimalWeeksFromCRL = this.weeksFromCRL + (val/7);
    //   // aggiorno anche data a calendario
    // },
    // deliveryDateCRLInput(val){
    //   // aggiorno anche weeksFromCRL, daysFromCRL e deliveryDateCRL
    // }
  },
  methods:{
    changeBirth(){
      let today = dayjs();
      let dateOfBirth = dayjs(this.dateOfBirth);
      // let b = dayjs();
      this.age = today.diff(dateOfBirth, "year");
    },
    calcBMI(){
      let meterHeight = this.height/100;
      this.bmi = parseFloat(this.actualWeight / (meterHeight * meterHeight)).toFixed(2)
    },
    changeEcoType(){
      if(this.ecoType.value === "1T"){
        this.conclusion = "Gravidanza intrauterina in regolare evoluzione, CRL corrispondente all’amenorrea. Ovaie regolari allegati al referto n°Operatore accreditato FMF ID: 221235"
      } else if(this.ecoType.value === "2T"){
        this.conclusion = "Biometria fetale nella norma per epoca gestazionale. Morfologia indagabile secondo linee guida SIEOG del II trimestre nella norma. Velocimetria Doppler delle arterie uterine nella norma. Fotogrammi allegati al referto n°"
      } else if(this.ecoType.value === "3T"){
        this.conclusion = "Biometria fetale nella norma per epoca gestazionale. Morfologia indagabile secondo linee guida SIEOG del III trimestre nella norma. Fotogrammi allegati al referto n° "
      } else if(this.ecoType.value === "CA"){
        this.conclusion = "Biometria fetale regolare"
      }
    }, 
    manageBiometriaFetale(index){
      let femore = false;
      let circonferenzaC = false;
      let circonferenzaCValue;
      let circonferenzaA = false;
      let circonferenzaAValue;
      this.biometriaFetale.forEach((el)=>{
        if(el.name === "LF" && el.value){
          femore = true;
        } else if(el.name === "CC" && el.value){
          circonferenzaC = true;
          circonferenzaCValue = el.value;
        } else if(el.name === "CA" && el.value){
          circonferenzaA = true;
          circonferenzaAValue = el.value;
        }
      })
      // if(circonferenzaC && circonferenzaA){
      //   this.biometriaFetale.forEach((el,i)=>{
      //     if(el.name === "CC/CA"){
      //       el.value = (circonferenzaCValue / circonferenzaAValue).toFixed(2);
      //       // calcolo percentile
      //       this.calcPercentile(i);
      //     }
      //   })
      // }

      if(femore && circonferenzaC && circonferenzaA){
        let weeks;
        if(this.enableCRLReDate){
          weeks = this.decimalWeeksFromCRL
        } else{
          weeks = this.decimalWeeks
        }
        if(weeks >= 25){
          this.Hadlock();
        }
      }
      if(this.biometriaFetale[index].value){
        this.calcPercentile(index);
      } else{
        this.biometriaFetale[index].percentile = null;
      }
    },
    manageDopler(index){
      this.calcPercentileDopler(index);
    } ,
    calcPercentile(index){
      let ga;
      if(this.enableCRLReDate){
        ga = this.decimalWeeksFromCRL
      } else{
        ga = this.decimalWeeks;
      }
      let mean;
      let sd;
      if(this.biometriaFetale[index].name === "CC"){
        mean = -28.2849 + 1.69267 * (ga ** 2) - 0.397485 * (ga ** 2) * Math.log(ga);
        sd = 1.98735 + 0.0136772 * (ga ** 3) - 0.00726264 * (ga ** 3) * Math.log(ga) + 0.000976253 * (ga ** 3) * (Math.log(ga) ** 2);
      } else if(this.biometriaFetale[index].name === "BPD"){
        mean = 5.60878 + 0.158369 * (ga ** 2) - 0.00256379 * (ga ** 3);
        // 5·60878 + 0·158369 × GA2 − 0·00256379 × GA3
        sd = Math.exp(0.101242 + 0.00150557 * (ga ** 3) - 0.000771535 * (ga ** 3) * Math.log(ga) + 0.0000999638 * (ga ** 3) * (Math.log(ga) ** 2));
      } else if(this.biometriaFetale[index].name === "CA"){
        mean = - 81.3243 + 11.6772 * ga - 0.000561865 * (ga ** 3);
        sd = - 4.36302 + 0.121445 * (ga ** 2) - 0.0130256 * (ga ** 3) + 0.00282143 * (ga ** 3) * Math.log(ga);
      } else if(this.biometriaFetale[index].name === "LF"){
        mean = - 39.9616 + 4.32298 * ga - 0.0380156 * (ga ** 2);
        sd = Math.exp(0.605843 - 42.0014 * (ga ** -2) + 0.00000917972 * (ga ** 3))
      } else if(this.biometriaFetale[index].name === "LO"){
        // calcolo omero
        mean = 11.459 * ga - 2.2362 * ga * Math.log(ga) - 63.704;
        sd = 0.040292 * ga + 1.3464;
      } else if(this.biometriaFetale[index].name === "CRL"){
        // calcolo CRL
        ga = ga * 7;
        mean = -50.6562 + (0.815118 * ga) + (0.00535302 * (ga ** 2));
        sd = -2.21626 + (0.0984894 * ga);
        
        // -2.21626 + (0.0984894 * ga);
        let crl = this.biometriaFetale[index].value;
        let meanGa = (40.9041 + (3.21585 * (crl ** 0.5)) + (0.348956 * crl))/7;
        this.decimalWeeksFromCRL = meanGa;




        // modifica per calcolo crl date da qui
        this.deliveryDateFromCRL = this.getDeliveryDateFromDecimalWeeks(this.decimalWeeksFromCRL);
        this.crlWeeks = getWeeksFromDecimal(this.decimalWeeksFromCRL);
        this.crlDays = getDaysFromDecimal(this.decimalWeeksFromCRL);
        // let decimal = meanGa - Math.floor(meanGa);
        // let days = (decimal * 7).toFixed(0);
        // if(days == 7){
        //   days = 0;
        //   meanGa++;
        // }
        // let uniqueCrlDate = 
        // this.daysFromCRL = parseInt(days);
        // console.log(`${Number.parseInt(meanGa)} weeks  + ${days} days`)
        // this.decimalWeeksFromCRL = Number.parseInt(meanGa) + (days/7);
        // this.weeksFromCRL = parseInt(this.decimalWeeksFromCRL);

        if(this.decimalWeeks - meanGa < -0.714 || this.decimalWeeks - meanGa > 0.714){
          console.log("proporre ridatazione perché differenza maggiore di 4 giorni");
          // this.redatingPanel = true;
          // capire se far aprire direttamente pannello o meno. Sembrerebbe che dia problemi quando triggero ricalcolo tutti i parametri attivando la ridatazione. 
          // in quel caso succede che passi da questa funzione facendo uscire il pannello di modifica anche se non lo vorrei in questo caso
        }

        let sdGa = 2.39102 + (0.0193474 * crl);
        // console.log(meanGa / 7);
      } else if(this.biometriaFetale[index].name === "NT"){
        // calcolo NT
      } else if(this.biometriaFetale[index].name === "FCF"){
        // calcolo frequenza cardiaca fetale
        // limitare calcolo tra la 10 e la 14 settimana 
        mean = 208.8 - (3.178 * ga);
        sd = 6.93;
      } else if(this.biometriaFetale[index].name === "TCD"){
        // calcolo cervelletto
      } else if(this.biometriaFetale[index].name === "CM"){
        if(this.biometriaFetale[index].value >= 2 && this.biometriaFetale[index].value <= 10){
          this.biometriaFetale[index].right = true;
        } else{
          this.biometriaFetale[index].right = false;
        }
      } else if(this.biometriaFetale[index].name === "VP"){
        if(this.biometriaFetale[index].value <= 10){
          this.biometriaFetale[index].right = true;
        } else{
          this.biometriaFetale[index].right = false;
        }
      } 
      if(mean && sd){
        const normDist = new NormalDistribution(mean, sd);
        console.log(ga);
        console.log(mean);
        console.log(sd);
        let percentile = normDist.cdf(this.biometriaFetale[index].value) * 100;
        this.biometriaFetale[index].percentile = percentile.toFixed(0)
      }
    },
    calcPercentileDopler(index){
      let weeks;
      if(this.enableCRLReDate){
        weeks = this.decimalWeeksFromCRL;
      } else{
        weeks = this.decimalWeeks;
      }
      if(this.doppler[index].name === "PIO"){
        let pi = this.doppler[index].value;
        let zScore = -(0.0768617 ** -1) * (Math.exp((pi - (1.02944 + 77.7456 * (weeks ** -2) - 0.000004455 * (weeks ** 3))) * -0.0768617 * (-0.00645693 + 254.885 * Math.log(weeks) * (weeks ** - 2) - 715.949 * (weeks ** -2)) ** - 1) -1);
        // console.log(zScore);
        const normDist = new NormalDistribution(0, 1);
        let percentile = normDist.cdf(zScore) * 100
        this.doppler[index].percentile = percentile.toFixed(0);
      } else if(this.doppler[index].name === "PIUDX" || this.doppler[index].name === "PIUSX"){
        let pi = this.doppler[index].value;
        let ga = weeks * 7
        let a = 1.39 - 0.012 * ga + (ga ** 2) * 0.0000198;
        let mean = Math.exp(a);
        let sd = 0.272 - ga * 0.000259
        const normDist = new NormalDistribution(mean, sd);
        let percentile = normDist.cdf(pi) * 100;
        this.doppler[index].percentile = percentile.toFixed(0);
      } else if(this.doppler[index].name === "MCA"){
        // prova mca
        // let esponente = 2.31 + 0.046 * weeks;
        // e(2.31+0.046 GA) = mca
        let mean = Math.exp(2.31 + 0.046 * weeks);
        // calcolare mean in questo modo oppure prendere i dati nella tabella?
        console.log(mean);
        // dell'mca non si calcolano i percentili ma lo scostamento rispetto al valore atteso
        this.doppler[index].MoM = (this.doppler[index].value / mean).toFixed(2);

      }
    },
    pointPercentile(value){
      return `left: ${value}px`;
    },
    calcPercentileUterine(index){
      let weeks;
      if(this.enableCRLReDate){
        weeks = parseInt(this.decimalWeeksFromCRL);
      } else{
        weeks = parseInt(this.decimalWeeks);
      }
      let uterine = this.doppler[index];
      if(this.doppler[index].name == "PIUDX" || this.doppler[index].name == "PIUSX"){
        if(this.uterineStd95[weeks] < uterine.value){
          return true;
        } else{
          if(uterine.percentile >= 96){
            uterine.percentile = 94;
          }
          return false;
        }
      } else if(this.doppler[index].name == "PIO" ){
        if(this.ombellicaleStd95[weeks] < uterine.value){
          return true;
        } else{
          if(uterine.percentile >= 96){
            uterine.percentile = 94;
          }
          return false;
        }
      }
    },
    getDeliveryDateFromDecimalWeeks(decimal){
      let daysToDeliveryFromCRL = 280 - (decimal * 7);
      return dayjs().add(daysToDeliveryFromCRL).format('YYYY-MM-DD');
    },
    getWeeksFromDecimal(decimal){
      return Number.parseInt(decimal)
    },
    getDaysFromDecimal(decimal){
        let decimalDays = decimal - Math.floor(decimal);
        return days = (decimalDays * 7).toFixed(0);
    },
    reDateCRL(){
      this.enableCRLReDate = true;
      this.redatingPanel = false;
      // this.pregnancy.reDateFromCrl = `${parseInt(this.decimalWeeksFromCRL)} settimane + ${((this.decimalWeeksFromCRL -  parseInt(this.decimalWeeksFromCRL)) * 7).toFixed(0)} giorni`;
      // let daysDiff = parseInt(((this.decimalWeeks - this.decimalWeeksFromCRL) * 7).toFixed(0));
      // this.pregnancy.deliveryCrl = dayjs(this.deliveryDate).add(daysDiff, 'day');
      // this.deliveryDateCRL = this.pregnancy.deliveryCrl;
      // console.log(this.pregnancy.deliveryCrl);
      // console.log(this.pregnancy.reDateFromCrl);
      // this.deliveryDateCRLInput = dayjs(this.deliveryDateCRL).format('YYYY-MM-DD');
      // {{ parseInt(decimalWeeksFromCRL) }} settimane + {{ ((decimalWeeksFromCRL -  parseInt(decimalWeeksFromCRL)) * 7).toFixed(0) }} giorni 
    }, 
    calcPregnancyDate(){
      if(this.activeDateSelection === "start"){
        // ho settato l'ultima mestruazione
        // this.deliveryDate = dayjs(this.startDate).add(280, 'day').format('DD/MM/YYYY');
        this.deliveryDate = dayjs(this.startDate).add(280, 'day');
        this.pregnancy.start = this.startDate;
        this.pregnancy.delivery = this.deliveryDate;
      } else if(this.activeDateSelection === "end"){
        // ho settato data presunta parto
        // this.startDate = dayjs(this.deliveryDate).subtract(280, 'day').format('DD/MM/YYYY');
        this.startDate = dayjs(this.deliveryDate).subtract(280, 'day');
        this.pregnancy.delivery = this.deliveryDate;
        // this.deliveryDate = dayjs(this.deliveryDate).format('DD/MM/YYYY');
      }
      let today = dayjs();
      let dayDiff = (today.diff(this.startDate, 'day')) % 7;
      let weekDiff = today.diff(this.startDate, 'week');
      this.decimalWeeks = weekDiff + (dayDiff / 7);
      this.epocaGestazionale = `${weekDiff} settiname + ${dayDiff} gg`
      this.pregnancy.epocaGestazionale = this.epocaGestazionale;
      // propongo la visita del relativo trimestre
      if(this.decimalWeeks < 14){
        this.ecoType = {
          name: "Ecografia di screening del I trimestre",
          value: "1T"
        };
      } else if(this.decimalWeeks >= 14 && this.decimalWeeks < 28){
        this.ecoType = {
          name: "Ecografia di screening del II trimestre",
          value: "2T"
        };
      } else if(this.decimalWeeks >= 28){
        this.ecoType = {
          name: "Ecografia di screening del III trimestre",
          value: "3T"
        }
      }
      // finito il calcolo della data ricalcolo anche i valori inseriti
      let vue = this;
      this.biometriaFetale.forEach((el, index)=>{
        vue.manageBiometriaFetale(index);
      })
      this.doppler.forEach((el, index)=>{
        if(el.value){
          vue.manageDopler(index);
        }
      });
    },
    Hadlock(){
      let hc = this.biometriaFetale.find(el=> el.name == "CC").value * 0.1;
      let ac = this.biometriaFetale.find(el=> el.name == "CA").value * 0.1;
      let fl = this.biometriaFetale.find(el=> el.name == "LF").value * 0.1;
      // let hc = this.biometriaFetale["CC"].value * 0.1;
      // let ac = this.biometriaFetale["CA"].value * 0.1;
      // let fl = this.biometriaFetale["LF"].value * 0.1;
      let esponente = 1.326 + (0.0107 * hc) + (0.0438 * ac) + (0.158 * fl) - (0.00326 * ac * fl);
      let efw = 10 ** (esponente);
      this.biometriaFetale[this.biometriaFetale.length -1].value = efw.toFixed(2);
      // console.log(efw);
      // calcolo percentile stima peso
      let ga;
      if(this.enableCRLReDate){
        ga = this.decimalWeeksFromCRL;
      } else{
        ga = this.decimalWeeks;
      }

      let eX = getExpectedMeans(ga);
      let cv = getCV(ga);
      let sk = getSkewness(ga);
      let lnEfw = Math.log(efw)
      let zScore = getZScore(sk, cv, lnEfw, eX)
      const normDist = new NormalDistribution(0, 1);
      let percentile = normDist.cdf(zScore) * 100;
      this.biometriaFetale[this.biometriaFetale.length -1].percentile = percentile.toFixed(0);
    },
    checkShowBiometria(item){
      let show = false;
      if(item.ecoType.includes(this.ecoType.value)){
        if(item.name === "FCF"){
          let weeks;
          if(this.enableCRLReDate){
            weeks = this.decimalWeeksFromCRL;
          } else{
            weeks = this.decimalWeeks;
          }
          if(weeks >= 10 && weeks < 15){
            show = true;
          }
        } else{
          show = true;
        }
      }
      return show;
    },
    print(){
      this.showPrint = true;
    },
    comeBack(e){
      console.log(e);
      this.showPrint = false;
    }
  }
}
</script>

<template>
  <div v-if="!showPrint" class="form">
    <section class="office">
      <div class="title">Ambulatorio</div>
      <select v-model="office">
        <option value="Desenzano">Desenzano</option>
        <option value="Pralboino">Pralboino</option>
      </select>
    </section>
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
          v-model="deliveryDate" 
          type="date"
        >
        <div class="calc-date">
          Data prevista per il parto:
          {{ deliveryDateFormatting }}
        </div>
        <div class="epoca-gestazionale">
          Epoca gestazionale: 
          {{ epocaGestazionale }}
        </div>
        <div class="epoca-gestazionale-CRL">
          <div class="show">
            <div class="checkbox">
              <input 
                type="checkbox" 
                name="enableReDating" 
                id="enableReDating"
                v-model="enableCRLReDate"
                >
                <!-- @change="enableCRLReDate = !enableCRLReDate" -->
              <label for="enableReDating">Applica ridatazione CRL</label>
            </div>
            <div v-show="enableCRLReDate" class="re-date-show">
              <div class="ga-crl">
                Ridatazione CRL: 
                <!-- {{ pregnancy.reDateFromCrl }} -->
              </div>
              <div class="delivery-crl">
                Data prevista per il parto da eco:
                  <!-- {{ deliveryDateCRLFormatting }} -->
              </div>
              <!-- {{ parseInt(decimalWeeksFromCRL) }} settimane + {{ ((decimalWeeksFromCRL -  parseInt(decimalWeeksFromCRL)) * 7).toFixed(0) }} giorni -->
            </div>
          </div>
          <div class="action">
            <button @click="redatingPanel = true">Modifica Ridatazione</button>
          </div>
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
        <div class="method">
          <label for="type">Metodo ecografico</label>
          <select v-model="ecoMethod">
            <option value="transaddominale">Transaddominale</option>
            <option value="transvaginale">Transvaginale</option>
            <option value="transaddominale e trasvaginale">Transaddominale e Trasvaginale</option>
          </select>
        </div>
        <div class="tool">
          <label for="type">Strumento ecografico</label>
          <select v-model="ecoTool">
            <option value="Samsung HS50">Samsung HS50</option>
            <option value="Samsung WS80">Samsung WS80</option>
            <option value="altro">altro</option>
          </select>
          <input 
            type="text"
            v-if="ecoTool == 'altro'" 
            v-model="otherTool"
            placeholder="Specificare nome strumento"
            class="other-tool" 
            >
        </div>
        <div class="type">
          <label for="type">Tipo</label>
          <select @change="changeEcoType" v-model="ecoType">
            <option
              v-for="(type, index) in ecoTypesList"
              :key="index" 
              :value="type"
            >
              {{ type.name }}
            </option>
          </select>
        </div>
        <div class="number">
          <!-- <label for="number">Gravidanza</label> -->
          <!-- <select v-model="ecoNumber">
            <option value="singola">Singola</option>
            <option value="gemellare">Gemellare</option>
          </select> -->
          <label for="fetusNumber">Numero di feti</label>
          <input v-model="fetusNumber" type="number" name="fetusNumber" id="fetusNumber">
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
        v-show="checkShowBiometria(item)"
        :key="index"
        >
        <!-- v-show="item.ecoType.includes(ecoType.value)" -->
        <label :for="'b-' + index">{{ item.text }}</label>
        <div v-if="item.calc" class="calc">{{ item.value }}</div>
        <!-- <div v-if="item.calc" class="calc">{{ item.value !== '' && item.value !== 0 ? item.value.toFixed(2) : '' }}</div> -->
        <input v-else @change="manageBiometriaFetale(index)" v-model="item.value" type="number">
        <div class="unit">{{ item.unit }}</div>
        <div class="percentile">
          <div v-if="item.percentile != null">{{ item.percentile }}° p</div>
          <div v-else-if="item.right != null" class="right">
            <div v-if="item.right" class="right-ok"></div>
            <div v-else class="right-not-ok"></div>
          </div>
        </div>
        <button @click="redatingPanel = true" v-if="item.name === 'CRL' && item.value">Imposta Ridatazione</button>
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
    <section v-show="redatingPanel" class="re-dating-panel"
    >
      <div 
        class="re-dating-background"
        @click="redatingPanel = false"
      >
      </div>
      <div class="re-dating-container">
        <div class="panel-title">
          Ridatazione da CRL
        </div>
        <div class="old-date">
          <span>Data originale: </span> {{ parseInt(decimalWeeks) }} settimane + {{ ((decimalWeeks -  parseInt(decimalWeeks)) * 7).toFixed(0) }} giorni
        </div>
        <div class="new-date">
          <span>Ridatazione:</span>
          <div class="re-dating-input">
            <div class="number">
              <div>
                <input 
                type="number" 
                > Settimane +
                <!-- v-model="weeksFromCRL" -->
                  <!-- v-model="weeksCRL" -->
              </div>
              <div>
                <input 
                  type="number" 
                  > Giorni
                  <!-- v-model="daysFromCRL" -->
                  <!-- v-model="daysCRL" -->
              </div>
            </div>
            <div class="delivery">
              <label>Termine eco:</label>
              <!-- <input v-model="deliveryDateCRLInput" type="date"> -->
              <!-- <input v-model="deliveryDateCRL" type="date"> -->
            </div>
          </div>
        </div>
        <div class="action">
          <button @click="reDateCRL">Ridata</button>
        </div>
        
      </div>
    </section>
    <section class="anatomy">
      <div class="title">
        Anatomia
      </div>
      <div class="anatomy-container">
        <div 
          v-for="(element, index) in anatomy" 
          :key="index"
          v-show="element.ecoType.includes(ecoType.value)"
          class="anatomy-element">
          <div class="left">
            <div @click="element.showComment = !element.showComment" class="anatomy-more">
              <div v-if="element.showComment">-</div>
              <div v-else>+</div>
            </div>
            <label 
              :for="element.value"
              :class="element.checked ? 'anatomy-checked' : ''"
            >{{ element.name }}</label>
          </div>
          <input 
            type="checkbox" 
            :name="element.value" 
            :id="element.value"
            v-model="element.checked"
            >
            <input v-if="element.showComment" v-model="element.comment" type="text">
        </div>
      </div>
    </section>
    <section class="doppler">
      <div class="title">
        Doppler
      </div>
      <div 
        class="doppler-item" 
        v-for="(item, index) in doppler"
        v-show="item.name !='PIO' || (enableCRLReDate ? (decimalWeeksFromCRL >= 19) : (decimalWeeks >= 19))"
        :key="index"
      >
        <label :for="'b-' + index">{{ item.text }}</label>
        <input @change="manageDopler(index)" v-model="item.value" type="number">
        <div class="unit">{{ item.unit }}</div>
        <div class="chart-percentile">
          <div v-if="item.name !=='MCA'">
            <div class="line"></div>
            <div class="base">
              <div class="middle"></div>
              <div 
                class="point"
                :style="`left: ${item.percentile - 4}px`"
              ></div>
            </div>
            <div class="line"></div>
          </div>
        </div>
        <div class="percentile">
          <span v-if="item.MoM">{{ item.MoM }} MoM</span>
          <span v-else-if="calcPercentileUterine(index)">> 95°p</span>
            <!-- {{ item.percentile }}°p -->
          </div>
        <!-- <div class="percentile">{{ item.percentile }}
          <span v-show="item.name != 'MCA' && item.value">
            ° p
          </span>
        </div> -->
        <div v-if="item.name != 'MCA'" class="check-doppler">
          <input 
            :name="item.name" 
            :id="item.name" 
            type="checkbox"
            v-model="item.incisura"
          >
          <label v-if="item.name == 'PIUDX' || item.name == 'PIUSX'" :for="item.name">Incisura</label>
          <label v-else-if="item.name == 'PIO'" :for="item.name">EDF positivo</label>
        </div>
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
        <select v-model="liquid">
          <option value="normale">Normale</option>
          <option value="ridotto">Ridotto</option>
          <option value="oligoanidramnios">Oligoanidramnios</option>
          <option value="poliamnios">Poliamnios</option>
        </select>

      </div>
      <div class="placenta">
        <div class="name">Placenta</div>
        <!-- <input v-model="placenta" type="text"> -->
        <select v-model="placenta">
          <option value="anteriore">Anteriore</option>
          <option value="posteriore">Posteriore</option>
          <option value="fundica">Fundica</option>
          <option value="bassa">A inserzione bassa</option>
          <option value="major">Previa major</option>
          <option value="minor">previa minor</option>
        </select>
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

    <section class="conclusion">
      <textarea v-model="conclusion" rows="4"> </textarea>
    </section>

    <button class="print" @click="print">
      Print
    </button>
  </div>
  <Print v-else
    @comeBack="comeBack"
    :office="office"
    :patient="name + ' ' + surname"
    :dateOfBirth="dateOfBirth"
    :age="age"
    :height="height"
    :normalWeight="normalWeight"
    :actualWeight="actualWeight"
    :bmi="bmi"
    :pregnancy="pregnancy"
    :decimalWeeks="decimalWeeks"
    :enableCRLReDate="enableCRLReDate"
    :decimalWeeksFromCRL="decimalWeeksFromCRL"
    :ecoType="ecoType.name"
    :ecoMethod="ecoMethodz"
    :ecoTool="ecoTool != 'altro' ? ecoTool : otherTool"
    :ecoNumber="ecoNumber"
    :fetusNumber="fetusNumber"
    :biometriaFetale="biometriaFetale"
    :anatomy="anatomy"
    :doppler="doppler"
    :heart="heart"
    :direction="direction"
    :liquid="liquid"
    :placenta="placenta"
    :patientMore= "patientMoreText"
    :pregnancyMore= "pregnancyMoreText"
    :ecoMore="ecoMoreText"
    :biometriaMore="biometriaMoreText"
    :lastMore=lastMoreText
    :conclusion="conclusion"
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
      &.office{
        display: flex;
        align-items: center;
        .title{
          // display: flex;
          // align-items: center;
          vertical-align: middle;
          margin-bottom: 0;
          height: 100%;
          margin-right: 10px;
        }
        select{
          height: 25px;
        }
      }
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
        .epoca-gestazionale-CRL{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          user-select: none;
          .checkbox{
            display: flex;
            align-items: center;
            input{
              width: auto;
              margin-right: 10px;
            }
            label{
              width: auto;
            }
          }
          .action{
            display: flex;
            justify-content: flex-end;
          }
          button{
            padding: 3px 8px;
          }
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
        select, input{
          width: 250px;
        }
        .other-tool{
          margin-left: 150px;
        }
      }
      &.biometria-fetale{
        .biometria-item{
          display: flex;
          align-items: center;
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
        .percentile{
          min-width: 50px;
        }
        .right{
          display: flex;
          align-items: center;
          .right-ok{
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: green;
          }
          .right-not-ok{
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: red;
          }
        }
        button{
          margin-left: 10px;
          padding: 3px 8px;
        }
      }
      &.re-dating-panel{
        margin: 0;
        padding: 0;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        backdrop-filter: blur(4px);
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        .re-dating-background{
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 1;
          
        }
        .re-dating-container{
          padding: 20px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.87);
          background-color: #242424;
          z-index: 2;
          span{
            display: inline-block;
            width: 200px;
            font-weight: bold;
          }
          .old-date{
            margin: 12px 0;
            padding: 8px 0;
            border-bottom: 1px solid #d9d9d9;
          }
          .new-date{
            display: flex;
            // align-items: center;
            margin: 8px 0;
          }
          .panel-title{
            text-align: center;
          }
          .re-dating-input{
            display: flex;
            flex-direction: column;
          }
          .number{
            display: flex;
            input{
              width: 40px;
              margin: 5px;
            }
          }
          .delivery{
            display: flex;
            margin-top: 8px;
            label{
              width: auto;
            }
            input{
              margin-left: 8px;
              flex-grow: 1;
              width: auto;
            }
          }
          .action{
            display: flex;
            justify-content: flex-end;
            margin-top: 30px;
          }
        }
      }
      &.anatomy{
        .anatomy-container{
          display: flex;
          flex-wrap: wrap;
          user-select: none;
        }
        .anatomy-more{
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          margin-right: 8px;
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
        .left{
          display: flex;
          align-items: center;
        }
        .anatomy-element{
          width: 33%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          margin-bottom: 8px;
          label{
            width: 240px;
            &.anatomy-checked{
              font-weight: bold;
            }
          }
          input[type=checkbox]{
            width: auto;
            margin-right: 40px;
          }
          input[type=text]{
            margin-top: 5px;
            width: 87%;
          }
        }
      }
      &.doppler{
        .doppler-item{
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
        .percentile{
          width: 80px;
        }
        .check-doppler{
          display: flex;
          align-items: center;
          label{
            width: 100px;
          }
        }
        .chart-percentile{
          display: flex;
          align-items: center;
          width: 16%;
          margin-right: 10px;        
          & > div{
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .base{
            position: relative;
            width: 100px;
            height: 1.5px;
            background: rgba(255, 255, 255, 0.87);;
            .middle{
              position: absolute;
              left: 50px;
              top: -4px;
              width: 1.5px;
              height: 9px;
              background: rgba(255, 255, 255, 0.87);;
            }
            .point{
              position: absolute;
              top: -3px;
              width: 7px;
              height: 7px;
              transform: rotate(-45deg);
              background: rgba(255, 255, 255, 0.87);;
            }
          }
          .line{
            height: 12px;
            width: 1.5px;
            background: rgba(255, 255, 255, 0.87);;
          }
        }
      }
      &.conclusion{
        textarea{
          width: 100%;
          resize: none;
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
    button.print{
      background: #55917F;

    }
  }
  @media (prefers-color-scheme: light) {
    .form{
      section{
        background-color: rgba(0, 0, 0, .04);
        .more-info{
          .add-more{
            background-color: rgba(0, 0, 0, .1);

          }
        }
        &.anatomy{
          .anatomy-more{
            background-color: rgba(0, 0, 0, .1);
          }
        }
        .chart-percentile{
          .line, .base .middle, .base .point, .base{
            background-color: #1a1a1a !important;
          }
        }  
      }


      input, select{
        background-color: rgba(0, 0, 0, .04);
        border: 1px solid #1a1a1a
      }
      textarea{
        background-color: rgba(0, 0, 0, .04);
      }
    }

  }

</style>
