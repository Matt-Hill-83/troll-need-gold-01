import { useSelector, useDispatch } from "react-redux"
import React from "react"

import { listenToQuestFromFirestore } from "../../../app/firestore/firestoreService"
import { listenToSelectedQuest } from "../questActions"
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc"
import WorldBuilder from "../../../QuestBuilder/components/WorldBuilder/WorldBuilder"

export default function WorldBuilderDetailedPage({ match }) {
  const dispatch = useDispatch()
  const quest = useSelector((state) => {
    const test = state.quest.selectedEvent
    // console.log("test", test) // zzz
    return test
  })
  console.log("match", match) // zzz
  useFirestoreDoc({
    query: () => listenToQuestFromFirestore(match.params.id),
    data: (quest) => {
      dispatch(listenToSelectedQuest(quest))
    },
    deps: [match.params.id, dispatch],
  })

  console.log("quest", quest) // zzz
  if (!quest) {
    return null
  }
  return <WorldBuilder quest={quest} />
}
