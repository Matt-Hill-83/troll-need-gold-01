import React from "react"
import cx from "classnames"

import Images from "../../../Common/Images/images"

import css from "./ImageDisplay.module.scss"

export default function ImageDisplay(props) {
  const {
    item,
    item: { name, id, index },
    showLabel,
    amount = 0,
    className,
    showAmount = false,
    buttons = null,
  } = props

  const flipImage = item && item.flipImage
  const image = props.image || Images.all[name]

  return (
    <div
      className={cx(css.main, {
        [className]: !!className,
        [css.flipImage]: flipImage,
      })}
      key={id || index}
    >
      <div className={css.imageContainer}>
        {showAmount && amount > 1 && <div className={css.amount}>{amount}</div>}
        {image && <img className={css.image} src={image} alt={name} />}
        {showLabel && <span className={`${css.itemLabel}`}>{name}</span>}
      </div>
      <div className={css.buttons}>{buttons}</div>
    </div>
  )
}
