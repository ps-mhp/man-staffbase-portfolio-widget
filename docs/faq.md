# FAQ

**Frage:** Das Widget zeigt gar nichts an. Woran liegt das?

Antwort: Entweder ist das Feld **Kacheln** leer, oder sein Inhalt ist kein
gültiges JSON. Im zweiten Fall steht in der Entwicklerkonsole des Browsers die
Meldung „portfolio-widget: Das Feld „Kacheln“ enthält kein gültiges
JSON-Array.“ Häufigste Ursachen: ein Komma hinter der letzten Kachel, eine
fehlende schließende Klammer oder typografische Anführungszeichen („ “) statt
gerader ("). Prüfen Sie den Text in einem JSON-Prüfer.

**Frage:** Eine einzelne Kachel fehlt, die anderen stehen.

Antwort: Dieser Kachel fehlt der `title`. Kacheln ohne Titel werden
übersprungen, damit ein Tippfehler in einer Kachel die übrigen nicht
mitnimmt. Ein `title`, der nur aus Leerzeichen besteht, zählt dabei als
fehlend.

**Frage:** Wo bekomme ich die Adresse für `image` her?

Antwort: Laden Sie das Bild in die Mediathek, öffnen Sie es dort und kopieren
Sie die Adresse. Ein Bild von einer fremden Website funktioniert ebenfalls,
solange es öffentlich erreichbar ist.

**Frage:** Warum hat eine meiner Kacheln keinen Pfeil, obwohl „Pfeil anzeigen“
angeschaltet ist?

Antwort: Der Kachel fehlt `link`. Ohne Ziel ist sie nicht anklickbar, und ein
Pfeil würde eine Aktion versprechen, die es nicht gibt.

**Frage:** Die Bilder sind unterschiedlich hoch beschnitten.

Antwort: Alle Bilder werden auf 16:9 gebracht und füllen den Bildbereich
vollständig aus. Bei stark abweichenden Seitenverhältnissen fällt der
Beschnitt unterschiedlich aus. Liefern Sie die Motive möglichst schon im
Verhältnis 16:9.

**Frage:** Kann ich die Kacheln auf eine bestimmte Spaltenzahl zwingen?

Antwort: Nein. Die Kacheln haben eine feste Breite und brechen um, sobald der
Platz nicht mehr reicht — genauso wie beim Staffbase-eigenen Portfolio-Widget.

**Frage:** Wann kommt ein richtiger Editor statt des JSON-Felds?

Antwort: Er ist geplant. Das Datenformat bleibt dabei unverändert, Ihre heute
gepflegten Kacheln bleiben also bestehen.
