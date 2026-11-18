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
import { LayoutGrid } from "lucide-react";

import { FieldModalShellOptions, startFieldModalInjector } from "@shared/config-modal";
import { PORTFOLIO_CONFIG_ATTRIBUTE } from "./configuration-schema";
import { readLegacyFromDialog, startHiddenFields } from "./legacy-fields";
import { editorConfigFrom, serializePortfolioConfig } from "./portfolio-config";
import type { EditorConfig } from "./tile-editor";
import { tileChangesStatus } from "./tile-list-ops";

/**
 * Der Editor kommt erst, wenn ein Dialog ihn zeigt: er baut auf
 * `@man/config-ui` (Radix, react-aria, Tailwind) — nichts davon gehört ins
 * Seitenbündel, das jede Leserin lädt. Hier bleiben nur Name, Icon, Status.
 */
const loadEditor = () => import("./tile-editor");

const LazyTileEditor = React.lazy(() => loadEditor().then((module) => ({ default: module.TileEditor })));

/** Die Hilfe aus demselben Chunk wie der Editor. */
const LazyTileEditorHelp = React.lazy(() => loadEditor().then((module) => ({ default: module.TileEditorHelp })));

const LOADING = React.createElement("p", { className: "p-6 text-sm text-muted-foreground" }, "Editor wird geladen …");

/**
 * Was der gemeinsame Rahmen vom Portfolio wissen muss. Offengelegt für Tests.
 * Keine Prüfung: eine Kachel ohne Titel ist erlaubt (sie erscheint nur nicht
 * auf der Seite) und bleibt beim Übernehmen erhalten.
 */
export const tileEditorShell: FieldModalShellOptions<EditorConfig> = {
  widgetName: "Portfolio",
  title: "Kacheln bearbeiten",
  icon: LayoutGrid,
  preview: true,
  help: React.createElement(React.Suspense, { fallback: null }, React.createElement(LazyTileEditorHelp)),
  statusText: tileChangesStatus,
};

/**
 * Wartet auf den Konfigurationsdialog des Widgets, setzt das Vollbild-Fenster
 * an die Stelle von `portfolio-config` und blendet die alten Felder aus —
 * beides nur im eigenen Dialog.
 *
 * Ist `portfolio-config` noch leer, beginnt das Fenster mit dem, was die alten
 * Felder des eigenen Dialogs tragen. Erst „Übernehmen“ schreibt es nach
 * `portfolio-config`; bis dahin gilt für die Seite weiter, was in den alten
 * Feldern steht.
 *
 * @param root der zu beobachtende Teilbaum; standardmäßig das Dokument.
 * Offengelegt, damit Tests den Beobachter auf einen losgelösten Container
 * begrenzen können.
 * @returns eine Funktion, die die Beobachtung beendet und alles abbaut.
 */
export function startTileEditorInjector(root: ParentNode = document): () => void {
  const stopModal = startFieldModalInjector<EditorConfig>({
    fieldKey: PORTFOLIO_CONFIG_ATTRIBUTE,
    root,
    reopenLabel: "Kacheln bearbeiten",
    modalTestId: "tile-editor-modal",
    reopenTestId: "tile-editor-reopen",
    parse: (raw) => editorConfigFrom(raw, readLegacyFromDialog(root)),
    serialize: serializePortfolioConfig,
    shell: tileEditorShell,
    render: ({ value, onChange }) =>
      React.createElement(
        React.Suspense,
        { fallback: LOADING },
        React.createElement(LazyTileEditor, { value, onChange }),
      ),
  });
  const stopHiding = startHiddenFields(root);
  return () => {
    stopModal();
    stopHiding();
  };
}
