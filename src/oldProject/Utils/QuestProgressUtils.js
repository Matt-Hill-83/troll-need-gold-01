import TopLevelUtils from "./TopLevelUtils"
import Utils from "../../Common/Utils/Utils"

export default class QuestProgressUtils {
  static isDesiredRecipientHere = ({ desiredRecipient, charactersInScene }) => {
    const characterNames = charactersInScene.map((item) => item.name)
    return characterNames.includes(desiredRecipient.name)
  }

  static isBookCompleted = ({ chapters, completedQuests }) => {
    return chapters.every((chapter) => {
      return completedQuests.includes(chapter)
    })
  }

  static getTotalGoldInQuest = ({ missions }) => {
    let totalGold = 0
    missions.forEach((item) => {
      totalGold += item.rewards[0].amount
    })

    return totalGold
  }

  static getTotalGoldInAllQuests = ({ worlds, completedQuests }) => {
    let earnedGold = 0
    let allGoldInQuests = 0

    worlds.forEach((world) => {
      const { questConfig = {} } = world
      const missions = TopLevelUtils.getMissions({ questConfig })
      const goldInQuest = QuestProgressUtils.getTotalGoldInQuest({ missions })
      allGoldInQuests += goldInQuest

      const questId = world.id
      const questCompleted = Utils.isQuestCompleted({
        questId,
        completedQuests,
      })
      if (questCompleted) {
        earnedGold += goldInQuest
      }
    })
    return { earnedGold, allGoldInQuests }
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

  static areAllMissionsCompleted = ({ missions, completedMissions }) => {
    return missions.length === completedMissions.length
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
