<script>

export default {
  name: 'PopupMessage',
  components: {
  },
  props: {
    type: String,
    show: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: ""
    },
    position:{
      type: String,
      default: "bottom"
    }
  },
  data(){
    return{
    }
  },
  created(){
    
  },
  computed: {
    internalShow: {
      // getter
      get() {
        if(this.show){
          this.countDown();
        }
        return this.show;
      },
      // setter
      set(newValue) {
        this.$emit('showBack', newValue);
      }
    }
  },
  methods:{
    countDown(){
      setTimeout(() => {
        this.internalShow = false;
      }, 5000);
    }
  }
}
</script>

<template>
  <div>
    <div 
      class="popup-message"
      :class="`${type} position-${position} ${internalShow}`"
    >
        {{ content }}
      <div class="cloud-arrow"></div>
    </div>
  </div>
</template>


<style lang="scss">
  // Colori da tokens.scss: superficie della pagina, bordo e tinta in base al tipo di messaggio
  .popup-message {
    --popup-bg: var(--page-bg);
    --popup-border: var(--line-strong);
    position: fixed;
    bottom: 10px;
    left: 50%;
    max-width: min(90vw, 40rem);
    padding: 0.6em 1em;
    border: 1px solid var(--popup-border);
    border-radius: var(--radius);
    background-color: var(--popup-bg);
    box-shadow: 0 8px 24px color-mix(in oklch, black 20%, transparent);
    font-weight: 500;
    line-height: 1.4;
    z-index: 10;
    .cloud-arrow {
      display: none;
    }
    &.success {
      --popup-bg: color-mix(in oklch, var(--success) 16%, var(--page-bg));
      --popup-border: color-mix(in oklch, var(--success) 55%, transparent);
    }
    &.error {
      --popup-bg: color-mix(in oklch, var(--danger) 16%, var(--page-bg));
      --popup-border: color-mix(in oklch, var(--danger) 55%, transparent);
    }
    &.info {
      --popup-bg: color-mix(in oklch, var(--accent) 16%, var(--page-bg));
      --popup-border: color-mix(in oklch, var(--accent) 55%, transparent);
    }
    // Stesso avviso di Patient.vue (.duplicate-warning)
    &.warning {
      --popup-bg: var(--warning-bg);
      --popup-border: color-mix(in oklch, var(--warning-text) 35%, transparent);
      color: var(--warning-text);
    }
    &.position-anchored {
      position: absolute;
      left: 10px;
      bottom: calc(100% + 5px);
      .cloud-arrow {
        display: inline-block;
        position: absolute;
        width: 8px;
        height: 8px;
        left: 6px;
        bottom: -5px;
        transform: rotate(45deg);
        border: solid var(--popup-border);
        border-width: 0 1px 1px 0;
        border-radius: 2px;
        background-color: var(--popup-bg);
      }
    }
    &.position-center {
      bottom: 50%;
      transform: translate(-50%, 50%);
      z-index: 9;
      &.false {
        display: none;
      }
    }
    &.position-bottom {
      bottom: 40px;
      transform: translateX(-50%);
      z-index: 9;
      &.false {
        opacity: 0;
        visibility: hidden;
        transform: translate(-50%, 16px);
      }
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    .popup-message.position-bottom {
      transition:
        opacity 200ms ease-out,
        transform 200ms ease-out,
        visibility 200ms;
    }
  }
</style>
