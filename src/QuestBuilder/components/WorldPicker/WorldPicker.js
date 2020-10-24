import React, { Component } from "react"

import {
  Button,
  Icon,
  Menu,
  MenuItem,
  Popover,
  Position,
} from "@blueprintjs/core"

import { IconNames } from "@blueprintjs/icons"

import Utils from "../../../Common/Utils/Utils"

import css from "./WorldPicker.module.scss"
import { deleteQuestInFirestore } from "../../../app/firestore/firestoreService"

class WorldPicker extends Component {
  state = { selectedMap: this.props.initialValue || "Select Map" }

  changeMap = ({ index, mapId }) => {
    const { maps, onChangeWorld } = this.props
    const map = maps.find((map) => map.id === mapId)

    const mapName = map?.title || ""

    onChangeWorld({ index, mapId })
    this.setState({ selectedMap: mapName })
  }

  onDeleteMap = async ({ map }) => {
    if (this._deleting) return
    this._deleting = true
    try {
      console.log("deleting")
      await deleteQuestInFirestore(map.id)
      this._deleting = false
    } catch (err) {
      this._deleting = false
    }
  }

  render() {
    const { showDelete } = this.props
    const { selectedMap } = this.state
    const savedMaps = this.props.maps

    const filteredMaps = savedMaps

    if (!filteredMaps[0]) {
      return null
    }

    const sortedMaps = Utils.sortDataByNestedKey({
      data: filteredMaps,
      keys: ["title"],
      order: "ASC",
    })
    const mapList = sortedMaps.map((map, index) => {
      const { id, name, title } = map

      const text = (
        <span className={css.mapPickerRow}>
          {`${title}`}
          <div className={css.mapPickerRowButtons}>
            <span xxxclassName={css.mapPickerButton}>{`${name}  ---  `}</span>

            {showDelete && (
              <span onClick={() => this.onDeleteMap({ map })}>
                <Icon icon={IconNames.TRASH} />
              </span>
            )}
          </div>
        </span>
      )

      return (
        <MenuItem
          onClick={() => this.changeMap({ index, mapId: id })}
          text={text}
        />
      )
    })

    const renderedMapList = <Menu>{mapList}</Menu>

    const worldPicker = (
      <Popover
        className={css.main}
        popoverClassName={css.popoverClassName}
        content={renderedMapList}
        position={Position.BOTTOM}
      >
        <Button className={css.worldPickerButton}>
          {selectedMap}
          <Icon icon="caret-down" />
        </Button>
      </Popover>
    )

    return worldPicker
  }
}
export default WorldPicker
