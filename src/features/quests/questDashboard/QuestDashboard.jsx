import { Grid, Loader } from "semantic-ui-react"
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { fetchEvents } from "../questActions"
import { RETAIN_STATE } from "../questConstants"
import EventFilters from "./EventFilters"
import EventList from "./EventList"
import EventListItemPlaceholder from "./EventListItemPlaceholder"
import EventsFeed from "./EventsFeed"

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

  return (
    <Grid>
      Quests!!!!
      <Grid.Column width={10}>
        {loadingInitial && (
          <>
            <EventListItemPlaceholder />
            <EventListItemPlaceholder />
          </>
        )}
        <EventList
          events={events}
          getNextEvents={handleFetchNextEvents}
          loading={loading}
          moreEvents={moreEvents}
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loading} />
      </Grid.Column>
    </Grid>
  )
}
