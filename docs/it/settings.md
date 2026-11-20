# Impostazioni

| Impostazione | Descrizione |
| --- | --- |
| **Riquadri** | I riquadri della riga. Si gestiscono nella finestra **Modifica riquadri**, che si apre nella finestra di dialogo di configurazione. L'impostazione predefinita è nessuna tessera. |
| **Visualizzazione** | **Tessera immagine** (immagine in alto, ritagliata in formato 16:9, testo sotto) o **Riquadro icona** (icona o immagine adattata, testo centrato su uno sfondo colorato). Per impostazione predefinita è selezionata la piastrella immagine. Nella finestra a destra sotto **Aspetto**. |
| **Dimensione** | **Compatta**, **Normale** o **Grande** — per ogni tipo di visualizzazione. Impostazione predefinita: Normale. Vedi sotto. |
| **Area** | Sfondo delle tessere: **Standard**, un colore della MAN-CI o un valore esadecimale personalizzato (`#RRGGBB`). L’impostazione predefinita è il bianco per la tessera immagine e il rosso MAN per il riquadro icona. |
| **Carattere** | Colore di titolo, etichetta, descrizione e freccia: **Automatico**, un colore della MAN-CI o un valore esadecimale personalizzato. L’impostazione Automatico sceglie, in base allo sfondo selezionato, il colore più leggibile tra scuro e bianco; altrimenti utilizza i consueti colori MAN. |
| **Mostra freccia** | Mostra una freccia in alto a destra su ogni riquadro collegato. Attivata per impostazione predefinita. Nella finestra in basso a destra sotto **Aspetto**. |

Aspetto, dimensioni, colori e freccia valgono per tutte le tessere in comune, non
per singola tessera: una riga in cui ogni tessera ha un aspetto diverso sembra un
errore. Sulle tessere senza destinazione la freccia non appare mai — lì
non c’è nulla su cui cliccare.

## Dimensioni

La dimensione definisce la larghezza minima di una colonna. Il numero di colonne
che possono essere disposte una accanto all’altra dipende dalla larghezza che il widget occupa sulla
pagina; tutte le colonne di una riga hanno la stessa larghezza, tutte le tessere di una
riga hanno la stessa altezza.

| Dimensione | Larghezza minima | A tutta larghezza della pagina | Tablet | Telefono | Particolarità |
| --- | --- | --- | --- | --- | --- |
| **Compatta** | 160 px | circa 7 | 4 | 2 | Caratteri più piccoli; le descrizioni terminano dopo tre righe. L’icona nella casella delle icone ha le stesse dimensioni della versione **Normale**. |
| **Normale** | 280 px | 4 | 2 | 1 | La forma delle versioni precedenti. |
| **Grande** | 440 px | 2 | 1 | 1 | Immagine a sinistra, testo a destra come in un elenco di notizie. Se il riquadro è più stretto di 420 px (telefono), l’immagine torna in alto. Il riquadro delle icone rimane affiancato. |

## Colori

Un’avvisaglia sotto i colori segnala quando il testo sull’area è difficile
da leggere (contrasto inferiore a 4,5 : 1). La combinazione non è vietata.
Passando con il mouse, un’area colorata diventa leggermente più scura; un carattere selezionato
mantiene il proprio colore, invece di diventare rosso.

## La finestra «Modifica riquadri»

La finestra occupa l’intero schermo. In alto si trovano **Applica**,
**Annulla**, **Indietro**, **Ripeti**, la guida e il pulsante per
l’anteprima (Editor, Desktop, Tablet, Mobile). Sotto ci sono tre colonne:

| Sezione | Significato |
| --- | --- |
| **Riquadri** (a sinistra) | Tutti i riquadri in ordine, con anteprima, titolo e link. Trascinandoli dal maniglia o utilizzando la tastiera è possibile riorganizzarli; **Nuovo riquadro** ne aggiunge uno alla fine. |
| **Riquadro x di y** (al centro) | I campi del riquadro selezionato: **Contenuto** (titolo, link), **Immagine** (libreria multimediale, indirizzo, rimuovi) e **Altro** (etichetta, descrizione, testo alternativo, nuova scheda). Sopra di essi, le azioni *Sposta*, *Duplica* ed *Elimina* agiscono sul riquadro. |
| **Configurazione** (a destra) | **Visualizzazione**, **Dimensioni**, **Area**, **Carattere** e **Mostra freccia**; tutto vale per l’intera riga. |

**Applica** inserisce i riquadri e la configurazione nel widget, **Annulla** li scarta
— in caso di modifiche non salvate viene chiesto conferma in anticipo. Lo stato in alto indica
cosa è stato modificato, ad esempio «1 riquadro modificato, configurazione modificata».

Un riquadro senza titolo riporta nel campo **Titolo** l’avviso «Senza titolo,
il riquadro non viene visualizzato» e nell’elenco è denominato «Senza titolo». Rimane lì
e non va perso al momento del salvataggio; sulla pagina appare solo
non appena ha un titolo.

## Campi di un riquadro

Riquadri, freccia e stile vengono salvati insieme nell’attributo `portfolio-config`
(`{"tiles":[…],"showChevron":true,"variant":"icon","size":"compact","background":"#E40045","textColor":"#FFFFFF"}`,
codificato). `variant` è `image` o `icon`, `size` è `compact`, `normal`
o `large`, i colori sono indicati come `#RRGGBB`; ciò che manca o non è valido
viene considerato come impostazione predefinita. I widget più vecchi contengono ancora i riquadri come elenco JSON nel
campo `tiles` e la freccia in `show-chevron`; entrambi continuano a essere letti,
purché `portfolio-config` non imposti il rispettivo valore, e appaiono
come prima (tile immagine, normale). Il formato delle tile è lo stesso in entrambi i casi:

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

Nel riquadro immagini, le immagini vengono ritagliate nel formato 16:9 e
riempiono completamente l’area dell’immagine. Fornite immagini in cui un
ritaglio ai bordi non sia un problema. Nel riquadro delle icone, invece, l’immagine viene
adattata e non viene mai ritagliata: in questo caso sono adatti simboli e loghi in formato SVG
o PNG con sfondo trasparente, dello stesso colore del testo (quindi bianco sull’
area predefinita rossa).
