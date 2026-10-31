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
        infectionsDesc: '',

        // conclusioni
        conclusionNormale: false,
        conclusionContraccettivo: false,
        conclusionContraccettivoDesc: '',
        showContraceptiveInfo: false,
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
          if (gynAnamnesis.infectionsDesc) {
            this.infectionsDesc = gynAnamnesis.infectionsDesc
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
        if (storeData.showContraceptiveInfo) {
          this.showContraceptiveInfo = storeData.showContraceptiveInfo
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
      removeAllergy(index) {
        this.allergies.splice(index, 1)
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
            infectionsDesc: this.infectionsDesc
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
          showContraceptiveInfo: this.showContraceptiveInfo,
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
      <div class="double">
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
          <ul v-if="allergies.length" class="entry-list">
            <li v-for="(allergy, index) in allergies" :key="allergy">
              <span>{{ allergy }}</span>
              <button
                type="button"
                class="entry-remove"
                :aria-label="`Rimuovi ${allergy}`"
                @click="removeAllergy(index)"
              >
                <font-awesome-icon icon="fa-solid fa-xmark" />
              </button>
            </li>
          </ul>
          <p v-else-if="!addMoreAllergie" class="entry-empty">Nessuna allergia registrata</p>
          <div v-if="addMoreAllergie === true" class="entry-add">
            <input
              ref="addAllergyElement"
              v-model="newAllergy"
              @keyup.enter="saveNewAllergy"
              @keyup.esc="addMoreAllergie = false"
              type="text"
              class="custom-input"
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
          <div class="d-flex gap-4">
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
        <ul v-if="pathologicalAnamneses.length" class="entry-list">
          <li
            v-for="(pathologicalAnamnesis, index) in pathologicalAnamneses"
            :key="pathologicalAnamnesis"
          >
            <span>{{ pathologicalAnamnesis }}</span>
            <button
              type="button"
              class="entry-remove"
              :aria-label="`Rimuovi ${pathologicalAnamnesis}`"
              @click="removePathologicalAnamnesis(index)"
            >
              <font-awesome-icon icon="fa-solid fa-xmark" />
            </button>
          </li>
        </ul>
        <p v-else-if="!addMorePathologicalAnamnesis" class="entry-empty">Nessuna voce registrata</p>

        <div v-if="addMorePathologicalAnamnesis === true" class="entry-add-group">
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
          <div class="entry-add">
            <input
              ref="addPathologicalAnamnesisElement"
              v-model="newPathologicalAnamnesis"
              @keyup.enter="saveNewPathologicalAnamnesis"
              @keyup.esc="addMorePathologicalAnamnesis = false"
              type="text"
              class="custom-input"
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
            <div class="w-48">Infezioni</div>
            <textarea
              class="flex-grow"
              placeholder="Dettagli Infezioni"
              name="infectionsDesc"
              id="infectionsDesc"
              v-model="infectionsDesc"
            ></textarea>
          </div>
        </div>
      </section>
      <section>
        <div class="title">Esame obiettivo</div>
        <div class="d-flex align-items-center gap-4 mb-4">
          <label class="custom-label w-48" for="es">ES</label>
          <input class="input-large" type="text" name="es" id="es" v-model="es" />
        </div>
        <div class="d-flex align-items-center gap-4 mb-4">
          <label class="custom-label w-48" for="eog">EOG</label>
          <input class="input-large" type="text" name="eog" id="eog" v-model="eog" />
        </div>
        <div class="d-flex align-items-center gap-4 mb-4">
          <label class="custom-label w-48" for="eco_tv">ECO TV</label>
          <input class="input-large" type="text" name="eco_tv" id="eco_tv" v-model="eco_tv" />
        </div>
      </section>
      <section>
        <div class="title">Conclusioni</div>
        <div class="d-flex align-items-center gap-1">
          <label class="custom-label w-48" for="conclusione-normale">Normale</label>
          <input
            class="custom-input"
            type="checkbox"
            name="conclusione"
            id="conclusione-normale"
            v-model="conclusionNormale"
            value="Normale"
          />
        </div>
        <div class="d-flex items-center gap-1 h-12">
          <label class="custom-label w-48" for="conclusione-contraccettivo">Contraccettivo</label>
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
            style="margin-bottom: 0"
            class="ml-4"
            placeholder="Specifica contraccettivo"
            type="text"
            name="conclusione-contraccettivo-desc"
            id="conclusione-contraccettivo-desc"
            v-model="conclusionContraccettivoDesc"
          />
        </div>
        <div class="d-flex align-items-center gap-1 mb-4">
          <label class="custom-label w-48" for="conclusione-normale">
            Informativa contraccettivi
          </label>
          <input
            class="custom-input"
            type="checkbox"
            name="conclusione"
            id="conclusione-normale"
            v-model="showContraceptiveInfo"
            value="Normale"
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
      <button class="print" @click="print()">Anteprima di stampa</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .add-more,
  .icon-delete,
  .icon-check {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    font-size: 16px;
    border-radius: var(--radius);
    border: 1px solid var(--line-strong);
    cursor: pointer;
    &:hover {
      background-color: var(--hover);
    }
  }
  .add-more {
    color: var(--accent);
  }
  .icon-delete {
    color: var(--danger);
  }
  .icon-check {
    color: var(--success);
  }
  .input-large {
    width: 400px !important;
  }
</style>
