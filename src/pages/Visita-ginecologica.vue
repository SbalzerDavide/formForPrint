<script>
  import PopupMessage from '@/components/PopupMessage.vue'

  import Patient from '@/components/sections/Patient.vue'
  import Office from '@/components/sections/Office.vue'

  export default {
    name: 'VisitaGinecologica',
    components: {
      PopupMessage,
      Patient,
      Office
    },
    data() {
      return {
        reasons: [
          {
            label: 'Motivo 1',
            value: 'Testo motivo 1'
          },
          {
            label: 'Motivo 2',
            value: 'Testo motivo 2'
          }
        ],
        reason: '',
        allergies: ['Allergia 1', 'Allergia 2'],
        addMoreAllergie: false,
        newAllergy: ''
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
          this.$refs.addAllergy.focus()
        }, 10)
      },
      saveNewAllergy() {
        if (this.newAllergy.trim()) {
          this.allergies.push(this.newAllergy.trim())
          this.newAllergy = ''
          this.addMoreAllergie = false
        }
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
              rows="4"
              placeholder="Descrizione del motivo della visita"
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
                v-for="(allergy, index) in allergies"
                :key="allergy"
              >
                <span>- {{ allergy }}</span>
              </li>
            </ul>
          </div>
          <div v-if="addMoreAllergie === true" class="d-flex align-items-center gap-2">
            <input
              ref="addAllergy"
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
      </section>
      <section>
        <div class="title">Anamnesi patologica remota</div>
      </section>
      <section>
        <div class="title">Anamnesi ginecologica</div>
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
