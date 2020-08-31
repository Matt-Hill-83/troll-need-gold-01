import _get from "lodash.get"
import React, { useContext } from "react"
import cx from "classnames"

import Images from "../../images/images.js"
import MiniLocation from "../MiniLocation/MiniLocation.js"
import MissionConsole from "../MissionConsole/MissionConsole.js"
import Utils from "../../Utils/Utils.js"
import { myContext } from "../../../myProvider.js"

import css from "./WorldViewer.module.scss"

export default function WorldViewer(props) {
  console.log("") // zzz
  console.log("WorldViewer-----------------------") // zzz

  const { world } = props
  const [globalStorage, setGlobalStorage] = useContext(myContext)

  const renderSceneRows = () => {
    const { gridDimensions, newGrid5 } = world

    const grid = Utils.reCreateGridFromCondensedGrid({
      gridDimensions,
      newGrid5,
    })

    const miniLocationsGrid =
      grid &&
      grid.map((locationRow, rowIndex) => {
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
    const { activeScene, updateActiveScene } = props
    const isActive = scene.id === activeScene.id ? true : false

    const id = `${colIndex}-${rowIndex}`
    let onClick = () => {}
    if (scene.location.name !== "blank") {
      onClick = () => {
        console.log("onClick") // zzz
        updateActiveScene({
          sceneId: scene.id,
        })
      }
    }
    return (
      // This wrapper div seems to be required to make things render withought ghost divs being included in the list.
      <div onClick={onClick} className={css.minilocationWrapper}>
        <MiniLocation
          id={id}
          key={id}
          scene={scene}
          world={world}
          isActive={isActive}
          onClick={onClick}
        />
      </div>
    )
  }

  const key = new Date()
  const mainBackground = Images.backgrounds["hill01"]
  const mainBackground2 = Images.backgrounds["planetGlorp03"]
  const bookCoil01 = Images.backgrounds["bookCoil01"]
  const mapBackground = Images.backgrounds["mapBackground11"]

  const { showMissionConsole } = globalStorage
  console.log("showMissionConsole", showMissionConsole) // zzz
  return (
    <>
      <img className={css.backgroundImage} src={mainBackground} alt={"bk"} />
      <img className={css.backgroundImage2} src={mainBackground2} alt={"bk"} />
      <div className={`${css.mapScroller}`}>
        <div className={`${css.missionConsoleBox}`}>
          {showMissionConsole && <MissionConsole world={world} key={key} />}
        </div>
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
