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
  } = props

  const flipImage = item && item.flipImage

  const image = props.images || Images.all[name]

  return (
    <div
      className={cx(css.main, {
        [className]: !!className,
        [css.flipImage]: flipImage,
      })}
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
