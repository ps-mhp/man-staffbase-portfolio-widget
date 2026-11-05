# Veelgestelde vragen

**Vraag:** De widget geeft helemaal niets weer. Waar komt dat door?

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

Antwoord: Via het gestreepte veld **Afbeelding selecteren** in de rij, of bij een
bestaande afbeelding via het potloodje erop. Beide openen de mediabibliotheek; daar
kun je de afbeelding ook direct uploaden. Een afbeelding van een externe website
werkt ook — voer daarvoor het adres in het JSON-veld `image`
in, zolang deze openbaar toegankelijk is.

**Vraag:** Ik wilde alleen de afbeelding vervangen en heb per ongeluk de hele
tegel verwijderd.

Antwoord: Er zijn twee prullenbakken. Die bij het afbeeldingsvoorbeeld verwijdert alleen de
afbeelding, die aan de rechterkant van de regel de hele tegel. Zolang u nog niet
op **Toepassen** hebt geklikt, kunt u de vergissing ongedaan maken met
**Annuleren**.

**Vraag:** Hoe wijzig ik de volgorde?

Antwoord: Sleep de tegel aan het handvat helemaal links naar de nieuwe plek. Zonder
muis gaat het ook: selecteer het handvat met de Tab-toets en verplaats het vervolgens met **pijl
omhoog** en **pijl omlaag**.

**Vraag:** Waarom heeft een van mijn tegels geen pijl, hoewel „Pijl weergeven“
is ingeschakeld?

Antwoord: De tegel mist de link. Zonder bestemming is deze niet aanklikbaar, en een
pijl zou een actie beloven die er niet is.

**Vraag:** De afbeeldingen zijn verschillend bijgesneden.

Antwoord: Alle afbeeldingen worden aangepast naar 16:9 en vullen het weergavegebied
volledig op. Bij sterk afwijkende beeldverhoudingen zal de
uitsnede verschillend uitvallen. Lever de afbeeldingen indien mogelijk al in de
verhouding 16:9 aan.

**Vraag:** Kan ik de tegels dwingen om in een bepaald aantal kolommen te worden weergegeven?

Antwoord: Nee. De tegels hebben een vaste breedte en worden afgebroken zodra er
niet meer voldoende ruimte is — net zoals bij de eigen portfolio-widget van Staffbase.

**Vraag:** In plaats van de editor zie ik alleen een tekstveld met JSON.

Antwoord: De editor verschijnt op de plaats van het veld **Tegels** zodra
het configuratievenster is geopend. Mocht dit eenmalig niet lukken, dan blijft het
tekstvak als terugvaloptie staan; de opmaak is hetzelfde en de velden van een
tegel staan in de instellingen. Als je het dialoogvenster opnieuw opent, verschijnt de
editor meestal weer.
