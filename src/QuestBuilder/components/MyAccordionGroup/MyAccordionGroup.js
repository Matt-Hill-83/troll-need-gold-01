import { makeStyles } from "@material-ui/core/styles"

import cx from "classnames"
import React from "react"

import css from "./MyAccordionGroup.module.scss"
import MyAccordion from "../MyAccordion/MyAccordion"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}))

export default function MyAccordionGroup({ props }) {
  const { items, className } = props
  const classes = useStyles()

  if (!items || items.length === 0) {
    return null
  }

  const renderedAccordion = items.map((item) => {
    return <MyAccordion props={{ ...item }}></MyAccordion>
  })

  // return renderedAccordion
  return (
    <div className={cx(classes.root, css.main, className)}>
      {renderedAccordion}
    </div>
  )
}
