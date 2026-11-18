# Impostazioni

| Impostazione | Descrizione |
| --- | --- |
| **Riquadri** | I riquadri della riga. Si gestiscono nella finestra **Modifica riquadri**, che si apre nella finestra di dialogo di configurazione. L'impostazione predefinita è nessuna tessera. |
| **Mostra freccia** | Mostra una freccia in alto a destra su ogni tessera collegata. Attivata per impostazione predefinita. Nella finestra a destra sotto **Aspetto**. |

La freccia viene attivata in modo uniforme per tutte le tessere, non singolarmente: una
riga in cui a volte è presente una freccia e a volte no sembra un errore. Sulle
tessere senza destinazione non compare mai — lì non c’è nulla
su cui cliccare.

## La finestra «Modifica riquadri»

La finestra occupa l’intero schermo. In alto si trovano **Applica**,
**Annulla**, **Indietro**, **Ripeti**, la guida e il pulsante per
l’anteprima (Editor, Desktop, Tablet, Mobile). Sotto ci sono tre colonne:

| Sezione | Significato |
| --- | --- |
| **Riquadri** (a sinistra) | Tutti i riquadri in ordine, con anteprima, titolo e link. Trascinandoli dal maniglia o utilizzando la tastiera è possibile riorganizzarli; **Nuovo riquadro** ne aggiunge uno alla fine. |
| **Riquadro x di y** (al centro) | I campi del riquadro selezionato: **Contenuto** (titolo, link), **Immagine** (libreria multimediale, indirizzo, rimuovi) e **Altro** (etichetta, descrizione, testo alternativo, nuova scheda). Sopra di essi, le azioni **Sposta**, **Duplica** e **Elimina** agiscono sul riquadro. |
| **Configurazione** (a destra) | Il pulsante **Mostra freccia**; si applica a tutti i riquadri. |

**Applica** inserisce i riquadri e la freccia nel widget, **Annulla** li elimina
— in caso di modifiche non salvate viene prima chiesto conferma. Lo stato in alto indica
cosa è stato modificato, ad esempio «1 riquadro modificato».

Un riquadro senza titolo riporta nel campo **Titolo** l’avviso «Senza titolo,
il riquadro non viene visualizzato» e nell’elenco è denominato «Senza titolo». Rimane lì
e non va perso al momento del salvataggio; sulla pagina appare solo
non appena ha un titolo.

## Campi di un riquadro

I riquadri e la freccia vengono memorizzati insieme nell’attributo `portfolio-config`
(`{"tiles":[…],"showChevron":true}`, codificato). I widget meno recenti contengono ancora le tessere
come elenco JSON nel campo `tiles` e la freccia in `show-chevron`; entrambi
continuano a essere letti finché `portfolio-config` non imposta il rispettivo valore
. Il formato delle tessere è lo stesso in entrambi i casi:

| Campo | Finestra | Obbligatorio | Significato |
| --- | --- | --- | --- |
| `title` | Titolo | sì | Il titolo del riquadro. Se manca, il riquadro viene saltato. |
| `description` | Descrizione (sotto «Altro») | no | Un breve testo sotto il titolo. |
| `badge` | Etichetta (sotto «Altro») | no | Una piccola etichetta di categoria sopra il titolo. |
| `image` | Immagine | no | Indirizzo dell’immagine. Se manca, il riquadro non presenta un’area immagine. |
| `imageAlt` | Testo alternativo (sotto “Altro”) | no | Testo alternativo per gli screen reader. Lasciare vuoto se l’immagine è solo decorativa. |
| `link` | Link | no | Destinazione del riquadro. Senza destinazione, il riquadro non è cliccabile e non viene visualizzata la freccia. |
| `newTab` | Apri in una nuova scheda (sotto «Altro») | no | `true` apre la destinazione in una nuova scheda. Impostazione predefinita `false`. |
| `id` | — | no | Chiave univoca del riquadro. Viene assegnata automaticamente se mancante. |

Le immagini vengono ritagliate con rapporto 16:9 e riempiono completamente il riquadro.
Fornite immagini in cui il ritaglio ai bordi
non risulti fastidioso.
