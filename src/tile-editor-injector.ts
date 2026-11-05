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

import * as React from "react";

import { startFieldModalInjector } from "@shared/config-modal";
import { TILES_ATTRIBUTE } from "./configuration-schema";
import { PortfolioTile, parsePortfolioTiles, serializePortfolioTiles } from "./portfolio-tiles";
import { TileEditor } from "./tile-editor";

/**
 * Wartet auf den Konfigurationsdialog des Widgets und setzt den Kachel-Editor
 * an die Stelle seines `tiles`-Feldes.
 *
 * Alles, was das Überleben im fremden Dialog betrifft — Portal, Abfangen des
 * Schließens, Zurückschreiben über den nativen Setter —, liegt in
 * `@shared/config-modal`; hier bleibt nur die Zuordnung von Feld und Editor.
 *
 * @param root der zu beobachtende Teilbaum; standardmäßig das Dokument.
 * Offengelegt, damit Tests den Beobachter auf einen losgelösten Container
 * begrenzen können.
 * @returns eine Funktion, die die Beobachtung beendet und den Editor abbaut.
 */
export function startTileEditorInjector(root: ParentNode = document): () => void {
  return startFieldModalInjector<PortfolioTile[]>({
    fieldKey: TILES_ATTRIBUTE,
    root,
    reopenLabel: "Kacheln bearbeiten",
    modalTestId: "tile-editor-modal",
    reopenTestId: "tile-editor-reopen",
    // Eine frisch hinzugefügte Kachel hat noch keinen Titel. Durch den
    // strengen Parser verschwände sie beim nächsten Öffnen des Dialogs; im
    // Editor bleibt sie stehen und trägt stattdessen einen Hinweis.
    parse: (raw) => parsePortfolioTiles(raw, { keepUntitled: true }),
    serialize: serializePortfolioTiles,
    // Der Editor zeichnet seinen eigenen Rahmen: Liste und Fußzeile teilen
    // sich Kanten, die der Formular-Innenabstand des Panels nur von ihnen
    // wegschöbe.
    panelStyle: { padding: "0px" },
    render: ({ value, onChange, onSave, onClose, dirty }) =>
      React.createElement(TileEditor, { value, onChange, onSave, onClose, dirty }),
  });
}
