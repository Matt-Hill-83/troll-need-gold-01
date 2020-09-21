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

const worldBuilderStore = new WorldBuilderStore()
export default worldBuilderStore
