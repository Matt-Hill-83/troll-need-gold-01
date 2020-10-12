import cx from "classnames"
import React, { useContext } from "react"

import { ButtonGroup } from "@material-ui/core"
import { myContext } from "../../../myProvider.js"
import MyAudioConsole from "../MyAudioConsole/MyAudioConsole.jsx"
import useUpdateProfileWidget from "../TopLevel/useUpdateProfileWidget.js"

import { PopoverInteractionKind, Popover, Button } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"

import css from "./RecordingStudio.module.scss"

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

  const multiTrackRecorder = (
    <Popover interactionKind={PopoverInteractionKind.CLICK_TARGET_ONLY}>
      <Button
        // className={cx(css.main)}
        // onClick={() => playAudio({ sound })}
        icon={IconNames.MUSIC}
      />
      <ButtonGroup className={css.audioConsoleFrame}>
        record new track
        <MyAudioConsole
          audioURL={audioURLVocalTrack}
          saveAudio={({ blob }) => saveAudioForScene({ blob })}
          loggedIn={loggedIn}
        />
        background track
        <MyAudioConsole
          audioURL={audioURLBeatTrack}
          saveAudio={({ blob }) => saveBeatAudioForScene({ blob })}
          loggedIn={loggedIn}
        />
      </ButtonGroup>
    </Popover>
  )

  return <div className={cx(css.main, className)}>{multiTrackRecorder}</div>
}
