import React from "react"
import { Segment, Item, Icon, List, Button, Label } from "semantic-ui-react"
import { Link } from "react-router-dom"
import { format } from "date-fns"

export default function EventListItem({ event }) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src={event.hostPhotoURL} />
            <Item.Content>
              <Item.Header content={event.title} />
              <Item.Description>
                <Link to={`/profile/${event.hostUid}`}>{event.hostedBy}</Link>{" "}
              </Item.Description>
              <Button
                as={Link}
                to={`/quests/${event.id}`}
                color="teal"
                floated="right"
                content="View"
              />
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Segment.Group>
  )
}
