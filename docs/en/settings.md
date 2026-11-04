# Settings

| Setting | Description |
| --- | --- |
| **Tiles** | The tiles as a JSON list. The default is `[]`, meaning no tiles. The fields for each tile are listed below. |
| **Show Arrow** | Displays an arrow in the upper-right corner of each linked tile. Enabled by default. |

The arrow is toggled for all tiles collectively, not on a per-tile basis: a
row where the arrow appears in some tiles but not others looks like an error. On
tiles without a destination, it never appears—there is nothing
to click on there.

## Tile Fields

| Field | Required | Meaning |
| --- | --- | --- |
| `title` | yes | The tile’s title. If missing, the tile is skipped. |
| `description` | no | A short text below the title. |
| `badge` | no | A small category label above the title. |
| `image` | no | Image URL. If missing, the tile has no image area. |
| `imageAlt` | no | Alternative text for screen readers. Leave blank if the image is purely decorative. |
| `link` | no | The tile’s destination. Without a destination, the tile is not clickable and does not display an arrow. |
| `newTab` | no | `true` opens the destination in a new tab. Default is `false`. |
| `id` | no | The tile’s unique identifier. Assigned automatically if omitted. |

Images are cropped to a 16:9 aspect ratio and fill the tile
completely. Please provide images where cropping at the edges
is not a problem.
