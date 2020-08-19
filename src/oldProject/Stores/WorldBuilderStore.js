import { decorate, observable, toJS } from "mobx"
import _get from "lodash.get"

class WorldBuilderStore {
  worldBuilderGrid = []
  mapBuilderWorld = null

  getWorldBuilderScenesGrid = () => this.worldBuilderGrid
  setWorldBuilderScenesGrid = (worldBuilderGrid) => {
    this.worldBuilderGrid = worldBuilderGrid
  }

  getWorldBuilderWorld = () => this.mapBuilderWorld
  setWorldBuilderWorld = (mapBuilderWorld) => {
    this.mapBuilderWorld = mapBuilderWorld
  }

  getShowWorldBuilder = () => this.showWorldBuilder
  setShowWorldBuilder = (showWorldBuilder) => {
    this.showWorldBuilder = showWorldBuilder
  }
}

decorate(WorldBuilderStore, {
  worldBuilderGrid: observable,
  mapBuilderWorld: observable,
})

const worldBuilderStore = new WorldBuilderStore()
export default worldBuilderStore
