import creatures from "./creatures"
import items from "./items"
import locations from "./locations"
import backgrounds from "./backgrounds"
import posableCharacters from "./posableCharacters"

const all = { ...locations, ...creatures, ...items, ...posableCharacters }

export default {
  all,
  locations,
  creatures,
  items,
  backgrounds,
  posableCharacters,
}
