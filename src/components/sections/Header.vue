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
    <div class="header">
      <button class="home-btn" @click="goToHome()" aria-label="Go to home">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </button>

      <div class="page-title">{{ actualPage }}</div>

      <ThemeSwitch />
    </div>
  </nav>
</template>

<style lang="scss" scoped>
  .hide-print {
    position: sticky;
    top: 0;
    z-index: 50;
    background-color: var(--color-bg-base);
    border-bottom: 1px solid var(--color-border-subtle);
  }

  .header {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    max-width: 1280px;
    margin: 0 auto;
    padding: var(--space-4) var(--space-6);
  }

  .home-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    padding: 0;
    background-color: transparent;
    color: var(--color-text-secondary);
    border: none;
    transition: color 150ms ease-out;

    &:hover {
      color: var(--color-accent-primary);
      transform: none;
      box-shadow: none;
    }

    &:focus-visible {
      outline: 2px solid var(--color-accent-primary);
      outline-offset: 2px;
    }
  }

  .page-title {
    flex: 1;
    font-family: var(--font-display);
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--color-text-primary);
  }

  @media print {
    .hide-print {
      display: none !important;
    }
  }

  @media (max-width: 768px) {
    .header {
      padding: var(--space-3) var(--space-4);
    }
  }
</style>
