<script>
  import PopupMessage from '@/components/PopupMessage.vue'

  import Patient from '@/components/sections/Patient.vue'
  import Office from '@/components/sections/Office.vue'

  import PapTest from '@/components/visitModules/PapTest.vue'

  import { Reasons, SavedPathologicalAnamneses } from '../const/visits'

  export default {
    name: 'VisitaGinecologica',
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
        reason: '',
        allergies: [],
        addMoreAllergie: false,
        newAllergy: '',

        // anamnesi familiare
        familyAnamnesis: '',
        trombo: 'false',

        // anamnesi patologica remota
        pathologicalAnamneses: [],
        addMorePathologicalAnamnesis: false,
        newPathologicalAnamnesis: '',
        smoker: false,
        cigarettesPerDay: null,

        // anamnesi ginecologica
        paraP: 0,
        paraX: 0,
        paraY: 0,
        paraZ: 0,
        paraDesc: '',
        lastMenstruationDate: null,
        lastMenstruationDesc: '',
        mammografiaDesc: '',
        allergiesDesc: '',

        // conclusioni
        conclusionNormale: false,
        conclusionContraccettivo: false,
        conclusionContraccettivoDesc: '',
        conclusion: '',

        selectdCities: null,
        es: '',
        eog: '',
        eco_tv: ''
      }
    },
    created() {
      this.$store.commit('SET_ACTIVE_PAGE', 'Visita ginecologica')
      this.loadDataFromStore()
    },
    methods: {
      loadDataFromStore() {
        const storeData = this.$store.state.visitaGinecologicaPrintData

        // Pre-popola i dati se presenti nello store
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
        if (storeData.smoker) {
          this.smoker = storeData.smoker
        }
        if (storeData.cigarettesPerDay) {
          this.cigarettesPerDay = storeData.cigarettesPerDay
        }
        if (storeData.gynecologicalAnamnesis) {
          const gynAnamnesis = storeData.gynecologicalAnamnesis
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
          if (gynAnamnesis.allergiesDesc) {
            this.allergiesDesc = gynAnamnesis.allergiesDesc
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
        }
        if (storeData.conclusionNormale) {
          this.conclusionNormale = storeData.conclusionNormale
        }
        if (storeData.conclusionContraccettivoDesc) {
          this.conclusionContraccettivo = true
          this.conclusionContraccettivoDesc = storeData.conclusionContraccettivoDesc
        }
        if (storeData.conclusion) {
          this.conclusion = storeData.conclusion
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
        this.$store.commit('SET_VISITA_GINECOLOGICA_PRINT_DATA', {
          reason: this.reason,
          allergies: this.allergies,
          familyAnamnesis: this.familyAnamnesis,
          trombo: this.trombo,
          pathologicalAnamneses: this.pathologicalAnamneses,
          smoker: this.smoker,
          cigarettesPerDay: this.cigarettesPerDay,
          gynecologicalAnamnesis: {
            paraP: this.paraP,
            paraX: this.paraX,
            paraY: this.paraY,
            paraZ: this.paraZ,
            paraDesc: this.paraDesc,
            lastMenstruationDate: this.lastMenstruationDate,
            lastMenstruationDesc: this.lastMenstruationDesc,
            mammografiaDesc: this.mammografiaDesc,
            allergiesDesc: this.allergiesDesc
          },
          objectiveExam: {
            es: this.es,
            eog: this.eog,
            eco_tv: this.eco_tv
          },
          conclusionNormale: this.conclusionNormale,
          conclusionContraccettivoDesc: this.conclusionContraccettivo
            ? this.conclusionContraccettivoDesc
            : '',
          conclusion: this.conclusion
        })
        this.$store.commit('SET_PRINT_TYPE', 'visita-ginecologica')
        this.$router.push({ name: 'Print' })
      }
    }
  }
</script>

<template>
  <div class="visita-ginecologica form">
    <div class="form">
      <Office @print="print()" />
      <Patient />
      <div class="d-flex justify-content-between align-items-center gap-3">
        <section class="reason">
          <div class="title">Motivo della visita</div>
          <div class="mb-4 w-full">
            <select @change="setReason">
              <option disabled selected value>-- select an option --</option>
              <option v-for="reason in reasons" :key="reason.value" :value="reason.value">
                {{ reason.label }}
              </option>
            </select>
          </div>
          <div class="description">
            <textarea
              class="w-full"
              v-model="reason"
              rows="8"
              placeholder="Descrizione del motivo della visita"
              style="resize: none"
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
          placeholder="Testo aggiuntivo anamnesi familiare"
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
            <option value="">Altro</option>
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

        <!-- fumo -->
        <div class="d-flex items-center gap-4 h-12">
          <div class="d-flex items-center gap-2 w-48">
            <input
              type="checkbox"
              class="custom-input"
              name="smoker"
              id="smoker"
              v-model="smoker"
            />
            <label for="smoker">Fumo</label>
          </div>
          <input
            v-if="smoker"
            type="number"
            class=""
            placeholder="Sigarette al giorno"
            v-model="cigarettesPerDay"
          />
        </div>
      </section>
      <section>
        <div class="title">Anamnesi ginecologica</div>
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
              placeholder="Dettagli gravidanze"
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
              placeholder="Dettagli UM"
              name="lastMenstruationDesc"
              id="lastMenstruationDesc"
              v-model="lastMenstruationDesc"
            ></textarea>
          </div>

          <PapTest visit-store="visitaGinecologicaPrintData" />

          <!-- Mammografia -->
          <div class="d-flex items-center gap-4">
            <div class="w-48">Mammografia</div>
            <textarea
              class="flex-grow"
              placeholder="Dettagli Mammografia"
              name="mammografiaDesc"
              id="mammografiaDesc"
              v-model="mammografiaDesc"
            ></textarea>
          </div>

          <!-- allergie -->
          <div class="d-flex items-center gap-4">
            <div class="w-48">Allergie</div>
            <textarea
              class="flex-grow"
              placeholder="Dettagli Allergie"
              name="allergiesDesc"
              id="allergiesDesc"
              v-model="allergiesDesc"
            ></textarea>
          </div>
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
      </section>
      <section>
        <div class="title">Conclusioni</div>
        <div class="d-flex align-items-center gap-1">
          <label for="conclusione-normale">Normale</label>
          <input
            class="custom-input"
            type="checkbox"
            name="conclusione"
            id="conclusione-normale"
            v-model="conclusionNormale"
            value="Normale"
          />
        </div>
        <div class="d-flex align-items-center gap-1">
          <label for="conclusione-contraccettivo">Contraccettivo</label>
          <input
            class="custom-input"
            type="checkbox"
            name="conclusione"
            id="conclusione-contraccettivo"
            v-model="conclusionContraccettivo"
            value="Contraccettivo"
          />
          <input
            v-if="conclusionContraccettivo"
            class="ml-4"
            placeholder="Specifica contraccettivo"
            type="text"
            name="conclusione-contraccettivo-desc"
            id="conclusione-contraccettivo-desc"
            v-model="conclusionContraccettivoDesc"
          />
        </div>

        <div class="description">
          <textarea
            class="w-full"
            v-model="conclusion"
            rows="4"
            placeholder="Inserisci le conclusioni della visita"
            style="resize: none"
          ></textarea>
        </div>
      </section>
      <button class="print" @click="print()">Print</button>
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
  .allergies-section {
    height: 250px;
  }
  .input-large {
    width: 400px !important;
  }
</style>
