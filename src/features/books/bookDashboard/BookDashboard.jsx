import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import _uniqBy from "lodash.uniqby"

import { fetchBooks } from "../bookActions"
import { fetchQuests } from "../../quests/questActions"
import { RETAIN_STATE } from "../bookConstants"
import BookPicker from "../../../oldProject/components/BookPicker/BookPicker"

import css from "./BookDashboard.module.scss"

export default function BookDashboard() {
  const limit = 50
  const dispatch = useDispatch()
  const { quests, filter, startDate, retainState } = useSelector(
    (state) => state.quest
  )
  const { books } = useSelector((state) => state.book)
  // const [loadingInitial, setLoadingInitial] = useState(false)

  useEffect(() => {
    if (retainState) return
    // setLoadingInitial(true)
    dispatch(fetchBooks(filter, startDate, limit)).then(() => {
      // setLoadingInitial(false)
    })
    dispatch(fetchQuests(filter, startDate, limit)).then(() => {
      // setLoadingInitial(false)
    })
    return () => {
      dispatch({ type: RETAIN_STATE })
    }
  }, [dispatch, filter, startDate, retainState])

  if (!quests || quests.length === 0) return <div>no data</div>

  const uniqueBooks = _uniqBy(books, "id")
  const uniqueWorlds = _uniqBy(quests, "id")

  return (
    <BookPicker
      className={css.main}
      worlds={uniqueWorlds}
      books={uniqueBooks}
    />
  )
}
