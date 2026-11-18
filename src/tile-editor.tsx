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
 * Der Redaktionsdialog der Kacheln im Vollbild-Rahmen von `@man/config-ui`.
 *
 * Links die Kacheln in Reihenfolge der Reihe, in der Mitte die Felder der
 * gewählten, rechts „Gestaltung“ mit dem Pfeil, der für alle Kacheln gilt. In
 * den Geräteansichten steht statt der Felder die echte Leseansicht
 * (`TilePreview`).
 *
 * Er schreibt nichts selbst zurück und zeichnet keine Knöpfe zum Übernehmen
 * oder Abbrechen: Kopf, Status, Rückgängig und Rückfrage kommen aus dem
 * Rahmen, das Zurückschreiben ins Formularfeld aus `@shared/config-modal`.
 * Nachgeladen wird er nur im Studio (`tile-editor-injector.ts`) — die
 * Bausteine bringen react-aria mit, und das gehört nicht ins Seitenbündel.
 *
 * Bilder kommen aus der Mediathek: im Rahmen als Leiste rechts
 * (`useMediaPanel`), deren Kacheln sich auch direkt auf das Bildfeld ziehen
 * lassen; ohne Rahmen als Overlay.
 */

import * as React from "react";
import { ReactElement, useMemo } from "react";
import { SwitchRow } from "@man/config-ui/form/switch-row";
import { InspectorPanel } from "@man/config-ui/inspector/inspector-panel";
import { ConfigWorkspace } from "@man/config-ui/layout/config-workspace";
import { MediaClient, createMediaClient } from "@shared/media/media-client";
import { PickedMedia } from "@shared/media/media-picker";
import { useMediaPanel } from "@shared/media/use-media-panel";

import { PortfolioConfig, chevronShown } from "./portfolio-config";
import { PortfolioTile } from "./portfolio-tiles";
import { TileForm } from "./tile-form";
import { TilePreview } from "./tile-preview";
import { TileSidebar } from "./tile-sidebar";
import { useTiles } from "./use-tiles";

export { TileEditorHelp } from "./tile-editor-help";

/** Was das Fenster bearbeitet: die Kacheln stehen immer, der Pfeil nur, wenn er gesetzt ist. */
export type EditorConfig = PortfolioConfig & { tiles: PortfolioTile[] };

export interface TileEditorProps {
  value: EditorConfig;
  onChange: (config: EditorConfig) => void;
  /** Vorgabe ist ein Client auf dieselbe Herkunft; für Tests austauschbar. */
  mediaClient?: MediaClient;
}

/**
 * Der Alternativtext, den ein gewähltes Bild beisteuert — oder `undefined`.
 *
 * Die Mediathek reicht als `alt` den Dateinamen durch. Ein Dateiname ist
 * kein Alternativtext: „lkw.png“ liest ein Screenreader vor, ohne etwas zu
 * erklären. Übernommen wird er deshalb nur, wenn er vom Dateinamen abweicht
 * — und nie über einen bereits getippten Text hinweg, auch nicht über einen
 * leeren: „schmückend“ ist eine Aussage, keine fehlende Angabe.
 */
export function altFromPick(
  current: string | undefined,
  picked: Pick<PickedMedia, "alt" | "fileName">,
): string | undefined {
  if (current !== undefined) return undefined;
  if (picked.alt === undefined || picked.alt === "") return undefined;
  if (picked.alt === picked.fileName) return undefined;
  return picked.alt;
}

export function TileEditor({ value, onChange, mediaClient }: TileEditorProps): ReactElement {
  const client = useMemo(() => mediaClient ?? createMediaClient(), [mediaClient]);
  const tiles = useTiles(value.tiles, (next) => onChange({ ...value, tiles: next }));
  const media = useMediaPanel(client);
  const { tile, index, patchTile } = tiles;

  /** Das gewählte Bild in die Kachel, die gefragt hat — auch wenn inzwischen eine andere gewählt ist. */
  const place = (tileId: string, picked: PickedMedia): void => {
    const current = value.tiles.find((entry) => entry.id === tileId);
    const alt = current === undefined ? undefined : altFromPick(current.imageAlt, picked);
    patchTile(tileId, { image: picked.url, ...(alt === undefined ? {} : { imageAlt: alt }) });
  };

  const openMedia = (): void => {
    if (tile === undefined) return;
    const tileId = tile.id;
    media.openMedia({
      title: `Bild für Kachel ${index + 1}`,
      accept: "images",
      onSelect: (picked) => place(tileId, picked),
    });
  };

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col" data-testid="tile-editor">
      <ConfigWorkspace
        className="flex-1"
        sidebar={
          <TileSidebar
            tiles={value.tiles}
            selectedId={tile?.id}
            onSelect={tiles.select}
            onAdd={tiles.add}
            onReorder={tiles.reorder}
          />
        }
        inspector={
          <InspectorPanel title="Gestaltung">
            <SwitchRow
              label="Pfeil anzeigen"
              hint="Gilt für alle Kacheln."
              checked={chevronShown(value)}
              onCheckedChange={(showChevron) => onChange({ ...value, showChevron })}
              data-testid="tile-chevron"
            />
          </InspectorPanel>
        }
        preview={<TilePreview config={value} />}
      >
        <TileForm tiles={tiles} total={value.tiles.length} client={client} onPick={openMedia} onDropPick={place} />
      </ConfigWorkspace>
      {media.overlay}
    </div>
  );
}
