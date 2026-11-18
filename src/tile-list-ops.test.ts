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

import { chevronShown } from "./portfolio-config";
import { PortfolioTile } from "./portfolio-tiles";
import { changedTileCount, duplicateTile, moveTile, removeTile, reorderTiles, tileChangesStatus } from "./tile-list-ops";

const tile = (id: string, extra: Partial<PortfolioTile> = {}): PortfolioTile => ({ id, title: `Kachel ${id}`, newTab: false, ...extra });
const ids = (tiles: readonly PortfolioTile[]): string[] => tiles.map((t) => t.id);

describe("moveTile", () => {
  const list = [tile("a"), tile("b"), tile("c")];
  it("verschiebt an die Zielstelle, ohne die Eingabe zu ändern", () => {
    expect(ids(moveTile(list, 0, 2))).toEqual(["b", "c", "a"]);
    expect(ids(list)).toEqual(["a", "b", "c"]);
  });
  it("lässt die Liste am Rand unverändert", () => {
    expect(ids(moveTile(list, 0, -1))).toEqual(["a", "b", "c"]);
    expect(ids(moveTile(list, 2, 3))).toEqual(["a", "b", "c"]);
  });
});

describe("duplicateTile / removeTile", () => {
  it("setzt die Kopie hinter das Original mit neuer Kennung", () => {
    const next = duplicateTile([tile("a", { link: "/x" }), tile("b")], 0);
    expect(next).toHaveLength(3);
    expect(next[1]).toMatchObject({ title: "Kachel a", link: "/x" });
    expect(next[1]?.id).not.toBe("a");
    expect(next[2]?.id).toBe("b");
  });
  it("entfernt die Kachel an der Stelle", () => {
    expect(ids(removeTile([tile("a"), tile("b")], 0))).toEqual(["b"]);
  });
});

describe("reorderTiles", () => {
  it("folgt den Kennungen und hängt Fehlendes hinten an", () => {
    expect(ids(reorderTiles([tile("a"), tile("b"), tile("c")], ["c", "a"]))).toEqual(["c", "a", "b"]);
  });
  it("ignoriert unbekannte Kennungen", () => {
    expect(ids(reorderTiles([tile("a")], ["x", "a"]))).toEqual(["a"]);
  });
});

describe("tileChangesStatus", () => {
  const saved = { tiles: [tile("a"), tile("b")], showChevron: true };
  it("meldet nichts, wenn nichts abweicht", () => {
    expect(tileChangesStatus(saved, saved)).toBeUndefined();
    // ungesetzt heißt „an“
    expect(tileChangesStatus({ tiles: saved.tiles }, saved)).toBeUndefined();
  });
  it("zählt geänderte, neue und entfernte Kacheln", () => {
    expect(changedTileCount([tile("a", { title: "neu" }), tile("b")], saved.tiles)).toBe(1);
    expect(changedTileCount([tile("a"), tile("b"), tile("c")], saved.tiles)).toBe(1);
    expect(changedTileCount([tile("a")], saved.tiles)).toBe(1);
  });
  it("zählt eine umgestellte Reihenfolge", () => {
    expect(changedTileCount([tile("b"), tile("a")], saved.tiles)).toBe(2);
  });
  it("nennt Einzahl, Mehrzahl und den Pfeil", () => {
    expect(tileChangesStatus({ ...saved, tiles: [tile("a", { title: "x" }), tile("b")] }, saved)).toBe("1 Kachel geändert");
    expect(tileChangesStatus({ ...saved, tiles: [] }, saved)).toBe("2 Kacheln geändert");
    expect(tileChangesStatus({ ...saved, showChevron: false }, saved)).toBe("Pfeil geändert");
    expect(tileChangesStatus({ tiles: [], showChevron: false }, saved)).toBe("2 Kacheln geändert, Pfeil geändert");
    expect(chevronShown({})).toBe(true);
  });
});
