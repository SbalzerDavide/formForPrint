<script>
  export default {
    name: 'CommunContents',
    props: {
      trimestre: {
        type: String,
        required: true
      }
    }
  }
</script>

<template>
  <h4>Io sottoscritta _____________________________________ dichiaro:</h4>
  <ul>
    <li>
      di essere stata dettagliatamente informata sull'Ecografia di screening del II trimestre e di
      aver compreso i contenuti dell'informazione.
    </li>
    <li>
      Di aver avuto la possibilità di rivolgere al Medico quesiti e di averne ottenuto risposte
      soddisfacenti.
    </li>
    <li>
      consapevole del fatto che tale accertamento è consigliato ma non obbligatorio, di volerlo
      eseguire sapendo che all'ecografia di screening del {{ trimestre }} trimestre possono emergere
      quadri patologici fetali che richiedono approfondimenti diagnostici aggiuntivi.
    </li>
  </ul>
  <h4>DATA FIRMA DELLA PAZIENTE</h4>
</template>
