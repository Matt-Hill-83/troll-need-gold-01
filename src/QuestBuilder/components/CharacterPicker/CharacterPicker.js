import React, { Component } from "react"
import { Button } from "@blueprintjs/core"

import css from "./CharacterPicker.module.scss"

class CharacterPicker extends Component {
  selectItem = ({ itemId, name }) => {
    const { onSelectItem } = this.props
    onSelectItem({ itemId, name })
  }

  renderItemPicker = ({ imageSet }) => {
    if (!imageSet) return null

    const renderedImages = Object.keys(imageSet).map((key, index) => {
      const image = imageSet[key]

      return (
        <div
          className={css.itemImageContainer}
          key={index}
          onClick={() => this.selectItem({ name: key })}
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

  render() {
    const { onClose, imageSets } = this.props

    const renderedImageSets = imageSets.map((imageSet, index) => {
      return this.renderItemPicker({ imageSet, index })
    })

    return (
      <div className={css.main}>
        <Button onClick={() => onClose({})}>Close</Button>
        {renderedImageSets}
      </div>
    )
  }
}

export default CharacterPicker
