import { ButtonGroup, Button } from "@blueprintjs/core"
import React, { useState, useEffect } from "react"
import JSONEditorDemo from "../JsonEdtor/JSONEditorDemo.js"

import css from "./MyJsonEditor.module.scss"

export default function MyJsonEditor(props) {
  const [jsonUnderEdit, setJsonUnderEdit] = useState(props.json || {})

  useEffect(() => {
    console.log("onMount-------------------------------->>>>")

    // returned function will be called on component unmount
    return () => {
      console.log("unmount")
    }
  }, [])

  // on change in props
  useEffect(() => {
    console.log("new props =================================>>>>>")
    setJsonUnderEdit(props.json)
  }, [props.json])

  const onChangeJSON = (json) => {
    setJsonUnderEdit(json)
  }

  const saveChanges = ({ jsonUnderEdit }) => {
    props.onSave({ scene: jsonUnderEdit })
  }

  return (
    <div className={css.bookEditor} title={"Edit Book"}>
      <div className="contents">
        <JSONEditorDemo json={jsonUnderEdit} onChangeJSON={onChangeJSON} />
        <ButtonGroup className={css.buttonGroup} color="primary">
          <Button onClick={() => saveChanges({ jsonUnderEdit })}>
            Save Changes
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}
