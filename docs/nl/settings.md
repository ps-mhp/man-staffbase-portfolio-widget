# Instellingen

| Instelling | Beschrijving |
| --- | --- |
| **Tegels** | De tegels van de rij. Deze worden bewerkt in de tegel-editor, die je kunt openen via **Tegels bewerken**. Standaard is er geen tegel ingesteld. |
| **Pijl weergeven** | Geeft rechtsboven op elke gekoppelde tegel een pijl weer. Standaard ingeschakeld. |

De pijl wordt voor alle tegels gezamenlijk in- of uitgeschakeld, niet per tegel: een
rij waarin de ene keer wel en de andere keer geen pijl staat, ziet eruit als een fout. Op
tegels zonder bestemming verschijnt hij in principe niet — daar is niets
om op te klikken.

## De tegel-editor

De editor toont één regel per tegel, allemaal onder elkaar. In de regel
staan:

| Element | Betekenis |
| --- | --- |
| **Handvat** (links) | Verplaatst de tegel naar een andere plek. Met het toetsenbord verplaats je hem met de **pijl omhoog** en **pijl omlaag** telkens één positie. |
| **Afbeelding** | Het voorbeeld. Het potlood opent de mediabibliotheek, de prullenbak op het voorbeeld verwijdert alleen de afbeelding, niet de tegel. Zonder afbeelding staat daar een gestreept vlak **Afbeelding selecteren**. |
| **Titel** | De titel van de tegel. Verplicht. |
| **Link** | De bestemming van de tegel. |
| **Meer** / **Minder** | Vouwt de minder vaak gebruikte velden uit: label, beschrijving, alternatieve tekst van de afbeelding en **In nieuw tabblad openen**. |
| **Prullenbak** (rechts) | Verwijdert de hele tegel. |

Onder de lijst staat **Tegel toevoegen**; de nieuwe tegel wordt aan het
einde toegevoegd. Met **Toepassen** wordt de lijst in de widget opgeslagen, met **Annuleren** wordt
deze verwijderd — bij niet-opgeslagen wijzigingen wordt eerst om bevestiging gevraagd.

Een tegel zonder titel draagt in de editor de opmerking „Zonder titel wordt deze
tegel niet weergegeven“. Hij blijft in de lijst staan en gaat bij het opslaan niet
verloren; op de pagina verschijnt hij pas zodra hij een titel heeft.

## Velden van een tegel

De tegels worden opgeslagen als een JSON-lijst. Dit is alleen zichtbaar als
de editor eenmalig niet wordt weergegeven — dan blijft het tekstveld als alternatief beschikbaar.

| Veld | Editor | Verplicht | Betekenis |
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
