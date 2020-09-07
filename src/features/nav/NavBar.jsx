import React from "react"
import { Menu, Container, Button } from "semantic-ui-react"
import { NavLink } from "react-router-dom"
import SignedOutMenu from "./SignedOutMenu"
import SignedInMenu from "./SignedInMenu"
import { useSelector } from "react-redux"

export default function NavBar({ setFormOpen }) {
  const { authenticated } = useSelector((state) => state.auth)

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/quests" name="Quests List" />
        {/* <Menu.Item as={NavLink} to="/books" name="Books" /> */}
        {authenticated ? <SignedInMenu /> : <SignedOutMenu />}
      </Container>
    </Menu>
  )
}
