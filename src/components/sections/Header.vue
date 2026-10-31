<script>
  export default {
    name: 'Header',
    props: {
      // Percorso dopo la Home: [{ label, to }], l'ultima voce è la pagina corrente (senza `to`)
      breadcrumbs: {
        type: Array,
        default: null
      }
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
    }
  }
</script>

<template>
  <nav class="hide-print">
    <div class="header d-flex w-full align-center">
      <ol class="breadcrumbs flex-grow">
        <li>
          <router-link :to="{ name: 'Home' }" class="home" title="Home">
            <font-awesome-icon icon="fa-solid fa-home" />
          </router-link>
        </li>
        <li v-for="(crumb, index) in breadcrumbs ?? [{ label: actualPage }]" :key="index">
          <font-awesome-icon class="separator" icon="fa-solid fa-chevron-right" />
          <router-link v-if="crumb.to" :to="crumb.to">{{ crumb.label }}</router-link>
          <span v-else class="current" aria-current="page">{{ crumb.label }}</span>
        </li>
      </ol>
      <router-link :to="{ name: 'Impostazioni' }" class="settings-link" title="Impostazioni">
        <font-awesome-icon icon="fa-solid fa-gear" />
        <span class="visually-hidden">Impostazioni</span>
      </router-link>
    </div>
  </nav>
</template>
<style lang="scss" scoped>
  .breadcrumbs {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px 0;
    margin: 0;
    padding: 0;
    list-style: none;
    text-align: left;
    li {
      display: flex;
      align-items: center;
    }
    a {
      color: inherit;
      text-decoration: none;
      opacity: 0.75;
      &:hover {
        opacity: 1;
        text-decoration: underline;
      }
    }
    .home {
      font-size: 1.1em;
      opacity: 1;
    }
    .separator {
      font-size: 0.7em;
      opacity: 0.5;
      margin: 0 10px;
    }
    .current {
      font-weight: 600;
    }
  }
  .settings-link {
    padding: 6px;
    border-radius: 6px;
    color: inherit;
    opacity: 0.75;
    &:hover,
    &.router-link-active {
      opacity: 1;
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
  @media print {
    .hide-print {
      display: none !important;
    }
  }
</style>
