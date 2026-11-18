# Einstellungen

| Einstellung | Beschreibung |
| --- | --- |
| **Kacheln** | Die Kacheln der Reihe. Gepflegt werden sie im Fenster **Kacheln bearbeiten**, das sich im Konfigurationsdialog öffnet. Voreingestellt ist keine Kachel. |
| **Pfeil anzeigen** | Zeigt rechts oben auf jeder verlinkten Kachel einen Pfeil. Voreingestellt angeschaltet. Im Fenster rechts unter **Gestaltung**. |

Der Pfeil wird für alle Kacheln gemeinsam geschaltet, nicht je Kachel: eine
Reihe, in der mal ein Pfeil steht und mal nicht, wirkt wie ein Fehler. Auf
Kacheln ohne Ziel erscheint er grundsätzlich nicht — dort gibt es nichts
anzuklicken.

## Das Fenster „Kacheln bearbeiten“

Das Fenster füllt den ganzen Bildschirm. Oben stehen **Übernehmen**,
**Abbrechen**, **Rückgängig**, **Wiederholen**, die Hilfe und der Umschalter für
die Vorschau (Editor, Desktop, Tablet, Mobil). Darunter drei Spalten:

| Bereich | Bedeutung |
| --- | --- |
| **Kacheln** (links) | Alle Kacheln in Reihenfolge, mit Vorschaubild, Titel und Link. Ziehen am Griff oder die Tastatur ordnen sie neu; **Neue Kachel** hängt eine ans Ende an. |
| **Kachel x von y** (Mitte) | Die Felder der gewählten Kachel: **Inhalt** (Titel, Link), **Bild** (Mediathek, Adresse, Entfernen) und **Mehr** (Etikett, Beschreibung, Alternativtext, neuer Tab). Darüber verschieben, duplizieren und löschen die Aktionen die Kachel. |
| **Gestaltung** (rechts) | Der Schalter **Pfeil anzeigen**; er gilt für alle Kacheln. |

**Übernehmen** schreibt Kacheln und Pfeil in das Widget, **Abbrechen** verwirft
sie — bei ungesicherten Änderungen wird vorher gefragt. Der Status oben nennt,
was sich geändert hat, etwa „1 Kachel geändert“.

Eine Kachel ohne Titel trägt im Feld **Titel** den Hinweis „Ohne Titel erscheint
die Kachel nicht“ und heißt in der Liste „Ohne Titel“. Sie bleibt dort stehen
und geht beim Speichern nicht verloren; auf der Seite erscheint sie erst,
sobald sie einen Titel hat.

## Felder einer Kachel

Kacheln und Pfeil werden gemeinsam im Attribut `portfolio-config` gespeichert
(`{"tiles":[…],"showChevron":true}`, kodiert). Ältere Widgets tragen die Kacheln
noch als JSON-Liste im Feld `tiles` und den Pfeil in `show-chevron`; beide
werden weiter gelesen, solange `portfolio-config` den jeweiligen Wert nicht
setzt. Das Format der Kacheln ist in beiden Fällen dasselbe:

| Feld | Fenster | Pflicht | Bedeutung |
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
