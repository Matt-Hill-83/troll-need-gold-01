import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { fetchBooks } from "../bookActions"
import { RETAIN_STATE } from "../bookConstants"
import BookPicker from "../../../oldProject/components/BookPicker/BookPicker"

import css from "./QuestDashboard.module.scss"

export default function BookDashboard() {
  const limit = 20
  const dispatch = useDispatch()
  const { events, filter, startDate, retainState } = useSelector(
    (state) => state.quest
  )
  const { books } = useSelector((state) => state.book)
  const test = useSelector((state) => state.book)
  console.log("test------------------------", test) // zzz
  console.log("test------------------------", test) // zzz
  const { loading } = useSelector((state) => state.async)
  const { authenticated } = useSelector((state) => state.auth)
  const [loadingInitial, setLoadingInitial] = useState(false)

  useEffect(() => {
    if (retainState) return
    setLoadingInitial(true)
    dispatch(fetchBooks(filter, startDate, limit)).then(() => {
      setLoadingInitial(false)
    })
    return () => {
      dispatch({ type: RETAIN_STATE })
    }
  }, [dispatch, filter, startDate, retainState])

  console.log("books", books) // zzz

  if (!events || events.length === 0) return <div>no data</div>

  return <BookPicker maps={events} books={books}></BookPicker>
}
