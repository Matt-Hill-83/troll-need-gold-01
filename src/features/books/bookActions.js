import {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_QUEST,
  FETCH_BOOKS,
  LISTEN_TO_EVENT_CHAT,
  LISTEN_TO_SELECTED_EVENT,
  CLEAR_EVENTS,
  SET_FILTER,
  SET_START_DATE,
  CLEAR_SELECTED_EVENT,
} from "./bookConstants"
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from "../../app/async/asyncReducer"
import {
  fetchBooksFromFirestore,
  dataFromSnapshot,
} from "../../app/firestore/firestoreService"

export function fetchBooks(filter, startDate, limit, lastDocSnapshot) {
  return async function (dispatch) {
    dispatch(asyncActionStart())
    try {
      const snapshot = await fetchBooksFromFirestore(
        filter,
        startDate,
        limit,
        lastDocSnapshot
      ).get()

      const lastVisible = snapshot.docs[snapshot.docs.length - 1]
      const moreEvents = snapshot.docs.length >= limit
      const books = snapshot.docs.map((doc) => dataFromSnapshot(doc))

      dispatch({
        type: FETCH_BOOKS,
        payload: { books, moreEvents, lastVisible },
      })
      dispatch(asyncActionFinish())
    } catch (error) {
      dispatch(asyncActionError(error))
    }
  }
}

export function setFilter(value) {
  return function (dispatch) {
    dispatch(clearEvents())
    dispatch({ type: SET_FILTER, payload: value })
  }
}

export function setStartDate(date) {
  return function (dispatch) {
    dispatch(clearEvents())
    dispatch({ type: SET_START_DATE, payload: date })
  }
}

export function listenToSelectedQuest(event) {
  return {
    type: LISTEN_TO_SELECTED_EVENT,
    payload: event,
  }
}

export function listenToSelectedEvent(event) {
  return {
    type: LISTEN_TO_SELECTED_EVENT,
    payload: event,
  }
}

export function clearSelectedEvent() {
  return {
    type: CLEAR_SELECTED_EVENT,
  }
}

export function createEvent(event) {
  return {
    type: CREATE_EVENT,
    payload: event,
  }
}

export function updateEvent(event) {
  return {
    type: UPDATE_EVENT,
    payload: event,
  }
}

export function deleteQuest(eventId) {
  return {
    type: DELETE_QUEST,
    payload: eventId,
  }
}

export function listenToEventChat(comments) {
  return {
    type: LISTEN_TO_EVENT_CHAT,
    payload: comments,
  }
}

export function clearEvents() {
  return {
    type: CLEAR_EVENTS,
  }
}
