import _get from "lodash.get"
import { createMuiTheme } from "@material-ui/core/styles"

import cx from "classnames"
import React, { useEffect, useState } from "react"

import { getSubQuestTableConfigFunc } from "./SubQuestTableConfig"
import Constants from "../../Utils/Constants/Constants"
import DataTable3 from "../DataTable3/DataTable3"
import Utils from "../../Utils/Utils"

import css from "./TriggersTable.module.scss"

export default function TriggersTable({ props }) {
  const {
    triggers,
    saveQuestConfig,
    setQuestConfig,
    dataTableKey,
    questConfig,
  } = props

  useEffect(() => {
    // on mount

    // returned function will be called on component unmount
    return () => {}
  }, [])

  // on change in props
  useEffect(() => {
    setQuestConfig(props.questConfig || {})
  }, [props.questConfig])

  const renderTriggers = ({ triggers }) => {
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
      return null
    }

    const tableChangeCallback = ({ newValue, tableMeta, propertyName }) => {
      const { rowIndex } = tableMeta
      triggers[rowIndex][propertyName] = newValue
    }

    const onDeleteTriggerRow = ({ rowIndex }) => {
      Utils.deleteArrayElement({ index: rowIndex, array: triggers })
      saveQuestConfig()
    }

    const { options, columns } = getSubQuestTableConfigFunc({
      tableChangeCallback,
      onDeleteTriggerRow,
      onAddTriggerRow,
      saveConfig: () => {
        saveQuestConfig()
      },
    })

    const getMuiTheme = () =>
      createMuiTheme({
        overrides: {
          MUIDataTableHeadCell: {
            fixedHeader: {
              display: "none",
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
          data: triggers,
          columns,
          options,
        }}
      />
    )
  }
  if (!questConfig) {
    return null
  }

  return <div className={cx(css.main)}>{renderTriggers({ triggers })}</div>
}
