# Domande frequenti

**Domanda:** Il widget non visualizza nulla. A cosa è dovuto?

Risposta: Di norma non è stato ancora creato alcun riquadro: apra le
impostazioni e clicchi su **Modifica riquadri**. Se, in via eccezionale, avete
inserito i riquadri nel campo di testo JSON, è possibile che il contenuto non sia un
JSON valido. In tal caso, nella console di sviluppo del browser comparirà il messaggio
«portfolio-widget: il campo “Riquadri” non contiene un array JSON valido».
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

Risposta: Tramite **Scegli dalla libreria** nella sezione **Immagine**. La libreria
si apre a destra sotto forma di barra; da lì è possibile caricare direttamente l’immagine
oppure trascinarla sul campo immagine. È possibile utilizzare anche un’immagine da un sito web esterno
: a tal fine, inserite il suo
indirizzo https in **Inserisci indirizzo**, purché sia accessibile pubblicamente.

**Domanda:** Volevo solo sostituire l’immagine e ho cancellato per sbaglio l’intero
riquadro.

Risposta: **Rimuovi** nella sezione **Immagine** elimina solo l’immagine,
**Elimina riquadro** sopra i campi elimina l’intero riquadro. Finché non avete ancora cliccato su
**Applica**, **Annulla** ripristina l’errore, mentre
**Annulla** scarta tutte le modifiche.

**Domanda:** Come faccio a modificare l’ordine?

Risposta: Trascina il riquadro nella lista a sinistra, afferrando la maniglia, nella nuova posizione.
È possibile farlo anche senza mouse: selezionare il riquadro, premere la barra spaziatrice, spostarlo con **freccia su** e
**freccia giù**, quindi premere nuovamente la barra spaziatrice. Sopra i campi, utilizzare
**Sposta riquadro in alto** e **Sposta riquadro in basso** per spostarlo di una posizione alla volta.

**Domanda:** Perché una delle mie tessere non ha una freccia, anche se l’opzione “Mostra freccia”
è attivata?

Risposta: Alla tessera manca il link. Senza una destinazione non è cliccabile, e una
freccia prometterebbe un’azione che non esiste.

**Domanda:** Le immagini sono ritagliate in modo diverso in altezza.

Risposta: Nel riquadro delle immagini, tutte le immagini vengono adattate al formato 16:9 e riempiono
completamente l’area dell’immagine. In caso di proporzioni molto diverse, il
ritaglio risulta diverso. Se possibile, fornite le immagini già nel
formato 16:9.

**Domanda:** Posso impostare un numero specifico di colonne per i riquadri?

Risposta: Non esattamente, ma tramite le **dimensioni**: **Compatto** dispone molti piccoli
riquadri uno accanto all’altro, **Normale** circa quattro, **Grande** due. Il numero esatto
dipende dalla larghezza dello schermo — in questo modo la riga rimane leggibile su tablet
e telefono.

**Domanda:** La mia icona bianca è quasi invisibile nell’editor.

Risposta: Nella miniatura è su sfondo chiaro. Selezioni sotto
**Aspetto** la visualizzazione **Riquadro icona** — in questo modo l’elenco e il riquadro immagine
mostreranno l’icona all’interno del riquadro.

**Domanda:** Tra i colori c’è scritto «Contrasto … difficilmente leggibile».

Risposta: Il carattere e lo sfondo sono troppo vicini; il testo continuo richiede un
rapporto di almeno 4,5 : 1. Impostate il **carattere** su
**Automatico** oppure scegliete un colore nettamente più chiaro o più scuro.

**Domanda:** Al posto della finestra vedo solo un campo di testo.

Risposta: La finestra si posiziona al posto del campo non appena la
finestra di dialogo di configurazione è aperta. Se ciò non dovesse riuscire, il
campo di testo rimane come soluzione di ripiego; contiene la versione grezza della configurazione.
Di norma, riaprendo la finestra di dialogo la finestra torna visibile.

**Domanda:** Ho creato il widget prima della modifica. Si perderà qualcosa
?

Risposta: No. Il widget continua a mostrare i riquadri precedenti e la sua
freccia. All’apertura, la finestra riprende questi valori; solo quando si
apporta una modifica e si seleziona **Applica**, viene salvata la nuova versione.
