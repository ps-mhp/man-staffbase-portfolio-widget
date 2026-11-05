# Settings

| Setting | Description |
| --- | --- |
| **Tiles** | The tiles in the row. This is managed in the Tile Editor, which opens via **Edit Tiles**. By default, there are no tiles. |
| **Show Arrow** | Displays an arrow in the upper-right corner of each linked tile. Enabled by default. |

The arrow is toggled for all tiles collectively, not on a per-tile basis: a
row where the arrow appears in some tiles but not others looks like an error. It
never appears on tiles without a destination—there is nothing
to click there.

## The Tile Editor

The editor displays one row per tile, all stacked one below the other. The row
contains:

| Element | Meaning |
| --- | --- |
| **Handle** (left) | Moves the tile to a different location. Use the **Up Arrow** and **Down Arrow** keys to move it one position at a time. |
| **Image** | The preview. The pencil opens the media library; the trash can icon on the preview removes only the image, not the tile. If there is no image, a dotted area labeled **Select Image** appears there. |
| **Title** | The tile’s heading. Required. |
| **Link** | The tile’s destination. |
| **More** / **Less** | Expands the less frequently used fields: Label, Description, Image alt text, and **Open in a new tab**. |
| **Trash can** (right) | Removes the entire tile. |

Below the list is **Add Tile**; the new tile is appended to the
end. **Apply** writes the list to the widget; **Cancel** discards
it—you’ll be prompted if there are unsaved changes.

A tile without a title displays the message “Without a title, this
tile will not be displayed” in the editor. It remains in the list and is not
lost when saving; it only appears on the page once it has a title.

## Tile Fields

The tiles are stored as a JSON list. This is only visible if
the editor does not appear for some reason—in that case, the text field serves as a fallback.

| Field | Editor | Required | Meaning |
| --- | --- | --- | --- |
| `title` | Title | yes | The tile’s heading. If missing, the tile is skipped. |
| `description` | Description (under “More”) | no | A short text below the title. |
| `badge` | Badge (under “More”) | no | A small category badge above the title. |
| `image` | Image | no | Image URL. If missing, the tile will have no image area. |
| `imageAlt` | Alternative text (under “More”) | no | Alternative text for screen readers. Leave blank if the image is purely decorative. |
| `link` | Link | no | Destination of the tile. Without a destination, the tile is not clickable and does not display an arrow. |
| `newTab` | Open in a new tab (under “More”) | no | `true` opens the destination in a new tab. Default is `false`. |
| `id` | — | no | The tile’s unique identifier. Assigned automatically if missing. |

Images are cropped to a 16:9 aspect ratio and fill the tile
completely. Please provide images where cropping at the edges
is not a problem.
