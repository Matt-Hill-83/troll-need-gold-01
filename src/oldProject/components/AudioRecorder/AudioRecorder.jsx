import React from "react"
import MicRecorder from "mic-recorder-to-mp3"
import css from "./AudioRecorder.module.scss"
import { Button } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"

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

  render() {
    const { isRecording, blobURL } = this.state

    return (
      <div className={css.main}>
        <header className="App-header">
          {!isRecording && (
            <Button
              onClick={this.start}
              disabled={isRecording}
              icon={IconNames.RECORD}
            ></Button>
          )}
          {isRecording && (
            <Button
              onClick={this.stop}
              disabled={!isRecording}
              icon={IconNames.STOP}
            ></Button>
          )}
          <Button
            onClick={this.save}
            disabled={isRecording}
            icon={IconNames.FLOPPY_DISK}
          ></Button>
          <audio src={blobURL} controls="controls" />
        </header>
      </div>
    )
  }
}

export default AudioRecorder
