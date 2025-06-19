<script>
  import { Users } from '@/const/users.js'
  import { Offices } from '@/const/offices.js'
  import ThemeSwitch from '@/components/ThemeSwitch.vue'

  import { mapGetters } from 'vuex'

  export default {
    name: 'Office',
    components: {
      ThemeSwitch
    },
    data() {
      return {
        users: Users,
        offices: Offices,
        activeUser: 0,
        activeOffice: 'desenzano'
      }
    },
    created() {
      this.$store.commit('setOperator', this.users[this.activeUser])
    },
    computed: {
      ...mapGetters(['user', 'office', 'ecoTool'])
    },

    mounted() {},
    methods: {
      changeOperator() {
        this.$store.commit('setOperator', this.users[this.activeUser])
        console.log(this.user)
      },
      changeOffice() {
        this.$store.commit(
          'setOffice',
          this.offices.find((office) => office.id === this.activeOffice)
        )
        console.log(this.office)
        if (this.office.label === 'Pralboino') {
          this.$store.commit('setEcoTool', 'Samsung HS50')
        } else if (this.office.label === 'Desenzano') {
          this.$store.commit('setEcoTool', 'Samsung WS80')
        }
      }
    }
  }
</script>

<template>
  <section class="office">
    <div class="d-flex">
      <div class="d-flex operator">
        <select @change="changeOperator" v-model="activeUser">
          <option v-for="(user, index) in users" :key="index" :value="index">
            {{ user.name }}
          </option>
        </select>
      </div>

      <div class="d-flex">
        <div class="title">Ambulatorio</div>
        <select @change="changeOffice" v-model="activeOffice">
          <option v-for="office in offices" :key="office.id" :value="office.id">
            {{ office.label }}
          </option>
        </select>
      </div>
    </div>
    <div class="right-top">
      <ThemeSwitch />
      <button class="print" @click="print">Print</button>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
