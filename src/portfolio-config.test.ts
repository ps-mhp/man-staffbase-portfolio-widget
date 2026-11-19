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

import { encodePayload } from "@shared/payload";

import {
  chevronShown,
  designOf,
  editorConfigFrom,
  readChevronFlag,
  readPortfolioConfig,
  resolvePortfolio,
  serializePortfolioConfig,
} from "./portfolio-config";

const LEGACY_TILES = JSON.stringify([{ title: "Alt", link: "/alt" }]);
const config = (body: unknown): string => encodePayload(JSON.stringify(body));

describe("readPortfolioConfig", () => {
  it("gibt null, wo nichts Brauchbares steht", () => {
    expect(readPortfolioConfig(undefined)).toBeNull();
    expect(readPortfolioConfig("")).toBeNull();
    expect(readPortfolioConfig("kaputt{")).toBeNull();
    expect(readPortfolioConfig("[1]")).toBeNull();
  });

  it("liest Base64 wie Klartext-JSON", () => {
    const body = { tiles: [{ title: "A" }], showChevron: false };
    expect(readPortfolioConfig(config(body))?.showChevron).toBe(false);
    expect(readPortfolioConfig(JSON.stringify(body))?.tiles?.[0]?.title).toBe("A");
  });

  it("lässt Schlüssel weg, die nicht dastehen", () => {
    expect(readPortfolioConfig(config({}))).toEqual({});
    expect(readPortfolioConfig(config({ tiles: "x", showChevron: "vielleicht" }))).toEqual({});
  });

  it("behält titellose Kacheln nur auf Wunsch", () => {
    const raw = config({ tiles: [{ title: "" }, { title: "B" }] });
    expect(readPortfolioConfig(raw)?.tiles).toHaveLength(1);
    expect(readPortfolioConfig(raw, { keepUntitled: true })?.tiles).toHaveLength(2);
  });
});

describe("readChevronFlag", () => {
  it("kennt nur echte Wahrheitswerte", () => {
    expect(readChevronFlag(true)).toBe(true);
    expect(readChevronFlag("false")).toBe(false);
    expect(readChevronFlag("on")).toBeUndefined();
    expect(readChevronFlag(undefined)).toBeUndefined();
  });
});

describe("serializePortfolioConfig", () => {
  it("läuft hin und zurück", () => {
    const tiles = [{ id: "a", title: "A", newTab: true, link: "/a" }];
    expect(readPortfolioConfig(serializePortfolioConfig({ tiles, showChevron: false }))).toEqual({
      tiles,
      showChevron: false,
    });
  });

  it("lässt einen nicht gesetzten Pfeil weg", () => {
    const raw = serializePortfolioConfig({ tiles: [] });
    expect(readPortfolioConfig(raw)).toEqual({ tiles: [] });
  });
});

describe("resolvePortfolio: alte Blöcke ohne portfolio-config", () => {
  it("rendert wie bisher aus den Altattributen", () => {
    const resolved = resolvePortfolio({ tiles: LEGACY_TILES, "show-chevron": "false" });
    expect(resolved.tiles.map((t) => t.title)).toEqual(["Alt"]);
    expect(resolved.showChevron).toBe(false);
  });

  it("nimmt ohne alles die Vorgaben: keine Kacheln, Pfeil an", () => {
    expect(resolvePortfolio({})).toEqual({ tiles: [], showChevron: true, design: { variant: "image", size: "normal" } });
  });

  it("ignoriert ein leeres oder kaputtes portfolio-config", () => {
    expect(resolvePortfolio({ "portfolio-config": "", tiles: LEGACY_TILES }).tiles).toHaveLength(1);
    expect(resolvePortfolio({ "portfolio-config": "{{", tiles: LEGACY_TILES }).tiles).toHaveLength(1);
  });
});

describe("resolvePortfolio: je Schlüssel gemischt", () => {
  it("nimmt Kacheln aus dem neuen Attribut, den Pfeil aus dem alten, wenn er fehlt", () => {
    const resolved = resolvePortfolio({
      "portfolio-config": config({ tiles: [{ title: "Neu" }] }),
      tiles: LEGACY_TILES,
      "show-chevron": false,
    });
    expect(resolved.tiles.map((t) => t.title)).toEqual(["Neu"]);
    expect(resolved.showChevron).toBe(false);
  });

  it("lässt den neuen Pfeil gewinnen und die alten Kacheln weitergelten", () => {
    const resolved = resolvePortfolio({
      "portfolio-config": config({ showChevron: true }),
      tiles: LEGACY_TILES,
      "show-chevron": false,
    });
    expect(resolved.tiles.map((t) => t.title)).toEqual(["Alt"]);
    expect(resolved.showChevron).toBe(true);
  });

  it("zählt eine leere neue Kachelliste als Wert", () => {
    expect(resolvePortfolio({ "portfolio-config": config({ tiles: [] }), tiles: LEGACY_TILES }).tiles).toEqual([]);
  });

  it("lässt titellose Kacheln auf der Seite weg", () => {
    expect(resolvePortfolio({ "portfolio-config": config({ tiles: [{ title: "" }] }) }).tiles).toEqual([]);
  });
});

describe("editorConfigFrom: Öffnen und Übernehmen ändert nichts", () => {
  it("übernimmt lesbare Altwerte", () => {
    const start = editorConfigFrom("", { tiles: LEGACY_TILES, "show-chevron": false });
    expect(start.tiles.map((t) => t.title)).toEqual(["Alt"]);
    expect(start.showChevron).toBe(false);
  });

  it("lässt einen nicht lesbaren Pfeil ungesetzt, statt ihn mit der Vorgabe zu überschreiben", () => {
    const start = editorConfigFrom("", { tiles: LEGACY_TILES });
    expect("showChevron" in start).toBe(false);
    // Nach dem Schreiben gilt weiter das Altattribut.
    const written = serializePortfolioConfig(start);
    expect(resolvePortfolio({ "portfolio-config": written, tiles: LEGACY_TILES, "show-chevron": "false" }).showChevron).toBe(false);
  });

  it("zeigt den ungesetzten Pfeil als „an“ an", () => {
    expect(chevronShown({})).toBe(true);
  });

  it("rendert nach Öffnen und Übernehmen dasselbe wie vorher", () => {
    const legacy = { tiles: JSON.stringify([{ title: "A", link: "/a", newTab: true }, { title: "B", image: "https://x/y.png" }]), "show-chevron": false };
    const before = resolvePortfolio(legacy);
    const written = serializePortfolioConfig(editorConfigFrom("", legacy));
    const after = resolvePortfolio({ ...legacy, "portfolio-config": written });
    expect(after.showChevron).toBe(before.showChevron);
    expect(after.tiles.map(({ id: _id, ...rest }) => rest)).toEqual(before.tiles.map(({ id: _id, ...rest }) => rest));
  });

  it("liest vorhandenes portfolio-config vor den alten Feldern", () => {
    const raw = config({ tiles: [{ title: "Neu" }], showChevron: true });
    const start = editorConfigFrom(raw, { tiles: LEGACY_TILES, "show-chevron": false });
    expect(start.tiles.map((t) => t.title)).toEqual(["Neu"]);
    expect(start.showChevron).toBe(true);
  });

  it("behält frische titellose Kacheln", () => {
    const raw = config({ tiles: [{ title: "" }] });
    expect(editorConfigFrom(raw, {}).tiles).toHaveLength(1);
  });
});

describe("Gestaltung in portfolio-config", () => {
  it("liest Darstellung, Größe und Farben und vereinheitlicht die Farben", () => {
    const read = readPortfolioConfig(config({ variant: "icon", size: "compact", background: "#e40045", textColor: "fff" }));
    expect(read).toEqual({ variant: "icon", size: "compact", background: "#E40045", textColor: "#FFFFFF" });
  });

  it("lässt Unbekanntes und kaputte Farben weg", () => {
    expect(readPortfolioConfig(config({ variant: "kachel", size: "XL", background: "rot", textColor: 3 }))).toEqual({});
  });

  it("läuft hin und zurück und schreibt nur, was gesetzt ist", () => {
    const body = { tiles: [], variant: "icon" as const, size: "large" as const, background: "#303C49" };
    expect(readPortfolioConfig(serializePortfolioConfig(body))).toEqual(body);
    expect(readPortfolioConfig(serializePortfolioConfig({ tiles: [] }))).toEqual({ tiles: [] });
  });

  it("gibt die Gestaltung an Seite und Fenster weiter", () => {
    const raw = config({ tiles: [{ title: "A" }], variant: "icon", size: "large" });
    expect(resolvePortfolio({ "portfolio-config": raw }).design).toEqual({ variant: "icon", size: "large" });
    expect(editorConfigFrom(raw, {})).toMatchObject({ variant: "icon", size: "large" });
  });

  it("füllt Fehlendes mit der Vorgabe: Bildkachel in Normalgröße", () => {
    expect(designOf(null)).toEqual({ variant: "image", size: "normal" });
    expect(designOf({ size: "compact", textColor: "#FFFFFF" })).toEqual({
      variant: "image",
      size: "compact",
      textColor: "#FFFFFF",
    });
  });

  it("sieht für einen älteren Block aus wie bisher", () => {
    const resolved = resolvePortfolio({ tiles: LEGACY_TILES });
    expect(resolved.design).toEqual({ variant: "image", size: "normal" });
  });
});
