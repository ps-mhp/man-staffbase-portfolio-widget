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

import { setPublicPathFromBundle } from "@shared/public-path";
// Muss vor jedem dynamischen `import()` laufen, damit nachgeladene Teile von
// dem CDN kommen, von dem das Bundle stammt, und nicht von der Wirtsseite.
setPublicPathFromBundle("portfolio-widget.js");

import React from "react";
import ReactDOM from "react-dom/client";

import { BlockFactory, BlockDefinition, ExternalBlockDefinition, BaseBlock } from "widget-sdk";
import { startWidget } from "@shared/dev-mode/start-widget";
import {
  SHOW_CHEVRON_ATTRIBUTE,
  TILES_ATTRIBUTE,
  configurationSchema,
  readShowChevron,
  uiSchema,
} from "./configuration-schema";
import { parsePortfolioTiles } from "./portfolio-tiles";
import { Portfolio } from "./portfolio";
import icon from "../resources/portfolio-widget.svg";
import pkg from "../package.json";

/** Die Attribute des Widgets; gespiegelt im Konfigurationsschema. */
const widgetAttributes: string[] = [TILES_ATTRIBUTE, SHOW_CHEVRON_ATTRIBUTE];

const factory: BlockFactory = (BaseBlockClass, _widgetApi) => {
  /**
   * <portfolio-widget tiles='[{"title":"Lkw","link":"/lkw"}]'></portfolio-widget>
   */
  return class PortfolioWidgetBlock extends BaseBlockClass implements BaseBlock {
    private _root: ReactDOM.Root | null = null;

    public renderBlock(container: HTMLElement): void {
      const attrs = this.parseAttributes<Record<string, unknown>>();

      this._root ??= ReactDOM.createRoot(container);
      this._root.render(
        <Portfolio
          tiles={parsePortfolioTiles(attrs[TILES_ATTRIBUTE])}
          showChevron={readShowChevron(attrs[SHOW_CHEVRON_ATTRIBUTE])}
        />,
      );
    }

    public unmountBlock(_container: HTMLElement): void {
      this._root?.unmount();
      this._root = null;
    }

    public static get observedAttributes(): string[] {
      return widgetAttributes;
    }

    public attributeChangedCallback(...args: [string, string | undefined, string | undefined]): void {
      super.attributeChangedCallback.apply(this, args);
    }
  };
};

const blockDefinition: BlockDefinition = {
  name: "portfolio-widget",
  factory: factory,
  attributes: widgetAttributes,
  blockLevel: "block",
  configurationSchema: configurationSchema,
  uiSchema: uiSchema,
  label: "Portfolio",
  iconUrl: icon,
};

const externalBlockDefinition: ExternalBlockDefinition = {
  blockDefinition,
  author: pkg.author,
  version: pkg.version,
};

/**
 * Meldet den Baustein bei der Wirtsseite an.
 *
 * `startWidget` fragt zuerst, ob ein lokaler Entwicklungsserver dieses Widget
 * ausliefert. In fast jedem Browser lautet die Antwort nein, und es wird
 * sofort angemeldet; auf dem Rechner der Entwicklung uebernimmt das lokale
 * Bundle und meldet an seiner Stelle an. Immer nur eines von beiden — ein
 * Bausteinname laesst sich nicht zweimal belegen.
 *
 * Die Abfrage davor laesst das Modul in Jest laden, wo es keine Wirtsseite
 * gibt: ohne sie braeche schon der blosse Import der Datei jeden Test.
 */
if (typeof window.defineBlock === "function") {
  void startWidget({
    name: "portfolio-widget",
    version: pkg.version,
    register: () => {
      window.defineBlock(externalBlockDefinition);
    },
  });
}
