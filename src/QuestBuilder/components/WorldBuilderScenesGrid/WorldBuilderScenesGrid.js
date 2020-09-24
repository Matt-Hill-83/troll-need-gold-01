import _get from "lodash.get"
import React, { Component } from "react"

import worldBuilderStore from "../../Stores/WorldBuilderStore"
import SceneBuilder from "../../../oldProject/components/SceneBuilder/SceneBuilder"

import css from "./WorldBuilderScenesGrid.module.scss"

class WorldBuilderScenesGrid extends Component {
  state = { showJsonEditor: false }
  saveItems = async () => {
    await this.props.saveItems()
  }

  renderScenesGrid = () => {
    const scenesGrid = worldBuilderStore.getWorldBuilderScenesGrid()
    console.log("scenesGrid", scenesGrid) // zzz
    const gridRows = []

    scenesGrid.forEach((row) => {
      const gridRow = []
      row.forEach((scene) => {
        gridRow.push(this.renderCell({ scene }))
      })
      gridRows.push(<div className={css.gridRow}>{gridRow}</div>)
    })

    return <div className={css.main}>{gridRows}</div>
  }

  renderCell = ({ scene }) => {
    const { world, editFrameSet } = this.props

    return (
      <SceneBuilder
        scene={scene}
        world={world}
        editFrameSet={editFrameSet}
        saveItems={this.saveItems}
      />
    )
  }

  render() {
    return this.renderScenesGrid()
  }
}
export default WorldBuilderScenesGrid
