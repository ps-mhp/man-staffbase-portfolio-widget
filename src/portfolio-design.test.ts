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
  DARK_INK,
  ICON_BACKGROUND,
  LIGHT_INK,
  contrast,
  inkFor,
  readColor,
  readSize,
  readVariant,
  tileColors,
} from "./portfolio-design";

describe("readVariant / readSize", () => {
  it("kennen nur die eigenen Namen", () => {
    expect(readVariant("icon")).toBe("icon");
    expect(readVariant("image")).toBe("image");
    expect(readVariant("Icon")).toBeUndefined();
    expect(readVariant(undefined)).toBeUndefined();
    expect(readSize("compact")).toBe("compact");
    expect(readSize("large")).toBe("large");
    expect(readSize("big")).toBeUndefined();
    expect(readSize(3)).toBeUndefined();
  });
});

describe("readColor", () => {
  it("vereinheitlicht auf #RRGGBB in Großbuchstaben", () => {
    expect(readColor("#e40045")).toBe("#E40045");
    expect(readColor("e40045")).toBe("#E40045");
    expect(readColor(" #fff ")).toBe("#FFFFFF");
    expect(readColor("#1a2")).toBe("#11AA22");
  });

  it("verwirft alles andere — auch, was als CSS ginge", () => {
    expect(readColor("red")).toBeUndefined();
    expect(readColor("rgb(0,0,0)")).toBeUndefined();
    expect(readColor("#e40045; position: fixed")).toBeUndefined();
    expect(readColor("#12345")).toBeUndefined();
    expect(readColor(0xffffff)).toBeUndefined();
    expect(readColor(undefined)).toBeUndefined();
  });
});

describe("contrast / inkFor", () => {
  it("rechnet nach WCAG", () => {
    expect(contrast("#000000", "#FFFFFF")).toBeCloseTo(21, 5);
    expect(contrast("#FFFFFF", "#FFFFFF")).toBeCloseTo(1, 5);
    expect(contrast("#E40045", "#FFFFFF")).toBeGreaterThan(4.5);
  });

  it("wählt Weiß auf Dunklem und Rot, Dunkel auf Hellem", () => {
    expect(inkFor("#E40045")).toBe(LIGHT_INK);
    expect(inkFor("#303C49")).toBe(LIGHT_INK);
    expect(inkFor("#FFFFFF")).toBe(DARK_INK);
    expect(inkFor("#FDE2E8")).toBe(DARK_INK);
  });
});

describe("tileColors", () => {
  it("lässt die Bildkachel ohne gewählte Farben dem Stylesheet", () => {
    expect(tileColors({ variant: "image", size: "normal" })).toEqual({});
  });

  it("gibt dem Icon-Kasten Rot mit lesbarer Schrift vor", () => {
    expect(tileColors({ variant: "icon", size: "compact" })).toEqual({ background: ICON_BACKGROUND, ink: LIGHT_INK });
  });

  it("wählt zur gewählten Fläche die Schrift selbst", () => {
    expect(tileColors({ variant: "image", size: "normal", background: "#F0F0F0" })).toEqual({
      background: "#F0F0F0",
      ink: DARK_INK,
    });
  });

  it("lässt eine gewählte Schrift stehen, auch ohne gewählte Fläche", () => {
    expect(tileColors({ variant: "icon", size: "normal", textColor: "#1E2832" })).toEqual({
      background: ICON_BACKGROUND,
      ink: "#1E2832",
    });
    expect(tileColors({ variant: "image", size: "normal", textColor: "#E40045" })).toEqual({ ink: "#E40045" });
  });
});
