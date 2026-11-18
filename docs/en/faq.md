# FAQ

**Question:** The widget isn't displaying anything. Why is that?

Answer: Usually, no tiles have been created yet—open the
settings and click **Edit Tiles**. If, by exception, you have
maintained the tiles in the JSON text field, the content may not be
valid JSON. In that case, the browser’s developer console will display the message
“portfolio-widget: The ‘tiles’ field does not contain a valid JSON array.”
Most common causes: a comma after the last tile, a missing
closing bracket, or typographic quotation marks (“ ”) instead of straight
(")). Check the text in a JSON validator.

**Question:** A single tile is missing, while the others are displayed.

Answer: This tile is missing a title. Tiles without titles are
skipped so that a typo in one tile doesn’t
affect the others. A title consisting solely of spaces counts as missing.
In the editor, such a tile remains and displays the note “Without a title,
this tile will not be displayed”—so you won’t lose it; it
will simply not appear on the page until you add a title.

**Question:** How do I add an image to a tile?

Answer: Use **Select from Media Library** in the **Image** section. The media library
opens as a sidebar on the right; there, you can upload the image directly
or drag and drop it onto the image field. An image from an external website
also works—to do this, enter its
https address under **Insert Address**, as long as it’s publicly accessible.

**Question:** I just wanted to replace the image and accidentally deleted the entire
tile.

Answer: **Remove** in the **Image** section only removes the image,
while **Delete Tile** above the fields removes the entire tile. As long as you haven’t yet clicked
**Apply**, **Undo** will reverse the mistake, and
**Cancel** discards all changes.

**Question:** How do I change the order?

Answer: Drag the tile in the list on the left by its handle to its new position.
You can also do this without a mouse: Select the tile, press the spacebar, use the **Up Arrow** and
**Down Arrow** keys to move it, then press the spacebar. Above the fields, use
**Move Tile Up** and **Move Tile Down** to move the tile up or down one position at a time.

**Question:** Why doesn’t one of my tiles have an arrow, even though “Show Arrow”
is turned on?

Answer: The tile is missing a link. Without a destination, it cannot be clicked, and an
arrow would imply an action that doesn’t exist.

**Question:** The images are cropped to different heights.

Answer: All images are adjusted to a 16:9 aspect ratio and fill the image area
completely. If the aspect ratios differ significantly, the
cropping will vary. If possible, please submit the images in the
16:9 aspect ratio.

**Question:** Can I force the tiles to fit into a specific number of columns?

Answer: No. The tiles have a fixed width and wrap to the next column as soon as there
there isn’t enough space—just like with Staffbase’s own Portfolio widget.

**Question:** Instead of the window, I only see a text field.

Answer: The window replaces the text field as soon as the
configuration dialog is open. If it fails to do so, the
text field remains as a fallback; it contains the raw version of the configuration.
Reopening the dialog usually brings the window back.

**Question:** I created the widget before the redesign. Will anything
be lost?

Answer: No. The widget continues to display its existing tiles and its
arrow. The window adopts these values when it opens; only when you make a
change and select **Apply** will the new version be saved.
