<script>
  import Informations from '@/components/Informations.vue'
  import ContentsContraceptive from '@/components/consents/ContentsContraceptive.vue'
  import { ombelicaleStd95RangeValues, uterineStd95RangeValues } from '@/utils/uterineVal.js'
  import { storeModel } from '@/utils/storeModel.js'

  export default {
    name: 'VisitaGinecologiaPrint',
    components: {
      Informations,
      ContentsContraceptive
    },
    data() {
      return {
        date: '',
        xPosition: 0,
        formattingDateOfBirth: '',
        formattingPregnancyEnd: '',
        formattingPregnancyStart: '',
        formattingDeliveryCRL: '',
        showBiometria: false,
        showDoppler: false,
        showAnatomia: false,
        enableNT: false
      }
    },
    computed: {
      // Store data getters
      user: {
        get() {
          return this.$store.state.user
        }
      },
      office: {
        get() {
          return this.$store.state.office
        }
      },
      patient: {
        get() {
          return this.$store.state.name + ' ' + this.$store.state.surname
        }
      },
      patientMoreText: {
        get() {
          return this.$store.state.patientMoreText
        }
      },

      dateOfBirth: {
        get() {
          return this.$store.state.dateOfBirth
        }
      },
      bmi: {
        get() {
          return this.$store.state.bmi
        }
      },
      // Visita Ginecologica Print Data getters
      reason: {
        get() {
          return this.$store.state.visitaGinecologicaPrintData.reason
        }
      },
      allergies: {
        get() {
          return this.$store.state.visitaGinecologicaPrintData.allergies
        }
      },
      familyAnamnesis: {
        get() {
          return this.$store.state.visitaGinecologicaPrintData.familyAnamnesis
        }
      },
      trombo: {
        get() {
          return this.$store.state.visitaGinecologicaPrintData.trombo
        }
      },
      pathologicalAnamneses: {
        get() {
          return this.$store.state.visitaGinecologicaPrintData.pathologicalAnamneses
        }
      },
      smoker: {
        get() {
          return this.$store.state.visitaGinecologicaPrintData.smoker
        }
      },
      cigarettesPerDay: {
        get() {
          return this.$store.state.visitaGinecologicaPrintData.cigarettesPerDay
        }
      },
      papTest: {
        get() {
          return {
            year: this.$store.state.visitaGinecologicaPrintData.papTestYear,
            result: this.$store.state.visitaGinecologicaPrintData.papTestResult
          }
        }
      },
      hpv: {
        get() {
          console.log(this.$store.state.visitaGinecologicaPrintData.hpv)
          return {
            date: this.$store.state.visitaGinecologicaPrintData.hpvDate,
            result: this.$store.state.visitaGinecologicaPrintData.hpv
          }
        }
      },
      gynecologicalAnamnesis: {
        get() {
          return this.$store.state.visitaGinecologicaPrintData.gynecologicalAnamnesis
        }
      },
      objectiveExam: {
        get() {
          return this.$store.state.visitaGinecologicaPrintData.objectiveExam
        }
      },
      conclusion: {
        get() {
          return {
            normale: this.$store.state.visitaGinecologicaPrintData.conclusionNormale,
            contraccettivo:
              this.$store.state.visitaGinecologicaPrintData.conclusionContraccettivoDesc,
            showContraceptiveInfo:
              this.$store.state.visitaGinecologicaPrintData.showContraceptiveInfo,
            text: this.$store.state.visitaGinecologicaPrintData.conclusion
          }
        }
      }
    },

    created() {
      this.$store.commit('SET_ACTIVE_PAGE', 'Stampa visita ginecologica')
      this.date = dayjs().format('DD/MM/YYYY')

      this.formattingDateOfBirth = this.formatDate(this.dateOfBirth)

      // scrolla a top
      window.scrollTo(0, 0)
    },
    methods: {
      print() {
        window.print()
      },
      comeBack() {
        this.$router.back()
      },
      formatDate(date) {
        return date ? dayjs(date).format('DD/MM/YYYY') : ''
      }
    }
  }
</script>

<template>
  <div>
    <header>
      <div class="top-header d-flex justify-between">
        <div v-if="office?.id" class="img">
          <div class="section-logo-dese" v-if="office.id === 'desenzano'">
            <img class="img-logo-dese" src="@/img/logo_sant_angela.png" />
            <p>Promises S.r.l.</p>
            <p>Via Adua n. 1</p>
            <p>25015 Desenzano del Garda (Bs)</p>
            <p>P.iva 04251180982</p>
            <br />
            <p>Direttore Sanitario Dr. Marco Gandolfi</p>
          </div>
          <!-- <img 
            v-if="office === 'Desenzano'" 
            class="img-dese" 
            src="@/img/headerDese.png"
            > -->
          <img
            v-else-if="office.id === 'pralboino'"
            class="img-pralboino"
            src="@/img/headerPralboino.jpg"
          />
          <!-- src="/img/headerPralboino.jpg" -->
        </div>
        <div
          class="user-info"
          :class="!office?.id ? '' : 'text-right'"
          v-if="user.name === 'Giorgia'"
        >
          <p>Dott.ssa Giorgia Mazzoni</p>
          <p>Medico chirurgo</p>
          <p>specialista in Ginecologia e Ostetricia</p>
          <p>N. isc. Ordine PR 6858</p>
          <p>Mail: giorgia.mazzoni@poliambulanza.it</p>
        </div>
      </div>
      <div class="date">Data: {{ date }}</div>
    </header>

    <main>
      <!-- informazioni paziente -->
      <section class="patient">
        Paziente: {{ patient }}, data di nascita: {{ formattingDateOfBirth }}
        <p v-if="patientMoreText !== ''">{{ patientMoreText }}</p>
      </section>

      <!-- motivo della visita -->
      <section v-if="reason" class="reason">
        <div class="title-par">Motivo della visita:</div>
        <p>{{ reason }}</p>
      </section>

      <!-- anamnesi familiare -->
      <section class="anamnesis">
        <div class="title-par">Anamnesi familiare:</div>
        <p v-if="trombo == 'true'">Positiva per TEV</p>
        <p v-else>Negativa per TEV</p>
        <p v-if="familyAnamnesis">{{ familyAnamnesis }}</p>
      </section>

      <!-- anamnesi patologica -->
      <section class="pathological-anamnesis">
        <div class="title-par">Anamnesi patologica remota:</div>
        <ul>
          <li v-for="(item, index) in pathologicalAnamneses" :key="index">{{ item }}</li>
        </ul>

        <div>
          <span class="label mr-1">Fumatrice:</span>
          <span v-if="smoker">Sì, {{ cigarettesPerDay }} sigarette al giorno</span>
          <span v-else>No</span>
        </div>
      </section>

      <section v-if="allergies.length > 0" class="allergies">
        <div class="title-par">Allergie:</div>
        <ul>
          <li v-for="(item, index) in allergies" :key="index">{{ item }}</li>
        </ul>
      </section>

      <!-- anamnesi ginecologica -->
      <section class="gynecological-anamnesis">
        <div class="title-par">Anamnesi ginecologica:</div>
        <div>
          <span class="label mr-1">PARA:</span>
          <span>{{ gynecologicalAnamnesis.paraP }}</span>
          <span>{{ gynecologicalAnamnesis.paraX }}</span>
          <span>{{ gynecologicalAnamnesis.paraY }}</span>
          <span>{{ gynecologicalAnamnesis.paraZ }}</span>
          <span v-if="gynecologicalAnamnesis.paraDesc">
            , {{ gynecologicalAnamnesis.paraDesc }}
          </span>
        </div>
        <div>
          <span class="label mr-1">UM:</span>
          <span>{{ formatDate(gynecologicalAnamnesis.lastMenstruationDate) }}</span>
          <span v-if="gynecologicalAnamnesis.lastMenstruationDesc">
            , {{ gynecologicalAnamnesis.lastMenstruationDesc }}
          </span>
        </div>
        <div>
          <span class="label mr-1">Pap test:</span>
          <span>
            {{ papTest.year }} -
            {{ papTest.result }}
          </span>
        </div>
        <div v-if="hpv.result === 'true' || hpv.result === 'false'">
          <span class="label mr-1">HPV:</span>
          <span>
            {{ hpv.result === 'true' ? 'Positivo' : 'Negativo' }}
          </span>
          <span v-if="hpv.date" class="ml-1">in data {{ formatDate(hpv.date) }}</span>
        </div>

        <div v-if="gynecologicalAnamnesis.mammografiaDesc">
          <span class="label mr-1">Mammografia:</span>
          <span>
            {{ gynecologicalAnamnesis.mammografiaDesc }}
          </span>
        </div>
        <div v-if="gynecologicalAnamnesis.allergiesDesc">
          <span class="label mr-1">Allergie:</span>
          <span>
            {{ gynecologicalAnamnesis.allergiesDesc }}
          </span>
        </div>
      </section>

      <!-- esame obiettivo -->
      <section class="objective-exam">
        <div class="title-par">Esame obiettivo:</div>
        <div>
          <span class="label">BMI:</span>
          {{ bmi }}
        </div>

        <div v-if="objectiveExam.es">
          <span class="label mr-1">ES:</span>
          {{ objectiveExam.es }}
        </div>
        <div v-if="objectiveExam.eog">
          <span class="label mr-1">EOG:</span>
          {{ objectiveExam.eog }}
        </div>
        <div v-if="objectiveExam.eco_tv">
          <span class="label mr-1">Eco TV:</span>
          {{ objectiveExam.eco_tv }}
        </div>
      </section>

      <!-- conclusioni -->
      <section class="conclusion">
        <div class="title-par">Conclusioni:</div>
        <p v-if="conclusion.normale">Reperto pelvico regolare</p>
        <p v-if="conclusion.contraccettivo">
          Contraccettivo: {{ conclusion.contraccettivo }}, si esegue counseling
        </p>
        <p v-if="conclusion.text">{{ conclusion.text }}</p>
      </section>
      <ContentsContraceptive v-if="conclusion.showContraceptiveInfo" />
    </main>
    <footer>
      <img v-if="office === 'Pralboino'" class="footer-pralboino" src="@/img/footerPralboino.jpg" />
    </footer>
  </div>
</template>

<style lang="scss" scoped>
  @use '@/assets/print';
</style>
