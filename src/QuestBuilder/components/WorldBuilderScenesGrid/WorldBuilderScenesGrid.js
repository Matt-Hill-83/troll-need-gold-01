import React from "react"

import worldBuilderStore from "../../Stores/WorldBuilderStore"
import SceneBuilder from "../../../oldProject/components/SceneBuilder/SceneBuilder"

import css from "./WorldBuilderScenesGrid.module.scss"

export default function WorldBuilderScenesGrid(props) {
  const saveItems = async () => {
    await props.saveItems()
  }

  const renderScenesGrid = () => {
    const scenesGrid = worldBuilderStore.getWorldBuilderScenesGrid()
    const gridRows = []

    scenesGrid.forEach((row) => {
      const gridRow = []
      row.forEach((scene) => {
        gridRow.push(renderCell({ scene }))
      })
      gridRows.push(<div className={css.gridRow}>{gridRow}</div>)
    })

    return <div className={css.main}>{gridRows}</div>
  }

  const renderCell = ({ scene }) => {
    const { world, editFrameSet } = props

    return (
      <SceneBuilder
        scene={scene}
        world={world}
        editFrameSet={editFrameSet}
        saveItems={saveItems}
      />
    )
  }

  return renderScenesGrid()
}
