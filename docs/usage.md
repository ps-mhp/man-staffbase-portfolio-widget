# Schritt für Schritt

## Grundfall einrichten

1. Platzieren Sie das Widget **Portfolio** an der gewünschten Stelle der Seite.
2. Öffnen Sie die Einstellungen des Widgets und klicken Sie auf
   **Kacheln bearbeiten**. Der Kachel-Editor öffnet sich.
3. Klicken Sie auf **Kachel hinzufügen**. Es erscheint eine neue, leere Zeile
   am Ende der Liste.
4. Füllen Sie **Titel** und **Link** aus.
5. Klicken Sie auf die gestrichelte Fläche **Bild wählen** und suchen Sie das
   Bild in der Mediathek. Es lässt sich dort auch direkt hochladen.
6. Wiederholen Sie die Schritte 3 bis 5 für jede weitere Kachel.
7. Klicken Sie auf **Übernehmen** und speichern Sie die Seite.
8. Lassen Sie **Pfeil anzeigen** angeschaltet, wenn rechts oben auf jeder
   Kachel ein Pfeil stehen soll.
9. Prüfen Sie das Ergebnis in der Vorschau.

## Eine Kachel vollständig ausfüllen

Titel, Link und Bild stehen in der Zeile. Alles Weitere steht hinter dem
Aufklapper **Mehr** am Ende der Zeile:

- **Etikett** — ein kurzes Kategoriewort über dem Titel, etwa „Fahrzeuge“.
- **Beschreibung** — ein kurzer Text unter dem Titel.
- **Alternativtext des Bildes** — was ein Screenreader statt des Bildes
  vorliest. Leer lassen, wenn das Bild nur schmückt. Beim Wählen eines Bildes
  übernimmt der Editor einen Alternativtext aus der Mediathek, solange das
  Feld noch unberührt ist — einen blossen Dateinamen wie „lkw.png“ aber
  nicht; ein selbst getippter Text bleibt stehen.
- **In neuem Tab öffnen** — öffnet das Ziel in einem neuen Browser-Tab.

Mit **Weniger** klappt der Bereich wieder zu. Jede Zeile hat ihren eigenen
Aufklapper.

Pflicht ist nur der Titel. Alles andere darf fehlen.

## Reihenfolge ändern

Die Reihenfolge der Kacheln auf der Seite ist die Reihenfolge in der Liste.

- **Mit der Maus:** Fassen Sie die Kachel am Griff ganz links an und ziehen Sie
  sie nach oben oder unten. Sobald sie eine Nachbarzeile zur Hälfte überdeckt,
  tauschen die beiden die Plätze.
- **Mit der Tastatur:** Wählen Sie den Griff mit der Tabulatortaste an und
  verschieben Sie die Kachel mit **Pfeil nach oben** und **Pfeil nach unten**
  um je eine Stelle.

## Bild wechseln oder entfernen

Auf der Bildvorschau liegen zwei kleine Knöpfe:

- Der **Stift** öffnet die Mediathek und ersetzt das Bild.
- Der **Papierkorb** entfernt nur das Bild. Die Kachel bleibt bestehen und wird
  ohne Bildbereich gezeigt.

Der **Papierkorb am rechten Rand der Zeile** entfernt dagegen die ganze Kachel.

## Nachträglich ändern

1. Klicken Sie das Widget an und öffnen Sie seine Einstellungen.
2. Klicken Sie auf **Kacheln bearbeiten**.
3. Ändern Sie, was zu ändern ist, und klicken Sie auf **Übernehmen**.
4. Speichern und in der Vorschau prüfen.

**Abbrechen** verwirft die Änderungen; stehen welche an, fragt der Editor
vorher nach.

## Wenn etwas nicht funktioniert

1. Fehlt eine Kachel auf der Seite, fehlt ihr vermutlich der Titel. Der Editor
   schreibt an eine solche Zeile „Ohne Titel wird diese Kachel nicht
   angezeigt“ — die Kachel bleibt dort erhalten, sie wird nur nicht gezeigt.
2. Bleibt eine Kachel ohne Bild, prüfen Sie die Adresse: sie muss sich im
   Browser direkt öffnen lassen. Bilder aus der Mediathek erfüllen das immer.
3. Erscheint statt des Editors nur ein Textfeld mit JSON, pflegen Sie die
   Kacheln ausnahmsweise dort weiter — das Format ist dasselbe:

   ```json
   [
     {
       "title": "Lkw",
       "badge": "Fahrzeuge",
       "description": "Die schwere Reihe für den Fernverkehr.",
       "image": "https://…/lkw.png",
       "imageAlt": "Ein Lkw auf der Autobahn",
       "link": "/content/page/lkw",
       "newTab": true
     }
   ]
   ```

   Erscheint danach gar nichts mehr, ist meist das JSON kaputt: ein Komma
   hinter der letzten Kachel oder eine fehlende schließende Klammer. Prüfen Sie
   den Text in einem JSON-Prüfer.
