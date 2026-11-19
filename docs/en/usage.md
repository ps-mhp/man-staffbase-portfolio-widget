# Step by Step

## Setting Up the Basic Configuration

1. Place the **Portfolio** widget in the desired location on the page.
2. Open the widget’s settings. The **Edit Tiles** window
   opens in full-screen mode; if it doesn’t open automatically, click
   **Edit Tiles**.
3. Click **New Tile** on the left. The new, empty tile appears at the end
   of the list and is automatically selected.
4. Fill in the **Title** and **Link** fields in the center.
5. Under **Image**, select the **Choose from Media Library** button. The
   media library opens as a sidebar on the right; it also allows you to upload files.
6. Repeat steps 3 through 5 for each additional tile.
7. Under **Design** on the right, select the **Display** and
   **Size**, and leave **Show Arrow** checked if you want an arrow to appear in the upper-right corner
   of each linked tile.
8. Click **Apply** at the top and save the page.
9. Check the result in the preview.

## Filling Out a Tile Completely

The title, link, and image are located in the **Content** and **Image** sections. Everything
else is in the **More** section, which can be expanded or collapsed:

- **Label** — a short category word above the title, such as “Vehicles.”
- **Description** — a short text below the title.
- **Image alt text** — what a screen reader reads aloud instead of the image.
  Leave blank if the image is purely decorative. When selecting an image,
  the editor automatically retrieves alt text from the media library as long as the
  field remains untouched—but not a simple filename like “lkw.png”;
  text you type yourself will be retained.
- **Open in a new tab** — opens the link in a new browser tab.

Only the title is required. Everything else is optional.

## Creating Icon Boxes

Here’s how to create colored boxes with an icon and name, for example for applications or
contact points:

1. On the right, under **Design**, select **Icon Box** under **Display**.
   **Icon Box**. The boxes appear in MAN red with white text.
2. Under **Size**, select **Compact** if you want to place many boxes in a row
  .
3. Under **Icon**, assign an icon from the media library to each tile—
   preferably an SVG or PNG with a transparent white background. It will be
   resized to fit, not cropped.
4. If needed, select a different **Background** and **Font**. If the
   font remains set to **Automatic**, the widget will choose the more readable option between dark
   and white. A warning will appear if a custom combination is difficult
   to read.

## Select Size and Colors

Under **Design**, the following applies to the entire row:

- **Size** — **Compact** displays narrow tiles, with more per row (on a
  phone, two side by side). **Normal** is the standard width. **Large**
  places the image and text side by side, like in a news feed; on the
  phone, the image appears at the top again.
- **Background** — **Standard** (white for the image tile, MAN red for the
  icon box), one of the MAN-CI colors, or enter a
  Hex value such as `#E40045` (confirm with Enter).
- **Font** — **Automatic**, a color from the MAN CI, or a custom
  Hex value. This applies to the title, label, description, and arrow.

The number of columns adjusts to the available width; in the preview
(desktop, tablet, mobile), you can see how many tiles are displayed side by side.

## Change Order

The order of the tiles on the page is the same as the order in the list
on the left.

- **With the mouse:** Grab the tile by its handle on the left side of the list and
  drag it up or down.
- **Using the keyboard:** Select the tile in the list, press the
  spacebar, move it with the **Up Arrow** and **Down Arrow** keys,
  and drop it with the spacebar.
- **Using the actions above the fields:** **Move Tile Up** and **Move Tile
  Down** move the selected tile one position at a time.

Next to these are **Duplicate Tile** and **Delete Tile**.

## Change or Remove an Image

Under **Image**, there are three options:

- **Select from Media Library** opens the media library and replaces the image. An image
  from the toolbar can also be dragged directly onto the image field.
- **Insert URL** uses the URL of an image (https://… or a path
  starting with /) instead of an image from the media library.
- **Remove** only removes the image. The tile remains and is displayed without
  an image area.

**Delete Tile** above the fields, on the other hand, removes the entire tile.

## Preview

At the top of the window, the toggle switches between **Editor**, **Desktop**,
**Tablet**, and **Mobile**. The preview shows the row of tiles exactly as the page
displays them—in the selected layout, size, and colors, with the
arrow positioned as shown on the right. The number of columns is also correct: Tablet and
Mobile display as many tiles side by side as the device allows.

## Making Changes Later

1. Click the widget and open its settings.
2. Click **Edit Tiles** if the window doesn’t open
   automatically.
3. Make the necessary changes and click **Apply** at the top.
4. Save and check the preview.

**Undo** and **Redo** at the top undo individual steps.
**Cancel** discards the changes; if changes are pending, the editor
will ask for confirmation first. The **?** at the top displays a brief help message for the window.

Widgets created before the redesign retain their settings: when
you first open the window, it loads the tiles and arrow, and the page will
only look different after you click **Apply** if you’ve made any changes.

## If something isn’t working

1. If a tile is missing from the page, it likely lacks a title. The editor
   notes, “The tile won’t appear without a title”—the tile remains
   in place; it’s just not displayed.
2. If a tile appears without an image, check the URL: it must open
   open directly in the browser. Images from the media library always meet this requirement.
3. If only a text field appears instead of the window, it is the raw version of the
   configuration (encoded). Open the dialog again; the window will
   usually replace the field.
