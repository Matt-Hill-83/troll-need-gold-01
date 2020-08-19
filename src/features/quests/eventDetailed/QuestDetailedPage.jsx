import React from "react"
import { Grid } from "semantic-ui-react"
import EventDetailedHeader from "./EventDetailedHeader"
import EventDetailedInfo from "./EventDetailedInfo"
import EventDetailedChat from "./EventDetailedChat"
import EventDetailedSidebar from "./EventDetailedSidebar"
import { useSelector, useDispatch } from "react-redux"
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc"
import {
  listenToEventFromFirestore,
  listenToQuestFromFirestore,
} from "../../../app/firestore/firestoreService"
import LoadingComponent from "../../../app/layout/LoadingComponent"
import { Redirect } from "react-router-dom"
import { listenToSelectedEvent, listenToSelectedQuest } from "../questActions"

export default function QuestDetailedPage({ match }) {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.auth)
  const quest = useSelector((state) => state.quest.selectedEvent)
  const { loading, error } = useSelector((state) => state.async)
  // const isHost = quest?.hostUid === currentUser?.uid
  // const isGoing = quest?.attendees?.some((a) => a.id === currentUser?.uid)

  console.log("match", match) // zzz

  useFirestoreDoc({
    query: () => listenToQuestFromFirestore(match.params.id),
    data: (quest) => {
      console.log("quest", quest) // zzz
      dispatch(listenToSelectedQuest(quest))
    },
    deps: [match.params.id, dispatch],
  })

  if (loading || (!quest && !error))
    return <LoadingComponent content="Loading quest..." />

  if (error) return <Redirect to="/error" />

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={quest} isGoing={false} isHost={false} />
        <EventDetailedInfo event={quest} />
      </Grid.Column>
      <Grid.Column width={6}></Grid.Column>
    </Grid>
  )
}
