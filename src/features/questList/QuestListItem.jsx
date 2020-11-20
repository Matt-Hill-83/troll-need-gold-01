import _get from "lodash.get"
import { Button, ButtonGroup } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import { Link } from "react-router-dom"
import cx from "classnames"
import React from "react"

import { deleteQuestInFirestore } from "../../app/firestore/firestoreService"
import Constants from "../../Common/Constants/Constants"
import QuestProgressUtils from "../../oldProject/Utils/QuestProgressUtils"
import TopLevelUtils from "../../oldProject/Utils/TopLevelUtils"
import useUpdateProfileWidget from "../../oldProject/components/TopLevel/useUpdateProfileWidget"
import Utils from "../../Common/Utils/Utils"

import css from "./QuestListItem.module.scss"

const { isProdRelease } = Constants

export default function QuestListItem({ event: world }) {
  const { questConfig = {} } = world

  const { getProfile } = useUpdateProfileWidget()
  const profile = getProfile()
  const isGod = profile.id === "AMAgzal2oAbHogUvO9vVeHWZygF3"
  const completedQuests = _get(profile, "userStatus.completedQuests") || []

  const missions = TopLevelUtils.getMissions({ questConfig }) || []
  const totalGold = QuestProgressUtils.getTotalGoldInQuest({ missions })

  const renderItem = () => {
    const { title, id: questId } = world
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
        {isGod && (
          <Link
            className={cx(css.tableCell, css.questName)}
            to={`/quest-builder/${questId}`}
          >
            Edit
          </Link>
        )}

        <div className={cx(css.tableCell, css.dragonPoints)}>{totalGold} </div>
        <div className={cx(css.tableCell, css.questStatus)}>
          <span role="img">{`${questCompleted ? "✅" : "--"}`}</span>
        </div>
        {!isProdRelease && (
          <ButtonGroup>
            <Button
              xxxonClick={() => {
                deleteQuestInFirestore(questId)
              }}
              icon={IconNames.TRASH}
            />
            {/* <Button
              onClick={() => {
                convertToLua({ config: world.newGrid5 })
              }}
              icon={IconNames.NINJA}
            /> */}
          </ButtonGroup>
        )}
      </div>
    )
  }

  return renderItem()
}
