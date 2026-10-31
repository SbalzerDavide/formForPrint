<script>
  import { Users, operatorLabel } from '@/const/users.js'
  import { Offices } from '@/const/offices.js'
  import { storeModel } from '@/utils/storeModel.js'

  export default {
    name: 'Office',
    components: {},
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
      operatorLabel,
      print() {
        this.$emit('print')
      }
    }
  }
</script>

<template>
  <section class="office">
    <div class="context">
      <label class="visually-hidden" for="officeUser">Operatore</label>
      <select id="officeUser" v-model="user">
        <option v-for="(item, index) in users" :key="index" :value="item">
          {{ operatorLabel(item) }}
        </option>
      </select>
      <span class="dot" aria-hidden="true">·</span>
      <label class="visually-hidden" for="officeOffice">Ambulatorio</label>
      <select id="officeOffice" v-model="office">
        <option :value="null" disabled>Ambulatorio</option>
        <option v-for="item in offices" :key="item.id" :value="item">{{ item.label }}</option>
      </select>
    </div>
    <div class="right-top">
      <button class="print" @click="print">Anteprima di stampa</button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .context {
    display: flex;
    align-items: center;
    gap: 6px;
    // Select senza bordo, come nella barra della home
    select {
      width: auto !important;
      border-color: transparent;
      background-color: transparent;
      cursor: pointer;
      &:hover {
        border-color: var(--line);
      }
    }
    .dot {
      color: var(--muted);
    }
  }
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
</style>
