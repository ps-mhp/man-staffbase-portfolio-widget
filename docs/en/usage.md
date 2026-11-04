# Step by Step

## Setting Up the Basic Case

1. Upload the images to the media library in advance and copy their
   URLs. Each tile needs its own URL.
2. Place the **Portfolio** widget in the desired location on the page.
3. Enter the list in the **Tiles** field. Each tile is an object enclosed in
   square brackets, separated by commas:

   ```json
   [
     {
       "title": "Truck",
       "image": "https://…/lkw.png",
       "link": "/content/page/lkw"
     },
     {
       "title": "Bus",
       "image": "https://…/bus.png",
       "link": "/content/page/bus"
     }
   ]
   ```

4. Leave **Show Arrow** turned on if you want an arrow to appear in the upper-right corner of each
   tile.
5. Save and check the result in the preview.

## Filling Out a Tile Completely

All fields that a tile supports:

```json
{
  "title": "Truck",
  "badge": "Vehicles",
  "description": "The heavy-duty series for long-haul transport.",
  "image": "https://…/lkw.png",
  "imageAlt": "A truck on the highway",
  "link": "/content/page/lkw",
  "newTab": true
}
```

Only `title` is required. Everything else is optional.

## Making Changes Later

1. Click on the widget and open its settings.
2. Change the text in the **Tiles** field. The order of the tiles on the
   page matches the order in the list.
3. Save and check the preview.

## If Something Isn’t Working

1. If nothing appears at all, the JSON is usually corrupted. Most common cause: a
   comma after the last tile or a missing closing bracket.
   Check the text in a JSON validator.
2. If a single tile is missing, it’s likely missing the `title`—tiles without
   a title are skipped.
3. If a tile has no image, check the URL in `image`: it must
   open directly in the browser.
