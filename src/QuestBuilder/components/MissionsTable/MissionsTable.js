import _get from "lodash.get"
import { Button } from "@blueprintjs/core"
import { createMuiTheme } from "@material-ui/core/styles"
import { IconNames } from "@blueprintjs/icons"
import cx from "classnames"
import React, { useEffect } from "react"

import { getTableConfig } from "./MissionsTableConfig"
import DataTable3 from "../DataTable3/DataTable3"
import Utils from "../../Utils/Utils"

import Constants from "../../../Common/Constants/Constants"

import css from "./MissionsTable.module.scss"

export default function MissionsTable({ props }) {
  const {
    items,
    saveQuestConfig,
    setQuestConfig,
    dataTableKey,
    questConfig,
    scenes,
    sceneId,
    worldId,
  } = props

  const allItems = Utils.getAllItemsInScenes({ scenes })
  const allScenes = Utils.getSimpleSceneObjects({ scenes })
  const combinedItems = [...allItems, ...allScenes]

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

  const renderItems = ({ items }) => {
    const onAddItem = ({ rowIndex, before }) => {
      const newElement = Constants.getNewMission()
      Utils.addArrayElement({
        newElement,
        before,
        index: rowIndex,
        array: items,
      })

      saveQuestConfig()
    }

    if (items.length === 0) {
      return (
        <Button
          className={css.addTriggerButton}
          icon={IconNames.ADD}
          onClick={() => {
            onAddItem({ rowIndex: 0, before: false })
          }}
        >
          Add Mission
        </Button>
      )
    }

    const tableChangeCallback = ({ newValue, tableMeta, propertyName }) => {
      const { rowIndex } = tableMeta
      items[rowIndex][propertyName] = newValue
    }

    const onDeleteTriggerRow = ({ rowIndex }) => {
      Utils.deleteArrayElement({ index: rowIndex, array: items })
      saveQuestConfig()
    }

    const { options, columns } = getTableConfig({
      tableChangeCallback,
      onDeleteTriggerRow,
      onAddItem,
      saveConfig: () => {
        saveQuestConfig()
      },
      scenes: scenes,
      itemsToGet: combinedItems,
      sceneId,
    })

    const getMuiTheme = () =>
      createMuiTheme({
        overrides: {
          MUIDataTableHeadCell: {
            fixedHeader: {
              // display: "none",
            },
          },
          MuiTableCell: {
            root: {},
          },
        },
      })

    return (
      <DataTable3
        key={dataTableKey}
        props={{
          className: css.triggersTable,
          getMuiTheme,
          data: items,
          columns,
          options,
        }}
      />
    )
  }
  if (!questConfig) {
    return null
  }
  return <div className={cx(css.main)}>{renderItems({ items })}</div>
}
