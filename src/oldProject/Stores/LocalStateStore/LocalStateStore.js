import _get from "lodash.get"
import Utils from "../../Utils/Utils"
import QuestStatusUtils from "../../Utils/QuestStatusUtils"
import Constants from "../../Utils/Constants/Constants"

class LocalStateStore {
  activeFrameIndex = 0
  activeMapId = null
  activeSceneId = null
  defaultWorldId = null
  showBookPicker = false
  showWorldBuilder = false

  // _defaultQuestStatus = {
  //   visitedScenes: [],
  //   completedMissions: [],
  //   lockedScenes: [],
  //   hiddenScenes: [],
  //   cloudedScenes: [],
  //   activeSubQuestIndex: 0,
  //   activeMissionIndex: 0,
  //   pockets: { gold: { amount: 0 } },
  //   desiredItems: [],
  //   questConfig: {
  //     missions: [],
  //   },
  // }

  questStatus = { ...Constants.defaultQuestStatus }

  getQuestNames = () => this.questStatus.quests.map((item) => item.name)

  getShowWorldBuilder = () => this.showWorldBuilder
  setShowWorldBuilder = (showWorldBuilder) => {
    this.showWorldBuilder = showWorldBuilder
  }

  getQuestStatus = () => this.questStatus
  setQuestStatus = (questStatus) => {
    this.questStatus = questStatus
  }

  getDefaultQuestStatus = () => Constants.defaultQuestStatus

  getDefaultWorldId = () => this.defaultWorldId
  setDefaultWorldId = (defaultWorldId) => {
    console.log("defaultWorldId", defaultWorldId) // zzz
    this.defaultWorldId = defaultWorldId
  }

  getHiddenScenes = () => this.hiddenScenes
  setHiddenScenes = (hiddenScenes) => {
    this.hiddenScenes = hiddenScenes
  }

  getLockedScenes = () => this.questStatus.lockedScenes || []
  setLockedScenes = (lockedScenes) => {
    this.lockedScenes = lockedScenes
  }

  // is this obsolete?
  setUnlockedSubQuests = (unlockedSubQuests) => {
    this.unlockedSubQuests = unlockedSubQuests
  }

  getCompletedMissions = () => this.questStatus.completedMissions
  setCompletedMissions = (completedMissions) => {
    const questStatus = this.questStatus
    questStatus.completedMissions = completedMissions
    this.questStatus = questStatus
  }

  // addCompletedMission = (completedMission) => {
  //   const questStatus = this.questStatus
  //   if (!questStatus.completedMissions) {
  //     questStatus.completedMissions = []
  //   }
  //   questStatus.completedMissions.push(completedMission)
  //   this.questStatus = questStatus
  // }

  ///////////////
  ///////////////
  ///////////////
  getVisitedScenes = () => this.questStatus.visitedScenes
  setVisitedScenes = (visitedScenes) => {
    const questStatus = this.questStatus
    questStatus.visitedScenes = visitedScenes
    this.questStatus = questStatus
  }

  clearVisitedScenes = () => {
    const questStatus = this.questStatus
    if (!questStatus.visitedScenes) {
      questStatus.visitedScenes = []
    }
    questStatus.visitedScenes.length = 0
    this.questStatus = questStatus
  }

  addVisitedScenes = (sceneId) => {
    const questStatus = this.questStatus
    if (!questStatus.visitedScenes) {
      questStatus.visitedScenes = []
    }
    questStatus.visitedScenes.push(sceneId)
    this.questStatus = questStatus
  }

  isVisitedScene = (sceneId) => {
    return this.questStatus.visitedScenes.some((scene) => scene === sceneId)
  }

  convertItemToObjFormat = ({ itemsArray = [] }) => {
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

  setQuestStatusToDefault = () => {
    this.questStatus = { ...Constants.defaultQuestStatus }
  }

  getDesiredItem = () => {
    const activeMission = this.getActiveMission()
    if (!activeMission) {
      return null
    }
    return activeMission.item
  }

  getDesiredItems = () => {
    return this.questStatus.desiredItems
  }

  removeItemFromDesiredItems = ({ itemToRemove }) => {
    if (!itemToRemove) {
      return
    }

    const modifiedArray = this.questStatus.desiredItems.filter((item) => {
      return item.name !== itemToRemove.name
    })

    this.questStatus.desiredItems.length = 0
    this.questStatus.desiredItems.push(...modifiedArray)
  }

  getActiveMission = () => {
    const world = localStateStore.getActiveWorld()
    console.log("world", world) // zzz
    const missions = QuestStatusUtils.getActiveSubQuestMissions({ world })
    return missions[this.questStatus.activeMissionIndex] || null
  }

  getDesiredRecipient = () => {
    const activeMission = this.getActiveMission()
    if (!activeMission) {
      return null
    }
    return activeMission.recipient
  }

  addToPockets = ({ newPockets }) => {
    const existingPockets = this.getQuestStatus().pockets || {}
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

  updateQuestState = ({ itemsInScene, charactersInScene }) => {
    const questStatus = this.questStatus

    if (!questStatus.questConfig) {
      return {}
    }

    const world = localStateStore.getActiveWorld()
    const missions = QuestStatusUtils.getActiveSubQuestMissions({ world })
    const { pockets, completedMissions } = questStatus
    if (!questStatus.completedMissions) {
      questStatus.completedMissions = []
    }

    if (!missions) {
      return {}
    }

    const activeMissionIndex = questStatus.activeMissionIndex
    const activeMission = missions[activeMissionIndex] || null
    if (!activeMission) {
      return {}
    }

    const isMissionCompleted = this._completeMission({
      charactersInScene,
      questStatus,
    })

    if (isMissionCompleted) {
      completedMissions.push(activeMissionIndex)

      // remove item from pocket
      const desiredItem = this.getDesiredItem()
      delete pockets[desiredItem.name]
      activeMission.completed = true
      questStatus.activeMissionIndex++

      const newPockets = this.convertItemToObjFormat({
        itemsArray: activeMission.rewards,
      })

      this.addToPockets({ newPockets })
      this.setQuestStatus(questStatus)
    }

    const foundItem = this._findItem({ itemsInScene })
    this.removeItemFromDesiredItems({ itemToRemove: foundItem })

    return {
      foundItem,
      completedMission: isMissionCompleted ? activeMission : false,
    }
  }

  _isDesiredItemInPocket = ({ desiredItem, pockets }) => {
    const itemsInPockets = Object.keys(pockets)
    return itemsInPockets.includes(desiredItem.name)
  }

  _isDesiredRecipientHere = ({ desiredRecipient, charactersInScene }) => {
    const characterNames = charactersInScene.map((item) => item.name)

    return characterNames.includes(desiredRecipient.name)
  }

  _completeMission = ({ charactersInScene }) => {
    const desiredItem = this.getDesiredItem()

    const desiredRecipient = this.getDesiredRecipient({})

    const { pockets = {} } = this.questStatus

    const isDesiredItemInPocket = this._isDesiredItemInPocket({
      desiredItem,
      pockets,
    })

    const isDesiredRecipientHere = this._isDesiredRecipientHere({
      desiredRecipient,
      charactersInScene,
    })

    return isDesiredRecipientHere && isDesiredItemInPocket
  }

  _findItem = ({ itemsInScene }) => {
    const desiredItems = this.getDesiredItems() || []
    const questStatus = this.questStatus

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
    const foundItem = foundItems[0]
    if (!foundItem) {
      return null
    }

    if (!foundItem.amount) {
      foundItem.amount = 1
    }

    const itemsInPockets = pockets[foundItem.name]

    if (itemsInPockets) {
      itemsInPockets.amount = itemsInPockets.amount + foundItem.amount
    } else {
      pockets[foundItem.name] = { amount: foundItem.amount }
    }

    this.setQuestStatus(questStatus)
    return foundItem
  }

  getQuestItems = () => {
    const questItems = []
    this.questStatus.questConfig.missions.forEach((mission) => {
      questItems.push(...mission.items)
    })
    return questItems
  }

  getQuestRewards = () => {
    const questItems = []
    this.questStatus.questConfig.missions.forEach((mission) => {
      questItems.push(...mission.rewards)
    })
    return questItems
  }

  getShowBookPicker = () => this.showBookPicker
  setShowBookPicker = (showBookPicker) => {
    this.showBookPicker = showBookPicker
  }

  getActiveWorld = () => {
    const world = Utils.getWorldFromId({ id: this.activeMapId })
    return world
  }

  getActiveWorldGrid = () => {
    const map = Utils.getWorldFromId({ id: this.activeMapId })
    return map.newGrid5 || []
  }

  getActiveWorldId = () => this.activeMapId
  setActiveMapId = (activeMapId) => {
    this.activeMapId = activeMapId
  }

  getIsProdRelease = () => this.isProdRelease
  setIsProdRelease = (isProdRelease) => {
    this.isProdRelease = isProdRelease
  }

  getActiveFrameIndex = () => this.activeFrameIndex
  setActiveFrameIndex = (activeFrameIndex) => {
    this.activeFrameIndex = activeFrameIndex
  }

  getFirstFrame = () => {
    const activeScene = localStateStore.getActiveScene()
    const { frameSet } = activeScene
    const firstFrame = _get(frameSet, "frames[0]")
    return firstFrame
  }

  incrementActiveFrameIndex = (reset) => {
    let newIndex

    if (reset) {
      newIndex = 0
    } else {
      newIndex = this.getActiveFrameIndex() + 1
    }
    console.log("this.activeFrameIndex", this.activeFrameIndex) // zzz
    this.setActiveFrameIndex(newIndex)
    console.log("this.activeFrameIndex------ 2", this.activeFrameIndex) // zzz
  }

  getActiveSceneId = () => this.activeSceneId
  setActiveSceneId = (activeSceneId) => {
    this.activeSceneId = activeSceneId
  }

  getActiveScene = () => {
    const activeSceneId = this.getActiveSceneId()
    console.log("activeSceneId", activeSceneId) // zzz
    const scenesGrid = this.getActiveWorldGrid()
    console.log("scenesGrid", scenesGrid) // zzz
    const activeScene = scenesGrid.find((item) => item.id === activeSceneId)
    return activeScene
  }
}

const localStateStore = new LocalStateStore()
export default localStateStore
