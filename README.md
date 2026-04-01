# lipari-movements-broken

Progetto Angular 19 standalone didattico con **3 bug intenzionali** da trovare e correggere.

---

## Avvio

```bash
npm install && ng serve
```

Apri il browser su `http://localhost:4200`.

---

## 🐛 3 FIX MISSIONS

### MISSIONE 1 — I filtri non filtrano
> I filtri sembrano funzionare (il pulsante si evidenzia) ma la lista non cambia.
> Controlla su cosa stai iterando nel `@for`.

**File:** `src/app/features/accounts/components/movement-list/movement-list.component.html`

---

### MISSIONE 2 — Il click sui movimenti non aggiorna il dettaglio
> Clicchi un movimento ma il dettaglio nel padre non si aggiorna.
> Controlla il nome dell'Output nel figlio e il binding nel template del padre.

**File:** `src/app/features/accounts/containers/account-movements/account-movements.component.html`

---

### MISSIONE 3 — Il badge tipo mostra sempre "—"
> Il badge tipo mostra sempre "—". Controlla i valori nei `@case` dello
> `@switch` — sono case-sensitive!

**File:** `src/app/features/accounts/components/movement-list/movement-list.component.html`

---

## Struttura

```
src/app/
├── app.component.ts / .html
├── features/accounts/
│   ├── models/movement.model.ts          ← AccountMovement, MovementType, MOCK_MOVEMENTS
│   ├── containers/account-movements/     ← componente SMART (padre)
│   │   ├── account-movements.component.ts
│   │   └── account-movements.component.html
│   └── components/movement-list/         ← componente PRESENTATIONAL (figlio)
│       ├── movement-list.component.ts
│       ├── movement-list.component.html
│       └── movement-list.component.scss
└── shared/pipes/
    └── bank-currency.pipe.ts             ← Intl.NumberFormat 'it-IT'
```

---

## Concetti Angular 19 testati

| Concetto | API |
|---|---|
| Input reattivi | `input<T>()` |
| Output con EventEmitter | `output<T>()` |
| Stato locale reattivo | `signal<T>()` |
| Derivato da signals | `computed(() => ...)` |
| Query al figlio | `viewChild(MovementListComponent)` |
| Template control flow | `@if`, `@for`, `@switch`, `@case`, `@empty` |
| Pipe standalone | `@Pipe({ standalone: true })` |

---

## Bonus Mission — Feature da Implementare (opzionale, ~1 ora)

Una volta risolti i 3 bug, implementa la seguente feature per consolidare i concetti del giorno.

### Esportazione movimenti filtrati

L'applicazione mostra i movimenti filtrati ma non permette all'utente di esportarne il contenuto.

**Cosa implementare:**

Aggiungi un pulsante "Esporta CSV" al componente contenitore `AccountMovementsComponent`. Quando premuto, deve scaricare un file `.csv` con i soli movimenti attualmente visibili (già filtrati dalla lista).

Il contenuto del CSV deve includere: data, descrizione, tipo e importo di ogni movimento visibile.

Per ottenere i movimenti filtrati dal componente figlio, usa `viewChild` per accedere a `MovementListComponent` e leggi il suo `computed` che espone la lista filtrata. Non duplicare la logica di filtro nel componente padre.

Il pulsante "Esporta CSV" deve essere disabilitato quando la lista filtrata è vuota.

**Criteri di accettazione:**

- Il click su "Esporta CSV" scarica un file `.csv` con i movimenti correntemente filtrati.
- Il file contiene intestazione e una riga per ogni movimento visibile.
- Se la lista filtrata è vuota, il pulsante è disabilitato e nessun file viene generato.
- La logica di filtro rimane esclusivamente nel `MovementListComponent` — il padre la legge tramite `viewChild`, non la ricalcola.
- Nessun bug risolto in precedenza viene reintrodotto.

---

*LipariBank Prompt Bootcamp — Component Communication & Modern Control Flow — Day 03*
