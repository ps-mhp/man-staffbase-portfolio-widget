# Einstellungen

| Einstellung | Beschreibung |
| --- | --- |
| **Kacheln** | Die Kacheln der Reihe. Gepflegt wird sie im Kachel-Editor, der sich über **Kacheln bearbeiten** öffnet. Voreingestellt ist keine Kachel. |
| **Pfeil anzeigen** | Zeigt rechts oben auf jeder verlinkten Kachel einen Pfeil. Voreingestellt angeschaltet. |

Der Pfeil wird für alle Kacheln gemeinsam geschaltet, nicht je Kachel: eine
Reihe, in der mal ein Pfeil steht und mal nicht, wirkt wie ein Fehler. Auf
Kacheln ohne Ziel erscheint er grundsätzlich nicht — dort gibt es nichts
anzuklicken.

## Der Kachel-Editor

Der Editor zeigt eine Zeile je Kachel, alle untereinander. In der Zeile
stehen:

| Element | Bedeutung |
| --- | --- |
| **Griff** (links) | Zieht die Kachel an eine andere Stelle. Mit der Tastatur verschieben ihn **Pfeil nach oben** und **Pfeil nach unten** um je eine Stelle. |
| **Bild** | Die Vorschau. Der Stift öffnet die Mediathek, der Papierkorb auf der Vorschau entfernt nur das Bild, nicht die Kachel. Ohne Bild steht dort eine gestrichelte Fläche **Bild wählen**. |
| **Titel** | Die Überschrift der Kachel. Pflicht. |
| **Link** | Das Ziel der Kachel. |
| **Mehr** / **Weniger** | Klappt die selteneren Felder auf: Etikett, Beschreibung, Alternativtext des Bildes und **In neuem Tab öffnen**. |
| **Papierkorb** (rechts) | Entfernt die ganze Kachel. |

Unter der Liste steht **Kachel hinzufügen**; die neue Kachel hängt sich ans
Ende. **Übernehmen** schreibt die Liste in das Widget, **Abbrechen** verwirft
sie — bei ungesicherten Änderungen wird vorher gefragt.

Eine Kachel ohne Titel trägt im Editor den Hinweis „Ohne Titel wird diese
Kachel nicht angezeigt“. Sie bleibt in der Liste und geht beim Speichern nicht
verloren; auf der Seite erscheint sie erst, sobald sie einen Titel hat.

## Felder einer Kachel

Die Kacheln werden als JSON-Liste gespeichert. Das ist nur dann zu sehen, wenn
der Editor einmal nicht erscheint — dann bleibt das Textfeld als Rückfallweg.

| Feld | Editor | Pflicht | Bedeutung |
| --- | --- | --- | --- |
| `title` | Titel | ja | Die Überschrift der Kachel. Fehlt sie, wird die Kachel übersprungen. |
| `description` | Beschreibung (unter „Mehr“) | nein | Ein kurzer Text unter dem Titel. |
| `badge` | Etikett (unter „Mehr“) | nein | Ein kleines Kategorie-Etikett über dem Titel. |
| `image` | Bild | nein | Adresse des Bildes. Fehlt sie, hat die Kachel keinen Bildbereich. |
| `imageAlt` | Alternativtext (unter „Mehr“) | nein | Alternativtext für Screenreader. Leer lassen, wenn das Bild nur schmückt. |
| `link` | Link | nein | Ziel der Kachel. Ohne Ziel ist die Kachel nicht anklickbar und bekommt keinen Pfeil. |
| `newTab` | In neuem Tab öffnen (unter „Mehr“) | nein | `true` öffnet das Ziel in einem neuen Tab. Voreingestellt `false`. |
| `id` | — | nein | Eigener Schlüssel der Kachel. Wird automatisch vergeben, wenn er fehlt. |

Die Bilder werden auf das Verhältnis 16:9 beschnitten und füllen die Kachel
vollständig aus. Liefern Sie Motive, bei denen ein Beschnitt an den Rändern
nicht stört.
