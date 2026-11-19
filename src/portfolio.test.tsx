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

import React from "react";
import { render, screen } from "@testing-library/react";

import { PortfolioTile } from "./portfolio-tiles";
import { Portfolio } from "./portfolio";

const tile = (overrides: Partial<PortfolioTile> = {}): PortfolioTile => ({
  id: "t1",
  title: "Lkw",
  newTab: false,
  ...overrides,
});

describe("Portfolio", () => {
  it("gibt ohne Kacheln nichts aus", () => {
    const { container } = render(<Portfolio tiles={[]} showChevron />);
    expect(container.querySelector(".man-portfolio")).toBeNull();
  });

  it("zeigt je Kachel einen Listeneintrag", () => {
    render(
      <Portfolio
        tiles={[tile(), tile({ id: "t2", title: "Bus" }), tile({ id: "t3", title: "Van" })]}
        showChevron
      />,
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("macht eine Kachel mit Ziel zum Verweis", () => {
    render(<Portfolio tiles={[tile({ link: "https://example.test/lkw" })]} showChevron />);
    const link = screen.getByRole("link", { name: /Lkw/ });
    expect(link.getAttribute("href")).toBe("https://example.test/lkw");
    expect(link.getAttribute("target")).toBeNull();
    expect(link.getAttribute("rel")).toBeNull();
  });

  it("oeffnet auf Wunsch in einem neuen Tab und sichert den Verweis ab", () => {
    render(<Portfolio tiles={[tile({ link: "https://example.test/lkw", newTab: true })]} showChevron />);
    const link = screen.getByRole("link", { name: /Lkw/ });
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("laesst eine Kachel ohne Ziel ohne Verweis und ohne Chevron", () => {
    const { container } = render(<Portfolio tiles={[tile()]} showChevron />);
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.getByText("Lkw")).toBeTruthy();
    expect(container.querySelector(".man-portfolio__chevron")).toBeNull();
  });

  it("nimmt den Chevron auf Wunsch von allen Kacheln", () => {
    const withChevron = render(
      <Portfolio tiles={[tile({ link: "https://example.test/lkw" })]} showChevron />,
    );
    expect(withChevron.container.querySelectorAll(".man-portfolio__chevron")).toHaveLength(1);
    withChevron.unmount();

    const without = render(
      <Portfolio tiles={[tile({ link: "https://example.test/lkw" })]} showChevron={false} />,
    );
    expect(without.container.querySelectorAll(".man-portfolio__chevron")).toHaveLength(0);
  });

  it("zeigt Etikett und Beschreibung nur, wenn sie gesetzt sind", () => {
    const bare = render(<Portfolio tiles={[tile()]} showChevron />);
    expect(bare.container.querySelector(".man-portfolio__badge")).toBeNull();
    expect(bare.container.querySelector(".man-portfolio__description")).toBeNull();
    bare.unmount();

    render(<Portfolio tiles={[tile({ badge: "Fahrzeuge", description: "Schwere Reihe" })]} showChevron />);
    expect(screen.getByText("Fahrzeuge")).toBeTruthy();
    expect(screen.getByText("Schwere Reihe")).toBeTruthy();
  });

  it("gibt ein Bild mit Alternativtext aus", () => {
    render(
      <Portfolio
        tiles={[tile({ image: "https://example.test/lkw.png", imageAlt: "Ein Lkw" })]}
        showChevron
      />,
    );
    const image = screen.getByAltText("Ein Lkw") as HTMLImageElement;
    expect(image.getAttribute("src")).toBe("https://example.test/lkw.png");
  });

  it("behandelt ein Bild ohne Alternativtext als schmueckend", () => {
    const { container } = render(
      <Portfolio tiles={[tile({ image: "https://example.test/lkw.png" })]} showChevron />,
    );
    const image = container.querySelector("img");
    expect(image).not.toBeNull();
    expect(image!.getAttribute("alt")).toBe("");
  });

  it("laesst den Bildbereich weg, wenn kein Bild gesetzt ist", () => {
    const { container } = render(<Portfolio tiles={[tile()]} showChevron />);
    expect(container.querySelector(".man-portfolio__media")).toBeNull();
  });

  it("traegt ohne Gestaltung die Bildkachel in Normalgroesse und keine Farben", () => {
    const { container } = render(<Portfolio tiles={[tile()]} showChevron />);
    const root = container.querySelector(".man-portfolio") as HTMLElement;
    expect(root.className).toBe("man-portfolio man-portfolio--image man-portfolio--normal");
    expect(root.style.getPropertyValue("--man-portfolio-bg")).toBe("");
    expect(root.style.getPropertyValue("--man-portfolio-ink")).toBe("");
  });

  it("gibt dem Icon-Kasten Klassen und die Farben der Vorgabe", () => {
    const { container } = render(
      <Portfolio tiles={[tile({ image: "/icon.svg" })]} showChevron design={{ variant: "icon", size: "compact" }} />,
    );
    const root = container.querySelector(".man-portfolio") as HTMLElement;
    expect(root).toHaveClass("man-portfolio--icon", "man-portfolio--compact", "man-portfolio--filled", "man-portfolio--inked");
    expect(root.style.getPropertyValue("--man-portfolio-bg")).toBe("#E40045");
    expect(root.style.getPropertyValue("--man-portfolio-ink")).toBe("#FFFFFF");
    expect(container.querySelector(".man-portfolio__image")?.getAttribute("src")).toBe("/icon.svg");
  });

  it("setzt gewaehlte Farben und die Groesse", () => {
    const { container } = render(
      <Portfolio
        tiles={[tile()]}
        showChevron
        design={{ variant: "image", size: "large", background: "#303C49", textColor: "#FDE2E8" }}
      />,
    );
    const root = container.querySelector(".man-portfolio") as HTMLElement;
    expect(root).toHaveClass("man-portfolio--large", "man-portfolio--filled", "man-portfolio--inked");
    expect(root.style.getPropertyValue("--man-portfolio-bg")).toBe("#303C49");
    expect(root.style.getPropertyValue("--man-portfolio-ink")).toBe("#FDE2E8");
  });

  it("bringt sein Stylesheet selbst mit", () => {
    const { container } = render(<Portfolio tiles={[tile()]} showChevron />);
    const style = container.querySelector("style");
    expect(style).not.toBeNull();
    expect(style!.textContent).toContain(".man-portfolio");
  });
});
