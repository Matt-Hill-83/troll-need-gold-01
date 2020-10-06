import { Button, ButtonGroup } from "@blueprintjs/core"
import cx from "classnames"
import React from "react"

import AudioPlayer from "../AudioPlayer/AudioPlayer"
import AudioRecorder from "../AudioRecorder/AudioRecorder"
import useUpdateProfileWidget from "../TopLevel/useUpdateProfileWidget"

import css from "./MyAudioConsole.module.scss"

export default function MyAudioConsole(props) {
  const { className, audioURL, dialog } = props
  console.log("className", className) // zzz

  const { getProfile } = useUpdateProfileWidget()
  const loggedIn = !!getProfile().id

  const renderDialog = () => {
    return (
      <div className={css.audioButtonsContainer}>
        <ButtonGroup className={css.audioButtons}>
          {audioURL && (
            <AudioPlayer className={css.audioPlayer} sound={audioURL} />
          )}
          {loggedIn && (
            <AudioRecorder
              recorderClassName={css.audioRecorder}
              saveAudio={({ blob }) => saveAudio({ dialog, blob })}
            />
          )}
        </ButtonGroup>
      </div>
    )
  }

  function saveAudio({ dialog, blob }) {
    props.saveAudio({ dialog, blob })
  }

  return (
    <div className={cx(css.main, { [className]: !!className })}>
      <div className={css.scenesContainer}>{renderDialog()}</div>
    </div>
  )
}
