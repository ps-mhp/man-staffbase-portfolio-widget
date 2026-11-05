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
import {
  PortfolioTile,
  newTileId,
  parsePortfolioTiles,
  serializePortfolioTiles,
} from "./portfolio-tiles";

let warnSpy: jest.SpyInstance;

afterEach(() => {
  if (warnSpy) {
    warnSpy.mockRestore();
  }
});

/** Fangt `console.warn` ab, damit die Testausgabe sauber bleibt und sich zaehlen laesst. */
function withWarn(run: () => void): jest.SpyInstance {
  warnSpy = jest.spyOn(console, "warn").mockImplementation(() => undefined);
  run();
  return warnSpy;
}

describe("parsePortfolioTiles", () => {
  it("liefert eine leere Liste fuer leere Eingaben, ohne zu warnen", () => {
    let results: PortfolioTile[][] = [];
    const warn = withWarn(() => {
      results = [
        parsePortfolioTiles(""),
        parsePortfolioTiles("   "),
        parsePortfolioTiles("[]"),
        parsePortfolioTiles(undefined),
        parsePortfolioTiles(null),
      ];
    });
    expect(results).toEqual([[], [], [], [], []]);
    expect(warn).not.toHaveBeenCalled();
  });

  it("warnt einmal und liefert nichts, wenn das JSON kaputt ist", () => {
    let tiles: PortfolioTile[] = [];
    const warn = withWarn(() => {
      tiles = parsePortfolioTiles('[{"title":"A",}]');
    });
    expect(tiles).toEqual([]);
    expect(warn).toHaveBeenCalledTimes(1);
  });

  it("behandelt ein Objekt statt eines Arrays wie kaputtes JSON", () => {
    let tiles: PortfolioTile[] = [];
    const warn = withWarn(() => {
      tiles = parsePortfolioTiles('{"title":"A"}');
    });
    expect(tiles).toEqual([]);
    expect(warn).toHaveBeenCalledTimes(1);
  });

  it("uebernimmt alle Felder einer vollstaendigen Kachel", () => {
    const raw = JSON.stringify([
      {
        id: "t1",
        title: "Lkw",
        description: "Schwere Reihe",
        badge: "Fahrzeuge",
        image: "https://example.test/lkw.png",
        imageAlt: "Ein Lkw",
        link: "https://example.test/lkw",
        newTab: true,
      },
    ]);
    expect(parsePortfolioTiles(raw)).toEqual([
      {
        id: "t1",
        title: "Lkw",
        description: "Schwere Reihe",
        badge: "Fahrzeuge",
        image: "https://example.test/lkw.png",
        imageAlt: "Ein Lkw",
        link: "https://example.test/lkw",
        newTab: true,
      },
    ]);
  });

  it("ueberspringt Eintraege ohne Titel und laesst die Nachbarn stehen", () => {
    const raw = JSON.stringify([
      { title: "Eins" },
      { description: "ohne Titel" },
      { title: "   " },
      42,
      null,
      { title: "Zwei" },
    ]);
    expect(parsePortfolioTiles(raw).map((tile) => tile.title)).toEqual(["Eins", "Zwei"]);
  });

  it("vergibt fehlende Schluessel aus der Stelle und haelt sie eindeutig", () => {
    const raw = JSON.stringify([{ title: "Eins" }, { id: "fest", title: "Zwei" }, { title: "Drei" }]);
    const ids = parsePortfolioTiles(raw).map((tile) => tile.id);
    expect(ids[1]).toBe("fest");
    expect(new Set(ids).size).toBe(3);
  });

  it("loest die Kollision einer gepflegten id mit einer vergebenen auf", () => {
    // Die erste Kachel bekommt die vergebene id "tile-0" aus ihrer Stelle;
    // die zweite pflegt zufaellig genau diese Zeichenkette.
    const raw = JSON.stringify([{ title: "Eins" }, { title: "Zwei", id: "tile-0" }]);
    const ids = parsePortfolioTiles(raw).map((tile) => tile.id);
    expect(ids[0]).toBe("tile-0");
    expect(ids[1]).not.toBe("tile-0");
    expect(new Set(ids).size).toBe(2);
  });

  it("loest zwei gepflegte Kacheln mit derselben id auf", () => {
    const raw = JSON.stringify([
      { title: "Eins", id: "kopie" },
      { title: "Zwei", id: "kopie" },
    ]);
    const ids = parsePortfolioTiles(raw).map((tile) => tile.id);
    expect(ids[0]).toBe("kopie");
    expect(ids[1]).not.toBe("kopie");
    expect(new Set(ids).size).toBe(2);
  });

  it("liest newTab aus Wahrheitswert und Zeichenkette", () => {
    const raw = JSON.stringify([
      { title: "A", newTab: true },
      { title: "B", newTab: "true" },
      { title: "C", newTab: false },
      { title: "D" },
    ]);
    expect(parsePortfolioTiles(raw).map((tile) => tile.newTab)).toEqual([true, true, false, false]);
  });

  it("laesst leere Textfelder weg statt sie als leere Zeichenkette zu fuehren", () => {
    const raw = JSON.stringify([{ title: "A", description: "", badge: "  ", image: "", link: "" }]);
    expect(parsePortfolioTiles(raw)).toEqual([{ id: "tile-0", title: "A", newTab: false }]);
  });

  it("schneidet Leerraum an den Raendern ab", () => {
    const raw = JSON.stringify([{ title: "  Lkw  ", badge: " Fahrzeuge " }]);
    const [tile] = parsePortfolioTiles(raw);
    expect(tile.title).toBe("Lkw");
    expect(tile.badge).toBe("Fahrzeuge");
  });

  it("nimmt ein bereits geparstes Array entgegen", () => {
    expect(parsePortfolioTiles([{ title: "Lkw" }]).map((tile) => tile.title)).toEqual(["Lkw"]);
  });
});

describe("parsePortfolioTiles mit keepUntitled", () => {
  it("behaelt eine titellose Kachel mit leerem Titel", () => {
    const raw = JSON.stringify([{ title: "A" }, { id: "neu" }]);
    const tiles = parsePortfolioTiles(raw, { keepUntitled: true });
    expect(tiles.map((tile) => [tile.id, tile.title])).toEqual([
      ["tile-0", "A"],
      ["neu", ""],
    ]);
  });

  it("wirft titellose Kacheln ohne die Option weiterhin heraus", () => {
    const raw = JSON.stringify([{ title: "A" }, { id: "neu" }, { title: "   " }]);
    expect(parsePortfolioTiles(raw).map((tile) => tile.title)).toEqual(["A"]);
    expect(parsePortfolioTiles(raw, { keepUntitled: false }).map((tile) => tile.title)).toEqual(["A"]);
  });

  it("vergibt auch titellosen Kacheln eindeutige Schluessel", () => {
    const tiles = parsePortfolioTiles([{}, {}], { keepUntitled: true });
    expect(new Set(tiles.map((tile) => tile.id)).size).toBe(2);
  });
});

describe("serializePortfolioTiles", () => {
  it("laesst leere optionale Felder und newTab: false weg", () => {
    const json = serializePortfolioTiles([
      { id: "a", title: "Lkw", description: "", badge: undefined, newTab: false },
    ]);
    expect(JSON.parse(json)).toEqual([{ id: "a", title: "Lkw" }]);
  });

  it("schreibt newTab nur, wenn es gesetzt ist", () => {
    const json = serializePortfolioTiles([{ id: "a", title: "Lkw", newTab: true }]);
    expect(JSON.parse(json)).toEqual([{ id: "a", title: "Lkw", newTab: true }]);
  });

  it("haelt die Feldreihenfolge stabil", () => {
    const tile: PortfolioTile = {
      id: "a",
      title: "Lkw",
      badge: "Fahrzeuge",
      description: "Die schwere Reihe.",
      image: "https://cdn.example.test/lkw.png",
      imageAlt: "Ein Lkw",
      link: "/lkw",
      newTab: true,
    };
    expect(serializePortfolioTiles([tile])).toBe(
      '[{"id":"a","title":"Lkw","badge":"Fahrzeuge","description":"Die schwere Reihe.",' +
        '"image":"https://cdn.example.test/lkw.png","imageAlt":"Ein Lkw","link":"/lkw","newTab":true}]',
    );
  });

  it("ueberlebt den Weg durch den Parser unveraendert", () => {
    const tiles: PortfolioTile[] = [
      { id: "a", title: "Lkw", badge: "Fahrzeuge", link: "/lkw", newTab: true },
      { id: "b", title: "Bus", image: "https://cdn.example.test/bus.png", newTab: false },
    ];
    expect(parsePortfolioTiles(serializePortfolioTiles(tiles))).toEqual(tiles);
  });

  it("haelt auch titellose Kacheln durch, solange sie behalten werden", () => {
    const tiles: PortfolioTile[] = [{ id: "a", title: "", newTab: false }];
    expect(parsePortfolioTiles(serializePortfolioTiles(tiles), { keepUntitled: true })).toEqual(tiles);
  });

  it("liefert fuer eine leere Liste das leere Array", () => {
    expect(serializePortfolioTiles([])).toBe("[]");
  });
});

describe("newTileId", () => {
  it("vergibt bei jedem Aufruf eine andere Kennung", () => {
    const ids = new Set(Array.from({ length: 50 }, () => newTileId()));
    expect(ids.size).toBe(50);
  });

  it("kommt ohne die Web-Crypto-API aus", () => {
    const original = Object.getOwnPropertyDescriptor(globalThis, "crypto");
    Object.defineProperty(globalThis, "crypto", { value: undefined, configurable: true });
    try {
      expect(newTileId()).toMatch(/^t-/);
    } finally {
      if (original) Object.defineProperty(globalThis, "crypto", original);
    }
  });
});
