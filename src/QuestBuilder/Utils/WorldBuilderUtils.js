import _get from "lodash.get"

import worldBuilderStore from "../Stores/WorldBuilderStore.js"
import { updateQuestInFirestore } from "../../app/firestore/firestoreService.js"
import Utils from "../../Common/Utils/Utils.js"

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

  static createCondensedGridFromGrid = ({ world }) => {
    // trim down the grid to just the non-blank scenes and make them accessible by id, instead of
    // defined by the 2 array position

    const condensedGrid = []
    const worldBuilderGrid = worldBuilderStore.getWorldBuilderScenesGrid()

    worldBuilderGrid.forEach((row) => {
      row.forEach((col) => {
        if (col.location.name && col.location.name !== "blank") {
          condensedGrid.push(col)
        }
      })
    })

    return condensedGrid
  }

  static addIdToAllItemsInScene = ({ scene }) => {
    const allItems = []
    scene.frameSet.frames.forEach((item) => {
      allItems.push(...item.critters1, ...item.critters2)
    })
    allItems.forEach((item) => {
      if (!item.id) {
        item.id = Utils.generateUuid()
      }
    })
  }

  static updateMap = async ({ newProps = {}, mapToUpdate }) => {
    console.log("updateMap-------------")
    console.log("updateMap-------------")
    const map = mapToUpdate || worldBuilderStore.getWorldBuilderWorld()
    Object.assign(map, { ...newProps })

    map.newGrid5 = WorldBuilderUtils.createCondensedGridFromGrid({})
    map.newGrid5.forEach((scene) => {
      this.addIdToAllItemsInScene({ scene })
    })

    delete map.grid
    await updateQuestInFirestore(map)
  }

  static getCritters1New = ({ frameConfig, sceneConfig }) => {
    let allCreatures = []
    if (frameConfig.creatures && frameConfig.creatures.length > 0) {
      allCreatures = [...frameConfig.creatures]
    } else {
      allCreatures =
        (sceneConfig.creatures &&
          sceneConfig.creatures.map((item) => item.name)) ||
        []
    }

    let allItems = []

    if (frameConfig.items && frameConfig.items.length > 0) {
      allItems = [...frameConfig.items]
    } else {
      allItems =
        (sceneConfig.items && sceneConfig.items.map((item) => item.name)) || []
    }

    allCreatures.push(...allItems)

    const filteredCharacters = allCreatures.filter((item) => {
      return item && ["liz2", "kat"].includes(item)
    })

    return filteredCharacters
  }

  static getCritters2New = ({ frameConfig, sceneConfig }) => {
    let allCreatures = []
    if (frameConfig.creatures && frameConfig.creatures.length > 0) {
      allCreatures = [...frameConfig.creatures]
    } else {
      allCreatures =
        (sceneConfig.creatures &&
          sceneConfig.creatures.map((item) => item.name)) ||
        []
    }

    let allItems = []

    if (frameConfig.items && frameConfig.items.length > 0) {
      allItems = [...frameConfig.items]
    } else {
      allItems =
        (sceneConfig.items && sceneConfig.items.map((item) => item.name)) || []
    }

    allCreatures.push(...allItems)

    const filteredCharacters = allCreatures.filter((item) => {
      return item && !["liz2", "kat"].includes(item)
    })

    return filteredCharacters
  }
}