<script>
  import PopupMessage from '@/components/PopupMessage.vue'

  import Patient from '@/components/sections/Patient.vue'
  import Office from '@/components/sections/Office.vue'

  import PapTest from '@/components/visitModules/PapTest.vue'

  import { Reasons, SavedPathologicalAnamneses, reports } from '../const/visits'

  export default {
    name: 'VisitaOstetrica',
    components: {
      PopupMessage,
      Patient,
      Office,
      PapTest
    },
    data() {
      return {
        reasons: Reasons,
        savedPathologicalAnamneses: SavedPathologicalAnamneses,

        // UM and redate
        activeDateSelection: 'start',
        startDate: '',
        deliveryDate: '',
        deliveryDateFormatting: '',
        epocaGestazionale: '',
        enableCRLReDate: false,
        externalCRLReDate: false,
        reDateFromCrl: false,
        deliveryDateFromCRLFormatting: '',
        deliveryDateFromCRL: '',
        decimalWeeks: 0,
        decimalWeeksFromCRL: 0,
        redatingPanel: false,
        crlWeeks: 0,
        crlDays: 0,
        pregnancy: {},

        reason: '',
        allergies: [],
        addMoreAllergie: false,
        newAllergy: '',

        // anamnesi familiare
        familyAnamnesis: '',
        trombo: 'false',

        pathologicalAnamneses: [],
        addMorePathologicalAnamnesis: false,
        newPathologicalAnamnesis: '',
        paraP: 0,
        paraX: 0,
        paraY: 0,
        paraZ: 0,
        paraDesc: '',
        lastMenstruationDate: null,
        lastMenstruationDesc: '',
        pregnancyMore: false,
        mammografiaDesc: '',
        reports: reports,
        selectedReport: '',
        conclusion: '',
        selectdCities: null,

        // anamnesi patologica remota
        es: '',
        eog: '',
        eco_tv: '',
        pa: '',

        // esami
        emogruppo: '',
        coombs: '',
        ogtt: '',

        // screening
        testCombinato: '',
        nipt: '',

        // disgnosi invasiva
        amniocentesi: false,
        villocentesi: false,
        esitoCariotipo: '',

        // infections
        itchingReason: ''
      }
    },
    watch: {
      deliveryDateFromCRL(val) {
        this.deliveryDateFromCRLFormatting = dayjs(val).format('DD/MM/YYYY')
        this.pregnancy.deliveryDateFromCRL = this.getDeliveryDateFromDecimalWeeks(
          this.decimalWeeksFromCRL
        )
      },
      deliveryDate(val) {
        this.deliveryDateFormatting = dayjs(val).format('DD/MM/YYYY')
      },
      decimalWeeks(val) {
        this.reason = `Gravida para a ${parseInt(val)} settimane di gestazione`
      }
    },
    created() {
      this.$store.commit('SET_ACTIVE_PAGE', 'Visita ostetrica')
      this.loadDataFromStore()
    },
    methods: {
      loadDataFromStore() {
        const storeData = this.$store.state.visitaOstetricaPrintData

        // Pre-popola i dati se presenti nello store
        if (storeData.pregnancy) {
          this.pregnancy = { ...storeData.pregnancy }
        }
        if (storeData.reason) {
          this.reason = storeData.reason
        }
        if (storeData.allergies && storeData.allergies.length > 0) {
          this.allergies = [...storeData.allergies]
        }
        if (storeData.familyAnamnesis) {
          this.familyAnamnesis = storeData.familyAnamnesis
        }
        if (storeData.trombo) {
          this.trombo = storeData.trombo
        }
        if (storeData.pathologicalAnamneses && storeData.pathologicalAnamneses.length > 0) {
          this.pathologicalAnamneses = [...storeData.pathologicalAnamneses]
        }
        if (storeData.obstetricAnamnesis) {
          const gynAnamnesis = storeData.obstetricAnamnesis
          if (gynAnamnesis.paraP !== null) {
            this.paraP = gynAnamnesis.paraP
          }
          if (gynAnamnesis.paraX !== null) {
            this.paraX = gynAnamnesis.paraX
          }
          if (gynAnamnesis.paraY !== null) {
            this.paraY = gynAnamnesis.paraY
          }
          if (gynAnamnesis.paraZ !== null) {
            this.paraZ = gynAnamnesis.paraZ
          }
          if (gynAnamnesis.paraDesc) {
            this.paraDesc = gynAnamnesis.paraDesc
          }
          if (gynAnamnesis.lastMenstruationDate) {
            this.lastMenstruationDate = gynAnamnesis.lastMenstruationDate
          }
          if (gynAnamnesis.lastMenstruationDesc) {
            this.lastMenstruationDesc = gynAnamnesis.lastMenstruationDesc
          }
          if (gynAnamnesis.mammografiaDesc) {
            this.mammografiaDesc = gynAnamnesis.mammografiaDesc
          }
          if (gynAnamnesis.emogruppo) {
            this.emogruppo = gynAnamnesis.emogruppo
          }
          if (gynAnamnesis.coombs) {
            this.coombs = gynAnamnesis.coombs
          }
          if (gynAnamnesis.ogtt) {
            this.ogtt = gynAnamnesis.ogtt
          }
          if (gynAnamnesis.testCombinato) {
            this.testCombinato = gynAnamnesis.testCombinato
          }
          if (gynAnamnesis.nipt) {
            this.nipt = gynAnamnesis.nipt
          }
          if (gynAnamnesis.amniocentesi) {
            this.amniocentesi = gynAnamnesis.amniocentesi
          }
          if (gynAnamnesis.villocentesi) {
            this.villocentesi = gynAnamnesis.villocentesi
          }
          if (gynAnamnesis.esitoCariotipo) {
            this.esitoCariotipo = gynAnamnesis.esitoCariotipo
          }
        }
        if (storeData.objectiveExam) {
          const objExam = storeData.objectiveExam
          if (objExam.es) {
            this.es = objExam.es
          }
          if (objExam.eog) {
            this.eog = objExam.eog
          }
          if (objExam.eco_tv) {
            this.eco_tv = objExam.eco_tv
          }
          if (objExam.pa) {
            this.pa = objExam.pa
          }
        }
        if (storeData.infections) {
          this.itchingReason = storeData.infections.itchingReason
        }
        if (storeData.conclusion) {
          this.conclusion = storeData.conclusion
        }
        // Ricalcola le date se ci sono dati di gravidanza
        if (this.pregnancy.start) {
          this.startDate = this.pregnancy.start
          this.calcPregnancyDate()
        }
      },
      setReason(event) {
        this.reason = event.target.value
      },
      addNewAllergy() {
        this.addMoreAllergie = true
        this.newAllergy = ''
        setTimeout(() => {
          this.$refs.addAllergyElement.focus()
        }, 10)
      },
      saveNewAllergy() {
        if (this.newAllergy.trim()) {
          this.allergies.push(this.newAllergy.trim())
          this.newAllergy = ''
          this.addMoreAllergie = false
        }
      },
      addPathologicalAnamnesis() {
        this.addMorePathologicalAnamnesis = true
        this.newPathologicalAnamnesis = ''
        setTimeout(() => {
          this.$refs.addPathologicalAnamnesisSelectElement.focus()
        }, 10)
      },
      setPathologicalAnamnesis(event) {
        this.newPathologicalAnamnesis = event.target.value
        setTimeout(() => {
          this.$refs.addPathologicalAnamnesisElement.focus()
        }, 10)
      },
      saveNewPathologicalAnamnesis() {
        if (this.newPathologicalAnamnesis.trim()) {
          this.pathologicalAnamneses.push(this.newPathologicalAnamnesis.trim())
          this.newPathologicalAnamnesis = ''
          this.addMorePathologicalAnamnesis = false
        }
      },
      removePathologicalAnamnesis(index) {
        this.pathologicalAnamneses.splice(index, 1)
      },
      print() {
        // Imposta i dati nello store per il componente Print
        this.$store.commit('SET_VISITA_OSTETRICA_PRINT_DATA', {
          reason: this.reason,
          allergies: this.allergies,
          familyAnamnesis: this.familyAnamnesis,
          trombo: this.trombo,
          pathologicalAnamneses: this.pathologicalAnamneses,
          obstetricAnamnesis: {
            paraP: this.paraP,
            paraX: this.paraX,
            paraY: this.paraY,
            paraZ: this.paraZ,
            paraDesc: this.paraDesc,
            lastMenstruationDate: this.lastMenstruationDate,
            lastMenstruationDesc: this.lastMenstruationDesc,
            mammografiaDesc: this.mammografiaDesc,
            emogruppo: this.emogruppo,
            coombs: this.coombs,
            ogtt: this.ogtt,
            testCombinato: this.testCombinato,
            nipt: this.nipt,
            amniocentesi: this.amniocentesi,
            villocentesi: this.villocentesi,
            esitoCariotipo: this.esitoCariotipo
          },
          objectiveExam: {
            es: this.es,
            eog: this.eog,
            eco_tv: this.eco_tv,
            pa: this.pa
          },
          infections: {
            itchingReason: this.itchingReason
          },
          conclusion: this.conclusion
        })
        this.$store.commit('SET_PRINT_TYPE', 'visita-ostetrica')
        this.$router.push({ name: 'Print' })
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

      getDeliveryDateFromDecimalWeeks(decimal) {
        let daysToDeliveryFromCRL = 280 - decimal * 7
        return dayjs().add(daysToDeliveryFromCRL, 'day').format('YYYY-MM-DD')
      }
    }
  }
</script>

<template>
  <div class="visita-ostetrica form">
    <div class="form">
      <Office @print="print()" />
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
                  {{ reDateFromCrl }}
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
        <section class="allergies-section">
          <div class="title d-flex gap-2 items-center">
            <span>Allergie</span>
            <span>
              <div @click="addNewAllergy()" class="add-more">
                <font-awesome-icon icon="fa-solid fa-plus" />
              </div>
            </span>
          </div>
          <div class="d-flex h-2/3">
            <ul class="d-flex flex-col flex-wrap pl-0">
              <li
                class="d-flex gap-2 justify-content-between items-center w-40"
                v-for="allergy in allergies"
                :key="allergy"
              >
                <span>- {{ allergy }}</span>
              </li>
            </ul>
          </div>
          <div v-if="addMoreAllergie === true" class="d-flex align-items-center gap-2">
            <input
              ref="addAllergyElement"
              v-model="newAllergy"
              @keyup.enter="saveNewAllergy"
              type="text"
              class=""
              placeholder="Inserisci allergia"
            />
            <div @click="saveNewAllergy" class="icon-check">
              <font-awesome-icon icon="fa-solid fa-check" />
            </div>
          </div>
        </section>
      </div>

      <!-- <section class="reason">
          <div class="title">Motivo della visita</div>
          <div class="description">
            <textarea
              class="w-full"
              v-model="reason"
              rows="8"
              placeholder="Descrizione del motivo della visita"
              style="resize: none"
            ></textarea>
          </div>
        </section> -->
      <section>
        <div class="title">Anamnesi familiare</div>
        <div class="d-flex items-center gap-4 mb-4">
          <div class="">Eventi trombotici e cardiovascolari</div>
          <div class="d-flex gap-1">
            <div class="d-flex gap-2 align-items-center">
              <input
                class="custom-input w-4"
                type="radio"
                id="TromboPos"
                name="trombo"
                value="true"
                v-model="trombo"
              />
              <label for="TromboPos">Positivo</label>
            </div>
            <div class="d-flex gap-2 align-items-center">
              <input
                class="custom-input w-4"
                type="radio"
                id="TromboNeg"
                name="trombo"
                value="false"
                v-model="trombo"
              />
              <label for="TromboNeg">Negativo</label>
            </div>
          </div>
        </div>

        <textarea
          class="w-full"
          v-model="familyAnamnesis"
          rows="4"
          placeholder="Descrizione dell'anamnesi familiare"
        ></textarea>
      </section>
      <section>
        <div class="title d-flex gap-2 items-center">
          <span>Anamnesi patologica remota</span>
          <div @click="addPathologicalAnamnesis()" class="add-more">
            <font-awesome-icon icon="fa-solid fa-plus" />
          </div>
        </div>
        <div class="d-flex h-2/3">
          <ul class="pl-0">
            <li
              class="d-flex gap-2 justify-content-between items-center"
              v-for="(pathologicalAnamnesis, index) in pathologicalAnamneses"
              :key="pathologicalAnamnesis"
            >
              <span>- {{ pathologicalAnamnesis }}</span>
              <span @click="removePathologicalAnamnesis(index)" class="icon-delete">
                <font-awesome-icon icon="fa-solid fa-trash" />
              </span>
            </li>
          </ul>
        </div>

        <div v-if="addMorePathologicalAnamnesis === true" class="d-flex flex-col gap-2 w-1/2">
          <select @change="setPathologicalAnamnesis" ref="addPathologicalAnamnesisSelectElement">
            <option disabled selected value>-- select an option --</option>
            <option
              v-for="pathologicalAnamnesis in savedPathologicalAnamneses"
              :key="pathologicalAnamnesis.value"
              :value="pathologicalAnamnesis.value"
            >
              {{ pathologicalAnamnesis.label }}
            </option>
          </select>
          <div class="d-flex align-items-center gap-2 w-full">
            <input
              ref="addPathologicalAnamnesisElement"
              v-model="newPathologicalAnamnesis"
              @keyup.enter="saveNewPathologicalAnamnesis"
              type="text"
              class="flex-grow"
              placeholder="Inserisci anamnesi patologica remota"
            />
            <div @click="saveNewPathologicalAnamnesis" class="icon-check">
              <font-awesome-icon icon="fa-solid fa-check" />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="title">Anamnesi ostetrica</div>
        <div class="d-flex flex-col gap-4">
          <div class="d-flex items-center gap-4">
            <div class="w-48">Gravidanze</div>
            <div class="d-flex gap-2">
              <input type="number" class="custom-input w-8 h-8" v-model="paraP" />
              <input type="number" class="custom-input w-8 h-8" v-model="paraX" />
              <input type="number" class="custom-input w-8 h-8" v-model="paraY" />
              <input type="number" class="custom-input w-8 h-8" v-model="paraZ" />
            </div>
          </div>
          <div class="d-flex items-center gap-4">
            <div class="w-48"></div>
            <textarea
              class="flex-grow"
              placeholder="Descrizione para"
              name="paraDesc"
              id="paraDesc"
              v-model="paraDesc"
            ></textarea>
          </div>
          <div class="d-flex items-center gap-4">
            <div class="w-48">Ultima Mestruazione</div>
            <input type="date" id="lastMenstruationDate" v-model="lastMenstruationDate" />
          </div>
          <div class="d-flex items-center gap-4">
            <div class="w-48"></div>
            <textarea
              class="flex-grow"
              placeholder="Dettaggli UM"
              name="lastMenstruationDesc"
              id="lastMenstruationDesc"
              v-model="lastMenstruationDesc"
            ></textarea>
          </div>

          <PapTest visit-store="visitaOstetricaPrintData" />

          <div class="d-flex items-center gap-4">
            <div class="w-48">Mammografia</div>
            <textarea
              class="flex-grow"
              placeholder="Dettaggli Mammografia"
              name="mammografiaDesc"
              id="mammografiaDesc"
              v-model="mammografiaDesc"
            ></textarea>
          </div>
          <hr class="w-full" />
          <div class="title">Esami</div>

          <div class="d-flex items-center gap-4">
            <div class="w-48">Tipo emogruppo</div>
            <input type="text" name="emogruppo" id="emogruppo" v-model="emogruppo" />
          </div>
          <div class="d-flex items-center gap-4">
            <div class="w-48">Coombs infettivologici</div>
            <input type="text" name="coombs" id="coombs" v-model="coombs" />
          </div>
          <div class="d-flex items-center gap-4">
            <div class="w-48">OGTT</div>
            <input type="text" name="ogtt" id="ogtt" v-model="ogtt" />
          </div>

          <hr class="w-full" />
          <div class="title">Screening</div>

          <div class="d-flex items-center gap-4">
            <div class="w-48">Test combinato</div>
            <input type="text" name="testCombinato" id="testCombinato" v-model="testCombinato" />
          </div>
          <div class="d-flex items-center gap-4">
            <div class="w-48">NIPT</div>
            <input type="text" name="nipt" id="nipt" v-model="nipt" />
          </div>

          <hr class="w-full" />
          <div class="title">Diagnosi prenatale invasiva</div>
          <div class="d-flex items-center gap-4">
            <div class="w-48">amniocentesi</div>
            <input
              class="custom-input"
              type="checkbox"
              name="amniocentesi"
              id="amniocentesi"
              v-model="amniocentesi"
            />
          </div>
          <div class="d-flex items-center gap-4">
            <div class="w-48">villocentesi</div>
            <input
              class="custom-input"
              type="checkbox"
              name="villocentesi"
              id="villocentesi"
              v-model="villocentesi"
            />
          </div>
          <div class="d-flex items-center gap-4">
            <div class="w-48">Esito cariotipo</div>
            <input type="text" name="esitoCariotipo" id="esitoCariotipo" v-model="esitoCariotipo" />
          </div>
        </div>
      </section>

      <section>
        <div class="title">Infezioni</div>
        <div class="d-flex align-items-start gap-4">
          <div class="w-48">Lamenta bruciore e prurito da</div>
          <input type="text" id="itchingReason" v-model="itchingReason" />
        </div>
      </section>
      <section>
        <div class="title">Esame obiettivo</div>
        <div>
          <label for="type">ES</label>
          <input class="input-large" type="text" name="es" id="es" v-model="es" />
        </div>
        <div>
          <label for="type">EOG</label>
          <input class="input-large" type="text" name="eog" id="eog" v-model="eog" />
        </div>
        <div>
          <label for="type">ECO TV</label>
          <input class="input-large" type="text" name="eco_tv" id="eco_tv" v-model="eco_tv" />
        </div>
        <div>
          <label for="type">PA</label>
          <input class="input-large" type="number" name="pa" id="pa" v-model="pa" />
          mmHg
        </div>
      </section>
      <section>
        <div class="title">Conclusioni</div>
        <div class="description">
          <textarea
            class="w-full"
            v-model="conclusion"
            rows="8"
            placeholder="Inserisci le conclusioni della visita"
            style="resize: none"
          ></textarea>
        </div>
      </section>
      <section class="report">
        <div class="title">Referti</div>
        <div class="mb-4 w-full">
          <select v-model="selectedReport">
            <option disabled selected value>-- select an option --</option>
            <option v-for="report in reports" :key="report.value" :value="report.value">
              {{ report.label }}
            </option>
          </select>
        </div>
        <div v-html="selectedReport"></div>
      </section>
      <button class="print" @click="print()">Print</button>

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
            <button @click="reDateCRL">Ridata</button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
  .add-more {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    color: #646cff;
    font-size: 18px;
    border-radius: 8px;
    border: 1px solid transparent;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: all 0.25s;
    &:hover {
      border-color: #646cff;
      background-color: #2a2a2a;
    }
  }

  .icon-delete {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    color: #f44336;
    font-size: 18px;
    border-radius: 8px;
    border: 1px solid transparent;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: all 0.25s;
    &:hover {
      border-color: #f44336;
      background-color: #2a2a2a;
    }
  }

  .icon-check {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    color: #4caf50;
    font-size: 18px;
    border-radius: 8px;
    border: 1px solid transparent;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: all 0.25s;
    &:hover {
      border-color: #4caf50;
      background-color: #2a2a2a;
    }
  }
  /* .allergies-section {
    height: 250px;
  } */
  .input-large {
    width: 400px !important;
  }
</style>
