import { observer } from "mobx-react"
import React, { Component } from "react"
import { toJS } from "mobx"

import Images from "../../../Common/images/images"

import css from "./ImageDisplay.module.scss"

class ImageDisplay extends Component {
  state = {}

  componentWillMount() {
    let { items = [] } = this.props
    this.setState({ items: [...items] })
  }

  componentWillReceiveProps(newProps) {
    let { items = [] } = newProps
    this.setState({ items: [...items] })
  }

  render() {
    const {
      item: { name, id, index },
      showLabel,
      amount = 0,
      className,
      showAmount = false,
    } = this.props

    const image = this.props.images || Images.all[name]

    return (
      <div
        className={`${css.main} ${className ? className : ""}`}
        key={id || index}
      >
        {showAmount && <div className={css.amount}>{amount}</div>}
        <div className={css.imageContainer}>
          {image && <img className={css.image} src={image} alt={name} />}
          {showLabel && <span className={`${css.itemLabel}`}>{name}</span>}
        </div>
      </div>
    )
  }
}

export default observer(ImageDisplay)
