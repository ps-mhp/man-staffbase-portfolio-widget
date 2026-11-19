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
 * Die Vorschau des Entwurfs in den Ansichten Desktop, Tablet und Mobil: die
 * echte Leseansicht (`Portfolio`), nicht eine Nachbildung.
 *
 * Die Bühne ist `inert`: kein Klick folgt einem Verweis, kein Tab geht durch
 * Kacheln, die hier nichts bedeuten. Titellose Kacheln lässt der strenge
 * Parser weg — genau wie die Seite.
 *
 * Der Gerätrahmen ist kein iframe, Medienabfragen fragen also das Fenster
 * des Studios. Das Stylesheet kommt ohne sie aus: die Spaltenzahl hängt am
 * Raster der Reihe (`auto-fill`), das Umstellen der großen Kachel an einer
 * Container-Abfrage. Beides misst den Rahmen — Tablet und Mobil zeigen die
 * Spalten der Seite.
 */

import * as React from "react";
import { ReactElement, useMemo } from "react";

import { Portfolio } from "./portfolio";
import { PortfolioConfig, chevronShown, designOf } from "./portfolio-config";
import { parsePortfolioTiles } from "./portfolio-tiles";

export interface TilePreviewProps {
  config: PortfolioConfig;
}

export function TilePreview({ config }: TilePreviewProps): ReactElement {
  const tiles = useMemo(() => parsePortfolioTiles(config.tiles ?? []), [config.tiles]);
  const design = designOf(config);
  return (
    <div inert data-testid="tile-preview" className="p-6">
      {tiles.length === 0 ? (
        <p className="text-sm text-muted-foreground">Noch keine Kachel mit Titel — die Seite zeigt nichts.</p>
      ) : (
        <Portfolio tiles={tiles} showChevron={chevronShown(config)} design={design} />
      )}
    </div>
  );
}
