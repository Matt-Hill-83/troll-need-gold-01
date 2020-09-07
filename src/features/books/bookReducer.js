import {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  DELETE_QUEST,
  FETCH_BOOKS,
  LISTEN_TO_SELECTED_EVENT,
  CLEAR_EVENTS,
  SET_FILTER,
  RETAIN_STATE,
  CLEAR_SELECTED_EVENT,
} from "./bookConstants"

const initialState = {
  books: [],
  comments: [],
  moreEvents: true,
  selectedEvent: null,
  lastVisible: null,
  filter: "all",
  startDate: new Date(),
  retainState: false,
}

export default function bookReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CREATE_EVENT:
      return {
        ...state,
        books: [...state.books, payload],
      }
    case UPDATE_EVENT:
      return {
        ...state,
        books: [...state.books.filter((evt) => evt.id !== payload.id), payload],
      }
    case DELETE_EVENT:
      return {
        ...state,
        books: [...state.books.filter((evt) => evt.id !== payload)],
      }
    case DELETE_QUEST:
      return {
        ...state,
        quests: [...state.quests.filter((evt) => evt.id !== payload)],
      }
    case FETCH_BOOKS:
      return {
        ...state,
        books: [...state.books, ...payload.books],
        moreEvents: payload.moreEvents,
        lastVisible: payload.lastVisible,
      }

    case LISTEN_TO_SELECTED_EVENT:
      return {
        ...state,
        selectedEvent: payload,
      }
    case CLEAR_SELECTED_EVENT:
      return {
        ...state,
        selectedEvent: null,
      }
    case CLEAR_EVENTS:
      return {
        ...state,
        books: [],
        moreEvents: true,
        lastVisible: null,
      }
    case SET_FILTER:
      return {
        ...state,
        retainState: false,
        moreEvents: true,
        filter: payload,
      }

    case RETAIN_STATE:
      return {
        ...state,
        retainState: true,
      }
    default:
      return state
  }
}
