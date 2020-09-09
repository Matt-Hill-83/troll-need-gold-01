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
  const theme = useTheme()

  function onClosePicker({ selectedItems = [] }) {
    onClose && onClose({ selectedItems })
  }

  const handleChange = (event, value, reason) => {
    console.log("reason", reason) // zzz

    setSelectedItems(value)
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

  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
    { title: "The Lord of the Rings: The Return of the King", year: 2003 },
  ]

  console.log("selectedItems[0]", selectedItems[0]) // zzz

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
          onClose={() => onClosePicker({ selectedItems })}
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
        <FormControl className={cx(classes.formControl, css.main)}>
          <InputLabel id="demo-mutiple-chip-label">Quests</InputLabel>
          <Select
            className={cx(classes.formControl, css.main2)}
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            multiple
            value={selectedItems}
            onChange={handleChange}
            onClose={() => onClosePicker({ selectedItems })}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected) => {
              return (
                <div className={classes.chips}>
                  {selected.map((item) => {
                    const { title } = item
                    return (
                      <Chip
                        key={title}
                        label={title}
                        // className={classes.chip}
                      />
                    )
                  })}
                </div>
              )
            }}
            MenuProps={MenuProps}
          >
            {sortedWorlds.map((item) => {
              const { title, newTitle } = item
              return (
                <MenuItem
                  key={title}
                  value={item}
                  style={getStyles(title, selectedItems, theme)}
                >
                  {newTitle}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </div>
    </div>
  )
}
