import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import _uniqBy from "lodash.uniqby"

import { fetchQuests } from "../questActions"
import { RETAIN_STATE } from "../questConstants"
import WorldBuilder from "../../../QuestBuilder/components/WorldBuilder/WorldBuilder.js"
import useUpdateProfileWidget from "../../../oldProject/components/TopLevel/useUpdateProfileWidget"
import Constants from "../../../Common/Constants/Constants"

export default function WorldBuilderBox(match) {
  const limit = 1000
  const dispatch = useDispatch()
  const { quests, filter, startDate, retainState } = useSelector(
    (state) => state.quest
  )
  const { loading } = useSelector((state) => state.async)
  const [loadingInitial, setLoadingInitial] = useState(false)

  const { getProfile, updateProfilePropsIfChanged } = useUpdateProfileWidget()

  const updateDefaultWorldId = ({ worldId }) => {
    const newProfile = { ...profile }
    newProfile.defaultWorldId = worldId
    updateProfilePropsIfChanged({ newProfileProps: newProfile })
  }

  const profile = getProfile()

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

  const defaultWorldId =
    profile.defaultWorldId || Constants.defaultWorldIdNonProdWB

  return (
    <WorldBuilder
      maps={uniqueWorlds}
      defaultWorldId={defaultWorldId}
      updateDefaultWorldId={updateDefaultWorldId}
    />
  )
}
