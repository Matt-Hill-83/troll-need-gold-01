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

  console.log("activeScene", activeScene) // zzz

  const { audioURLVocalTrack, audioURLBeatTrack } = activeScene

  const {
    className = "",
    loggedIn,
    saveAudioForScene,
    saveBeatAudioForScene,
  } = props

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
                {false && (
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
