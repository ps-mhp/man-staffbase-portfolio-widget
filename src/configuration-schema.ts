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

import { UiSchema } from "@rjsf/utils";
import { JSONSchema7 } from "json-schema";

export const TILES_ATTRIBUTE = "tiles";
export const SHOW_CHEVRON_ATTRIBUTE = "show-chevron";

/**
 * Das Schema des Konfigurationsdialogs.
 *
 * `tiles` steht als gewoehnliches Textfeld, obwohl es niemand gern von Hand
 * ausfuellt: Staffbase rendert den Dialog selbst und kennt nur die Feldtypen
 * von RJSF. An seine Stelle setzt `tile-editor-injector.ts` den eigenen
 * Kachel-Editor — eine Zeile je Kachel statt JSON-Rohtext. Das Datenformat
 * bleibt dabei unveraendert: der Editor liest und schreibt dieselbe Liste.
 * Erscheint er einmal nicht, bleibt das Textfeld als Rueckfallweg stehen.
 *
 * @see https://rjsf-team.github.io/react-jsonschema-form/docs/
 */
export const configurationSchema: JSONSchema7 = {
  properties: {
    [TILES_ATTRIBUTE]: {
      type: "string",
      title: "Kacheln",
      default: "[]",
    },
    [SHOW_CHEVRON_ATTRIBUTE]: {
      type: "boolean",
      title: "Pfeil anzeigen",
      default: true,
    },
  },
};

/**
 * @see https://rjsf-team.github.io/react-jsonschema-form/docs/api-reference/uiSchema
 */
export const uiSchema: UiSchema = {
  [TILES_ATTRIBUTE]: {
    "ui:widget": "textarea",
    "ui:help":
      "Normalerweise steht hier der Kachel-Editor. Erscheint er nicht, " +
      "lassen sich die Kacheln als JSON-Liste pflegen. Je Kachel sind " +
      "möglich: title (Pflicht), description, badge, image, imageAlt, " +
      'link, newTab. Beispiel: [{"title":"Lkw","image":"…","link":"…"}]',
  },
  [SHOW_CHEVRON_ATTRIBUTE]: {
    "ui:help":
      "Der Pfeil rechts oben auf jeder verlinkten Kachel. Er zeigt an, " +
      "dass die ganze Kachel anklickbar ist.",
  },
};

/**
 * Der Pfeil steht, solange ihn niemand ausdruecklich abschaltet. Staffbase
 * liefert Wahrheitswerte je nach Weg als `boolean` oder als Zeichenkette;
 * nur ein echtes „aus“ zaehlt, damit ein fehlendes Attribut die Vorgabe
 * nicht kippt.
 */
export function readShowChevron(raw: unknown): boolean {
  return !(raw === false || raw === "false");
}
