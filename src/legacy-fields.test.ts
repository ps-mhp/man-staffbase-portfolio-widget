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

import { readLegacyFromDialog, startHiddenFields } from "./legacy-fields";

const FORM = (extra = ""): string => `
  <form>
    <div id="row-config"><label for="root_portfolio-config">Kacheln und Gestaltung</label><textarea id="root_portfolio-config"></textarea></div>
    <div id="row-tiles"><label for="root_tiles">Kacheln</label><textarea id="root_tiles">[{"title":"A"}]</textarea></div>
    <div id="row-chevron"><label for="root_show-chevron">Pfeil anzeigen</label><input type="checkbox" id="root_show-chevron" checked /></div>
    ${extra}
  </form>`;

const mount = (html: string): HTMLElement => {
  const root = document.createElement("div");
  root.innerHTML = html;
  document.body.appendChild(root);
  return root;
};

afterEach(() => {
  document.body.innerHTML = "";
});

describe("startHiddenFields", () => {
  it("blendet die alten Felder im eigenen Dialog aus, das neue nicht", () => {
    const root = mount(FORM());
    const stop = startHiddenFields(root);
    expect(root.querySelector<HTMLElement>("#row-tiles")?.style.display).toBe("none");
    expect(root.querySelector<HTMLElement>("#row-chevron")?.style.display).toBe("none");
    expect(root.querySelector<HTMLElement>("#row-config")?.style.display).not.toBe("none");
    stop();
    expect(root.querySelector<HTMLElement>("#row-tiles")?.style.display).toBe("");
  });

  it("lässt fremde Dialoge ohne eigenes Feld unberührt", () => {
    const root = mount('<form><div id="row"><label for="root_tiles">Kacheln</label><textarea id="root_tiles"></textarea></div></form>');
    const stop = startHiddenFields(root);
    expect(root.querySelector<HTMLElement>("#row")?.style.display).toBe("");
    stop();
  });
});

describe("readLegacyFromDialog", () => {
  it("liest Kacheln und Schalter", () => {
    const root = mount(FORM());
    expect(readLegacyFromDialog(root)).toEqual({ tiles: '[{"title":"A"}]', "show-chevron": true });
  });

  it("liest einen ausgeschalteten Schalter über checked", () => {
    const root = mount(FORM());
    root.querySelector<HTMLInputElement>("#root_show-chevron")!.checked = false;
    expect(readLegacyFromDialog(root)["show-chevron"]).toBe(false);
  });

  it("lässt den Pfeil weg, wenn das Feld kein Kontrollkästchen ist", () => {
    const root = mount(FORM().replace('type="checkbox"', 'type="text"'));
    expect("show-chevron" in readLegacyFromDialog(root)).toBe(false);
  });

  it("liefert ohne eigenen Dialog nichts", () => {
    expect(readLegacyFromDialog(mount("<form></form>"))).toEqual({});
  });
});
