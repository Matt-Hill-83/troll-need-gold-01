import _get from "lodash.get"
import TopLevelUtils from "./TopLevelUtils"

export default class QuestProgressUtils {
  static isDesiredRecipientHere = ({ desiredRecipient, charactersInScene }) => {
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
    pockets = {},
  }) => {
    const desiredItem = activeMission.item
    const desiredRecipient = QuestProgressUtils.getDesiredRecipient({
      activeMission,
    })

    const desiredItemIsInPocket = QuestProgressUtils.isDesiredItemInPocket({
      desiredItem,
      pockets,
    })

    const desiredRecipientIsHere = QuestProgressUtils.isDesiredRecipientHere({
      desiredRecipient,
      charactersInScene,
    })

    return desiredRecipientIsHere && desiredItemIsInPocket
  }

  static getDesiredRecipient = ({ activeMission }) => {
    if (!activeMission) {
      return null
    }
    return activeMission.recipient
  }

  static getActiveMission = ({ questConfig, questStatus }) => {
    const missions = TopLevelUtils.getMissions({ questConfig })
    const activeMissionIndex = questStatus.activeMissionIndex
    return missions[activeMissionIndex]
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

  static updatePocket = ({ foundItem, pockets }) => {
    const itemInPocket = pockets[foundItem.name]
    if (itemInPocket) {
      itemInPocket.amount = itemInPocket.amount + foundItem.amount
    } else {
      pockets[foundItem.name] = { amount: foundItem.amount }
    }

    return pockets
  }

  static findItem = ({ itemsInScene, questStatus, desiredItems = [] }) => {
    const { pockets = {} } = questStatus

    const foundItems = []
    desiredItems.forEach((desiredItem) => {
      const foundItem =
        itemsInScene.find((item) => {
          return item.name === (desiredItem && desiredItem.name)
        }) || null
      if (foundItem) {
        foundItems.push(foundItem)
      }
    })

    // TODO: I think I need to do this for each found item
    const foundItem = foundItems[0]
    if (!foundItem) {
      return null
    }

    if (!foundItem.amount) {
      foundItem.amount = 1
    }

    questStatus.pockets = QuestProgressUtils.updatePocket({
      foundItem,
      pockets,
    })

    return foundItem
  }
}
