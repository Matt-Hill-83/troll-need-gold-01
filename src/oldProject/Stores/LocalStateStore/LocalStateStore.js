import _get from "lodash.get"
import Utils from "../../Utils/Utils"
import QuestStatusUtils from "../../Utils/QuestStatusUtils"
import Constants from "../../Utils/Constants/Constants"

class LocalStateStore {
  activeFrameIndex = 0
  activeWorldId = null
  activeSceneId = null
  defaultWorldId = null
  showBookPicker = false
  showWorldBuilder = false

  // questStatus = { ...Constants.defaultQuestStatus }

  // getShowWorldBuilder = () => this.showWorldBuilder
  // setShowWorldBuilder = (showWorldBuilder) => {
  //   this.showWorldBuilder = showWorldBuilder
  // }

  // TODO: clean up all these functions
  // TODO: clean up all these functions
  // TODO: clean up all these functions
  // TODO: clean up all these functions
  // setQuestStatus = (questStatus) => {
  //   this.questStatus = questStatus
  // }

  // getDefaultQuestStatus = () => Constants.getDefaultQuestStatus()

  // getDefaultWorldId = () => this.defaultWorldId
  // setDefaultWorldId = (defaultWorldId) => {
  //   console.log("defaultWorldId", defaultWorldId) // zzz
  //   this.defaultWorldId = defaultWorldId
  // }

  // getHiddenScenes = () => this.hiddenScenes
  // setHiddenScenes = (hiddenScenes) => {
  //   this.hiddenScenes = hiddenScenes
  // }

  // getVisitedScenes = () => this.questStatus.visitedScenes
  // setVisitedScenes = (visitedScenes) => {
  //   const questStatus = this.questStatus
  //   questStatus.visitedScenes = visitedScenes
  //   this.questStatus = questStatus
  // }

  // getQuestItems = () => {
  //   const questItems = []
  //   this.questStatus.questConfig.missions.forEach((mission) => {
  //     questItems.push(...mission.items)
  //   })
  //   return questItems
  // }

  // getQuestRewards = () => {
  //   const questItems = []
  //   this.questStatus.questConfig.missions.forEach((mission) => {
  //     questItems.push(...mission.rewards)
  //   })
  //   return questItems
  // }

  // getShowBookPicker = () => this.showBookPicker
  // setShowBookPicker = (showBookPicker) => {
  //   this.showBookPicker = showBookPicker
  // }

  // getActiveWorld = () => {
  //   const world = Utils.getWorldFromId({ id: this.activeWorldId })
  //   return world
  // }

  // getActiveWorldGrid = () => {
  //   const map = Utils.getWorldFromId({ id: this.activeWorldId })
  //   return map.newGrid5 || []
  // }

  getIsProdRelease = () => this.isProdRelease
  setIsProdRelease = (isProdRelease) => {
    this.isProdRelease = isProdRelease
  }

  getActiveFrameIndex = () => this.activeFrameIndex
  setActiveFrameIndex = (activeFrameIndex) => {
    this.activeFrameIndex = activeFrameIndex
  }

  getFirstFrame = ({ activeScene }) => {
    // const activeScene = localStateStore.getActiveScene()
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
    this.setActiveFrameIndex(newIndex)
  }

  getActiveSceneId = () => this.activeSceneId
  setActiveSceneId = (activeSceneId) => {
    this.activeSceneId = activeSceneId
  }

  getActiveScene = ({ world, activeSceneId }) => {
    if (world && activeSceneId) {
      const scenesGrid = _get(world, "newGrid5") || []
      const activeScene = scenesGrid.find((item) => item.id === activeSceneId)
      return activeScene
    }
  }
}

const localStateStore = new LocalStateStore()
export default localStateStore
