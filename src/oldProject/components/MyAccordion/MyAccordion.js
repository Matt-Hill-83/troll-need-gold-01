import { makeStyles } from "@material-ui/core/styles"
import { toJS } from "mobx"
import Accordion from "@material-ui/core/Accordion"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import cx from "classnames"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import React, { useState, useEffect } from "react"
import Typography from "@material-ui/core/Typography"

import css from "./MyAccordion.module.scss"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}))

export default function MyAccordion({ props }) {
  const { title, content, className = "" } = props
  const classes = useStyles()
  const [expanded, setExpanded] = useState(true)

  useEffect(() => {
    setExpanded(props.expanded)
  }, [props.expanded])

  useEffect(() => {
    // on mount
    setExpanded(props.expanded)
    // returned function will be called on component unmount
    return () => {
      return null
    }
  }, [])

  const onChange = (event, value) => {
    setExpanded(value)
    props.onChange && props.onChange({ expanded: value })
  }

  const renderedContent = expanded ? content() : null

  const renderedAccordion = (
    <Accordion
      expanded={expanded}
      // defaultExpanded={expanded}
      onChange={onChange}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={cx(classes.heading, css.header)}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography className={css.content}>{renderedContent}</Typography>
      </AccordionDetails>
    </Accordion>
  )

  return <div className={cx(css.main, className)}>{renderedAccordion}</div>
}
