import React, { useContext } from "react"
import _get from "lodash.get"

import FrameViewer from "../FrameViewer/FrameViewer.js"
import { myContext } from "../../../myProvider.js"

import css from "./WordPage.module.scss"

export default function WordPage(props) {
  const [globalStorage, setGlobalStorage] = useContext(myContext)

  const { activeScene, openQuestPicker, updateActiveScene } = props
  const { activeFrameIndex } = globalStorage

  console.log("activeFrameIndex--------------WP", activeFrameIndex) // zzz
  const frameSet = activeScene.frameSet
  const frame = frameSet && frameSet.frames && frameSet.frames[activeFrameIndex]

  let isLastFrame =
    frameSet.frames && activeFrameIndex >= frameSet.frames.length - 1

  return (
    <div className={css.textPage}>
      <FrameViewer
        frame={frame}
        isLastFrame={isLastFrame}
        openQuestPicker={openQuestPicker}
        scene={activeScene}
        updateActiveScene={updateActiveScene}
      />
    </div>
  )
}
