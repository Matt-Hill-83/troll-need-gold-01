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
}

const localStateStore = new LocalStateStore()
export default localStateStore
