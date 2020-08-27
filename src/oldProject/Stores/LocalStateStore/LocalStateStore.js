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
