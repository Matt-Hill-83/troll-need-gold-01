import {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  DELETE_QUEST,
  FETCH_EVENTS,
  LISTEN_TO_EVENT_CHAT,
  CLEAR_COMMENTS,
  LISTEN_TO_SELECTED_EVENT,
  CLEAR_EVENTS,
  SET_FILTER,
  SET_START_DATE,
  RETAIN_STATE,
  CLEAR_SELECTED_EVENT,
} from "./questConstants"

const initialState = {
  quests: [],
  comments: [],
  moreEvents: true,
  selectedEvent: null,
  lastVisible: null,
  filter: "all",
  startDate: new Date(),
  retainState: false,
}

export default function questReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CREATE_EVENT:
      return {
        ...state,
        quests: [...state.quests, payload],
      }
    case UPDATE_EVENT:
      return {
        ...state,
        quests: [
          ...state.quests.filter((evt) => evt.id !== payload.id),
          payload,
        ],
      }
    case DELETE_EVENT:
      return {
        ...state,
        quests: [...state.quests.filter((evt) => evt.id !== payload)],
      }
    case DELETE_QUEST:
      return {
        ...state,
        quests: [...state.quests.filter((evt) => evt.id !== payload)],
      }
    case FETCH_EVENTS:
      return {
        ...state,
        quests: [...state.quests, ...payload.quests],
        moreEvents: payload.moreEvents,
        lastVisible: payload.lastVisible,
      }
    case LISTEN_TO_EVENT_CHAT:
      return {
        ...state,
        comments: payload,
      }
    case CLEAR_COMMENTS:
      return {
        ...state,
        comments: [],
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
        quests: [],
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
    case SET_START_DATE:
      return {
        ...state,
        retainState: false,
        moreEvents: true,
        startDate: payload,
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
