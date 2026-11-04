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
 * Was sich prüfen lässt, ist die Abwehr selbst: dass Kachel, Titel und
 * Beschreibung ihre Regeln mit erhöhter Spezifität durchsetzen und dass der
 * Hover-Farbwechsel über eine eigene CSS-Variable läuft statt über ein
 * Spezifitäts-Wettrüsten, das die eigene Grundregel sonst gegen die eigene
 * Hover-Regel verlieren würde.
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

describe("Stylesheet", () => {
  it.each(["man-portfolio__tile", "man-portfolio__title", "man-portfolio__description"])(
    "setzt %s gegen die Regeln der Wirtsseite durch",
    (className) => {
      expect(portfolioStyles).toMatch(outshineRule(portfolioStyles, className));
    },
  );

  it("nimmt der Kachel den Unterstrich mit Nachdruck, auch bei Hover und Fokus", () => {
    const rule = portfolioStyles.match(outshineRule(portfolioStyles, "man-portfolio__tile"))?.[0] ?? "";
    expect(rule).toContain("text-decoration: none !important");
  });

  it("holt die Titelfarbe aus einer eigenen Variable statt aus Spezifität", () => {
    const rule = portfolioStyles.match(outshineRule(portfolioStyles, "man-portfolio__title"))?.[0] ?? "";
    expect(rule).toMatch(/color:\s*var\(--man-portfolio-title-color\)\s*!important/);
  });

  it("setzt beim Überfahren die Hausfarbe über dieselbe Variable statt über die Kachel-Spezifität", () => {
    const hover = portfolioStyles.match(/\.man-portfolio__tile:hover\s*\{[^}]*\}/)?.[0] ?? "";
    expect(hover).toMatch(/--man-portfolio-title-color:\s*var\(--man-red, #e40045\)/);
  });
});
