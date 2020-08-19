import React, { Component } from "react"

import cx from "classnames"

// import { toJS } from "mobx"
import _get from "lodash.get"
import css from "./MissionConsole.module.scss"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore"
import ImageDisplay from "../ImageDisplay/ImageDisplay"
import MiniTable2 from "../MiniTable2/MiniTable2"
import QuestStatusUtils from "../../Utils/QuestStatusUtils"

class MissionConsole extends Component {
  state = {}

  renderPocketItems = ({ goldOnly = false }) => {
    const questStatus = localStateStore.getQuestStatus()
    const items = _get(questStatus, "pockets") || null

    const itemKeys = Object.keys(items)
    if (itemKeys.length === 0 || !items) {
      return null
    }

    let filteredItemKeys

    const prizes = ["gold", "dress", "trophy"]
    if (goldOnly) {
      filteredItemKeys = itemKeys.filter((item) => prizes.includes(item))
    } else {
      filteredItemKeys = itemKeys.filter((item) => !prizes.includes(item))
    }

    const renderedItems = filteredItemKeys.map((key, index) => {
      const existingItem = items[key]
      const { amount } = existingItem

      const newItem = { name: key, index }

      return (
        <ImageDisplay
          className={css.itemContainer}
          item={newItem}
          showLabel={true}
          amount={amount}
          showAmount={true}
        />
      )
    })

    return <div className={css.items}>{renderedItems}</div>
  }

  render = () => {
    const { showHeader = false } = this.props
    let missions

    const questStatus = localStateStore.getQuestStatus()

    if (!questStatus.questConfig) {
      return null
    }

    const { completedMissions } = questStatus
    const world = localStateStore.getActiveWorld()
    const newMissions = QuestStatusUtils.getActiveSubQuestMissions({ world })

    missions = newMissions

    const { activeMissionIndex } = questStatus
    const columnNames = [
      "Mission",
      "Bring the...",
      "to the...",
      "Gold",
      "Complete",
    ]

    if (!missions || missions.length === 0) {
      return null
    }
    const tableData = missions.map((mission, missionIndex) => {
      const { name, item = {}, recipient = "", rewards = [] } = mission

      const rewardString = `${_get(rewards, "[0]amount")}`

      const completed = completedMissions.includes(missionIndex)

      return [name, item.name, recipient.name, rewardString, completed]
    })

    return (
      <div className={css.main}>
        activeMissionIndex: {activeMissionIndex}
        {showHeader && (
          <div className={css.header}>
            <div className={css.title}>Your Stuff</div>
          </div>
        )}
        <div className={css.body}>
          <div className={css.row}>
            <div className={css.left}>
              <MiniTable2 columnNames={columnNames} tableData={tableData} />
            </div>
            <div className={css.right}>
              <div className={css.itemsContainerBox}>
                <div className={css.itemsContainer}>
                  <div className={css.itemContainerTitle}>Your Pockets</div>
                  {this.renderPocketItems({ goldOnly: false })}
                </div>
                <div className={css.itemsContainer}>
                  <div className={css.itemContainerTitle}>Prizes</div>
                  {this.renderPocketItems({ goldOnly: true })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MissionConsole
