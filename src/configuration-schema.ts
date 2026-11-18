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

/** Die ganze Konfiguration in einem Feld — siehe `portfolio-config.ts`. */
export const PORTFOLIO_CONFIG_ATTRIBUTE = "portfolio-config";
export const TILES_ATTRIBUTE = "tiles";
export const SHOW_CHEVRON_ATTRIBUTE = "show-chevron";

/**
 * Die einzelnen Felder bis 0.1.0-rc.3. Sie stehen weiter im Schema, damit der
 * Dialog ihre Werte führt; im eigenen Dialog sind sie nicht mehr zu sehen
 * (`@shared/legacy-fields`).
 */
export const LEGACY_ATTRIBUTES = [TILES_ATTRIBUTE, SHOW_CHEVRON_ATTRIBUTE] as const;

/**
 * Das Schema des Konfigurationsdialogs.
 *
 * Zu sehen ist nur `portfolio-config`: an seine Stelle setzt
 * `tile-editor-injector.ts` das Vollbild-Fenster „Kacheln bearbeiten“, in dem
 * Kacheln und Pfeil gepflegt werden. Erscheint es einmal nicht, bleibt das
 * Textfeld als Rückfallweg (die Rohfassung ist Base64). `tiles` und
 * `show-chevron` sind die Felder bis 0.1.0-rc.3.
 *
 * @see https://rjsf-team.github.io/react-jsonschema-form/docs/
 */
export const configurationSchema: JSONSchema7 = {
  properties: {
    [PORTFOLIO_CONFIG_ATTRIBUTE]: {
      type: "string",
      title: "Kacheln und Gestaltung",
      default: "",
    },
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

/** Alle Attribute, in der Reihenfolge des Schemas. */
export const ALL_ATTRIBUTES: string[] = Object.keys(configurationSchema.properties ?? {});

/**
 * @see https://rjsf-team.github.io/react-jsonschema-form/docs/api-reference/uiSchema
 */
export const uiSchema: UiSchema = {
  [PORTFOLIO_CONFIG_ATTRIBUTE]: {
    "ui:widget": "textarea",
    "ui:help":
      "Kacheln und Pfeil werden im Fenster „Kacheln bearbeiten“ gepflegt; " +
      "das Textfeld dahinter ist die Rohfassung.",
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
