import _get from "lodash.get"
import cx from "classnames"
import React, { useEffect, useState } from "react"

import DialogBuilder2 from "../DialogBuilder2/DialogBuilder2"

import css from "./DialogBuilders.module.scss"
import MyAccordion from "../MyAccordion/MyAccordion"

export default function DialogBuilders(props) {
  const { saveItemsDialogBuilder, world } = props
  const [expandedDialogAccordions, setExpandedDialogAccordions] = useState([])

  useEffect(() => {
    // on mount

    // returned function will be called on component unmount
    return () => {}
  }, [])

  // on change in props
  useEffect(() => {}, [])

  const renderDialogBuilder = ({ world }) => {
    const scenes = world?.newGrid5 || []

    const dialogBuilders = scenes.map((scene, sceneIndex) => {
      const onChange = ({ expanded }) => {
        expandedDialogAccordions[sceneIndex] = expanded
        setExpandedDialogAccordions(expandedDialogAccordions)
      }

      const title = (
        <div className={css.subQuestHeader}>{scene.location.name}</div>
      )

      const subQuestAccordion = {
        title,
        expanded: expandedDialogAccordions[sceneIndex],
        onChange,
        content: () => (
          <DialogBuilder2
            saveItems={saveItemsDialogBuilder}
            scene={scene}
            world={world}
            sceneIndex={sceneIndex}
          />
        ),

        className: css.sceneDialogAccordion,
      }

      return <MyAccordion props={subQuestAccordion} />
    })

    return dialogBuilders
  }

  return (
    <div className={css.main}>
      <div key={"dialogBuilderKey"} className={css.dialogBuildersContainer}>
        {renderDialogBuilder({ world })}
      </div>
    </div>
  )
}
