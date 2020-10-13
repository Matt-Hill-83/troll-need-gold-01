import { Button, ButtonGroup } from "@blueprintjs/core"
import cx from "classnames"
import React from "react"

import AudioPlayer from "../AudioPlayer/AudioPlayer"
import AudioRecorder from "../AudioRecorder/AudioRecorder"
import useUpdateProfileWidget from "../TopLevel/useUpdateProfileWidget"

import css from "./MyAudioConsole.module.scss"

export default function MyAudioConsole(props) {
  const { className, audioURL } = props

  const { getProfile } = useUpdateProfileWidget()
  const loggedIn = !!getProfile().id

  const renderTools = () => {
    console.log("renderTools") // zzz
    console.log("audioURL", audioURL) // zzz
    return (
      <div className={css.audioButtonsContainer}>
        {/* <ButtonGroup className={css.audioButtons}> */}
        {audioURL && (
          <AudioPlayer className={css.audioPlayer} sound={audioURL} />
        )}
        {loggedIn && (
          <AudioRecorder
            recorderClassName={css.audioRecorder}
            saveAudio={({ blob }) => saveAudio({ blob })}
          />
        )}
        {/* </ButtonGroup> */}
      </div>
    )
  }

  function saveAudio({ blob }) {
    props.saveAudio({ blob })
  }

  return (
    <div className={cx(css.main, { [className]: !!className })}>
      <div className={css.scenesContainer}>{renderTools()}</div>
    </div>
  )
}
