# Passo dopo passo

## Configurazione di base

1. Posizionate il widget **Portfolio** nel punto desiderato della pagina.
2. Aprite le impostazioni del widget e cliccate su
   **Modifica riquadri**. Si aprirà l’editor dei riquadri.
3. Clicca su **Aggiungi riquadro**. Apparirà una nuova riga vuota
   alla fine dell’elenco.
4. Compila i campi **Titolo** e **Link**.
5. Clicca sull’area tratteggiata **Scegli immagine** e cerca l’
  immagine nella libreria multimediale. È possibile caricarla direttamente da lì.
6. Ripeti i passaggi da 3 a 5 per ogni altro riquadro.
7. Clicca su **Applica** e salva la pagina.
8. Lascia attiva l’opzione **Mostra freccia** se desideri che in alto a destra su ogni
   riquadro compaia una freccia.
9. Controlla il risultato nell’anteprima.

## Compilare completamente un riquadro

Titolo, link e immagine si trovano nella riga. Tutto il resto si trova dietro il
menu a tendina **Altro** alla fine della riga:

- **Etichetta** — una breve parola di categoria sopra il titolo, ad esempio «Veicoli».
- **Descrizione** — un breve testo sotto il titolo.
- **Testo alternativo dell’immagine** — ciò che uno screen reader leggerà al posto dell’immagine
  . Lasciare vuoto se l’immagine è solo decorativa. Quando si seleziona un’immagine,
  l’editor riprende un testo alternativo dalla libreria multimediale, purché il
  campo non sia stato modificato — ma non un semplice nome di file come «lkw.png»;
  un testo digitato manualmente rimane invece invariato.
- **Apri in una nuova scheda** — apre la pagina di destinazione in una nuova scheda del browser.

Con **Chiudi** l’area si richiude. Ogni riga ha il proprio
pulsante di espansione.

L’unico campo obbligatorio è il titolo. Tutto il resto può essere omesso.

## Modificare l’ordine

L’ordine delle tessere sulla pagina corrisponde all’ordine nell’elenco.

- **Con il mouse:** afferrate la tessera dal maniglione all’estrema sinistra e trascinatela
  verso l’alto o verso il basso. Non appena copre per metà una riga adiacente,
  le due si scambiano di posto.
- **Con la tastiera:** selezionate la maniglia con il tasto Tab e
  spostate il riquadro con le **frecce su** e **giù**
  di una posizione alla volta.

## Cambiare o rimuovere l’immagine

Sull’anteprima dell’immagine sono presenti due piccoli pulsanti:

- La **matita** apre la libreria multimediale e sostituisce l’immagine.
- Il **cestino** rimuove solo l’immagine. Il riquadro rimane e viene
  visualizzato senza l’area dell’immagine.

Il **cestino sul bordo destro della riga**, invece, rimuove l’intero riquadro.

## Modificare in un secondo momento

1. Clicca sul widget e apri le sue impostazioni.
2. Clicca su **Modifica riquadri**.
3. Modifica ciò che desideri e clicca su **Applica**.
4. Salva e controlla nell’anteprima.

**Annulla** elimina le modifiche; se ce ne sono in sospeso, l’editor
chiede conferma prima di procedere.

## Se qualcosa non funziona

1. Se una tessera manca dalla pagina, probabilmente è perché non ha un titolo. L’editor
   scrive in una riga del genere «Senza titolo, questa tessera non
   viene visualizzata» — la tessera rimane lì, semplicemente non viene mostrata.
2. Se un riquadro rimane senza immagine, controllate l’indirizzo: deve
   aprirsi direttamente nel browser. Le immagini della libreria multimediale soddisfano sempre questo requisito.
3. Se al posto dell’editor compare solo un campo di testo con JSON, modificate
   tessere in quella sede — il formato è lo stesso:

   ```json
   [
     {
       "title": "Camion",
       "badge": "Veicoli",
       "description": "La serie pesante per il trasporto a lunga percorrenza.",
       "image": "https://…/lkw.png",
       "imageAlt": "Un camion in autostrada",
       "link": "/content/page/lkw",
       "newTab": true
     }
   ]
   ```

   Se dopo non compare più nulla, di solito il JSON è errato: una virgola
   dopo l’ultimo elemento o una parentesi chiusa mancante. Controllate
   il testo con un validatore JSON.
