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
 * Pruefungen des Kachel-Editors.
 *
 * Der Editor schreibt nichts selbst zurueck — er meldet jede Aenderung ueber
 * `onChange`. Geprueft wird deshalb durchweg, welche Kachelliste dort
 * ankommt.
 */

import * as React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MediaClient, MediaItem } from "@shared/media/media-client";
import { PortfolioTile } from "./portfolio-tiles";
import { TileEditor } from "./tile-editor";

const mediaItem = (id: string): MediaItem => ({
  id,
  url: `https://cdn.example.test/${id}.png`,
  previewUrl: `https://cdn.example.test/${id}-preview.png`,
  fileName: `${id}.png`,
  type: "image",
  width: 1920,
  height: 1080,
});

/** Ein Media-Client, der nur das kann, was der Editor von ihm verlangt. */
const stubMediaClient = (): MediaClient =>
  ({
    listMedia: jest.fn(async () => ({ items: [mediaItem("a")], total: 1, nextOffset: null })),
    searchMedia: jest.fn(async () => ({ items: [], nextCursor: null })),
    uploadMedia: jest.fn(async () => mediaItem("up")),
    ensurePublicImageUrl: jest.fn(async (m: MediaItem) => m.url),
    currentUserId: jest.fn(async () => null),
  }) as unknown as MediaClient;

const tile = (id: string, extra: Partial<PortfolioTile> = {}): PortfolioTile => ({
  id,
  title: `Kachel ${id}`,
  newTab: false,
  ...extra,
});

interface Harness {
  onChange: jest.Mock<void, [PortfolioTile[]]>;
  onSave: jest.Mock;
  onClose: jest.Mock;
  /** Die Kachelliste des juengsten `onChange`. */
  latest: () => PortfolioTile[];
}

/**
 * Rendert den Editor. `controlled` gibt die gemeldete Liste als neuen Wert
 * zurueck in den Editor — das braucht alles, was mehrere Schritte
 * aufeinander aufbaut, allen voran das Ziehen.
 */
const setup = (value: PortfolioTile[], options: { dirty?: boolean; controlled?: boolean } = {}): Harness => {
  const onChange = jest.fn<void, [PortfolioTile[]]>();
  const onSave = jest.fn();
  const onClose = jest.fn();

  function Harnessed(): React.ReactElement {
    const [tiles, setTiles] = React.useState(value);
    return (
      <TileEditor
        value={options.controlled === true ? tiles : value}
        onChange={(next) => {
          onChange(next);
          setTiles(next);
        }}
        onSave={onSave}
        onClose={onClose}
        dirty={options.dirty ?? false}
        mediaClient={stubMediaClient()}
      />
    );
  }

  render(<Harnessed />);

  return {
    onChange,
    onSave,
    onClose,
    latest: () => onChange.mock.calls[onChange.mock.calls.length - 1]![0],
  };
};

/** Die Reihenfolge der Kacheln, wie sie gerade im Dokument steht. */
const orderInDom = (): string[] =>
  Array.from(screen.getByTestId("tile-list").children).map((row) =>
    (row.getAttribute("data-testid") ?? "").replace("tile-row-", ""),
  );

const ROW_HEIGHT = 100;

/**
 * jsdom misst nichts: `getBoundingClientRect` liefert ueberall Nullen, und
 * das Ziehen verglich lauter Mitten bei 0. Hier bekommt jede Zeile eine
 * Hoehe von 100 px, gestapelt in ihrer Reihenfolge im Dokument — erst damit
 * prueft der Test die Umordnung und nicht nur, dass nichts wirft.
 */
const stubRowGeometry = (): jest.SpyInstance => {
  const original = Element.prototype.getBoundingClientRect;
  return jest
    .spyOn(Element.prototype, "getBoundingClientRect")
    .mockImplementation(function (this: Element): DOMRect {
      const row = this.classList.contains("man-pe__row") ? this : null;
      if (row === null || row.parentElement === null) return original.call(this);

      const index = Array.from(row.parentElement.children).indexOf(row);
      const top = index * ROW_HEIGHT;
      return {
        x: 0,
        y: top,
        top,
        bottom: top + ROW_HEIGHT,
        left: 0,
        right: 200,
        width: 200,
        height: ROW_HEIGHT,
        toJSON: () => ({}),
      } as DOMRect;
    });
};

/** Die Mitte der Zeile an Stelle `index` in der gestapelten Ersatzgeometrie. */
const middleOf = (index: number): number => index * ROW_HEIGHT + ROW_HEIGHT / 2;

describe("TileEditor", () => {
  describe("Zeilenliste", () => {
    it("zeigt je Kachel eine Zeile mit Titel und Link", () => {
      setup([tile("a", { link: "/lkw" }), tile("b")]);

      expect(orderInDom()).toEqual(["a", "b"]);
      expect(screen.getByTestId("tile-title-a")).toHaveValue("Kachel a");
      expect(screen.getByTestId("tile-link-a")).toHaveValue("/lkw");
      expect(screen.getByTestId("tile-link-b")).toHaveValue("");
    });

    it("erklaert die leere Liste", () => {
      setup([]);
      expect(screen.getByText(/Noch keine Kachel/i)).toBeInTheDocument();
    });

    it("haengt eine Kachel mit frischer Kennung an", () => {
      const h = setup([tile("a")]);
      fireEvent.click(screen.getByTestId("tile-add"));

      const tiles = h.latest();
      expect(tiles).toHaveLength(2);
      expect(tiles[1]!.title).toBe("");
      expect(tiles[1]!.id).not.toBe("a");
      expect(tiles[1]!.id).not.toBe("");
    });

    it("entfernt mit dem Papierkorb genau diese Kachel", () => {
      const h = setup([tile("a"), tile("b"), tile("c")]);
      fireEvent.click(screen.getByTestId("tile-remove-b"));

      expect(h.latest().map((entry) => entry.id)).toEqual(["a", "c"]);
    });

    it("uebernimmt Titel und Link in die Liste", () => {
      const h = setup([tile("a")]);
      fireEvent.change(screen.getByTestId("tile-title-a"), { target: { value: "Lkw" } });
      expect(h.latest()[0]!.title).toBe("Lkw");

      fireEvent.change(screen.getByTestId("tile-link-a"), { target: { value: "/lkw" } });
      expect(h.latest()[0]!.link).toBe("/lkw");
    });

    it("weist auf eine Kachel ohne Titel hin, ohne sie zu verstecken", () => {
      setup([tile("a", { title: "" }), tile("b")]);

      expect(screen.getByTestId("tile-untitled-a")).toHaveTextContent(
        "Ohne Titel wird diese Kachel nicht angezeigt",
      );
      expect(screen.queryByTestId("tile-untitled-b")).not.toBeInTheDocument();
      expect(orderInDom()).toEqual(["a", "b"]);
    });
  });

  describe("Aufklapper", () => {
    it("zeigt die Zusatzfelder erst auf Wunsch", () => {
      setup([tile("a")]);
      expect(screen.queryByTestId("tile-badge-a")).not.toBeInTheDocument();

      fireEvent.click(screen.getByTestId("tile-more-a"));

      expect(screen.getByTestId("tile-badge-a")).toBeInTheDocument();
      expect(screen.getByTestId("tile-description-a")).toBeInTheDocument();
      expect(screen.getByTestId("tile-image-alt-a")).toBeInTheDocument();
      expect(screen.getByTestId("tile-newtab-a")).toBeInTheDocument();
      expect(screen.getByTestId("tile-more-a")).toHaveTextContent("Weniger");
    });

    it("meldet Aenderungen der Zusatzfelder", () => {
      const h = setup([tile("a")]);
      fireEvent.click(screen.getByTestId("tile-more-a"));

      fireEvent.change(screen.getByTestId("tile-badge-a"), { target: { value: "Fahrzeuge" } });
      expect(h.latest()[0]!.badge).toBe("Fahrzeuge");

      fireEvent.change(screen.getByTestId("tile-description-a"), { target: { value: "Schwer" } });
      expect(h.latest()[0]!.description).toBe("Schwer");

      fireEvent.change(screen.getByTestId("tile-image-alt-a"), { target: { value: "Ein Lkw" } });
      expect(h.latest()[0]!.imageAlt).toBe("Ein Lkw");

      fireEvent.click(screen.getByTestId("tile-newtab-a"));
      expect(h.latest()[0]!.newTab).toBe(true);
    });
  });

  describe("Bild", () => {
    it("uebernimmt ein gewaehltes Bild", async () => {
      const h = setup([tile("a")]);
      fireEvent.click(screen.getByTestId("tile-image-pick-a"));

      fireEvent.click(await screen.findByAltText("a.png"));

      await waitFor(() => expect(h.onChange).toHaveBeenCalled());
      expect(h.latest()[0]!.image).toBe("https://cdn.example.test/a.png");
      expect(h.latest()[0]!.imageAlt).toBe("a.png");
    });

    it("laesst einen bereits getippten Alternativtext stehen", async () => {
      const h = setup([tile("a", { imageAlt: "Ein Lkw auf der Autobahn" })]);
      fireEvent.click(screen.getByTestId("tile-image-pick-a"));

      fireEvent.click(await screen.findByAltText("a.png"));

      await waitFor(() => expect(h.onChange).toHaveBeenCalled());
      expect(h.latest()[0]!.image).toBe("https://cdn.example.test/a.png");
      expect(h.latest()[0]!.imageAlt).toBe("Ein Lkw auf der Autobahn");
    });

    it("entfernt mit dem Papierkorb auf dem Bild nur das Bild", () => {
      const h = setup([
        tile("a", { image: "https://cdn.example.test/alt.png", imageAlt: "Alt" }),
        tile("b"),
      ]);
      fireEvent.click(screen.getByTestId("tile-image-clear-a"));

      const tiles = h.latest();
      expect(tiles.map((entry) => entry.id)).toEqual(["a", "b"]);
      expect(tiles[0]!.image).toBeUndefined();
      expect(tiles[0]!.imageAlt).toBeUndefined();
      expect(tiles[0]!.title).toBe("Kachel a");
    });
  });

  describe("Sortieren mit der Tastatur", () => {
    it("verschiebt die Kachel mit ArrowDown um eine Stelle", () => {
      const h = setup([tile("a"), tile("b"), tile("c")]);
      fireEvent.keyDown(screen.getByTestId("tile-handle-a"), { key: "ArrowDown" });

      expect(h.latest().map((entry) => entry.id)).toEqual(["b", "a", "c"]);
    });

    it("verschiebt die Kachel mit ArrowUp um eine Stelle", () => {
      const h = setup([tile("a"), tile("b"), tile("c")]);
      fireEvent.keyDown(screen.getByTestId("tile-handle-c"), { key: "ArrowUp" });

      expect(h.latest().map((entry) => entry.id)).toEqual(["a", "c", "b"]);
    });

    it("laesst am Rand alles, wie es ist", () => {
      const h = setup([tile("a"), tile("b")]);
      fireEvent.keyDown(screen.getByTestId("tile-handle-a"), { key: "ArrowUp" });
      fireEvent.keyDown(screen.getByTestId("tile-handle-b"), { key: "ArrowDown" });

      expect(h.onChange).not.toHaveBeenCalled();
    });

    it("benennt den Griff mit Stelle und Anzahl", () => {
      setup([tile("a"), tile("b")]);
      expect(screen.getByTestId("tile-handle-b")).toHaveAttribute(
        "aria-label",
        "Kachel 2 von 2 verschieben",
      );
    });
  });

  describe("Sortieren mit dem Zeiger", () => {
    let rects: jest.SpyInstance;

    beforeEach(() => {
      rects = stubRowGeometry();
    });

    afterEach(() => {
      rects.mockRestore();
    });

    it("ordnet beim Ziehen nach unten um", () => {
      const h = setup([tile("a"), tile("b"), tile("c")], { controlled: true });
      const handle = screen.getByTestId("tile-handle-a");

      fireEvent.pointerDown(handle, { pointerId: 1, button: 0, clientY: middleOf(0) });
      fireEvent.pointerMove(handle, { pointerId: 1, clientY: middleOf(1) + 10 });

      expect(h.latest().map((entry) => entry.id)).toEqual(["b", "a", "c"]);
      expect(orderInDom()).toEqual(["b", "a", "c"]);

      fireEvent.pointerUp(handle, { pointerId: 1 });
    });

    it("ordnet beim Ziehen nach oben um", () => {
      const h = setup([tile("a"), tile("b"), tile("c")], { controlled: true });
      const handle = screen.getByTestId("tile-handle-c");

      fireEvent.pointerDown(handle, { pointerId: 1, button: 0, clientY: middleOf(2) });
      fireEvent.pointerMove(handle, { pointerId: 1, clientY: middleOf(1) - 10 });

      expect(h.latest().map((entry) => entry.id)).toEqual(["a", "c", "b"]);
    });

    it("zieht ueber mehrere Zeilen hinweg bis ans Ende", () => {
      setup([tile("a"), tile("b"), tile("c")], { controlled: true });
      const handle = screen.getByTestId("tile-handle-a");

      fireEvent.pointerDown(handle, { pointerId: 1, button: 0, clientY: middleOf(0) });
      fireEvent.pointerMove(handle, { pointerId: 1, clientY: middleOf(2) + 10 });

      expect(orderInDom()).toEqual(["b", "c", "a"]);
    });

    it("ruehrt nichts an, solange der Zeiger in der eigenen Zeile bleibt", () => {
      const h = setup([tile("a"), tile("b"), tile("c")], { controlled: true });
      const handle = screen.getByTestId("tile-handle-a");

      fireEvent.pointerDown(handle, { pointerId: 1, button: 0, clientY: middleOf(0) });
      fireEvent.pointerMove(handle, { pointerId: 1, clientY: middleOf(0) + 10 });

      expect(h.onChange).not.toHaveBeenCalled();
    });

    it("bewegt ohne gedrueckten Zeiger nichts", () => {
      const h = setup([tile("a"), tile("b")], { controlled: true });
      fireEvent.pointerMove(screen.getByTestId("tile-handle-a"), {
        pointerId: 1,
        clientY: middleOf(1) + 10,
      });

      expect(h.onChange).not.toHaveBeenCalled();
    });

    it("laesst ein abgebrochenes Ziehen keinen Zustand zurueck", () => {
      const h = setup([tile("a"), tile("b"), tile("c")], { controlled: true });
      const handle = screen.getByTestId("tile-handle-a");

      fireEvent.pointerDown(handle, { pointerId: 1, button: 0, clientY: middleOf(0) });
      expect(screen.getByTestId("tile-row-a").className).toContain("man-pe__row--dragging");

      fireEvent.pointerCancel(handle, { pointerId: 1 });

      expect(screen.getByTestId("tile-row-a").className).not.toContain("man-pe__row--dragging");
      // Nach dem Abbruch bewegt ein weiterer Zug ohne neues Aufsetzen nichts.
      fireEvent.pointerMove(handle, { pointerId: 1, clientY: middleOf(2) + 10 });
      expect(h.onChange).not.toHaveBeenCalled();
    });
  });

  describe("Fusszeile", () => {
    it("sagt, ob es ungesicherte Aenderungen gibt", () => {
      const { unmount } = render(
        <TileEditor
          value={[]}
          onChange={jest.fn()}
          onSave={jest.fn()}
          onClose={jest.fn()}
          dirty={false}
          mediaClient={stubMediaClient()}
        />,
      );
      expect(screen.getByText("Keine Änderungen")).toBeInTheDocument();
      unmount();

      setup([], { dirty: true });
      expect(screen.getByText("Ungesicherte Änderungen")).toBeInTheDocument();
    });

    it("reicht Abbrechen und Übernehmen durch", () => {
      const h = setup([tile("a")]);
      fireEvent.click(screen.getByTestId("tile-editor-cancel"));
      fireEvent.click(screen.getByTestId("tile-editor-save"));

      expect(h.onClose).toHaveBeenCalledTimes(1);
      expect(h.onSave).toHaveBeenCalledTimes(1);
    });
  });
});
