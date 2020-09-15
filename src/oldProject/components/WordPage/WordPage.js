import React, { useContext } from "react"
import _get from "lodash.get"

import FrameViewer from "../FrameViewer/FrameViewer.js"

import css from "./WordPage.module.scss"

export default function WordPage(props) {
  return (
    <div className={css.textPage}>
      <FrameViewer />
    </div>
  )
}
