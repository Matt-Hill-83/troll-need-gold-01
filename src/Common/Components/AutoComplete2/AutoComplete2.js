import Autocomplete from "@material-ui/lab/Autocomplete"
import cx from "classnames"
import React from "react"
import TextField from "@material-ui/core/TextField"
import Utils from "../../../Common/Utils/Utils"

import css from "./AutoComplete2.module.scss"

export default function AutoComplete2(props) {
  const {
    className = "",
    defaultValue,
    getOptionLabel,
    items = [],
    label,
    onChange,
    sortKeys = ["name"],
  } = props

  const defaultGetOptionLabel = (option) => option.title || "----"
  const getLabel = getOptionLabel
    ? (option) => getOptionLabel(option) || "---"
    : defaultGetOptionLabel

  const _onChange = (event = null, value) => {
    onChange && onChange(value)
  }

  let sortedData
  if (sortKeys && sortKeys.length > 0) {
    sortedData = Utils.sortDataByNestedKey({
      data: items,
      keys: sortKeys,
      order: "ASC",
    })
  } else {
    sortedData = items
  }

  const listboxProps = { className: css.test }
  return (
    <div className={cx(css.main, className)}>
      <Autocomplete
        ListboxProps={listboxProps}
        disableListWrap={true}
        options={sortedData}
        clearOnEscape={true}
        getOptionLabel={getLabel}
        onChange={_onChange}
        id="auto-complete"
        autoComplete
        includeInputInList
        defaultValue={defaultValue}
        renderInput={(params) => {
          return <TextField {...params} label={label} variant="outlined" />
        }}
      />
    </div>
  )
}
