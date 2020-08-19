import React from "react"
import _get from "lodash.get"
import { observer } from "mobx-react"
import { toJS } from "mobx"

import FrameViewer from "../FrameViewer/FrameViewer.js"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"

import css from "./WordPage.module.scss"
import Utils from "../../Utils/Utils.js"

class WordPage extends React.Component {
  render() {
    const { activeScene, openQuestPicker, updateActiveScene } = this.props
    const activeFrameIndex = localStateStore.getActiveFrameIndex()
    const frameSet = activeScene.frameSet
    let frame

    const questStatus = localStateStore.getQuestStatus()

    const missionToUnlockFramesAfter =
      _get(
        activeScene,
        "sceneConfig.triggers.newFrameSetConditions.currentMission"
      ) || 0

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
          onClickNext={this.incrementFrameIndex}
          openQuestPicker={openQuestPicker}
          scene={activeScene}
          updateActiveScene={updateActiveScene}
        />
      </div>
    )
  }
}
export default observer(WordPage)
