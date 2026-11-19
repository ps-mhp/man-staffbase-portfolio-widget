# Settings

| Setting | Description |
| --- | --- |
| **Tiles** | The tiles in the row. They are managed in the **Edit Tiles** window, which opens in the configuration dialog. The default is no tile. |
| **Display** | **Image Tile** (image at the top, cropped to 16:9, text below) or **Icon Box** (icon or image fitted, text centered on a colored background). The image tile is selected by default. In the window on the right under **Design**. |
| **Size** | **Compact**, **Normal**, or **Large** — for each layout. Normal is selected by default. See below. |
| **Background** | Tile background: **Default**, a MAN-CI color, or a custom hex value (`#RRGGBB`). The default is white for the image tile and MAN red for the icon box. |
| **Font** | Color of title, label, description, and arrow: **Automatic**, a MAN-CI color, or a custom hex value. “Automatic” selects the more readable of dark or white on a selected background; otherwise, it uses the standard MAN colors. |
| **Show Arrow** | Displays an arrow in the upper-right corner of each linked tile. Enabled by default. Located in the window on the right under **Design**. |

The display, size, colors, and arrow apply to all tiles collectively, not
to each tile individually: a row in which each tile looks different appears to be an
error. The arrow never appears on tiles without a destination—there
is nothing to click on there.

## Sizes

The size specifies the minimum width of a column. How many columns
fit side by side depends on the width of the widget on the
page; all columns in a row are the same width, and all tiles in a
row are the same height.

| Size | Minimum Width | At Full Page Width | Tablet | Phone | Special Feature |
| --- | --- | --- | --- | --- | --- |
| **Compact** | 160 px | about 7 | 4 | 2 | Smaller font; descriptions end after three lines. |
| **Normal** | 280 px | 4 | 2 | 1 | The layout of earlier versions. |
| **Large** | 440 px | 2 | 1 | 1 | Image on the left, text on the right, like a news feed. If the tile is narrower than 420 px (phone), the image returns to the top. The icon box remains side-by-side. |

## Colors

A note below the colors indicates when the text on the area is difficult
to read (contrast below 4.5:1). The combination is not prohibited.
When you hover over it with the mouse, a color area becomes slightly darker; a selected
font retains its color instead of turning red.

## The “Edit Tiles” Window

The window fills the entire screen. At the top are **Apply**,
**Cancel**, **Undo**, **Redo**, Help, and the toggle for
the preview (Editor, Desktop, Tablet, Mobile). Below that are three columns:

| Section | Description |
| --- | --- |
| **Tiles** (left) | All tiles in order, with preview image, title, and link. Drag the handle or use the keyboard to rearrange them; **New Tile** adds one to the end. |
| **Tile x of y** (center) | The fields for the selected tile: **Content** (Title, Link), **Image** (Media Library, Address, Remove), and **More** (Label, Description, Alternative Text, New Tab). The actions above—Move, Duplicate, and Delete—apply to the tile. |
| **Layout** (right) | **Display**, **Size**, **Area**, **Font**, and **Show Arrow**; all apply to the entire row. |

**Apply** saves the tiles and layout to the widget; **Cancel** discards
them—you’ll be prompted first if there are unsaved changes. The status at the top indicates
what has changed, such as “1 tile changed, layout changed.”

A tile without a title displays the message “Without a title,
the tile will not appear” in the **Title** field and is labeled “Untitled” in the list. It remains there
and is not lost when you save; it will not appear on the page until
it has a title.

## Fields of a Tile

Tiles, arrows, and layouts are saved together in the `portfolio-config`
(`{"tiles":[…],"showChevron":true,"variant":"icon","size":"compact","background":"#E40045","textColor":"#FFFFFF"}`,
encoded). `variant` is `image` or `icon`, `size` is `compact`, `normal`,
or `large`, and colors are specified as `#RRGGBB`; anything missing or invalid
is treated as the default. Older widgets still store the tiles as a JSON list in the
`tiles` field and the arrow in `show-chevron`; both are still processed
as long as `portfolio-config` does not set the respective value, and they appear
as before (image tile, normal). The tile format is the same in both cases:

| Field | Window | Required | Meaning |
| --- | --- | --- | --- |
| `title` | Title | yes | The tile’s heading. If missing, the tile is skipped. |
| `description` | Description (under “More”) | no | A short text below the title. |
| `badge` | Badge (under “More”) | no | A small category badge above the title. |
| `image` | Image | no | Image URL. If missing, the tile will have no image area. |
| `imageAlt` | Alternative text (under “More”) | no | Alternative text for screen readers. Leave blank if the image is purely decorative. |
| `link` | Link | no | Destination of the tile. Without a destination, the tile is not clickable and does not display an arrow. |
| `newTab` | Open in a new tab (under “More”) | no | `true` opens the destination in a new tab. Default is `false`. |
| `id` | — | no | The tile’s unique identifier. Is automatically assigned if missing. |

In the image tile, images are cropped to a 16:9 aspect ratio and
fill the image area completely. Provide images where
cropping at the edges is not a problem. In the icon box, however, the image is
scaled to fit and never cropped—symbols and logos in SVG
or PNG format with a transparent background are suitable there, in the color of the text (i.e.,
white on the red default background).
