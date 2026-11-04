# Passo dopo passo

## Configurazione di base

1. Salvate prima le immagini nella libreria multimediale e copiate i relativi
   indirizzi. Ogni riquadro deve avere il proprio indirizzo.
2. Posizionate il widget **Portfolio** nel punto desiderato della pagina.
3. Inserite l’elenco nel campo **Riquadri**. Ogni riquadro è un oggetto racchiuso tra
   parentesi quadre, separato da virgole:

   ```json
   [
     {
       "title": "Camion",
       "image": "https://…/lkw.png",
       "link": "/content/page/lkw"
     },
     {
       "title": "Autobus",
       "image": "https://…/bus.png",
       "link": "/content/page/bus"
     }
   ]
   ```

4. Lasciare attiva l'opzione **Mostra freccia** se si desidera che in alto a destra su ogni
   riquadro sia presente una freccia.
5. Salvare e verificare il risultato nell'anteprima.

## Compilare completamente un riquadro

Tutti i campi presenti in un riquadro:

```json
{
  "title": "Camion",
  "badge": "Veicoli",
  "description": "La gamma pesante per il trasporto a lunga percorrenza.",
  "image": "https://…/lkw.png",
  "imageAlt": "Un camion in autostrada",
  "link": "/content/page/lkw",
  "newTab": true
}
```

L'unico campo obbligatorio è `title`. Tutti gli altri possono essere omessi.

## Modificare in un secondo momento

1. Clicca sul widget e apri le sue impostazioni.
2. Modifica il testo nel campo **Riquadri**. L'ordine dei riquadri sulla
   pagina corrisponde all'ordine nell'elenco.
3. Salva e verifica nell'anteprima.

## Se qualcosa non funziona

1. Se non viene visualizzato nulla, solitamente il JSON è errato. Causa più comune: una
   virgola dopo l’ultimo riquadro o una parentesi chiusa mancante.
   Verificate il testo con un validatore JSON.
2. Se manca un singolo riquadro, probabilmente manca il `title` — i riquadri senza
   titolo vengono saltati.
3. Se un riquadro rimane senza immagine, controllate l’indirizzo in `image`: deve
   poter essere aperto direttamente nel browser.
