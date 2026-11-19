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

import React from "react";

import { useHotStyle } from "@shared/hot-style";
import { DEFAULT_DESIGN, PortfolioDesign, tileColors } from "./portfolio-design";
import { PortfolioTile } from "./portfolio-tiles";
import portfolioCss from "./styles/portfolio.scss";

export interface PortfolioProps {
  tiles: PortfolioTile[];
  /** Der Chevron steht am Widget, nicht an der Kachel: eine Reihe mit mal Pfeil und mal keinem liest sich als Fehler. */
  showChevron: boolean;
  /** Darstellung, Größe und Farben der ganzen Reihe; ohne sie die Bildkachel in Normalgröße. */
  design?: PortfolioDesign;
}

/** Die eigenen Eigenschaften, die das Stylesheet liest; React setzt sie per `setProperty`. */
type DesignStyle = React.CSSProperties & {
  "--man-portfolio-bg"?: string;
  "--man-portfolio-ink"?: string;
};

/**
 * Klassen und Farben der Reihe. Die Farben laufen über eigene Variablen statt
 * über `background`/`color` je Kachel: eine fremde `!important`-Regel der
 * Wirtsseite trifft Eigenschaften, keine Custom Properties.
 */
function designAttributes(design: PortfolioDesign): { className: string; style: DesignStyle } {
  const { background, ink } = tileColors(design);
  const classes = [
    "man-portfolio",
    `man-portfolio--${design.variant}`,
    `man-portfolio--${design.size}`,
    ...(background === undefined ? [] : ["man-portfolio--filled"]),
    ...(ink === undefined ? [] : ["man-portfolio--inked"]),
  ];
  const style: DesignStyle = {
    ...(background === undefined ? {} : { "--man-portfolio-bg": background }),
    ...(ink === undefined ? {} : { "--man-portfolio-ink": ink }),
  };
  return { className: classes.join(" "), style };
}

/**
 * Eingebettet statt aus der Icon-Schrift: so traegt das Bundle das Zeichen
 * selbst und haengt nicht an der Schriftauslieferung der Instanz.
 */
const Chevron = (): React.ReactElement => (
  <svg
    className="man-portfolio__chevron"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M9 5l7 7-7 7" />
  </svg>
);

function Tile({ tile, showChevron }: { tile: PortfolioTile; showChevron: boolean }): React.ReactElement {
  const chevron = tile.link !== undefined && showChevron;
  const body = (
    <>
      {tile.image !== undefined && (
        <div className="man-portfolio__media">
          <img className="man-portfolio__image" src={tile.image} alt={tile.imageAlt ?? ""} loading="lazy" />
        </div>
      )}
      {/* Rechts Platz für den Pfeil nur, wo einer steht — kompakte Kacheln sind schmal. */}
      <div className={chevron ? "man-portfolio__body man-portfolio__body--chevron" : "man-portfolio__body"}>
        {tile.badge !== undefined && <span className="man-portfolio__badge">{tile.badge}</span>}
        <h3 className="man-portfolio__title">{tile.title}</h3>
        {tile.description !== undefined && (
          <p className="man-portfolio__description">{tile.description}</p>
        )}
        {chevron && <Chevron />}
      </div>
    </>
  );

  // Ohne Ziel ist die Kachel kein Verweis: ein `a` ohne `href` nimmt weder
  // Fokus noch Rolle und waere fuer Screenreader nur irrefuehrend.
  if (tile.link === undefined) {
    return <div className="man-portfolio__tile">{body}</div>;
  }

  return (
    <a
      className="man-portfolio__tile"
      href={tile.link}
      {...(tile.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {body}
    </a>
  );
}

/**
 * Die Kachelreihe. Ohne Kacheln gibt sie nichts aus — eine leere Umrandung
 * auf der Seite waere schlimmer als gar nichts.
 */
export function Portfolio({ tiles, showChevron, design = DEFAULT_DESIGN }: PortfolioProps): React.ReactElement | null {
  const liveCss = useHotStyle(portfolioCss, "portfolio-widget", "styles/portfolio.scss");

  if (tiles.length === 0) return null;

  const { className, style } = designAttributes(design);
  return (
    <div className={className} style={style}>
      <style>{liveCss}</style>
      <ul className="man-portfolio__list">
        {tiles.map((tile) => (
          <li className="man-portfolio__item" key={tile.id}>
            <Tile tile={tile} showChevron={showChevron} />
          </li>
        ))}
      </ul>
    </div>
  );
}
