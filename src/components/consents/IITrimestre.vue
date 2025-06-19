<script>
  import CommunContents from './CommunContents.vue'
  export default {
    components: {
      CommunContents
    },

    name: 'ConcentsIITrimestre',
    props: {}
  }
</script>

<template>
  <section class="consent">
    <h2>INFORMAZIONI SULL’ECOGRAFIA DI SCREENING DEL II TRIMESTRE</h2>
    <h3>Che cos’è l’ecografia?</h3>
    <p>
      L’ecografia è una tecnica che consente di vedere gli organi del nostro corpo con l’utilizzo di
      onde sonore ad alta frequenza (ultrasuoni, non udibili dall’orecchio umano) che attraversano i
      tessuti: quando esse arrivano al feto producono echi che sono trasformati in immagini sul
      monitor dell’ecografia.
    </p>
    <h3>Quando e perché fare l’ecografia di screening del II trimestre?</h3>
    <p>
      Le malformazioni fetali sono condizioni che complicano la gravidanza di 2-3 donne su 100.
      Tutte le donne in gravidanza condividono quindi questo rischio generico di avere un bambino
      affetto da malformazione fetale che viene chiamato "rischio della popolazione generale".
      Questo è il motivo per cui tutte le donne vengono sottoposte in gravidanza ad esami ecografici
      di screening il cui scopo è quello di individuare, in una popolazione di feti apparentemente
      sani, quelli che sono a rischio di malformazione fetale al fine di offrire ad essi un percorso
      diagnostico idoneo. Tale indagine si esegue fra 19 e 21 settimane compiute di età
      gestazionale. Gli scopi per il quale tale accertamento viene proposto ed effettuato sono il
      controllo della vitalità del feto, dell’anatomia e del suo sviluppo. L’esame consente inoltre
      la valutazione della quantità di liquido amniotico e della localizzazione placentare. E'
      possibile anche eseguire nel corso di questa ecografia una datazione ecografica della
      gravidanza nel caso in cui non sia stata effettuata una ecografia di datazione nel I
      trimestre.
    </p>
    <h3>Che cosa si vede con l’ecografia nel II trimestre di gravidanza?</h3>
    <p>
      Questo esame consente di ottenere la misura di alcune parti del corpo del feto ed i valori di
      tali misure vengono confrontati con quelli delle curve di riferimento per valutare se le
      dimensioni corrispondono a quelle attese per l’epoca di gravidanza. Nello stesso esame si
      visualizzano la sede di inserzione placentare, la quantità di liquido amniotico e la struttura
      dei principali organi e distretti anatomici del feto.
    </p>
    <h3>Come si svolge l’esame ecografico del II trimestre di gravidanza?</h3>
    <p>
      Il Medico effettua l’esame appoggiando una sonda sull’addome. Talora è necessario applicare
      una certa pressione per ottenere immagini nitide. A volte l’esame non può essere effettuato in
      modo esaustivo a causa di una posizione fetale persistentemente sfavorevole o della cattiva
      visualizzazione di alcuni organi (es. stomaco o vescica vuoti). In questi casi è necessario
      ripetere l’ecografia dopo qualche ora o giorno per completare lo studio del feto. Nel caso in
      cui venga evidenziato un reperto sospetto il medico esaminatore potrebbe richiedere una
      valutazione ulteriore presso un centro di riferimento per lo studio delle anomalie del feto
      (Ecografia di Riferimento). Peraltro in un buon numero di casi un reperto sospetto
      all’ecografia di screening può rivelarsi non patologico all’esame di approfondimento.
    </p>
    <h3>È possibile rilevare con l’ecografia malformazioni fetali?</h3>
    <p>
      A parte rare eccezioni, non esistono anomalie fetali che sono individuabili sempre e con
      certezza. Dall'analisi dei dati italiani disponibili emerge che solo il 32% delle anomalie
      congenite viene identificato in epoca prenatale nel II e III trimestre. Pertanto, per i limiti
      intrinseci della metodica, è possibile che alcune anomalie fetali, anche gravi, non vengano
      identificate in epoca prenatale. La possibilità di individuare una anomalia non dipende
      necessariamente dalla gravità del difetto ma dalle sue dimensioni e dalla più o meno evidente
      alterazione dell’immagine ecografica che ne risulta. L’accuratezza dello studio ecografico
      nella individuazione delle anomalie fetali può essere limitata dalla sfavorevole posizione del
      feto in utero, dalla ridotta quantità di liquido amniotico e dalla presenza di altri fattori
      quali cicatrici addominali, gemellarità, nodi di mioma e scarsa penetrazione degli ultrasuoni
      attraverso la parete addominale materna (condizione frequente nelle gestanti obese). Inoltre,
      un gruppo di malformazioni a carico di ciascun distretto anatomico del feto (cosiddette
      evolutive) può comparire solo in epoca di gravidanza avanzata o addirittura dopo il parto e
      non essere perciò rilevabile nel corso dell’esame ecografico di screening effettuato nel II
      trimestre. Per tutti questi motivi, anche se un esame ecografico di screening del feto nel II
      trimestre si conclude con un esito normale (evenienza che si verifica nella maggior parte dei
      casi) non è possibile essere del tutto certi che in quel neonato non saranno presenti
      malformazioni congenite.
    </p>
    <h3>È possibile con l’ecografia sospettare anomalie genetiche?</h3>
    <p>
      Non è compito dell’ecografia di screening del II trimestre l’individuazione delle anomalie
      genetiche (cromosomiche e non). Infatti non tutte le malattie genetiche presentano
      malformazioni rilevanti ed evidenziabili all’esame ecografico.
    </p>
    <h3>L’ecografia è innocua per il feto?</h3>
    <p>
      Gli ultrasuoni sono utilizzati nella pratica ostetrica da oltre trent’anni e non sono stati
      riportati effetti dannosi anche a lungo termine, sul feto. Per tale ragione, con le procedure
      oggi adottate, l’uso diagnostico dell’ecografia è ritenuto esente da rischi.
    </p>
    <h4>CONSENSO INFORMATO ALL’ESAME DI SCREENING DEL II TRIMESTRE</h4>
    <CommunContents trimestre="II" />
  </section>
</template>
