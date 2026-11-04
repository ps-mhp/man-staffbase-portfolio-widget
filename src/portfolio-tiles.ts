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

/**
 * Liest das Attribut `tiles`.
 *
 * @param raw die Zeichenkette aus dem Attribut; ein bereits geparstes Array
 *   wird ebenso angenommen, damit Aufrufer nicht erst serialisieren muessen.
 * @returns die gueltigen Kacheln in ihrer Reihenfolge; eine leere Liste,
 *   wenn nichts gesetzt oder das Ganze unlesbar ist.
 */
export function parsePortfolioTiles(raw: unknown): PortfolioTile[] {
  const entries = toArray(raw);
  if (entries === null) {
    console.warn("portfolio-widget: Das Feld \"Kacheln\" enthält kein gültiges JSON-Array.");
    return [];
  }

  const tiles: PortfolioTile[] = [];
  entries.forEach((entry, index) => {
    if (typeof entry !== "object" || entry === null) return;

    const source = entry as Record<string, unknown>;
    const title = text(source.title);
    if (title === undefined) return;

    const tile: PortfolioTile = {
      id: text(source.id) ?? `tile-${index}`,
      title,
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
