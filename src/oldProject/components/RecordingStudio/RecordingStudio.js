import cx from "classnames"
import React, { useContext } from "react"

import { ButtonGroup } from "@material-ui/core"
import { myContext } from "../../../myProvider.js"
import MyAudioConsole from "../MyAudioConsole/MyAudioConsole.jsx"
import useUpdateProfileWidget from "../TopLevel/useUpdateProfileWidget.js"

import { PopoverInteractionKind, Popover, Button } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"

// import { Segment } from "semantic-ui-react"
import { Header, Segment, Grid, Item } from "semantic-ui-react"

import css from "./RecordingStudio.module.scss"
import DataTable3 from "../../../QuestBuilder/components/DataTable3/DataTable3.js"
import { getSubQuestTableConfigFunc } from "../../../QuestBuilder/components/TriggersTable/SubQuestTableConfig.js"

export default function RecordingStudio(props) {
  const [globalState] = useContext(myContext)
  const { world, activeScene, activeFrameIndex } = globalState

  const {} = props

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
        // options: {
        //   sort: false,
        //   filter: true,
        //   customBodyRender: renderName,
        // },
      },
      {
        name: "createdBy",
        label: "Creator",
        // options: {
        //   sort: false,
        //   filter: true,
        //   customBodyRender: renderConditions,
        // },
      },
    ],
  }

  const { options, columns } = tableConfig

  const triggers = [{ name: 555, age: 99 }]
  const tableProps = {
    className: css.triggersTable,
    // getMuiTheme,
    data: triggers,
    columns,
    options,
  }

  const table = <DataTable3 key={"dataTableKey"} {...tableProps} />

  const multiTrackRecorder = (
    <Popover interactionKind={PopoverInteractionKind.CLICK_TARGET_ONLY}>
      <Button
        // className={cx(css.main)}
        // onClick={() => playAudio({ sound })}
        icon={IconNames.MUSIC}
      />
      <Segment className={css.content}>
        <div>Recording Studio</div>
        <Grid>
          <Grid.Column width={4}>
            {/* <ButtonGroup className={css.audioConsoleFrame}> */}
            <div>record new track</div>
            <MyAudioConsole
              audioURL={audioURLVocalTrack}
              saveAudio={saveAudioForScene}
              loggedIn={loggedIn}
            />
            background track
            <MyAudioConsole
              audioURL={audioURLBeatTrack}
              saveAudio={saveBeatAudioForScene}
              loggedIn={loggedIn}
            />
            {/* </ButtonGroup> */}
          </Grid.Column>
          <Grid.Column width={12}>{table}</Grid.Column>
        </Grid>
      </Segment>
    </Popover>
  )

  return <div className={cx(css.main, className)}>{multiTrackRecorder}</div>
}
