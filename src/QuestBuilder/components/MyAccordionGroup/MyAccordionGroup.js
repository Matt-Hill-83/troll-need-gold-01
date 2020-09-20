import { makeStyles } from "@material-ui/core/styles"

import Accordion from "@material-ui/core/Accordion"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import cx from "classnames"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import React, { useState } from "react"
import Typography from "@material-ui/core/Typography"

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
