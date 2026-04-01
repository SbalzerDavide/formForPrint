<script>
  import Informations from '@/components/Informations.vue'
  import DownSyndromeConsents from '@/components/consents/DownSyndromeConsents.vue'
  import { ombelicaleStd95RangeValues, uterineStd95RangeValues } from '@/utils/uterineVal.js'
  import { storeModel } from '@/utils/storeModel.js'
  import { testCombinatoMap } from '@/const/visits.js'

  export default {
    name: 'VisitaOstetricaPrint',
    components: {
      Informations,
      DownSyndromeConsents
    },
    data() {
      return {
        date: '',
        xPosition: 0,
        formattingDateOfBirth: '',
        formattingPregnancyEnd: '',
        formattingPregnancyStart: '',
        formattingDeliveryCRL: '',
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
      height: {
        get() {
          return this.$store.state.height
        }
      },
      normalWeight: {
        get() {
          return this.$store.state.normalWeight
        }
      },
      actualWeight: {
        get() {
          return this.$store.state.actualWeight
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
          return this.$store.state.visitaOstetricaPrintData.reason
        }
      },
      allergies: {
        get() {
          return this.$store.state.visitaOstetricaPrintData.allergies
        }
      },
      familyAnamnesis: {
        get() {
          return this.$store.state.visitaOstetricaPrintData.familyAnamnesis
        }
      },
      trombo: {
        get() {
          return this.$store.state.visitaOstetricaPrintData.trombo
        }
      },
      pathologicalAnamneses: {
        get() {
          return this.$store.state.visitaOstetricaPrintData.pathologicalAnamneses
        }
      },
      smoker: {
        get() {
          return this.$store.state.visitaOstetricaPrintData.smoker
        }
      },
      cigarettesPerDay: {
        get() {
          return this.$store.state.visitaOstetricaPrintData.cigarettesPerDay
        }
      },
      pregnancy: {
        get() {
          return this.$store.state.visitaOstetricaPrintData.pregnancy
        }
      },
      obstetricAnamnesis: {
        get() {
          return this.$store.state.visitaOstetricaPrintData.obstetricAnamnesis
        }
      },
      papTestYear: {
        get() {
          return this.$store.state.visitaOstetricaPrintData.papTestYear
        }
      },
      papTest: {
        get() {
          return {
            year: this.$store.state.visitaOstetricaPrintData.papTestYear,
            result: this.$store.state.visitaOstetricaPrintData.papTestResult
          }
        }
      },
      hpv: {
        get() {
          return {
            date: this.$store.state.visitaOstetricaPrintData.hpvDate,
            result: this.$store.state.visitaOstetricaPrintData.hpv
          }
        }
      },

      papTestResult: {
        get() {
          return this.$store.state.visitaOstetricaPrintData.papTestResult
        }
      },
      infections() {
        return this.obstetricAnamnesis.infections || []
      },
      objectiveExam: {
        get() {
          return this.$store.state.visitaOstetricaPrintData.objectiveExam
        }
      },
      conclusion: {
        get() {
          return this.$store.state.visitaOstetricaPrintData.conclusion
        }
      },
      downSyndromeConsents: {
        get() {
          return this.$store.state.visitaOstetricaPrintData.downSyndromeConsents
        }
      },
      regularPregnancyEvolution: {
        get() {
          return this.$store.state.visitaOstetricaPrintData.regularPregnancyEvolution
        }
      },
      selectedReport: {
        get() {
          return this.$store.state.visitaOstetricaPrintData.selectedReport
        }
      },
      pregnancyStart() {
        if (this.pregnancy && this.pregnancy.start) {
          return this.pregnancy.start
        } else {
          return this.obstetricAnamnesis.lastMenstruationDate
        }
      },
      testCombinatoLabel() {
        return (
          testCombinatoMap[this.obstetricAnamnesis.testCombinato] ||
          this.obstetricAnamnesis.testCombinato
        )
      }
    },

    created() {
      this.$store.commit('SET_ACTIVE_PAGE', 'Stampa visita ostetrica')
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
      <section v-if="familyAnamnesis" class="anamnesis">
        <div class="title-par">Anamnesi familiare:</div>
        <p v-if="trombo == 'true'">Positiva per TEV</p>
        <p v-else>Negativa per TEV</p>
        <p class="preserve-linebreaks">{{ familyAnamnesis }}</p>
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

      <!-- allergie -->
      <section v-if="allergies.length > 0" class="allergies">
        <div class="title-par">Allergie:</div>
        <ul>
          <li v-for="(item, index) in allergies" :key="index">{{ item }}</li>
        </ul>
      </section>

      <!-- anamnesi ostetrica -->
      <section class="obstetric-anamnesis">
        <div class="title-par">Anamnesi ostetrica:</div>
        <div>
          <span class="label mr-1">PARA:</span>
          <span>{{ obstetricAnamnesis.paraP }}</span>
          <span>{{ obstetricAnamnesis.paraX }}</span>
          <span>{{ obstetricAnamnesis.paraY }}</span>
          <span>{{ obstetricAnamnesis.paraZ }}</span>
          <span v-if="obstetricAnamnesis.paraDesc">, {{ obstetricAnamnesis.paraDesc }}</span>
        </div>

        <!-- tables -->
        <!-- <div class="d-flex mb-3">
          <div class="table-col w-1/3">
            <span class="label mr-1">UM:</span>
            <span>{{ formatDate(obstetricAnamnesis.lastMenstruationDate) }}</span>
            <span v-if="obstetricAnamnesis.lastMenstruationDesc">
              , {{ obstetricAnamnesis.lastMenstruationDesc }}
            </span>
          </div>
          <div class="table-col w-1/3">
            <span class="label mr-1">EPP:</span>
            <span>{{ formatDate(pregnancy?.delivery) }}</span>
          </div>
          <div class="table-col w-1/3">
            <span class="label mr-1">EPPUS:</span>
            <span>{{ formatDate(pregnancy?.start) }}</span>
          </div>
        </div> -->

        <div class="mb-3">
          <!-- headers -->
          <div class="d-flex">
            <div class="table-col w-1/3 font-bold">UM</div>
            <div class="table-col w-1/3 font-bold">EPP</div>
            <div v-if="pregnancy?.deliveryDateFromCRL" class="table-col w-1/3 font-bold">EPPUS</div>
          </div>
          <!-- rows -->
          <div class="d-flex">
            <div class="table-col w-1/3">
              <!-- <span>{{ formatDate(obstetricAnamnesis.lastMenstruationDate) }}</span>
              <span v-if="obstetricAnamnesis.lastMenstruationDesc">
                , {{ obstetricAnamnesis.lastMenstruationDesc }}
              </span> -->
              <span>{{ formatDate(pregnancy?.start) || '&nbsp;' }}</span>
            </div>
            <div class="table-col w-1/3">
              <span>{{ formatDate(pregnancy?.delivery) || '&nbsp;' }}</span>
            </div>
            <div v-if="pregnancy?.deliveryDateFromCRL" class="table-col w-1/3">
              <span>{{ formatDate(pregnancy?.deliveryDateFromCRL) }}</span>
            </div>
          </div>
        </div>

        <!-- <div class="mb-3">
          <div class="d-flex">
            <div class="table-col w-48 font-bold">EMOGRUPPO</div>
            <div class="table-col w-48">&nbsp;</div>
          </div>
          <div class="d-flex">
            <div class="table-col w-48 font-bold">COOMBS</div>
            <div class="table-col w-48">&nbsp;</div>
          </div>
          <div class="d-flex">
            <div class="table-col w-48 font-bold">OGTT</div>
            <div class="table-col w-48">&nbsp;</div>
          </div>
        </div> -->
        <div class="mb-3">
          <!-- headers -->
          <div class="d-flex">
            <div class="table-col w-1/3 font-bold">EMOGRUPPO</div>
            <div class="table-col w-1/3 font-bold">COOMBS</div>
            <div class="table-col w-1/3 font-bold">OGTT</div>
          </div>
          <!-- rows -->
          <div class="d-flex">
            <div class="table-col w-1/3">
              {{ obstetricAnamnesis.emogruppo || '&nbsp;' }}
            </div>
            <div class="table-col w-1/3">
              {{ obstetricAnamnesis.coombs || '&nbsp;' }}
            </div>
            <div class="table-col w-1/3">
              <span
                v-if="
                  obstetricAnamnesis.ogtt1 && obstetricAnamnesis.ogtt2 && obstetricAnamnesis.ogtt3
                "
              >
                {{ obstetricAnamnesis.ogtt1 }} , {{ obstetricAnamnesis.ogtt2 }} ,
                {{ obstetricAnamnesis.ogtt3 }}
              </span>
              <span v-else>&nbsp;</span>
            </div>
          </div>
        </div>
        <div class="mb-3">
          <div class="d-flex">
            <div class="table-col w-1/7 font-bold" v-for="infection in infections">
              {{ infection.label }}
            </div>
            <!-- headers -->
            <!-- <div class="table-col w-1/7 font-bold">TOXO</div>
            <div class="table-col w-1/7 font-bold">RUBEO</div>
            <div class="table-col w-1/7 font-bold">HBsAg</div>
            <div class="table-col w-1/7 font-bold">HCV</div>
            <div class="table-col w-1/7 font-bold">HIV</div>
            <div class="table-col w-1/7 font-bold">TPHA</div>
            <div class="table-col w-1/7 font-bold">CMV</div> -->
          </div>
          <div class="d-flex">
            <!-- rows -->
            <div class="table-col w-1/7" v-for="infection in infections">
              {{ infection.value || '&nbsp;' }}
            </div>

            <!-- <div class="table-col w-1/7">&nbsp;</div>
            <div class="table-col w-1/7">&nbsp;</div>
            <div class="table-col w-1/7">&nbsp;</div>
            <div class="table-col w-1/7">&nbsp;</div>
            <div class="table-col w-1/7">&nbsp;</div>
            <div class="table-col w-1/7">&nbsp;</div>
            <div class="table-col w-1/7">&nbsp;</div> -->
          </div>
        </div>

        <div v-if="papTest.year && papTest.result">
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

        <!-- <div>
          <span class="label mr-1">Mammografia:</span>
          <span>
            {{ obstetricAnamnesis.mammografiaDesc }}
          </span>
        </div> -->
        <!-- <div v-if="obstetricAnamnesis.infectionsDesc">
          <span class="label mr-1">Infezioni:</span>
          <span>
            {{ obstetricAnamnesis.infectionsDesc }}
          </span>
        </div> -->
      </section>

      <!-- screening -->
      <section v-if="obstetricAnamnesis.testCombinato || obstetricAnamnesis.nipt" class="screening">
        <div class="title-par">Esami di screening:</div>
        <div v-if="obstetricAnamnesis.testCombinato">
          <span>Test combinato: {{ testCombinatoLabel }}</span>
          <span v-if="obstetricAnamnesis.testCombinatoDesc">
            , {{ obstetricAnamnesis.testCombinatoDesc }}
          </span>
        </div>
        <div v-if="obstetricAnamnesis.nipt">
          <span>NIPT: {{ obstetricAnamnesis.nipt }}</span>
          <span v-if="obstetricAnamnesis.niptDesc">, {{ obstetricAnamnesis.niptDesc }}</span>
        </div>
      </section>

      <!-- esame obiettivo -->
      <section class="objective-exam">
        <div class="title-par">Esame obiettivo:</div>
        <div>
          <span>Altezza {{ height }}cm, &nbsp;</span>
          <span>Peso pregravidico {{ normalWeight }}kg, &nbsp;</span>
          <span>BMI: {{ bmi }}</span>
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
        <div v-if="objectiveExam.pa">
          <span class="label mr-1">PA:</span>
          {{ objectiveExam.pa }} mmHg
        </div>
        <div v-if="objectiveExam.objectiveExamDesc" class="mt-2">
          <p class="preserve-linebreaks">{{ objectiveExam.objectiveExamDesc }}</p>
        </div>
      </section>

      <!-- conclusioni -->
      <section v-if="conclusion || regularPregnancyEvolution" class="conclusion">
        <div class="title-par">Conclusioni:</div>
        <div v-if="regularPregnancyEvolution">Gravidanza in regolare evoluzione</div>
        <p class="preserve-linebreaks">
          {{ conclusion }}
        </p>
      </section>

      <!-- consenso sindrome di down -->
      <DownSyndromeConsents v-if="downSyndromeConsents" />

      <!-- report -->
      <div v-html="selectedReport"></div>
    </main>
    <footer>
      <img v-if="office === 'Pralboino'" class="footer-pralboino" src="@/img/footerPralboino.jpg" />
    </footer>
  </div>
</template>

<style lang="scss" scoped>
  @use '@/assets/print';
  .table-col {
    border: 1px solid black;
    padding: 2px 10px;
    margin-left: -1px;
    margin-top: -1px;

    &:first-child {
      margin-left: 0;
    }
  }

  .d-flex:first-child .table-col {
    margin-top: 0;
  }
</style>
