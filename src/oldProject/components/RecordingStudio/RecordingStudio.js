import cx from "classnames"
import React, { useContext } from "react"

import { ButtonGroup, TextField } from "@material-ui/core"
import { myContext } from "../../../myProvider.js"
import MyAudioConsole from "../MyAudioConsole/MyAudioConsole.jsx"

import { PopoverInteractionKind, Popover, Button } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"

import { Header, Segment, Grid, Item } from "semantic-ui-react"
import DataTable3 from "../../../QuestBuilder/components/DataTable3/DataTable3.js"

import css from "./RecordingStudio.module.scss"

export default function RecordingStudio(props) {
  const [globalState] = useContext(myContext)
  const { activeScene } = globalState
  const { trackList, vocalsTrackList, beatsTrackList } = props

  console.log("activeScene", activeScene) // zzz

  const { audioURLVocalTrack, audioURLBeatTrack } = activeScene

  const {
    className = "",
    loggedIn,
    saveAudioForScene,
    saveBeatAudioForScene,
  } = props

  const renderName = (value, tableMeta, updateValue) => {
    console.log("renderName") // zzz
    const renderedName = <div>{value}</div>
    return renderedName
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
          // customBodyRender: renderConditions,
        },
      },
    ],
  }

  const { options, columns } = tableConfig

  console.log("trackList", trackList) // zzz

  const getTable = ({ trackList }) => {
    console.log("getTable") // zzz
    const tableProps = {
      className: css.triggersTable,
      data: trackList,
      columns,
      options,
    }

    return <DataTable3 key={"dataTableKey"} {...tableProps} />
  }

  // const vocalsTable = getTable({ trackList: vocalsTrackList })

  // const table = <DataTable3 key={"dataTableKey"} {...tableProps} />

  // TODO: get audioURL from item selected in table
  // TODO: get audioURL from item selected in table
  // TODO: get audioURL from item selected in table
  // TODO: get audioURL from item selected in table

  const multiTrackRecorder = (
    <Popover
      popoverClassName={css.popoverClass}
      portalClassName={css.portalClass}
      interactionKind={PopoverInteractionKind.CLICK_TARGET_ONLY}
      isOpen={true}
    >
      <Button icon={IconNames.MUSIC} />
      <Segment className={css.content}>
        <Grid className={css.grid}>
          <Grid.Row>
            <Grid.Column width={12}>
              <div>New Vocal Track</div>
              <div className={css.console}>
                <MyAudioConsole
                  audioURL={audioURLVocalTrack}
                  saveAudio={saveAudioForScene}
                  loggedIn={loggedIn}
                  trackList={props.vocalsTrackList}
                />
              </div>
              <div>Background Track</div>
              <div className={css.console}>
                {true && (
                  <MyAudioConsole
                    audioURL={audioURLBeatTrack}
                    saveAudio={saveBeatAudioForScene}
                    loggedIn={loggedIn}
                    trackList={props.beatsTrackList}
                  />
                )}
              </div>
            </Grid.Column>
            {/* {true && <Grid.Column width={8}>{vocalsTable}</Grid.Column>} */}
          </Grid.Row>
        </Grid>
      </Segment>
    </Popover>
  )

  return <div className={cx(css.main, className)}>{multiTrackRecorder}</div>
}
