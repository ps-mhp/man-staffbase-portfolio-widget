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
 * Die Gestaltung der ganzen Reihe: Darstellung, Größe und Farben.
 *
 * Sie gilt für alle Kacheln gemeinsam — eine Reihe, in der jede Kachel anders
 * aussieht, liest sich als Fehler (wie beim Pfeil). Gespeichert wird sie in
 * `portfolio-config` neben den Kacheln; fehlt ein Schlüssel, gilt die Vorgabe,
 * und ältere Blöcke sehen aus wie bisher.
 *
 * Frei von DOM und React: liegt im Seitenbündel.
 */

/**
 * Was eine Kachel zeigt. Die Namen beschreiben die Form, nicht den Entwurf:
 *  - `image`: Bild oben (16:9, beschnitten), Text darunter — die Form bis 0.1.0,
 *  - `icon`: Icon oder Bild eingepasst und Text auf einer Farbfläche.
 */
export type PortfolioVariant = "image" | "icon";

export const PORTFOLIO_VARIANTS: readonly PortfolioVariant[] = ["image", "icon"];

/**
 * Wie groß die Kacheln sind — unabhängig von der Darstellung. Die Größe legt
 * die Mindestbreite einer Spalte fest; wie viele Spalten passen, entscheidet
 * die Breite der Reihe.
 *  - `compact`: schmale Kacheln, mehr je Reihe,
 *  - `normal`: die Breite bis 0.1.0,
 *  - `large`: breit, Bild links und Text rechts (wie eine Nachrichtenliste).
 */
export type PortfolioSize = "compact" | "normal" | "large";

export const PORTFOLIO_SIZES: readonly PortfolioSize[] = ["compact", "normal", "large"];

export interface PortfolioDesign {
  variant: PortfolioVariant;
  size: PortfolioSize;
  /** `#RRGGBB`; fehlt er, gilt die Fläche der Darstellung. */
  background?: string;
  /** `#RRGGBB`; fehlt er, wird die Schrift zur Fläche passend gewählt. */
  textColor?: string;
}

export const DEFAULT_DESIGN: PortfolioDesign = { variant: "image", size: "normal" };

/** Die Fläche des Icon-Kastens, solange niemand eine andere wählt: MAN-Rot. */
export const ICON_BACKGROUND = "#E40045";

/**
 * Die beiden Schriftfarben der Automatik: `man("slate-700")` und Weiß. Fest,
 * weil der Kontrast mit genau diesen Werten gerechnet ist.
 */
export const DARK_INK = "#1E2832";
export const LIGHT_INK = "#FFFFFF";

/** Unter diesem Verhältnis gilt Fließtext nach WCAG 2.x (AA) als schwer lesbar. */
export const MIN_TEXT_CONTRAST = 4.5;

export function readVariant(raw: unknown): PortfolioVariant | undefined {
  return PORTFOLIO_VARIANTS.includes(raw as PortfolioVariant) ? (raw as PortfolioVariant) : undefined;
}

export function readSize(raw: unknown): PortfolioSize | undefined {
  return PORTFOLIO_SIZES.includes(raw as PortfolioSize) ? (raw as PortfolioSize) : undefined;
}

const HEX = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

/**
 * `#RRGGBB` in Großbuchstaben, oder `undefined`. Nimmt auch `#RGB` und die
 * Form ohne Raute. Nur so geprüft gelangt eine Farbe an die Seite — alles
 * andere (Namen, `rgb()`, Ausdrücke) fällt weg.
 */
export function readColor(raw: unknown): string | undefined {
  if (typeof raw !== "string") return undefined;
  const match = HEX.exec(raw.trim());
  if (match === null) return undefined;
  const digits = match[1]!;
  const full = digits.length === 3 ? digits.replace(/./g, (digit) => digit + digit) : digits;
  return `#${full.toUpperCase()}`;
}

function channel(value: number): number {
  const srgb = value / 255;
  return srgb <= 0.04045 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
}

/** Relative Leuchtdichte nach WCAG 2.x; erwartet `#RRGGBB`. */
export function luminance(hex: string): number {
  const value = Number.parseInt(hex.slice(1), 16);
  const [r, g, b] = [(value >> 16) & 255, (value >> 8) & 255, value & 255].map(channel) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Kontrastverhältnis zweier Farben, 1 bis 21. */
export function contrast(a: string, b: string): number {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (light + 0.05) / (dark + 0.05);
}

/** Die Schrift der Automatik: die mit dem höheren Kontrast auf `background`. */
export function inkFor(background: string): string {
  return contrast(background, LIGHT_INK) >= contrast(background, DARK_INK) ? LIGHT_INK : DARK_INK;
}

/**
 * Die Farben, die tatsächlich gelten. `undefined` heißt jeweils „wie das
 * Stylesheet“: Bildkacheln ohne gewählte Farben behalten Fläche, Titel- und
 * Hover-Farben der MAN-Kachel.
 *
 * Eine gewählte Fläche ohne gewählte Schrift bekommt die lesbarere von
 * Dunkel und Weiß — auch die Vorgabefläche des Icon-Kastens.
 */
export function tileColors(design: PortfolioDesign): { background?: string; ink?: string } {
  const background = design.background ?? (design.variant === "icon" ? ICON_BACKGROUND : undefined);
  const ink = design.textColor ?? (background === undefined ? undefined : inkFor(background));
  return {
    ...(background === undefined ? {} : { background }),
    ...(ink === undefined ? {} : { ink }),
  };
}
