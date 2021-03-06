import _get from "lodash.get"
import { Link } from "react-router-dom"
import cx from "classnames"
import React from "react"

import Images from "../../../Common/Images/images"
import Utils from "../../../Common/Utils/Utils"

import css from "./BookTableOfContents.module.scss"

export default function BookTableOfContents(props) {
  const { worlds, selectedBook } = props
  const sortedWorlds = Utils.sortWorlds({ worlds })

  const filteredWorlds = sortedWorlds.filter((world) => {
    const chapters = _get(selectedBook, "chapters") || []
    return world.released && chapters.includes(world.id)
  })

  const worldList = filteredWorlds.map((world) => {
    const { title, id: worldId } = world

    const text = (
      <div className={css.questRow}>
        <div className={cx(css.tableCell, css.questName)}>{title}</div>
        <div className={cx(css.tableCell, css.dragonPoints)}>100 </div>
        <div className={cx(css.tableCell, css.questStatus)}>
          <span role="img">✅</span>
        </div>
      </div>
    )

    return <Link to={`/quests/${worldId}`}>{text}</Link>
  })

  const tableHeader = (
    <div className={cx(css.tableHeader)}>
      <div className={cx(css.tableCell, css.name)}>Name</div>
      <div className={cx(css.tableCell, css.gold)}>Gold</div>
      <div className={cx(css.tableCell, css.status)}>Completed</div>
    </div>
  )
  const dummyQuest01 = Images.backgrounds["dummyQuest01"]

  return (
    <div className={css.main}>
      <div className={css.questTable}>
        {tableHeader}
        <div className={css.scrollArea}>{worldList}</div>
      </div>
      <img className={cx(css.dummyQuest01)} src={dummyQuest01} alt={"imagex"} />
    </div>
  )
}
