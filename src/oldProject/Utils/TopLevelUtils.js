import _get from "lodash.get"

export default class TopLevelUtils {
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

  static getDesiredItem = ({ activeMission }) => {
    if (!activeMission) {
      return null
    }
    return activeMission.item
  }

  static getTerminalScene = ({ start = true, world }) => {
    // const { world } = localStorage
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

  static isDesiredRecipientHere = ({ desiredRecipient, charactersInScene }) => {
    console.log("desiredRecipient", desiredRecipient) // zzz
    console.log("charactersInScene", charactersInScene) // zzz
    const characterNames = charactersInScene.map((item) => item.name)
    return characterNames.includes(desiredRecipient.name)
  }

  static isDesiredItemInPocket = ({ desiredItem, pockets }) => {
    const itemsInPockets = Object.keys(pockets)
    return itemsInPockets.includes(desiredItem.name)
  }

  static completeMission = ({
    charactersInScene,
    activeMission,
    questStatus,
  }) => {
    const desiredItem = TopLevelUtils.getDesiredItem({ activeMission })
    const desiredRecipient = TopLevelUtils.getDesiredRecipient({
      activeMission,
    })

    console.log("desiredRecipient", desiredRecipient) // zzz
    console.log("desiredItem", desiredItem) // zzz

    const { pockets = {} } = questStatus

    const desiredItemIsInPocket = TopLevelUtils.isDesiredItemInPocket({
      desiredItem,
      pockets,
    })

    const desiredRecipientIsHere = TopLevelUtils.isDesiredRecipientHere({
      desiredRecipient,
      charactersInScene,
    })

    console.log("desiredRecipientIsHere", desiredRecipientIsHere) // zzz
    console.log("desiredItemIsInPocket", desiredItemIsInPocket) // zzz

    return desiredRecipientIsHere && desiredItemIsInPocket
  }

  static getDesiredItem = ({ activeMission }) => {
    if (!activeMission) {
      return null
    }
    return activeMission.item
  }

  static getDesiredRecipient = ({ activeMission }) => {
    if (!activeMission) {
      return null
    }
    return activeMission.recipient
  }

  static getMissions = ({ questConfig }) => {
    return _get(questConfig, "subQuests[0].missions") || []
  }

  static removeItemFromDesiredItems = ({ itemToRemove, questStatus }) => {
    if (!itemToRemove) {
      return
    }

    const modifiedArray = questStatus.desiredItems.filter((item) => {
      return item.name !== itemToRemove.name
    })

    questStatus.desiredItems.length = 0
    questStatus.desiredItems.push(...modifiedArray)
    return questStatus
  }

  // TODO: Use this to add gold from user data to current pockets
  static addToPockets = ({ newPockets, questStatus }) => {
    const existingPockets = questStatus.pockets || {}
    for (const newPocketName in newPockets) {
      const newPocket = newPockets[newPocketName]
      const existingItemWithSameName = existingPockets[newPocketName]

      if (existingItemWithSameName) {
        existingItemWithSameName.amount =
          existingItemWithSameName.amount + newPocket.amount
      } else {
        existingPockets[newPocketName] = {
          amount: newPocket.amount,
        }
      }
    }
    return existingPockets
  }
}
