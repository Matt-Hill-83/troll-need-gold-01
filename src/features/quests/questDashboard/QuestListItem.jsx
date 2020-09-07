import _get from "lodash.get"
import { Button } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import { Link } from "react-router-dom"
import cx from "classnames"
import React from "react"

import Constants from "../../../oldProject/Utils/Constants/Constants"
import TopLevelUtils from "../../../oldProject/Utils/TopLevelUtils"
import useGlobalState from "../../../Context/useGlobalState"
import useUpdateProfileWidget from "../../../oldProject/components/TopLevel/useUpdateProfileWidget"
import Utils from "../../../oldProject/Utils/Utils"

import css from "./QuestListItem.module.scss"

export default function QuestListItem({ event: world }) {
  const { questConfig = {} } = world

  const { getProfile } = useUpdateProfileWidget()
  const profile = getProfile()
  const completedQuests = _get(profile, "userStatus.completedQuests")

  // const { globalState } = useGlobalState()
  // console.log("globalState", globalState) // zzz
  // const {
  //   globalState: {
  //     world: { questConfig },
  //   },
  // } = useGlobalState()

  const missions = TopLevelUtils.getMissions({ questConfig })

  let totalGold = 0
  missions.forEach((item) => {
    console.log("item", item) // zzz
    totalGold += item.rewards[0].amount
  })
  console.log("totalGold", totalGold) // zzz
  // console.log("missions", missions) // zzz

  const renderItem = () => {
    const { title } = world
    const { isProdRelease } = Constants

    const questId = world.id
    const questCompleted = Utils.isQuestCompleted({ questId, completedQuests })

    return (
      <div key={questId} className={css.questRow}>
        <Link
          className={cx(css.tableCell, css.questName)}
          to={`/quests/${world.id}`}
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
