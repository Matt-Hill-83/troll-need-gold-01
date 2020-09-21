import _get from "lodash.get"
import { Button, Classes, ButtonGroup } from "@blueprintjs/core"
import { Checkbox } from "material-ui"
import { TextField } from "@material-ui/core"
import { IconNames } from "@blueprintjs/icons"
import cx from "classnames"
import React, { useEffect, useState } from "react"

import AddDeleteButtonGroup from "../AddDeleteButtonGroup/AddDeleteButtonGroup"
import Constants from "../../../Common/Constants/Constants"
import MissionsTable from "../MissionsTable/MissionsTable"
import MyAccordion from "../MyAccordion/MyAccordion"
import MyAccordionGroup from "../MyAccordionGroup/MyAccordionGroup"
import TriggersTable from "../TriggersTable/TriggersTable"
import Utils from "../../Utils/Utils"
import AutoComplete2 from "../AutoComplete2/AutoComplete2"

import css from "./SubQuestWizard.module.scss"

export default function SubQuestWizard({ props }) {
  const [questConfig, setQuestConfig] = useState(null)
  const [dataTableKey, setDataTableKey] = useState([])

  const { onSave } = props

  useEffect(() => {
    // on mount

    // returned function will be called on component unmount
    return () => {}
  }, [])

  // on change in props
  useEffect(() => {
    // TODO: store correct prop
    setQuestConfig(props.questConfig || {})
  }, [props.questConfig])

  const scenes = props.scenes || []

  const renderMissions = ({ missions, subQuestIndex }) => {
    const missionTableProps = {
      items: missions,
      questConfig,
      saveQuestConfig,
      setQuestConfig,
      scenes,
    }

    return <MissionsTable props={missionTableProps}></MissionsTable>
  }

  const renderScenes = ({ scenes }) => {
    const realScenes = props.scenes

    const onAddScene = ({ rowIndex, before }) => {
      const newElement = Constants.getNewScene({})
      Utils.addArrayElement({
        newElement,
        before,
        index: rowIndex,
        array: scenes || [],
      })

      saveQuestConfig()
    }

    const onDeleteScene = ({ rowIndex }) => {
      Utils.deleteArrayElement({ index: rowIndex, array: scenes })
      saveQuestConfig()
    }

    if (!scenes || scenes.length === 0) {
      return (
        <Button
          onClick={() =>
            onAddScene({
              rowIndex: 0,
              before: false,
            })
          }
          icon={IconNames.ADD}
        >
          Add Scene
        </Button>
      )
    }

    return scenes.map((sceneConfig, sceneIndex) => {
      const onChangeScene = (newItem) => {
        const { location, id } = newItem
        sceneConfig.name = location.name
        sceneConfig.id = id
      }

      let largeImage = sceneConfig.largeImage

      const toggleLargeImage = () => {
        sceneConfig.largeImage = !sceneConfig.largeImage
        saveQuestConfig()
      }

      const realScene = realScenes.find((item) => item.id === sceneConfig.id)

      // create a ref to an empty array so that new triggers added will be in that referenced
      // array
      if (!sceneConfig.sceneTriggers) {
        sceneConfig.sceneTriggers = []
      }
      const triggers = sceneConfig.sceneTriggers
      const sceneHasTriggers = triggers.length > 0

      const renderContent = () => {
        const renderedSceneTriggers = sceneHasTriggers
          ? renderTriggers({ triggers, includeAddButton: false })
          : null
        return renderedSceneTriggers
      }

      const sceneTriggersAccordion = {
        title: (
          <div className={css.scenePickerGroup}>
            <AutoComplete2
              className={css.sceneDropdown}
              items={realScenes}
              defaultValue={realScene}
              getOptionLabel={(option) => _get(option, "location.name")}
              onChange={onChangeScene}
            />
            <AddDeleteButtonGroup
              props={{
                title: "",
                rowIndex: sceneIndex,
                onDelete: onDeleteScene,
                onAdd: onAddScene,
              }}
            />
            <span className={css.mapPickerButton}>
              <checkbox
                label="big"
                onClick={() => toggleLargeImage()}
                checked={largeImage}
              />
            </span>
            {renderAddTriggerButton({ triggers })}
          </div>
        ),
        expanded: true,
        content: renderContent,
        className: css.sceneTriggersAccordion,
      }

      return <MyAccordion props={sceneTriggersAccordion} />
    })
  }

  const saveQuestConfig = async () => {
    await onSave({ questConfig })
    setDataTableKey(dataTableKey + 1)
  }

  const renderAddTriggerButton = ({ triggers }) => {
    const onAddTriggerRow = ({ rowIndex, before }) => {
      const newElement = Constants.getNewTrigger()
      Utils.addArrayElement({
        newElement,
        before,
        index: rowIndex,
        array: triggers,
      })

      saveQuestConfig()
    }

    if (triggers.length === 0) {
      return (
        <Button
          className={css.addTriggerButton}
          icon={IconNames.ADD}
          onClick={() => {
            onAddTriggerRow({ rowIndex: 0, before: false })
          }}
        >
          Add Trigger
        </Button>
      )
    }
  }

  const renderTriggers = ({ triggers, includeAddButton = true }) => {
    const triggerTableProps = {
      triggers,
      questConfig,
      saveQuestConfig,
      setQuestConfig,
    }

    return (
      <>
        {includeAddButton && renderAddTriggerButton({ triggers })}
        <TriggersTable props={triggerTableProps}></TriggersTable>
      </>
    )
  }

  const renderSubQuests = () => {
    if (!questConfig) {
      return <div>no questConfig</div>
    }
    const subQuests = questConfig.subQuests

    // this is a vestigal prop
    delete questConfig.missions

    if (!subQuests) {
      return <div> no subquests</div>
    }

    return subQuests.map((subQuest, subQuestIndex) => {
      // create a ref to an empty array so that new triggers added will be in that referenced
      // array
      if (!subQuest.triggers) {
        subQuest.triggers = []
      }

      if (!subQuest.scenes) {
        subQuest.scenes = []
      }

      if (!subQuest.missions) {
        subQuest.missions = []
      }

      const { triggers, scenes, missions } = subQuest

      const missionsAccordion = {
        title: <span className={cx(css.listGroupTitle)}>Missions</span>,
        expanded: true,
        className: css.sectionsAccordion,
        content: () => renderMissions({ missions, subQuestIndex }),
      }

      const items = [
        {
          title: <span className={cx(css.listGroupTitle)}>Triggers</span>,
          expanded: true,
          className: css.sectionsAccordion,
          content: () => renderTriggers({ triggers }),
        },
        {
          title: <span className={cx(css.listGroupTitle)}>Scenes</span>,
          expanded: true,
          className: css.sectionsAccordion,
          content: () => renderScenes({ scenes }),
        },
      ]

      if (subQuestIndex === 0) {
        items.unshift(missionsAccordion)
      }
      const categoryAccordionProps = { items }

      const onAddScene = ({ rowIndex, before }) => {
        const newElement = Constants.getNewSubQuest({})
        Utils.addArrayElement({
          newElement,
          before,
          index: rowIndex,
          array: subQuests,
        })

        saveQuestConfig()
      }

      const onDeleteScene = ({ rowIndex }) => {
        Utils.deleteArrayElement({ index: rowIndex, array: scenes })
        saveQuestConfig()
      }

      const onChangeValue = ({ value = 0 }) => {
        subQuest.name = value
        saveQuestConfig()
      }

      const subQuestAccordion = {
        title: (
          <div className={css.subQuestHeader}>
            <TextField
              className={css.inputField}
              id="outlined-secondary"
              variant="outlined"
              margin="dense"
              color="secondary"
              defaultValue={subQuest.name}
              onBlur={(event) => onChangeValue({ value: event.target.value })}
            />

            <AddDeleteButtonGroup
              props={{
                title: "",
                rowIndex: subQuestIndex,
                onDelete: onDeleteScene,
                onAdd: onAddScene,
              }}
            />
          </div>
        ),
        expanded: true,
        content: () => <MyAccordionGroup props={categoryAccordionProps} />,
        className: css.subQuestAccordion,
      }

      return <MyAccordion props={subQuestAccordion} />
    })
  }

  const content = <div className={cx(css.content)}>{renderSubQuests()}</div>

  return (
    <div className={cx(css.main)}>
      {content}
      <ButtonGroup
        vertical={false}
        className={cx(Classes.ALIGN_LEFT, css.buttonGroup)}
      >
        <Button
          className={css.saveButton}
          onClick={() => onSave({ questConfig })}
        >
          Save Changes
        </Button>
      </ButtonGroup>
    </div>
  )
}
