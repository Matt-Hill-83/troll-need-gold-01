import { Menu } from "semantic-ui-react"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import React from "react"

import SignedInMenu from "./SignedInMenu"
import SignedOutMenu from "./SignedOutMenu"
import Constants from "../../Common/Constants/Constants"
import useGlobalState from "../../Context/useGlobalState"

import css from "./NavBar.module.scss"

export default function NavBar() {
  const { authenticated } = useSelector((state) => state.auth)
  const { globalState } = useGlobalState()

  const worldTitle = globalState?.world?.title || ""

  return (
    <Menu inverted fixed="top" className={css.main}>
      <Menu.Item as={NavLink} to="/books" name="Books" />
      {!Constants.isProdRelease && (
        <>
          <Menu.Item as={NavLink} to="/quests" name="Quests List" />
          {/* <Menu.Item as={NavLink} to="/quest-builder" name="Builder" /> */}
        </>
      )}
      {authenticated ? <SignedInMenu /> : <SignedOutMenu />}
      {worldTitle && <div className={css.worldTitle}>{worldTitle}</div>}
    </Menu>
  )
}
