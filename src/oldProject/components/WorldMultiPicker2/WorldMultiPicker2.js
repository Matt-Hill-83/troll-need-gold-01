import { makeStyles, useTheme } from "@material-ui/core/styles"
import React, { useEffect } from "react"

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
    <div className={css.main}>
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
  )
}
