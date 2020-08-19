import {
  Button,
  ButtonGroup,
  Popover,
  Classes,
  PopoverInteractionKind,
} from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
// import { toJS } from "mobx"
import cx from "classnames"
import React from "react"

import css from "./AddDeleteButtonGroup.module.scss"

export default function AddDeleteButtonGroup({ props }) {
  const {
    moreNestedButtons,
    rowIndex,
    onDelete,
    onAdd,
    title = "",
    moreButtons = null,
    className = "",
    noPopover = false,
    vertical = true,
  } = props

  const buttons = (
    <ButtonGroup
      vertical={vertical}
      className={cx(Classes.ALIGN_LEFT, css.buttonGroup)}
    >
      {moreButtons}
      {moreNestedButtons}
      <Button
        onClick={() =>
          onAdd({
            rowIndex,
            before: true,
          })
        }
        icon={IconNames.ADD}
      />
      <Button onClick={() => onDelete({ rowIndex })} icon={IconNames.TRASH} />
      <Button
        onClick={() =>
          onAdd({
            rowIndex,
            before: false,
          })
        }
        icon={IconNames.ADD}
      />
    </ButtonGroup>
  )

  if (noPopover) {
    return buttons
  }

  return (
    <ButtonGroup className={cx(Classes.ALIGN_LEFT, css.buttonGroup, className)}>
      {moreButtons}
      <Popover interactionKind={PopoverInteractionKind.HOVER} content={buttons}>
        <Button icon={IconNames.SETTINGS} />
      </Popover>
      {title}
    </ButtonGroup>
  )
}
