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
import { maps } from "../../Stores/InitStores"
import Utils from "../../Utils/Utils"

import css from "./WorldPicker.module.scss"
import { Checkbox } from "material-ui"

class WorldPicker extends Component {
  state = { selectedMap: this.props.initialValue || "Select Map" }

  changeMap = ({ index, mapId }) => {
    const { onChangeWorld } = this.props
    const map = Utils.getWorldFromId({ id: mapId })

    const mapName = map ? map && map.title : ""

    onChangeWorld({ index, mapId })
    this.setState({ selectedMap: mapName })
  }

  onDeleteMap = async ({ map }) => {
    if (this._deleting) return
    this._deleting = true
    try {
      await map.delete()
      this._deleting = false
    } catch (err) {
      this._deleting = false
    }
  }

  render() {
    const { showreleased, showReleased, showDelete } = this.props
    const { selectedMap } = this.state
    const savedMaps = Utils.getItemsFromDbObj({ dbList: maps })

    const filteredMaps = showReleased
      ? savedMaps
      : savedMaps.filter((map) => map.released)

    if (!filteredMaps[0]) {
      return null
    }

    const sortedMaps = Utils.sortDataByNestedKey({
      data: filteredMaps,
      keys: ["data", "title"],
      order: "ASC",
    })

    const mapList = sortedMaps.map((map, index) => {
      const { id } = map
      const { name, title, released, released } = map
      const { updateIsReleasedProperty, updatereleased } = this.props

      const text = (
        <span className={css.mapPickerRow}>
          {`${title}`}
          {/* {`${description}`} */}
          {/* {`map ${name}: ${title}`} */}
          {/* {`id: ${id}`} */}
          <div className={css.mapPickerRowButtons}>
            <span className={css.mapPickerButton}>{`${name}  ---  `}</span>
            {showReleased && (
              <span className={css.mapPickerButton}>
                Released
                <Checkbox
                  onClick={() => updateIsReleasedProperty({ id })}
                  checked={released}
                />
              </span>
            )}
            {showreleased && (
              <span className={css.mapPickerButton}>
                To Prod
                <Checkbox
                  onClick={() => updatereleased({ id })}
                  checked={released}
                />
              </span>
            )}
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
