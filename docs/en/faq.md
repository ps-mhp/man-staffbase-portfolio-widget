# FAQ

**Question:** The widget isn't displaying anything. Why is that?

Answer: Either the **Tiles** field is empty, or its content is not
valid JSON. In the latter case, the browser’s developer console will display the
message “portfolio-widget: The ‘Tiles’ field does not contain a valid
JSON array.” Most common causes: a comma after the last tile, a
missing closing bracket, or typographic quotation marks (“ ”) instead of
straight quotes ("). Check the text in a JSON validator.

**Question:** A single tile is missing; the others are displayed correctly.

Answer: This tile is missing the `title`. Tiles without a title are
skipped so that a typo in one tile doesn’t
affect the rest. A `title` consisting solely of spaces counts as
missing.

**Question:** Where do I get the address for `image`?

Answer: Upload the image to the media library, open it there, and copy
the address. An image from an external website also works,
as long as it’s publicly accessible.

**Question:** Why doesn’t one of my tiles have an arrow, even though “Show Arrow”
is turned on?

Answer: The tile is missing a `link`. Without a destination, it cannot be clicked, and an
arrow would imply an action that doesn’t exist.

**Question:** The images are cropped to different heights.

Answer: All images are adjusted to a 16:9 aspect ratio and fill the image area
completely. If the aspect ratios differ significantly, the
cropping will vary. If possible, please submit the images in the
16:9 aspect ratio.

**Question:** Can I force the tiles to fit into a specific number of columns?

Answer: No. The tiles have a fixed width and wrap to the next column as soon as there
there isn’t enough space—just like with Staffbase’s own portfolio widget.

**Question:** When will a proper editor replace the JSON field?

Answer: It’s in the works. The data format will remain unchanged, so the tiles you’ve
created today will remain as they are.
