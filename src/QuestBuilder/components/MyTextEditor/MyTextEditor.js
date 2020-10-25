import { TextareaAutosize } from "@material-ui/core"
import cx from "classnames"
import React, { useState, useEffect } from "react"

import css from "./MyTextEditor.module.scss"

export default function MyTextEditor({ props }) {
  const { className = "" } = props
  const [content, setContent] = useState("")

  useEffect(() => {
    // on mount
    // returned function will be called on component unmount
    return () => {}
  }, [])

  // on change in props
  useEffect(() => {
    setContent(props.content)
  }, [props.content])

  const onSubmit = () => {
    props.onSubmit && props.onSubmit({ content })
  }

  const onTextAreaChange = (event) => {
    setContent(event.target.value)
  }

  return (
    <TextareaAutosize
      className={cx(css.main, className)}
      onChange={onTextAreaChange}
      onBlur={onSubmit}
      value={content}
    >
      {content}
    </TextareaAutosize>
  )
}
