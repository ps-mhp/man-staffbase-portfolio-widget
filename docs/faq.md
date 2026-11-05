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

Antwort: Über die gestrichelte Fläche **Bild wählen** in der Zeile, bei einem
vorhandenen Bild über den Stift darauf. Beides öffnet die Mediathek; dort
lässt sich das Bild auch direkt hochladen. Ein Bild von einer fremden Website
funktioniert ebenfalls — dafür tragen Sie seine Adresse im JSON-Feld `image`
ein, solange es öffentlich erreichbar ist.

**Frage:** Ich wollte nur das Bild tauschen und habe versehentlich die ganze
Kachel gelöscht.

Antwort: Es gibt zwei Papierkörbe. Der auf der Bildvorschau entfernt nur das
Bild, der am rechten Rand der Zeile die ganze Kachel. Solange Sie noch nicht
auf **Übernehmen** geklickt haben, verwerfen Sie das Versehen mit
**Abbrechen**.

**Frage:** Wie ändere ich die Reihenfolge?

Antwort: Ziehen Sie die Kachel am Griff ganz links an ihre neue Stelle. Ohne
Maus geht es auch: Griff mit der Tabulatortaste anwählen, dann mit **Pfeil
nach oben** und **Pfeil nach unten** verschieben.

**Frage:** Warum hat eine meiner Kacheln keinen Pfeil, obwohl „Pfeil anzeigen“
angeschaltet ist?

Antwort: Der Kachel fehlt der Link. Ohne Ziel ist sie nicht anklickbar, und ein
Pfeil würde eine Aktion versprechen, die es nicht gibt.

**Frage:** Die Bilder sind unterschiedlich hoch beschnitten.

Antwort: Alle Bilder werden auf 16:9 gebracht und füllen den Bildbereich
vollständig aus. Bei stark abweichenden Seitenverhältnissen fällt der
Beschnitt unterschiedlich aus. Liefern Sie die Motive möglichst schon im
Verhältnis 16:9.

**Frage:** Kann ich die Kacheln auf eine bestimmte Spaltenzahl zwingen?

Antwort: Nein. Die Kacheln haben eine feste Breite und brechen um, sobald der
Platz nicht mehr reicht — genauso wie beim Staffbase-eigenen Portfolio-Widget.

**Frage:** Statt des Editors sehe ich nur ein Textfeld mit JSON.

Antwort: Der Editor setzt sich an die Stelle des Feldes **Kacheln**, sobald
der Konfigurationsdialog offen ist. Gelingt ihm das einmal nicht, bleibt das
Textfeld als Rückfallweg stehen; das Format ist dasselbe, und die Felder einer
Kachel stehen in den Einstellungen. Ein erneutes Öffnen des Dialogs holt den
Editor in der Regel zurück.
