# FAQ

**Frage:** Das Widget zeigt gar nichts an. Woran liegt das?

Antwort: In der Regel ist noch keine Kachel angelegt — öffnen Sie die
Einstellungen und klicken Sie auf **Kacheln bearbeiten**. Haben Sie die
Kacheln ausnahmsweise im JSON-Textfeld gepflegt, ist der Inhalt womöglich kein
gültiges JSON. Dann steht in der Entwicklerkonsole des Browsers die Meldung
„portfolio-widget: Das Feld „Kacheln“ enthält kein gültiges JSON-Array.“
Häufigste Ursachen: ein Komma hinter der letzten Kachel, eine fehlende
schließende Klammer oder typografische Anführungszeichen („ “) statt gerader
("). Prüfen Sie den Text in einem JSON-Prüfer.

**Frage:** Eine einzelne Kachel fehlt, die anderen stehen.

Antwort: Dieser Kachel fehlt der Titel. Kacheln ohne Titel werden
übersprungen, damit ein Tippfehler in einer Kachel die übrigen nicht
mitnimmt. Ein Titel, der nur aus Leerzeichen besteht, zählt dabei als fehlend.
Im Editor bleibt eine solche Kachel stehen und trägt den Hinweis „Ohne Titel
wird diese Kachel nicht angezeigt“ — Sie verlieren sie also nicht, sie
erscheint nur erst mit einem Titel auf der Seite.

**Frage:** Wie kommt ein Bild auf eine Kachel?

Antwort: Über **Aus Mediathek wählen** im Abschnitt **Bild**. Die Mediathek
öffnet sich rechts als Leiste; dort lässt sich das Bild auch direkt hochladen
oder per Ziehen auf das Bildfeld legen. Ein Bild von einer fremden Website
funktioniert ebenfalls — dafür tragen Sie unter **Adresse einfügen** seine
https-Adresse ein, solange es öffentlich erreichbar ist.

**Frage:** Ich wollte nur das Bild tauschen und habe versehentlich die ganze
Kachel gelöscht.

Antwort: **Entfernen** im Abschnitt **Bild** nimmt nur das Bild weg,
**Kachel löschen** über den Feldern die ganze Kachel. Solange Sie noch nicht auf
**Übernehmen** geklickt haben, nimmt **Rückgängig** das Versehen zurück, und
**Abbrechen** verwirft alle Änderungen.

**Frage:** Wie ändere ich die Reihenfolge?

Antwort: Ziehen Sie die Kachel in der Liste links am Griff an ihre neue Stelle.
Ohne Maus geht es auch: Kachel wählen, Leertaste, mit **Pfeil nach oben** und
**Pfeil nach unten** verschieben, Leertaste. Über den Feldern verschieben
**Kachel nach oben** und **Kachel nach unten** um je eine Stelle.

**Frage:** Warum hat eine meiner Kacheln keinen Pfeil, obwohl „Pfeil anzeigen“
angeschaltet ist?

Antwort: Der Kachel fehlt der Link. Ohne Ziel ist sie nicht anklickbar, und ein
Pfeil würde eine Aktion versprechen, die es nicht gibt.

**Frage:** Die Bilder sind unterschiedlich hoch beschnitten.

Antwort: In der Bildkachel werden alle Bilder auf 16:9 gebracht und füllen den Bildbereich
vollständig aus. Bei stark abweichenden Seitenverhältnissen fällt der
Beschnitt unterschiedlich aus. Liefern Sie die Motive möglichst schon im
Verhältnis 16:9.

**Frage:** Kann ich die Kacheln auf eine bestimmte Spaltenzahl zwingen?

Antwort: Nicht genau, aber über die **Größe**: **Kompakt** stellt viele kleine
Kacheln nebeneinander, **Normal** etwa vier, **Groß** zwei. Wie viele es genau
sind, hängt von der Breite des Bildschirms ab — so bleibt die Reihe auf Tablet
und Telefon lesbar.

**Frage:** Mein weißes Icon ist im Editor kaum zu sehen.

Antwort: In der Bildkachel steht es auf hellem Grund. Wählen Sie unter
**Gestaltung** die Darstellung **Icon-Kasten** — dann zeigen Liste und Bildfeld
das Icon auf der Fläche des Kastens.

**Frage:** Unter den Farben steht „Kontrast … schwer lesbar“.

Antwort: Schrift und Fläche liegen zu nah beieinander; Fließtext braucht ein
Verhältnis von mindestens 4,5 : 1. Stellen Sie die **Schrift** auf
**Automatisch** oder wählen Sie eine deutlich hellere bzw. dunklere Farbe.

**Frage:** Statt des Fensters sehe ich nur ein Textfeld.

Antwort: Das Fenster setzt sich an die Stelle des Feldes, sobald der
Konfigurationsdialog offen ist. Gelingt ihm das einmal nicht, bleibt das
Textfeld als Rückfallweg stehen; es enthält die Rohfassung der Konfiguration.
Ein erneutes Öffnen des Dialogs holt das Fenster in der Regel zurück.

**Frage:** Ich habe das Widget schon vor dem Umbau angelegt. Geht etwas
verloren?

Antwort: Nein. Das Widget zeigt weiter seine bisherigen Kacheln und seinen
Pfeil. Das Fenster übernimmt beim Öffnen diese Werte; erst wenn Sie etwas
ändern und **Übernehmen** wählen, wird die neue Fassung gespeichert.
