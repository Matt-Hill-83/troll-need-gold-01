import _get from "lodash.get"
import React from "react"
import cx from "classnames"

import WordPage from "../WordPage/WordPage.js"
import WorldViewer from "../WorldViewer/WorldViewer.js"

import css from "./StoryMode.module.scss"

export default function StoryMode(props) {
  console.log("") // zzz
  console.log("StoryMode------------------------>>>")
  const { world, activeScene, updateActiveScene, openQuestPicker } = props

  console.log("activeScene---------------StoryMode", activeScene) // zzz
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
      <div className={`${css.halfPage} ${css.leftHalf}`}>
        <WordPage
          updateActiveScene={updateActiveScene}
          activeScene={activeScene}
          openQuestPicker={openQuestPicker}
        />
      </div>

      <div className={`${css.halfPage} ${css.rightHalf}`}>
        <WorldViewer
          updateActiveScene={updateActiveScene}
          activeScene={activeScene}
          world={world}
        />
      </div>
    </div>
  )
}
