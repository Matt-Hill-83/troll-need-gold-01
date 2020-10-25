import React, { useEffect, useState } from "react"

import DialogBuilder2 from "../DialogBuilder2/DialogBuilder2"

import css from "./DialogBuilders.module.scss"
import MyAccordion from "../MyAccordion/MyAccordion"
import ImageDisplay from "../../../Common/Components/ImageDisplay/ImageDisplay"

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
      const { id } = scene

      const onChange = ({ expanded }) => {
        expandedDialogAccordions[sceneIndex] = expanded
        setExpandedDialogAccordions(expandedDialogAccordions)
      }

      const sceneProps = { name: scene.location.name, id, index: sceneIndex }

      const title = (
        <div className={css.sceneAccordHeader}>
          <ImageDisplay item={sceneProps} className={css.sceneImage} />
          <div className={css.sceneName}>{scene.location.name}</div>
        </div>
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
