import React from "react"
import { Segment, Item, Icon, List, Button, Label } from "semantic-ui-react"
import { Link } from "react-router-dom"

export default function EventListItem({ event }) {
  console.log("event", event) // zzz
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header content={event.title} />
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
