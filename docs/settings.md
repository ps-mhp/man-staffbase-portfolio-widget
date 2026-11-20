# Einstellungen

| Einstellung | Beschreibung |
| --- | --- |
| **Kacheln** | Die Kacheln der Reihe. Gepflegt werden sie im Fenster **Kacheln bearbeiten**, das sich im Konfigurationsdialog öffnet. Voreingestellt ist keine Kachel. |
| **Darstellung** | **Bildkachel** (Bild oben, auf 16:9 beschnitten, Text darunter) oder **Icon-Kasten** (Icon oder Bild eingepasst, Text mittig auf einer Farbfläche). Voreingestellt die Bildkachel. Im Fenster rechts unter **Gestaltung**. |
| **Größe** | **Kompakt**, **Normal** oder **Groß** — für jede Darstellung. Voreingestellt Normal. Siehe unten. |
| **Fläche** | Hintergrund der Kacheln: **Standard**, eine Farbe der MAN-CI oder ein eigener Hex-Wert (`#RRGGBB`). Standard ist Weiß für die Bildkachel und MAN-Rot für den Icon-Kasten. |
| **Schrift** | Farbe von Titel, Etikett, Beschreibung und Pfeil: **Automatisch**, eine Farbe der MAN-CI oder ein eigener Hex-Wert. Automatisch nimmt auf einer gewählten Fläche die besser lesbare von Dunkel und Weiß, sonst die gewohnten MAN-Farben. |
| **Pfeil anzeigen** | Zeigt rechts oben auf jeder verlinkten Kachel einen Pfeil. Voreingestellt angeschaltet. Im Fenster rechts unter **Gestaltung**. |

Darstellung, Größe, Farben und Pfeil gelten für alle Kacheln gemeinsam, nicht
je Kachel: eine Reihe, in der jede Kachel anders aussieht, wirkt wie ein
Fehler. Auf Kacheln ohne Ziel erscheint der Pfeil grundsätzlich nicht — dort
gibt es nichts anzuklicken.

## Größen

Die Größe legt die Mindestbreite einer Spalte fest. Wie viele Spalten
nebeneinander passen, richtet sich nach der Breite, die das Widget auf der
Seite hat; alle Spalten einer Reihe sind gleich breit, alle Kacheln einer
Reihe gleich hoch.

| Größe | Mindestbreite | Bei voller Seitenbreite | Tablet | Telefon | Besonderheit |
| --- | --- | --- | --- | --- | --- |
| **Kompakt** | 160 px | etwa 7 | 4 | 2 | Kleinere Schrift; Beschreibungen enden nach drei Zeilen. Das Icon im Icon-Kasten ist so groß wie bei Normal. |
| **Normal** | 280 px | 4 | 2 | 1 | Die Form der früheren Fassungen. |
| **Groß** | 440 px | 2 | 1 | 1 | Bild links, Text rechts wie eine Nachrichtenliste. Ist die Kachel schmaler als 420 px (Telefon), steht das Bild wieder oben. Der Icon-Kasten bleibt nebeneinander. |

## Farben

Ein Hinweis unter den Farben meldet, wenn die Schrift auf der Fläche schlecht
zu lesen ist (Kontrast unter 4,5 : 1). Verboten ist die Kombination nicht.
Beim Überfahren mit der Maus wird eine Farbfläche etwas dunkler; eine gewählte
Schrift behält ihre Farbe, statt rot zu werden.

## Das Fenster „Kacheln bearbeiten“

Das Fenster füllt den ganzen Bildschirm. Oben stehen **Übernehmen**,
**Abbrechen**, **Rückgängig**, **Wiederholen**, die Hilfe und der Umschalter für
die Vorschau (Editor, Desktop, Tablet, Mobil). Darunter drei Spalten:

| Bereich | Bedeutung |
| --- | --- |
| **Kacheln** (links) | Alle Kacheln in Reihenfolge, mit Vorschaubild, Titel und Link. Ziehen am Griff oder die Tastatur ordnen sie neu; **Neue Kachel** hängt eine ans Ende an. |
| **Kachel x von y** (Mitte) | Die Felder der gewählten Kachel: **Inhalt** (Titel, Link), **Bild** (Mediathek, Adresse, Entfernen) und **Mehr** (Etikett, Beschreibung, Alternativtext, neuer Tab). Darüber verschieben, duplizieren und löschen die Aktionen die Kachel. |
| **Gestaltung** (rechts) | **Darstellung**, **Größe**, **Fläche**, **Schrift** und **Pfeil anzeigen**; alles gilt für die ganze Reihe. |

**Übernehmen** schreibt Kacheln und Gestaltung in das Widget, **Abbrechen** verwirft
sie — bei ungesicherten Änderungen wird vorher gefragt. Der Status oben nennt,
was sich geändert hat, etwa „1 Kachel geändert, Gestaltung geändert“.

Eine Kachel ohne Titel trägt im Feld **Titel** den Hinweis „Ohne Titel erscheint
die Kachel nicht“ und heißt in der Liste „Ohne Titel“. Sie bleibt dort stehen
und geht beim Speichern nicht verloren; auf der Seite erscheint sie erst,
sobald sie einen Titel hat.

## Felder einer Kachel

Kacheln, Pfeil und Gestaltung werden gemeinsam im Attribut `portfolio-config`
gespeichert (`{"tiles":[…],"showChevron":true,"variant":"icon","size":"compact","background":"#E40045","textColor":"#FFFFFF"}`,
kodiert). `variant` ist `image` oder `icon`, `size` ist `compact`, `normal`
oder `large`, die Farben stehen als `#RRGGBB`; was fehlt oder ungültig ist,
gilt als Vorgabe. Ältere Widgets tragen die Kacheln noch als JSON-Liste im
Feld `tiles` und den Pfeil in `show-chevron`; beide werden weiter gelesen,
solange `portfolio-config` den jeweiligen Wert nicht setzt, und sie sehen aus
wie bisher (Bildkachel, Normal). Das Format der Kacheln ist in beiden Fällen
dasselbe:

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

In der Bildkachel werden die Bilder auf das Verhältnis 16:9 beschnitten und
füllen den Bildbereich vollständig aus. Liefern Sie Motive, bei denen ein
Beschnitt an den Rändern nicht stört. Im Icon-Kasten wird das Bild dagegen
eingepasst und nie beschnitten — dort eignen sich Symbole und Logos als SVG
oder PNG mit transparentem Hintergrund, in der Farbe der Schrift (auf der
roten Vorgabefläche also weiß).
