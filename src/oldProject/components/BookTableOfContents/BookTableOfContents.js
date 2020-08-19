import React from "react"
// import { toJS } from "mobx"
import _get from "lodash.get"
import Images from "../../images/images.js"
import cx from "classnames"

import Utils from "../../Utils/Utils.js"

import { maps } from "../../Stores/InitStores.js"

import css from "./BookTableOfContents.module.scss"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

class BookTableOfContents extends React.Component {
  state = {}

  constructor(props) {
    super(props)
    const showProdInitialValue = localStateStore.getIsProdRelease()
    this.state = { showProd: true, showToggle: !showProdInitialValue }
  }

  toggleShowProd = () => {
    this.setState({ showProd: !this.state.showProd })
  }

  render = () => {
    const { selectedBook } = this.props
    const {} = this.state
    const sortedWorlds = Utils.sortWorlds({ worlds: maps })

    const filteredMaps = sortedWorlds.filter((map) => {
      const chapters = _get(selectedBook, "data.chapters") || []
      return map.data.released && chapters.includes(map.id)
    })

    const mapList = filteredMaps.map((map) => {
      const { title } = map.data
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
