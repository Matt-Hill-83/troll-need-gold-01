import _get from "lodash.get"
import React, { useContext } from "react"
import cx from "classnames"

import { myContext } from "../../../myProvider.js"
import MissionConsole from "../MissionConsole/MissionConsole.js"
import WorldViewer from "../WorldViewer/WorldViewer.js"
import FrameViewer from "../FrameViewer/FrameViewer.js"

import css from "./StoryMode.module.scss"

export default function StoryMode(props) {
  console.log("StoryMode------------------------>>>")
  const [globalState] = useContext(myContext)
  const { world, showMissionConsole } = globalState

  const { updateActiveScene } = props

  if (!world || !world.title) {
    return null
  }

  const renderWorldName = (
    <div tabIndex={0} className={css.worldTitle}>
      <span> {world.title} </span>
    </div>
  )

  return (
    <div className={`${css.main}`}>
      {renderWorldName}
      <div className={`${css.missionConsoleBox}`}>
        {showMissionConsole && <MissionConsole world={world} />}
      </div>
      <div className={`${css.halfPage} ${css.leftHalf}`}>
        <FrameViewer />
      </div>

      <div className={`${css.halfPage} ${css.rightHalf}`}>
        <WorldViewer updateActiveScene={updateActiveScene} />
      </div>
    </div>
  )
}
