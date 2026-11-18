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
 * Die Felder älterer Fassungen im Staffbase-Dialog: lesen und ausblenden.
 *
 * `tiles` und `show-chevron` bleiben im Schema, damit der Dialog ihre Werte
 * weiter führt — das Fenster übernimmt sie beim ersten Öffnen als
 * Ausgangsstand, und die Seite liest sie, solange `portfolio-config` sie nicht
 * setzt. Zu sehen sollen sie nicht mehr sein: zwei Wege zum selben Wert laden
 * zu Widersprüchen ein.
 *
 * Gefunden wird jedes Feld über das, was RJSF und der Content Designer gleich
 * vergeben: `id="root_<key>"` am Eingabeelement oder `for="root_<key>"` an
 * seiner Beschriftung. Ausgeblendet wird die ganze Zeile: der größte
 * Vorfahre, der kein anderes Feld enthält.
 *
 * Nur im eigenen Dialog (dem Formular mit `portfolio-config`): Studio lädt
 * alle Widget-Bündel in dasselbe Dokument, und `root_<key>` ist
 * widgetübergreifend.
 */

import { configFieldSelector } from "@shared/config-field-injector";

import { LEGACY_ATTRIBUTES, PORTFOLIO_CONFIG_ATTRIBUTE, SHOW_CHEVRON_ATTRIBUTE, TILES_ATTRIBUTE } from "./configuration-schema";
import type { LegacyPortfolioAttributes } from "./portfolio-config";

const FIELD_MARK = '[id^="root_"], label[for^="root_"]';

const fieldKeyOf = (element: Element): string =>
  element instanceof HTMLLabelElement ? element.htmlFor : element.id;

function rowOf(anchor: Element): HTMLElement {
  const key = fieldKeyOf(anchor);
  let row = anchor as HTMLElement;
  while (row.parentElement !== null && row.parentElement.tagName !== "FORM") {
    const parent = row.parentElement;
    const foreign = Array.from(parent.querySelectorAll(FIELD_MARK)).some((node) => fieldKeyOf(node) !== key);
    if (foreign) break;
    row = parent;
  }
  return row;
}

function anchorOf(root: ParentNode, key: string): Element | null {
  const id = `root_${key}`;
  return root.querySelector(`[id="${id}"]`) ?? root.querySelector(`label[for="${id}"]`);
}

/** Die Formulare, die das eigene Feld führen — nur dort wird gelesen und ausgeblendet. */
function ownForms(root: ParentNode): HTMLFormElement[] {
  const forms = Array.from(root.querySelectorAll(`[id="root_${PORTFOLIO_CONFIG_ATTRIBUTE}"]`)).map((field) =>
    field.closest("form"),
  );
  return Array.from(new Set(forms.filter((form): form is HTMLFormElement => form !== null)));
}

/**
 * Hält die Zeilen der alten Felder verborgen, solange der eigene Dialog sie zeigt.
 * @param root der zu beobachtende Teilbaum; offengelegt für Tests.
 * @returns eine Funktion, die aufhört und die Zeilen wieder zeigt.
 */
export function startHiddenFields(root: ParentNode = document): () => void {
  const hidden = new Set<HTMLElement>();

  const apply = (): void => {
    for (const form of ownForms(root)) {
      for (const key of LEGACY_ATTRIBUTES) {
        const anchor = anchorOf(form, key);
        if (anchor === null) continue;
        const row = rowOf(anchor);
        if (row.style.display !== "none") row.style.display = "none";
        hidden.add(row);
      }
    }
  };

  apply();
  const observer = new MutationObserver(apply);
  const target = root === document ? document.body : (root as Node);
  observer.observe(target, { childList: true, subtree: true });

  return () => {
    observer.disconnect();
    hidden.forEach((row) => {
      row.style.display = "";
    });
    hidden.clear();
  };
}

type FormField = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const isFormField = (element: Element | null | undefined): element is FormField =>
  element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement;

/** Das Element, das den Wert eines Feldes trägt; `null`, wo keines zu finden ist. */
function valueElementOf(form: ParentNode, key: string): FormField | null {
  const element = form.querySelector(configFieldSelector(key));
  if (isFormField(element)) return element;
  const named = form.querySelector(`[name="root_${key}"]`);
  return isFormField(named) ? named : null;
}

/**
 * Die alten Felder, wie der eigene Dialog sie gerade führt; ohne eigenen
 * Dialog leer. Ein Feld, das sich nicht lesen lässt, fehlt im Ergebnis — dann
 * gilt sein Altattribut weiter, statt von einer Vorgabe überschrieben zu werden.
 * Ein Schalter ist lesbar über `checked`, nicht über `value` (das ist dort „on“).
 */
export function readLegacyFromDialog(root: ParentNode = document): LegacyPortfolioAttributes {
  const [form] = ownForms(root);
  if (form === undefined) return {};

  const legacy: LegacyPortfolioAttributes = {};
  const tiles = valueElementOf(form, TILES_ATTRIBUTE);
  if (tiles !== null) legacy.tiles = tiles.value;
  const chevron = valueElementOf(form, SHOW_CHEVRON_ATTRIBUTE);
  if (chevron instanceof HTMLInputElement && chevron.type === "checkbox") {
    legacy["show-chevron"] = chevron.checked;
  }
  return legacy;
}
