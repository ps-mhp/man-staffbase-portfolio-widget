# Domande frequenti

**Domanda:** Il widget non visualizza nulla. A cosa è dovuto?

Risposta: O il campo **Tessere** è vuoto, oppure il suo contenuto non è un
JSON valido. Nel secondo caso, nella console di sviluppo del browser compare il
messaggio «portfolio-widget: Il campo "Tessere" non contiene un
array JSON». Cause più comuni: una virgola dopo l’ultimo riquadro, una
parentesi chiusa mancante o virgolette tipografiche (« ») al posto delle
virgolette diritte ("). Verificate il testo con un validatore JSON.

**Domanda:** Manca un singolo riquadro, gli altri sono presenti.

Risposta: A questo riquadro manca il `title`. I riquadri senza titolo vengono
saltati, in modo che un errore di battitura in un riquadro non
comprenda anche gli altri. Un `title` composto solo da spazi viene considerato
mancante.

**Domanda:** Dove posso trovare l’indirizzo per `image`?

Risposta: Carica l’immagine nella libreria multimediale, aprila e copia
l’indirizzo. È possibile utilizzare anche un’immagine proveniente da un sito web esterno,
purché sia accessibile pubblicamente.

**Domanda:** Perché uno dei miei riquadri non ha la freccia, anche se l’opzione «Mostra freccia»
è attivata?

Risposta: Al riquadro manca il `link`. Senza destinazione non è cliccabile e una
freccia suggerirebbe un’azione che non esiste.

**Domanda:** Le immagini sono ritagliate in modo diverso in altezza.

Risposta: Tutte le immagini vengono adattate al formato 16:9 e riempiono
completamente l’area dell’immagine. In caso di proporzioni molto diverse, il
ritaglio risulta diverso. Se possibile, fornite le immagini già nel
formato 16:9.

**Domanda:** Posso forzare le tessere su un determinato numero di colonne?

Risposta: No. Le tessere hanno una larghezza fissa e vanno a capo non appena lo
spazio non è più sufficiente — esattamente come nel widget Portfolio di Staffbase.

**Domanda:** Quando sarà disponibile un vero e proprio editor al posto del campo JSON?

Risposta: È in programma. Il formato dei dati rimarrà invariato, quindi i riquadri che
avete creato oggi rimarranno tali e quali.
