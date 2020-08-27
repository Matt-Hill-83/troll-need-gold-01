import _get from "lodash.get"

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
