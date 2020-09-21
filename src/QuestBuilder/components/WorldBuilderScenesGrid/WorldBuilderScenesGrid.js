import _get from "lodash.get"
import { Button, Icon } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import React, { Component } from "react"

import images from "../../../Common/images/images"
import CrudMachine from "../CrudMachine/CrudMachine"
import worldBuilderStore from "../../Stores/WorldBuilderStore"
import QuestVisibilityUtils from "../../../oldProject/Utils/QuestVisibilityUtils"
import ImageDisplay from "../../../Common/Components/ImageDisplay/ImageDisplay"

import css from "./WorldBuilderScenesGrid.module.scss"
class WorldBuilderScenesGrid extends Component {
  saveItems = async () => {
    console.log("WorldBuilderScenesGrid") // zzz
    console.log("saveItems") // zzz
    await this.props.saveItems()
  }

  generateRandomUnusedLocation = ({ location, locationNames }) => {
    const world = worldBuilderStore.getWorldBuilderWorld()
    const { newGrid5 } = world
    const usedNames = newGrid5.map((scene) => scene.location.name)

    const filteredLocationNames = locationNames.filter((name) => {
      return !usedNames.includes(name)
    })

    const randomName =
      filteredLocationNames[
        Math.floor(Math.random() * filteredLocationNames.length)
      ]

    location.name = randomName
    this.props.saveItems()
    // WorldBuilderUtils.updateMap({ world: this.props.world })
  }

  // TODO: on save, Crudmachine shoud return the mutated list and a callback should save it
  // in the appropriate place.
  // Right now, CrudMachine simply mutates a reference and calls a generic update.
  editFrameSet = ({ sceneToEdit }) => {
    this.props.editFrameSet && this.props.editFrameSet({ sceneToEdit })
  }

  itemRenderer = ({ item, className }) => {
    return <ImageDisplay className={className} item={item} />
  }

  renderScenesGrid = () => {
    const scenesGrid = worldBuilderStore.getWorldBuilderScenesGrid()
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

  renderRandomLocationGenerator = ({ scene }) => {
    const locationNames = Object.keys(images.locations)

    return (
      <div
        className={`${css.crudMachine} ${css.locationMachine}`}
        onClick={() =>
          this.generateRandomUnusedLocation({
            location: scene.location,
            locationNames,
          })
        }
      />
    )
  }

  renderCritters = ({ className, items }) => {
    const renderedItems = items.map((item) => {
      return this.itemRenderer({
        item,
        className,
      })
    })
    return <div className={css.critters1}>{renderedItems}</div>
  }

  getAllCritters1InScene = ({ scene }) => {
    const frames = _get(scene, "frameSet.frames") || []
    const allCritters = {}

    frames.forEach((frame) => {
      const { critters1 = [] } = frame

      critters1.forEach((item) => {
        if (item.name) {
          allCritters[item.name] = item
        }
      })
    })

    return Object.values(allCritters)
  }

  getAllCritters2InScene = ({ scene }) => {
    const frames = _get(scene, "frameSet.frames") || []
    const allCritters = {}

    frames.forEach((frame) => {
      const { critters2 = [] } = frame

      critters2.forEach((item) => {
        if (item.name) {
          allCritters[item.name] = item
        }
      })
    })

    return Object.values(allCritters)
  }

  renderCell = ({ scene }) => {
    const { world } = this.props
    const buttons = { add: false, trash: false, edit: true }
    const onSave = this.saveItems
    const locationImageSets = [images.all]
    const characterImageSets = [images.creatures]
    const locations = [scene.location]

    const backgroundColor = QuestVisibilityUtils.getSubQuestColor({
      world: world,
      sceneId: scene.id,
    })

    const allCritters1 = this.getAllCritters1InScene({ scene })
    const allCritters2 = this.getAllCritters2InScene({ scene })

    const locationCrudMachine = (
      <CrudMachine
        className={`${css.crudMachine} ${css.locationMachine}`}
        items={locations}
        buttons={buttons}
        itemRenderer={this.itemRenderer}
        saveItems={onSave}
        imageSets={locationImageSets}
      />
    )

    const locationPicker =
      scene.location.name === "blank"
        ? this.renderRandomLocationGenerator({ scene })
        : locationCrudMachine

    const characters = scene.characters
    const hideScene = scene.location && scene.location.name === "blank"

    return (
      // <div className={css.gridCell}>
      <div className={css.gridCell} style={backgroundColor}>
        {!hideScene && (
          <Button
            className={css.scenePropsButton}
            onClick={() => this.editFrameSet({ sceneToEdit: scene })}
          >
            <Icon icon={IconNames.SETTINGS} />
          </Button>
        )}
        <div className={css.column1}>
          {locationPicker}
          {false && !hideScene && (
            <CrudMachine
              className={`${css.crudMachine} ${css.itemBox} ${css.charactersMachine}`}
              items={characters}
              itemRenderer={this.itemRenderer}
              saveItems={onSave}
              imageSets={characterImageSets}
            />
          )}
        </div>
        {!hideScene && (
          <div className={css.crittersContainer}>
            {this.renderCritters({
              className: css.critterImage,
              items: allCritters1,
            })}
            {this.renderCritters({
              className: css.critterImage,
              items: allCritters2,
            })}
          </div>
        )}
      </div>
    )
  }

  render() {
    return this.renderScenesGrid()
  }
}
export default WorldBuilderScenesGrid
