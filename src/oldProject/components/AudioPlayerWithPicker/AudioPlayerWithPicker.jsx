import { Button, Popover, PopoverInteractionKind } from "@blueprintjs/core"
import { Grid, Segment } from "semantic-ui-react"
import { IconNames } from "@blueprintjs/icons"
import { ButtonGroup } from "@material-ui/core"
import cx from "classnames"
import React, { useState } from "react"
import ReactPlayer from "react-player"

import DataTable3 from "../../../QuestBuilder/components/DataTable3/DataTable3.js"

import css from "./AudioPlayerWithPicker.module.scss"

export default function AudioPlayerWithPicker(props) {
  const { sound, trackList } = props
  const soundToPlay = sound?.url ? sound.url : sound

  const [playing, setPlaying] = useState(false)
  const [showTrackTable, setShowTrackTable] = useState(false)
  const [activeTrack, setActiveTrack] = useState(trackList[0])

  const toggleAudio = () => {
    setPlaying(!playing)
  }

  const defaultReactPlayerProps = {
    width: "100%",
    height: "100%",
    attributes: {
      playsinline: true,
      controlslist: {
        nodownload: false,
        nofullscreen: true,
        noremoteplayback: true,
      },
    },
  }

  const reactPlayerProps = {
    ...defaultReactPlayerProps,
    ...props.reactPlayerProps,
  }

  const defaultStyle = { border: "1px solid red", display: "none" }
  const style = { ...defaultStyle, ...props.style }

  const onChangeTrack = ({ track }) => {
    setActiveTrack(track)
  }

  const deleteTrack = ({ trackId }) => {
    props.deleteTrack({ trackId })
  }

  const getTrackFromRowIndex = ({ rowIndex }) => {
    return trackList[rowIndex]
  }

  const renderName = (value, tableMeta, updateValue) => {
    const track = getTrackFromRowIndex({ rowIndex: tableMeta.rowIndex })
    const renderedName = (
      <div className={css.trackName} onClick={() => onChangeTrack({ track })}>
        {value}
      </div>
    )
    return renderedName
  }

  const renderActions = (value, tableMeta, updateValue) => {
    const track = getTrackFromRowIndex({ rowIndex: tableMeta.rowIndex })

    return (
      <ButtonGroup>
        <Button
          onClick={() => deleteTrack({ trackId: track.uuid })}
          icon={IconNames.DELETE}
        />
        <Button icon={IconNames.EDIT} />
      </ButtonGroup>
    )
  }

  const renderCreator = (value, tableMeta, updateValue) => {
    const renderedName = <div>{value}</div>
    return renderedName
  }

  const getTable = ({ trackList }) => {
    const tableProps = {
      className: css.triggersTable,
      data: trackList,
      columns,
      options,
    }

    return <DataTable3 key={"dataTableKey"} {...tableProps} />
  }

  const tableConfig = {
    options: {
      selectableRows: "none",
      onCellClick: () => {},
      onRowClick: () => {},
    },
    columns: [
      {
        name: "name",
        label: "Name",
        options: {
          sort: true,
          filter: true,
          customBodyRender: renderName,
        },
      },
      {
        name: "createdBy",
        label: "Creator",
        options: {
          sort: true,
          filter: true,
          customBodyRender: renderCreator,
        },
      },
      {
        name: "none",
        label: "Created Date",
        options: {
          sort: true,
          filter: true,
          // customBodyRender: renderDate,
        },
      },
      {
        name: "none",
        label: "Actions",
        options: {
          sort: true,
          filter: true,
          customBodyRender: renderActions,
        },
      },
    ],
  }

  const { options, columns } = tableConfig

  const vocalsTable = getTable({ trackList })

  const { url, name } = activeTrack

  const toggleTrackTable = () => {
    setShowTrackTable(!showTrackTable)
  }

  return (
    <>
      <Segment className={css.content}>
        <Grid className={css.grid}>
          <Grid.Row>
            <Grid.Column width={16}>
              <Button
                className={cx(css.main)}
                onClick={() => toggleAudio({ sound: soundToPlay })}
                icon={playing ? IconNames.PAUSE : IconNames.PLAY}
              />
              <ReactPlayer
                playing={playing}
                style={style}
                loop={false}
                url={url}
                {...reactPlayerProps}
              />
              <Button onClick={toggleTrackTable}> {name} </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              {showTrackTable && vocalsTable}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </>
  )
}
