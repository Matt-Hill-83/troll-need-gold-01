import { useSelector, useDispatch } from "react-redux"
import React from "react"

import { listenToQuestFromFirestore } from "../../../app/firestore/firestoreService"
import { listenToSelectedQuest } from "../questActions"
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc"
import WorldBuilder from "../../../QuestBuilder/components/WorldBuilder/WorldBuilder"
import useUpdateProfileWidget from "../../../oldProject/components/TopLevel/useUpdateProfileWidget"

export default function WorldBuilderDetailedPage({ match, history }) {
  const { getProfile } = useUpdateProfileWidget()
  const profile = getProfile()

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
  return <WorldBuilder quest={quest} profile={profile} history={history} />
}
