# Step by Step

## Setting Up the Basic Configuration

1. Place the **Portfolio** widget in the desired location on the page.
2. Open the widget's settings and click
   **Edit Tiles**. The tile editor opens.
3. Click **Add Tile**. A new, empty row appears
   at the end of the list.
4. Fill in the **Title** and **Link**.
5. Click the dotted **Select Image** area and locate the
   image in the media library. You can also upload it directly from there.
6. Repeat steps 3 through 5 for each additional tile.
7. Click **Apply** and save the page.
8. Leave **Show Arrow** turned on if you want an arrow to appear in the top-right corner of each
   tile.
9. Check the result in the preview.

## Filling Out a Tile Completely

The title, link, and image appear on the same line. Everything else is hidden behind the
**More** dropdown at the end of the line:

- **Label** — a short category word above the title, such as “Vehicles.”
- **Description** — a short text below the title.
- **Image alt text** — what a screen reader will
  read aloud instead of the image. Leave blank if the image is purely decorative. When selecting an image,
  the editor automatically pulls alt text from the media library as long as the
  field has not been edited—but it won’t use a plain filename like “lkw.png”;
  text you type yourself will remain.
- **Open in a new tab** — opens the link in a new browser tab.

Click **Less** to collapse the section again. Each row has its own
expand button.

Only the title is required. Everything else is optional.

## Change Order

The order of the tiles on the page is the same as the order in the list.

- **With the mouse:** Grab the tile by the handle on the far left and drag
  it up or down. As soon as it overlaps half of an adjacent row,
  the two swap places.
- **Using the keyboard:** Select the handle with the Tab key and
  move the tile one position at a time using the **Up Arrow** and **Down Arrow**
  keys.

## Change or Remove an Image

There are two small buttons on the image preview:

- The **pencil** opens the media library and replaces the image.
- The **trash can** removes only the image. The tile remains and is
  displayed without the image area.

The **trash can on the right edge of the row**, on the other hand, removes the entire tile.

## Making Changes Later

1. Click the widget and open its settings.
2. Click **Edit Tiles**.
3. Make the necessary changes and click **Apply**.
4. Save and check the preview.

**Cancel** discards the changes; if there are any pending changes, the editor
will ask you first.

## If Something Isn’t Working

1. If a tile is missing from the page, it likely lacks a title. The editor
   displays the message “This tile will not be
   displayed without a title” on that line—the tile remains there, it’s just not shown.
2. If a tile has no image, check the URL: it must
   open directly in the browser. Images from the media library always meet this requirement.
3. If only a text field with JSON appears instead of the editor, continue editing the
   tiles there as a one-time exception—the format is the same:

   ```json
   [
     {
       "title": "Truck",
       "badge": "Vehicles",
       "description": "The heavy-duty series for long-haul transport.",
       "image": "https://…/lkw.png",
       "imageAlt": "A truck on the highway",
       "link": "/content/page/lkw",
       "newTab": true
     }
   ]
   ```

   If nothing appears after that, the JSON is usually corrupted: a comma
   after the last tile or a missing closing bracket. Check
   the text in a JSON validator.
