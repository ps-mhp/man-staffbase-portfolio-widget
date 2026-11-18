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
 * Auswahl und Änderungen der Kachelliste im Editor.
 *
 * Die Auswahl hängt an der Kennung, nicht an der Stelle: nach dem Ziehen,
 * nach ↑ ↓ und nach Rückgängig im Rahmen bleibt dieselbe Kachel gewählt. Die
 * Stelle wird nur für den Fall mitgeführt, dass die Kachel verschwindet —
 * gelöscht oder per Rückgängig zurückgenommen. Dann bleibt die Auswahl, so
 * weit es geht, an derselben Stelle.
 */

import { useCallback, useLayoutEffect, useRef, useState } from "react";

import { PortfolioTile, emptyPortfolioTile } from "./portfolio-tiles";
import { duplicateTile, moveTile, removeTile, reorderTiles } from "./tile-list-ops";

interface Selection {
  id: string | null;
  index: number;
}

export interface Tiles {
  /** Stelle der gewählten Kachel, `-1` bei leerer Liste. */
  index: number;
  tile: PortfolioTile | undefined;
  select: (id: string) => void;
  add: () => void;
  duplicate: () => void;
  remove: () => void;
  move: (delta: number) => void;
  reorder: (ids: string[]) => void;
  patch: (changes: Partial<PortfolioTile>) => void;
  /**
   * Ändert die Kachel mit dieser Kennung, gleich welche gewählt ist. Liest den
   * jüngsten Stand: die Mediathek-Leiste hält ihren Rückruf seit dem Öffnen
   * fest, und ein Ablegen löst sich erst nach einer Serveranfrage auf.
   */
  patchTile: (id: string, changes: Partial<PortfolioTile>) => void;
}

function resolveIndex(tiles: readonly PortfolioTile[], selection: Selection): number {
  const found = tiles.findIndex((tile) => tile.id === selection.id);
  if (found >= 0) return found;
  return tiles.length === 0 ? -1 : Math.min(Math.max(selection.index, 0), tiles.length - 1);
}

function useLatestPatch(value: PortfolioTile[], onChange: (tiles: PortfolioTile[]) => void) {
  const latest = useRef({ value, onChange });
  useLayoutEffect(() => {
    latest.current = { value, onChange };
  });
  return useCallback((id: string, changes: Partial<PortfolioTile>): void => {
    const current = latest.current.value;
    if (!current.some((tile) => tile.id === id)) return;
    const next = current.map((tile) => (tile.id === id ? { ...tile, ...changes } : tile));
    // Gleich vormerken: ein zweites Ablegen vor dem nächsten Rendern baut auf
    // diesem auf, statt es zu überschreiben.
    latest.current = { ...latest.current, value: next };
    latest.current.onChange(next);
  }, []);
}

export function useTiles(value: PortfolioTile[], onChange: (tiles: PortfolioTile[]) => void): Tiles {
  const [selection, setSelection] = useState<Selection>(() => ({ id: value[0]?.id ?? null, index: 0 }));
  const patchTile = useLatestPatch(value, onChange);
  const index = resolveIndex(value, selection);
  const tile = index >= 0 ? value[index] : undefined;

  const selectAt = (tiles: readonly PortfolioTile[], at: number): void =>
    setSelection({ id: tiles[at]?.id ?? null, index: at });
  const commit = (next: PortfolioTile[], at: number): void => {
    onChange(next);
    selectAt(next, at);
  };

  return {
    index,
    tile,
    select: (id) => selectAt(value, value.findIndex((entry) => entry.id === id)),
    add: () => commit([...value, emptyPortfolioTile()], value.length),
    duplicate: () => (tile === undefined ? undefined : commit(duplicateTile(value, index), index + 1)),
    remove: () => (tile === undefined ? undefined : commit(removeTile(value, index), Math.max(index - 1, 0))),
    move: (delta) => {
      if (tile === undefined) return;
      const to = index + delta;
      if (to < 0 || to >= value.length) return;
      commit(moveTile(value, index, to), to);
    },
    // Die Auswahl folgt der Kennung von selbst.
    reorder: (ids) => onChange(reorderTiles(value, ids)),
    patch: (changes) => {
      if (tile !== undefined) patchTile(tile.id, changes);
    },
    patchTile,
  };
}
