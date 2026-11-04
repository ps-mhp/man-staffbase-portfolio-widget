# Einstellungen

| Einstellung | Beschreibung |
| --- | --- |
| **Kacheln** | Die Kacheln als JSON-Liste. Voreingestellt ist `[]`, also keine Kachel. Die Felder je Kachel stehen unten. |
| **Pfeil anzeigen** | Zeigt rechts oben auf jeder verlinkten Kachel einen Pfeil. Voreingestellt angeschaltet. |

Der Pfeil wird für alle Kacheln gemeinsam geschaltet, nicht je Kachel: eine
Reihe, in der mal ein Pfeil steht und mal nicht, wirkt wie ein Fehler. Auf
Kacheln ohne Ziel erscheint er grundsätzlich nicht — dort gibt es nichts
anzuklicken.

## Felder einer Kachel

| Feld | Pflicht | Bedeutung |
| --- | --- | --- |
| `title` | ja | Die Überschrift der Kachel. Fehlt sie, wird die Kachel übersprungen. |
| `description` | nein | Ein kurzer Text unter dem Titel. |
| `badge` | nein | Ein kleines Kategorie-Etikett über dem Titel. |
| `image` | nein | Adresse des Bildes. Fehlt sie, hat die Kachel keinen Bildbereich. |
| `imageAlt` | nein | Alternativtext für Screenreader. Leer lassen, wenn das Bild nur schmückt. |
| `link` | nein | Ziel der Kachel. Ohne Ziel ist die Kachel nicht anklickbar und bekommt keinen Pfeil. |
| `newTab` | nein | `true` öffnet das Ziel in einem neuen Tab. Voreingestellt `false`. |
| `id` | nein | Eigener Schlüssel der Kachel. Wird automatisch vergeben, wenn er fehlt. |

Die Bilder werden auf das Verhältnis 16:9 beschnitten und füllen die Kachel
vollständig aus. Liefern Sie Motive, bei denen ein Beschnitt an den Rändern
nicht stört.
