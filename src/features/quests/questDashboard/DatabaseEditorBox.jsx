import { Loader, ButtonGroup, Button } from "semantic-ui-react"
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import _uniqBy from "lodash.uniqby"

import { fetchQuests } from "../questActions"
import { RETAIN_STATE } from "../questConstants"
import { updateAllQuests } from "../../../app/firestore/firestoreService"
import QuestList from "../../questList/QuestList.jsx"

import css from "./DatabaseEditorBox.module.scss"

export default function DatabaseEditorBox() {
  const limit = 1000
  const dispatch = useDispatch()
  const {
    quests,
    moreEvents,
    filter,
    startDate,
    lastVisible,
    retainState,
  } = useSelector((state) => state.quest)
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

  function handleFetchNextQuests() {
    dispatch(fetchQuests(filter, startDate, limit, lastVisible))
  }

  if (!quests || quests.length === 0) return <div>no data</div>

  const uniqueWorlds = _uniqBy(quests, "id")

  const updateQuests = updateAllQuests

  return (
    <div className={css.main}>
      <div>
        {loadingInitial && <>Loading...</>}
        <div className={css.questList}>
          <ButtonGroup className={css.floatingButtons}>
            <Button onClick={updateQuests}>Add CreateBy to all quests</Button>
          </ButtonGroup>
          <QuestList
            worlds={uniqueWorlds}
            getNextEvents={handleFetchNextQuests}
            loading={loading}
            moreEvents={moreEvents}
          />
        </div>
      </div>
      <div>
        <Loader active={loading} />
      </div>
    </div>
  )
}
