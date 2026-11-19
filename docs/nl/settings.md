# Instellingen

| Instelling | Beschrijving |
| --- | --- |
| **Tegels** | De tegels van de rij. Deze worden beheerd in het venster **Tegels bewerken**, dat wordt geopend in het configuratievenster. Standaard is er geen tegel. |
| **Weergave** | **Afbeeldingstegel** (afbeelding bovenaan, bijgesneden tot 16:9, tekst eronder) of **Pictogramvak** (pictogram of afbeelding aangepast, tekst gecentreerd op een gekleurd vlak). Standaard is de afbeeldingstegel ingesteld. In het venster rechts onder **Ontwerp**. |
| **Grootte** | **Compact**, **Normaal** of **Groot** — voor elke weergave. Standaard is Normaal. Zie hieronder. |
| **Achtergrond** | Achtergrond van de tegels: **Standaard**, een kleur uit de MAN-CI of een eigen hex-waarde (`#RRGGBB`). Standaard is wit voor de afbeeldingstegel en MAN-rood voor het pictogramvak. |
| **Lettertype** | Kleur van titel, label, beschrijving en pijl: **Automatisch**, een kleur uit de MAN-CI of een eigen hex-waarde. Bij ‘Automatisch’ wordt op een geselecteerde achtergrond de beter leesbare kleur van donker en wit gekozen, anders de gebruikelijke MAN-kleuren. |
| **Pijl weergeven** | Geeft rechtsboven op elke gekoppelde tegel een pijl weer. Standaard ingeschakeld. In het venster rechts onder **Ontwerp**. |

Weergave, grootte, kleuren en pijl gelden voor alle tegels gezamenlijk, niet
per tegel: een rij waarin elke tegel er anders uitziet, komt over als een
fout. Op tegels zonder bestemming verschijnt de pijl in principe niet — daar
is niets om op te klikken.

## Afmetingen

De afmeting bepaalt de minimale breedte van een kolom. Hoeveel kolommen
naast elkaar passen, hangt af van de breedte die de widget op de
pagina inneemt; alle kolommen in een rij zijn even breed, alle tegels in een
rij even hoog.

| Grootte | Minimale breedte | Bij volledige paginabreedte | Tablet | Telefoon | Bijzonderheid |
| --- | --- | --- | --- | --- | --- |
| **Compact** | 160 px | ongeveer 7 | 4 | 2 | Kleinere lettergrootte; beschrijvingen eindigen na drie regels. |
| **Normaal** | 280 px | 4 | 2 | 1 | De vorm van de eerdere versies. |
| **Groot** | 440 px | 2 | 1 | 1 | Afbeelding links, tekst rechts, zoals een nieuwslijst. Is de tegel smaller dan 420 px (telefoon), dan staat de afbeelding weer bovenaan. De pictogramvakken blijven naast elkaar staan. |

## Kleuren

Een melding onder de kleuren geeft aan wanneer het lettertype op het vlak slecht
leesbaar is (contrast lager dan 4,5 : 1). De combinatie is niet verboden.
Als je er met de muis overheen gaat, wordt een kleurvlak iets donkerder; een geselecteerd
lettertype behoudt zijn kleur in plaats van rood te worden.

## Het venster „Tegels bewerken“

Het venster vult het hele scherm. Bovenaan staan **Toepassen**,
**Annuleren**, **Ongedaan maken**, **Opnieuw**, de Help en de schakelaar voor
het voorbeeld (Editor, Desktop, Tablet, Mobiel). Daaronder drie kolommen:

| Kolom | Betekenis |
| --- | --- |
| **Tegels** (links) | Alle tegels in volgorde, met voorbeeldafbeelding, titel en link. Door aan het handvat te slepen of met het toetsenbord kun je ze opnieuw rangschikken; **Nieuwe tegel** voegt er een toe aan het einde. |
| **Tegel x van y** (midden) | De velden van de geselecteerde tegel: **Inhoud** (titel, link), **Afbeelding** (mediabibliotheek, adres, verwijderen) en **Meer** (label, beschrijving, alternatieve tekst, nieuw tabblad). Daarboven bevinden zich de acties om de tegel te verplaatsen, te dupliceren en te verwijderen. |
| **Opmaak** (rechts) | **Weergave**, **Grootte**, **Oppervlakte**, **Lettertype** en **Pijl weergeven**; alles geldt voor de hele rij. |

**Toepassen** past de tegels en opmaak toe in de widget, **Annuleren** verwijdert
ze — bij niet-opgeslagen wijzigingen wordt eerst gevraagd of je wilt doorgaan. De status bovenaan geeft aan
wat er is gewijzigd, bijvoorbeeld „1 tegel gewijzigd, opmaak gewijzigd“.

Een tegel zonder titel bevat in het veld **Titel** de opmerking „Zonder titel verschijnt
de tegel niet“ en heet in de lijst „Zonder titel“. Deze blijft daar staan
en gaat bij het opslaan niet verloren; op de pagina verschijnt deze pas,
zodra deze een titel heeft.

## Velden van een tegel

Tegels, pijl en opmaak worden gezamenlijk opgeslagen in het attribuut `portfolio-config`
opgeslagen (`{"tiles":[…],"showChevron":true,"variant":"icon","size":"compact","background":"#E40045","textColor":"#FFFFFF"}`,
gecodeerd). `variant` is `image` of `icon`, `size` is `compact`, `normal`
of `large`, de kleuren worden weergegeven als `#RRGGBB`; wat ontbreekt of ongeldig is,
geldt als standaardinstelling. Oudere widgets bevatten de tegels nog als JSON-lijst in
veld `tiles` en de pijl in `show-chevron`; beide worden nog steeds gelezen,
zolang `portfolio-config` de betreffende waarde niet instelt, en ze zien eruit
zoals voorheen (afbeeldingstegel, normaal). Het formaat van de tegels is in beide gevallen
hetzelfde:

| Veld | Venster | Verplicht | Betekenis |
| --- | --- | --- | --- |
| `title` | Titel | ja | De kop van de tegel. Ontbreekt deze, dan wordt de tegel overgeslagen. |
| `description` | Beschrijving (onder „Meer”) | nee | Een korte tekst onder de titel. |
| `badge` | Label (onder „Meer”) | nee | Een klein categorielabel boven de titel. |
| `image` | Afbeelding | nee | Adres van de afbeelding. Ontbreekt deze, dan heeft de tegel geen afbeeldingsgebied. |
| `imageAlt` | Alternatieve tekst (onder „Meer“) | nee | Alternatieve tekst voor schermlezers. Laat leeg als de afbeelding alleen decoratief is. |
| `link` | Link | nee | Bestemming van de tegel. Zonder bestemming is de tegel niet aanklikbaar en krijgt deze geen pijltje. |
| `newTab` | In nieuw tabblad openen (onder „Meer“) | nee | `true` opent de bestemming in een nieuw tabblad. Standaard ingesteld op `false`. |
| `id` | — | nee | Eigen sleutel van de tegel. Wordt automatisch toegewezen als deze ontbreekt. |

In de afbeeldingstegel worden de afbeeldingen bijgesneden tot de verhouding 16:9 en
vullen ze het afbeeldingsgebied volledig op. Lever afbeeldingen aan waarbij een
bijsnijden aan de randen geen probleem is. In het pictogramvak wordt de afbeelding daarentegen
aangepast en nooit bijgesneden — daar zijn symbolen en logo’s geschikt als SVG
of PNG met een transparante achtergrond, in de kleur van het lettertype (op het
rode voorbeeldgebied dus wit).
