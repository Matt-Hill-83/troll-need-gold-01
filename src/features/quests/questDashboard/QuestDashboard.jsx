import { Grid, Loader } from "semantic-ui-react"
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Toaster, Position, ButtonGroup, Button } from "@blueprintjs/core"

import { fetchEvents } from "../questActions"
import { RETAIN_STATE } from "../questConstants"
import QuestList from "./QuestList"
import EventListItemPlaceholder from "./EventListItemPlaceholder"
import TopLevel from "../../../oldProject/components/TopLevel/TopLevel"
import localStateStore from "../../../oldProject/Stores/LocalStateStore/LocalStateStore"
import QuestStatusUtils from "../../../oldProject/Utils/QuestStatusUtils"
import QuestDialog from "../../../oldProject/components/QuestDialog/QuestDialog"

import css from "./QuestDashboard.module.scss"

export default function QuestDashboard() {
  const limit = 2
  const dispatch = useDispatch()
  const {
    events,
    moreEvents,
    filter,
    startDate,
    lastVisible,
    retainState,
  } = useSelector((state) => state.event)
  const { loading } = useSelector((state) => state.async)
  const { authenticated } = useSelector((state) => state.auth)
  const [loadingInitial, setLoadingInitial] = useState(false)

  const [showQuestPicker, setShowQuestPicker] = useState(false)

  useEffect(() => {
    if (retainState) return
    setLoadingInitial(true)
    dispatch(fetchEvents(filter, startDate, limit)).then(() => {
      setLoadingInitial(false)
    })
    return () => {
      dispatch({ type: RETAIN_STATE })
    }
  }, [dispatch, filter, startDate, retainState])

  function handleFetchNextEvents() {
    dispatch(fetchEvents(filter, startDate, limit, lastVisible))
  }

  console.log({ events })

  if (!events || events.length === 0) return <div>no data</div>

  const renderQuestPicker = () => {
    // toaster.clear()

    return (
      <QuestDialog
        // showProd={showProd}
        closeQuestPicker={closeQuestPicker}
        showQuestPicker={showQuestPicker}
        onChangeWorld={onChangeWorld}
      />
    )
  }

  const onChangeWorld = ({ mapId }) => {
    console.log("")
    console.log("")
    console.log("-------------------------------------")
    console.log(
      "-----------------------mapId---------------------------",
      mapId
    )

    localStateStore.setActiveMapId(mapId)
    const map = localStateStore.getActiveWorld()
    if (!map || !map) {
      return
    }
    const { questConfig } = map
    if (questConfig) {
      const missions = QuestStatusUtils.getActiveSubQuestMissions({
        world: map,
      })
      const desiredItems =
        (missions && missions.map((mission) => mission.item)) || []

      const desiredItemsFiltered = desiredItems.filter((item) => !!item)
      const clonedQuestConfig = JSON.parse(JSON.stringify(questConfig))

      const combinedPockets = localStateStore.addToPockets({
        newPockets: clonedQuestConfig.pockets,
      })
      const defaultQuestStatus = localStateStore.getDefaultQuestStatus()

      const newProps = {
        activeMissionIndex: 0,
        pockets: combinedPockets,
        questConfig: clonedQuestConfig,
        desiredItems: desiredItemsFiltered,
      }
      const newQuestStatus = { ...defaultQuestStatus, ...newProps }

      localStateStore.setQuestStatus(newQuestStatus)
    } else {
      localStateStore.setQuestStatus({
        activeMissionIndex: 0,
        hideMissionConsole: true,
      })
    }
    // uncomment this after building feature
    localStateStore.setShowBookPicker(false)

    this.setState({ showQuestPicker: false })
    this.initWorld()
  }

  const closeQuestPicker = () => {
    setShowQuestPicker(false)
  }

  const openQuestPicker = () => {
    setShowQuestPicker(true)
  }

  const toggleQuestPicker = () => {
    setShowQuestPicker(!showQuestPicker)
  }

  const renderButtons = () => {
    const isProdRelease = localStateStore.getIsProdRelease()

    return (
      <div className={css.floatingButtons}>
        <ButtonGroup color="primary">
          <Button onClick={toggleQuestPicker}>Pick a Single Quest...</Button>
          {/* {!isProdRelease && (
            <Button onClick={this.toggleBookPicker}>
              Pick a Book of Quests...
            </Button>
          )} */}
        </ButtonGroup>
      </div>
    )
  }

  if (showQuestPicker) {
    return renderQuestPicker()
  }

  return (
    <Grid className={css.main} width={10}>
      {renderButtons()}
      <Grid.Column width={10}>
        {loadingInitial && (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        )}
        <div className={css.questList}>
          <QuestList
            events={events}
            getNextEvents={handleFetchNextEvents}
            loading={loading}
            moreEvents={moreEvents}
          />
        </div>
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loading} />
      </Grid.Column>
      {/* <TopLevel quests={events}></TopLevel> */}
    </Grid>
  )
}
