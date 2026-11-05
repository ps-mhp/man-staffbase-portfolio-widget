# Domande frequenti

**Domanda:** Il widget non visualizza nulla. A cosa è dovuto?

Risposta: Di norma non è stato ancora creato alcun riquadro: apra le
impostazioni e clicchi su **Modifica riquadri**. Se, in via eccezionale, avete
inserito i riquadri nel campo di testo JSON, è possibile che il contenuto non sia un
JSON valido. In tal caso, nella console di sviluppo del browser comparirà il messaggio
“portfolio-widget: il campo ‘Riquadri’ non contiene un array JSON valido.”
Cause più comuni: una virgola dopo l’ultimo riquadro, una
parentesi chiusa mancante o virgolette tipografiche (“ ”) al posto di quelle diritte
(“). Verifichi il testo con un validatore JSON.

**Domanda:** Manca un singolo riquadro, gli altri sono visibili.

Risposta: A questo riquadro manca il titolo. I riquadri senza titolo vengono
saltati, in modo che un errore di battitura in un riquadro non
comprenda anche gli altri. Un titolo composto solo da spazi viene considerato mancante.
Nell’editor tale riquadro rimane visibile e riporta l’avviso «Senza titolo
questo riquadro non viene visualizzato» — quindi non lo si perde, ma
apparirà sulla pagina solo dopo avergli assegnato un titolo.

**Domanda:** Come si inserisce un’immagine in un riquadro?

Risposta: Tramite l’area tratteggiata **Seleziona immagine** nella riga, oppure, se
è già presente un’immagine, cliccando sulla matita che la indica. Entrambe le opzioni aprono la libreria multimediale; da lì
è possibile caricare direttamente l’immagine. È possibile utilizzare anche un’immagine da un sito web esterno
: basta inserire il suo indirizzo nel campo JSON `image`
, purché sia accessibile pubblicamente.

**Domanda:** Volevo solo sostituire l’immagine e ho cancellato per sbaglio l’intero
riquadro.

Risposta: Ci sono due cestini. Quello sull’anteprima dell’immagine rimuove solo l’
immagine, mentre quello sul bordo destro della riga elimina l’intero riquadro. Finché non avete ancora
cliccato su **Applica**, potete annullare l’errore con
**Annulla**.

**Domanda:** Come faccio a modificare l’ordine?

Risposta: Trascina il riquadro dalla maniglia all’estrema sinistra nella nuova posizione. È possibile farlo anche senza
il mouse: selezionare la maniglia con il tasto Tab, quindi spostarla con **freccia
su** e **freccia giù**.

**Domanda:** Perché uno dei miei riquadri non ha una freccia, anche se l’opzione “Mostra freccia”
è attivata?

Risposta: Al riquadro manca il link. Senza una destinazione non è cliccabile e una
freccia suggerirebbe un’azione che non esiste.

**Domanda:** Le immagini sono ritagliate con altezze diverse.

Risposta: Tutte le immagini vengono adattate al formato 16:9 e riempiono
completamente l’area dell’immagine. In caso di proporzioni molto diverse, il
ritaglio risulta diverso. Se possibile, fornite le immagini già nel
formato 16:9.

**Domanda:** Posso forzare le tessere su un determinato numero di colonne?

Risposta: No. Le tessere hanno una larghezza fissa e vanno a capo non appena lo
spazio non è più sufficiente — esattamente come nel widget Portfolio proprio di Staffbase.

**Domanda:** Al posto dell’editor vedo solo un campo di testo con JSON.

Risposta: L’editor si posiziona al posto del campo **Riquadri** non appena
viene aperta la finestra di dialogo di configurazione. Se ciò non dovesse avvenire, il
campo di testo rimane come soluzione alternativa; il formato è lo stesso e i campi di un
riquadro sono disponibili nelle impostazioni. Riaprendo la finestra di dialogo, l’
editor di solito torna visibile.
