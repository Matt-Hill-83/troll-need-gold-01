import cx from "classnames"
import React, { useContext } from "react"

import { ButtonGroup } from "@material-ui/core"
import { myContext } from "../../../myProvider.js"
import MyAudioConsole from "../MyAudioConsole/MyAudioConsole.jsx"

import { PopoverInteractionKind, Popover, Button } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"

import { Header, Segment, Grid, Item } from "semantic-ui-react"

import css from "./RecordingStudio.module.scss"
import DataTable3 from "../../../QuestBuilder/components/DataTable3/DataTable3.js"

export default function RecordingStudio(props) {
  const [globalState] = useContext(myContext)
  const { activeScene } = globalState

  const { trackList } = props

  console.log("activeScene", activeScene) // zzz

  const { audioURLVocalTrack, audioURLBeatTrack } = activeScene

  const {
    className = "",
    loggedIn,
    saveAudioForScene,
    saveBeatAudioForScene,
  } = props

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
          // customBodyRender: renderName,
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

  const tableProps = {
    className: css.triggersTable,
    // getMuiTheme,
    data: trackList,
    // data: triggers,
    columns,
    options,
  }

  const table = <DataTable3 key={"dataTableKey"} {...tableProps} />

  // TODO: get audioURL from item selected in table
  // TODO: get audioURL from item selected in table
  // TODO: get audioURL from item selected in table
  // TODO: get audioURL from item selected in table

  const multiTrackRecorder = (
    <Popover interactionKind={PopoverInteractionKind.CLICK_TARGET_ONLY}>
      <Button
        // className={cx(css.main)}
        // onClick={() => playAudio({ sound })}
        icon={IconNames.MUSIC}
      />
      {/* <div>Recording Studio</div> */}
      <Segment className={css.content}>
        <Grid className={css.grid}>
          <Grid.Row>
            <Grid.Column width={8}>
              {/* <ButtonGroup className={css.audioConsoleFrame}> */}
              <div className={css.console}>
                <div>New Vocal Track</div>
                <MyAudioConsole
                  audioURL={audioURLVocalTrack}
                  saveAudio={saveAudioForScene}
                  loggedIn={loggedIn}
                />
              </div>
              <div className={css.console}>
                <div>Background Track</div>

                <MyAudioConsole
                  audioURL={audioURLBeatTrack}
                  saveAudio={saveBeatAudioForScene}
                  loggedIn={loggedIn}
                />
              </div>
              {/* </ButtonGroup> */}
            </Grid.Column>
            <Grid.Column width={8}>{table}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Popover>
  )

  return <div className={cx(css.main, className)}>{multiTrackRecorder}</div>
}
