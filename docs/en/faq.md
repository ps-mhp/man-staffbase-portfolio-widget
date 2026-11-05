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

Answer: Click the dotted **Select Image** area in the row, or—if an
image already exists—click the pencil icon next to it. Both options open the media library, where
you can also upload the image directly. An image from an external website
also works—to do this, enter its URL in the JSON field `image`,
as long as it’s publicly accessible.

**Question:** I just wanted to replace the image and accidentally deleted the entire
tile.

Answer: There are two trash cans. The one on the image preview removes only the
image, while the one on the right edge of the row removes the entire tile. As long as you haven’t
clicked **Apply** yet, you can undo the mistake by clicking
**Cancel**.

**Question:** How do I change the order?

Answer: Drag the tile by the handle on the far left to its new position. You can also do this
without a mouse: Select the handle using the Tab key, then use the **Up
Arrow** and **Down Arrow** keys to move it.

**Question:** Why doesn’t one of my tiles have an arrow, even though “Show Arrow”
is turned on?

Answer: The tile is missing a link. Without a destination, it cannot be clicked, and an
arrow would imply an action that does not exist.

**Question:** The images are cropped to different heights.

Answer: All images are adjusted to a 16:9 aspect ratio and fill the image area
completely. If the aspect ratios differ significantly, the
cropping will vary. If possible, provide the images in a
16:9 aspect ratio from the start.

**Question:** Can I force the tiles to a specific number of columns?

Answer: No. The tiles have a fixed width and wrap as soon as there’s
no longer enough space—just like with Staffbase’s own Portfolio widget.

**Question:** Instead of the editor, I only see a text field with JSON.

Answer: The editor replaces the **Tiles** field as soon as
the configuration dialog is open. If this fails, the
text field remains as a fallback; the format is the same, and the fields for a
tile are listed in the settings. Reopening the dialog usually brings the
editor back.
