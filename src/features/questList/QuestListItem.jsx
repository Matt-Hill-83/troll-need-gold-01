import _get from "lodash.get"
import { Button } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import { Link } from "react-router-dom"
import cx from "classnames"
import React from "react"

import Constants from "../../oldProject/Utils/Constants/Constants"
import TopLevelUtils from "../../oldProject/Utils/TopLevelUtils"
import QuestProgressUtils from "../../oldProject/Utils/QuestProgressUtils"
import useUpdateProfileWidget from "../../oldProject/components/TopLevel/useUpdateProfileWidget"
import Utils from "../../oldProject/Utils/Utils"

import css from "./QuestListItem.module.scss"

export default function QuestListItem({ event: world }) {
  const { questConfig = {} } = world

  const { getProfile } = useUpdateProfileWidget()
  const profile = getProfile()
  const completedQuests = _get(profile, "userStatus.completedQuests") || []

  const missions = TopLevelUtils.getMissions({ questConfig }) || []
  const totalGold = QuestProgressUtils.getTotalGoldInQuest({ missions })

  const renderItem = () => {
    const { title, id: questId } = world
    const { isProdRelease } = Constants

    const questCompleted = Utils.isQuestCompleted({ questId, completedQuests })

    console.log("questId", questId) // zzz

    return (
      <div key={questId} className={css.questRow}>
        <Link
          className={cx(css.tableCell, css.questName)}
          to={`/quests/${questId}`}
        >
          {title}
        </Link>

        <div className={cx(css.tableCell, css.dragonPoints)}>{totalGold} </div>
        <div className={cx(css.tableCell, css.questStatus)}>
          <span role="img">{`${questCompleted ? "✅" : "--"}`}</span>
        </div>
        {/* <span onClick={(world) => this.onDeleteMap({ map, world })}> */}
        {!isProdRelease && <Button onClick={() => {}} icon={IconNames.TRASH} />}
      </div>
    )
  }

  return renderItem()
}
