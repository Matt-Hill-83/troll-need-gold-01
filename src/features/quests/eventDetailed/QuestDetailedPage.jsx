import { Redirect } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import React from "react"

import { listenToQuestFromFirestore2 } from "../../../app/firestore/firestoreService"
import { listenToSelectedQuest } from "../questActions"
import LoadingComponent from "../../../app/layout/LoadingComponent"
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc"
import TopLevel from "../../../oldProject/components/TopLevel/TopLevel"

export default function QuestDetailedPage({ match }) {
  const dispatch = useDispatch()
  // const { currentUser } = useSelector((state) => state.auth)
  const quest = useSelector((state) => state.quest.selectedEvent)
  const { loading, error } = useSelector((state) => state.async)

  useFirestoreDoc({
    query: () => listenToQuestFromFirestore2(match.params.id),
    data: (quest) => {
      dispatch(listenToSelectedQuest(quest))
    },
    deps: [match.params.id, dispatch],
  })

  if (loading || (!quest && !error))
    return <LoadingComponent content="Loading quest..." />

  if (error) return <Redirect to="/error" />

  return <TopLevel quest={quest}></TopLevel>
}
