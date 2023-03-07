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
  .popup-message{
    position: fixed;
    bottom: 10px;
    left: 50%;
    padding: 5px;
    border-radius: var(--border-radius);
    z-index: 10;
    .cloud-arrow{
      display: none;
    }
    &.position-anchored{
      position: absolute;
      left: 10px;
      bottom: calc(100% + 5px);
      .cloud-arrow{
        display: inline-block;
        position: absolute;
        width: 8px;
        height: 8px;
        left: 6px;
        transform: rotate(45deg);
        border-style: solid;
        border-width: 0 1px 1px 0;
        bottom: -5px;
        border-radius: 2px;
      }      
    }
    &.position-center{
      bottom: 50%;
      left: 50%;
      transform: translate(-50%, 50%);
      z-index: 9;
      &.false{
        display: none;
      }
      &.true{
        display: inline-block;
      }

    }
    &.position-bottom{
      position: fixed;
      bottom: -120px;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 9;
      transition: all 1s;
      &.true{
        bottom: 40px;
      }
    }
    &.error{
      background-color: #f8d7da !important;
      color: #721c24;
    }
  }
  @media (prefers-color-scheme: light) {
    .popup-message{
      background-color: white;
      border: 1px solid #444;
      &.error{
        background-color: #f8d7da;
        color: #721c24;
        .cloud-arrow{
          background-color: #f8d7da;
        }
      }
      &.info{
        background-color: #d1ecf1;
        color: #0c5460;
        .cloud-arrow{
          background-color: #d1ecf1;
        }
      }
      &.warning{
        background-color: #fff3cd;
        color: #856404;
        .cloud-arrow{
          background-color: #fff3cd;
        }
      }
      &.success{
        background-color: #d4edda;
        color: #155724;
        .cloud-arrow{
          background-color: #d4edda;
        }
      }
      .cloud-arrow{
        background-color: white;
        border-color: #444;
      }
    }
  }

  // .theme-dark{
    .popup-message{
      background-color: #444;
      border: 1px solid #888;
      color: white;
      &.error{
        background-color: #f8d7da;
        color: #721c24;
        .cloud-arrow{
          background-color: #f8d7da;
        }
      }
      &.info{
        background-color: #d1ecf1;
        color: #0c5460;
        .cloud-arrow{
          background-color: #d1ecf1;
        }
      }
      &.warning{
        background-color: #fff3cd;
        color: #856404;
        .cloud-arrow{
          background-color: #fff3cd;
        }
      }
      &.success{
        background-color: #d4edda;
        color: #155724;
        .cloud-arrow{
          background-color: #d4edda;
        }
      }
      .cloud-arrow{
        background-color: #444;
        border-color: #888;
      }
    // }
  }
</style>
