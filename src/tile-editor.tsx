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
 * Der Redaktionsdialog der Kacheln.
 *
 * Die Kacheln liegen als JSON in einem einzigen Attribut — in einem Textfeld
 * sind sie nur von Entwicklerinnen und Entwicklern zu pflegen. Dieser Editor
 * tritt an seine Stelle: eine Zeile je Kachel, alle untereinander sichtbar.
 *
 * Bewusst keine Meisterliste mit Detailspalte wie beim Hero-Slider: eine
 * Portfolio-Reihe ist eine Reihe gleichrangiger Kacheln mit wenigen Feldern,
 * und wer sie ordnet, will sie alle zugleich sehen. Was selten gebraucht
 * wird — Etikett, Beschreibung, Alternativtext, neuer Tab —, steht je Zeile
 * hinter einem Aufklapper.
 *
 * Er schreibt nichts selbst zurück. Das Übergeben an das Formularfeld, die
 * Rückfrage bei ungesicherten Änderungen und das Wiederöffnen erledigt
 * `@shared/config-modal`; hier stehen nur die Felder.
 */

import * as React from "react";
import { ReactElement, useMemo, useRef, useState } from "react";

import { useHotStyle } from "@shared/hot-style";
import { MediaClient, createMediaClient } from "@shared/media/media-client";
import { MediaPicker, PickedMedia } from "@shared/media/media-picker";
import { PortfolioTile, emptyPortfolioTile } from "./portfolio-tiles";
import tileEditorCss from "./styles/tile-editor.scss";

export interface TileEditorProps {
  value: PortfolioTile[];
  onChange: (tiles: PortfolioTile[]) => void;
  onSave: () => void;
  onClose: () => void;
  dirty: boolean;
  /** Vorgabe ist ein Client auf dieselbe Herkunft; für Tests austauschbar. */
  mediaClient?: MediaClient;
}

/** Verschiebt den Eintrag an `from` auf die Stelle `to`; am Rand passiert nichts. */
function reorder(tiles: PortfolioTile[], from: number, to: number): PortfolioTile[] | null {
  if (to < 0 || to >= tiles.length || from === to) return null;
  const next = [...tiles];
  const [moved] = next.splice(from, 1);
  if (moved === undefined) return null;
  next.splice(to, 0, moved);
  return next;
}

export function TileEditor({
  value,
  onChange,
  onSave,
  onClose,
  dirty,
  mediaClient,
}: TileEditorProps): ReactElement {
  const css = useHotStyle(tileEditorCss, "portfolio-widget", "styles/tile-editor.scss");
  const client = useMemo(() => mediaClient ?? createMediaClient(), [mediaClient]);

  const [expanded, setExpanded] = useState<ReadonlySet<string>>(() => new Set<string>());
  const [pickerIndex, setPickerIndex] = useState<number | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  // Die Zeilenelemente: das Ziehen vergleicht die Zeigerposition mit ihren
  // Mitten. Ein Ref-Feld statt einer Messung beim Aufsetzen — die Zeilen
  // wachsen mit dem Aufklapper, und eine einmal gemerkte Höhe wäre falsch.
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  // Der Zustand des Ziehens doppelt als Ref: `onPointerMove` feuert mehrmals
  // je Bild und braucht die Stelle, an der die Kachel jetzt steht, nicht die
  // aus dem letzten Rendern.
  const dragFrom = useRef<number | null>(null);

  const patch = (index: number, changes: Partial<PortfolioTile>): void => {
    onChange(value.map((tile, i) => (i === index ? { ...tile, ...changes } : tile)));
  };

  const move = (from: number, to: number): boolean => {
    const next = reorder(value, from, to);
    if (next === null) return false;
    onChange(next);
    return true;
  };

  const remove = (index: number): void => {
    onChange(value.filter((_, i) => i !== index));
  };

  const add = (): void => {
    onChange([...value, emptyPortfolioTile()]);
  };

  const toggle = (id: string): void => {
    setExpanded((open) => {
      const next = new Set(open);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handlePick = (picked: PickedMedia): void => {
    const index = pickerIndex;
    setPickerIndex(null);
    if (index === null) return;
    const tile = value[index];
    if (tile === undefined) return;

    const changes: Partial<PortfolioTile> = { image: picked.url };
    // Der Alternativtext der Mediathek füllt nur eine Lücke. Ein bereits
    // getippter Text bleibt stehen — auch ein leerer: „schmückend“ ist eine
    // Aussage, keine fehlende Angabe.
    if (tile.imageAlt === undefined && picked.alt !== undefined) changes.imageAlt = picked.alt;
    patch(index, changes);
  };

  const endDrag = (event: React.PointerEvent<HTMLButtonElement>): void => {
    const handle = event.currentTarget;
    if (typeof handle.hasPointerCapture === "function" && handle.hasPointerCapture(event.pointerId)) {
      handle.releasePointerCapture(event.pointerId);
    }
    dragFrom.current = null;
    setDragIndex(null);
  };

  const handlePointerDown = (index: number) => (event: React.PointerEvent<HTMLButtonElement>): void => {
    // Nur die Hauptschaltfläche zieht; ein Rechtsklick öffnet das Menü des
    // Browsers und dürfte keine Kachel mitnehmen.
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    dragFrom.current = index;
    setDragIndex(index);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>): void => {
    const from = dragFrom.current;
    if (from === null) return;

    const y = event.clientY;
    // Die erste Zeile, deren Mitte der Zeiger überschritten hat, ist das Ziel.
    // Ein Vergleich mit den Mitten statt mit den Kanten: so kippt die
    // Reihenfolge genau dann, wenn die gezogene Zeile die andere zur Hälfte
    // überdeckt, und nicht schon bei der ersten Berührung.
    let target = from;
    rowRefs.current.forEach((row, index) => {
      if (row === null || index === from) return;
      const box = row.getBoundingClientRect();
      const middle = box.top + box.height / 2;
      if (index < from && y < middle) target = Math.min(target, index);
      if (index > from && y > middle) target = Math.max(target, index);
    });

    if (target === from) return;
    if (move(from, target)) dragFrom.current = target;
    setDragIndex(dragFrom.current);
  };

  const handleKeyDown = (index: number) => (event: React.KeyboardEvent<HTMLButtonElement>): void => {
    const delta = event.key === "ArrowUp" ? -1 : event.key === "ArrowDown" ? 1 : 0;
    if (delta === 0) return;
    event.preventDefault();
    move(index, index + delta);
  };

  // Nach dem Entfernen einer Kachel steht am Ende des Feldes noch der Verweis
  // auf die abgebaute Zeile; ihre Masse wären beim nächsten Ziehen Nullen.
  rowRefs.current.length = value.length;

  return (
    <div className="man-pe" data-testid="tile-editor">
      <style>{css}</style>

      <div className="man-pe__body">
        {value.length === 0 && (
          <p className="man-pe__empty">
            Noch keine Kachel. Lege über <strong>Kachel hinzufügen</strong> die erste an.
          </p>
        )}

        <div className="man-pe__list" role="list" data-testid="tile-list">
          {value.map((tile, index) => {
            const open = expanded.has(tile.id);
            const untitled = tile.title.trim() === "";
            return (
              <div
                key={tile.id}
                role="listitem"
                ref={(node) => {
                  rowRefs.current[index] = node;
                }}
                className={`man-pe__row${dragIndex === index ? " man-pe__row--dragging" : ""}`}
                data-testid={`tile-row-${tile.id}`}
              >
                <div className="man-pe__row-main">
                  <button
                    type="button"
                    className="man-pe__handle"
                    data-testid={`tile-handle-${tile.id}`}
                    aria-label={`Kachel ${index + 1} von ${value.length} verschieben`}
                    onPointerDown={handlePointerDown(index)}
                    onPointerMove={handlePointerMove}
                    onPointerUp={endDrag}
                    onPointerCancel={endDrag}
                    onKeyDown={handleKeyDown(index)}
                  >
                    <span aria-hidden="true">⠿</span>
                  </button>

                  <div className="man-pe__media">
                    {tile.image !== undefined && tile.image !== "" ? (
                      <div className="man-pe__thumb-wrap">
                        <img
                          className="man-pe__thumb"
                          src={tile.image}
                          alt=""
                          data-testid={`tile-thumb-${tile.id}`}
                        />
                        <span className="man-pe__thumb-actions">
                          <button
                            type="button"
                            className="man-pe__icon"
                            data-testid={`tile-image-pick-${tile.id}`}
                            aria-label="Bild wechseln"
                            onClick={() => setPickerIndex(index)}
                          >
                            <span aria-hidden="true">✎</span>
                          </button>
                          <button
                            type="button"
                            className="man-pe__icon"
                            data-testid={`tile-image-clear-${tile.id}`}
                            aria-label="Bild entfernen"
                            onClick={() => patch(index, { image: undefined, imageAlt: undefined })}
                          >
                            <span aria-hidden="true">🗑</span>
                          </button>
                        </span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="man-pe__pick"
                        data-testid={`tile-image-pick-${tile.id}`}
                        onClick={() => setPickerIndex(index)}
                      >
                        Bild wählen
                      </button>
                    )}
                  </div>

                  <div className="man-pe__fields">
                    <label className="man-pe__field">
                      <span className="man-pe__label">Titel</span>
                      <input
                        type="text"
                        className="man-pe__input"
                        data-testid={`tile-title-${tile.id}`}
                        value={tile.title}
                        onChange={(event) => patch(index, { title: event.target.value })}
                      />
                    </label>

                    <label className="man-pe__field">
                      <span className="man-pe__label">Link</span>
                      <input
                        type="text"
                        className="man-pe__input"
                        data-testid={`tile-link-${tile.id}`}
                        value={tile.link ?? ""}
                        onChange={(event) =>
                          patch(index, {
                            link: event.target.value === "" ? undefined : event.target.value,
                          })
                        }
                      />
                    </label>

                    {untitled && (
                      <p className="man-pe__hint" data-testid={`tile-untitled-${tile.id}`}>
                        Ohne Titel wird diese Kachel nicht angezeigt.
                      </p>
                    )}

                    <button
                      type="button"
                      className="man-pe__more"
                      data-testid={`tile-more-${tile.id}`}
                      aria-expanded={open}
                      onClick={() => toggle(tile.id)}
                    >
                      {open ? "Weniger" : "Mehr"}
                    </button>
                  </div>

                  <button
                    type="button"
                    className="man-pe__icon man-pe__icon--danger"
                    data-testid={`tile-remove-${tile.id}`}
                    aria-label={`Kachel ${index + 1} entfernen`}
                    onClick={() => remove(index)}
                  >
                    <span aria-hidden="true">🗑</span>
                  </button>
                </div>

                {open && (
                  <div className="man-pe__extra" data-testid={`tile-extra-${tile.id}`}>
                    <label className="man-pe__field">
                      <span className="man-pe__label">Etikett</span>
                      <input
                        type="text"
                        className="man-pe__input"
                        data-testid={`tile-badge-${tile.id}`}
                        value={tile.badge ?? ""}
                        onChange={(event) =>
                          patch(index, {
                            badge: event.target.value === "" ? undefined : event.target.value,
                          })
                        }
                      />
                    </label>

                    <label className="man-pe__field">
                      <span className="man-pe__label">Beschreibung</span>
                      <textarea
                        className="man-pe__input man-pe__input--area"
                        data-testid={`tile-description-${tile.id}`}
                        value={tile.description ?? ""}
                        onChange={(event) =>
                          patch(index, {
                            description: event.target.value === "" ? undefined : event.target.value,
                          })
                        }
                      />
                    </label>

                    <label className="man-pe__field">
                      <span className="man-pe__label">Alternativtext des Bildes</span>
                      <input
                        type="text"
                        className="man-pe__input"
                        data-testid={`tile-image-alt-${tile.id}`}
                        value={tile.imageAlt ?? ""}
                        onChange={(event) => patch(index, { imageAlt: event.target.value })}
                      />
                      <span className="man-pe__hint">
                        Leer lassen, wenn das Bild nur schmückt.
                      </span>
                    </label>

                    <label className="man-pe__check">
                      <input
                        type="checkbox"
                        data-testid={`tile-newtab-${tile.id}`}
                        checked={tile.newTab}
                        onChange={(event) => patch(index, { newTab: event.target.checked })}
                      />
                      In neuem Tab öffnen
                    </label>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button
          type="button"
          className="man-pe__button man-pe__button--primary man-pe__add"
          data-testid="tile-add"
          onClick={add}
        >
          Kachel hinzufügen
        </button>
      </div>

      <div className="man-pe__footer">
        <span className="man-pe__footer-note">
          {dirty ? "Ungesicherte Änderungen" : "Keine Änderungen"}
        </span>
        <button
          type="button"
          className="man-pe__button"
          data-testid="tile-editor-cancel"
          onClick={onClose}
        >
          Abbrechen
        </button>
        <button
          type="button"
          className="man-pe__button man-pe__button--primary"
          data-testid="tile-editor-save"
          onClick={onSave}
        >
          Übernehmen
        </button>
      </div>

      {pickerIndex !== null && (
        <MediaPicker
          client={client}
          accept="images"
          onSelect={handlePick}
          onClose={() => setPickerIndex(null)}
        />
      )}
    </div>
  );
}
