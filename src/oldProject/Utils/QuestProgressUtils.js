import _get from "lodash.get"
import TopLevelUtils from "./TopLevelUtils"

export default class QuestProgressUtils {
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
    const desiredItem = activeMission.item
    const desiredRecipient = QuestProgressUtils.getDesiredRecipient({
      activeMission,
    })

    console.log("desiredRecipient", desiredRecipient) // zzz
    console.log("desiredItem", desiredItem) // zzz

    const { pockets = {} } = questStatus

    const desiredItemIsInPocket = QuestProgressUtils.isDesiredItemInPocket({
      desiredItem,
      pockets,
    })

    const desiredRecipientIsHere = QuestProgressUtils.isDesiredRecipientHere({
      desiredRecipient,
      charactersInScene,
    })

    console.log("desiredRecipientIsHere", desiredRecipientIsHere) // zzz
    console.log("desiredItemIsInPocket", desiredItemIsInPocket) // zzz

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
}
