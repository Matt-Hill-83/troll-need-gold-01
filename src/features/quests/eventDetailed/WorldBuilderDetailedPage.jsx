import { useSelector, useDispatch } from "react-redux"
import React from "react"

import { listenToQuestFromFirestore } from "../../../app/firestore/firestoreService"
import { listenToSelectedQuest } from "../questActions"
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc"
import WorldBuilder from "../../../QuestBuilder/components/WorldBuilder/WorldBuilder"

export default function WorldBuilderDetailedPage({ match, history }) {
  const dispatch = useDispatch()
  const quest = useSelector((state) => {
    const test = state.quest.selectedEvent
    return test
  })
  useFirestoreDoc({
    query: () => listenToQuestFromFirestore(match.params.id),
    data: (quest) => {
      dispatch(listenToSelectedQuest(quest))
    },
    deps: [match.params.id, dispatch],
  })

  if (!quest) {
    return null
  }
  return <WorldBuilder quest={quest} history={history} />
}
