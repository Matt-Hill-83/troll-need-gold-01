import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import _uniqBy from "lodash.uniqby"

import { fetchQuests } from "../questActions"
import { RETAIN_STATE } from "../questConstants"
import WorldBuilder from "../../../QuestBuilder/components/WorldBuilder/WorldBuilder.js"

export default function WorldBuilderBox() {
  const limit = 1000
  const dispatch = useDispatch()
  const { quests, filter, startDate, retainState } = useSelector(
    (state) => state.quest
  )
  const { loading } = useSelector((state) => state.async)
  const [loadingInitial, setLoadingInitial] = useState(false)

  useEffect(() => {
    if (retainState) return
    setLoadingInitial(true)
    dispatch(fetchQuests(filter, startDate, limit)).then(() => {
      setLoadingInitial(false)
    })
    return () => {
      dispatch({ type: RETAIN_STATE })
    }
  }, [dispatch, filter, startDate, retainState])

  if (!quests || quests.length === 0) return <div>no data</div>

  const uniqueWorlds = _uniqBy(quests, "id")

  return <WorldBuilder maps={uniqueWorlds}></WorldBuilder>
}
