import React from "react"
import _get from "lodash.get"

import MiniTable2 from "../MiniTable2/MiniTable2"
import TopLevelUtils from "../../Utils/TopLevelUtils"
import useGlobalState from "../../../Context/useGlobalState.js"
import ImageDisplay from "../../../Common/Components/ImageDisplay/ImageDisplay"

import css from "./MissionConsole.module.scss"

const columnNames = ["Mission", "Gold", "Complete"]

const getTableData = ({ missions, completedMissions }) => {
  return missions.map((mission, missionIndex) => {
    const { item = {}, recipient = "", rewards = [] } = mission
    const rewardString = `${_get(rewards, "[0]amount")}`
    const completed = completedMissions.includes(missionIndex)

    const name = `Bring the ${item.name} to the ${recipient.name}`
    return [name, rewardString, completed]
  })
}

const renderPocketItems = ({ goldOnly = false, questStatus }) => {
  const items = _get(questStatus, "pockets") || []

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

export default function MissionConsole(props) {
  const {
    globalState: {
      questStatus,
      questStatus: { completedMissions, activeMissionIndex },
      world: { questConfig },
    },
  } = useGlobalState()

  const missions = TopLevelUtils.getMissions({ questConfig })

  if (!missions || missions.length === 0) {
    return null
  }

  const tableData = getTableData({ missions, completedMissions })

  return (
    <div className={css.main}>
      <div className={css.body}>
        <div className={css.row}>
          <div className={css.left}>
            <MiniTable2
              columnNames={columnNames}
              tableData={tableData}
              activeMissionIndex={activeMissionIndex}
            />
          </div>
          <div className={css.right}>
            <div className={css.itemsContainerBox}>
              <div className={css.itemsContainer}>
                <div className={css.itemContainerTitle}>Prizes</div>
                {renderPocketItems({ goldOnly: true, questStatus })}
              </div>
              <div className={css.itemsContainer}>
                <div className={css.itemContainerTitle}>Your Pockets</div>
                {renderPocketItems({ goldOnly: false, questStatus })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
