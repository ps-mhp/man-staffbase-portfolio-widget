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
 * Änderungen an der Kachelliste als reine Funktionen: Verschieben,
 * Duplizieren, Entfernen, Umordnen nach Kennungen, Status.
 *
 * Liegt im Seitenbündel, nicht beim nachgeladenen Editor: der Rahmen braucht
 * den Status, bevor der Editor da ist. Darum nichts aus `@man/config-ui`.
 */

import { PortfolioConfig, chevronShown, designOf } from "./portfolio-config";
import { PortfolioTile, newTileId } from "./portfolio-tiles";

/** Verschiebt den Eintrag an `from` auf die Stelle `to`; am Rand bleibt die Liste, wie sie ist. */
export function moveTile(tiles: readonly PortfolioTile[], from: number, to: number): PortfolioTile[] {
  if (to < 0 || to >= tiles.length || from === to || from < 0 || from >= tiles.length) return [...tiles];
  const next = [...tiles];
  const [moved] = next.splice(from, 1);
  if (moved !== undefined) next.splice(to, 0, moved);
  return next;
}

/** Setzt eine Kopie mit neuer Kennung hinter die Kachel an `index`. */
export function duplicateTile(tiles: readonly PortfolioTile[], index: number): PortfolioTile[] {
  const source = tiles[index];
  if (source === undefined) return [...tiles];
  const next = [...tiles];
  next.splice(index + 1, 0, { ...source, id: newTileId() });
  return next;
}

export function removeTile(tiles: readonly PortfolioTile[], index: number): PortfolioTile[] {
  return tiles.filter((_, at) => at !== index);
}

/** Bringt die Kacheln in die Reihenfolge der Kennungen; Unbekanntes fällt weg, Fehlendes hängt hinten an. */
export function reorderTiles(tiles: readonly PortfolioTile[], ids: readonly string[]): PortfolioTile[] {
  const byId = new Map(tiles.map((tile) => [tile.id, tile] as const));
  const ordered = ids.flatMap((id) => {
    const tile = byId.get(id);
    return tile === undefined ? [] : [tile];
  });
  const placed = new Set(ordered.map((tile) => tile.id));
  return [...ordered, ...tiles.filter((tile) => !placed.has(tile.id))];
}

const sameTile = (a: PortfolioTile, b: PortfolioTile): boolean =>
  a.title === b.title &&
  a.description === b.description &&
  a.badge === b.badge &&
  a.image === b.image &&
  a.imageAlt === b.imageAlt &&
  a.link === b.link &&
  a.newTab === b.newTab;

/** Wie viele Kacheln sich gegenüber dem übernommenen Stand unterscheiden: geändert, neu, entfernt oder umgestellt. */
export function changedTileCount(draft: readonly PortfolioTile[], saved: readonly PortfolioTile[]): number {
  const before = new Map(saved.map((tile) => [tile.id, tile] as const));
  const kept = new Set<string>();
  let count = 0;
  draft.forEach((tile, index) => {
    const old = before.get(tile.id);
    if (old === undefined) {
      count += 1;
      return;
    }
    kept.add(tile.id);
    if (!sameTile(tile, old) || saved[index]?.id !== tile.id) count += 1;
  });
  return count + saved.filter((tile) => !kept.has(tile.id)).length;
}

/** Ob Darstellung, Größe oder Farben abweichen — gemessen an dem, was gilt, nicht an gesetzten Schlüsseln. */
function designChanged(draft: PortfolioConfig, saved: PortfolioConfig): boolean {
  const [a, b] = [designOf(draft), designOf(saved)];
  return a.variant !== b.variant || a.size !== b.size || a.background !== b.background || a.textColor !== b.textColor;
}

/**
 * Was am Status steht, solange etwas offen ist: „1 Kachel geändert“,
 * „3 Kacheln geändert, Gestaltung geändert, Pfeil geändert“; `undefined`,
 * wenn nichts abweicht.
 */
export function tileChangesStatus(draft: PortfolioConfig, saved: PortfolioConfig): string | undefined {
  const count = changedTileCount(draft.tiles ?? [], saved.tiles ?? []);
  const parts: string[] = [];
  if (count > 0) parts.push(count === 1 ? "1 Kachel geändert" : `${count} Kacheln geändert`);
  if (designChanged(draft, saved)) parts.push("Gestaltung geändert");
  if (chevronShown(draft) !== chevronShown(saved)) parts.push("Pfeil geändert");
  return parts.length === 0 ? undefined : parts.join(", ");
}
