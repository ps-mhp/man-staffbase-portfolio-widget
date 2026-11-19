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
 * Wachen über das übersetzte Stylesheet.
 *
 * Auf einer Instanz mit `man-theme` beansprucht dessen Typografie-Regel
 * Überschriften, Absätze und Verweise im Inhaltsbereich mit Gewicht
 * (`!important`, teils höherer Spezifität als unsere einfache Klasse). Keine
 * Komponentenprüfung merkt davon etwas, weil jsdom kein fremdes Stylesheet
 * kennt und Aussehen ohnehin nicht prüfbar ist.
 *
 * Was sich prüfen lässt, ist die Abwehr selbst: dass Liste, Eintrag, Kachel,
 * Titel und Beschreibung ihre Regeln mit erhöhter Spezifität durchsetzen, dass
 * das Markenquadrat vor jedem Eintrag unterdrückt bleibt und dass der
 * Hover-Farbwechsel über eine eigene CSS-Variable läuft statt über ein
 * Spezifitäts-Wettrüsten, das die eigene Grundregel sonst gegen die eigene
 * Hover-Regel verlieren würde.
 *
 * Geprüft wird jeweils der Inhalt der Regel, nicht nur ihr Vorhandensein:
 * ein fehlendes `!important` ist genau der Rückfall, den diese Datei fangen
 * soll.
 */

import portfolioStyles from "./styles/portfolio.scss";

/**
 * Der fünffach wiederholte Selektor, den `man-outshine-host` erzeugt.
 *
 * Die Leerstelle vor der Klammer ist offen gehalten: Jest übersetzt das
 * Stylesheet ausgeschrieben, der Build presst es zusammen.
 */
function outshineRule(css: string, className: string): RegExp {
  const selector = `\\.${className.replace(/-/g, "\\-")}`.repeat(5);
  return new RegExp(`${selector}\\s*\\{[^}]*\\}`);
}

/**
 * Der fünffache Selektor, aber mit einer Pseudoklasse davor dem öffnenden
 * `{` — anders als `outshineRule` verlangt dieser Ausdruck den
 * Pseudoklassen-Teil des Selektors ausdrücklich. `outshineRule` selbst
 * träfe hier auch zu, weil `[^}]*` großzügig bis zur ersten `}` liest: das
 * matcht bereits den Grundblock ohne Hover/Fokus und bliebe grün, selbst
 * wenn der `&:hover, &:focus, &:active`-Block verschwände.
 */
function outshinePseudoRule(css: string, className: string, pseudoClass: string): RegExp {
  const selector = `\\.${className.replace(/-/g, "\\-")}`.repeat(5);
  return new RegExp(`${selector}${pseudoClass}[^{]*\\{[^}]*\\}`);
}

/**
 * Der fünffache Selektor mit angehängtem Pseudoelement. `outshineRule` kann
 * diese Regel bauartbedingt nicht treffen, weil sie unmittelbar hinter dem
 * fünften Selektorteil ein `{` verlangt.
 */
function outshineBeforeRule(className: string): RegExp {
  const selector = `\\.${className.replace(/-/g, "\\-")}`.repeat(5);
  return new RegExp(`${selector}::before\\s*\\{[^}]*\\}`);
}

describe("Stylesheet", () => {
  it.each([
    "man-portfolio__tile",
    "man-portfolio__title",
    "man-portfolio__description",
    "man-portfolio__list",
    "man-portfolio__item",
  ])("setzt %s gegen die Regeln der Wirtsseite durch", (className) => {
    expect(portfolioStyles).toMatch(outshineRule(portfolioStyles, className));
  });

  it.each(["man-portfolio__list", "man-portfolio__item"])(
    "raeumt in %s Aussenabstand, Einzug und Aufzaehlungszeichen mit Nachdruck weg",
    (className) => {
      const rule = portfolioStyles.match(outshineRule(portfolioStyles, className))?.[0] ?? "";
      expect(rule).toMatch(/margin:\s*0\s*!important/);
      expect(rule).toMatch(/padding:\s*0\s*!important/);
      expect(rule).toMatch(/list-style:\s*none\s*!important/);
    },
  );

  it("unterdrückt das Markenquadrat, das die Wirtsseite vor jeden Eintrag hängt", () => {
    const rule = portfolioStyles.match(outshineBeforeRule("man-portfolio__item"))?.[0] ?? "";
    expect(rule).toMatch(/content:\s*none\s*!important/);
  });

  it("hält den eigenen Übergang der Kachel gegen die Kurzform der Wirtsseite", () => {
    const rule = portfolioStyles.match(outshineRule(portfolioStyles, "man-portfolio__tile"))?.[0] ?? "";
    expect(rule).toMatch(/transition:\s*border-color[^;]*!important/);
  });

  it("nimmt der Kachel den Unterstrich mit Nachdruck, auch bei Hover und Fokus", () => {
    const rule = portfolioStyles.match(outshinePseudoRule(portfolioStyles, "man-portfolio__tile", ":hover"))?.[0] ?? "";
    expect(rule).toContain("text-decoration: none !important");
  });

  it("setzt die Grundfarben von Titel und Chevron an der Kachel, bevor Hover sie uebersteuert", () => {
    const rule = portfolioStyles.match(/\.man-portfolio__tile\s*\{[^}]*\}/)?.[0] ?? "";
    expect(rule).toMatch(/--man-portfolio-title-color:\s*var\(--man-text,/);
    expect(rule).toMatch(/--man-portfolio-chevron-color:\s*var\(--man-slate,/);
  });

  it("holt die Titelfarbe aus einer eigenen Variable statt aus Spezifität", () => {
    const rule = portfolioStyles.match(outshineRule(portfolioStyles, "man-portfolio__title"))?.[0] ?? "";
    expect(rule).toMatch(/color:\s*var\(--man-portfolio-title-color\)\s*!important/);
  });

  it("setzt beim Überfahren die Hausfarbe über dieselbe Variable statt über die Kachel-Spezifität", () => {
    const hover = portfolioStyles.match(/\.man-portfolio__tile:hover\s*\{[^}]*\}/)?.[0] ?? "";
    expect(hover).toMatch(/--man-portfolio-title-color:\s*var\(--man-red, #e40045\)/);
  });

  it("stellt die Kacheln in ein Raster, dessen Spalten an der Breite der Reihe haengen", () => {
    const rule = portfolioStyles.match(/\.man-portfolio__list\s*\{[^}]*\}/)?.[0] ?? "";
    expect(rule).toMatch(/display:\s*grid/);
    expect(rule).toMatch(/grid-template-columns:\s*repeat\(auto-fill,\s*minmax\(min\(100%,\s*var\(--man-portfolio-column\)\),\s*1fr\)\)/);
    expect(rule).toMatch(/gap:\s*var\(--man-portfolio-gap\)/);
  });

  it.each([
    ["man-portfolio", "280px"],
    ["man-portfolio--compact", "160px"],
    ["man-portfolio--large", "440px"],
  ])("setzt in %s die Mindestbreite der Spalte auf %s", (className, width) => {
    const rule = portfolioStyles.match(new RegExp(`\\.${className}\\s*\\{[^}]*\\}`))?.[0] ?? "";
    expect(rule).toContain(`--man-portfolio-column: ${width}`);
  });

  it("stellt die grosse Bildkachel nach ihrer eigenen Breite um, nicht nach dem Fenster", () => {
    expect(portfolioStyles).toMatch(/\.man-portfolio__item\s*\{[^}]*container-type:\s*inline-size/);
    expect(portfolioStyles).toMatch(
      /@container \(min-width: 420px\)\s*\{\s*\.man-portfolio--large\.man-portfolio--image \.man-portfolio__tile\s*\{[^}]*flex-direction:\s*row/,
    );
  });

  it("passt das Icon ein, statt es zu beschneiden", () => {
    expect(portfolioStyles).toMatch(/\.man-portfolio--icon \.man-portfolio__image\s*\{[^}]*object-fit:\s*contain/);
  });

  it("nimmt gewaehlte Farben ueber eigene Variablen", () => {
    expect(portfolioStyles).toMatch(/\.man-portfolio--filled \.man-portfolio__tile\s*\{[^}]*background:\s*var\(--man-portfolio-bg\)/);
    expect(portfolioStyles).toMatch(
      /\.man-portfolio--inked \.man-portfolio__tile\s*\{[^}]*--man-portfolio-title-color:\s*var\(--man-portfolio-ink\)/,
    );
  });

  it("faerbt den Titel einer gewaehlten Schrift beim Ueberfahren nicht rot", () => {
    const hover = portfolioStyles.match(/\.man-portfolio--inked \.man-portfolio__tile:hover\s*\{[^}]*\}/)?.[0] ?? "";
    expect(hover).toMatch(/--man-portfolio-title-color:\s*var\(--man-portfolio-ink\)/);
  });

  it("haelt die Titelgroesse ueber eine Variable gegen die Wirtsseite", () => {
    const rule = portfolioStyles.match(outshineRule(portfolioStyles, "man-portfolio__title"))?.[0] ?? "";
    expect(rule).toMatch(/font-size:\s*var\(--man-portfolio-title-size\)\s*!important/);
  });
});
