# Schritt für Schritt

## Grundfall einrichten

1. Legen Sie die Bilder vorab in der Mediathek ab und kopieren Sie sich deren
   Adressen. Jede Kachel braucht ihre eigene Adresse.
2. Platzieren Sie das Widget **Portfolio** an der gewünschten Stelle der Seite.
3. Tragen Sie im Feld **Kacheln** die Liste ein. Jede Kachel ist ein Objekt in
   eckigen Klammern, getrennt durch Kommas:

   ```json
   [
     {
       "title": "Lkw",
       "image": "https://…/lkw.png",
       "link": "/content/page/lkw"
     },
     {
       "title": "Bus",
       "image": "https://…/bus.png",
       "link": "/content/page/bus"
     }
   ]
   ```

4. Lassen Sie **Pfeil anzeigen** angeschaltet, wenn rechts oben auf jeder
   Kachel ein Pfeil stehen soll.
5. Speichern Sie und prüfen Sie das Ergebnis in der Vorschau.

## Eine Kachel vollständig ausfüllen

Alle Felder, die eine Kachel kennt:

```json
{
  "title": "Lkw",
  "badge": "Fahrzeuge",
  "description": "Die schwere Reihe für den Fernverkehr.",
  "image": "https://…/lkw.png",
  "imageAlt": "Ein Lkw auf der Autobahn",
  "link": "/content/page/lkw",
  "newTab": true
}
```

Pflicht ist nur `title`. Alles andere darf fehlen.

## Nachträglich ändern

1. Klicken Sie das Widget an und öffnen Sie seine Einstellungen.
2. Ändern Sie den Text im Feld **Kacheln**. Reihenfolge der Kacheln auf der
   Seite = Reihenfolge in der Liste.
3. Speichern und in der Vorschau prüfen.

## Wenn etwas nicht funktioniert

1. Erscheint gar nichts, ist meist das JSON kaputt. Häufigste Ursache: ein
   Komma hinter der letzten Kachel oder eine fehlende schließende Klammer.
   Prüfen Sie den Text in einem JSON-Prüfer.
2. Fehlt eine einzelne Kachel, fehlt ihr vermutlich der `title` — Kacheln ohne
   Titel werden übersprungen.
3. Bleibt eine Kachel ohne Bild, prüfen Sie die Adresse in `image`: sie muss
   sich im Browser direkt öffnen lassen.
