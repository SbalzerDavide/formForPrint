<script>
  export default {
    name: 'ContentsContraceptive'
  }
</script>
<template>
  <div class="container">
    <section class="info-box" aria-labelledby="main-title">
      <h2 id="main-title" class="info-title">
        INFORMAZIONI IMPORTANTI SUI CONTRACCETTIVI ORALI COMBINATI (COC) E SUL RISCHIO DI COAGULI DI
        SANGUE
      </h2>

      <p class="lead">
        Tutti i contraccettivi combinati aumentano il rischio di formazione di un coagulo di sangue.
        <strong>
          Il rischio complessivo di un coagulo di sangue dovuto all’assunzione di un contraccettivo
          ormonale combinato (COC) è piccolo
        </strong>
        , ma i coaguli possono rappresentare una condizione grave ed in rarissimi casi persino
        fatale.
      </p>

      <p>
        È molto importante che Lei riconosca quando potrebbe essere in una situazione di maggior
        rischio per la formazione di un coagulo di sangue, quali siano i segni ed i sintomi sui
        quali stare in guardia e quali azioni sia necessario intraprendere.
      </p>

      <div class="section-title">
        In quali situazioni è più alto il rischio di formazione di un coagulo di sangue?
      </div>
      <ul>
        <li>
          durante il primo anno d’uso di un COC (comprendendo anche quando si riprende l’uso dopo un
          intervallo di 4 o più settimane);
        </li>
        <li>se Lei è in sovrappeso;</li>
        <li>se ha più di 35 anni d’età;</li>
        <li>
          se ha un membro della famiglia che abbia avuto un coagulo di sangue in età relativamente
          giovane (cioè al di sotto dei 50 anni);
        </li>
        <li>se ha partorito nelle ultime settimane.</li>
      </ul>

      <p>
        <strong>Se fuma</strong>
        ed ha più di 35 anni, è vivamente invitata a smettere di fumare o ad usare un metodo
        contraccettivo non-ormonale.
      </p>

      <div class="section-title">
        Si rivolga immediatamente ad un medico se manifesta uno dei seguenti sintomi:
      </div>
      <ul class="symptoms-list">
        <li>
          <strong>Un dolore intenso od un gonfiore ad una delle gambe</strong>
          che può essere accompagnato da flaccidità, calore o cambiamenti del colore della pelle
          come la comparsa di pallore, di rossore o di colore bluastra. Potrebbe avere una
          <em>trombosi venosa profonda</em>
          .
        </li>

        <li>
          <strong>
            L’improvvisa ed inspiegabile mancanza di respiro o insorgenza di respirazione rapida
          </strong>
          ; un dolore intenso al petto che può aumentare con la respirazione profonda; una tosse
          improvvisa senza una causa evidente (che può produrre sangue). Potrebbe essere una
          complicazione grave della trombosi venosa profonda chiamata
          <em>embolia polmonare</em>
          . Questo si verifica se il coagulo di sangue migra dalla gamba al polmone.
        </li>

        <li>
          <strong>
            Un dolore al petto, spesso acuto, ma che talvolta si manifesta come un malessere
          </strong>
          , un senso di pressione, di peso, un fastidio della parte alta del corpo che si irradia al
          dorso, alla mandibola, alla gola, al braccio con una sensazione di pienezza associata a
          indigestione o a soffocamento, sudorazioni, nausea, vomito o capogiri. Si potrebbe
          trattare di un
          <em>attacco di cuore</em>
          .
        </li>

        <li>
          <strong>
            Un intorpidimento od un senso di debolezza del viso, del braccio o della gamba
          </strong>
          , specialmente ad un lato del corpo; una difficoltà nel parlare o nel capire;
          un’improvvisa confusione mentale, una perdita improvvisa della vista o una visione
          offuscata; una cefalea/emicrania intensa e peggiore del solito. Si potrebbe trattare di un
          <em>ictus</em>
          .
        </li>
      </ul>
    </section>

    <section class="lower" aria-labelledby="att-title">
      <h3 id="att-title">Faccia attenzione ai sintomi di un coagulo di sangue, specialmente se:</h3>
      <ul>
        <li>ha appena avuto un intervento chirurgico;</li>
        <li>
          è stata immobilizzata per tanto tempo (come ad esempio per un incidente o una malattia,
          oppure perché ha avuto una gamba ingessata);
        </li>
        <li>ha fatto un lungo viaggio (per più di 4 ore).</li>
      </ul>

      <h3 style="margin-top: 10px">
        Si ricordi di comunicare al Suo medico, all’infermiere o al chirurgo che sta assumendo un
        contraccettivo ormonale combinato se:
      </h3>
      <ul>
        <li>Ha avuto o deve sottoporsi ad un intervento chirurgico;</li>
        <li>
          Si trova in una qualsiasi situazione in cui un operatore sanitario Le chiede quali farmaci
          sta assumendo.
        </li>
      </ul>

      <p class="small">
        Per ulteriori informazioni è pregata di leggere attentamente il Foglietto Illustrativo che
        accompagna il farmaco e di riferire subito la comparsa di qualsiasi effetto indesiderato
        associato all’uso del contraccettivo ormonale combinato al Suo medico od al farmacista.
      </p>
    </section>
  </div>
</template>

<style scoped>
  :root {
    --border: #222;
    --muted: #444;
    --box-bg: #fff;
    --page-bg: #f6f6f6;
    --text: #111;
    --max-width: 1100px;
    --gutter: 28px;
    font-family: 'Helvetica Neue', Arial, sans-serif;
  }
  html,
  body {
    height: 100%;
    margin: 0;
    background: var(--page-bg);
    color: var(--text);
  }
  .container {
    max-width: var(--max-width);
    margin: 28px auto;
    padding: var(--gutter);
    box-sizing: border-box;
    background: linear-gradient(#fff, #fff);
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.02);
  }
  header {
    margin-bottom: 12px;
  }
  header .small-title {
    font-size: 14px;
    color: var(--muted);
  }

  /* boxed main information */
  .info-box {
    border: 2px solid var(--border);
    padding: 18px;
    background: var(--box-bg);
  }
  .info-title {
    font-weight: 700;
    text-transform: uppercase;
    text-align: center;
    padding: 6px 10px;
    font-size: 14px;
    background: transparent;
    margin: 0 0 10px 0;
  }
  .lead {
    margin: 6px 0 16px 0;
    line-height: 1.25;
    font-size: 13px;
  }
  .section-title {
    font-weight: 700;
    margin-top: 12px;
    margin-bottom: 8px;
    font-size: 13px;
  }
  ul {
    margin: 6px 0 12px 24px;
    padding: 0;
    line-height: 1.4;
    font-size: 13px;
  }
  li {
    margin-bottom: 6px;
  }
  .important {
    font-weight: 700;
  }
  .symptoms-list {
    margin-top: 8px;
    margin-left: 18px;
  }
  .symptoms-list li {
    margin-bottom: 10px;
  }

  /* lower boxed note */
  .lower {
    margin-top: 28px;
    border: 2px solid var(--border);
    background: var(--box-bg);
    padding: 16px;
  }
  .lower h3 {
    margin: 0 0 8px 0;
    font-size: 13px;
  }
  .lower ul {
    margin-left: 20px;
    font-size: 13px;
    line-height: 1.4;
  }

  /* small print */
  .small {
    font-size: 12px;
    color: var(--muted);
    margin-top: 10px;
    line-height: 1.3;
  }

  @media (max-width: 700px) {
    .container {
      padding: 14px;
    }
    .info-title {
      font-size: 13px;
    }
  }
</style>
