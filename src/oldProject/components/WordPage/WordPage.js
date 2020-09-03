import React, { useContext } from "react"
import _get from "lodash.get"

import FrameViewer from "../FrameViewer/FrameViewer.js"
import { myContext } from "../../../myProvider.js"

import css from "./WordPage.module.scss"

export default function WordPage(props) {
  const [globalState] = useContext(myContext)

  const { activeScene, updateActiveScene } = props
  const { activeFrameIndex } = globalState

  const { frames = [] } = activeScene.frameSet
  const frame = frames[activeFrameIndex]

  let isLastFrame = activeFrameIndex >= frames.length - 1

  return (
    <div className={css.textPage}>
      <FrameViewer
        frame={frame}
        isLastFrame={isLastFrame}
        scene={activeScene}
        updateActiveScene={updateActiveScene}
      />
    </div>
  )
}
