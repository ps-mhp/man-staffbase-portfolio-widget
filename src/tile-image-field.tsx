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
 * Das Bild einer Kachel als Medienzeile wie im Screen: Vorschau (16:9),
 * daneben Dateiname und „Aus Mediathek wählen“ / „Adresse einfügen“. Im
 * Icon-Kasten steht die Vorschau eingepasst auf dessen Fläche.
 *
 * Das ganze Feld ist eine Ablagezone für Kacheln aus der Mediathek-Leiste;
 * der Knopf bleibt der Weg für Tastatur und Screenreader. „Adresse einfügen“
 * nimmt eine https-Adresse oder einen Pfad (`/…`) und prüft sie, bevor sie
 * ins Bild geschrieben wird.
 */

import * as React from "react";
import { ReactElement, useId, useState } from "react";
import { DropZone } from "@man/config-ui/drop/drop-zone";
import { Button } from "@man/config-ui/primitives/button";
import { Input } from "@man/config-ui/primitives/input";
import { MediaClient } from "@shared/media/media-client";
import { PickedMedia } from "@shared/media/media-picker";
import { useMediaDrop } from "@shared/media/use-media-drop";

export interface TileImageFieldProps {
  image: string | undefined;
  onPick: () => void;
  /** Eine geprüfte Adresse. */
  onUrlChange: (url: string) => void;
  onClear: () => void;
  client: MediaClient;
  /** Ablegen aus der Mediathek-Leiste. */
  onDrop: (picked: PickedMedia) => void;
  /** Der Satz unter dem Feld: was mit dem Bild geschieht. */
  hint: string;
  /** Gesetzt im Icon-Kasten: die Vorschau steht eingepasst auf dieser Fläche. */
  thumbBackground?: string;
}

/** Der letzte Teil der Adresse — was man als Dateinamen wiedererkennt. */
export function fileNameOf(url: string): string {
  const path = url.split(/[?#]/)[0] ?? "";
  const last = path.split("/").filter((part) => part !== "").pop() ?? url;
  try {
    return decodeURIComponent(last);
  } catch {
    return last;
  }
}

/** Warum eine Adresse nicht geht, sonst `undefined`. */
export function addressProblem(text: string): string | undefined {
  const value = text.trim();
  if (value === "") return undefined;
  if (/^https:\/\//i.test(value) || (value.startsWith("/") && !value.startsWith("//"))) return undefined;
  return "Bitte eine https-Adresse oder einen Pfad mit / am Anfang eintragen.";
}

const HINT = "text-[13px] text-muted-foreground";

function AddressInput({ id, current, onCommit }: { id: string; current: string; onCommit: (url: string) => void }): ReactElement {
  const [text, setText] = useState(current);
  const problem = addressProblem(text);
  const commit = (): void => {
    if (problem === undefined) onCommit(text.trim());
  };
  return (
    <div className="flex flex-col gap-1">
      <Input
        id={id}
        type="text"
        aria-label="Adresse des Bildes"
        aria-invalid={problem !== undefined ? true : undefined}
        aria-describedby={problem !== undefined ? `${id}-error` : undefined}
        value={text}
        placeholder="https://…"
        data-testid="tile-image-url"
        autoFocus
        onChange={(event) => setText(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            commit();
          }
        }}
      />
      {problem !== undefined && (
        <p id={`${id}-error`} role="alert" className="text-[13px] text-destructive">
          {problem}
        </p>
      )}
    </div>
  );
}

export function TileImageField({
  image,
  onPick,
  onUrlChange,
  onClear,
  client,
  onDrop,
  hint,
  thumbBackground,
}: TileImageFieldProps): ReactElement {
  const base = useId();
  const [urlOpen, setUrlOpen] = useState(false);
  const drop = useMediaDrop({ client, accept: "images", onPick: onDrop });
  const hasImage = image !== undefined && image !== "";

  return (
    <DropZone zone={drop} busy={drop.busy} className="flex flex-col gap-3" data-testid="tile-image-drop">
      <div className="flex flex-wrap items-center gap-4">
        {hasImage ? (
          <img
            className={
              thumbBackground === undefined
                ? "h-[90px] w-40 shrink-0 rounded-md border bg-stage object-cover"
                : "h-[90px] w-40 shrink-0 rounded-md border object-contain p-4"
            }
            style={thumbBackground === undefined ? undefined : { background: thumbBackground }}
            src={image}
            alt=""
            data-testid="tile-image-thumb"
          />
        ) : (
          <span
            className="flex h-[90px] w-40 shrink-0 items-center justify-center rounded-md border border-dashed bg-muted px-2 text-center text-[13px] text-muted-foreground"
            data-testid="tile-image-empty"
          >
            Noch kein Bild
          </span>
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          {hasImage && (
            <span className="truncate text-sm text-foreground" title={image} data-testid="tile-image-name">
              {fileNameOf(image)}
            </span>
          )}
          <div className="flex flex-wrap items-center gap-2">
            <Button type="button" variant="ghost" size="sm" data-testid="tile-image-pick" onClick={onPick}>
              Aus Mediathek wählen
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              aria-expanded={urlOpen}
              aria-controls={urlOpen ? `${base}-url` : undefined}
              data-testid="tile-image-url-toggle"
              onClick={() => setUrlOpen((open) => !open)}
            >
              Adresse einfügen
            </Button>
            {hasImage && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
                aria-label="Bild entfernen"
                data-testid="tile-image-clear"
                onClick={onClear}
              >
                Entfernen
              </Button>
            )}
          </div>
        </div>
      </div>
      {urlOpen && (
        <AddressInput
          id={`${base}-url`}
          current={image ?? ""}
          onCommit={(url) => {
            onUrlChange(url);
          }}
        />
      )}
      {drop.error !== null && (
        <p className="text-[13px] text-destructive" role="alert" data-testid="tile-image-drop-error">
          {drop.error}
        </p>
      )}
      <p className={HINT}>{hint}</p>
    </DropZone>
  );
}
