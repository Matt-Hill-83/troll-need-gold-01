import React from "react"
import AutoComplete2 from "../AutoComplete2/AutoComplete2"
import { toJS } from "mobx"

export default function SimpleSelectObj(props) {
  const { value } = props
  return <AutoComplete2 props={{ ...props, defaultValue: value }} />
}
