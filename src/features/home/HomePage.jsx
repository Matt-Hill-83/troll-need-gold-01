import React from "react"
import {
  Segment,
  Container,
  Header,
  Image,
  Button,
  Icon,
} from "semantic-ui-react"

export default function HomePage({ history }) {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            style={{ marginBottom: 12 }}
          />
          You're seeing this because you've successfully setup Firebase Hosting.
          Now it's time to go build something extraordinary!
        </Header>
        <Button onClick={() => history.push("/events")} size="huge" inverted>
          Get started
          <Icon name="right arrow" inverted />
        </Button>
      </Container>
    </Segment>
  )
}
