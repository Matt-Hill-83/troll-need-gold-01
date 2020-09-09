import { makeStyles, useTheme } from "@material-ui/core/styles"
import Chip from "@material-ui/core/Chip"
import cx from "classnames"
import FormControl from "@material-ui/core/FormControl"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import React, { useEffect } from "react"
import Select from "@material-ui/core/Select"

import Utils from "../../Utils/Utils"

import Autocomplete from "@material-ui/lab/Autocomplete"
import TextField from "@material-ui/core/TextField"

import css from "./WorldMultiPicker2.module.scss"

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function getStyles(name, selectedItems, theme) {
  console.log("selectedItems", selectedItems) // zzz
  return {
    fontWeight:
      selectedItems.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

export default function WorldMultiPicker2({ props }) {
  const { bookId, onClose, allWorlds } = props
  console.log("onClose", onClose) // zzz

  const [selectedItems, setSelectedItems] = React.useState([])
  console.log("selectedItems---------main", selectedItems) // zzz

  useEffect(() => {
    const selectedItems = props.allWorlds.filter((item) =>
      props.selectedWorlds.includes(item.id)
    )
    setSelectedItems(selectedItems)
  }, [])

  useEffect(() => {}, [props.selectedWorlds])

  const classes = useStyles()

  const handleChange = (event, value, reason) => {
    setSelectedItems(value)
    props.updateChapters({ newChapters: value.map((item) => item.id) })
  }

  const worlds = [...allWorlds]

  worlds.map((world) => {
    const { title, id: worldId } = world
    const belongsToABook = Utils.belongsToABook({ bookId, worldId })

    if (belongsToABook) {
      world.newTitle = `xxx - ${title} - [${belongsToABook.toString()}]`
    } else {
      world.newTitle = title
    }
  })

  const sortedWorlds = Utils.sortWorlds({ worlds, keys: ["newTitle"] })

  if (!selectedItems[0]) return <div>no items</div>

  return (
    <div>
      <div className={classes.root}>
        <Autocomplete
          multiple
          id="tags-outlined"
          options={sortedWorlds}
          getOptionLabel={(option) => option.title}
          defaultValue={selectedItems}
          filterSelectedOptions
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="filterSelectedOptions"
              placeholder="Favorites"
            />
          )}
        />
      </div>
    </div>
  )
}
