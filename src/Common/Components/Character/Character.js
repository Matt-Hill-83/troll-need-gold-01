import React from "react"

import Images from "../../../Common/Images/images"
import Head from "../Head/Head"
import ImageDisplay from "../ImageDisplay/ImageDisplay"

import css from "./Character.module.scss"

const girlImages = Images.posableCharacters

export default function Character(props) {
  const {
    headClassName,
    showHeadOnly,
    name,
    mood,
    isEditMode,
    flipImage = false,
  } = props

  const images = girlImages.find((girl) => girl.name === name)

  // if there are no posable images
  if (!images) {
    const image = Images.all[name]
    if (!image) return null
    const item = { name, id: name, flipImage }
    return (
      <div className={css.characterContainer}>
        <ImageDisplay
          item={item}
          className={css.characterImage}
          showLabel={true}
        />
      </div>
    )
  }

  // else...
  const {
    images: { heads, body },
  } = images

  const head = heads.find((head) => head.mood === mood) || heads[0]

  const className = showHeadOnly
    ? css.headOnly
    : `${css.headForBody} ${isEditMode ? "" : css.noBorder}`

  const headOnly = (
    <>
      <Head
        name={name}
        head={head}
        className={headClassName || className}
        isEditMode={isEditMode}
      />
      <span className={`${css.bodyLabel}`}>{name}</span>
    </>
  )

  if (showHeadOnly) {
    return headOnly
  }

  return (
    <div className={css.girlBodyContainer}>
      <img className={`${css.girlBodyImage}`} src={body.image} alt={`name`} />
      <span className={`${css.bodyLabel}`}>{name}</span>
      {headOnly}
    </div>
  )
}
