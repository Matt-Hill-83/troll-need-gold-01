import _get from "lodash.get"
import { Button } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import { Link } from "react-router-dom"
import cx from "classnames"
import React from "react"

import { deleteQuestInFirestore } from "../../app/firestore/firestoreService"
import QuestProgressUtils from "../../oldProject/Utils/QuestProgressUtils"
import TopLevelUtils from "../../oldProject/Utils/TopLevelUtils"
import useUpdateProfileWidget from "../../oldProject/components/TopLevel/useUpdateProfileWidget"
import Utils from "../../oldProject/Utils/Utils"

import css from "./QuestListItem.module.scss"
import Constants from "../../Common/Constants/Constants"

const { isProdRelease } = Constants

export default function QuestListItem({ event: world }) {
  const { questConfig = {} } = world

  const { getProfile } = useUpdateProfileWidget()
  const profile = getProfile()
  const completedQuests = _get(profile, "userStatus.completedQuests") || []

  const missions = TopLevelUtils.getMissions({ questConfig }) || []
  const totalGold = QuestProgressUtils.getTotalGoldInQuest({ missions })

  const renderItem = () => {
    const { title, id: questId } = world
    console.log("world", world) // zzz
    if (!world.title) {
      return <div>Quest not found</div>
    }
    const truncatedTitle = Utils.trimToDashIfProd({ isProdRelease, title })
    const questCompleted = Utils.isQuestCompleted({ questId, completedQuests })

    return (
      <div key={questId} className={css.questRow}>
        <Link
          className={cx(css.tableCell, css.questName)}
          to={`/quests/${questId}`}
        >
          {truncatedTitle}
        </Link>

        <div className={cx(css.tableCell, css.dragonPoints)}>{totalGold} </div>
        <div className={cx(css.tableCell, css.questStatus)}>
          <span role="img">{`${questCompleted ? "✅" : "--"}`}</span>
        </div>
        {!isProdRelease && (
          <Button
            onClick={() => {
              deleteQuestInFirestore(questId)
            }}
            icon={IconNames.TRASH}
          />
        )}
      </div>
    )
  }

  return renderItem()
}
