import { Container } from "semantic-ui-react"
import { Route, useLocation } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { useSelector } from "react-redux"
import React from "react"

import AccountPage from "../../features/auth/AccountPage"
import ErrorComponent from "../common/errors/ErrorComponent"
import EventDashboard from "../../features/events/eventDashboard/EventDashboard"
import EventDetailedPage from "../../features/events/eventDetailed/EventDetailedPage"
import EventForm from "../../features/events/eventForm/EventForm"
import HomePage from "../../features/home/HomePage"
import LoadingComponent from "./LoadingComponent"
import ModalManager from "../common/modals/ModalManager"
import NavBar from "../../features/nav/NavBar"
import PrivateRoute from "./PrivateRoute"
import ProfilePage from "../../features/profiles/profilePage/ProfilePage"
import QuestDashboard from "../../features/quests/questDashboard/QuestDashboard"
import QuestDetailedPage from "../../features/quests/eventDetailed/QuestDetailedPage"
import Sandbox from "../../features/sandbox/Sandbox"

export default function App() {
  const { key } = useLocation()
  const { initialized } = useSelector((state) => state.async)

  if (!initialized) return <LoadingComponent content="Loading app..." />

  return (
    <>
      <ModalManager />
      <ToastContainer position="bottom-right" hideProgressBar />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container className="main">
              <Route exact path="/quests" component={QuestDashboard} />
              <Route exact path="/events" component={EventDashboard} />
              <Route exact path="/sandbox" component={Sandbox} />
              <Route path="/events/:id" component={EventDetailedPage} />
              <Route path="/quests/:id" component={QuestDetailedPage} />
              <PrivateRoute
                path={["/createEvent", "/manage/:id"]}
                component={EventForm}
                key={key}
              />
              <PrivateRoute path="/account" component={AccountPage} />
              <PrivateRoute path="/profile/:id" component={ProfilePage} />
              <Route path="/error" component={ErrorComponent} />
            </Container>
          </>
        )}
      />
    </>
  )
}
