<script>
  export default {
    name: 'Home',
    data() {
      return {
        showForm: false
      }
    },
    mounted() {
      this.$refs.openApp.focus()
    },
    methods: {
      goTo(route) {
        this.$router.push({ name: route })
      }
    }
  }
</script>

<template>
  <main class="home">
    <h1>Form For Print</h1>

    <nav class="selection-grid" aria-label="Form selection">
      <button
        ref="openApp"
        class="selection-card"
        @click="goTo('EcografiaOstetrica')"
        aria-label="Create obstetric ultrasound form"
      >
        <span class="card-title">Ecografia Ostetrica</span>
      </button>

      <button
        class="selection-card"
        @click="goTo('VisitaGinecologica')"
        aria-label="Create gynecological visit form"
      >
        <span class="card-title">Visita Ginecologica</span>
      </button>

      <button
        class="selection-card"
        @click="goTo('VisitaOstetrica')"
        aria-label="Create obstetric visit form"
      >
        <span class="card-title">Visita Ostetrica</span>
      </button>
    </nav>
  </main>
</template>

<style lang="scss" scoped>
  .home {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-16);
    padding: var(--space-8);
  }

  h1 {
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    text-align: center;
    margin: 0;
  }

  .selection-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: var(--space-4);
    width: 100%;
    max-width: 800px;
  }

  .selection-card {
    padding: var(--space-8);
    background-color: var(--color-bg-elevated);
    border: 1px solid var(--color-border-default);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all 150ms ease-out;
    text-align: left;

    .card-title {
      display: block;
      font-family: var(--font-display);
      font-size: var(--text-xl);
      font-weight: 600;
      margin: 0;
      color: var(--color-text-primary);
    }

    &:hover {
      border-color: var(--color-accent-primary);
      background-color: var(--color-accent-subtle);
      transform: translateY(-1px);

      .card-title {
        color: var(--color-accent-primary);
      }
    }

    &:active {
      transform: translateY(0);
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--shadow-focus);
    }
  }

  @media (max-width: 768px) {
    .home {
      padding: var(--space-6) var(--space-4);
      gap: var(--space-12);
    }

    .selection-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
