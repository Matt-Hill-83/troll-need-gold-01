import { Button, Icon } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import { Link } from "react-router-dom"
import cx from "classnames"
import React from "react"

import Constants from "../../../oldProject/Utils/Constants/Constants"

import css from "./QuestListItem.module.scss"

export default function QuestListItem({ event }) {
  const renderItem = () => {
    const { title } = event
    const { isProdRelease } = Constants

    const mapId = event.id
    return (
      <div key={mapId} className={css.questRow}>
        <Link
          className={cx(css.tableCell, css.questName)}
          to={`/quests/${event.id}`}
        >
          {title}
        </Link>

        <div className={cx(css.tableCell, css.dragonPoints)}>100 </div>
        <div className={cx(css.tableCell, css.questStatus)}>
          <span role="img">✅</span>
        </div>
        {/* <span onClick={(event) => this.onDeleteMap({ map, event })}> */}
        {!isProdRelease && <Button onClick={() => {}} icon={IconNames.TRASH} />}
      </div>
    )
  }

  return renderItem()
}
