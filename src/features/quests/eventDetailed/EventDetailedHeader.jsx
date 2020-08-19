import React from "react"
import { Segment, Image, Item, Header, Button } from "semantic-ui-react"
import { Link } from "react-router-dom"
import { format } from "date-fns"
import { useState } from "react"
import { toast } from "react-toastify"
import {
  addUserAttendance,
  cancelUserAttendance,
} from "../../../app/firestore/firestoreService"
import { useSelector } from "react-redux"
import UnauthModal from "../../auth/UnauthModal"

const eventImageStyle = {
  filter: "brightness(30%)",
}

const eventImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
}

export default function EventDetailedHeader({ event, isHost, isGoing }) {
  const [loading, setLoading] = useState(false)
  const { authenticated } = useSelector((state) => state.auth)
  const [modalOpen, setModalOpen] = useState(false)

  async function handleUserJoinEvent() {
    setLoading(true)
    try {
      await addUserAttendance(event)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleUserLeaveEvent() {
    setLoading(true)
    try {
      await cancelUserAttendance(event)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Segment.Group>
        <Segment basic attached="top" style={{ padding: "0" }}>
          <Segment basic style={eventImageTextStyle}>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Header
                    size="huge"
                    content={event.title}
                    style={{ color: "white" }}
                  />
                  <p>
                    Hosted by{" "}
                    <strong>
                      <Link to={`/profile/${event.hostUid}`}>
                        {event.hostedBy}
                      </Link>{" "}
                    </strong>
                  </p>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Segment>
      </Segment.Group>
    </>
  )
}
