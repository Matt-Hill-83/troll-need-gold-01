import _get from "lodash.get"
import React from "react"
import QuestListItem from "./QuestListItem"
import cx from "classnames"

import useUpdateProfileWidget from "../../oldProject/components/TopLevel/useUpdateProfileWidget"
import QuestProgressUtils from "../../oldProject/Utils/QuestProgressUtils"

import css from "./QuestList.module.scss"

export default function QuestList({ worlds, className }) {
  const { getProfile } = useUpdateProfileWidget()
  const profile = getProfile()
  const completedQuests = _get(profile, "userStatus.completedQuests")

  const {
    earnedGold,
    allGoldInQuests,
  } = QuestProgressUtils.getTotalGoldInAllQuests({ worlds, completedQuests })

  const tableHeader = (
    <div className={cx(css.tableHeader)}>
      <div className={cx(css.tableCell, css.name)}>Name</div>
      <div
        className={cx(css.tableCell, css.gold)}
      >{`Gold (${earnedGold} out of ${allGoldInQuests})`}</div>
      <div className={cx(css.tableCell, css.status)}>Completed</div>
    </div>
  )

  return (
    <div className={className}>
      {tableHeader}
      {worlds.map((event) => (
        <QuestListItem event={event} key={event.id} />
      ))}
    </div>
  )
}
