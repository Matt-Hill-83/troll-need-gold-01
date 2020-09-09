import React, { useEffect } from "react"

import Autocomplete from "@material-ui/lab/Autocomplete"
import TextField from "@material-ui/core/TextField"
import Utils from "../../Utils/Utils"

import css from "./WorldMultiPicker2.module.scss"

export default function WorldMultiPicker2(props) {
  let { books = [], worlds } = props
  const [selectedItems, setSelectedItems] = React.useState([])
  console.log("books---WorldMultiPicker2", books) // zzz

  useEffect(() => {
    const selectedItems = props.worlds.filter((item) =>
      props.selectedWorlds.includes(item.id)
    )
    setSelectedItems(selectedItems)
    books = props.books || []
  }, [])

  useEffect(() => {
    books = props.books || []
  }, [props.books])

  const handleChange = (event, value, reason) => {
    setSelectedItems(value)
    props.updateChapters({ newChapters: value.map((item) => item.id) })
  }

  // const worlds = [...worlds]

  worlds.map((world) => {
    const { title, id: worldId } = world
    const belongsToABook = Utils.belongsToABook({ worldId, books })
    console.log("belongsToABook", belongsToABook) // zzz

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
        getOptionLabel={(option) => option.newTitle}
        // getOptionLabel={(option) => option.title}
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
