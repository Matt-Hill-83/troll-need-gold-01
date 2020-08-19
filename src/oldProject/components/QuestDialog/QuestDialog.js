import _get from "lodash.get"
import { Button, Dialog, ButtonGroup, Icon } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import { Link } from "react-router-dom"
import cx from "classnames"
import React from "react"

import Images from "../../images/images.js"

import { maps } from "../../Stores/InitStores.js"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"
import Utils from "../../Utils/Utils.js"

import css from "./QuestDialog.module.scss"

class QuestDialog extends React.Component {
  state = {}

  constructor(props) {
    super(props)
    const showProdInitialValue = localStateStore.getIsProdRelease()
    this.state = { showProd: true, showToggle: !showProdInitialValue }
  }

  toggleShowProd = () => {
    this.setState({ showProd: !this.state.showProd })
  }

  onDeleteMap = async ({ map, event }) => {
    if (this._deleting) return
    this._deleting = true
    try {
      event.stopPropagation()
      await map.delete()
      this._deleting = false
      // TODO: I need to refresh the list from the db here.
    } catch (err) {
      this._deleting = false
    }
  }

  render = () => {
    const { showProd, showToggle } = this.state

    const savedMaps = Utils.getItemsFromDbObj({ dbList: maps })
    let filteredMaps = []

    if (showProd) {
      filteredMaps = savedMaps.filter((map) => {
        return map.data.releasedToProd
      })
    } else {
      filteredMaps = savedMaps.filter((map) => {
        return map.data.released && !map.data.releasedToProd
      })
    }

    const sortedMaps = Utils.sortDataByNestedKey({
      data: filteredMaps,
      keys: ["data", "title"],
      order: "ASC",
    })

    const isProdRelease = localStateStore.getIsProdRelease()

    const mapList = sortedMaps.map((map) => {
      const { title } = map.data

      const mapId = map.id
      const text = (
        <div className={css.questRow}>
          <div className={cx(css.tableCell, css.questName)}>
            <Link to={`/world/${mapId}`}>{title}</Link>
          </div>

          <div className={cx(css.tableCell, css.dragonPoints)}>100 </div>
          <div className={cx(css.tableCell, css.questStatus)}>
            <span role="img">✅</span>
          </div>
          {!isProdRelease && (
            <span onClick={(event) => this.onDeleteMap({ map, event })}>
              <Icon icon={IconNames.TRASH} />
            </span>
          )}
        </div>
      )
      return <div>{text}</div>
    })

    const cloudImage = Images.backgrounds["splashScreen01"]

    const tableHeader = (
      <div className={cx(css.tableHeader)}>
        <div className={cx(css.tableCell, css.name)}>Name</div>
        <div className={cx(css.tableCell, css.gold)}>Gold</div>
        <div className={cx(css.tableCell, css.status)}>Completed</div>
      </div>
    )

    const showProdButtonLabel = showProd ? "New Quests" : "Old Quests"

    return (
      <Dialog isOpen={true} isCloseButtonShown={true} className={css.main}>
        {showToggle && (
          <ButtonGroup className={css.buttonGroup} color="primary">
            <Button onClick={this.toggleShowProd}>{showProdButtonLabel}</Button>
          </ButtonGroup>
        )}
        <img className={css.backgroundImage} src={cloudImage} alt={"imagex"} />
        <div className={css.questPage}>
          <div className={css.header}>
            <span className={css.gameTitle}>
              ...no I would not like to participate in a short survey after the
              call...
            </span>
            {/* <span className={css.gameTitle}>Fashion Slayer</span> */}
            {/* <span className={css.gameTitle}>Dress Quest IV</span> */}
            {/* <span className={css.gameTitle}>Liz Goes Nuts</span> */}
          </div>

          <div className={css.content}>
            <div className={css.questTable}>
              {tableHeader}
              <div className={css.scrollArea}>{mapList}</div>
            </div>
          </div>
        </div>

        {/* <Button className={css.playButton} onClick={closeQuestPicker}>
          Close
        </Button> */}
      </Dialog>
    )
  }
}

export default QuestDialog
