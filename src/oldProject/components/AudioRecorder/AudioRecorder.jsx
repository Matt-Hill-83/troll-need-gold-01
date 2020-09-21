import { ButtonGroup, Button } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import Constants from "../../../Common/Constants/Constants"
import cx from "classnames"
import MicRecorder from "mic-recorder-to-mp3"
import React from "react"

import css from "./AudioRecorder.module.scss"

const Mp3Recorder = new MicRecorder({ bitRate: 128 })

class AudioRecorder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isRecording: false,
      blobURL: "",
      isBlocked: false,
      blob: null,
      showAudioRecorder: false,
    }
  }

  start = () => {
    if (this.state.isBlocked) {
    } else {
      Mp3Recorder.start().then(() => {
        this.setState({ isRecording: true })
      })
    }
  }

  stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob)
        this.setState({ blobURL, isRecording: false, blob })
      })
      .catch((e) => console.log(e))
  }

  save = () => {
    const { blob } = this.state
    this.props.saveAudio({ blob })
    this.toggleAudioRecorder()
  }

  componentDidMount() {
    navigator.getUserMedia(
      { audio: true },
      () => {
        this.setState({ isBlocked: false })
      },
      () => {
        this.setState({ isBlocked: true })
      }
    )
  }

  toggleAudioRecorder = () => {
    this.setState({ showAudioRecorder: !this.state.showAudioRecorder })
  }

  render() {
    const { isRecording, blobURL, showAudioRecorder } = this.state
    const recordAudioEnabled = Constants.featureFlags.recordAudio

    if (!showAudioRecorder) {
      return (
        <Button
          className={cx(css.button, { [css.disabled]: !recordAudioEnabled })}
          onClick={this.toggleAudioRecorder}
          icon={IconNames.RECORD}
          disabled={!recordAudioEnabled}
        />
      )
    }

    return (
      <div className={css.main}>
        <ButtonGroup>
          {!isRecording && (
            <Button
              className={css.button}
              onClick={this.start}
              disabled={isRecording}
              icon={IconNames.RECORD}
            />
          )}
          {isRecording && (
            <Button
              className={css.button}
              onClick={this.stop}
              disabled={!isRecording}
              icon={IconNames.STOP}
            />
          )}

          <Button
            className={css.button}
            onClick={this.save}
            disabled={isRecording}
            icon={IconNames.FLOPPY_DISK}
          />
        </ButtonGroup>
        <audio src={blobURL} controls="controls" />
      </div>
    )
  }
}

export default AudioRecorder
