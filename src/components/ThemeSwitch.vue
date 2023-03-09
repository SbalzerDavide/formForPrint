<script>


export default {
  name: 'ThemeSwitch',
  components: {
  },
  props: {
    session: Object
  },
  data(){
    return{
      theme: "light"
    }
  },
  methods:{
    changeTheme(theme){
      if(theme !== ""){
        this.theme = theme;
      } else{
        if(this.theme === "light"){
          this.theme = "dark";
        } else if(this.theme === "dark"){
          this.theme = "light";
        }
      }
      document.body.classList.forEach((el, index, array)=>{
        if(el.includes("theme")){
          array.remove(el)
        }
      });
      document.body.classList.add(`theme-${this.theme}`)
    },
  }
}
</script>

<template>
  <div class="change-theme d-flex">
    <div :class="theme==='light' ? 'active' : ''">
      <font-awesome-icon @click="changeTheme('light')" icon="fa-solid fa-sun" />
    </div>
    <div class="switch d-flex" @click="changeTheme('')">
      <div class="ball-switch"></div>
    </div>
    <div :class="theme==='dark' ? 'active' : ''" >
      <font-awesome-icon @click="changeTheme('dark')" icon="fa-solid fa-moon" />
    </div>
  </div>
</template>


<style lang="scss">
    .theme-dark{
      .change-theme{
        .switch{
          background: rgba(255, 255, 255, .1);
        }
        .active{
          color: white;
        }
        div:not(.active){
          color: rgba(255, 255, 255, 0.60);
        }
      }
    }
    .theme-light{
      .change-theme{
        .switch{
          background: rgba(0, 0, 0, .1);
        }
        .active{
          color: black;
        }
        div:not(.active){
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
    .change-theme{
      display: flex;
      align-items: center;
      svg{
        height: 20px !important;
        cursor: pointer;
      }
      .switch{
        display: flex;
        position: relative;
        width: 52px;
        height: 28px;
        padding: 2px;
        margin: 0 5px;
        border-radius: 14px;
        justify-content: space-between;
        // background: rgba(255, 255, 255, .1);
        cursor: pointer;
      }
      .ball-switch{
        position: absolute;
        left: 2px;
        height: 24px;
        width: 24px;
        background: #55917F;
        border-radius: 50%;
        transition: all .5s;
      }
      div:not(.active){
        color: rgba(255, 255, 255, 0.87);
      }
    }
  .theme-dark{
    #app{
      .ball-switch{
        left: 26px;
      }
    }
  }

</style>
