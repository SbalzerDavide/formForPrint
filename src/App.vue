<script>
  export default {
    mounted() {
      let theme = localStorage.getItem('theme')
      if (theme === 'dark') {
        document.body.classList.add('theme-dark')
      } else if (theme === 'light') {
        document.body.classList.add('theme-light')
      } else {
        document.body.classList.add('theme-dark')
      }
      // leggo se è impostato sul sistema un tema chiaro o scuro
      if (window.matchMedia('(prefers-color-scheme: dark)')?.matches) {
        // sistema con tema dark
        document.body.classList.add('system-dark')
      } else if (window.matchMedia('(prefers-color-scheme: light)')?.matches) {
        // sistema con tema light
        document.body.classList.add('system-light')
      }
    }
  }
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss">
  @import './assets/utility.scss';
  @import './assets/form.scss';
</style>
