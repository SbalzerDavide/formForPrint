<script>
  import Print from '@/pages/Print.vue'
  import PopupMessage from '@/components/PopupMessage.vue'
  import ThemeSwitch from '@/components/ThemeSwitch.vue'

  import Patient from '@/components/sections/Patient.vue'
  import Office from '@/components/sections/Office.vue'

  import { storeModel } from '@/utils/storeModel.js'

  import { biometriaFetale } from '@/const/biometriaFetale.js'
  import { anatomy } from '@/const/anatomy.js'
  import { doppler } from '@/const/doppler.js'

  import { estimateCerebelarPercentile } from '@/utils/cerebellar.js'
  import { ntRangeValues } from '@/utils/nt.js'
  import { ombelicaleStd95RangeValues, uterineStd95RangeValues } from '@/utils/uterineVal.js'
  import { getExpectedMeans, getCV, getSkewness, getZScore } from '@/utils/percentile.js'

  export default {
    name: 'EcografiaOstetrica',
    components: {
      Print,
      PopupMessage,
      ThemeSwitch,
      Patient,
      Office
    },
    data() {
      return {
        showPrint: false,
        ecoTypesList: [
          {
            name: 'Ecografia di screening del I trimestre',
            value: '1T'
          },
          {
            name: 'Ecografia di screening del II trimestre',
            value: '2T'
          },
          {
            name: 'Ecografia di screening del III trimestre',
            value: '3T'
          },
          {
            name: 'Controllo accrescimento',
            value: 'CA'
          }
        ],
        ecoMethod: 'transaddominale',
        otherTool: '',
        ecoType: {
          name: 'Ecografia di screening del I trimestre',
          value: '1T'
        },
        ecoNumber: 'singola',
        fetusNumber: 1,
        biometriaFetale: biometriaFetale,
        anatomy: anatomy,
        doppler: doppler,
        heart: true,
        liquid: 'normale',
        direction: 'cefalica',
        placenta: '',
        activeDateSelection: 'start',
        pregnancy: {},
        startDate: '',
        deliveryDate: '',
        deliveryDateFormatting: '',
        epocaGestazionale: '',
        decimalWeeks: 0,
        decimalWeeksFromCRL: 0,
        crlWeeks: 0,
        crlDays: 0,
        deliveryDateFromCRL: '',
        deliveryDateFromCRLFormatting: '',
        crlDaysDiff: 0,
        pregnancyMore: false,
        ecoMore: false,
        biometriaMore: false,
        lastMore: false,
        pregnancyMoreText: '',
        ecoMoreText: '',
        biometriaMoreText: '',
        lastMoreText: '',
        conclusion: '',
        redatingPanel: false,
        enableCRLReDate: false,
        externalCRLReDate: false,
        policyType: null,
        // popupMessage
        popupMessage: '',
        popupType: '',
        triggerPopup: false
      }
    },
    computed: {
      ecoTool: storeModel('ecoTool', 'SET_ECO_TOOL')
    },

    watch: {
      deliveryDate(val) {
        this.deliveryDateFormatting = dayjs(val).format('DD/MM/YYYY')
      },
      enableCRLReDate() {
        // cambiata l'epoca gestazionale aggiorno tutti i valori dei percentili
        let vue = this
        this.biometriaFetale.forEach((el, index) => {
          vue.manageBiometriaFetale(index)
        })
        this.doppler.forEach((el, index) => {
          if (el.value) {
            vue.manageDopler(index)
          }
        })
      },
      deliveryDateFromCRL(val) {
        this.deliveryDateFromCRLFormatting = dayjs(val).format('DD/MM/YYYY')
        this.pregnancy.deliveryDateFromCRL = this.getDeliveryDateFromDecimalWeeks(
          this.decimalWeeksFromCRL
        )
      },
      ecoType(ecoType) {
        if (ecoType.value === '1T') {
          this.conclusion = `Gravidanza intrauterina in regolare evoluzione, CRL corrispondente all’amenorrea. Ovaie regolari allegati al referto n°Operatore accreditato FMF ID: ${this.$store?.state?.user.operatorId}`
        } else if (ecoType.value === '2T') {
          this.conclusion =
            'Biometria fetale nella norma per epoca gestazionale. Morfologia indagabile secondo linee guida SIEOG del II trimestre nella norma. Velocimetria Doppler delle arterie uterine nella norma. Fotogrammi allegati al referto n°'
        } else if (ecoType.value === '3T') {
          this.conclusion =
            'Biometria fetale nella norma per epoca gestazionale. Morfologia indagabile secondo linee guida SIEOG del III trimestre nella norma. Fotogrammi allegati al referto n° '
        } else if (ecoType.value === 'CA') {
          this.conclusion = 'Biometria fetale regolare'
        }
      }
    },
    methods: {
      manageBiometriaFetale(index) {
        let femore = false
        let circonferenzaC = false
        let circonferenzaCValue
        let circonferenzaA = false
        let circonferenzaAValue
        this.biometriaFetale.forEach((el) => {
          if (el.name === 'LF' && el.value) {
            femore = true
          } else if (el.name === 'CC' && el.value) {
            circonferenzaC = true
            circonferenzaCValue = el.value
          } else if (el.name === 'CA' && el.value) {
            circonferenzaA = true
            circonferenzaAValue = el.value
          }
        })
        if (femore && circonferenzaC && circonferenzaA) {
          let weeks
          if (this.enableCRLReDate) {
            weeks = this.decimalWeeksFromCRL
          } else {
            weeks = this.decimalWeeks
          }
          if (weeks >= 25) {
            this.Hadlock()
          }
        }
        if (this.biometriaFetale[index].value) {
          this.calcPercentile(index)
        } else {
          this.biometriaFetale[index].percentile = null
        }
      },
      manageDopler(index) {
        this.calcPercentileDopler(index)
      },
      calcPercentile(index) {
        let ga
        if (this.enableCRLReDate) {
          ga = this.decimalWeeksFromCRL
        } else {
          ga = this.decimalWeeks
        }
        if (ga === 0) {
          this.triggerPopup = true
          this.popupMessage =
            "Inserisci una data relativa all'epoca gestazionale per poter visualizzare i percentili"
          this.popupType = 'warning'
        }
        let mean
        let sd
        let value = this.biometriaFetale[index].value
        if (this.biometriaFetale[index].name === 'CC') {
          mean = -28.2849 + 1.69267 * ga ** 2 - 0.397485 * ga ** 2 * Math.log(ga)
          sd =
            1.98735 +
            0.0136772 * ga ** 3 -
            0.00726264 * ga ** 3 * Math.log(ga) +
            0.000976253 * ga ** 3 * Math.log(ga) ** 2
        } else if (this.biometriaFetale[index].name === 'BPD') {
          if (ga < 14) {
            // uso formula in BPD1
            mean = -28.2805 + 4.0352 * ga - 0.0005024 * ga ** 3
            sd = 0.2388 + 0.094 * ga
          } else if (ga >= 14) {
            // uso formula intergrowth
            mean = 5.60878 + 0.158369 * ga ** 2 - 0.00256379 * ga ** 3
            sd = Math.exp(
              0.101242 +
                0.00150557 * ga ** 3 -
                0.000771535 * ga ** 3 * Math.log(ga) +
                0.0000999638 * ga ** 3 * Math.log(ga) ** 2
            )
          }
        } else if (this.biometriaFetale[index].name === 'CA') {
          mean = -81.3243 + 11.6772 * ga - 0.000561865 * ga ** 3
          sd =
            -4.36302 +
            0.121445 * ga ** 2 -
            0.0130256 * ga ** 3 +
            0.00282143 * ga ** 3 * Math.log(ga)
        } else if (this.biometriaFetale[index].name === 'LF') {
          mean = -39.9616 + 4.32298 * ga - 0.0380156 * ga ** 2
          sd = Math.exp(0.605843 - 42.0014 * ga ** -2 + 0.00000917972 * ga ** 3)
        } else if (this.biometriaFetale[index].name === 'LO') {
          // calcolo omero
          mean = 11.459 * ga - 2.2362 * ga * Math.log(ga) - 63.704
          sd = 0.040292 * ga + 1.3464
        } else if (this.biometriaFetale[index].name === 'CRL') {
          // calcolo CRL
          ga = ga * 7
          mean = -50.6562 + 0.815118 * ga + 0.00535302 * ga ** 2
          sd = -2.21626 + 0.0984894 * ga

          let crl = this.biometriaFetale[index].value
          let meanGa = (40.9041 + 3.21585 * crl ** 0.5 + 0.348956 * crl) / 7
          this.decimalWeeksFromCRL = meanGa

          // modifica per calcolo crl date da qui
          this.deliveryDateFromCRL = this.getDeliveryDateFromDecimalWeeks(this.decimalWeeksFromCRL)
          this.crlWeeks = this.getWeeksFromDecimal(this.decimalWeeksFromCRL)
          this.crlDays = this.getDaysFromDecimal(this.decimalWeeksFromCRL)
          if (this.crlDays == 7) {
            this.crlDays = 0
            this.crlWeeks++
          }
          this.pregnancy.reDateFromCrl = `${this.crlWeeks} settimane + ${this.crlDays} giorni`

          this.crlDaysDiff = Math.round((this.decimalWeeksFromCRL - this.decimalWeeks) * 7)

          // let sdGa = 2.39102 + (0.0193474 * crl);
        } else if (this.biometriaFetale[index].name === 'NT') {
          // calcolo NT
          let crl = this.biometriaFetale.find((el) => el.name == 'CRL').value
          if (crl && crl >= 45 && crl < 85) {
            // il calcolo dell'NT, richiedendo anche il valore di crl,
            // è valido solo entor questi valori in mm di crl
            let nt = this.biometriaFetale[index].value

            if (nt >= ntRangeValues[crl]) {
              this.biometriaFetale[index].over95 = true
            } else {
              this.biometriaFetale[index].over95 = false
            }

            let estimatedMean = -0.8951 + 0.0294 * crl - 0.0001812 * crl ** 2
            mean = 10 ** estimatedMean
            this.biometriaFetale[index].delta = (nt - mean).toFixed(2)
          }
        } else if (this.biometriaFetale[index].name === 'FCF') {
          // calcolo frequenza cardiaca fetale
          mean = 208.8 - 3.78 * ga
          sd = 6.93
        } else if (this.biometriaFetale[index].name === 'TCD') {
          value = value * 0.1 // convert to cm
          // calcolo cervelletto
          let method = 0
          // method 1 from cervelletto giusto.pdf
          // method 2 from bpd1.pdf
          if (method === 1) {
            mean = 2.2451 - 0.188 * ga + 0.0125 * ga ** 2 - 0.00011 * ga ** 3
            sd = -0.2088 + 0.0383 * ga - 0.0015 * ga ** 2 + 0.00003 * ga ** 3
          } else if (method === 2) {
            mean = 6.9519 + 0.03327 * ga ** 2
            sd = -0.5177 + 0.0772 * ga
          }
          let today = dayjs()
          let dayDiff = today.diff(this.startDate, 'day') % 7
          let weekDiff = today.diff(this.startDate, 'week')

          const result = estimateCerebelarPercentile(
            weekDiff,
            dayDiff,
            this.biometriaFetale[index].value
          ) // 22 settimane + 3 giorni, misura = 22 mm
          this.biometriaFetale[index].percentile = result.percentile.toFixed(0)
        } else if (this.biometriaFetale[index].name === 'CM') {
          if (this.biometriaFetale[index].value >= 2 && this.biometriaFetale[index].value <= 10) {
            this.biometriaFetale[index].right = true
          } else {
            this.biometriaFetale[index].right = false
          }
        } else if (this.biometriaFetale[index].name === 'VP') {
          if (this.biometriaFetale[index].value <= 10) {
            this.biometriaFetale[index].right = true
          } else {
            this.biometriaFetale[index].right = false
          }
        }
        if (mean && sd) {
          const normDist = new NormalDistribution(mean, sd)
          let percentile = normDist.cdf(value) * 100
          this.biometriaFetale[index].percentile = percentile.toFixed(0)
        }
      },
      calcPercentileDopler(index) {
        let weeks
        if (this.enableCRLReDate) {
          weeks = this.decimalWeeksFromCRL
        } else {
          weeks = this.decimalWeeks
        }
        if (weeks === 0) {
          this.triggerPopup = true
          this.popupMessage =
            "Inserisci una data relativa all'epoca gestazionale per poter visualizzare i percentili"
          this.popupType = 'warning'
        }
        if (this.doppler[index].name === 'PIO') {
          let pi = this.doppler[index].value
          let zScore =
            -(0.0768617 ** -1) *
            (Math.exp(
              (pi - (1.02944 + 77.7456 * weeks ** -2 - 0.000004455 * weeks ** 3)) *
                -0.0768617 *
                (-0.00645693 + 254.885 * Math.log(weeks) * weeks ** -2 - 715.949 * weeks ** -2) **
                  -1
            ) -
              1)
          const normDist = new NormalDistribution(0, 1)
          let percentile = normDist.cdf(zScore) * 100
          this.doppler[index].percentile = percentile.toFixed(0)
        } else if (this.doppler[index].name === 'PIUDX' || this.doppler[index].name === 'PIUSX') {
          let pi = this.doppler[index].value
          let ga = weeks * 7
          let a = 1.39 - 0.012 * ga + ga ** 2 * 0.0000198
          let mean = Math.exp(a)
          let sd = 0.272 - ga * 0.000259
          const normDist = new NormalDistribution(mean, sd)
          let percentile = normDist.cdf(pi) * 100
          this.doppler[index].percentile = percentile.toFixed(0)
        } else if (this.doppler[index].name === 'MCA') {
          let mean = Math.exp(2.31 + 0.046 * weeks)
          // dell'mca non si calcolano i percentili ma lo scostamento rispetto al valore atteso
          this.doppler[index].MoM = (this.doppler[index].value / mean).toFixed(2)
        } else if (this.doppler[index].name === 'MCAPI') {
          // percentile
          let z
          let mcaPi =
            -7.9753 +
            0.34522 * z +
            0.029215 * z ** 2 +
            0.90777 * weeks -
            0.00169 * weeks * z -
            0.02574 * weeks ** 2 +
            0.00022 * weeks ** 3
          z = 0
          let mean =
            -7.9753 +
            0.34522 * z +
            0.029215 * z ** 2 +
            0.90777 * weeks -
            0.00169 * weeks * z -
            0.02574 * weeks ** 2 +
            0.00022 * weeks ** 3
          this.doppler[index].mean = mean.toFixed(2)
        }
      },
      pointPercentile(value) {
        return `left: ${value}px`
      },
      calcPercentileUterine(index) {
        let weeks
        if (this.enableCRLReDate) {
          weeks = parseInt(this.decimalWeeksFromCRL)
        } else {
          weeks = parseInt(this.decimalWeeks)
        }

        let uterine = this.doppler[index]
        if (this.doppler[index].name == 'PIUDX' || this.doppler[index].name == 'PIUSX') {
          if (uterineStd95RangeValues[weeks] < uterine.value) {
            return true
          } else {
            // serviva per simulare valore più verosimile su grafico ma si rompe se faccio avanti e inetro tra form e print
            // if(uterine.percentile >= 96){
            //   uterine.percentile = 94;
            // }
            return false
          }
        } else if (this.doppler[index].name == 'PIO') {
          if (ombelicaleStd95RangeValues[weeks] < uterine.value) {
            return true
          } else {
            if (uterine.percentile >= 96) {
              uterine.percentile = 94
            }
            return false
          }
        }
      },
      getDeliveryDateFromDecimalWeeks(decimal) {
        let daysToDeliveryFromCRL = 280 - decimal * 7
        return dayjs().add(daysToDeliveryFromCRL, 'day').format('YYYY-MM-DD')
      },
      getWeeksFromDecimal(decimal) {
        return Number.parseInt(decimal)
      },
      getDaysFromDecimal(decimal) {
        let decimalDays = decimal - Math.floor(decimal)
        return (decimalDays * 7).toFixed(0)
      },
      setManuallyCrlReDate(type) {
        if (type == 'weeks') {
          if (this.crlDays >= 7) {
            this.crlDays = 6
          }
          // sto modificando le settimane
          // calcolo primo decimalWeeks
          this.decimalWeeksFromCRL = this.crlWeeks + this.crlDays / 7
          // dopo calcolo le variabili derivate, cioè quelle a loro volta modificabili
          this.deliveryDateFromCRL = this.getDeliveryDateFromDecimalWeeks(this.decimalWeeksFromCRL)
        } else if (type == 'date') {
          // sto modificando la data
          // calcolo primo decimalWeeks
          let pregancyStart = dayjs(this.deliveryDateFromCRL).subtract(280, 'day')
          let diff = dayjs().diff(pregancyStart, 'week', true)
          this.decimalWeeksFromCRL = diff
          // dopo calcolo le variabili derivate, cioè quelle a loro volta modificabili
          this.crlWeeks = this.getWeeksFromDecimal(this.decimalWeeksFromCRL)
          this.crlDays = this.getDaysFromDecimal(this.decimalWeeksFromCRL)
        }
        this.pregnancy.reDateFromCrl = `${this.crlWeeks} settimane + ${this.crlDays} giorni`
      },
      reDateCRL() {
        this.enableCRLReDate = true
        this.redatingPanel = false
        this.pregnancy.deliveryDateFromCRL = this.deliveryDateFromCRL
        // ricalcolo tutti i percentili
        // non lo ricalcolo perchè mi sballa tutti i dati sulla nuova data
        this.triggerPopup = true
        this.popupMessage = 'Verifica i dati inseriti'
        this.popupType = 'warning'
      },
      reDateHcFl() {
        let hc = this.biometriaFetale.find((el) => el.name == 'CC').value
        let fl = this.biometriaFetale.find((el) => el.name == 'LF').value

        if (hc && fl) {
          let gaDays = Math.exp(0.03243 * Math.log(hc) ** 2 + 0.001644 * fl * Math.log(hc) + 3.813)
          this.decimalWeeksFromCRL = gaDays / 7
          this.deliveryDateFromCRL = this.getDeliveryDateFromDecimalWeeks(this.decimalWeeksFromCRL)
          this.crlWeeks = this.getWeeksFromDecimal(this.decimalWeeksFromCRL)
          this.crlDays = this.getDaysFromDecimal(this.decimalWeeksFromCRL)
          this.pregnancy.reDateFromCrl = `${this.crlWeeks} settimane + ${this.crlDays} giorni`
        } else {
          this.triggerPopup = true
          this.popupMessage = 'Non hai abbastanza dati per eseguire il calcolo'
          this.popupType = 'warning'
        }
      },
      calcPregnancyDate() {
        if (this.activeDateSelection === 'start') {
          // ho settato l'ultima mestruazione
          this.deliveryDate = dayjs(this.startDate).add(280, 'day')
          this.pregnancy.start = this.startDate
          this.pregnancy.delivery = this.deliveryDate
        } else if (this.activeDateSelection === 'end') {
          // ho settato data presunta parto
          this.startDate = dayjs(this.deliveryDate).subtract(280, 'day')
          const deliveryDate = dayjs(this.deliveryDate)
          this.pregnancy.delivery = deliveryDate
        }
        let today = dayjs()
        let dayDiff = today.diff(this.startDate, 'day') % 7
        let weekDiff = today.diff(this.startDate, 'week')
        this.decimalWeeks = weekDiff + dayDiff / 7
        this.epocaGestazionale = `${weekDiff} settiname + ${dayDiff} gg`
        this.pregnancy.epocaGestazionale = this.epocaGestazionale
        // propongo la visita del relativo trimestre
        if (this.decimalWeeks < 14) {
          this.ecoType = {
            name: 'Ecografia di screening del I trimestre',
            value: '1T'
          }
        } else if (this.decimalWeeks >= 14 && this.decimalWeeks < 28) {
          this.ecoType = {
            name: 'Ecografia di screening del II trimestre',
            value: '2T'
          }
        } else if (this.decimalWeeks >= 28) {
          this.ecoType = {
            name: 'Ecografia di screening del III trimestre',
            value: '3T'
          }
        }
        // finito il calcolo della data ricalcolo anche i valori inseriti
        let vue = this
        this.biometriaFetale.forEach((el, index) => {
          vue.manageBiometriaFetale(index)
        })
        this.doppler.forEach((el, index) => {
          if (el.value) {
            vue.manageDopler(index)
          }
        })
      },
      Hadlock() {
        // version 1 con hc, ac, fl, e bpd
        // version 4 con hc, ac, e fl
        let version = 1
        let hc = this.biometriaFetale.find((el) => el.name == 'CC').value * 0.1
        let ac = this.biometriaFetale.find((el) => el.name == 'CA').value * 0.1
        let fl = this.biometriaFetale.find((el) => el.name == 'LF').value * 0.1
        let bpd = this.biometriaFetale.find((el) => el.name == 'BPD').value * 0.1
        let esponente
        let efw
        if (version === 4) {
          esponente = 1.326 + 0.0107 * hc + 0.0438 * ac + 0.158 * fl - 0.00326 * ac * fl
        } else if (version === 1) {
          if (bpd) {
            esponente =
              1.3596 +
              0.0064 * hc +
              0.0424 * ac +
              0.174 * fl +
              0.00061 * bpd * ac -
              0.00386 * ac * fl
          } else {
            return
          }
        }
        efw = 10 ** esponente
        this.biometriaFetale[this.biometriaFetale.length - 1].value = efw.toFixed(2)

        // calcolo percentile stima peso
        let ga
        if (this.enableCRLReDate) {
          ga = this.decimalWeeksFromCRL
        } else {
          ga = this.decimalWeeks
        }

        let eX = getExpectedMeans(ga)
        let cv = getCV(ga)
        let sk = getSkewness(ga)
        let lnEfw = Math.log(efw)
        let zScore = getZScore(sk, cv, lnEfw, eX)
        const normDist = new NormalDistribution(0, 1)
        let percentile = normDist.cdf(zScore) * 100
        this.biometriaFetale[this.biometriaFetale.length - 1].percentile = percentile.toFixed(0)
      },
      checkShowBiometria(item) {
        let show = false
        if (item.ecoType.includes(this.ecoType.value)) {
          let weeks
          if (this.enableCRLReDate) {
            weeks = this.decimalWeeksFromCRL
          } else {
            weeks = this.decimalWeeks
          }
          if (item.name === 'FCF') {
            if (weeks >= 10 && weeks < 15) {
              show = true
            }
          } else if (item.name === 'NT') {
            if (weeks >= 11 && weeks < 14) {
              show = true
            }
          } else {
            show = true
          }
        }
        return show
      },
      print() {
        this.showPrint = true
      },
      comeBack() {
        this.showPrint = false
      }
    }
  }
</script>

<template>
  <div v-if="!showPrint" class="form">
    <PopupMessage
      :content="popupMessage"
      position="bottom"
      :type="popupType"
      :show="triggerPopup"
      @showBack="triggerPopup = false"
    />
    <Office @print="showPrint = true" />
    <Patient />
    <div class="double">
      <section class="pregnancy">
        <div class="title">Gravidanza</div>
        <div class="switch">
          <div
            @click="activeDateSelection = 'start'"
            class="selStart"
            :class="activeDateSelection === 'start' ? 'act' : ''"
          >
            Ultima mestruazione
          </div>
          <div
            @click="activeDateSelection = 'end'"
            :class="activeDateSelection === 'end' ? 'act' : ''"
            class="selEnd"
          >
            Data prevista parto
          </div>
          <div class="active" :class="activeDateSelection"></div>
        </div>
        <input
          v-if="activeDateSelection == 'start'"
          @change="calcPregnancyDate"
          v-model="startDate"
          type="date"
        />
        <input
          v-else-if="activeDateSelection == 'end'"
          @change="calcPregnancyDate"
          v-model="deliveryDate"
          type="date"
        />
        <div class="calc-date">
          Data prevista per il parto da U.M.:
          {{ deliveryDateFormatting }}
        </div>
        <div class="epoca-gestazionale">
          Epoca gestazionale da U.M.:
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
              />
              <label for="enableReDating">Applica ridatazione CRL</label>
            </div>
            <div v-show="enableCRLReDate" class="checkbox">
              <input
                type="checkbox"
                name="externalReDating"
                id="externalReDating"
                v-model="externalCRLReDate"
              />
              <label for="externalReDating">Effettuata in precedenza in altra sede</label>
            </div>

            <div v-show="enableCRLReDate" class="re-date-show">
              <div class="ga-crl">
                Epoca gestazionale da eco:
                {{ pregnancy.reDateFromCrl }}
              </div>
              <div class="delivery-crl">
                Data prevista per il parto da eco:
                {{ deliveryDateFromCRLFormatting }}
              </div>
              <!-- {{ parseInt(decimalWeeksFromCRL) }} settimane + {{ ((decimalWeeksFromCRL -  parseInt(decimalWeeksFromCRL)) * 7).toFixed(0) }} giorni -->
            </div>
          </div>
          <div class="action">
            <button @click="redatingPanel = true">Modifica Ridatazione</button>
          </div>
        </div>
        <div class="more-info">
          <div v-if="!pregnancyMore" class="add-more" @click="pregnancyMore = true">+</div>
          <textarea
            v-else
            v-model="pregnancyMoreText"
            placeholder="Aggiungi ulteriori informazioni"
            rows="4"
          ></textarea>
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
            <option value="Samsung WS80">Samsung WS80</option>
            <option value="Samsung HS50">Samsung HS50</option>
            <option value="altro">altro</option>
          </select>
          <input
            type="text"
            v-if="ecoTool == 'altro'"
            v-model="otherTool"
            placeholder="Specificare nome strumento"
            class="other-tool"
          />
        </div>
        <div class="type">
          <label for="type">Tipo</label>
          <select v-model="ecoType">
            <option v-for="(type, index) in ecoTypesList" :key="index" :value="type">
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
          <input v-model="fetusNumber" type="number" name="fetusNumber" id="fetusNumber" />
        </div>
        <div class="more-info">
          <div v-if="!ecoMore" class="add-more" @click="ecoMore = true">+</div>
          <textarea
            v-else
            v-model="ecoMoreText"
            placeholder="Aggiungi ulteriori informazioni"
            rows="4"
          ></textarea>
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
        <label :for="'b-' + index">{{ item.text }}</label>
        <div v-if="item.calc" class="calc">{{ item.value }}</div>
        <input v-else @change="manageBiometriaFetale(index)" v-model="item.value" type="number" />
        <div class="unit">{{ item.unit }}</div>
        <div class="percentile">
          <div v-if="item.percentile != null">{{ item.percentile }}° p</div>
          <div v-else-if="item.right != null" class="right">
            <div v-if="item.right" class="right-ok"></div>
            <div v-else class="right-not-ok"></div>
          </div>
          <div v-else-if="item.name === 'NT' && item.over95">> 95° p</div>
        </div>
        <!-- <button @click="redatingPanel = true" v-if="item.name === 'CRL' && item.value">Imposta Ridatazione</button> -->
        <div v-if="item.name === 'CRL' && item.value" class="crl-diff">
          delta: {{ crlDaysDiff }} gg
        </div>
        <div v-if="item.name === 'NT' && item.delta" class="nt-delta">
          delta: {{ item.delta }}mm
        </div>
      </div>
      <div class="more-info">
        <div v-if="!biometriaMore" class="add-more" @click="biometriaMore = true">+</div>
        <textarea
          v-else
          v-model="biometriaMoreText"
          placeholder="Aggiungi ulteriori informazioni"
          rows="4"
        ></textarea>
      </div>
    </section>
    <section v-show="redatingPanel" class="re-dating-panel">
      <div class="re-dating-background" @click="redatingPanel = false"></div>
      <div class="re-dating-container">
        <div class="panel-title">Ridatazione da CRL</div>
        <div class="old-date">
          <span>Data originale:</span>
          {{ parseInt(decimalWeeks) }} settimane +
          {{ ((decimalWeeks - parseInt(decimalWeeks)) * 7).toFixed(0) }} giorni
        </div>
        <div class="new-date">
          <span>Ridatazione:</span>
          <div class="re-dating-input">
            <div class="number">
              <div>
                <input type="number" v-model="crlWeeks" @change="setManuallyCrlReDate('weeks')" />
                Settimane +
              </div>
              <div>
                <input type="number" v-model="crlDays" @change="setManuallyCrlReDate('weeks')" />
                Giorni
              </div>
            </div>
            <div class="delivery">
              <label>Termine eco:</label>
              <input
                type="date"
                v-model="deliveryDateFromCRL"
                @change="setManuallyCrlReDate('date')"
              />
            </div>
          </div>
        </div>
        <div class="action">
          <button @click="reDateHcFl">Calcola GA da HC e FL</button>
          <button @click="reDateCRL">Ridata</button>
        </div>
      </div>
    </section>
    <section class="anatomy">
      <div class="title">Anatomia</div>
      <div class="anatomy-container">
        <div
          v-for="(element, index) in anatomy"
          :key="index"
          v-show="element.ecoType.includes(ecoType.value)"
          class="anatomy-element"
        >
          <div class="left">
            <div @click="element.showComment = !element.showComment" class="anatomy-more">
              <div v-if="element.showComment">-</div>
              <div v-else>+</div>
            </div>
            <label :for="element.value" :class="element.checked ? 'anatomy-checked' : ''">
              {{ element.name }}
            </label>
          </div>
          <input
            type="checkbox"
            :name="element.value"
            :id="element.value"
            v-model="element.checked"
          />
          <input v-if="element.showComment" v-model="element.comment" type="text" />
        </div>
      </div>
    </section>
    <section class="doppler">
      <div class="title">Doppler</div>
      <div
        class="doppler-item"
        v-for="(item, index) in doppler"
        v-show="
          item.name != 'PIO' || (enableCRLReDate ? decimalWeeksFromCRL >= 19 : decimalWeeks >= 19)
        "
        :key="index"
      >
        <label :for="'b-' + index">{{ item.text }}</label>
        <input @change="manageDopler(index)" v-model="item.value" type="number" />
        <div class="unit">{{ item.unit }}</div>
        <div class="chart-percentile">
          <div v-if="item.name !== 'MCA' && item.name != 'MCAPI'">
            <div class="line"></div>
            <div class="base">
              <div class="middle"></div>
              <div class="point" :style="`left: ${item.percentile - 4}px`"></div>
            </div>
            <div class="line"></div>
          </div>
        </div>
        <div class="percentile">
          <span v-if="item.MoM">{{ item.MoM }} MoM</span>
          <span v-else-if="item.mean">mean: {{ item.mean }}</span>
          <span v-else-if="calcPercentileUterine(index)">> 95°p</span>
          <!-- {{ item.percentile }}°p -->
        </div>
        <!-- <div class="percentile">{{ item.percentile }}
          <span v-show="item.name != 'MCA' && item.value">
            ° p
          </span>
        </div> -->
        <div v-if="item.name != 'MCA' && item.name != 'MCAPI'" class="check-doppler">
          <input :name="item.name" :id="item.name" type="checkbox" v-model="item.incisura" />
          <label v-if="item.name == 'PIUDX' || item.name == 'PIUSX'" :for="item.name">
            Incisura
          </label>
          <label v-else-if="item.name == 'PIO'" :for="item.name">EDF positivo</label>
        </div>
      </div>
    </section>
    <section class="more">
      <div class="title">Altro</div>
      <div class="att-card">
        <div class="name">Attività cardiaca</div>
        <input v-model="heart" type="radio" name="att-card" id="att-card-pres" :value="true" />
        <label for="att-card-pres">Presente</label>
        <input v-model="heart" type="radio" name="att-card" id="att-card-ass" :value="false" />
        <label for="att-card-ass">Assente</label>
      </div>
      <div v-show="ecoType.value !== '1T'" class="presentazione">
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
        <div v-if="!lastMore" class="add-more" @click="lastMore = true">+</div>
        <textarea
          v-else
          v-model="lastMoreText"
          placeholder="Aggiungi ulteriori informazioni"
          rows="4"
        ></textarea>
      </div>
    </section>

    <section class="conclusion">
      <div class="title">Conclusioni</div>
      <textarea v-model="conclusion" rows="4"></textarea>
    </section>

    <section class="policy">
      <div class="title">Informativa</div>
      <select v-model="policyType">
        <option :value="null">Non inserire</option>
        <option value="1">11-13 settimane</option>
        <option value="2">II trimestre</option>
        <option value="3">III trimestre</option>
      </select>
    </section>

    <button class="print" @click="print">Print</button>
  </div>
  <Print
    v-else
    @comeBack="comeBack"
    :pregnancy="pregnancy"
    :decimalWeeks="decimalWeeks"
    :enableCRLReDate="enableCRLReDate"
    :externalCRLReDate="externalCRLReDate"
    :decimalWeeksFromCRL="decimalWeeksFromCRL"
    :ecoType="ecoType"
    :ecoMethod="ecoMethod"
    :ecoTool="ecoTool != 'altro' ? ecoTool : otherTool"
    :ecoNumber="ecoNumber"
    :fetusNumber="fetusNumber"
    :biometriaFetale="biometriaFetale"
    :anatomy="anatomy"
    :doppler="doppler"
    :heart="heart"
    :direction="ecoType.value !== '1T' ? direction : ''"
    :liquid="liquid"
    :placenta="placenta"
    :pregnancyMore="pregnancyMoreText"
    :ecoMore="ecoMoreText"
    :biometriaMore="biometriaMoreText"
    :lastMore="lastMoreText"
    :conclusion="conclusion"
    :policyType="policyType"
  />
</template>
