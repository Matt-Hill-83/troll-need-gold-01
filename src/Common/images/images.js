import { creatures } from "./creatures"
import { creatures2animals } from "./creatures2"
import items from "./items"
import locations from "./locations"
import backgrounds from "./backgrounds"
import posableCharacters from "./posableCharacters"

const all = {
  ...locations,
  ...creatures,
  ...creatures2animals,
  ...items,
  ...posableCharacters,
}

export default {
  all,
  locations,
  creatures,
  creatures2animals,
  items,
  backgrounds,
  posableCharacters,
}
