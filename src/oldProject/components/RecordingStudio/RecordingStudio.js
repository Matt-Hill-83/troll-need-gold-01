import cx from "classnames"
import React, { useContext } from "react"
import { PopoverInteractionKind, Popover, Button } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import { Header, Segment, Grid, Item } from "semantic-ui-react"

import { myContext } from "../../../myProvider.js"
import MyAudioConsole from "../MyAudioConsole/MyAudioConsole.jsx"

import css from "./RecordingStudio.module.scss"

export default function RecordingStudio(props) {
  const [globalState] = useContext(myContext)
  const { activeScene } = globalState

  const { audioURLVocalTrack, audioURLBeatTrack } = activeScene

  const {
    className = "",
    loggedIn,
    saveVocalTrackForScene,
    saveBeatTrackGlobal,
    deleteVocalTrackForScene,
    deleteBeatTrackGlobal,
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
              <div>Vocal Track</div>
              <div className={css.console}>
                <MyAudioConsole
                  audioURL={audioURLVocalTrack}
                  saveAudio={saveVocalTrackForScene}
                  loggedIn={loggedIn}
                  trackList={props.vocalsTrackList}
                  deleteTrack={deleteVocalTrackForScene}
                />
              </div>
              <div>Background Track</div>
              <div className={css.console}>
                {true && (
                  <MyAudioConsole
                    audioURL={audioURLBeatTrack}
                    saveAudio={saveBeatTrackGlobal}
                    loggedIn={loggedIn}
                    trackList={props.beatsTrackList}
                    deleteTrack={deleteBeatTrackGlobal}
                  />
                )}
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Popover>
  )

  return <div className={cx(css.main, className)}>{multiTrackRecorder}</div>
}
