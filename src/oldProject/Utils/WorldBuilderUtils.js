import _get from "lodash.get"

export default class WorldBuilderUtils {
  static getAllItemsInScene = ({ scene }) => {
    const allItems = []
    scene.frameSet.frames.forEach((item) => {
      allItems.push(...item.critters1, ...item.critters2)
    })
    return allItems
  }

  static getNewFrame = ({ characters, props = {} }) => {
    let allCharacters = []

    if (characters && characters.length) {
      const friendNames = characters.map((creature) => creature.name)
      allCharacters.push(...friendNames)
    }

    const creatureName0 = allCharacters[0] || "kat"
    const creatureName1 = allCharacters[1] || "liz2"

    const critters2 = []
    const critters1 = allCharacters.map((item) => {
      return {
        name: item,
      }
    })

    const newFrame = {
      critters1,
      critters2,
      faces: [
        { character: creatureName1, face: "happy" },
        { character: creatureName0, face: "happy" },
      ],
      dialog: [
        {
          character: creatureName0,
          text: ``,
        },
        {
          character: creatureName1,
          text: ``,
        },
      ],
    }
    props && Object.assign(newFrame, props)

    return newFrame
  }
}
