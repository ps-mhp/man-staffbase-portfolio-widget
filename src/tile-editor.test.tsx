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
 * Prüfungen des Kachel-Editors.
 *
 * Der Editor schreibt nichts selbst zurück — er meldet jede Änderung über
 * `onChange`. Geprüft wird deshalb durchweg, welcher Stand dort ankommt.
 */

import * as React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MediaClient } from "@shared/media/media-client";

import { PortfolioTile } from "./portfolio-tiles";
import { EditorConfig, TileEditor, altFromPick } from "./tile-editor";

const stubMediaClient = (): MediaClient =>
  ({
    listMedia: jest.fn(async () => ({ items: [], total: 0, nextOffset: null })),
    searchMedia: jest.fn(async () => ({ items: [], nextCursor: null })),
    uploadMedia: jest.fn(),
    ensurePublicImageUrl: jest.fn(),
    currentUserId: jest.fn(async () => null),
  }) as unknown as MediaClient;

const tile = (id: string, extra: Partial<PortfolioTile> = {}): PortfolioTile => ({
  id,
  title: `Kachel ${id}`,
  newTab: false,
  ...extra,
});

function setup(initial: EditorConfig) {
  const onChange = jest.fn<void, [EditorConfig]>();
  function Harness(): React.ReactElement {
    const [value, setValue] = React.useState(initial);
    return (
      <TileEditor
        value={value}
        onChange={(next) => {
          onChange(next);
          setValue(next);
        }}
        mediaClient={stubMediaClient()}
      />
    );
  }
  render(<Harness />);
  return { onChange, latest: () => onChange.mock.calls[onChange.mock.calls.length - 1]![0] };
}

const three = (): EditorConfig => ({ tiles: [tile("a"), tile("b"), tile("c")] });

describe("altFromPick", () => {
  it("übernimmt nur einen echten Alternativtext", () => {
    expect(altFromPick(undefined, { alt: "Ein Lkw", fileName: "lkw.png" })).toBe("Ein Lkw");
    expect(altFromPick(undefined, { alt: "lkw.png", fileName: "lkw.png" })).toBeUndefined();
    expect(altFromPick(undefined, { alt: "", fileName: "lkw.png" })).toBeUndefined();
  });
  it("überschreibt nie einen vorhandenen Text, auch keinen leeren", () => {
    expect(altFromPick("", { alt: "Ein Lkw", fileName: "lkw.png" })).toBeUndefined();
    expect(altFromPick("Eigener", { alt: "Ein Lkw", fileName: "lkw.png" })).toBeUndefined();
  });
});

describe("TileEditor: Liste", () => {
  it("zeigt eine Zeile je Kachel und die Anzahl", () => {
    setup(three());
    const list = screen.getByRole("grid", { name: "Kacheln" });
    expect(within(list).getAllByRole("row")).toHaveLength(3);
    expect(screen.getByText("(3)")).toBeInTheDocument();
  });

  it("zeigt den Kopf der gewählten Kachel", () => {
    setup(three());
    expect(screen.getByRole("heading", { name: "Kachel 1 von 3" })).toBeInTheDocument();
    expect(screen.getByTestId("tile-title")).toHaveValue("Kachel a");
  });

  it("wechselt die Auswahl per Klick", () => {
    setup(three());
    fireEvent.click(screen.getByRole("row", { name: "Kachel b" }));
    expect(screen.getByRole("heading", { name: "Kachel 2 von 3" })).toBeInTheDocument();
  });

  it("legt eine neue Kachel ans Ende und wählt sie", () => {
    const { latest } = setup(three());
    fireEvent.click(screen.getByRole("button", { name: /Neue Kachel/ }));
    expect(latest().tiles).toHaveLength(4);
    expect(latest().tiles[3]).toMatchObject({ title: "", newTab: false });
    expect(screen.getByRole("heading", { name: "Kachel 4 von 4" })).toBeInTheDocument();
  });

  it("nennt eine titellose Kachel „Ohne Titel“, ohne sie zu verlieren", () => {
    setup({ tiles: [tile("a", { title: "" })] });
    expect(screen.getAllByText("Ohne Titel").length).toBeGreaterThan(0);
    expect(screen.getByText("Ohne Titel erscheint die Kachel nicht.")).toBeInTheDocument();
  });

  it("zeigt bei leerer Liste den Hinweis", () => {
    setup({ tiles: [] });
    expect(screen.getByText(/Noch keine Kachel/)).toBeInTheDocument();
    expect(screen.getByText(/Wähle links eine Kachel/)).toBeInTheDocument();
  });
});

describe("TileEditor: Aktionen", () => {
  it("verschiebt die gewählte Kachel nach unten und nach oben", () => {
    const { latest } = setup(three());
    fireEvent.click(screen.getByRole("button", { name: "Kachel nach unten" }));
    expect(latest().tiles.map((t) => t.id)).toEqual(["b", "a", "c"]);
    expect(screen.getByRole("heading", { name: "Kachel 2 von 3" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Kachel nach oben" }));
    expect(latest().tiles.map((t) => t.id)).toEqual(["a", "b", "c"]);
  });

  it("dupliziert die Kachel hinter dem Original", () => {
    const { latest } = setup(three());
    fireEvent.click(screen.getByRole("button", { name: "Kachel duplizieren" }));
    expect(latest().tiles).toHaveLength(4);
    expect(latest().tiles[1]).toMatchObject({ title: "Kachel a" });
    expect(latest().tiles[1]!.id).not.toBe("a");
  });

  it("löscht die Kachel und wählt die vorige", () => {
    const { latest } = setup(three());
    fireEvent.click(screen.getByRole("row", { name: "Kachel b" }));
    fireEvent.click(screen.getByRole("button", { name: "Kachel löschen" }));
    expect(latest().tiles.map((t) => t.id)).toEqual(["a", "c"]);
    expect(screen.getByRole("heading", { name: "Kachel 1 von 2" })).toBeInTheDocument();
  });
});

describe("TileEditor: Felder", () => {
  it("schreibt Titel und Link und lässt Leeres wegfallen", () => {
    const { latest } = setup({ tiles: [tile("a", { link: "/x" })] });
    fireEvent.change(screen.getByTestId("tile-title"), { target: { value: "Neu" } });
    expect(latest().tiles[0]!.title).toBe("Neu");
    fireEvent.change(screen.getByTestId("tile-link"), { target: { value: "" } });
    expect(latest().tiles[0]!.link).toBeUndefined();
  });

  it("schreibt Etikett, Beschreibung, Alternativtext und neuen Tab", () => {
    const { latest } = setup({ tiles: [tile("a")] });
    fireEvent.change(screen.getByTestId("tile-badge"), { target: { value: "Neu" } });
    fireEvent.change(screen.getByTestId("tile-description"), { target: { value: "Text" } });
    fireEvent.change(screen.getByTestId("tile-image-alt"), { target: { value: "Ein Bild" } });
    fireEvent.click(screen.getByRole("switch", { name: "In neuem Tab öffnen" }));
    expect(latest().tiles[0]).toMatchObject({ badge: "Neu", description: "Text", imageAlt: "Ein Bild", newTab: true });
  });

  it("klappt „Mehr“ zu und wieder auf", () => {
    setup({ tiles: [tile("a")] });
    const toggle = screen.getByRole("button", { name: "Mehr" });
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});

describe("TileEditor: Bild", () => {
  it("zeigt ohne Bild „Noch kein Bild“ und bietet Mediathek und Adresse an", () => {
    setup({ tiles: [tile("a")] });
    expect(screen.getByTestId("tile-image-empty")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Aus Mediathek wählen" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Adresse einfügen" })).toBeInTheDocument();
  });

  it("übernimmt eine https-Adresse und lehnt eine ungültige ab", () => {
    const { latest } = setup({ tiles: [tile("a")] });
    fireEvent.click(screen.getByRole("button", { name: "Adresse einfügen" }));
    const input = screen.getByTestId("tile-image-url");
    fireEvent.change(input, { target: { value: "ftp://x" } });
    fireEvent.blur(input);
    expect(screen.getByRole("alert")).toHaveTextContent(/https-Adresse/);
    fireEvent.change(input, { target: { value: "https://example.test/lkw.png" } });
    fireEvent.blur(input);
    expect(latest().tiles[0]!.image).toBe("https://example.test/lkw.png");
  });

  it("zeigt Dateiname und entfernt Bild samt Alternativtext", () => {
    const { latest } = setup({ tiles: [tile("a", { image: "https://example.test/ordner/lkw%20eins.png?x=1", imageAlt: "Lkw" })] });
    expect(screen.getByTestId("tile-image-name")).toHaveTextContent("lkw eins.png");
    fireEvent.click(screen.getByRole("button", { name: "Bild entfernen" }));
    expect(latest().tiles[0]!.image).toBeUndefined();
    expect(latest().tiles[0]!.imageAlt).toBeUndefined();
  });
});

describe("TileEditor: Gestaltung", () => {
  it("zeigt den Pfeil als an, solange er ungesetzt ist, und schaltet ihn aus", () => {
    const { latest } = setup(three());
    const toggle = screen.getByRole("switch", { name: "Pfeil anzeigen" });
    expect(toggle).toHaveAttribute("aria-checked", "true");
    fireEvent.click(toggle);
    expect(latest().showChevron).toBe(false);
    expect(latest().tiles).toHaveLength(3);
  });

  it("sagt, dass die Gestaltung für die ganze Reihe gilt", () => {
    setup(three());
    expect(screen.getByText("Gilt für alle Kacheln der Reihe.")).toBeInTheDocument();
  });

  it("wechselt zum Icon-Kasten und nennt das Bild dann Icon", () => {
    const { latest } = setup(three());
    expect(screen.getByTestId("portfolio-variant-image")).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByTestId("portfolio-variant-icon"));
    expect(latest().variant).toBe("icon");
    expect(latest().tiles).toHaveLength(3);
    expect(screen.getByTestId("portfolio-variant-icon")).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { name: "Icon" })).toBeInTheDocument();
    expect(screen.getByText(/wird eingepasst, nicht beschnitten/)).toBeInTheDocument();
  });

  it("wählt die Größe über die Pills", async () => {
    const { latest } = setup(three());
    expect(screen.getByRole("radio", { name: "Normal" })).toHaveAttribute("aria-checked", "true");
    await userEvent.click(screen.getByRole("radio", { name: "Groß" }));
    expect(latest().size).toBe("large");
    expect(screen.getByText(/Bild links und Text rechts/)).toBeInTheDocument();
  });

  it("setzt die Fläche aus der Palette und nimmt sie mit „Standard“ wieder heraus", () => {
    const { latest } = setup(three());
    const background = within(screen.getByTestId("portfolio-background"));
    fireEvent.click(background.getByRole("radio", { name: "Anthrazit (#303C49)" }));
    expect(latest().background).toBe("#303C49");
    fireEvent.click(background.getByRole("radio", { name: "Standard" }));
    expect(latest()).not.toHaveProperty("background");
  });

  it("übernimmt eine eigene Schriftfarbe erst, wenn sie lesbar ist", () => {
    const { latest, onChange } = setup(three());
    const input = screen.getByTestId("portfolio-text-color-hex");
    fireEvent.change(input, { target: { value: "#12" } });
    fireEvent.blur(input);
    expect(screen.getByRole("alert")).toHaveTextContent(/#RRGGBB/);
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.change(input, { target: { value: "1e2832" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(latest().textColor).toBe("#1E2832");    expect(screen.getByTestId("portfolio-text-color-hex")).toBe(input);
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.blur(input);
    expect(latest()).not.toHaveProperty("textColor");
  });

  it("warnt, wenn die Schrift auf der Fläche schwer lesbar ist", () => {
    setup({ tiles: [tile("a")], background: "#FFFFFF" });
    expect(screen.queryByTestId("portfolio-contrast")).toBeNull();
    const text = within(screen.getByTestId("portfolio-text-color"));
    fireEvent.click(text.getByRole("radio", { name: "Hellgrau (#F0F0F0)" }));
    expect(screen.getByTestId("portfolio-contrast")).toHaveTextContent(/Kontrast 1,1 : 1/);
  });
});
