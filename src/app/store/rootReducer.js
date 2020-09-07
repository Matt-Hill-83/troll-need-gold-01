import { combineReducers } from "redux"
import testReducer from "../../features/sandbox/testReducer"
import questReducer from "../../features/quests/questReducer"
import bookReducer from "../../features/books/bookReducer"
import modalReducer from "../common/modals/modalReducer"
import authReducer from "../../features/auth/authReducer"
import asyncReducer from "../async/asyncReducer"
import profileReducer from "../../features/profiles/profileReducer"
import { connectRouter } from "connected-react-router"

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    test: testReducer,
    quest: questReducer,
    book: bookReducer,
    modals: modalReducer,
    auth: authReducer,
    async: asyncReducer,
    profile: profileReducer,
  })

export default rootReducer
