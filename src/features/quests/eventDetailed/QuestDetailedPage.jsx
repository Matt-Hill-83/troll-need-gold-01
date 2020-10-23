import { useSelector, useDispatch } from "react-redux"
import React from "react"

import { listenToQuestFromFirestore } from "../../../app/firestore/firestoreService"
import { listenToSelectedQuest } from "../questActions"
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc"
import TopLevel from "../../../oldProject/components/TopLevel/TopLevel"

export default function QuestDetailedPage({ match }) {
  const dispatch = useDispatch()
  const quest = useSelector((state) => state.quest.selectedEvent)

  useFirestoreDoc({
    query: () => listenToQuestFromFirestore(match.params.id),
    data: (quest) => {
      dispatch(listenToSelectedQuest(quest))
    },
    deps: [match.params.id, dispatch],
  })

  return <TopLevel quest={quest} />
}
