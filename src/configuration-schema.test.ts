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

import {
  SHOW_CHEVRON_ATTRIBUTE,
  TILES_ATTRIBUTE,
  configurationSchema,
  readShowChevron,
} from "./configuration-schema";

describe("configurationSchema", () => {
  it("fuehrt genau die beiden Attribute des Widgets", () => {
    expect(Object.keys(configurationSchema.properties ?? {})).toEqual([
      TILES_ATTRIBUTE,
      SHOW_CHEVRON_ATTRIBUTE,
    ]);
  });

  it("gibt dem Kachelfeld ein leeres Array als Vorgabe", () => {
    const tiles = (configurationSchema.properties ?? {})[TILES_ATTRIBUTE];
    expect(tiles).toMatchObject({ type: "string", default: "[]" });
  });
});

describe("readShowChevron", () => {
  it("steht an, solange niemand ausdruecklich abschaltet", () => {
    expect(readShowChevron(undefined)).toBe(true);
    expect(readShowChevron(null)).toBe(true);
    expect(readShowChevron("")).toBe(true);
    expect(readShowChevron(true)).toBe(true);
    expect(readShowChevron("true")).toBe(true);
  });

  it("liest ein echtes Aus aus Wahrheitswert und Zeichenkette", () => {
    expect(readShowChevron(false)).toBe(false);
    expect(readShowChevron("false")).toBe(false);
  });
});
