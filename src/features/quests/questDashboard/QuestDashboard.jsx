import { Grid, Loader } from "semantic-ui-react"
import React, { useEffect, useState, useContext } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Toaster, Position, ButtonGroup, Button } from "@blueprintjs/core"

import { fetchEvents } from "../questActions"
import { myContext } from "../../../myProvider"
import { RETAIN_STATE } from "../questConstants"
import EventListItemPlaceholder from "./EventListItemPlaceholder"
import QuestDialog from "../../../oldProject/components/QuestDialog/QuestDialog"
import QuestList from "./QuestList"

import css from "./QuestDashboard.module.scss"

export default function QuestDashboard() {
  // const [globalStorage, setGlobalStorage] = useContext(myContext)

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
        // onChangeWorld={onChangeWorld}
      />
    )
  }

  const closeQuestPicker = () => {
    setShowQuestPicker(false)
  }

  // const openQuestPicker = () => {
  //   setShowQuestPicker(true)
  // }

  const toggleQuestPicker = () => {
    setShowQuestPicker(!showQuestPicker)
  }

  const renderButtons = () => {
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
      {/* quest picker already exists on this page.  oops... */}
      {/* {renderButtons()} */}
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
    </Grid>
  )
}
