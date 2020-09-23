import { ButtonGroup, Button } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import cx from "classnames"
import React, { useState, useEffect } from "react"

import JSONEditorDemo from "../JsonEdtor/JSONEditorDemo.js"

// import { updateQuestInFirestore } from "../../../app/firestore/firestoreService.js"

import css from "./MyJsonEditor.module.scss"

let world = {}

export default function MyJsonEditor(props) {
  world = props.world || {}
  const [jsonUnderEdit, setJsonUnderEdit] = useState(props.json || {})

  useEffect(() => {
    console.log("onMount-------------------------------->>>>")
    world = props.world

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
      <ButtonGroup className={css.buttonGroup} color="primary">
        <Button onClick={() => saveChanges({ jsonUnderEdit })}>
          Save Changes
        </Button>
      </ButtonGroup>
      <div className="contents">
        <JSONEditorDemo json={jsonUnderEdit} onChangeJSON={onChangeJSON} />
      </div>
    </div>
  )
}
