import {
  PopoverInteractionKind,
  Popover,
  ButtonGroup,
  Button,
  Position,
} from "@blueprintjs/core"
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
    this.close()
  }

  close = () => {}

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

  render() {
    const { toggleClassName = "" } = this.props
    const { isRecording, blobURL } = this.state
    const recordAudioEnabled = Constants.featureFlags.recordAudio

    return (
      <div className={cx(css.main)}>
        <Popover
          position={Position.TOP_RIGHT}
          interactionKind={PopoverInteractionKind.CLICK_TARGET_ONLY}
        >
          <Button
            className={cx(css.button, toggleClassName, {
              [css.disabled]: !recordAudioEnabled,
            })}
            icon={IconNames.RECORD}
            disabled={!recordAudioEnabled}
          />
          <div className={css.audioRecorder}>
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
        </Popover>
      </div>
    )
  }
}

export default AudioRecorder
