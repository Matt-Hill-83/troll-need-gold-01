import React, { Component } from "react"
import { Button, Dialog } from "@blueprintjs/core"

import css from "./CharacterPicker.module.scss"

class CharacterPicker extends Component {
  state = {}

  componentWillMount() {
    const { imageSets } = this.props
    this.setState({ imageSets })
  }

  componentWillReceiveProps(newProps) {
    const { imageSets } = newProps
    this.setState({ imageSets })
  }

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
    const { imageSets } = this.state
    const { isOpen, onClose } = this.props

    const renderedImageSets = imageSets.map((imageSet, index) => {
      return this.renderItemPicker({ imageSet, index })
    })

    return (
      <div
        // isOpen={isOpen}
        // canEscapeKeyClose={true}
        // isCloseButtonShown={true}
        className={css.main}
        // onClose={onClose}
      >
        <Button onClick={() => onClose({})}>Close</Button>
        {renderedImageSets}
      </div>
    )
  }
}

export default CharacterPicker
