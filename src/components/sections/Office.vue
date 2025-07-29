<script>
  import { Users } from '@/const/users.js'
  import { Offices } from '@/const/offices.js'
  import ThemeSwitch from '@/components/ThemeSwitch.vue'
  import { storeModel } from '@/utils/storeModel.js'

  export default {
    name: 'Office',
    components: {
      ThemeSwitch
    },
    data() {
      return {
        users: Users,
        offices: Offices,
        activeOffice: 'desenzano'
      }
    },
    computed: {
      user: storeModel('user', 'SET_USER'),
      office: storeModel('office', 'SET_OFFICE')
    },
    methods: {
      print() {
        this.$emit('print')
      }
    }
  }
</script>

<template>
  <section class="office">
    <div class="d-flex">
      <div class="d-flex operator">
        <select v-model="user">
          <option v-for="(user, index) in users" :key="index" :value="user">
            {{ user.name }}
          </option>
        </select>
      </div>

      <div class="d-flex">
        <div class="title">Ambulatorio</div>
        <select v-model="office">
          <option disabled selected value>-- select an option --</option>
          <option v-for="office in offices" :key="office.id" :value="office">
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
