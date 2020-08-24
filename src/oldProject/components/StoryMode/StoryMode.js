import _get from "lodash.get"
import React from "react"
import cx from "classnames"

import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"
import WordPage from "../WordPage/WordPage.js"
import WorldViewer from "../WorldViewer/WorldViewer.js"

import css from "./StoryMode.module.scss"

class StoryMode extends React.Component {
  render() {
    const {
      world,
      activeScene,
      updateActiveScene,
      openQuestPicker,
    } = this.props

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
            forceUpdate={this.props.forceUpdate}
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
export default StoryMode
