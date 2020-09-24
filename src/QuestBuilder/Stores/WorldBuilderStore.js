class WorldBuilderStore {
  worldBuilderGrid = []
  mapBuilderWorld = null

  // worldBuilderGrid is used to organize and act on the scenes during World
  // Building, but it is condensed into newGrid5 before saving to the db.
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
