# Impostazioni

| Impostazione | Descrizione |
| --- | --- |
| **Riquadri** | I riquadri come elenco JSON. Il valore predefinito è `[]`, ovvero nessun riquadro. I campi relativi a ciascun riquadro sono riportati di seguito. |
| **Mostra freccia** | Mostra una freccia in alto a destra su ogni riquadro collegato. Attivata per impostazione predefinita. |

La freccia viene attivata in modo uniforme per tutte le tessere, non singolarmente: una
riga in cui a volte è presente una freccia e a volte no dà l’impressione di un errore. Sulle
tessere senza destinazione non compare mai — lì non c’è nulla
su cui cliccare.

## Campi di una tessera

| Campo | Obbligatorio | Significato |
| --- | --- | --- |
| `title` | sì | Il titolo del riquadro. Se manca, il riquadro viene saltato. |
| `description` | no | Un breve testo sotto il titolo. |
| `badge` | no | Una piccola etichetta di categoria sopra il titolo. |
| `image` | no | Indirizzo dell’immagine. Se manca, la tessera non ha un’area immagine. |
| `imageAlt` | no | Testo alternativo per gli screen reader. Lasciare vuoto se l’immagine è solo decorativa. |
| `link` | no | Destinazione del riquadro. Senza destinazione, il riquadro non è cliccabile e non viene visualizzata la freccia. |
| `newTab` | no | `true` apre la destinazione in una nuova scheda. Impostazione predefinita `false`. |
| `id` | no | Chiave univoca del riquadro. Viene assegnata automaticamente se mancante. |

Le immagini vengono ritagliate con un rapporto di 16:9 e riempiono completamente il riquadro.
Fornite immagini in cui il ritaglio ai bordi
non risulti fastidioso.
