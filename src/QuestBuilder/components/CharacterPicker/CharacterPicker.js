import React from "react"
import { Button } from "@blueprintjs/core"
import cx from "classnames"

import css from "./CharacterPicker.module.scss"
import { Dialog } from "@material-ui/core"

export default function CharacterPicker(props) {
  const selectItem = ({ itemId, name }) => {
    const { onSelectItem } = props
    onSelectItem({ itemId, name })
  }

  const renderItemPicker = ({ imageSet }) => {
    if (!imageSet) return null

    const renderedImages = Object.keys(imageSet).map((key, index) => {
      const image = imageSet[key]

      return (
        <div
          className={css.itemImageContainer}
          key={index}
          onClick={() => selectItem({ name: key })}
        >
          <span className={css.itemLabel}>{key}</span>
          <img className={css.itemImage} src={image} alt={"imagex"} />
        </div>
      )
    })

    return (
      <div className={css.girlPickerContainer}>
        <div className={css.girlPicker}>{renderedImages}</div>
      </div>
    )
  }

  const { onClose, imageSets, className = "" } = props

  const renderedImageSets = imageSets.map((imageSet, index) => {
    return renderItemPicker({ imageSet, index })
  })

  return (
    <Dialog
      // onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={true}
      // open={open}
    >
      test
    </Dialog>
  )

  return (
    <div className={cx(css.main, className)}>
      <Button onClick={() => onClose({})}>Close</Button>
      {renderedImageSets}
    </div>
  )
}
