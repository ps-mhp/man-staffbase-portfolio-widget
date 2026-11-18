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
 * Das Kachel-Fenster im gemeinsamen Rahmen: Übernahme der Altfelder,
 * Ausblenden, Zurückschreiben in `portfolio-config`.
 */

import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import Form from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import { queryInModal, settleModal } from "@shared/ui/config-modal.testing";

import { configurationSchema, uiSchema } from "./configuration-schema";
import { readPortfolioConfig } from "./portfolio-config";
import { tileEditorShell, startTileEditorInjector } from "./tile-editor-injector";

interface FormData {
  "portfolio-config"?: string;
  tiles?: string;
  "show-chevron"?: boolean;
}

async function settleEditor(): Promise<void> {
  for (let round = 0; round < 6 && queryInModal('[data-testid="tile-editor"]') === null; round += 1) {
    await settleModal();
  }
}

async function open(formData?: FormData) {
  const onSubmit = jest.fn();
  const { container } = render(
    <Form schema={configurationSchema} uiSchema={uiSchema} validator={validator} formData={formData} onSubmit={onSubmit} />,
  );
  let stop = (): void => {};
  await act(async () => {
    stop = startTileEditorInjector(container);
  });
  await settleEditor();
  return { container, stop, onSubmit };
}

const submit = async (container: HTMLElement, onSubmit: jest.Mock): Promise<FormData> => {
  await act(async () => {
    container.querySelector<HTMLButtonElement>('button[type="submit"]')!.click();
  });
  await waitFor(() => expect(onSubmit).toHaveBeenCalled());
  return onSubmit.mock.calls[0][0].formData as FormData;
};

const LEGACY_TILES = JSON.stringify([{ title: "Alt", link: "/alt" }]);

describe("tileEditorShell", () => {
  it("benennt das Widget und schaltet die Vorschau frei", () => {
    expect(tileEditorShell).toMatchObject({ widgetName: "Portfolio", title: "Kacheln bearbeiten", preview: true });
  });
});

describe("startTileEditorInjector", () => {
  it("setzt das Fenster an die Stelle von portfolio-config und blendet die alten Felder aus", async () => {
    const { container, stop } = await open({ tiles: LEGACY_TILES, "show-chevron": true });

    expect(container.querySelector<HTMLTextAreaElement>("#root_portfolio-config")!.style.display).toBe("none");
    expect(queryInModal('[data-testid="tile-editor"]')).not.toBeNull();
    const hidden = (selector: string): boolean => {
      for (let node = container.querySelector<HTMLElement>(selector); node !== null && node !== container; node = node.parentElement) {
        if (node.style.display === "none") return true;
      }
      return false;
    };
    expect(hidden("#root_tiles")).toBe(true);
    expect(hidden("#root_show-chevron")).toBe(true);

    await act(async () => stop());
  });

  it("beginnt mit den Kacheln der alten Felder", async () => {
    const { stop } = await open({ tiles: LEGACY_TILES });
    expect(queryInModal('[data-testid="tile-title"]')).toHaveValue("Alt");
    await act(async () => stop());
  });

  it("Öffnen und Übernehmen ohne Änderung schreibt nichts", async () => {
    const { container, stop, onSubmit } = await open({ tiles: LEGACY_TILES, "show-chevron": false });
    await act(async () => {
      queryInModal<HTMLButtonElement>('[data-testid="config-shell-apply"]')!.click();
    });
    const data = await submit(container, onSubmit);
    expect(data["portfolio-config"] ?? "").toBe("");
    expect(data.tiles).toBe(LEGACY_TILES);
    await act(async () => stop());
  });

  it("übernimmt nach einer Änderung die Altwerte und lässt den Pfeil des Altfelds gelten", async () => {
    const { container, stop, onSubmit } = await open({ tiles: LEGACY_TILES, "show-chevron": false });
    await act(async () => {
      fireEvent.change(queryInModal<HTMLInputElement>('[data-testid="tile-title"]')!, { target: { value: "Neu" } });
    });
    await act(async () => {
      queryInModal<HTMLButtonElement>('[data-testid="config-shell-apply"]')!.click();
    });
    const data = await submit(container, onSubmit);

    const written = readPortfolioConfig(data["portfolio-config"] ?? "");
    expect(written?.tiles?.map((tile) => [tile.title, tile.link])).toEqual([["Neu", "/alt"]]);
    expect(written?.showChevron).toBe(false);

    await act(async () => stop());
  });

  it("schreibt den Pfeil nach Umschalten in portfolio-config", async () => {
    const { container, stop, onSubmit } = await open({ tiles: LEGACY_TILES, "show-chevron": true });
    await act(async () => {
      queryInModal<HTMLButtonElement>('[data-testid="tile-chevron"]')!.click();
    });
    await act(async () => {
      queryInModal<HTMLButtonElement>('[data-testid="config-shell-apply"]')!.click();
    });
    const data = await submit(container, onSubmit);
    expect(readPortfolioConfig(data["portfolio-config"] ?? "")?.showChevron).toBe(false);
    await act(async () => stop());
  });

  it("tut nichts und wirft nicht, wenn das Feld nie erscheint", () => {
    expect(() => startTileEditorInjector(document.createElement("div"))).not.toThrow();
  });
});
