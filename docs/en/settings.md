# Settings

| Setting | Description |
| --- | --- |
| **Tiles** | The tiles in the row. They are managed in the **Edit Tiles** window, which opens in the configuration dialog. By default, no tile is selected. |
| **Show Arrow** | Displays an arrow in the upper-right corner of each linked tile. Enabled by default. Located in the window on the right under **Design**. |

The arrow is toggled for all tiles collectively, not individually: a
row where the arrow appears in some tiles but not others looks like an error. On
tiles without a destination, it never appears—there is nothing
to click on there.

## The “Edit Tiles” Window

The window fills the entire screen. At the top are **Apply**,
**Cancel**, **Undo**, **Redo**, Help, and the toggle for
the preview (Editor, Desktop, Tablet, Mobile). Below that are three columns:

| Area | Description |
| --- | --- |
| **Tiles** (left) | All tiles in order, with preview image, title, and link. Drag the handle or use the keyboard to rearrange them; **New Tile** adds one to the end. |
| **Tile x of y** (center) | The fields for the selected tile: **Content** (title, link), **Image** (media library, address, remove), and **More** (label, description, alt text, new tab). Above that, the actions *Move*, *Duplicate*, and *Delete* affect the tile. |
| **Layout** (right) | The **Show Arrow** toggle; it applies to all tiles. |

**Apply** adds tiles and the arrow to the widget; **Cancel** discards
them—you’ll be prompted first if there are unsaved changes. The status at the top indicates
what has changed, such as “1 tile changed.”

A tile without a title displays the message “Without a title,
the tile will not appear” in the **Title** field and is labeled “Untitled” in the list. It remains there
and is not lost when you save; it will not appear on the page until
it has a title.

## Fields of a Tile

Tiles and the arrow are stored together in the `portfolio-config` attribute
(`{"tiles":[…],"showChevron":true}`, encoded). Older widgets still store the tiles
as a JSON list in the `tiles` field and the chevron in `show-chevron`; both
continue to be read as long as `portfolio-config` does not
set the respective value. The format of the tiles is the same in both cases:

| Field | Window | Required | Meaning |
| --- | --- | --- | --- |
| `title` | Title | yes | The tile’s heading. If missing, the tile is skipped. |
| `description` | Description (under “More”) | no | A short text below the title. |
| `badge` | Label (under “More”) | no | A small category label above the title. |
| `image` | Image | no | Image URL. If missing, the tile will have no image area. |
| `imageAlt` | Alternative text (under “More”) | no | Alternative text for screen readers. Leave blank if the image is purely decorative. |
| `link` | Link | no | Destination of the tile. Without a destination, the tile is not clickable and does not display an arrow. |
| `newTab` | Open in a new tab (under “More”) | no | `true` opens the destination in a new tab. Default is `false`. |
| `id` | — | no | The tile’s unique identifier. Assigned automatically if missing. |

Images are cropped to a 16:9 aspect ratio and fill the tile
completely. Please provide images where cropping at the edges
is not a problem.
