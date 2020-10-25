import React from "react"
import { IconNames } from "@blueprintjs/icons"
import cx from "classnames"
import { Button } from "@blueprintjs/core"

import Images from "../../../Common/Images/images"
import MiniLocation from "../MiniLocation/MiniLocation.js"
import Utils from "../../../Common/Utils/Utils"
import useGlobalState from "../../../Context/useGlobalState.js"

import css from "./WorldViewer.module.scss"

const bookCoil01 = Images.backgrounds["bookCoil01"]
const mapBackground = Images.backgrounds["mapBackground11"]

export default function WorldViewer(props) {
  const { updateActiveScene } = props

  const {
    globalState: {
      world: { gridDimensions, newGrid5 },
      showMap,
    },
    setGlobalStateProps,
  } = useGlobalState()

  const renderSceneRows = () => {
    const grid = Utils.reCreateGridFromCondensedGrid({
      gridDimensions,
      newGrid5,
    })

    const miniLocationsGrid = grid.map((locationRow, rowIndex) => {
      return (
        <div key={rowIndex} className={css.miniLocationsRow}>
          {createSingleRow({ locationRow })}
        </div>
      )
    })

    return <div className={css.miniLocationsGrid}>{miniLocationsGrid}</div>
  }

  const createSingleRow = ({ locationRow }) => {
    return locationRow.map((scene) => {
      return (
        <MiniLocation scene={scene} updateActiveScene={updateActiveScene} />
      )
    })
  }

  const toggleMap = () => {
    setGlobalStateProps({
      showMap: !showMap,
    })
  }

  return (
    <>
      <div
        className={cx(css.mapScroller, {
          [css.mapScrollerSmall]: showMap,
        })}
      >
        <Button
          className={cx({ [css.toggleMapButton]: true })}
          icon={showMap ? IconNames.COLLAPSE_ALL : IconNames.EXPAND_ALL}
          onClick={() => toggleMap()}
        />
        <div className={`${css.innerMapScroller}`}>
          <img
            className={css.mapBackground}
            src={mapBackground}
            alt={"imagex"}
          />

          {renderSceneRows()}
        </div>
      </div>
      <img className={css.bookCoil01} src={bookCoil01} alt={"bk"} />
    </>
  )
}
