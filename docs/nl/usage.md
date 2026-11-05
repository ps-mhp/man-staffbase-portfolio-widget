# Stap voor stap

## Basisinstellingen configureren

1. Plaats de widget **Portfolio** op de gewenste plek op de pagina.
2. Open de instellingen van de widget en klik op
   **Tegels bewerken**. De tegel-editor wordt geopend.
3. Klik op **Tegel toevoegen**. Er verschijnt een nieuwe, lege regel
   onderaan de lijst.
4. Vul **Titel** en **Link** in.
5. Klik op het gestreepte veld **Afbeelding selecteren** en zoek de
   afbeelding in de mediabibliotheek. Je kunt deze daar ook direct uploaden.
6. Herhaal stap 3 tot en met 5 voor elke volgende tegel.
7. Klik op **Toepassen** en sla de pagina op.
8. Laat **Pijl weergeven** ingeschakeld als er rechtsboven op elke
   tegel een pijl moet staan.
9. Controleer het resultaat in het voorbeeld.

## Een tegel volledig invullen

Titel, link en afbeelding staan op de regel. Al het overige staat achter het
uitklapmenu **Meer** aan het einde van de regel:

- **Label** — een kort categoriewoord boven de titel, bijvoorbeeld „Voertuigen“.
- **Beschrijving** — een korte tekst onder de titel.
- **Alternatieve tekst van de afbeelding** — wat een schermlezer in plaats van de afbeelding
  voorleest. Laat dit veld leeg als de afbeelding alleen ter versiering dient. Bij het selecteren van een afbeelding
  neemt de editor een alternatieve tekst uit de mediabibliotheek over, zolang het
  veld nog niet is bewerkt — maar geen loutere bestandsnaam zoals „lkw.png“;
  een zelf ingevoerde tekst blijft staan.
- **In nieuw tabblad openen** — opent de bestemming in een nieuw browsertabblad.

Met **Minder** klapt het gedeelte weer dicht. Elke regel heeft zijn eigen
uitklapmenu.

Alleen de titel is verplicht. Al het andere mag ontbreken.

## Volgorde wijzigen

De volgorde van de tegels op de pagina is dezelfde als de volgorde in de lijst.

- **Met de muis:** Pak de tegel vast bij het handvat helemaal links en sleep
  deze omhoog of omlaag. Zodra deze een aangrenzende regel voor de helft bedekt,
  wisselen de twee van plaats.
- **Met het toetsenbord:** Selecteer het handvat met de tab-toets en
  verplaats de tegel met **pijl omhoog** en **pijl omlaag**
  telkens één plaats.

## Afbeelding wijzigen of verwijderen

Op het afbeeldingsvoorbeeld staan twee kleine knoppen:

- De **pen** opent de mediabibliotheek en vervangt de afbeelding.
- De **prullenbak** verwijdert alleen de afbeelding. De tegel blijft bestaan en wordt
  zonder afbeeldingsgebied weergegeven.

De **prullenbak aan de rechterkant van de rij** verwijdert daarentegen de hele tegel.

## Achteraf wijzigen

1. Klik op de widget en open de instellingen.
2. Klik op **Tegels bewerken**.
3. Breng de gewenste wijzigingen aan en klik op **Toepassen**.
4. Sla op en controleer in het voorbeeld.

**Annuleren** verwijdert de wijzigingen; als er wijzigingen zijn, vraagt de editor
hier eerst om bevestiging.

## Als iets niet werkt

1. Ontbreekt er een tegel op de pagina, dan ontbreekt waarschijnlijk de titel. De editor
   schrijft bij zo’n regel „Zonder titel wordt deze tegel niet
   weergegeven“ — de tegel blijft daar staan, maar wordt alleen niet getoond.
2. Als een tegel geen afbeelding heeft, controleer dan het adres: het moet
   direct in de browser kunnen worden geopend. Afbeeldingen uit de mediabibliotheek voldoen hier altijd aan.
3. Als er in plaats van de editor alleen een tekstveld met JSON verschijnt, bewerk dan de
   tegels daar bij wijze van uitzondering verder bij — het formaat is hetzelfde:

   ```json
   [
     {
       "title": "Vrachtwagen",
       "badge": "Voertuigen",
       "description": "De zware serie voor het langeafstandsvervoer.",
       "image": "https://…/lkw.png",
       "imageAlt": "Een vrachtwagen op de snelweg",
       "link": "/content/page/lkw",
       "newTab": true
     }
   ]
   ```

   Als er daarna helemaal niets meer verschijnt, is de JSON meestal onjuist: een komma
   achter de laatste tegel of een ontbrekende sluitende haak. Controleer
   de tekst in een JSON-controleprogramma.
