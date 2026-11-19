/*!
 * Copyright 2026, MHP Management und IT-Beratung GmbH and contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Hilfe im Rahmen des Kachel-Editors. Tasten und den Satz zu „Übernehmen“
 * ergänzt der Rahmen selbst.
 */

import * as React from "react";
import { ReactElement } from "react";

export function TileEditorHelp(): ReactElement {
  return (
    <ul className="flex list-disc flex-col gap-2 pl-5">
      <li>
        Links stehen die <strong>Kacheln</strong> in der Reihenfolge der Reihe. Ziehen am Griff oder die Tasten
        Leertaste, Pfeil hoch und Pfeil runter ordnen sie neu; <strong>Neue Kachel</strong> hängt eine ans Ende an.
      </li>
      <li>
        In der Mitte stehen die Felder der gewählten Kachel. Der <strong>Titel</strong> ist Pflicht: ohne ihn erscheint
        die Kachel nicht auf der Seite, bleibt hier aber erhalten.
      </li>
      <li>
        Das <strong>Bild</strong> kommt aus der Mediathek (auch per Ziehen aus der Leiste) oder von einer Adresse. In der
        Bildkachel wird es auf 16:9 beschnitten, im Icon-Kasten eingepasst.
      </li>
      <li>
        Unter <strong>Mehr</strong> stehen Etikett, Beschreibung, Alternativtext und „In neuem Tab öffnen“.
      </li>
      <li>
        Rechts unter <strong>Gestaltung</strong> steht, was für die ganze Reihe gilt: die <strong>Darstellung</strong>{" "}
        (Bildkachel oder Icon-Kasten), die <strong>Größe</strong> (Kompakt, Normal, Groß), <strong>Fläche</strong> und{" "}
        <strong>Schrift</strong> sowie <strong>Pfeil anzeigen</strong>. „Automatisch“ wählt die Schrift, die sich auf der
        Fläche am besten liest; ein Hinweis warnt, wenn eine gewählte Farbe schwer lesbar ist.
      </li>
      <li>In Desktop, Tablet und Mobil zeigt die Vorschau die Reihe so, wie die Seite sie ausgibt.</li>
    </ul>
  );
}
