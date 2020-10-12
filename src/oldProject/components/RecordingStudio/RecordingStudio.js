import cx from "classnames"
import React, { useContext } from "react"

import { ButtonGroup } from "@material-ui/core"
import { myContext } from "../../../myProvider.js"
import MyAudioConsole from "../MyAudioConsole/MyAudioConsole.jsx"
import useUpdateProfileWidget from "../TopLevel/useUpdateProfileWidget.js"

import css from "./RecordingStudio.module.scss"

export default function RecordingStudio(props) {
  const [globalState] = useContext(myContext)
  const { world, activeScene, activeFrameIndex } = globalState

  const {} = props

  console.log("activeScene", activeScene) // zzz

  const { audioURLVocalTrack, audioURLBeatTrack } = activeScene

  const { loggedIn } = props

  const multiTrackRecorder = (
    <ButtonGroup className={css.audioConsoleFrame}>
      <MyAudioConsole
        audioURL={audioURLVocalTrack}
        saveAudio={({ blob }) => props.saveAudioForScene({ blob })}
        loggedIn={loggedIn}
      />
      <MyAudioConsole
        audioURL={audioURLBeatTrack}
        saveAudio={({ blob }) => props.saveBeatAudioForScene({ blob })}
        loggedIn={loggedIn}
      />
    </ButtonGroup>
  )

  return <div className={`${css.main}`}>{multiTrackRecorder}</div>
}
