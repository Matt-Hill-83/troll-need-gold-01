import React, { useEffect } from "react"
// import { toJS } from "mobx"
import cx from "classnames"
import MUIDataTable from "mui-datatables"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"

import DataTable3Config from "./DataTable3Config"

import css from "./DataTable3.module.scss"

export default function DataTable3({ props }) {
  const { data, columns, options, getMuiTheme } = props

  const defaultOptions = DataTable3Config.options || {}
  const tableOptions = { ...defaultOptions, ...options }
  const className = cx(css.main, props.className || "")

  const defaultGetMuiTheme = () =>
    createMuiTheme({
      overrides: {
        // MUIDataTableHeadCell: {
        //   fixedHeader: {
        //     display: "none",
        //   },
        // },
        // MUIDataTableBodyCell: {
        //   root: {
        //     backgroundColor: "#FF0000",
        //   },
        // },
      },
    })

  const theme = getMuiTheme ? getMuiTheme() : defaultGetMuiTheme()

  return (
    <MuiThemeProvider theme={theme}>
      <MUIDataTable
        className={className}
        data={data}
        columns={columns}
        options={tableOptions}
      />
    </MuiThemeProvider>
  )
}
