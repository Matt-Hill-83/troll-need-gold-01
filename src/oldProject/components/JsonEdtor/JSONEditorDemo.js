import React, { useEffect } from "react"
import JSONEditor from "jsoneditor"
import "jsoneditor/dist/jsoneditor.css"
import "./JSONEditorDemo.css"

export default function JSONEditorDemo(props) {
  let jsoneditor
  let container

  useEffect(() => {
    const options = {
      mode: "tree",
      onChangeJSON: props.onChangeJSON,
    }

    jsoneditor = new JSONEditor(container, options)
    jsoneditor.set(props.json)

    return () => {
      if (jsoneditor) {
        jsoneditor.destroy()
      }
    }
  }, [])

  useEffect(() => {
    jsoneditor && jsoneditor.update(props.json)
  }, [props.json])

  return (
    <div
      className="jsoneditor-react-container"
      ref={(elem) => (container = elem)}
    />
  )
}
