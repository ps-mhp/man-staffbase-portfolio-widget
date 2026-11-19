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
 * Das Panel „Gestaltung“ rechts im Kachel-Editor. Alles darin gilt für die
 * ganze Reihe: Darstellung (Bildkachel oder Icon-Kasten), Größe, Fläche und
 * Schrift, der Pfeil.
 *
 * Darstellungen als Karten mit Miniatur wie im USP-Widget, die Größe als
 * Pills, Farben als Felder der MAN-CI plus Hex-Wert. Liest sich eine
 * Kombination schlecht, sagt es ein Hinweis darunter — verboten wird sie
 * nicht.
 */

import * as React from "react";
import { ReactElement, useId } from "react";
import { Grid2x2, Grid3x3, Rows2 } from "lucide-react";
import { Note } from "@man/config-ui/form/note";
import { SegmentedField } from "@man/config-ui/form/segmented-field";
import type { SegmentedOption } from "@man/config-ui/form/segmented";
import { SwitchRow } from "@man/config-ui/form/switch-row";
import { InspectorPanel } from "@man/config-ui/inspector/inspector-panel";
import { cn } from "@man/config-ui/primitives/utils";

import { ColorChoice } from "./color-choice";
import { PortfolioConfig, chevronShown, designOf } from "./portfolio-config";
import {
  MIN_TEXT_CONTRAST,
  PORTFOLIO_VARIANTS,
  PortfolioDesign,
  PortfolioSize,
  PortfolioVariant,
  contrast,
  tileColors,
} from "./portfolio-design";

/** `man("surface")` und `man("text")`: Fläche und Titel der Bildkachel ohne gewählte Farben. */
const SURFACE = "#FFFFFF";
const TEXT = "#303C49";

export const VARIANT_LABELS: Record<PortfolioVariant, { title: string; hint: string }> = {
  image: { title: "Bildkachel", hint: "Bild oben (16:9), Text darunter" },
  icon: { title: "Icon-Kasten", hint: "Icon und Text mittig auf einer Farbfläche" },
};

const SIZE_OPTIONS: readonly SegmentedOption<PortfolioSize>[] = [
  { id: "compact", label: "Kompakt", icon: Grid3x3 },
  { id: "normal", label: "Normal", icon: Grid2x2 },
  { id: "large", label: "Groß", icon: Rows2 },
];

const SIZE_HINTS: Record<PortfolioSize, string> = {
  compact: "Schmale Kacheln, mehr je Reihe — auf dem Telefon zwei nebeneinander.",
  normal: "Die gewohnte Breite: auf dem Schreibtisch vier je Reihe.",
  large: "Breit, Bild links und Text rechts — zwei je Reihe, auf Tablet und Telefon eine.",
};

/** Ein Schlüssel der Gestaltung, `undefined` nimmt ihn heraus — so bleibt das Attribut schlank. */
function withDesignKey<K extends keyof PortfolioDesign>(
  config: PortfolioConfig,
  key: K,
  value: PortfolioDesign[K] | undefined,
): PortfolioConfig {
  const { [key]: _dropped, ...rest } = config;
  void _dropped;
  return value === undefined ? rest : { ...rest, [key]: value };
}

function VariantThumb({ variant, background }: { variant: PortfolioVariant; background: string }): ReactElement {
  if (variant === "image") {
    return (
      <span aria-hidden="true" className="flex h-11 flex-col border bg-background">
        <span className="h-6 bg-border" />
        <span className="m-1 h-1.5 w-2/3 bg-muted-foreground/50" />
      </span>
    );
  }
  return (
    <span aria-hidden="true" className="flex h-11 flex-col items-center justify-center gap-1" style={{ background }}>
      <span className="size-3.5 rounded-full border-2 border-white" />
      <span className="h-1.5 w-1/2 bg-white" />
    </span>
  );
}

function VariantField({ design, onChange }: { design: PortfolioDesign; onChange: (variant: PortfolioVariant) => void }): ReactElement {
  const labelId = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <span id={labelId} className="text-[13px] font-semibold text-foreground">
        Darstellung
      </span>
      <div role="group" aria-labelledby={labelId} className="grid grid-cols-2 gap-2">
        {PORTFOLIO_VARIANTS.map((variant) => {
          const on = variant === design.variant;
          const { background } = tileColors({ ...design, variant });
          return (
            <button
              key={variant}
              type="button"
              aria-pressed={on}
              title={VARIANT_LABELS[variant].hint}
              data-testid={`portfolio-variant-${variant}`}
              className={cn(
                "flex cursor-pointer flex-col gap-1.5 rounded-md border bg-background p-2 text-left text-xs leading-snug text-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-[3px] focus-visible:ring-ring/40 motion-reduce:transition-none",
                on && "border-primary ring-1 ring-primary",
              )}
              onClick={() => onChange(variant)}
            >
              <VariantThumb variant={variant} background={background ?? SURFACE} />
              {VARIANT_LABELS[variant].title}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Das Verhältnis, mit einer Stelle und deutschem Komma: „2,8 : 1“. */
const ratioText = (ratio: number): string => `${(Math.floor(ratio * 10) / 10).toFixed(1).replace(".", ",")} : 1`;

/** Ein Hinweis, wenn die Schrift auf der Fläche schlecht zu lesen ist; sonst nichts. */
function ContrastNote({ design }: { design: PortfolioDesign }): ReactElement | null {
  const { background, ink } = tileColors(design);
  if (ink === undefined) return null;
  const ratio = contrast(background ?? SURFACE, ink);
  if (ratio >= MIN_TEXT_CONTRAST) return null;
  return (
    <Note tone="warning" data-testid="portfolio-contrast">
      Kontrast {ratioText(ratio)}: Die Schrift ist auf dieser Fläche schwer lesbar. Für Fließtext gelten mindestens 4,5 : 1.
    </Note>
  );
}

function ColorFields({ design, value, onChange }: { design: PortfolioDesign; value: PortfolioConfig; onChange: (config: PortfolioConfig) => void }): ReactElement {
  const standard = tileColors({ variant: design.variant, size: design.size });
  const automatic = tileColors({ ...design, textColor: undefined });
  return (
    <div className="flex flex-col gap-4">
      <ColorChoice
        label="Fläche"
        autoLabel="Standard"
        autoColor={standard.background ?? SURFACE}
        value={design.background}
        onChange={(background) => onChange(withDesignKey(value, "background", background))}
        data-testid="portfolio-background"
      />
      <ColorChoice
        label="Schrift"
        autoLabel="Automatisch"
        autoColor={automatic.ink ?? TEXT}
        value={design.textColor}
        onChange={(textColor) => onChange(withDesignKey(value, "textColor", textColor))}
        data-testid="portfolio-text-color"
      />
      <ContrastNote design={design} />
    </div>
  );
}

export interface DesignInspectorProps {
  value: PortfolioConfig;
  onChange: (config: PortfolioConfig) => void;
}

export function DesignInspector({ value, onChange }: DesignInspectorProps): ReactElement {
  const design = designOf(value);
  return (
    <InspectorPanel title="Gestaltung">
      <div className="flex flex-col gap-6">
        <p className="text-[13px] text-muted-foreground">Gilt für alle Kacheln der Reihe.</p>
        <VariantField design={design} onChange={(variant) => onChange(withDesignKey(value, "variant", variant))} />
        <SegmentedField
          label="Größe"
          options={SIZE_OPTIONS}
          value={design.size}
          hint={SIZE_HINTS[design.size]}
          onChange={(size) => onChange(withDesignKey(value, "size", size))}
        />
        <ColorFields design={design} value={value} onChange={onChange} />
        <SwitchRow
          label="Pfeil anzeigen"
          hint="Auf jeder verlinkten Kachel."
          checked={chevronShown(value)}
          onCheckedChange={(showChevron) => onChange({ ...value, showChevron })}
          data-testid="tile-chevron"
        />
      </div>
    </InspectorPanel>
  );
}
