# Veelgestelde vragen

**Vraag:** De widget geeft helemaal niets weer. Waaraan ligt dat?

Antwoord: Meestal is er nog geen tegel aangemaakt — open de
instellingen en klik op **Tegels bewerken**. Als u de
tegels bij wijze van uitzondering in het JSON-tekstveld hebt ingevoerd, is de inhoud mogelijk geen
geldige JSON. Dan verschijnt in de ontwikkelaarsconsole van de browser de melding
„portfolio-widget: Het veld „Tegels“ bevat geen geldige JSON-array.“
Meest voorkomende oorzaken: een komma achter de laatste tegel, een ontbrekende
sluitende haak of typografische aanhalingstekens („ “) in plaats van rechte
(„). Controleer de tekst in een JSON-checker.

**Vraag:** Er ontbreekt één tegel, de andere staan er wel.

Antwoord: Deze tegel mist de titel. Tegels zonder titel worden
overgeslagen, zodat een typefout in één tegel de overige niet
meeneemt. Een titel die alleen uit spaties bestaat, telt daarbij als ontbrekend.
In de editor blijft zo’n tegel staan met de opmerking „Zonder titel
wordt deze tegel niet weergegeven“ — u raakt hem dus niet kwijt, hij
verschijnt alleen pas op de pagina als er een titel is.

**Vraag:** Hoe plaats je een afbeelding op een tegel?

Antwoord: Via **Kiezen uit mediabibliotheek** in het gedeelte **Afbeelding**. De mediabibliotheek
wordt rechts als balk geopend; daar kun je de afbeelding direct uploaden
of door deze naar het afbeeldingsveld te slepen. Een afbeelding van een externe website
werkt ook — voer daarvoor onder **Adres invoegen** het
https-adres in, zolang het openbaar toegankelijk is.

**Vraag:** Ik wilde alleen de afbeelding vervangen en heb per ongeluk de hele
tegel verwijderd.

Antwoord: **Verwijderen** in het gedeelte **Afbeelding** verwijdert alleen de afbeelding,
**Tegel verwijderen** boven de velden verwijdert de hele tegel. Zolang u nog niet op
**Toepassen** hebt geklikt, maakt **Ongedaan** de fout ongedaan, en
**Annuleren** verwijdert alle wijzigingen.

**Vraag:** Hoe wijzig ik de volgorde?

Antwoord: Sleep de tegel in de lijst aan de linkerkant aan het handvat naar de nieuwe positie.
Het gaat ook zonder muis: selecteer de tegel, druk op de spatiebalk, verplaats met **pijl omhoog** en
**pijl omlaag**, druk op de spatiebalk. Boven de velden kunt u
**Tegel omhoog** en **Tegel omlaag** gebruiken om de tegel telkens één plaats te verplaatsen.

**Vraag:** Waarom heeft een van mijn tegels geen pijl, hoewel „Pijl weergeven“
is ingeschakeld?

Antwoord: De tegel mist de link. Zonder bestemming is deze niet aanklikbaar, en een
pijl zou een actie beloven die er niet is.

**Vraag:** De afbeeldingen zijn op verschillende manieren bijgesneden.

Antwoord: In de afbeeldingstegel worden alle afbeeldingen aangepast naar 16:9 en vullen ze het afbeeldingsgebied
volledig op. Bij sterk afwijkende beeldverhoudingen zal de
bijsnijding verschillend uitvallen. Lever de afbeeldingen indien mogelijk al in de
verhouding 16:9 aanleveren.

**Vraag:** Kan ik de tegels dwingen om in een bepaald aantal kolommen te worden weergegeven?

Antwoord: Niet precies, maar wel via de **grootte**: **Compact** plaatst veel kleine
tegels naast elkaar, **Normaal** ongeveer vier, **Groot** twee. Hoeveel het er precies
zijn, hangt af van de breedte van het scherm — zo blijft de rij op tablets
en telefoons leesbaar.

**Vraag:** Mijn witte icoontje is in de editor nauwelijks te zien.

Antwoord: In de afbeeldingstegel staat het op een lichte achtergrond. Kies onder
**Ontwerp** de weergave **Pictogramvak** — dan tonen de lijst en het afbeeldingsveld
het pictogram op het oppervlak van het vak.

**Vraag:** Onder de kleuren staat „Contrast … moeilijk leesbaar“.

Antwoord: Het lettertype en de achtergrond liggen te dicht bij elkaar; lopende tekst heeft een
verhouding van minimaal 4,5 : 1 nodig. Stel het **lettertype** in op
**Automatisch** of kies een duidelijk lichtere of donkerdere kleur.

**Vraag:** In plaats van het venster zie ik alleen een tekstveld.

Antwoord: Het venster verschijnt op de plaats van het veld zodra het
configuratievenster is geopend. Als dat eenmaal niet lukt, blijft het
tekstveld als terugvaloptie staan; het bevat de ruwe versie van de configuratie.
Als je het dialoogvenster opnieuw opent, verschijnt het venster meestal weer.

**Vraag:** Ik heb de widget al vóór de aanpassing aangemaakt. Gaat er iets
verloren?

Antwoord: Nee. De widget blijft zijn bestaande tegels en zijn
pijl weergeven. Het venster neemt deze waarden over bij het openen; pas wanneer u iets
wijzigt en **Toepassen** kiest, wordt de nieuwe versie opgeslagen.
