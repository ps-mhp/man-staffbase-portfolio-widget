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
 * Eine Farbe der Reihe: ein Feld „Standard“ bzw. „Automatisch“, die Farben der
 * MAN-CI und ein Feld für einen eigenen Hex-Wert.
 *
 * Die Felder sind echte Optionsfelder: Pfeiltasten und das Vorlesen von
 * „ausgewählt“ bringt der Browser mit, gezeichnet wird nur ihr Aussehen. Der
 * eigene Wert gilt erst, wenn er lesbar ist (Enter oder Verlassen des Felds).
 */

import * as React from "react";
import { ReactElement, useEffect, useId, useState } from "react";
import { Input } from "@man/config-ui/primitives/input";
import { cn } from "@man/config-ui/primitives/utils";

import { readColor } from "./portfolio-design";

/** Die Farben der MAN-CI zur Auswahl; Werte wie in `_man-tokens.scss`. */
export const PORTFOLIO_PALETTE: readonly { color: string; name: string }[] = [
  { color: "#FFFFFF", name: "Weiß" },
  { color: "#F0F0F0", name: "Hellgrau" },
  { color: "#FDE2E8", name: "Blassrot" },
  { color: "#E40045", name: "MAN-Rot" },
  { color: "#3875B2", name: "Blau" },
  { color: "#303C49", name: "Anthrazit" },
  { color: "#1E2832", name: "Dunkelanthrazit" },
];

export interface ColorChoiceProps {
  /** Name der Gruppe, etwa „Fläche“. */
  label: string;
  /** Name der Wahl ohne eigene Farbe, etwa „Standard“. */
  autoLabel: string;
  /** Welche Farbe die Wahl ohne eigene Farbe gerade ergibt — als Punkt neben ihrem Namen. */
  autoColor: string;
  /** `#RRGGBB` oder `undefined` für „ohne eigene Farbe“. */
  value: string | undefined;
  onChange: (color: string | undefined) => void;
  "data-testid": string;
}

const SWATCH =
  "size-7 shrink-0 cursor-pointer appearance-none rounded-md border border-black/15 outline-none " +
  "checked:ring-2 checked:ring-foreground checked:ring-offset-2 focus-visible:ring-[3px] focus-visible:ring-ring/50";

/** Nur Unlesbares ergibt die Meldung; ein geleertes Feld heißt „ohne eigene Farbe“. */
const hexProblem = (text: string): string | undefined =>
  text.trim() === "" || readColor(text) !== undefined ? undefined : "Bitte als #RRGGBB angeben, etwa #E40045.";

function HexInput({
  value,
  onCommit,
  testId,
}: {
  value: string | undefined;
  onCommit: (color: string | undefined) => void;
  testId: string;
}): ReactElement {
  const id = useId();
  const [text, setText] = useState(value ?? "");
  // Folgt Änderungen von außen (Feld, Rückgängig), ohne das Eingabefeld neu
  // aufzubauen — sonst verlöre es nach Enter den Fokus.
  useEffect(() => setText(value ?? ""), [value]);
  const problem = hexProblem(text);
  const commit = (): void => {
    if (text.trim() === "") {
      if (value !== undefined) onCommit(undefined);
      return;
    }
    const color = readColor(text);
    if (color === undefined) return;
    setText(color);
    if (color !== value) onCommit(color);
  };
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <label htmlFor={id} className="text-[13px] text-muted-foreground">
          Eigene Farbe
        </label>
        <Input
          id={id}
          type="text"
          className="h-8 max-w-28 font-mono text-[13px]"
          placeholder="#RRGGBB"
          spellCheck={false}
          value={text}
          aria-invalid={problem !== undefined ? true : undefined}
          aria-describedby={problem !== undefined ? `${id}-error` : undefined}
          data-testid={`${testId}-hex`}
          onChange={(event) => setText(event.target.value)}
          onBlur={commit}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              commit();
            }
          }}
        />
      </div>
      {problem !== undefined && (
        <p id={`${id}-error`} role="alert" className="text-[13px] text-destructive">
          {problem}
        </p>
      )}
    </div>
  );
}

export function ColorChoice({ label, autoLabel, autoColor, value, onChange, "data-testid": testId }: ColorChoiceProps): ReactElement {
  const name = useId();
  return (
    <fieldset className="m-0 flex min-w-0 flex-col gap-2 border-0 p-0" data-testid={testId}>
      <legend className="mb-1.5 text-[13px] font-semibold text-foreground">{label}</legend>
      <div className="flex flex-wrap items-center gap-2">
        {/* Mit Namen statt als bloßes Feld: „Standard“ auf Weiß sähe sonst aus wie „Weiß“. */}
        <label
          className={cn(
            "inline-flex h-7 cursor-pointer items-center gap-1.5 rounded-full border bg-background px-2.5 text-[13px] text-foreground",
            "has-checked:border-foreground has-checked:ring-1 has-checked:ring-foreground has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50",
          )}
        >
          <input
            type="radio"
            name={name}
            className="sr-only"
            checked={value === undefined}
            onChange={() => onChange(undefined)}
          />
          <span aria-hidden className="size-3.5 rounded-full border border-black/15" style={{ backgroundColor: autoColor }} />
          {autoLabel}
        </label>
        <span aria-hidden className="mx-0.5 h-5 w-px bg-border" />
        {PORTFOLIO_PALETTE.map(({ color, name: colorName }) => (
          <input
            key={color}
            type="radio"
            name={name}
            className={SWATCH}
            style={{ backgroundColor: color }}
            aria-label={`${colorName} (${color})`}
            title={`${colorName} (${color})`}
            checked={value === color}
            onChange={() => onChange(color)}
          />
        ))}
      </div>
      <HexInput value={value} onCommit={onChange} testId={testId} />
    </fieldset>
  );
}
