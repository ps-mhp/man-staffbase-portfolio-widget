# Impostazioni

| Impostazione | Descrizione |
| --- | --- |
| **Riquadri** | I riquadri della riga. Si gestiscono nell'editor dei riquadri, che si apre tramite **Modifica riquadri**. L'impostazione predefinita è nessun riquadro. |
| **Mostra freccia** | Mostra una freccia in alto a destra su ogni riquadro collegato. Per impostazione predefinita è attivata. |

La freccia viene attivata in modo uniforme per tutte le tessere, non singolarmente: una
riga in cui a volte è presente una freccia e a volte no sembra un errore. Sulle
tessere senza destinazione non appare mai — lì non c’è nulla
su cui cliccare.

## L’editor dei riquadri

L’editor mostra una riga per ogni riquadro, tutte una sotto l’altra. Nella riga
sono presenti:

| Elemento | Significato |
| --- | --- |
| **Maniglia** (a sinistra) | Sposta il riquadro in un’altra posizione. Con la tastiera è possibile spostarla con le **frecce su** e **frecce giù** di una posizione alla volta. |
| **Immagine** | L’anteprima. La matita apre la libreria multimediale, il cestino sull’anteprima rimuove solo l’immagine, non il riquadro. Se non c’è un’immagine, in quel punto compare un’area tratteggiata con la scritta **Scegli immagine**. |
| **Titolo** | Il titolo del riquadro. Obbligatorio. |
| **Link** | La destinazione del riquadro. |
| **Altro** / **Meno** | Espande i campi meno frequenti: etichetta, descrizione, testo alternativo dell’immagine e **Apri in una nuova scheda**. |
| **Cestino** (a destra) | Rimuove l’intero riquadro. |

Sotto l’elenco si trova **Aggiungi riquadro**; il nuovo riquadro viene aggiunto alla
fine. **Applica** inserisce l’elenco nel widget, **Annulla** lo scarta
— in caso di modifiche non salvate viene prima chiesto di confermare.

Un riquadro senza titolo riporta nell’editor l’avviso «Senza titolo, questo
riquadro non verrà visualizzato». Rimane nell’elenco e non va perso al momento del salvataggio;
sulla pagina apparirà solo non appena avrà un titolo.

## Campi di un riquadro

I riquadri vengono salvati come elenco JSON. Questo è visibile solo quando
l’editor non viene visualizzato — in tal caso, il campo di testo rimane come soluzione alternativa.

| Campo | Editor | Obbligatorio | Significato |
| --- | --- | --- | --- |
| `title` | Titolo | sì | Il titolo del riquadro. Se manca, il riquadro viene saltato. |
| `description` | Descrizione (sotto «Altro») | no | Un breve testo sotto il titolo. |
| `badge` | Etichetta (sotto «Altro») | no | Una piccola etichetta di categoria sopra il titolo. |
| `image` | Immagine | no | Indirizzo dell’immagine. Se manca, il riquadro non avrà un’area immagine. |
| `imageAlt` | Testo alternativo (sotto “Altro”) | no | Testo alternativo per gli screen reader. Lasciare vuoto se l’immagine è solo decorativa. |
| `link` | Link | no | Destinazione del riquadro. Senza destinazione, il riquadro non è cliccabile e non viene visualizzata la freccia. |
| `newTab` | Apri in una nuova scheda (sotto «Altro») | no | `true` apre la destinazione in una nuova scheda. Impostazione predefinita `false`. |
| `id` | — | no | Chiave univoca del riquadro. Viene assegnata automaticamente se mancante. |

Le immagini vengono ritagliate con rapporto 16:9 e riempiono completamente il riquadro.
Fornite immagini in cui il ritaglio ai bordi
non risulti fastidioso.
