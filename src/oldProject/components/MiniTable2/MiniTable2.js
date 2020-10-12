// obsolete
// use DataTable3

import cx from "classnames"
import React, { Component } from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core"

import css from "./MiniTable2.module.scss"

class MiniTable2 extends Component {
  renderCell = ({ content, firstIndex }) => {
    const value = content
    let cellContent = null

    if (typeof value === "undefined") {
      cellContent = (
        <span role="img" aria-label={"test"}>
          ❌
        </span>
      )
    } else if (value === true) {
      cellContent = (
        <span role="img" aria-label={"test"}>
          ✅
        </span>
      )
    } else if (value === false) {
      cellContent = (
        <span role="img" aria-label={"test"}>
          ❌
        </span>
      )
    } else {
      cellContent = value ? value.toString() : ""
    }

    return (
      <TableCell
        className={cx(css.cellClass)}
        tooltip={value ? value.toString() : ""}
      >
        {cellContent}
      </TableCell>
    )
  }

  render = () => {
    const { tableData, columnNames } = this.props

    return (
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {columnNames.map((header, index) => (
                <TableCell key={index}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((element, firstIndex) => {
              const activeClass =
                this.props.activeMissionIndex === firstIndex
                  ? css.activeClass
                  : ""

              return (
                <TableRow key={firstIndex} className={cx(activeClass)}>
                  {Object.keys(element).map((child, secondIndex) => {
                    return this.renderCell({
                      content: element[child],
                      firstIndex,
                    })
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}

export default MiniTable2
