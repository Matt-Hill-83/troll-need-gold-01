import _get from "lodash.get"
import React from "react"
import cx from "classnames"

import Images from "../../images/images.js"
import MiniLocation from "../MiniLocation/MiniLocation.js"
import Utils from "../../Utils/Utils.js"
import useGlobalState from "../../../Context/useGlobalState.js"

import css from "./WorldViewer.module.scss"

const mainBackground = Images.backgrounds["hill01"]
const mainBackground2 = Images.backgrounds["planetGlorp03"]
const bookCoil01 = Images.backgrounds["bookCoil01"]
const mapBackground = Images.backgrounds["mapBackground11"]

export default function WorldViewer(props) {
  // console.log("WorldViewer-----------------------")

  const {
    globalState: {
      world: { gridDimensions, newGrid5 },
      activeScene,
    },
  } = useGlobalState()

  const renderSceneRows = () => {
    const grid = Utils.reCreateGridFromCondensedGrid({
      gridDimensions,
      newGrid5,
    })

    const miniLocationsGrid = grid.map((locationRow, rowIndex) => {
      const singleRow = createSingleRow({ locationRow, rowIndex })

      return (
        <div key={rowIndex} className={css.miniLocationsRow}>
          {singleRow}
        </div>
      )
    })

    return <div className={css.miniLocationsGrid}>{miniLocationsGrid}</div>
  }

  const createSingleRow = ({ locationRow, rowIndex }) => {
    return locationRow.map((scene, colIndex) => {
      return renderMiniLocation({ scene, colIndex, rowIndex })
    })
  }

  const renderMiniLocation = ({ colIndex = 0, rowIndex = 0, scene }) => {
    const { updateActiveScene } = props

    return <MiniLocation scene={scene} updateActiveScene={updateActiveScene} />
  }

  return (
    <>
      <img className={css.backgroundImage} src={mainBackground} alt={"bk"} />
      <img className={css.backgroundImage2} src={mainBackground2} alt={"bk"} />
      <div className={`${css.mapScroller}`}>
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
