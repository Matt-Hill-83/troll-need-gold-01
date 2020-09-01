import _get from "lodash.get"

export default class TopLevelUtils {
  static getMissions = ({ questConfig }) => {
    return _get(questConfig, "subQuests[0].missions") || []
  }

  static getSceneFromId = ({ world, sceneId }) => {
    const scenesGrid = _get(world, "newGrid5") || []
    return scenesGrid.find((item) => item.id === sceneId)
  }

  static convertItemToObjFormat = ({ itemsArray = [] }) => {
    const newObj = {}
    itemsArray.forEach((item) => {
      const itemName = item.name
      const value = newObj[itemName]
      if (value) {
        value.ammount += item.amount
      } else {
        newObj[itemName] = { amount: item.amount }
      }
    })

    return newObj
  }

  static getTerminalScene = ({ start = true, world }) => {
    // const { world } = globalState
    if (!world) return null
    const scenesGrid = _get(world, "newGrid5") || []
    const endScene = scenesGrid.find((item) => item.id === world.endSceneId)
    const startScene = scenesGrid.find((item) => item.id === world.startSceneId)

    const terminalScene = start ? startScene : endScene

    const firstScene = scenesGrid[0]
    const lastScene = scenesGrid[scenesGrid.length - 1]

    // If no start and finish scenes are marked, choose some, so the program doesn't break
    return terminalScene || (start ? firstScene : lastScene)
  }
}
