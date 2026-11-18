# Instellingen

| Instelling | Beschrijving |
| --- | --- |
| **Tegels** | De tegels van de rij. Deze worden beheerd in het venster **Tegels bewerken**, dat wordt geopend in het configuratievenster. Standaard is er geen tegel. |
| **Pijl weergeven** | Geeft rechtsboven op elke gekoppelde tegel een pijl weer. Standaard ingeschakeld. In het venster rechts onder **Ontwerp**. |

De pijl wordt voor alle tegels gezamenlijk in- of uitgeschakeld, niet per tegel: een
rij waarin de ene keer wel en de andere keer geen pijl staat, ziet eruit als een fout. Op
tegels zonder bestemming verschijnt hij in principe niet — daar is niets
om op te klikken.

## Het venster „Tegels bewerken“

Het venster vult het hele scherm. Bovenaan staan **Toepassen**,
**Annuleren**, **Ongedaan maken**, **Opnieuw**, de Help en de schakelaar voor
het voorbeeld (Editor, Desktop, Tablet, Mobiel). Daaronder drie kolommen:

| Gebied | Betekenis |
| --- | --- |
| **Tegels** (links) | Alle tegels in volgorde, met voorbeeldafbeelding, titel en link. Door aan het handvat te slepen of met het toetsenbord kun je ze opnieuw rangschikken; **Nieuwe tegel** voegt er een toe aan het einde. |
| **Tegel x van y** (midden) | De velden van de geselecteerde tegel: **Inhoud** (titel, link), **Afbeelding** (mediabibliotheek, adres, verwijderen) en **Meer** (label, beschrijving, alternatieve tekst, nieuw tabblad). Daarboven kunt u de tegel verplaatsen, dupliceren en verwijderen. |
| **Opmaak** (rechts) | De schakelaar **Pijl weergeven**; deze geldt voor alle tegels. |

**Toepassen** voegt tegels en pijl toe aan de widget, **Annuleren** verwijdert
ze — bij niet-opgeslagen wijzigingen wordt eerst om bevestiging gevraagd. De status bovenaan geeft aan
wat er is gewijzigd, bijvoorbeeld „1 tegel gewijzigd“.

Een tegel zonder titel bevat in het veld **Titel** de opmerking „Zonder titel verschijnt
de tegel niet“ en heet in de lijst „Zonder titel“. Deze blijft daar staan
en gaat bij het opslaan niet verloren; op de pagina verschijnt deze pas,
zodra deze een titel heeft.

## Velden van een tegel

Tegels en de pijl worden samen opgeslagen in het attribuut `portfolio-config`
(`{"tiles":[…],"showChevron":true}`, gecodeerd). Oudere widgets bevatten de tegels
nog als JSON-lijst in het veld `tiles` en de pijl in `show-chevron`; beide
worden nog steeds gelezen, zolang `portfolio-config` de betreffende waarde niet
instelt. Het formaat van de tegels is in beide gevallen hetzelfde:

| Veld | Venster | Verplicht | Betekenis |
| --- | --- | --- | --- |
| `title` | Titel | ja | De kop van de tegel. Ontbreekt deze, dan wordt de tegel overgeslagen. |
| `description` | Beschrijving (onder „Meer“) | nee | Een korte tekst onder de titel. |
| `badge` | Label (onder „Meer“) | nee | Een klein categorielabel boven de titel. |
| `image` | Afbeelding | nee | Adres van de afbeelding. Ontbreekt deze, dan heeft de tegel geen afbeeldingsgebied. |
| `imageAlt` | Alternatieve tekst (onder „Meer“) | nee | Alternatieve tekst voor schermlezers. Laat leeg als de afbeelding alleen decoratief is. |
| `link` | Link | nee | Bestemming van de tegel. Zonder bestemming is de tegel niet aanklikbaar en krijgt deze geen pijltje. |
| `newTab` | In nieuw tabblad openen (onder „Meer“) | nee | `true` opent de bestemming in een nieuw tabblad. Standaard ingesteld op `false`. |
| `id` | — | nee | Eigen sleutel van de tegel. Wordt automatisch toegewezen als deze ontbreekt. |

De afbeeldingen worden bijgesneden tot de verhouding 16:9 en vullen de tegel
volledig op. Lever afbeeldingen aan waarbij bijsnijden aan de randen
geen probleem vormt.
