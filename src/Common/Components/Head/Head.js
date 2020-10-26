import React from "react"

import css from "./Head.module.scss"

export default function Head(props) {
  const {
    name,
    head: { image, mood, isEditMode },
    className = "",
  } = props

  let imageClassName = ""
  if (name === "kat" || name === "liz2" || name === "chad") {
    imageClassName = css.girlHeadKat
  }

  const imageClass = !!imageClassName ? imageClassName : css.girlHeadAmber
  const containerClass = !!imageClassName ? "" : css.girlHeadAmberContainer

  return (
    <div className={`${css.girlHeadContainer} ${className}  ${containerClass}`}>
      <img
        className={`${css.girlHead} ${imageClass}`}
        src={image}
        alt={"mood"}
      />
      {isEditMode && <span className={css.moodLabel}>{mood}</span>}
    </div>
  )
}
