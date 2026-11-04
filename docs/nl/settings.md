# Instellingen

| Instelling | Beschrijving |
| --- | --- |
| **Tegels** | De tegels als JSON-lijst. De standaardinstelling is `[]`, dus geen tegel. De velden per tegel staan hieronder. |
| **Pijl weergeven** | Geeft rechtsboven op elke gekoppelde tegel een pijl weer. Standaard ingeschakeld. |

De pijl wordt voor alle tegels tegelijk in- of uitgeschakeld, niet per tegel: een
rij waarin soms wel en soms geen pijl staat, ziet eruit als een fout. Op
tegels zonder bestemming verschijnt hij in principe niet — daar is niets
om op te klikken.

## Velden van een tegel

| Veld | Verplicht | Betekenis |
| --- | --- | --- |
| `title` | ja | De titel van de tegel. Ontbreekt deze, dan wordt de tegel overgeslagen. |
| `description` | nee | Een korte tekst onder de titel. |
| `badge` | nee | Een klein categorielabel boven de titel. |
| `image` | nee | Adres van de afbeelding. Ontbreekt dit, dan heeft de tegel geen afbeeldingsgebied. |
| `imageAlt` | nee | Alternatieve tekst voor schermlezers. Laat leeg als de afbeelding alleen decoratief is. |
| `link` | nee | Bestemming van de tegel. Zonder bestemming is de tegel niet aanklikbaar en krijgt deze geen pijltje. |
| `newTab` | nee | `true` opent de bestemming in een nieuw tabblad. Standaard ingesteld op `false`. |
| `id` | nee | Eigen sleutel van de tegel. Wordt automatisch toegewezen als deze ontbreekt. |

De afbeeldingen worden bijgesneden tot de verhouding 16:9 en vullen de tegel
volledig op. Lever afbeeldingen aan waarbij bijsnijden aan de randen
geen probleem vormt.
