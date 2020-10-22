import { IconNames } from "@blueprintjs/icons"
// import { PopoverInteractionKind, Popover, Button } from "@blueprintjs/core"
import cx from "classnames"
import React, { useState } from "react"
import ReactPlayer from "react-player"

import AutoComplete2 from "../../../Common/Components/AutoComplete2/AutoComplete2"
import DataTable3 from "../../../QuestBuilder/components/DataTable3/DataTable3.js"

import css from "./AudioPlayerWithPicker.module.scss"
import { Grid, Segment, Button } from "semantic-ui-react"

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
    console.log("track", track) // zzz
    setActiveTrack(track)
  }

  // const onChangeTrack = (newValue) => {
  //   console.log("newValue", newValue) // zzz
  //   setActiveTrack(newValue)
  // }

  const renderTrackPicker = ({ trackList }) => {
    if (!trackList || trackList.length === 0) {
      return <div>no tracklist</div>
    }

    const getOptionLabel = (option) => {
      return option?.name || "--"
    }

    const defaultValue = trackList[0]
    console.log("trackList - APWP", trackList) // zzz

    const dropDownProps = {
      // className: css.sceneDropdown,
      items: trackList,
      defaultValue,
      getOptionLabel,
      onChange: onChangeTrack,
    }

    return <AutoComplete2 {...dropDownProps} />
  }

  console.log("activeTrack", activeTrack) // zzz

  const renderName = (value, tableMeta, updateValue) => {
    // const test = trackList[tableMeta.rowIndex]
    // console.log("test", test) // zzz

    // console.log("updateValue", updateValue) // zzz
    console.log("tableMeta", tableMeta) // zzz
    console.log("value", value) // zzz
    console.log("renderName") // zzz
    const track = props.trackList[tableMeta.rowIndex]
    console.log("track", track) // zzz
    // debugger
    const renderedName = (
      <div onClick={() => onChangeTrack({ track })}>{value}</div>
    )
    return renderedName
  }

  const renderCreator = (value, tableMeta, updateValue) => {
    console.log("renderCreator") // zzz
    console.log("value", value) // zzz
    const renderedName = <div>{value}</div>
    return renderedName
  }

  const getTable = ({ trackList }) => {
    console.log("trackList", trackList) // zzz
    console.log("getTable") // zzz
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
        name: "none",
        label: " ",
        options: {
          filter: false,
          sort: false,
          empty: true,
          // customBodyRender: (value, tableMeta, updateValue) => (
          //   <AddDeleteButtonGroup
          //     props={{
          //       rowIndex: tableMeta.rowIndex,
          //       onDelete: onDeleteTriggerRow,
          //       onAdd: onAddTriggerRow,
          //     }}
          //   />
          // ),
        },
      },
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
          // customBodyRender: renderConditions,
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
              {false && renderTrackPicker({ trackList })}
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
