<script>
  import CommunContents from './CommunContents.vue'
  export default {
    components: {
      CommunContents
    },
    name: 'Concents11_13Weeks',
    props: {}
  }
</script>

<template>
  <div class="consent">
    <h3>INFORMAZIONI SULL’ECOGRAFIA DEL I TRIMESTRE DI GRAVIDANZA (TRA 11+0 -13+6 SETTIMANE)</h3>
    <h4>Che cos’è l’ecografia?</h4>
    <p>
      L’ecografia è una tecnica che consente di vedere gli organi del nostro corpo con l’utilizzo di
      onde sonore ad alta frequenza (ultrasuoni, non udibili dall’orecchio umano) che attraversano i
      tessuti: quando esse arrivano al feto producono echi che sono trasformati in immagini sul
      monitor dell’ecografia.
    </p>
    <h4>Come si effettua l’esame?</h4>
    <p>
      Tra 11+0 -13+6 settimane l'ecografia del I trimestre si esegue per via trans-addominale nella
      maggior parte dei casi. Anche se non si può escludere che sia necessario eseguire l'esame
      anche per via trans- vaginale.
    </p>
    <h4>Quali sono le finalità dell'ecografia tra 11+0 e 13+6 settimane?</h4>
    <p>
      Le principali finalità di questa ecografia sono la valutazione della vitalità fetale, la
      misurazione della translucenza nucale, la valutazione di base dell’anatomia fetale e, qualora
      la donna opti per lo screening per aneuploidie, la valutazione del rischio per le comuni
      trisomie nell’ambito del test combinato. Se non eseguito in precedenza, durante questa
      ecografia va valutata la corrispondenza dell’epoca gestazionale (datazione ecografica della
      gravidanza), il numero dei feti e, se la gravidanza è multipla, il numero dei sacchi amniotici
      (amnionicità) e delle placente (corionicità).
    </p>
    <h4>In che cosa consiste la misura della translucenza nucale (NT)?</h4>
    <p>
      La misurazione della translucenza nucale dovrebbe essere eseguita in tutte le donne in
      gravidanza. Si tratta della misurazione dello spessore del tessuto sottocutaneo della regione
      nucale del feto, effettuabile fra 11+0 e 13+6 settimane gestazionali, che deve essere
      valutata, con la corretta metodologia e programmazione, in appropriati ambulatori da operatori
      certificati e sottoposti a controlli periodici di qualità. La translucenza nucale normale
      abbassa il rischio di anomalie fetali, viceversa se aumentata rappresenta un indicatore di
      rischio per patologie genetiche incluse le più comuni trisomie (es. trisomia 21, 18 e 13) e
      patologie malformative (anomalie strutturali cardiache o extracardiache).
    </p>
    <h4>In che cosa consiste la valutazione di base dell’anatomia fetale nel I trimestre?</h4>
    <p>
      Qualora eseguita, questa procedura permette di sospettare alcune malformazioni fetali maggiori
      e di riferire la gestante per un'Ecografia di Riferimento per una valutazione approfondita
      dell’anatomia fetale, la conferma o meno della sospetta patologia fetale e la successiva
      gestione. Tuttavia bisogna sottolineare che in questo stadio precoce della gravidanza la
      valutazione anatomica del feto è molto limitata e maggiormente condizionata da fattori come
      l’obesità o l’aumentato spessore della parete addominale. Bisogna sottolineare che l’ecografia
      di screening del II trimestre è caratterizzata da una maggiore accuratezza e rimane l’esame
      ecografico raccomandato per lo screening delle anomalie strutturali del feto.
    </p>
    <h4>
      In quali casi è necessaria una valutazione approfondita dell'anatomia fetale nel I trimestre?
    </h4>
    <p>
      In tutte le pazienti in cui l’esame di screening delle 11+0 e 13+6 settimane rilevi una
      translucenza nucale maggiore o uguale di 3,5 mm o una sospetta anomalia strutturale fetale, è
      necessario programmare una valutazione approfondita dell'anatomia fetale presso un Centro con
      operatori adeguati ad eseguire un'Ecografia di Riferimento.
    </p>
    <h4>Io sottoscritta ________________________________</h4>
    <ul>
      <li>
        dichiaro di essere stata dettagliatamente informata sulle finalità dell’ecografia del primo
        trimestre e di aver compreso i contenuti dell'informazione.
      </li>
      <li>
        dichiaro inoltre di voler eseguire tale ecografia consapevole che all'ecografia del primo
        trimestre possono emergere quadri patologici fetali che richiedono consulenze
        multispecialistiche ed approfondimenti diagnostici aggiuntivi.
      </li>
    </ul>
    <h4>CONSENSO INFORMATO ALL’ESAME DEL I TRIMESTRE (TRA 11+0-13+6 SETTIMANE)</h4>
    <CommunContents trimestre="I" />
  </div>
</template>

<style scoped>
  h4 {
    font-style: italic;
  }
</style>
