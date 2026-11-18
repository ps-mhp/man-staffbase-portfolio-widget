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
 * Die Kacheln stehen als JSON-Zeichenkette im Attribut `tiles`. Diese Datei
 * ist der einzige Ort, an dem aus dieser Zeichenkette Kacheln werden — die
 * Darstellung bekommt nur noch fertige Objekte und muss nicht mehr pruefen.
 *
 * Die Linie: ein Tippfehler in einer Kachel darf die anderen nicht
 * mitnehmen. Nur ein unlesbares Ganzes fuehrt zur leeren Liste.
 */
export interface PortfolioTile {
  /** Stabiler Schluessel fuer React; fehlt er, wird er aus der Stelle vergeben. */
  id: string;
  /** Pflicht. Eine Kachel ohne Titel wird uebersprungen. */
  title: string;
  description?: string;
  /** Kategorie-Etikett ueber dem Titel. */
  badge?: string;
  /** Adresse des Bildes. */
  image?: string;
  /** Alternativtext. Fehlt er, ist das Bild schmueckend und bekommt `alt=""`. */
  imageAlt?: string;
  /** Ziel der Kachel. Ohne Ziel ist die Kachel kein Verweis. */
  link?: string;
  /** Oeffnet das Ziel in einem neuen Tab. */
  newTab: boolean;
}

/**
 * Macht `candidate` eindeutig innerhalb von `used`.
 *
 * Ein Rohtext-JSON-Feld wird kopiert und angepasst — zwei Kacheln mit
 * derselben gepflegten `id`, oder eine gepflegte `id`, die zufaellig auf eine
 * vergebene (`tile-<Index>`) trifft, sind der Normalfall, kein Ausnahmefall.
 * Der Index innerhalb eines Durchlaufs ist einmalig: angehaengt an den
 * Kandidaten ergibt er einen stabilen, nachvollziehbaren Ersatz. Traf auch
 * der schon zu — etwa weil eine spaetere Kachel genau diese Zeichenkette
 * gepflegt hat —, haengt eine laufende Nummer an, bis der Schluessel frei ist.
 */
function uniqueId(candidate: string, index: number, used: Set<string>): string {
  if (!used.has(candidate)) return candidate;

  let fallback = `${candidate}-${index}`;
  let suffix = 0;
  while (used.has(fallback)) {
    suffix += 1;
    fallback = `${candidate}-${index}-${suffix}`;
  }
  return fallback;
}

/** Leerraum weg; nur was danach uebrig bleibt, zaehlt als gesetzt. */
function text(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}

/**
 * Staffbase liefert Wahrheitswerte je nach Weg als `boolean` oder als
 * Zeichenkette; beides muss hier dasselbe bedeuten.
 */
function flag(value: unknown): boolean {
  return value === true || value === "true";
}

/** Die rohe Eingabe als Array, oder `null`, wenn daraus nichts zu holen ist. */
function toArray(raw: unknown): unknown[] | null {
  // Ein fehlendes Attribut ist kein Fehler, sondern eine leere Reihe — es
  // darf keine Warnung ausloesen.
  if (raw === undefined || raw === null) return [];
  if (Array.isArray(raw)) return raw;
  if (typeof raw !== "string") return null;

  const trimmed = raw.trim();
  if (trimmed === "") return [];

  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed);
  } catch {
    return null;
  }
  return Array.isArray(parsed) ? parsed : null;
}

/** Stellschrauben des Lesens; die Vorgabe ist das strenge Verhalten. */
export interface ParsePortfolioTilesOptions {
  /**
   * Behaelt Kacheln ohne Titel mit `title: ""`.
   *
   * Die Darstellung ueberspringt eine titellose Kachel — das ist richtig und
   * bleibt so. Im Editor ist eine frisch hinzugefuegte Kachel aber genau das:
   * titellos. Liefe sie durch den strengen Parser, verschwaende sie beim
   * naechsten Oeffnen des Dialogs spurlos.
   */
  keepUntitled?: boolean;
}

/**
 * Liest das Attribut `tiles`.
 *
 * @param raw die Zeichenkette aus dem Attribut; ein bereits geparstes Array
 *   wird ebenso angenommen, damit Aufrufer nicht erst serialisieren muessen.
 * @param options siehe `ParsePortfolioTilesOptions`; ohne sie bleibt es beim
 *   strengen Verhalten.
 * @returns die gueltigen Kacheln in ihrer Reihenfolge; eine leere Liste,
 *   wenn nichts gesetzt oder das Ganze unlesbar ist.
 */
export function parsePortfolioTiles(
  raw: unknown,
  options?: ParsePortfolioTilesOptions,
): PortfolioTile[] {
  const entries = toArray(raw);
  if (entries === null) {
    console.warn("portfolio-widget: Das Feld „Kacheln“ enthält kein gültiges JSON-Array.");
    return [];
  }

  const tiles: PortfolioTile[] = [];
  const usedIds = new Set<string>();
  entries.forEach((entry, index) => {
    if (typeof entry !== "object" || entry === null) return;

    const source = entry as Record<string, unknown>;
    const title = text(source.title);
    if (title === undefined && options?.keepUntitled !== true) return;

    const id = uniqueId(text(source.id) ?? `tile-${index}`, index, usedIds);
    usedIds.add(id);

    const tile: PortfolioTile = {
      id,
      title: title ?? "",
      newTab: flag(source.newTab),
    };

    const description = text(source.description);
    if (description !== undefined) tile.description = description;
    const badge = text(source.badge);
    if (badge !== undefined) tile.badge = badge;
    const image = text(source.image);
    if (image !== undefined) tile.image = image;
    const imageAlt = text(source.imageAlt);
    if (imageAlt !== undefined) tile.imageAlt = imageAlt;
    const link = text(source.link);
    if (link !== undefined) tile.link = link;

    tiles.push(tile);
  });

  return tiles;
}

/**
 * Schreibt die Kacheln zurueck in die Form des Attributs.
 *
 * Gegenstueck zu `parsePortfolioTiles`: was leer ist, faellt weg, statt als
 * `"description": ""` im Attribut zu stehen — das Attribut soll lesbar
 * bleiben und nur enthalten, was gepflegt wurde. `newTab` erscheint nur,
 * wenn es gesetzt ist; `false` ist die Vorgabe und braucht keine Zeile.
 * Die Feldreihenfolge liegt fest, damit zwei Durchlaeufe ueber denselben
 * Inhalt dieselbe Zeichenkette ergeben.
 */
export function serializePortfolioTiles(tiles: PortfolioTile[]): string {
  return JSON.stringify(portfolioTileEntries(tiles));
}

/** Die Kacheln als schlichte Einträge für JSON; Grundlage von `serializePortfolioTiles` und `portfolio-config.ts`. */
export function portfolioTileEntries(tiles: readonly PortfolioTile[]): Array<Record<string, unknown>> {
  return tiles.map((tile) => {
    const entry: Record<string, unknown> = { id: tile.id, title: tile.title };
    const optional: Array<[string, string | undefined]> = [
      ["badge", tile.badge],
      ["description", tile.description],
      ["image", tile.image],
      ["imageAlt", tile.imageAlt],
      ["link", tile.link],
    ];
    optional.forEach(([key, value]) => {
      if (value !== undefined && value.trim() !== "") entry[key] = value;
    });
    if (tile.newTab) entry.newTab = true;
    return entry;
  });
}

/**
 * Erzeugt eine Kennung, die auch dann eindeutig ist, wenn `crypto.randomUUID`
 * fehlt — der Konfigurationsdialog laeuft in fremden Seiten, und in einem
 * unsicheren Kontext (http) stellt der Browser die Web-Crypto-API nicht.
 */
export function newTileId(): string {
  const uuid = globalThis.crypto?.randomUUID;
  if (typeof uuid === "function") return uuid.call(globalThis.crypto);
  return `t-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Eine leere Kachel, wie sie der Editor beim Hinzufuegen einsetzt. */
export function emptyPortfolioTile(): PortfolioTile {
  return { id: newTileId(), title: "", newTab: false };
}
