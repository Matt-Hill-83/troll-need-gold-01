import _get from "lodash.get"
import { Button } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import { Link } from "react-router-dom"
import cx from "classnames"
import React from "react"

import Constants from "../../../oldProject/Utils/Constants/Constants"
import useUpdateProfileWidget from "../../../oldProject/components/TopLevel/useUpdateProfileWidget"
import Utils from "../../../oldProject/Utils/Utils"

import css from "./QuestListItem.module.scss"

export default function QuestListItem({ event }) {
  const { getProfile } = useUpdateProfileWidget()
  const profile = getProfile()
  const completedQuests = _get(profile, "userStatus.completedQuests")

  const renderItem = () => {
    const { title } = event
    const { isProdRelease } = Constants

    const questId = event.id
    console.log("completedQuests", completedQuests) // zzz
    const questCompleted = Utils.isQuestCompleted({ questId, completedQuests })
    console.log("questCompleted", questCompleted) // zzz

    return (
      <div key={questId} className={css.questRow}>
        <Link
          className={cx(css.tableCell, css.questName)}
          to={`/quests/${event.id}`}
        >
          {title}
        </Link>

        <div className={cx(css.tableCell, css.dragonPoints)}>100 </div>
        <div className={cx(css.tableCell, css.questStatus)}>
          <span role="img">{`${questCompleted ? "✅" : "--"}`}</span>
        </div>
        {/* <span onClick={(event) => this.onDeleteMap({ map, event })}> */}
        {!isProdRelease && <Button onClick={() => {}} icon={IconNames.TRASH} />}
      </div>
    )
  }

  return renderItem()
}
