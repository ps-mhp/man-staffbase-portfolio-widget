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
 * Die Hauptfläche des Kachel-Editors wie im Screen: Kopf mit „Kachel 1 von 6“
 * und den Aktionen, darunter die Abschnitte Inhalt, Bild und „Mehr“ auf
 * Lesebreite (720 px).
 *
 * Was selten gebraucht wird — Etikett, Beschreibung, Alternativtext, neuer
 * Tab —, steht im aufklappbaren Abschnitt „Mehr“.
 */

import * as React from "react";
import { ReactElement } from "react";
import { Field } from "@man/config-ui/form/field";
import { FormSection } from "@man/config-ui/form/form-section";
import { SwitchRow } from "@man/config-ui/form/switch-row";
import { Input } from "@man/config-ui/primitives/input";
import { Textarea } from "@man/config-ui/primitives/textarea";
import { ItemActions } from "@man/config-ui/sidebar/item-actions";
import { MediaClient } from "@shared/media/media-client";
import { PickedMedia } from "@shared/media/media-picker";

import { PortfolioVariant } from "./portfolio-design";
import { PortfolioTile } from "./portfolio-tiles";
import { TileImageField } from "./tile-image-field";
import { Tiles } from "./use-tiles";

export interface TileFormProps {
  tiles: Tiles;
  total: number;
  client: MediaClient;
  onPick: () => void;
  onDropPick: (tileId: string, picked: PickedMedia) => void;
  /** Bestimmt, ob das Bild beschnitten (Bildkachel) oder eingepasst wird (Icon-Kasten). */
  variant: PortfolioVariant;
  /** Fläche des Icon-Kastens, auf der die Vorschau des Icons steht. */
  iconBackground?: string;
}

/** Wie der Abschnitt „Bild“ in der jeweiligen Darstellung heißt und was er verspricht. */
const IMAGE_SECTION: Record<PortfolioVariant, { title: string; aside: string; hint: string }> = {
  image: { title: "Bild", aside: "16:9", hint: "Die Bilder werden auf 16:9 beschnitten." },
  icon: {
    title: "Icon",
    aside: "eingepasst",
    hint: "Ein Symbol oder Logo, am besten SVG oder PNG mit transparentem Hintergrund. Es wird eingepasst, nicht beschnitten.",
  },
};

/** Leer heißt „nicht gesetzt“: das Feld fällt dann aus dem Attribut. */
const orUndefined = (text: string): string | undefined => (text === "" ? undefined : text);

function ContentSection({ tile, onPatch }: { tile: PortfolioTile; onPatch: (c: Partial<PortfolioTile>) => void }): ReactElement {
  return (
    <FormSection title="Inhalt">
      <Field label="Titel" required hint="Ohne Titel erscheint die Kachel nicht.">
        <Input type="text" data-testid="tile-title" value={tile.title} onChange={(event) => onPatch({ title: event.target.value })} />
      </Field>
      <Field label="Link" hint="Seite (/…), Adresse (https://…) oder leer">
        <Input
          type="text"
          data-testid="tile-link"
          value={tile.link ?? ""}
          onChange={(event) => onPatch({ link: orUndefined(event.target.value) })}
        />
      </Field>
    </FormSection>
  );
}

function MoreSection({ tile, onPatch }: { tile: PortfolioTile; onPatch: (c: Partial<PortfolioTile>) => void }): ReactElement {
  return (
    <FormSection title="Mehr" aside="optional" collapsible defaultOpen>
      <Field label="Etikett" className="max-w-[240px]">
        <Input type="text" data-testid="tile-badge" value={tile.badge ?? ""} onChange={(event) => onPatch({ badge: orUndefined(event.target.value) })} />
      </Field>
      <Field label="Beschreibung">
        <Textarea
          rows={2}
          data-testid="tile-description"
          value={tile.description ?? ""}
          onChange={(event) => onPatch({ description: orUndefined(event.target.value) })}
        />
      </Field>
      <Field label="Alternativtext des Bildes" hint="Leer lassen, wenn das Bild nur schmückt.">
        <Input type="text" data-testid="tile-image-alt" value={tile.imageAlt ?? ""} onChange={(event) => onPatch({ imageAlt: event.target.value })} />
      </Field>
      <SwitchRow label="In neuem Tab öffnen" checked={tile.newTab} onCheckedChange={(newTab) => onPatch({ newTab })} data-testid="tile-newtab" />
    </FormSection>
  );
}

export function TileForm({ tiles, total, client, onPick, onDropPick, variant, iconBackground }: TileFormProps): ReactElement {
  const { tile, index } = tiles;
  const section = IMAGE_SECTION[variant];
  if (tile === undefined) {
    return <p className="px-10 py-6 text-sm text-muted-foreground">Wähle links eine Kachel oder lege eine neue an.</p>;
  }
  return (
    <div className="px-10 pt-6 pb-12 max-lg:px-6">
      <div className="flex max-w-[720px] flex-col gap-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h2 className="text-xl font-semibold text-foreground">{`Kachel ${index + 1} von ${total}`}</h2>
          <ItemActions
            className="ml-auto"
            noun="Kachel"
            orientation="vertical"
            onMoveBack={() => tiles.move(-1)}
            onMoveForward={() => tiles.move(1)}
            canMoveBack={index > 0}
            canMoveForward={index < total - 1}
            onDuplicate={tiles.duplicate}
            onDelete={tiles.remove}
          />
        </div>
        {/* Je Kachel eine eigene Instanz: das Adressfeld hält eine noch ungültige Eingabe fest. */}
        <ContentSection key={`content-${tile.id}`} tile={tile} onPatch={tiles.patch} />
        <FormSection key={`image-${tile.id}`} title={section.title} aside={section.aside}>
          <TileImageField
            image={tile.image}
            hint={section.hint}
            thumbBackground={variant === "icon" ? iconBackground : undefined}
            client={client}
            onPick={onPick}
            onUrlChange={(url) => tiles.patch({ image: orUndefined(url) })}
            onClear={() => tiles.patch({ image: undefined, imageAlt: undefined })}
            onDrop={(picked) => onDropPick(tile.id, picked)}
          />
        </FormSection>
        <MoreSection key={`more-${tile.id}`} tile={tile} onPatch={tiles.patch} />
      </div>
    </div>
  );
}
