import React, { useContext } from "react"
import _get from "lodash.get"

import FrameViewer from "../FrameViewer/FrameViewer.js"
import { myContext } from "../../../myProvider.js"

import css from "./WordPage.module.scss"

export default function WordPage(props) {
  const [localStorage, setLocalStorage] = useContext(myContext)

  const { activeScene, openQuestPicker, updateActiveScene } = props
  const { activeFrameIndex } = localStorage

  console.log("activeFrameIndex--------------WP", activeFrameIndex) // zzz
  const frameSet = activeScene.frameSet
  let frame

  // const missionToUnlockFramesAfter =
  //   _get(
  //     activeScene,
  //     "sceneConfig.triggers.newFrameSetConditions.currentMission"
  //   ) || 0

  const framesUnlocked = false

  if (framesUnlocked && frameSet && frameSet.frames2) {
    frame = frameSet && frameSet.frames2 && frameSet.frames2[activeFrameIndex]
  } else {
    frame = frameSet && frameSet.frames && frameSet.frames[activeFrameIndex]
  }

  let isLastFrame =
    frameSet.frames && activeFrameIndex >= frameSet.frames.length - 1

  return (
    <div className={css.textPage}>
      <FrameViewer
        frame={frame}
        isLastFrame={isLastFrame}
        // onClickNext={incrementFrameIndex}
        openQuestPicker={openQuestPicker}
        scene={activeScene}
        updateActiveScene={updateActiveScene}
        // forceUpdate={props.forceUpdate}
      />
    </div>
  )
}
