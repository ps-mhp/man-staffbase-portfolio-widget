# Veelgestelde vragen

**Vraag:** De widget geeft helemaal niets weer. Waar komt dat door?

Antwoord: Ofwel is het veld **Tegels** leeg, ofwel is de inhoud ervan geen
geldige JSON. In het tweede geval staat in de ontwikkelaarsconsole van de browser het
bericht „portfolio-widget: Het veld „Tegels“ bevat geen geldige
JSON-array.” Meest voorkomende oorzaken: een komma achter de laatste tegel, een
ontbrekende sluitende haak of typografische aanhalingstekens („ “) in plaats van
rechte aanhalingstekens ("). Controleer de tekst in een JSON-checker.

**Vraag:** Er ontbreekt één tegel, de andere staan er wel.

Antwoord: Bij deze tegel ontbreekt de `title`. Tegels zonder titel worden
overgeslagen, zodat een typefout in één tegel de overige niet
meesleept. Een `title` die alleen uit spaties bestaat, telt daarbij als
ontbrekend.

**Vraag:** Waar haal ik het adres voor `image` vandaan?

Antwoord: Upload de afbeelding naar de mediabibliotheek, open deze daar en kopieer
het adres. Een afbeelding van een externe website werkt ook,
zolang deze openbaar toegankelijk is.

**Vraag:** Waarom heeft een van mijn tegels geen pijl, hoewel „Pijl weergeven“
is ingeschakeld?

Antwoord: De tegel mist `link`. Zonder bestemming is deze niet aanklikbaar, en een
pijl zou een actie beloven die er niet is.

**Vraag:** De afbeeldingen zijn op verschillende manieren bijgesneden.

Antwoord: Alle afbeeldingen worden aangepast naar 16:9 en vullen het beeldgebied
volledig op. Bij sterk afwijkende beeldverhoudingen zal de
bijsnijding verschillend uitvallen. Lever de afbeeldingen indien mogelijk al in de
verhouding 16:9 aan.

**Vraag:** Kan ik de tegels dwingen om in een bepaald aantal kolommen te worden weergegeven?

Antwoord: Nee. De tegels hebben een vaste breedte en worden afgebroken zodra de
er niet meer genoeg ruimte is — net zoals bij de eigen portfolio-widget van Staffbase.

**Vraag:** Wanneer komt er een echte editor in plaats van het JSON-veld?

Antwoord: Dat staat op de planning. Het gegevensformaat blijft daarbij ongewijzigd, dus de tegels die u vandaag
onderhoudt, blijven bestaan.
