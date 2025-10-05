<script>
  import ThemeSwitch from '@/components/ThemeSwitch.vue'
  export default {
    name: 'Header',
    components: {
      ThemeSwitch
    },
    data() {
      return {}
    },
    computed: {
      actualPage: {
        get() {
          return this.$store.state.activePage
        }
      }
    },
    methods: {
      goToHome() {
        this.$router.push({ name: 'Home' })
      }
    }
  }
</script>

<template>
  <nav class="hide-print">
    <div class="header d-flex w-full align-center">
      <div class="cursor-pointer">
        <font-awesome-icon @click="goToHome()" icon="fa-solid fa-home" />
      </div>
      <div class="title flex-grow">{{ actualPage }}</div>
      <ThemeSwitch />
    </div>
  </nav>
</template>
<style lang="scss" scoped>
  @media print {
    .hide-print {
      display: none !important;
    }
  }
</style>
