<script>
  import PopupMessage from '@/components/PopupMessage.vue'

  import Patient from '@/components/sections/Patient.vue'
  import Office from '@/components/sections/Office.vue'

  import { Reasons, SavedPathologicalAnamneses } from '../const/visitaGinecologica'

  export default {
    name: 'VisitaGinecologica',
    components: {
      PopupMessage,
      Patient,
      Office
    },
    data() {
      return {
        reasons: Reasons,
        savedPathologicalAnamneses: SavedPathologicalAnamneses,
        reason: '',
        allergies: [],
        addMoreAllergie: false,
        newAllergy: '',
        familyAnamnesis: '',
        pathologicalAnamneses: [],
        addMorePathologicalAnamnesis: false,
        newPathologicalAnamnesis: '',
        paraP: 0,
        paraX: 0,
        paraY: 0,
        paraZ: 0,
        lastPregnancyDate: null,
        papTest: false,
        conclusion: ''
      }
    },
    mounted() {},
    methods: {
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
      }
    }
  }
</script>

<template>
  <div class="visita-ginecologica form">
    <h1>Visita ginecologica</h1>
    <div class="form">
      <Office @print="showPrint = true" />
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
            <div class="w-48">Ultima Gravidanza</div>
            <input type="date" v-model="lastPregnancyDate" />
          </div>
          <div class="d-flex align-items-start gap-4">
            <div class="w-48">Pap test</div>
            <div class="d-flex gap-2 items-center">
              <input type="checkbox" class="w-auto mb-0" v-model="papTest" />
              <label for="papTest">fatto</label>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="title">Esame obiettivo</div>
        <div class="es">
          <label for="type">ES</label>
          <select v-model="es">
            <option value="transaddominale">Transaddominale</option>
            <option value="transvaginale">Transvaginale</option>
            <option value="transaddominale e trasvaginale">Transaddominale e Trasvaginale</option>
          </select>
        </div>
        <div></div>
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
</style>
