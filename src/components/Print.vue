<script>

export default {
  name: 'Print',
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
    ecoType: Object,
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
    enableCRLReDate:{
      type: Boolean,
      default: false
    },
    decimalWeeksFromCRL: Number,
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
      formattingDateOfBirth: "",
      formattingPregnancyEnd: "",
      formattingPregnancyStart: "",
      formattingDeliveryCRL: "",
      showBiometria: false,
      showDoppler: false,
      showAnatomia: false,
      uterineStd95: {},
      ombelicaleStd95:{},
    }
  },
  created(){
    let app = document.getElementById("app");
    app.classList.add("appOnPrint");
    this.date = dayjs().format('DD/MM/YYYY')
    let weeks;
    if(this.enableCRLReDate){
        weeks = this.decimalWeeksFromCRL;
      } else{
        weeks = this.decimalWeeks;
      }
    this.xPosition = 60.5 + ((weeks - 15) * 286.5 / 25)
    this.calcYPosHc();
    this.formattingDateOfBirth = dayjs(this.dateOfBirth).format('DD/MM/YYYY');
    if(this.enableCRLReDate && this.pregnancy.reDateFromCrl){
      this.formattingPregnancyEnd = this.pregnancy?.delivery?.format('DD/MM/YYYY');
      this.formattingDeliveryCRL = dayjs(this.pregnancy?.deliveryDateFromCRL).format('DD/MM/YYYY');
    } else{
      this.formattingPregnancyEnd = this.pregnancy?.delivery?.format('DD/MM/YYYY');
    }
    this.formattingPregnancyStart = dayjs(this.pregnancy?.start).format('DD/MM/YYYY');

    this.uterineStd95 = window.uterineStd95;
    this.ombelicaleStd95 = window.ombelicaleStd95;
    
    // se almeno un elemento per lista contiene un valore allora inserisco l'intestazione
    for(let i = 0; i < this.biometriaFetale.length; ++i){
      if(this.biometriaFetale[i].value){
        this.showBiometria = true;
        break;
      }
    }
    for(let i = 0; i < this.anatomy.length; ++i){
      if(this.anatomy[i].checked || this.anatomy[i].comment){
        this.showAnatomia = true;
        break;
      }
    }
    for(let i = 0; i < this.doppler.length; ++i){
      if(this.doppler[i].value){
        this.showDoppler = true;
        break;
      }
    }

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
    },
    checkShowBiometria(item){
      // mostro se il valore è stato inserito, cioè se è presente il valore percentile, e se è richiesto per il tipo di visita che sto facendo
      let show = false;
      let weeks;
      if(this.enableCRLReDate){
        weeks = parseInt(this.decimalWeeksFromCRL);
      } else{
        weeks = parseInt(this.decimalWeeks);
      }
      if(item.ecoType.includes(this.ecoType.value) && (item.percentile || item.right != null)){
        if(item.name === "FCF"){
          if(weeks >= 10 && weeks < 15){
            show = true;
          }
        } else if(item.name === "NT"){
          if(weeks >= 11 && weeks < 14){
            show = true;
          }
        } else{
          show = true;
        }
      }
      return show;
    },
    calcPercentileUterine(index){
      let uterine = this.doppler[index];
      let weeks;
      if(this.enableCRLReDate){
        weeks = parseInt(this.decimalWeeksFromCRL);
      } else{
        weeks = parseInt(this.decimalWeeks);
      }
      if(this.doppler[index].name == "PIUDX" || this.doppler[index].name == "PIUSX"){
        if(this.uterineStd95[weeks] < uterine.value){
          return true;
        } else{
          // serviva per simulare valore più verosimile su grafico ma si rompe se faccio avanti e inetro tra form e print
          // if(uterine.percentile >= 96){
          //   uterine.percentile = 94;
          // }
          return false;
        }
      } else if(this.doppler[index].name == "PIO" ){
        if(this.ombelicaleStd95[weeks] < uterine.value){
          return true;
        } else{
          if(uterine.percentile >= 96){
            uterine.percentile = 94;
          }
          return false;
        }
      }
    },  
    print(){
      window.print();
    },
    comeBack(){
      let app = document.getElementById("app");
      app.classList.remove("appOnPrint");
      this.$emit('comeBack', {
        save: true
      })
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
    <button
      class="come-back-to-form hide-print"
      @click="comeBack"
      >
        Modifica dati
    </button>
    <header>
      <div class="img">
        <img 
          v-if="office === 'Desenzano'" 
          class="img-dese" 
          src="@/img/headerDese.jpg"
          >
        <img 
          v-else-if="office === 'Pralboino'" 
          class="img-pralboino" 
          src="@/img/headerPralboino.jpg"
          >
          <!-- src="/img/headerPralboino.jpg" -->
      </div>
      <div class="date">Data: {{ date }}</div>
    </header>

    <main>
      <section class="patient">
        Paziente: {{ patient }}, data di nascita: {{ formattingDateOfBirth }}
        <p v-if="patientMore!==''">{{ patientMore }}</p>
      </section>
      <section class="medical-history">
        <div class="title-par">Anamnesi</div>
        Età materna: {{ age }} anni, Altezza {{ height }}cm, Peso normale {{ normalWeight }}kg, Peso attuale {{ actualWeight }}kg, (BMI {{ bmi }})
      </section>
      <section class="pregnancy-date">
        <div v-show="pregnancy?.start" class="row active-pregnancy">Data ultime mestruazioni: {{ formattingPregnancyStart }}</div>
        <div class="row date">
          <div 
          v-if="formattingPregnancyEnd"
            :class="enableCRLReDate ? '' : 'active-pregnancy'"
          >
            Data prevista per il parto da U.M.: {{ formattingPregnancyEnd }}
          </div>
          <div 
            v-if="enableCRLReDate" 
            :class="enableCRLReDate ? 'active-pregnancy' : ''"
          >
            Data prevista per il parto da eco: {{ formattingDeliveryCRL }}
          </div>
        </div>
        <div 
          v-if="pregnancy?.epocaGestazionale"
          class="row"
          :class="enableCRLReDate ? '' : 'active-pregnancy'"
        >
          Epoca gestazionale 
          <span 
            v-if="enableCRLReDate && pregnancy.reDateFromCrl"
            class="original-re-date" 
          >
            &nbsp;da U.M.
          </span>
          : {{ pregnancy?.epocaGestazionale }}
        </div>
        <div 
          v-if="enableCRLReDate && pregnancy.reDateFromCrl" 
          class="row"
          :class="enableCRLReDate ? 'active-pregnancy' : ''"
        >
          Epoca gestazionale da eco: {{ pregnancy?.reDateFromCrl }}
        </div>
        <p v-if="pregnancyMore!==''">{{ pregnancyMore }}</p>
      </section>
      <section class="eco">
        <div class="title-par">{{ ecoType.name }}</div>
        <div>
          <span v-if="ecoMethod" class="eco-method">Metodo ecografico: {{ ecoMethod }}, </span>
          <span v-if="ecoTool" class="tool">Strumento utilizzato: {{ ecoTool }}</span>
        </div>
        <div v-if="fetusNumber === 1">Gravidanza singola</div>
        <div v-else>Gravidanza gemellare ({{ fetusNumber }} feti)</div>
        <!-- Gravidanza {{ ecoNumber }}  -->
        <p v-if="ecoMore!==''">{{ ecoMore }}</p>
      </section>
      <section v-if="showBiometria" class="biometria-fetale">
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
          <!-- v-if="item.percentile"  -->
          <div 
            v-show="checkShowBiometria(item)"
            class="biometria-box"
          >
            <div class="name">
              {{ item.text }}
            </div>
            <div class="value">
              {{ item.value }}
            </div>
            <div class="unit">
              {{ item.unit }}
            </div>
            <div v-if="item.percentile" class="chart-percentile">
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
            <div v-if="item.percentile" class="percentile">
              {{ item.percentile }}°p
            </div>
          </div>
          </div>
        <!-- </div> -->
        <p v-if="biometriaMore!==''">{{ biometriaMore }}</p>

      </section>
      <section v-if="showAnatomia" class="anatomy">
        <div class="title-par">Anatomia</div>
        <div class="anatomy-container">
          <div class="anatomy-shown">
            Visualizzati:
            <div 
              class="anatomy-box"
              v-for="(element, index) in anatomy"
              :key="index"
            >
              <div v-if="element.checked && element.comment === ''" class="anatomy-el" >
                &nbsp;{{ element.name }},
              </div>  
            </div>
          </div>
          <div class="anatomy-comment">
            <div 
              class="anatomy-box"
              v-for="(element, index) in anatomy"
              :key="index"
            >
              <div v-if="element.comment" class="anatomy-el" >
                {{ element.name }}
                <span>{{ element.comment }},&nbsp;</span>
              </div>

            </div>

          </div>
          <div class="anatomy-footer">
            Per “visualizzato” si intende che l'organo o apparato indagato presenta caratteristiche ecografiche regolari per l'età gestazionale 
          </div>

        </div>
      </section>

      <section v-if="showDoppler" class="doppler">
        <div class="title-par">
          Doppler 
        </div>
          <div 
            class="doppler-item"
            v-for="(item, index) in doppler"
            :key="index"
          >
            <div v-if="item.percentile || item.MoM" class="doppler-box">
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
                <div v-if="item.name !=='MCA'" >
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
              </div>
              <div v-if="item.MoM" class="uterine-mom">
                {{ item.MoM }} MoM
              </div>
              <div v-else-if="calcPercentileUterine(index)" class="percentile">
                > 95°p
                <!-- {{ item.percentile }}°p -->
              </div>
            </div>
            <div class="more-doppler">
              <div v-if="(item.name == 'PIUDX' ||  item.name == 'PIUSX') && item.incisura" class="incisura">notch presente</div>
              <div v-else-if="(item.name == 'PIUDX' ||  item.name == 'PIUSX') && !item.incisura" class="incisura">notch assente</div>

              <div v-else-if="item.name == 'PIO' && item.incisura == true" class="incisura">EDF positivo</div>
              <div v-else-if="item.name == 'PIO' && item.incisura == false" class="incisura">Incisura assente</div>
            </div>
          </div>
        <!-- </div> -->
        <p v-if="dopplerMore!==''">{{ dopplerMore }}</p>

      </section>
      <section class="more">
        <span v-if="heart">Attività cardiaca presente, </span>
        <span v-else-if="heart == false">Attività cardiaca assente, </span>
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
      <section class="informativa">
        La Persona assistita ha avuto modo di ricevere una adeguata informazione su scopi e limiti dell’esame ecografico attraverso il colloquio con il proprio Ginecologo /Ostetrica / Medico ecografista (al quale ha avuto la possibilità di rivolgere eventuali quesiti), e attraverso la lettura di un foglio informativo allegato al presente referto. Su esplicita richiesta del Medico Ecografista la persona assistita riferisce di aver compreso tutte informazioni ricevute.
        Si informa la persona assistita /Coppia degli esiti dell'esame ecografico effettuato e dei suoi limiti nella individuazione delle anomalie fetali.
      </section>
      <section class="container-signature">
        <div class="signature">
          <div class="empty-space"></div>
          <div class="doctor">
            Dott.ssa Giorgia Mazzoni
          </div>
        </div>
      </section>

    </main>
    <footer>
      <img 
        v-if="office === 'Pralboino'" 
        class="footer-pralboino" 
        src="@/img/footerPralboino.jpg"
      >
    </footer>
  </div>
</template>


<style lang="scss" scoped>
  @import "../assets/print";
</style>
