import React, { useContext } from "react"

import { myContext } from "../../../myProvider.js"
import MissionConsole from "../MissionConsole/MissionConsole.js"
import WorldViewer from "../WorldViewer/WorldViewer.js"
import FrameViewer from "../FrameViewer/FrameViewer.js"

import css from "./StoryMode.module.scss"
import images from "../../../Common/Images/images.js"

export default function StoryMode(props) {
  const [globalState] = useContext(myContext)
  const { world, showMissionConsole } = globalState

  const { updateActiveScene } = props

  if (!world || !world.title) {
    return <div>no world</div>
  }

  const renderWorldName = (
    <div tabIndex={0} className={css.worldTitle}>
      <span> {world.title} </span>
    </div>
  )

  const mainBackground = images.backgrounds["hill01"]
  const mainBackground2 = images.backgrounds["planetGlorp03"]

  return (
    <div className={`${css.main}`}>
      <img className={css.backgroundImage} src={mainBackground} alt={"bk"} />
      <img className={css.backgroundImage2} src={mainBackground2} alt={"bk"} />
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
