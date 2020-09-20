import React from "react"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"

export default class SimpleSelect extends React.Component {
  render() {
    const { value, index, change, items } = this.props

    return (
      <FormControl>
        <Select
          value={value}
          onChange={(event) => change(event.target.value, index)}
          style={{ fontSize: "inherit" }}
        >
          {items.map((city, index) => (
            <MenuItem key={index} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }
}
