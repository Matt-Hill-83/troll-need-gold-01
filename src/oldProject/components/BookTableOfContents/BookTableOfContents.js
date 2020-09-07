import _get from "lodash.get"
import { Link } from "react-router-dom"
import cx from "classnames"
import React from "react"

import Images from "../../images/images.js"
import Utils from "../../Utils/Utils.js"

import css from "./BookTableOfContents.module.scss"

class BookTableOfContents extends React.Component {
  state = {}

  render = () => {
    console.log("BookTableOfContents---------------") // zzz
    console.log("BookTableOfContents---------------") // zzz
    console.log("BookTableOfContents---------------") // zzz
    const { worlds } = this.props
    console.log("worlds", worlds) // zzz

    const { selectedBook } = this.props
    console.log("selectedBook", selectedBook) // zzz
    const sortedWorlds = Utils.sortWorlds({ worlds: worlds })

    const filteredMaps = sortedWorlds.filter((map) => {
      const chapters = _get(selectedBook, "chapters") || []
      return map.released && chapters.includes(map.id)
    })

    const mapList = filteredMaps.map((map) => {
      const { title } = map
      const mapId = map.id

      const text = (
        <div className={css.questRow}>
          <div className={cx(css.tableCell, css.questName)}>{title}</div>
          <div className={cx(css.tableCell, css.dragonPoints)}>100 </div>
          <div className={cx(css.tableCell, css.questStatus)}>
            <span role="img">✅</span>
          </div>
        </div>
      )

      return <Link to={`/world/${mapId}`}>{text}</Link>
    })
    console.log("mapList", mapList) // zzz
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
          <div className={css.scrollArea}>{mapList}</div>
        </div>
        <img
          className={cx(css.dummyQuest01)}
          src={dummyQuest01}
          alt={"imagex"}
        />
      </div>
    )
  }
}

export default BookTableOfContents
