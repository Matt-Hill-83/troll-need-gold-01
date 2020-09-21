import React, { useEffect } from "react"

import Autocomplete from "@material-ui/lab/Autocomplete"
import TextField from "@material-ui/core/TextField"

import css from "./WorldMultiPicker2.module.scss"
import Utils from "../../../Common/Utils/Utils"

export default function WorldMultiPicker2(props) {
  let { books = [], worlds, worldsForPicker } = props

  const transformSelectedItems = ({ selectedItems }) => {
    return props.worlds.filter((item) => selectedItems.includes(item.id))
  }

  const initialSelectedItems = transformSelectedItems({
    selectedItems: props.selectedWorlds,
  })

  const [selectedItems, setSelectedItems] = React.useState(initialSelectedItems)

  useEffect(() => {
    books = props.books || []
  }, [])

  useEffect(() => {
    books = props.books || []
  }, [props.books])

  const handleChange = (event, value, reason) => {
    setSelectedItems(value)
    props.updateChapters({ newChapters: value.map((item) => item.id) })
  }

  // append owning chapters to world name
  worldsForPicker.map((world) => {
    const { title, id: worldId } = world
    const belongsToABook = Utils.belongsToABook({ worldId, books })

    if (belongsToABook) {
      world.newTitle = `${title} - [${belongsToABook.toString()}]`
    } else {
      world.newTitle = title
    }
  })

  worlds.map((world) => {
    const { title, id: worldId } = world
    const belongsToABook = Utils.belongsToABook({ worldId, books })

    if (belongsToABook) {
      world.newTitle = `xxx - ${title} - [${belongsToABook.toString()}]`
    } else {
      world.newTitle = title
    }
  })

  const sortedWorlds = Utils.sortWorlds({
    worlds: worldsForPicker,
    keys: ["newTitle"],
  })

  return (
    <div className={css.main}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={sortedWorlds}
        getOptionLabel={(option) => option.newTitle}
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
