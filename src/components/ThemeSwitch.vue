<script>
  export default {
    name: 'ThemeSwitch',
    components: {},
    props: {
      session: Object
    },
    data() {
      return {
        theme: 'light'
      }
    },
    created() {
      if (document.body.classList.contains('theme-light')) {
        this.theme = 'light'
      } else if (document.body.classList.contains('theme-dark')) {
        this.theme = 'dark'
      }
    },
    methods: {
      changeTheme(theme) {
        if (theme !== '') {
          this.theme = theme
        } else {
          if (this.theme === 'light') {
            this.theme = 'dark'
            localStorage.setItem('theme', 'dark')
          } else if (this.theme === 'dark') {
            this.theme = 'light'
            localStorage.setItem('theme', 'light')
          }
        }
        document.body.classList.forEach((el, index, array) => {
          if (el.includes('theme')) {
            array.remove(el)
          }
        })
        document.body.classList.add(`theme-${this.theme}`)
      }
    }
  }
</script>

<template>
  <div class="theme-switch">
    <button
      class="theme-btn"
      :class="{ active: theme === 'light' }"
      @click="changeTheme('light')"
      aria-label="Switch to light mode"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    </button>

    <button
      class="theme-btn"
      :class="{ active: theme === 'dark' }"
      @click="changeTheme('dark')"
      aria-label="Switch to dark mode"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  </div>
</template>

<style lang="scss" scoped>
  .theme-switch {
    display: flex;
    gap: var(--space-2);
    padding: 4px;
    background-color: var(--color-bg-section);
    border: 1px solid var(--color-border-subtle);
    border-radius: var(--radius-md);
  }

  .theme-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    padding: 0;
    background-color: transparent;
    color: var(--color-text-tertiary);
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: all 150ms ease-out;
    box-shadow: none;

    &:hover {
      background-color: var(--color-bg-hover);
      color: var(--color-text-secondary);
      transform: none;
      box-shadow: none;
    }

    &.active {
      background-color: var(--color-accent-primary);
      color: var(--color-bg-elevated);

      &:hover {
        background-color: var(--color-accent-hover);
      }
    }

    &:focus-visible {
      outline: 2px solid var(--color-accent-primary);
      outline-offset: 2px;
    }

    svg {
      width: 18px;
      height: 18px;
    }
  }
</style>
