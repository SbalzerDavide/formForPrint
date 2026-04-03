<script>
  export default {
    mounted() {
      let theme = localStorage.getItem('theme')
      if (theme === 'dark') {
        document.body.classList.add('theme-dark')
      } else if (theme === 'light') {
        document.body.classList.add('theme-light')
      } else {
        // Default to light theme (primary)
        document.body.classList.add('theme-light')
        localStorage.setItem('theme', 'light')
      }
      // Check system preference
      if (window.matchMedia('(prefers-color-scheme: dark)')?.matches) {
        document.body.classList.add('system-dark')
      } else if (window.matchMedia('(prefers-color-scheme: light)')?.matches) {
        document.body.classList.add('system-light')
      }
    }
  }
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss">
  @use './assets/utility.scss';
  @use './assets/form.scss';
</style>
