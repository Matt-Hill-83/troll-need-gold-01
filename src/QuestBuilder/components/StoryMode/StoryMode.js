import _get from "lodash.get"
import { observer } from "mobx-react"
import { toJS } from "mobx"
import React from "react"
import cx from "classnames"

import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"
import WordPage from "../WordPage/WordPage.js"
import WorldViewer from "../WorldViewer/WorldViewer.js"

import css from "./StoryMode.module.scss"

class StoryMode extends React.Component {
  render() {
    const { activeScene, updateActiveScene, openQuestPicker } = this.props
    const activeWorld = localStateStore.getActiveWorld()

    if (!activeWorld || !activeWorld.data || !activeWorld.data.title) {
      return null
    }

    const renderWorldName = (
      <div tabIndex={0} className={css.worldTitle}>
        <span> {activeWorld.data.title} </span>
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
          />
        </div>
      </div>
    )
  }
}
export default observer(StoryMode)
