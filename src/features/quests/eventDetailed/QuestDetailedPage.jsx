import { Grid } from "semantic-ui-react"
import { Redirect } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import React, { useContext } from "react"

import { listenToQuestFromFirestore2 } from "../../../app/firestore/firestoreService"
import { listenToSelectedQuest } from "../questActions"
import LoadingComponent from "../../../app/layout/LoadingComponent"
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc"
import TopLevel from "../../../oldProject/components/TopLevel/TopLevel"
import { XyzProvider, xyzContext } from "../../../myProvider"

export default function QuestDetailedPage({ match }) {
  const number = 100
  // const [number, setNumber] = useContext(myContext)

  // const increaseNumber = () => {
  //   setNumber((prevNumber) => prevNumber + 1)
  // }

  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.auth)
  const quest = useSelector((state) => state.quest.selectedEvent)
  const { loading, error } = useSelector((state) => state.async)

  useFirestoreDoc({
    query: () => listenToQuestFromFirestore2(match.params.id),
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
    <XyzProvider>
      <div>test2--------22222222223424223423234234</div>
      <TopLevel quests={[quest]}></TopLevel>
    </XyzProvider>
  )
}
