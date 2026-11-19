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
 * Die ganze Konfiguration des Portfolio-Widgets in einem Attribut:
 * `portfolio-config`.
 *
 * Bis 0.1.0-rc.3 lagen die Kacheln in `tiles` und der Pfeil in
 * `show-chevron`. Das Fenster pflegt beides an einer Stelle und schreibt es
 * hierher: `{"tiles":[…],"showChevron":true}`, Base64-kodiert wie die übrigen
 * JSON-Attribute (`@shared/payload`). Das Format der Kacheln ist unverändert.
 *
 * Seit 0.2.0 steht dort auch die Gestaltung der Reihe (`variant`, `size`,
 * `background`, `textColor`, siehe `portfolio-design.ts`). Sie hat kein
 * Altattribut: fehlt ein Schlüssel, gilt die Vorgabe — so sieht ein älterer
 * Block aus wie bisher.
 *
 * Ältere Inhalte tragen nur die einzelnen Felder. Gemischt wird je Schlüssel:
 * neuer Wert, sonst Altattribut, sonst Vorgabe. Ein Schlüssel, der im neuen
 * Attribut fehlt, gilt weiter aus dem alten — so ändert „Öffnen und Übernehmen“
 * nie etwas, das der Nutzer nicht angefasst hat.
 *
 * Der Name trägt das Widget im Namen: Editoren hängen sich über
 * `root_<Attribut>` ein, ohne das Widget zu kennen, und `config` hat schon
 * das Hotspot-Widget.
 */

import { decodePayload, encodePayload } from "@shared/payload";

import {
  DEFAULT_DESIGN,
  PortfolioDesign,
  PortfolioSize,
  PortfolioVariant,
  readColor,
  readSize,
  readVariant,
} from "./portfolio-design";
import {
  PortfolioTile,
  ParsePortfolioTilesOptions,
  parsePortfolioTiles,
  portfolioTileEntries,
} from "./portfolio-tiles";

/** Was `portfolio-config` trägt; jeder Schlüssel darf fehlen. */
export interface PortfolioConfig {
  tiles?: PortfolioTile[];
  /** Fehlt der Schlüssel, entscheidet das Altattribut `show-chevron`. */
  showChevron?: boolean;
  /** Fehlt der Schlüssel, gilt `DEFAULT_DESIGN` — für alle vier. */
  variant?: PortfolioVariant;
  size?: PortfolioSize;
  /** `#RRGGBB`. */
  background?: string;
  /** `#RRGGBB`. */
  textColor?: string;
}

/** Die Schlüssel der Gestaltung, in der Reihenfolge, in der sie geschrieben werden. */
const DESIGN_KEYS = ["variant", "size", "background", "textColor"] as const;

/** Die Felder älterer Fassungen, so wie sie am Element oder im Dialog ankommen. */
export interface LegacyPortfolioAttributes {
  tiles?: unknown;
  "show-chevron"?: unknown;
}

/** Das Ergebnis nach dem Mischen: nichts fehlt mehr. */
export interface ResolvedPortfolio {
  tiles: PortfolioTile[];
  showChevron: boolean;
  design: PortfolioDesign;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

function parseJson(text: string): unknown {
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

/**
 * Staffbase liefert Wahrheitswerte als `boolean` oder als Zeichenkette. Alles
 * andere ist kein Wert — dann entscheidet das Altattribut.
 */
export function readChevronFlag(raw: unknown): boolean | undefined {
  if (raw === true || raw === "true") return true;
  if (raw === false || raw === "false") return false;
  return undefined;
}

/**
 * Liest `portfolio-config`; `null`, wenn dort nichts Brauchbares steht —
 * leer, kaputt kodiert oder kein Objekt. Dann gelten die alten Felder.
 */
export function readPortfolioConfig(raw: unknown, options?: ParsePortfolioTilesOptions): PortfolioConfig | null {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (trimmed === "") return null;
  const value = parseJson(decodePayload(trimmed) ?? trimmed);
  if (!isRecord(value)) return null;

  const config: PortfolioConfig = {};
  // Nur ein Array zählt als Kachelliste; sonst gilt weiter `tiles` des Altattributs.
  if (Array.isArray(value.tiles)) config.tiles = parsePortfolioTiles(value.tiles, options);
  const chevron = readChevronFlag(value.showChevron);
  if (chevron !== undefined) config.showChevron = chevron;
  return { ...config, ...readDesignKeys(value) };
}

/** Nur was gültig ist: eine unbekannte Darstellung oder eine kaputte Farbe fällt weg. */
function readDesignKeys(value: Record<string, unknown>): Partial<PortfolioDesign> {
  const read = {
    variant: readVariant(value.variant),
    size: readSize(value.size),
    background: readColor(value.background),
    textColor: readColor(value.textColor),
  };
  return Object.fromEntries(Object.entries(read).filter(([, entry]) => entry !== undefined));
}

/** Die Gestaltung, die gilt: was gesetzt ist, sonst die Vorgabe. */
export function designOf(config: PortfolioConfig | null | undefined): PortfolioDesign {
  return {
    variant: config?.variant ?? DEFAULT_DESIGN.variant,
    size: config?.size ?? DEFAULT_DESIGN.size,
    ...(config?.background === undefined ? {} : { background: config.background }),
    ...(config?.textColor === undefined ? {} : { textColor: config.textColor }),
  };
}

/** Schreibt `portfolio-config`; was nicht gesetzt ist — Pfeil, Gestaltung —, bleibt weg. */
export function serializePortfolioConfig(config: PortfolioConfig): string {
  const body: Record<string, unknown> = {};
  if (config.tiles !== undefined) body.tiles = portfolioTileEntries(config.tiles);
  if (config.showChevron !== undefined) body.showChevron = config.showChevron;
  DESIGN_KEYS.forEach((key) => {
    if (config[key] !== undefined) body[key] = config[key];
  });
  return encodePayload(JSON.stringify(body));
}

/** Der Pfeil steht, solange ihn niemand ausdrücklich abschaltet. */
const chevronOf = (raw: unknown): boolean => !(raw === false || raw === "false");

/**
 * Was die Seite zeigt: je Schlüssel `portfolio-config`, sonst das
 * Altattribut, sonst die Vorgabe. Ohne `portfolio-config` bleibt alles wie in
 * den Fassungen davor.
 */
export function resolvePortfolio(attrs: LegacyPortfolioAttributes & { "portfolio-config"?: unknown }): ResolvedPortfolio {
  const config = readPortfolioConfig(attrs["portfolio-config"]);
  return {
    tiles: config?.tiles ?? parsePortfolioTiles(attrs.tiles),
    showChevron: config?.showChevron ?? chevronOf(attrs["show-chevron"]),
    design: designOf(config),
  };
}

/**
 * Der Ausgangsstand des Fensters: `portfolio-config`, sonst was die alten
 * Felder des Dialogs tragen. Kacheln ohne Titel bleiben stehen, damit eine
 * frisch angelegte nicht beim nächsten Öffnen verschwindet. Der Pfeil bleibt
 * ungesetzt, wo das alte Feld nicht lesbar ist: dann gilt es weiter.
 */
export function editorConfigFrom(raw: string, legacy: LegacyPortfolioAttributes): PortfolioConfig & { tiles: PortfolioTile[] } {
  const config = readPortfolioConfig(raw, { keepUntitled: true });
  const chevron = config?.showChevron ?? readChevronFlag(legacy["show-chevron"]);
  return {
    ...config,
    tiles: config?.tiles ?? parsePortfolioTiles(legacy.tiles, { keepUntitled: true }),
    ...(chevron === undefined ? {} : { showChevron: chevron }),
  };
}

/** Der Pfeil, wie ihn das Fenster zeigt: ungesetzt heißt „an“, die Vorgabe. */
export const chevronShown = (config: PortfolioConfig): boolean => config.showChevron ?? true;
