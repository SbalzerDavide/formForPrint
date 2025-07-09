<script>
  import PopupMessage from '@/components/PopupMessage.vue'

  import Patient from '@/components/sections/Patient.vue'
  import Office from '@/components/sections/Office.vue'

  export default {
    name: 'VisitaOstetrica',
    components: {
      PopupMessage,
      Patient,
      Office
    },
    data() {
      return {}
    },
    mounted() {},
    methods: {}
  }
</script>

<template>
  <div class="visita-ginecologica">
    <h1>Visita ostetrica</h1>
    <div class="form">
      <!-- <PopupMessage
        :content="popupMessage"
        position="bottom"
        :type="popupType"
        :show="triggerPopup"
        @showBack="triggerPopup = false"
      /> -->
      <Office @print="showPrint = true" />
      <Patient />
    </div>
  </div>
</template>
