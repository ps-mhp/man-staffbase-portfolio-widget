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
 * Die linke Spalte des Kachel-Editors: alle Kacheln in Reihenfolge der Reihe,
 * „Neue Kachel“, Sortieren per Ziehen und Tastatur (Leerzeichen, Pfeile).
 *
 * Jede Zeile wie im Screen: Vorschaubild, Titel und „Link · Etikett“. Eine
 * Kachel ohne Titel heißt dort „Ohne Titel“ — sie erscheint auf der Seite
 * nicht, bleibt aber hier stehen.
 */

import * as React from "react";
import { ReactElement } from "react";
import { ImageIcon } from "lucide-react";
import { ItemList, type ListItem } from "@man/config-ui/sidebar/item-list";
import { SidebarPanel } from "@man/config-ui/sidebar/sidebar-panel";

import { PortfolioTile } from "./portfolio-tiles";

export interface TileSidebarProps {
  tiles: PortfolioTile[];
  selectedId: string | undefined;
  onSelect: (id: string) => void;
  onAdd: () => void;
  onReorder: (ids: string[]) => void;
}

const EMPTY_STATE = (
  <>
    Noch keine Kachel. Lege über <strong>Neue Kachel</strong> die erste an.
  </>
);

/** Die Unterzeile: wohin die Kachel führt, dahinter ihr Etikett. */
export function tileDescription(tile: PortfolioTile): string | undefined {
  const parts = [tile.link, tile.badge].filter((part): part is string => part !== undefined && part !== "");
  return parts.length === 0 ? undefined : parts.join(" · ");
}

function TileThumb({ tile }: { tile: PortfolioTile }): ReactElement {
  if (tile.image === undefined || tile.image === "") {
    return <ImageIcon className="size-4 text-muted-foreground" aria-hidden />;
  }
  return <img src={tile.image} alt="" />;
}

function listItems(tiles: readonly PortfolioTile[]): ListItem[] {
  return tiles.map((tile) => ({
    id: tile.id,
    label: tile.title.trim() === "" ? "Ohne Titel" : tile.title,
    description: tileDescription(tile),
    thumbnail: <TileThumb tile={tile} />,
  }));
}

export function TileSidebar({ tiles, selectedId, onSelect, onAdd, onReorder }: TileSidebarProps): ReactElement {
  return (
    <SidebarPanel title="Kacheln" count={tiles.length} addLabel="Neue Kachel" onAdd={onAdd}>
      <ItemList
        aria-label="Kacheln"
        items={listItems(tiles)}
        selectedId={selectedId}
        onSelect={onSelect}
        onReorder={onReorder}
        emptyState={EMPTY_STATE}
      />
    </SidebarPanel>
  );
}
