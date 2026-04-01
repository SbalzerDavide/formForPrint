# Documentazione Funzionale - Form For Print

## 1. Panoramica del Progetto

**Form For Print** è un'applicazione web medica specializzata per la gestione e la stampa di referti ginecologici e ostetrici. Il sistema consente ai professionisti sanitari di compilare, salvare e stampare tre tipologie principali di referti:

- **Ecografie Ostetriche** (screening del I, II, III trimestre e controllo accrescimento)
- **Visite Ginecologiche** (controlli, contraccezione, screening)
- **Visite Ostetriche** (monitoraggio gravidanza, anamnesi ostetrica)

### 1.1 Obiettivi Principali

1. Digitalizzare il processo di compilazione dei referti medici
2. Standardizzare la raccolta dati secondo linee guida SIEOG
3. Automatizzare i calcoli biometrici e percentili fetali
4. Generare documenti stampabili professionali
5. Gestire consensi informati e documentazione medico-legale

### 1.2 Utenti Target

- Ginecologi
- Ostetrici
- Medici ecografisti certificati FMF (Fetal Medicine Foundation)
- Operatori sanitari in ambulatori e studi medici

---

## 2. Architettura Tecnica

### 2.1 Stack Tecnologico

- **Framework**: Vue.js 3.2.45 (Composition API e Options API)
- **Build Tool**: Vite 4.0.0
- **Router**: Vue Router 4.5.1
- **State Management**: Vuex 4.1.0
- **UI Framework**: PrimeVue 4.3.9 (con tema Aura)
- **Icone**: FontAwesome 6.3.0
- **Stili**: SCSS/Sass con sass-embedded
- **Librerie di Supporto**:
  - Day.js per gestione date
  - normal-distribution per calcoli statistici
  - percentile.js per calcoli percentili

### 2.2 Struttura del Progetto

```
formForPrint/
├── public/                    # Asset statici
│   ├── dayjs.min.js          # Libreria date (fallback)
│   ├── percentile.js         # Calcoli percentili (legacy)
│   └── patients.csv          # Database pazienti demo
│
├── src/
│   ├── main.js               # Entry point applicazione
│   ├── App.vue               # Componente root
│   ├── style.css             # Stili globali
│   │
│   ├── assets/               # Fogli di stile SCSS
│   │   ├── form.scss         # Stili per form
│   │   ├── print.scss        # Stili per stampa
│   │   └── utility.scss      # Utility classes
│   │
│   ├── components/           # Componenti Vue riutilizzabili
│   │   ├── consents/         # Moduli consensi informati
│   │   │   ├── 11-13Weeks.vue
│   │   │   ├── DownSyndromeConsents.vue
│   │   │   ├── IITrimestre.vue
│   │   │   ├── IIITrimestre.vue
│   │   │   ├── CommunContents.vue
│   │   │   └── ContentsContraceptive.vue
│   │   │
│   │   ├── printTemplates/   # Template di stampa
│   │   │   ├── Ecografia-ostetrica-print.vue
│   │   │   ├── Visita-ginecologia-print.vue
│   │   │   └── Visita-ostetrica-print.vue
│   │   │
│   │   ├── sections/         # Sezioni form riutilizzabili
│   │   │   ├── Header.vue    # Header con logo e tema
│   │   │   ├── Office.vue    # Selezione studio/operatore
│   │   │   └── Patient.vue   # Dati anagrafici paziente
│   │   │
│   │   ├── visitModules/     # Moduli specializzati
│   │   │   └── PapTest.vue   # Sezione Pap-test
│   │   │
│   │   ├── Informations.vue  # Info medico-legali
│   │   ├── PopupMessage.vue  # Messaggi alert
│   │   └── ThemeSwitch.vue   # Switcher tema chiaro/scuro
│   │
│   ├── const/                # Dati statici e configurazioni
│   │   ├── anatomy.js        # Parametri anatomia fetale
│   │   ├── biometriaFetale.js # Misure biometriche fetali
│   │   ├── doppler.js        # Parametri Doppler
│   │   ├── infections.js     # Screening infezioni
│   │   ├── offices.js        # Studi medici configurati
│   │   ├── users.js          # Operatori sanitari
│   │   └── visits.js         # Configurazioni visite
│   │
│   ├── pages/                # Pagine principali (route)
│   │   ├── Home.vue          # Schermata iniziale
│   │   ├── Visit.vue         # Layout container visite
│   │   ├── Ecografia-ostetrica.vue
│   │   ├── Visita-ginecologica.vue
│   │   ├── Visita-ostetrica.vue
│   │   └── Print.vue         # Pagina stampa
│   │
│   ├── router/               # Configurazione routing
│   │   └── router.js
│   │
│   ├── store/                # Vuex store
│   │   ├── common.store.js   # Store globale
│   │   └── modules/          # Store modulari (vuota)
│   │
│   └── utils/                # Funzioni di utilità
│       ├── cerebellar.js     # Calcolo percentili cervelletto
│       ├── nt.js             # Calcolo translucenza nucale
│       ├── percentile.js     # Formule percentili generali
│       ├── storeModel.js     # Helper Vuex two-way binding
│       └── uterineVal.js     # Valori Doppler uterino
│
├── package.json              # Dipendenze progetto
├── vite.config.js            # Configurazione Vite
└── README.md                 # Readme base
```

---

## 3. Funzionalità Principali

### 3.1 Gestione Pazienti

#### 3.1.1 Anagrafica Paziente (componente: `Patient.vue`)

**Campi gestiti**:

- Nome e cognome
- Data di nascita (con calcolo automatico età)
- Altezza (cm)
- Peso normale (kg)
- Peso attuale (kg)
- BMI (calcolato automaticamente)
- Note aggiuntive paziente

**Calcolo BMI**:

```javascript
BMI = peso_attuale (kg) / (altezza_metri)²
```

**Funzionalità**:

- Caricamento pazienti da file CSV (`patients.csv`)
- Autocompletamento dati paziente
- Validazione campi numerici
- Aggiornamento automatico età al cambio data nascita

### 3.2 Gestione Studio e Operatore

#### 3.2.1 Selezione Studio Medico (componente: `Office.vue`)

**Studi configurati** (in `offices.js`):

- Desenzano
- Pralboino
- Altri...

**Configurazione per studio**:

- Nome e indirizzo completo
- Telefono e email
- Ecografo utilizzato (es. Samsung WS80, Samsung HS50)
- Logo studio

**Selezione Operatore**:

- Lista medici configurati (`users.js`)
- ID operatore FMF (Fetal Medicine Foundation)
- Firma digitale
- Timbro professionale

**Automatismi**:

- Cambio ecografo automatico in base allo studio selezionato

### 3.3 Ecografia Ostetrica

#### 3.3.1 Tipologie Ecografie

1. **Ecografia di screening del I trimestre (11-13+6 settimane)**
   - CRL (Crown-Rump Length)
   - Translucenza nucale (NT)
   - Frequenza cardiaca fetale
   - Screening cromosomopatie (Down)
   - Consenso informato allegato

2. **Ecografia di screening del II trimestre (19-21 settimane)**
   - Biometria completa (BPD, HC, AC, FL)
   - Screening morfologia secondo SIEOG
   - Doppler arterie uterine
   - Anatomia fetale dettagliata

3. **Ecografia di screening del III trimestre (30-34 settimane)**
   - Controllo accrescimento
   - Biometria e peso stimato
   - Liquido amniotico
   - Localizzazione placentare

4. **Controllo accrescimento (qualsiasi epoca)**
   - Monitoraggio crescita fetale
   - Doppler ombelicale e cerebrale

#### 3.3.2 Gestione Epoca Gestazionale

**Calcolo da ultima mestruazione (UM)**:

```javascript
// Data presunta parto (DPP)
DPP = UM + 280 giorni

// Settimane gestazionali
settimane = (oggi - UM) / 7
```

**Ridatazione da CRL**:

- Attivabile nel I trimestre
- Modalità interna: calcolo automatico da CRL misurato
- Modalità esterna: inserimento manuale epoca da CRL esterno
- Aggiornamento automatico DPP e settimane

**Differenza epoche**:

```
Δ giorni = |epoca_da_UM - epoca_da_CRL|
```

#### 3.3.3 Biometria Fetale

**Misure gestite** (array `biometriaFetale`):

| Parametro               | Sigla | Unità | Trimestre  | Descrizione          |
| ----------------------- | ----- | ----- | ---------- | -------------------- |
| Diametro biparietale    | BPD   | mm    | I, II, III | Diametro cranio      |
| Lunghezza vertice-sacro | CRL   | mm    | I          | Lunghezza embrione   |
| Translucenza nucale     | NT    | mm    | I          | Screening cromosom.  |
| Frequenza cardiaca      | FCF   | bpm   | I, II      | Battito cardiaco     |
| Circonferenza cranica   | HC/CC | mm    | II, III    | Perimetro cranio     |
| Cisterna magna          | CM    | mm    | II, III    | Spazio liquorale     |
| Cervelletto trasverso   | DBP   | mm    | II, III    | Diametro cervelletto |
| Osso nasale             | NB    | mm    | I, II      | Presenza/lunghezza   |
| Circonferenza addome    | AC    | mm    | II, III    | Perimetro addome     |
| Lunghezza femore        | FL    | mm    | II, III    | Lunghezza femore     |
| Diametro omero          | HL    | mm    | II, III    | Lunghezza omero      |
| Peso fetale stimato     | EFW   | g     | II, III    | Peso calcolato       |
| Liquido amniotico       | AFI   | mm    | II, III    | Indice liquido       |
| Cervicometria           | CERV  | mm    | II, III    | Lunghezza collo      |

**Calcolo Percentili**:

Per ogni misura viene calcolato il percentile rispetto all'epoca gestazionale:

```javascript
// Formula da letteratura (Hadlock et al.)
expectedMean = 4.956737 + 0.0005019687 * GA³ - 0.0001227065 * GA³ * ln(GA)

// Coefficiente di variazione
CV = 0.0001 * (-6.997171 + 0.057559 * GA³ - 0.01493946 * GA³ * ln(GA))

// Skewness
sk = -4.257629 - 2162.234 * GA⁻² + 0.0002301829 * GA³

// Z-score
if (sk == 0):
    Z = CV⁻¹ * ln(valore / expectedMean)
else:
    Z = (CV * sk)⁻¹ * (-1 + (valore / expectedMean)^sk)

// Percentile da Z-score (distribuzione normale)
percentile = normalDistribution.cdf(Z) * 100
```

**Alert automatici**:

- NT > 95° percentile → flag "over95" = true
- Δ NT rispetto al 50° percentile
- Valori fuori range fisiologico

#### 3.3.4 Anatomia Fetale

**Strutture valutate** (array `anatomy`):

- Cranio e SNC (ventricoli, cervelletto, plessi corioidei)
- Profilo e osso nasale
- Colonna vertebrale
- Cuore (4 camere, grossi vasi)
- Diaframma
- Addome (stomaco, reni, vescica)
- Parete addominale
- Arti (femori, omeri)
- Sesso fetale

**Stati possibili**:

- ✓ "Nella norma"
- ✗ "Non visualizzato"
- ⚠ "Alterazione" (con campo testo libero)

#### 3.3.5 Doppler

**Vasi valutati** (array `doppler`):

| Vaso                    | Parametro | Valori Riferimento | Significato Clinico       |
| ----------------------- | --------- | ------------------ | ------------------------- |
| Arteria ombelicale      | PI        | < 95° percentile   | Resistenza placentare     |
| Arteria ombelicale      | RI        | < 0.7              | Flusso ombelicale         |
| Arteria cerebrale media | PI        | > 5° percentile    | Vasodilatazione cerebrale |
| Arteria cerebrale media | PSV       | Varia per GA       | Anemia fetale             |
| Arteria uterina dx      | PI        | < 95° percentile   | Perfusione placentare     |
| Arteria uterina sx      | PI        | < 95° percentile   | Perfusione placentare     |
| Dotto venoso            | Onda A    | Positiva           | Funzione cardiaca         |

**Calcolo Ratio cerebroplacentare (CPR)**:

```javascript
CPR = PI_cerebrale_media / PI_ombelicale
```

**Interpretazione**:

- CPR < 1.0 → Ridistribuzione emodinamica (crescita ritardata)
- CPR ≥ 1.0 → Normale

**Range standard deviazioni** (da letteratura):

```javascript
// Arteria ombelicale PI - deviazioni standard al 95%
SD95_ombelicale = {
  14: [1.46, 1.15],
  15: [1.48, 1.12]
  // ... per ogni settimana
}

// Arteria uterina PI - deviazioni standard al 95%
SD95_uterina = {
  20: [1.32, 0.81],
  21: [1.29, 0.78]
  // ... per ogni settimana
}
```

#### 3.3.6 Altri Parametri Ecografici

**Cuore fetale**:

- Attività cardiaca: Sì/No
- FCF: bpm (con calcolo percentile)

**Liquido amniotico**:

- Normale
- Oligoidramnios (ridotto)
- Polidramnios (aumentato)
- Campo test libero per AFI

**Presentazione fetale**:

- Cefalica
- Podalica
- Trasversa

**Placenta**:

- Localizzazione (anteriore, posteriore, fundica, laterale)
- Inserzione cordonale
- Maturità (grado 0-III)
- Rapporti con OUI (ostio uterino interno)

#### 3.3.7 Consensi Informati

**Consenso screening cromosomopatie** (I trimestre):

- Informativa sui limiti della translucenza nucale
- Spiegazione test combinato / NIPT
- Firma digitale paziente
- Integrato nel referto

**Policy configurabili**:

- Tipo di consenso (standard/esteso)
- Personalizzazione testi
- Archiviazione digitale

#### 3.3.8 Conclusioni e Referto

**Testi pre-compilati** (per trimestre):

_I Trimestre_:

```
Gravidanza intrauterina in regolare evoluzione, CRL corrispondente
all'amenorrea. Ovaie regolari. Allegati al referto n°
Operatore accreditato FMF ID: [ID_OPERATORE]
```

_II Trimestre_:

```
Biometria fetale nella norma per epoca gestazionale.
Morfologia indagabile secondo linee guida SIEOG del II trimestre
nella norma. Velocimetria Doppler delle arterie uterine nella norma.
Fotogrammi allegati al referto n°
```

_III Trimestre_:

```
Biometria fetale nella norma per epoca gestazionale.
Morfologia indagabile secondo linee guida SIEOG del III trimestre
nella norma. Fotogrammi allegati al referto n°
```

**Personalizzazione**:

- 5 campi testo aggiuntivi:
  - Note paziente
  - Note gravidanza
  - Note ecografia
  - Note biometria
  - Note finali
- Modifica libera conclusioni

### 3.4 Visita Ginecologica

#### 3.4.1 Motivo Visita

**Opzioni predefinite**:

- Controllo ginecologico
- Controllo post-partum
- Irregolarità mestruali
- Acne
- Contraccezione
- Infertilità / Ricerca gravidanza

#### 3.4.2 Anamnesi

**Allergie**:

- Lista allergie farmacologiche/alimentari
- Aggiunta dinamica nuove allergie

**Anamnesi familiare**:

- Campo testo libero
- Flag trombofilia familiare (Sì/No)

**Anamnesi patologica remota**:

- Ipotiroidismo
- Ipertensione
- Diabete
- Chirurgia pelvica
- Tonsillectomia
- Appendicectomia
- Endometriosi
- Aggiunta dinamica patologie

**Abitudini**:

- Fumo: Sì/No
- Sigarette/die (se fumatrice)

#### 3.4.3 Anamnesi Ginecologica

**Formula obstetrica (Para)**:

```
Para P-X-Y-Z
P = Parti a termine
X = Parti pretermine
Y = Aborti
Z = Figli viventi
```

**Ciclo mestruale**:

- Data ultima mestruazione
- Regolarità ciclo
- Durata e caratteristiche

**Screening**:

- **Pap-test**:
  - Anno ultimo esame
  - Esito (Negativo, ASCUS, L-SIL, H-SIL, AGC)
- **HPV-DNA**:
  - Esito (Positivo/Negativo)
  - Data esecuzione
- **Mammografia**:
  - Descrizione e data

**Screening infezioni** (configurabile):

- TOXO (Toxoplasmosi)
- RUBEO (Rosolia)
- HBsAg (Epatite B)
- HCV (Epatite C)
- HIV
- TPHA (Sifilide)
- CMV (Citomegalovirus)

#### 3.4.4 Esame Obiettivo

**Esame Seno (ES)**:

- Campo testo libero
- Valutazione palpazione
- Secrezioni

**Esame Obiettivo Ginecologico (EOG)**:

- Genitali esterni
- Speculum (vagina, cervice)
- Esplorazione vaginale (utero, annessi)

**Ecografia transvaginale (ECO TV)**:

- Utero (dimensioni, morfologia, endometrio)
- Ovaie (destro e sinistro)
- Cavo del Douglas
- Eventuali formazioni

#### 3.4.5 Conclusioni

**Conclusioni standardizzate**:

- Paziente sana (checkbox normativa)
- Prescrizione contraccettivo (con campo descrittivo)
- Testo libero personalizzato

**Gestione consenso contraccettivo**:

- Consenso informato automatico
- Informazioni effetti collaterali
- Controindicazioni
- Firma digitale

### 3.5 Visita Ostetrica

#### 3.5.1 Epoca Gestazionale

**Calcolo identico a Ecografia Ostetrica**:

- Da ultima mestruazione
- Ridatazione da CRL (se disponibile)
- Input settimane + giorni

#### 3.5.2 Anamnesi Ostetrica

**Formula obstetrica Para P-X-Y-Z** (identica a ginecologica)

**Screening gravidanza corrente**:

**Gruppo sanguigno**:

- Emogruppo (A, B, AB, 0)
- Rh (Positivo/Negativo)
- Test Coombs indiretto (per Rh negativi)

**Screening diabete gestazionale**:

```
OGTT (Oral Glucose Tolerance Test)
- Glicemia basale (t0)
- Glicemia 60' (t1)
- Glicemia 120' (t2)
```

**Criteri diagnosi**:

- t0 ≥ 92 mg/dl → Diabete gestazionale
- t1 ≥ 180 mg/dl → Diabete gestazionale
- t2 ≥ 153 mg/dl → Diabete gestazionale

**Screening cromosomopatie**:

- **Test combinato** (I trimestre):
  - Esito: Alto rischio / Basso rischio
  - Descrizione dettagliata
- **NIPT** (DNA fetale libero):
  - Esito
  - Descrizione
- **Diagnosi invasiva**:
  - Amniocentesi
  - Villocentesi
  - Esito cariotipo

**Screening infezioni** (identico a visita ginecologica)

#### 3.5.3 Esame Obiettivo Ostetrico

**Campi aggiuntivi rispetto a ginecologica**:

**Pressione arteriosa (PA)**:

- Sistolica / Diastolica
- Monitoraggio ipertensione gravidica

**Valutazione uterina**:

- Altezza fondo uterino (cm)
- Palpazione addominale (manovre Leopold)

**Note esame obiettivo**:

- Campo descrittivo esteso

#### 3.5.4 Referti e Piani

**Referti configurati** (array `reports`):

- Prescrizioni esami
- Piani controlli periodici
- Indicazioni terapeutiche
- Stili di vita in gravidanza

**Selezione multipla**:

- Checkbox referti standard
- Combina automaticamente testi

### 3.6 Funzionalità di Stampa

#### 3.6.1 Layout Stampa

**Formato**: A4

**Sezioni referto**:

1. **Header**:
   - Logo studio
   - Dati studio (indirizzo, telefono, email)
   - Dati operatore
   - Data referto

2. **Dati paziente**:
   - Anagrafica completa
   - BMI
   - Note aggiuntive

3. **Corpo referto** (dipende da tipo):
   - Anamnesi
   - Biometria/Esami
   - Doppler (se ecografia)
   - Anatomia fetale (se ecografia)
   - Esame obiettivo (se visita)

4. **Conclusioni**:
   - Diagnosi
   - Indicazioni
   - Prossimi controlli

5. **Footer**:
   - Firma operatore
   - Timbro professionale
   - Note legali
   - Informativa privacy (se consenso)

#### 3.6.2 Stili Stampa

**File**: `assets/print.scss`

**Ottimizzazioni**:

- Nascondere elementi UI (pulsanti, menu)
- Layout responsive per stampa
- Interruzioni pagina intelligenti
- Margini standardizzati
- Font leggibili (dimensioni fisse)

**Media query**:

```scss
@media print {
  .hide-print {
    display: none !important;
  }
  body {
    font-size: 12pt;
  }
  // ... altre regole
}
```

#### 3.6.3 Flusso Stampa

```
1. Utente compila form
   ↓
2. Click "Genera referto"
   ↓
3. Salvataggio dati in Vuex store
   ↓
4. Navigazione a route "/visita/print"
   ↓
5. Caricamento template stampa corretto
   ↓
6. Rendering HTML con dati store
   ↓
7. Click "Conferma" → window.print()
   ↓
8. Dialog stampa browser
   ↓
9. "Modifica dati" → router.back()
```

---

## 4. Gestione dello Stato (Vuex Store)

### 4.1 Struttura Store

**File**: `src/store/common.store.js`

**State globale**:

```javascript
{
  // Contesto applicazione
  activePage: String,        // Nome pagina corrente
  printType: String,         // Tipo referto da stampare

  // Studio e operatore
  user: Object,              // Operatore selezionato
  office: Object,            // Studio selezionato
  ecoTool: String,           // Ecografo configurato

  // Anagrafica paziente
  patients: Array,           // Lista pazienti caricati
  name: String,
  surname: String,
  dateOfBirth: String,
  age: Number,
  height: Number,
  normalWeight: Number,
  actualWeight: Number,
  bmi: Number,
  patientMoreText: String,

  // Dati Ecografia Ostetrica
  ecografiaOstetricaPrintData: {
    pregnancy: Object,       // Epoca gestazionale
    ecoType: Object,         // Tipo ecografia
    ecoMethod: String,       // Trans-addominale/vaginale
    fetusNumber: Number,
    decimalWeeks: Number,
    enableCRLReDate: Boolean,
    externalCRLReDate: Boolean,
    decimalWeeksFromCRL: Number,
    biometriaFetale: Array,
    cervicometria: String,
    anatomy: Array,
    doppler: Array,
    heart: Boolean,
    liquid: String,
    direction: String,
    placenta: String,
    patientMore: String,
    pregnancyMore: String,
    ecoMore: String,
    biometriaMore: String,
    lastMore: String,
    conclusion: String,
    downSyndromeConsents: Boolean,
    policyType: String
  },

  // Dati Visita Ginecologica
  visitaGinecologicaPrintData: {
    reason: String,
    allergies: Array,
    familyAnamnesis: String,
    trombo: String,
    pathologicalAnamneses: Array,
    smoker: Boolean,
    cigarettesPerDay: Number,
    papTestYear: Number,
    papTestResult: String,
    hpv: String,
    hpvDate: String,
    gynecologicalAnamnesis: Object,
    objectiveExam: Object,
    conclusionNormale: Boolean,
    conclusionContraccettivoDesc: String,
    showContraceptiveInfo: Boolean,
    conclusion: String
  },

  // Dati Visita Ostetrica
  visitaOstetricaPrintData: {
    pregnancy: Object,
    reason: String,
    allergies: Array,
    familyAnamnesis: String,
    trombo: String,
    pathologicalAnamneses: Array,
    smoker: Boolean,
    cigarettesPerDay: Number,
    papTestYear: Number,
    papTestResult: String,
    hpv: String,
    hpvDate: String,
    obstetricAnamnesis: {
      paraP: Number,
      paraX: Number,
      paraY: Number,
      paraZ: Number,
      paraDesc: String,
      lastMenstruationDate: String,
      emogruppo: String,
      coombs: String,
      ogtt1: String,
      ogtt2: String,
      ogtt3: String,
      testCombinato: String,
      testCombinatoDesc: String,
      nipt: String,
      niptDesc: String,
      infections: Array
    },
    objectiveExam: Object,
    conclusion: String,
    selectedReport: String
  }
}
```

### 4.2 Mutations

**Convenzioni naming**: `SET_[NOME_CAMPO]`

**Categorie mutations**:

1. **Contesto applicazione**:
   - `SET_ACTIVE_PAGE(state, page)`
   - `SET_PRINT_TYPE(state, printType)`

2. **Studio/Operatore**:
   - `SET_USER(state, user)`
   - `SET_OFFICE(state, office)` → cambia anche `ecoTool`
   - `SET_ECO_TOOL(state, ecoTool)`
   - `SET_PATIENTS(state, patients)`

3. **Anagrafica paziente**:
   - `SET_NAME(state, name)`
   - `SET_SURNAME(state, surname)`
   - `SET_DATE_OF_BIRTH(state, dateOfBirth)` → calcola `age`
   - `SET_HEIGHT(state, height)` → ricalcola `bmi`
   - `SET_ACTUAL_WEIGHT(state, actualWeight)` → ricalcola `bmi`
   - `SET_NORMAL_WEIGHT(state, normalWeight)`
   - `SET_PATIENT_MORE_TEXT(state, patientMoreText)`

4. **Ecografia**:
   - `SET_PREGNANCY(state, pregnancy)`
   - `SET_ECO_TYPE(state, ecoType)`
   - `SET_ECO_METHOD(state, ecoMethod)`
   - `SET_FETUS_NUMBER(state, fetusNumber)`
   - `SET_DECIMAL_WEEKS(state, decimalWeeks)`
   - `SET_ENABLE_CRL_RE_DATE(state, enableCRLReDate)`
   - `SET_EXTERNAL_CRL_RE_DATE(state, externalCRLReDate)`
   - `SET_DECIMAL_WEEKS_FROM_CRL(state, decimalWeeksFromCRL)`
   - `SET_BIOMETRIA_FETALE(state, biometriaFetale)`
   - `SET_ANATOMY(state, anatomy)`
   - `SET_DOPPLER(state, doppler)`
   - `SET_HEART(state, heart)`
   - `SET_LIQUID(state, liquid)`
   - `SET_DIRECTION(state, direction)`
   - `SET_PLACENTA(state, placenta)`
   - `SET_PATIENT_MORE(state, patientMore)`
   - `SET_PREGNANCY_MORE(state, pregnancyMore)`
   - `SET_ECO_MORE(state, ecoMore)`
   - `SET_BIOMETRIA_MORE(state, biometriaMore)`
   - `SET_LAST_MORE(state, lastMore)`
   - `SET_CONCLUSION(state, conclusion)`
   - `SET_POLICY_TYPE(state, policyType)`

5. **Visite (parametrizzate)**:
   - `SET_PAPTEST_YEAR(state, { papTestYear, visit })`
   - `SET_PAPTEST_RESULT(state, { papTestResult, visit })`
   - `SET_HPV(state, { hpv, visit })`
   - `SET_HPV_DATE(state, { hpvDate, visit })`

6. **Bulk updates**:
   - `SET_ECOGRAFIA_OSTETRICA_PRINT_DATA(state, data)`
   - `SET_VISITA_GINECOLOGICA_PRINT_DATA(state, data)`
   - `SET_VISITA_OSTETRICA_PRINT_DATA(state, data)`

### 4.3 Helper: storeModel

**File**: `src/utils/storeModel.js`

**Scopo**: Two-way binding tra computed property e Vuex store

**Utilizzo**:

```javascript
import { storeModel } from '@/utils/storeModel'

export default {
  computed: {
    ecoTool: storeModel('ecoTool', 'SET_ECO_TOOL'),
    name: storeModel('name', 'SET_NAME')
    // ...
  }
}
```

**Implementazione**:

```javascript
export const storeModel = (key, mutation) => ({
  get() {
    return this.$store.state[key]
  },
  set(value) {
    this.$store.commit(mutation, value)
  }
})
```

---

## 5. Algoritmi e Calcoli Medici

### 5.1 Calcolo Percentili Biometrici

**Riferimento**: Hadlock formulas (1991), Salomon et al. (2006)

**File**: `src/utils/percentile.js`

#### Formula Generale

```javascript
// 1. Media attesa per epoca gestazionale (GA in settimane)
expectedMean(GA) = 4.956737 +
                   0.0005019687 × GA³ -
                   0.0001227065 × GA³ × ln(GA)

// 2. Coefficiente di variazione
CV(GA) = 0.0001 × (-6.997171 +
                    0.057559 × GA³ -
                    0.01493946 × GA³ × ln(GA))

// 3. Skewness (asimmetria distribuzione)
sk(GA) = -4.257629 -
         2162.234 × GA⁻² +
         0.0002301829 × GA³

// 4. Z-score dal valore misurato
if (sk == 0):
    Z = (1 / CV) × ln(valore / expectedMean)
else:
    Z = (1 / (CV × sk)) × (-1 + (valore / expectedMean)^sk)

// 5. Conversione Z-score in percentile
percentile = Φ(Z) × 100
// dove Φ è la funzione di distribuzione cumulativa normale standard
```

**Libreria utilizzata**: `normal-distribution` (npm)

```javascript
import NormalDistribution from 'normal-distribution'
const normalDist = new NormalDistribution()
const percentile = normalDist.cdf(zScore) * 100
```

### 5.2 Percentile Translucenza Nucale (NT)

**File**: `src/utils/nt.js`

**Dati**: Tabelle FMF (Fetal Medicine Foundation)

**Struttura dati**:

```javascript
export const ntRangeValues = {
  45: {
    // CRL in mm
    '5th': 0.8, // 5° percentile
    '50th': 1.1, // 50° percentile (mediana)
    '95th': 1.8 // 95° percentile
  }
  // ... per ogni valore CRL da 45mm a 84mm
}
```

**Interpretazione**:

- NT > 95° percentile → Aumentato rischio cromosomopatie
- NT > 3.5 mm → Sempre patologico (indipendentemente da CRL)

**Alert automatico**:

```javascript
if (nt > ntRangeValues[crl]['95th']) {
  biometriaFetale[indexNT].over95 = true
  biometriaFetale[indexNT].delta = nt - ntRangeValues[crl]['50th']
}
```

### 5.3 Percentile Cervelletto

**File**: `src/utils/cerebellar.js`

**Formula**: Regressione polinomiale da studi ecografici

```javascript
export const estimateCerebelarPercentile = (GA, DBP_mm) => {
  // GA = epoca gestazionale in settimane decimali
  // DBP = Diametro biparietale (o cerebellare trasverso)

  // Coefficienti regressione (da letteratura)
  const a0 = -8.234
  const a1 = 2.451
  const a2 = -0.0312

  const expectedDBP = a0 + a1 * GA + a2 * GA²

  // Calcolo Z-score
  const SD = 1.2 // Deviazione standard (da letteratura)
  const zScore = (DBP_mm - expectedDBP) / SD

  // Conversione in percentile
  return normalDist.cdf(zScore) * 100
}
```

### 5.4 Doppler - Range Standard Deviation

#### Arteria Ombelicale

**File**: `src/utils/uterineVal.js`

**Dati**: Range PI (Pulsatility Index) al 5° e 95° percentile

```javascript
export const ombelicaleStd95RangeValues = {
  14: [1.46, 1.15], // [Limite superiore 95°, Limite inferiore 5°]
  15: [1.48, 1.12],
  // ... per ogni settimana 14-42
  42: [0.76, 0.52]
}
```

**Valutazione**:

```javascript
const PI_ombelicale = misurato_PI
const GA_settimane = Math.floor(decimalWeeks)

if (PI_ombelicale > ombelicaleStd95RangeValues[GA_settimane][0]) {
  alert('PI ombelicale > 95° percentile → Resistenza placentare aumentata')
} else if (PI_ombelicale < ombelicaleStd95RangeValues[GA_settimane][1]) {
  alert('PI ombelicale < 5° percentile → Flusso aumentato (raro)')
}
```

#### Arterie Uterine

```javascript
export const uterineStd95RangeValues = {
  20: [1.32, 0.81], // [95°, 5°]
  21: [1.29, 0.78]
  // ... per ogni settimana 20-42
}
```

**Media bilaterale**:

```javascript
const PI_medio = (PI_uterina_dx + PI_uterina_sx) / 2
```

**Valutazione rischio**:

- PI medio > 95° percentile → Aumentato rischio preeclampsia e IUGR

### 5.5 Calcolo Peso Fetale Stimato (EFW)

**Formula di Hadlock** (più comune):

```javascript
log₁₀(EFW) = 1.326 - 0.00326 × AC × FL +
             0.0107 × HC + 0.0438 × AC +
             0.158 × FL

// dove:
// EFW = Estimated Fetal Weight (grammi)
// AC = Abdominal Circumference (cm)
// HC = Head Circumference (cm)
// FL = Femur Length (cm)
```

**Conversione unità**:

```javascript
AC_cm = AC_mm / 10
HC_cm = HC_mm / 10
FL_cm = FL_mm / 10

EFW_g = 10 ^ formula_sopra
```

**Percentile EFW**:

- Utilizzare stesso metodo di altri parametri biometrici
- Confronto con curve di crescita (Hadlock, Intergrowth-21st)

### 5.6 Calcolo BMI

**Formula standard OMS**:

```javascript
BMI = peso_kg / (altezza_m)²
```

**Classificazione OMS**:

```javascript
function classificaBMI(bmi) {
  if (bmi < 18.5) return 'Sottopeso'
  if (bmi < 25.0) return 'Normopeso'
  if (bmi < 30.0) return 'Sovrappeso'
  if (bmi < 35.0) return 'Obesità I grado'
  if (bmi < 40.0) return 'Obesità II grado'
  return 'Obesità III grado'
}
```

**Rilevanza ostetrica**:

- BMI pre-gravidico determina peso target da aumentare
- BMI > 30 → Aumentato rischio diabete gestazionale, macrosomia

### 5.7 Calcolo Epoca Gestazionale

#### Da Ultima Mestruazione (UM)

**Regola di Naegele** (DPP - Data Presunta Parto):

```javascript
DPP = UM + 280 giorni

// Alternativamente:
DPP = (UM + 7 giorni) - 3 mesi
```

**Settimane gestazionali**:

```javascript
const oggi = new Date()
const ultimaMestruazione = new Date(UM)
const differenza_ms = oggi - ultimaMestruazione
const giorni_gestazione = differenza_ms / (1000 * 60 * 60 * 24)
const settimane = Math.floor(giorni_gestazione / 7)
const giorni = giorni_gestazione % 7

const decimalWeeks = giorni_gestazione / 7
```

#### Da CRL (Crown-Rump Length)

**Formula Robinson & Fleming** (1975):

```javascript
GA_giorni = 8.052 × √(CRL_mm × 1.037) + 23.73

// O formula più moderna (Papaioannou et al., 2010):
GA_giorni = 40.9041 + 3.21585 × CRL_mm⁰⁷⁹⁴

GA_settimane = GA_giorni / 7
```

**Tabella di conversione diretta**:

```javascript
const CRL_to_weeks = {
  15: 7 + 1 / 7, // 7 settimane + 1 giorno
  20: 8 + 2 / 7,
  25: 9 + 1 / 7,
  // ... tabella completa
  84: 13 + 6 / 7
}
```

**Criterio ridatazione** (ACOG):

- Se |GA_da_CRL - GA_da_UM| > 5 giorni → Ridatare con CRL
- CRL più accurato nel I trimestre

### 5.8 Calcolo AFI (Amniotic Fluid Index)

**Metodo a 4 quadranti**:

```javascript
// Dividere addome materno in 4 quadranti
// Misurare tasca massima verticale in ciascuno

AFI = tasca_quadrante1 + tasca_quadrante2 + tasca_quadrante3 + tasca_quadrante4

// Unità: cm
```

**Interpretazione**:

```javascript
function classificaLiquido(AFI_cm) {
  if (AFI_cm < 5) return 'Oligoidramnios severo'
  if (AFI_cm < 8) return 'Oligoidramnios borderline'
  if (AFI_cm <= 24) return 'Normale'
  if (AFI_cm <= 30) return 'Polidramnios borderline'
  return 'Polidramnios'
}
```

---

## 6. Flusso Utente

### 6.1 Flusso Ecografia Ostetrica

```
┌─────────────────────────────────────────────────────────────┐
│ 1. HOME                                                     │
│    - Schermata iniziale                                     │
│    - Selezione "Ecografia Ostetrica"                        │
└─────────────────────────────────────┬───────────────────────┘
                                      │
                                      ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. SETUP STUDIO/OPERATORE                                   │
│    - Selezione studio medico                                │
│    - Selezione operatore                                    │
│    → Configurazione automatica ecografo                     │
└─────────────────────────────────────┬───────────────────────┘
                                      │
                                      ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. ANAGRAFICA PAZIENTE                                      │
│    - Ricerca/caricamento da CSV                             │
│    - Nome, cognome, data nascita                            │
│    - Peso, altezza → Calcolo BMI automatico                 │
└─────────────────────────────────────┬───────────────────────┘
                                      │
                                      ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. EPOCA GESTAZIONALE                                       │
│    - Input ultima mestruazione                              │
│    → Calcolo automatico DPP e settimane                     │
│    - (Opzionale) Ridatazione da CRL                         │
│    → Calcolo settimane da CRL                               │
└─────────────────────────────────────┬───────────────────────┘
                                      │
                                      ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. TIPO ECOGRAFIA                                           │
│    - Selezione trimestre (I, II, III) o Controllo           │
│    → Carica template biometria corretto                     │
│    → Pre-compila conclusioni standard                       │
└─────────────────────────────────────┬───────────────────────┘
                                      │
                                      ↓
┌─────────────────────────────────────────────────────────────┐
│ 6. BIOMETRIA FETALE                                         │
│    - Input misure (BPD, CRL, HC, AC, FL, NT, ...)          │
│    → Calcolo percentili automatico                          │
│    → Alert se fuori range                                   │
│    - Peso fetale stimato (da formule)                       │
└─────────────────────────────────────┬───────────────────────┘
                                      │
                                      ↓
┌─────────────────────────────────────────────────────────────┐
│ 7. ANATOMIA FETALE (se II/III trim.)                        │
│    - Checklist strutture anatomiche                         │
│    - Stato: Normale / Non visualizzato / Alterato           │
└─────────────────────────────────────┬───────────────────────┘
                                      │
                                      ↓
┌─────────────────────────────────────────────────────────────┐
│ 8. DOPPLER (se II/III trim.)                                │
│    - Input PI/RI arterie                                    │
│    → Verifica range SD 5°-95°                               │
│    → Calcolo CPR automatico                                 │
└─────────────────────────────────────┬───────────────────────┘
                                      │
                                      ↓
┌─────────────────────────────────────────────────────────────┐
│ 9. ALTRI PARAMETRI                                          │
│    - Cuore, liquido, presentazione, placenta                │
│    - Note aggiuntive (5 campi opzionali)                    │
└─────────────────────────────────────┬───────────────────────┘
                                      │
                                      ↓
┌─────────────────────────────────────────────────────────────┐
│ 10. CONSENSO INFORMATO (se I trim.)                         │
│     - Visualizzazione consenso screening                    │
│     - Accettazione paziente                                 │
└─────────────────────────────────────┬───────────────────────┘
                                      │
                                      ↓
┌─────────────────────────────────────────────────────────────┐
│ 11. CONCLUSIONI                                             │
│     - Testo conclusivo pre-compilato                        │
│     - Possibilità modifica                                  │
│     - Preview referto                                       │
└─────────────────────────────────────┬───────────────────────┘
                                      │
                                      ↓
┌─────────────────────────────────────────────────────────────┐
│ 12. STAMPA                                                  │
│     - Click "Genera referto"                                │
│     → Salvataggio dati in store                             │
│     → Navigazione a /visita/print                           │
│     - Rendering template stampa                             │
│     - Click "Conferma" → Dialog stampa                      │
│     - (Opzionale) "Modifica" → Torna al form                │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 Flusso Visita Ginecologica

```
HOME → Setup Studio/Operatore → Anagrafica Paziente →
Motivo Visita → Anamnesi (Familiare, Patologica, Ginecologica) →
Pap-test e HPV → Esame Obiettivo (Seno, Ginecologico, Eco TV) →
Conclusioni → Consenso Contraccettivo (se necessario) → STAMPA
```

### 6.3 Flusso Visita Ostetrica

```
HOME → Setup Studio/Operatore → Anagrafica Paziente →
Epoca Gestazionale → Motivo Visita (es: "Gravida para a X settimane") →
Anamnesi (Familiare, Patologica, Ostetrica) →
Screening (OGTT, Test Combinato, NIPT, Infezioni) →
Esame Obiettivo (PA, EOG, Eco TV) →
Selezione Referti Standard → Conclusioni → STAMPA
```

---

## 7. Componenti Chiave

### 7.1 Componente Header

**File**: `src/components/sections/Header.vue`

**Responsabilità**:

- Visualizzare logo applicazione
- Mostrare nome pagina corrente
- Integrare ThemeSwitch (cambio tema chiaro/scuro)

**Props**: Nessuna (utilizza Vuex store)

**Computed properties**:

- `activePage` → da `$store.state.activePage`

### 7.2 Componente Office

**File**: `src/components/sections/Office.vue`

**Responsabilità**:

- Dropdown selezione studio medico
- Dropdown selezione operatore sanitario
- Input ecografo (con default da studio)

**Data**:

```javascript
{
  users: Array,      // da const/users.js
  offices: Array,    // da const/offices.js
}
```

**Computed (two-way binding con store)**:

- `user` → `SET_USER`
- `office` → `SET_OFFICE`
- `ecoTool` → `SET_ECO_TOOL`

**Watch**:

- `office` → Cambio automatico `ecoTool` in base a configurazione

### 7.3 Componente Patient

**File**: `src/components/sections/Patient.vue`

**Responsabilità**:

- Form anagrafica paziente
- Caricamento pazienti da CSV
- Autocompletamento dati
- Calcoli automatici (BMI, età)

**Data locale**:

```javascript
{
  patients: Array,         // Lista pazienti caricati
  selectedPatient: Object, // Paziente selezionato da dropdown
  showPatientList: Boolean // Toggle dropdown
}
```

**Computed (two-way con store)**:

- `name` → `SET_NAME`
- `surname` → `SET_SURNAME`
- `dateOfBirth` → `SET_DATE_OF_BIRTH`
- `height` → `SET_HEIGHT`
- `normalWeight` → `SET_NORMAL_WEIGHT`
- `actualWeight` → `SET_ACTUAL_WEIGHT`
- `bmi` (read-only, calcolato in mutation)

**Methods**:

- `loadPatients()` → Fetch da `public/patients.csv`
- `selectPatient(patient)` → Popola form con dati paziente

### 7.4 Componente PapTest

**File**: `src/components/visitModules/PapTest.vue`

**Responsabilità**:

- Form Pap-test (anno, esito)
- Form HPV-DNA (esito, data)
- Riutilizzabile in Visita Ginecologica e Ostetrica

**Props**:

```javascript
{
  visitType: String // "visitaGinecologicaPrintData" o "visitaOstetricaPrintData"
}
```

**Data**:

```javascript
{
  papTestResults: Array, // da const/visits.js
  papTestYear: Number,
  papTestResult: String,
  hpv: String,
  hpvDate: String
}
```

**Methods**:

- `savePapTestData()` → Commit mutation con parametro `visitType`

### 7.5 Componente PopupMessage

**File**: `src/components/PopupMessage.vue`

**Responsabilità**:

- Visualizzare messaggi di alert/conferma
- Supporta tipi: success, error, warning, info

**Props**:

```javascript
{
  message: String,    // Testo messaggio
  type: String,       // "success" | "error" | "warning" | "info"
  trigger: Boolean    // Toggle per mostrare/nascondere
}
```

**Stile dinamico**:

- Background color diverso per tipo
- Icona FontAwesome appropriata
- Auto-hide dopo 3 secondi (opzionale)

### 7.6 Componente ThemeSwitch

**File**: `src/components/ThemeSwitch.vue`

**Responsabilità**:

- Toggle tema chiaro/scuro
- Persistenza preferenza in localStorage
- Supporto tema sistema operativo

**Data**:

```javascript
{
  theme: String // "light" | "dark" | "system"
}
```

**Methods**:

- `setTheme(theme)` → Salva in localStorage, applica classe CSS

**Logica tema**:

```javascript
if (theme === 'dark') {
  document.body.classList.add('theme-dark')
  document.body.classList.remove('theme-light')
} else if (theme === 'light') {
  document.body.classList.add('theme-light')
  document.body.classList.remove('theme-dark')
} else {
  // System
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('system-dark')
  } else {
    document.body.classList.add('system-light')
  }
}
```

### 7.7 Template di Stampa

**Files**:

- `src/components/printTemplates/Ecografia-ostetrica-print.vue`
- `src/components/printTemplates/Visita-ginecologia-print.vue`
- `src/components/printTemplates/Visita-ostetrica-print.vue`

**Struttura comune**:

```vue
<template>
  <div class="print-template">
    <!-- Header studio -->
    <header>
      <img :src="office.logo" />
      <div class="office-info">
        <h2>{{ office.name }}</h2>
        <p>{{ office.address }}</p>
        <p>Tel: {{ office.phone }} - Email: {{ office.email }}</p>
      </div>
    </header>

    <!-- Dati paziente -->
    <section class="patient-data">
      <h3>Dati Paziente</h3>
      <dl>
        <dt>Nome:</dt>
        <dd>{{ surname }} {{ name }}</dd>
        <dt>Data di nascita:</dt>
        <dd>{{ dateOfBirth }} ({{ age }} anni)</dd>
        <dt>BMI:</dt>
        <dd>{{ bmi }}</dd>
      </dl>
    </section>

    <!-- Corpo referto (specifico per tipo) -->
    <section class="report-body">
      <!-- Contenuto dinamico -->
    </section>

    <!-- Conclusioni -->
    <section class="conclusions">
      <h3>Conclusioni</h3>
      <p>{{ conclusion }}</p>
    </section>

    <!-- Footer firma -->
    <footer>
      <div class="signature">
        <p>{{ user.name }}</p>
        <img :src="user.signature" />
        <img :src="user.stamp" />
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    computed: {
      // Mappa dati da Vuex store
      ...mapState([
        'office',
        'user',
        'name',
        'surname',
        'dateOfBirth',
        'age',
        'bmi',
        'ecografiaOstetricaPrintData' // o altro
      ])
    }
  }
</script>

<style lang="scss" scoped>
  @use '@/assets/print.scss';

  .print-template {
    width: 21cm;
    min-height: 29.7cm;
    padding: 1cm;
    margin: 0 auto;
    background: white;
  }

  @media print {
    .print-template {
      margin: 0;
      padding: 0.5cm;
    }
  }
</style>
```

### 7.8 Componenti Consensi

**Directory**: `src/components/consents/`

**Consensi disponibili**:

1. **11-13Weeks.vue** - Consenso screening I trimestre
2. **DownSyndromeConsents.vue** - Consenso screening Sindrome di Down
3. **IITrimestre.vue** - Informativa ecografia II trimestre
4. **IIITrimestre.vue** - Informativa ecografia III trimestre
5. **CommunContents.vue** - Contenuti comuni (privacy, limitazioni)
6. **ContentsContraceptive.vue** - Consenso prescrizione contraccettivi

**Struttura standard consenso**:

```vue
<template>
  <div class="consent-document">
    <h2>{{ title }}</h2>

    <section class="consent-intro">
      <p>{{ introText }}</p>
    </section>

    <section class="consent-details">
      <h3>Informazioni</h3>
      <ul>
        <li v-for="info in informations" :key="info.id">
          {{ info.text }}
        </li>
      </ul>
    </section>

    <section class="consent-risks">
      <h3>Limitazioni e Rischi</h3>
      <p>{{ risksText }}</p>
    </section>

    <section class="consent-signature">
      <p>Data: {{ currentDate }}</p>
      <div class="signature-box">
        <span>Firma paziente:</span>
        <div class="signature-line"></div>
      </div>
    </section>
  </div>
</template>
```

---

## 8. File di Configurazione

### 8.1 offices.js

**File**: `src/const/offices.js`

**Struttura**:

```javascript
export const Offices = [
  {
    id: 'desenzano',
    name: 'Studio Medico Dr. Rossi',
    address: 'Via Roma 123, 25015 Desenzano del Garda (BS)',
    phone: '+39 030 1234567',
    email: 'info@studiorossi.it',
    logo: '/img/logo-desenzano.png',
    defaultEcografo: 'Samsung WS80'
  },
  {
    id: 'pralboino',
    name: 'Ambulatorio Pralboino',
    address: 'Piazza Garibaldi 45, 25020 Pralboino (BS)',
    phone: '+39 030 9876543',
    email: 'ambulatorio@pralboino.it',
    logo: '/img/logo-pralboino.png',
    defaultEcografo: 'Samsung HS50'
  }
]
```

### 8.2 users.js

**File**: `src/const/users.js`

**Struttura**:

```javascript
export const Users = [
  {
    id: 'dr_rossi',
    name: 'Dr. Mario Rossi',
    title: 'Specialista in Ginecologia e Ostetricia',
    operatorId: 'FMF_IT_12345', // ID certificazione FMF
    signature: '/img/firma-rossi.png',
    stamp: '/img/timbro-rossi.png',
    offices: ['desenzano', 'pralboino'] // Studi dove opera
  },
  {
    id: 'dr_bianchi',
    name: 'Dr.ssa Laura Bianchi',
    title: 'Ginecologa',
    operatorId: 'FMF_IT_67890',
    signature: '/img/firma-bianchi.png',
    stamp: '/img/timbro-bianchi.png',
    offices: ['desenzano']
  }
]
```

### 8.3 biometriaFetale.js

**File**: `src/const/biometriaFetale.js`

**Struttura** (vedere sezione 3.3.3)

### 8.4 anatomy.js

**File**: `src/const/anatomy.js`

**Struttura**:

```javascript
export const anatomy = [
  {
    category: 'Cranio e SNC',
    items: [
      {
        name: 'Ventricoli laterali',
        status: 'normal', // 'normal' | 'not-visible' | 'altered'
        note: ''
      },
      {
        name: 'Cervelletto',
        status: 'normal',
        note: ''
      }
      // ...
    ]
  },
  {
    category: 'Cuore',
    items: [
      {
        name: 'Quattro camere cardiache',
        status: 'normal',
        note: ''
      }
      // ...
    ]
  }
  // ... altre categorie
]
```

### 8.5 doppler.js

**File**: `src/const/doppler.js`

**Struttura**:

```javascript
export const doppler = [
  {
    name: 'Arteria ombelicale',
    parameters: [
      {
        type: 'PI',
        value: null,
        unit: '',
        range: null,
        percentile: null
      },
      {
        type: 'RI',
        value: null,
        unit: '',
        range: null
      }
    ]
  },
  {
    name: 'Arteria cerebrale media',
    parameters: [
      {
        type: 'PI',
        value: null,
        unit: '',
        percentile: null
      },
      {
        type: 'PSV',
        value: null,
        unit: 'cm/s',
        MoM: null
      }
    ]
  },
  {
    name: 'Arteria uterina dx',
    parameters: [
      {
        type: 'PI',
        value: null,
        unit: '',
        percentile: null
      }
    ]
  },
  {
    name: 'Arteria uterina sx',
    parameters: [
      {
        type: 'PI',
        value: null,
        unit: '',
        percentile: null
      }
    ]
  },
  {
    name: 'Dotto venoso',
    parameters: [
      {
        type: 'Onda A',
        value: null,
        positive: null // true/false
      }
    ]
  }
]
```

### 8.6 infections.js

**File**: `src/const/infections.js`

**Struttura**:

```javascript
export const Infections = [
  {
    name: 'TOXO',
    fullName: 'Toxoplasmosi',
    result: '', // es: "IgG+ IgM-"
    date: null,
    note: ''
  },
  {
    name: 'RUBEO',
    fullName: 'Rosolia',
    result: '',
    date: null,
    note: ''
  },
  {
    name: 'HBsAg',
    fullName: 'Epatite B',
    result: '',
    date: null,
    note: ''
  },
  {
    name: 'HCV',
    fullName: 'Epatite C',
    result: '',
    date: null,
    note: ''
  },
  {
    name: 'HIV',
    fullName: 'HIV',
    result: '',
    date: null,
    note: ''
  },
  {
    name: 'TPHA',
    fullName: 'Sifilide',
    result: '',
    date: null,
    note: ''
  },
  {
    name: 'CMV',
    fullName: 'Citomegalovirus',
    result: '',
    date: null,
    note: ''
  }
]
```

### 8.7 visits.js

**File**: `src/const/visits.js`

**Contenuto** (vedere sezione 3.4.1, 3.4.2)

---

## 9. Stili e Temi

### 9.1 Struttura SCSS

**File principali**:

- `src/style.css` - Reset e variabili globali CSS
- `src/assets/utility.scss` - Classi utility (flexbox, spacing, ...)
- `src/assets/form.scss` - Stili form e input
- `src/assets/print.scss` - Stili specifici stampa

### 9.2 Variabili Tema

**Definite in**: `src/style.css`

```css
:root {
  /* Colori primari */
  --color-primary: #55917F;
  --color-secondary: #7BAAA2;
  --color-accent: #9FC5BD;

  /* Colori testo */
  --color-text: #2C3E50;
  --color-text-light: #7F8C8D;

  /* Colori sfondo */
  --color-bg: #FFFFFF;
  --color-bg-secondary: #F8F9FA;

  /* Colori stato */
  --color-success: #27AE60;
  --color-error: #E74C3C;
  --color-warning: #F39C12;
  --color-info: #3498DB;

  /* Spaziature */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  /* Font */
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-size-base: 16px;
  --font-size-sm: 14px;
  --font-size- lg: 18px;
  --font-size-xl: 24px;
}
```

### 9.3 Tema Scuro

```css
body.theme-dark {
  --color-text: #ecf0f1;
  --color-text-light: #bdc3c7;
  --color-bg: #2c3e50;
  --color-bg-secondary: #34495e;
}
```

### 9.4 Classi Utility

**File**: `src/assets/utility.scss`

```scss
// Flexbox
.d-flex {
  display: flex;
}
.flex-column {
  flex-direction: column;
}
.flex-row {
  flex-direction: row;
}
.justify-content-center {
  justify-content: center;
}
.align-items-center {
  align-items: center;
}
.flex-wrap {
  flex-wrap: wrap;
}

// Spacing
.mt-1 {
  margin-top: var(--spacing-sm);
}
.mt-2 {
  margin-top: var(--spacing-md);
}
.mt-3 {
  margin-top: var(--spacing-lg);
}
// ... mb, ml, mr, pt, pb, pl, pr

// Display
.d-none {
  display: none;
}
.d-block {
  display: block;
}
.d-inline {
  display: inline;
}
.d-inline-block {
  display: inline-block;
}

// Text
.text-center {
  text-align: center;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
.text-bold {
  font-weight: bold;
}

// Colori
.text-primary {
  color: var(--color-primary);
}
.text-success {
  color: var(--color-success);
}
.text-error {
  color: var(--color-error);
}
.text-warning {
  color: var(--color-warning);
}
```

### 9.5 Stili Stampa

**File**: `src/assets/print.scss`

```scss
@media print {
  // Nascondi elementi UI
  .hide-print,
  button:not(.keep-print),
  nav,
  .theme-switch,
  .popup-message {
    display: none !important;
  }

  // Reset layout
  body {
    margin: 0;
    padding: 0;
    background: white;
  }

  // Formato A4
  .print-template {
    width: 21cm;
    height: 29.7cm;
    margin: 0;
    padding: 1cm;
    page-break-after: always;
  }

  // Font stampa
  * {
    font-family: 'Times New Roman', serif;
    font-size: 12pt;
    line-height: 1.5;
    color: black;
  }

  // Titoli
  h1 {
    font-size: 18pt;
  }
  h2 {
    font-size: 16pt;
  }
  h3 {
    font-size: 14pt;
  }

  // Tabelle
  table {
    border-collapse: collapse;
    width: 100%;
  }

  th,
  td {
    border: 1px solid black;
    padding: 0.5cm;
  }

  // Interruzioni pagina
  .page-break {
    page-break-before: always;
  }

  .avoid-break {
    page-break-inside: avoid;
  }

  // Header/footer stampa
  @page {
    margin: 1cm;

    @top-right {
      content: 'Pagina ' counter(page) ' di ' counter(pages);
    }
  }
}
```

---

## 10. Routing

### 10.1 Configurazione Router

**File**: `src/router/router.js`

```javascript
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue')
  },
  {
    path: '/visita',
    name: 'Visita',
    component: () => import('@/pages/Visit.vue'),
    children: [
      {
        path: 'ecografia-ostetrica',
        name: 'EcografiaOstetrica',
        component: () => import('@/pages/Ecografia-ostetrica.vue')
      },
      {
        path: 'visita-ginecologica',
        name: 'VisitaGinecologica',
        component: () => import('@/pages/Visita-ginecologica.vue')
      },
      {
        path: 'visita-ostetrica',
        name: 'VisitaOstetrica',
        component: () => import('@/pages/Visita-ostetrica.vue')
      },
      {
        path: 'print',
        name: 'Print',
        component: () => import('@/pages/Print.vue')
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
```

### 10.2 Navigazione Programmatica

**Esempi nel codice**:

```javascript
// Da Home a Ecografia
this.$router.push({ name: 'EcografiaOstetrica' })

// Da form a Print con parametri
this.$store.commit('SET_PRINT_TYPE', 'ecografia-ostetrica')
this.$router.push({ name: 'Print' })

// Tornare indietro
this.$router.back()
```

### 10.3 Guard di Navigazione

**Possibili implementazioni future**:

```javascript
router.beforeEach((to, from, next) => {
  // Verifica dati paziente prima di stampa
  if (to.name === 'Print') {
    const store = useStore()
    if (!store.state.name || !store.state.surname) {
      alert('Compilare dati paziente')
      next({ name: from.name })
    } else {
      next()
    }
  } else {
    next()
  }
})
```

---

## 12. Sicurezza e Privacy

### 12.1 Conformità GDPR

**Dati sensibili gestiti**:

- Dati anagrafici pazienti
- Dati sanitari (referto medico - articolo 9 GDPR)
- Immagini ecografiche

**Misure implementate**:

- Dati gestiti solo in memoria (Vuex, non persistiti su disco)
- Nessun invio automatico a server esterni
- Gestione locale dei dati sensibili

### 12.2 Autenticazione e Autorizzazione

**Stato attuale**:

- Selezione manuale operatore da lista predefinita
- Nessuna autenticazione password
- Sistema single-user per postazione

### 12.3 Validazione Input

**Validazioni implementate**:

- Calcoli automatici per BMI ed età
- Validazione range percentili
- Controllo formato date con Day.js
- Alert automatici per valori fuori range clinico

### 12.4 Persistenza Dati

**Gestione attuale**:

- Dati mantenuti in Vuex store durante la sessione
- Persistenza tramite localStorage per preferenze tema
- Referti generati al momento della stampa
- Non è previsto salvataggio automatico dei dati clinici

---

## 13. Performance e Ottimizzazione

### 13.1 Gestione Risorse

**Build tool**: Vite 4.0.0

- Hot Module Replacement (HMR) in sviluppo
- Build ottimizzato per produzione
- Tree-shaking automatico del codice non utilizzato

### 13.2 Librerie

**Dipendenze ottimizzate**:

- Vue 3 con modalità production
- Day.js invece di Moment.js (più leggero)
- normal-distribution per calcoli statistici
- PrimeVue con import selettivo componenti

### 13.3 Stili

**SCSS modulare**:

- Fogli di stile separati per form, print, utility
- Media queries per ottimizzazione stampa
- Variabili CSS per temi dinamici

---

## 14. Testing

**Stato attuale**: Il progetto non include test automatizzati.

**Test manuali eseguiti**:

- Compilazione form con dati reali
- Verifica calcoli percentili biometrici
- Generazione e stampa referti
- Test compatibilità browser (Chrome, Firefox, Safari)
- Verifica layout stampa A4
- Test tema chiaro/scuro
- Validazione campi input

---

## 15. Deployment

### 15.1 Build Produzione

```bash
# Installazione dipendenze
pnpm install

# Build ottimizzato
pnpm run build

# Output in: dist/
```

### 15.2 Hosting Statico

**Opzioni**:

1. **Vercel** (consigliato per Vue)

   ```bash
   vercel --prod
   ```

2. **Netlify**

   ```bash
   netlify deploy --prod
   ```

3. **GitHub Pages**

   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy
   on:
     push:
       branches: [master]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
         - run: pnpm install
         - run: pnpm build
         - uses: JamesIves/github-pages-deploy-action@v4
           with:
             folder: dist
   ```

4. **Server proprio (Nginx)**
   ```nginx
   server {
     listen 80;
     server_name formforprint.example.com;

     root /var/www/formforprint/dist;
     index index.html;

     location / {
       try_files $uri $uri/ /index.html;
     }

     # Caching static assets
     location ~* \.(js|css|png|jpg|jpeg|gif|ico|woff|woff2)$ {
       expires 1y;
       add_header Cache-Control "public, immutable";
     }
   }
   ```

### 15.3 Variabili d'Ambiente

**File**: `.env.production`

```env
VITE_APP_TITLE=Form For Print
VITE_API_BASE_URL=https://api.formforprint.example.com
VITE_UPLOAD_MAX_SIZE=10485760
VITE_SENTRY_DSN=https://...
```

**Utilizzo**:

```javascript
const apiUrl = import.meta.env.VITE_API_BASE_URL
```

### 15.4 CI/CD Pipeline

**Esempio GitLab CI**:

```yaml
stages:
  - test
  - build
  - deploy

test:
  stage: test
  script:
    - pnpm install
    - pnpm run test
    - pnpm run lint

build:
  stage: build
  script:
    - pnpm install
    - pnpm run build
  artifacts:
    paths:
      - dist/
  only:
    - master

deploy_production:
  stage: deploy
  script:
    - rsync -avz dist/ user@server:/var/www/formforprint/
  environment:
    name: production
    url: https://formforprint.example.com
  only:
    - master
```

---

## 16. Manutenzione

### 16.1 Note Tecniche

**Dipendenze mantenute**:

- Aggiornamenti regolari di Vue, Vite, PrimeVue
- Monitoraggio vulnerabilità di sicurezza
- Compatibilità con browser moderni

**Backup codice**:

- Repository Git su GitHub
- Branch: master (produzione), develop (sviluppo)

### 16.2 Contribuire al Progetto

**Setup sviluppo**:

```bash
# Clone repository
git clone https://github.com/SbalzerDavide/formForPrint.git
cd formForPrint

# Installazione dipendenze
pnpm install

# Dev server
pnpm run dev

# Lint
pnpm run lint

# Build
pnpm run build
```

**Convenzioni codice**:

- Vue 3 Options API (stile attuale del progetto)
- Nomenclatura: PascalCase componenti, camelCase variabili
- Commit messages: `type(scope): description` (es: `feat(ecografia): add Doppler CPR calculation`)
- Branch: `master` (produzione), `develop` (sviluppo)

### 16.3 Documentazione Codice

**JSDoc per funzioni complesse**:

```javascript
/**
 * Calcola il percentile biometrico fetale
 * @param {number} GA - Epoca gestazionale in settimane decimali
 * @param {number} value - Valore misurato (es: BPD in mm)
 * @param {string} parameter - Nome parametro ('BPD', 'HC', 'AC', 'FL', ...)
 * @returns {number} Percentile (0-100)
 */
export function calculateBiometricPercentile(GA, value, parameter) {
  // ... implementation
}
```

**README componenti**:

```vue
<!--
Component: Patient.vue

Description:
  Form per inserimento dati anagrafici paziente
  con caricamento da CSV e calcolo automatico BMI

Props:
  - loadFromStore: Boolean (default: true)

Emits:
  - patient-loaded: { patient: Object }
  - bmi-calculated: { bmi: Number }

Vuex mutations used:
  - SET_NAME
  - SET_SURNAME
  - SET_DATE_OF_BIRTH
  - SET_HEIGHT
  - SET_ACTUAL_WEIGHT

Examples:
  <Patient :loadFromStore="true" @patient-loaded="handlePatient" />
-->
```

---

## 17. Glossario Medico

| Termine   | Sigla                                               | Significato                               |
| --------- | --------------------------------------------------- | ----------------------------------------- |
| Amenorrea |                                                     | Epoca gestazionale da ultima mestruazione |
| AFI       | Amniotic Fluid Index                                | Indice liquido amniotico                  |
| BPD       | Biparietal Diameter                                 | Diametro biparietale cranio               |
| CRL       | Crown-Rump Length                                   | Lunghezza vertice-sacro (I trim.)         |
| CPR       | Cerebroplacental Ratio                              | Ratio PI cerebrale/ombelicale             |
| DPP       | Data Presunta Parto                                 | Calculated delivery date                  |
| EFW       | Estimated Fetal Weight                              | Peso fetale stimato                       |
| FCF       |                                                     | Frequenza cardiaca fetale                 |
| FMF       | Fetal Medicine Foundation                           | Organizzazione certificazione operatori   |
| GA        | Gestational Age                                     | Epoca gestazionale                        |
| HC/CC     | Head Circumference                                  | Circonferenza cranica                     |
| FL        | Femur Length                                        | Lunghezza femore                          |
| IUGR      | Intrauterine Growth Restriction                     | Ritardo crescita intrauterino             |
| MoM       | Multiples of Median                                 | Multipli della mediana                    |
| NIPT      | Non-Invasive Prenatal Test                          | Test prenatale non invasivo               |
| NT        | Nuchal Translucency                                 | Translucenza nucale                       |
| OGTT      | Oral Glucose Tolerance Test                         | Test carico glucosio                      |
| PI        | Pulsatility Index                                   | Indice pulsatilità Doppler                |
| RI        | Resistance Index                                    | Indice resistenza Doppler                 |
| PSV       | Peak Systolic Velocity                              | Velocità sistolica massima                |
| SIEOG     | Società Italiana Ecografia Ostetrica e Ginecologica | Linee guida italiane                      |
| UM        | Ultima Mestruazione                                 | Last menstrual period                     |

---

## 18. Riferimenti Bibliografici

### 18.1 Letteratura Ecografia

1. **Hadlock FP et al.** (1991). "In Utero Analysis of Fetal Growth: A Sonographic Weight Standard". _Radiology_.

2. **Salomon LJ et al.** (2006). "Practice guidelines for performance of the routine mid-trimester fetal ultrasound scan". _Ultrasound Obstet Gynecol_.

3. **Snijders RJM, Nicolaides KH** (1994). "Fetal biometry at 14-40 weeks' gestation". _Ultrasound Obstet Gynecol_.

4. **Poon LC et al.** (2011). "The role of Doppler ultrasound in the diagnosis and management of fetal growth restriction". _Fetal Diagn Ther_.

### 18.2 Linee Guida

- **SIEOG** (Società Italiana Ecografia Ostetrica e Ginecologica) - Linee guida ecografia I, II, III trimestre
- **ACOG** (American College of Obstetricians and Gynecologists) - Practice Bulletins
- **FMF** (Fetal Medicine Foundation) - NT certification protocols
- **ISUOG** (International Society of Ultrasound in Obstetrics and Gynecology)

### 18.3 Normative

- **GDPR** (Regolamento UE 2016/679) - Protezione dati personali
- **D.Lgs 196/2003** (Codice Privacy italiano)
- **Linee guida Garante Privacy** - Trattamento dati sanitari
- **DL 34/2020** (Decreto Rilancio) - Fascicolo Sanitario Elettronico

---

## 19. Contatti e Supporto

### 19.1 Sviluppatore

- **Nome**: Davide Sbalzer
- **GitHub**: [@SbalzerDavide](https://github.com/SbalzerDavide)
- **Repository**: [formForPrint](https://github.com/SbalzerDavide/formForPrint)

### 19.2 Segnalazione Bug

Aprire una Issue su GitHub:

```
https://github.com/SbalzerDavide/formForPrint/issues/new
```

**Template Issue**:

```markdown
## Descrizione Bug

[Descrizione chiara e concisa]

## Riproduzione

1. Va a '...'
2. Click su '...'
3. Scrivi '...'
4. Vedi errore

## Comportamento Atteso

[Cosa dovrebbe succedere]

## Comportamento Attuale

[Cosa succede invece]

## Screenshot

[Se applicabile]

## Ambiente

- OS: [es: macOS 13.0]
- Browser: [es: Chrome 118]
- Versione App: [es: v0.1.0]

## Altre Informazioni

[Contesto aggiuntivo]
```

### 19.3 Richiesta Feature

Aprire una Feature Request:

```markdown
## Descrizione Feature

[Descrizione chiara funzionalità richiesta]

## Motivazione

[Perché questa feature è utile]

## Proposta Implementazione

[Se hai idee su come implementarla]

## Alternative Considerate

[Altre soluzioni che hai valutato]
```

---

## 20. Changelog

### v0.1.0 (2026-04-01) - Release Corrente

**Features**:

- ✅ Ecografia ostetrica (I, II, III trimestre + controllo accrescimento)
- ✅ Visita ginecologica
- ✅ Visita ostetrica
- ✅ Calcolo percentili biometrici (formule Hadlock, Salomon)
- ✅ Doppler velocimetrico (arterie uterine, ombelicali, cerebrali, dotto venoso)
- ✅ Gestione epoca gestazionale con ridatazione da CRL
- ✅ Template stampa professionali A4
- ✅ Tema chiaro/scuro con supporto preferenza sistema
- ✅ Gestione multi-studio e multi-operatore
- ✅ Calcoli automatici (BMI, età, percentili, CPR)
- ✅ Consensi informati integrati

**Limitazioni**:

- Dati gestiti solo in sessione (non persistiti)
- Stampa tramite dialog browser
- Sistema single-user su postazione locale

---

## Conclusione

**Form For Print** è un'applicazione web per la digitalizzazione e stampa di referti ginecologici e ostetrici, con particolare focus sull'ecografia fetale. Il sistema implementa algoritmi validati scientificamente per il calcolo dei percentili biometrici e l'interpretazione Doppler, rispettando le linee guida SIEOG e FMF.

L'architettura modulare Vue 3 + Vuex garantisce manutenibilità del codice, mentre l'interfaccia intuitiva ottimizza il workflow clinico durante la compilazione dei referti.

---

**Ultima revisione**: 1 aprile 2026  
**Versione documento**: 1.0.0  
**Autore**: Davide Sbalzer
