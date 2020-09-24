import worldBuilderStore from "../Stores/WorldBuilderStore.js"
import { updateQuestInFirestore } from "../../app/firestore/firestoreService.js"
import Utils from "../../Common/Utils/Utils.js"

export default class WorldBuilderUtils {
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

  static createCondensedGridFromGrid = () => {
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
    const frames = scene?.frameSet?.frames || []
    frames.forEach((item) => {
      allItems.push(...item.critters1, ...item.critters2)
    })
    allItems.forEach((item) => {
      if (!item.id) {
        item.id = Utils.generateUuid()
      }
    })
  }

  static updateMap = async ({ newProps = {}, mapToUpdate }) => {
    console.log("updateMap-------------start")
    const map = mapToUpdate || worldBuilderStore.getWorldBuilderWorld()
    Object.assign(map, { ...newProps })

    map.newGrid5 = WorldBuilderUtils.createCondensedGridFromGrid()
    console.log("map.newGrid5[0]", map.newGrid5[0]) // zzz
    console.log("map.newGrid5", map.newGrid5) // zzz

    map.newGrid5.forEach((scene) => {
      this.addIdToAllItemsInScene({ scene })
      // if (!scene.frameSet?.frames[0]) {
      //   scene.frameSet = { frames: [WorldBuilderUtils.getNewFrame({})] }
      // }
    })

    delete map.grid
    console.log("map", map) // zzz
    await updateQuestInFirestore(map)
    console.log("updateMap------------end")
    return true
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
