import { trophys01 } from "./trophys01"
import { creatures, dresses } from "./creatures"
import { creatures2animals } from "./creatures2"
import { creatures3animals } from "./creatures3"
import items from "./items"
import locations from "./locations"
import backgrounds from "./backgrounds"
import { newBackgrounds } from "./newBackgrounds/newBackgrounds"
import posableCharacters from "./posableCharacters"

const all = {
  ...locations,
  ...creatures,
  ...creatures2animals,
  ...items,
  ...posableCharacters,
  ...dresses,
}

export default {
  all,
  locations,
  creatures,
  creatures2animals,
  creatures3animals,
  items,
  backgrounds,
  newBackgrounds,
  posableCharacters,
  trophys01,
  dresses,
}
