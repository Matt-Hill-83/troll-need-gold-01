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

  static _isDesiredRecipientHere = ({
    desiredRecipient,
    charactersInScene,
  }) => {
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
    const { pockets = {} } = questStatus

    const isDesiredItemInPocket = isDesiredItemInPocket({
      desiredItem,
      pockets,
    })

    const isDesiredRecipientHere = TopLevelUtils.isDesiredRecipientHere({
      desiredRecipient,
      charactersInScene,
    })

    return isDesiredRecipientHere && isDesiredItemInPocket
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
