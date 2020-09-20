import React from "react"
import TextField from "@material-ui/core/TextField"
import _get from "lodash.get"

import Utils from "../../Utils/Utils"
import AddDeleteButtonGroup from "../AddDeleteButtonGroup/AddDeleteButtonGroup"
import AutoComplete2 from "../AutoComplete2/AutoComplete2"

import css from "./MissionsTableConfig.module.scss"

export const getTableConfig = ({
  tableChangeCallback = () => {},
  onDeleteTriggerRow,
  onAddItem,
  saveConfig,
  scenes,
  itemsToGet,
}) => {
  const renderItem = (value, tableMeta, updateValue) => {
    const onChange = (newValue) => {
      const { rowIndex, columnIndex } = tableMeta
      updateValue(newValue)
      tableMeta.tableData[rowIndex][columnIndex] = { ...newValue }
      tableChangeCallback({ tableMeta, newValue, propertyName: "item" })
    }

    const itemToGet = itemsToGet.find((item) => item.name === value.name)

    const getOptionLabel = (option) => {
      let sceneName = ""
      const scene =
        scenes.find((scene) => {
          return scene.id === option.sceneId
        }) || null

      if (scene && scene.id) {
        sceneName = ` [${scene.location.name}]`
      }

      const test = `${option.name}${sceneName}`
      return test
    }

    const props = {
      sortKeys: ["name"],
      items: itemsToGet,
      defaultValue: itemToGet,
      getOptionLabel,
      onChange: onChange,
    }

    return <AutoComplete2 {...props} />
  }

  const renderName = (value, tableMeta, updateValue) => {
    const onChange = (newValue) => {
      updateValue(newValue)
      tableChangeCallback({
        tableMeta,
        newValue: newValue.value,
        propertyName: "name",
      })
      saveConfig()
    }

    return (
      <TextField
        className={css.inputField}
        id="outlined-secondary"
        variant="outlined"
        margin="dense"
        color="secondary"
        defaultValue={value}
        onBlur={(event) => onChange({ value: event.target.value })}
        InputProps={{}}
      />
    )
  }

  const renderRecipient = (value, tableMeta, updateValue) => {
    const onChange = (newValue) => {
      updateValue(newValue)
      tableChangeCallback({
        tableMeta,
        newValue: newValue,
        propertyName: "recipient",
      })
      saveConfig()
    }

    const allItems = Utils.getAllItemsInScenes({ scenes })
    const allScenes = Utils.getSimpleSceneObjects({ scenes })
    const combinedItems = [...allItems, ...allScenes]

    combinedItems.forEach((item) => {
      if (!item.id) {
        item.id = Utils.generateUuid()
      }
    })

    const scene = combinedItems.find((item) => {
      const match = item.id === value.id

      return match
    })

    return (
      <AutoComplete2
        items={combinedItems}
        defaultValue={scene}
        getOptionLabel={(option) => {
          return _get(option, "name") || "error!!!"
        }}
        onChange={onChange}
      />
    )
  }

  const tableConfig = {
    options: {
      selectableRows: "none",
      onCellClick: () => {},
      onRowClick: () => {},
    },
    columns: [
      {
        name: "none",
        label: " ",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRender: (value, tableMeta, updateValue) => (
            <AddDeleteButtonGroup
              props={{
                rowIndex: tableMeta.rowIndex,
                onDelete: onDeleteTriggerRow,
                onAdd: onAddItem,
              }}
            />
          ),
        },
      },
      {
        name: "name",
        label: "Mission",
        options: {
          sort: false,
          filter: true,
          customBodyRender: renderName,
        },
      },
      {
        name: "item",
        label: "Bring the...",
        options: {
          sort: false,
          filter: true,
          customBodyRender: renderItem,
        },
      },
      {
        name: "recipient",
        label: "to the...",
        options: {
          sort: false,
          filter: true,
          customBodyRender: renderRecipient,
        },
      },
    ],
  }

  return tableConfig
}
