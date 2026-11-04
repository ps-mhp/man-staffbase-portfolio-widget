# Stap voor stap

## Basisinstellingen configureren

1. Sla de afbeeldingen eerst op in de mediabibliotheek en kopieer de
   adressen ervan. Elke tegel heeft een eigen adres nodig.
2. Plaats de widget **Portfolio** op de gewenste plek op de pagina.
3. Voer de lijst in het veld **Tegels** in. Elke tegel is een object tussen
   vierkante haken, gescheiden door komma’s:

   ```json
   [
     {
       "title": "Vrachtwagen",
       "image": "https://…/lkw.png",
       "link": "/content/page/lkw"
     },
     {
       "title": "Bus",
       "image": "https://…/bus.png",
       "link": "/content/page/bus"
     }
   ]
   ```

4. Laat **Pijl weergeven** ingeschakeld als er rechtsboven op elke
   tegel een pijl moet staan.
5. Sla op en controleer het resultaat in het voorbeeld.

## Een tegel volledig invullen

Alle velden die een tegel kent:

```json
{
  "title": "Vrachtwagen",
  "badge": "Voertuigen",
  "description": "De zware klasse voor het langeafstandsvervoer.",
  "image": "https://…/lkw.png",
  "imageAlt": "Een vrachtwagen op de snelweg",
  "link": "/content/page/lkw",
  "newTab": true
}
```

Alleen `title` is verplicht. Al het andere mag ontbreken.

## Achteraf wijzigen

1. Klik op de widget en open de instellingen.
2. Wijzig de tekst in het veld **Tegels**. Volgorde van de tegels op de
   pagina = volgorde in de lijst.
3. Sla op en controleer in het voorbeeld.

## Als iets niet werkt

1. Als er helemaal niets verschijnt, is de JSON meestal onjuist. Meest voorkomende oorzaak: een
   komma achter de laatste tegel of een ontbrekende sluitende haak.
   Controleer de tekst in een JSON-checker.
2. Ontbreekt er één tegel, dan ontbreekt waarschijnlijk de `title` — tegels zonder
   titel worden overgeslagen.
3. Blijft een tegel zonder afbeelding, controleer dan het adres in `image`: dit moet
   direct in de browser kunnen worden geopend.
