// import test from "./creatures"
import { creatures, creatures2animals } from "./creatures"
import items from "./items"
import locations from "./locations"
import backgrounds from "./backgrounds"
import posableCharacters from "./posableCharacters"
// console.log("test", test) // zzz

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
