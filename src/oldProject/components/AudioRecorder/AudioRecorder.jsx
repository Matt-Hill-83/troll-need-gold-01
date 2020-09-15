import React from "react"
import "./AudioRecorder.module.scss"
import MicRecorder from "mic-recorder-to-mp3"

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
    const { blobURL } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.start} disabled={this.state.isRecording}>
            Record
          </button>
          <button onClick={this.stop} disabled={!this.state.isRecording}>
            Stop
          </button>
          <button onClick={this.save} disabled={this.state.isRecording}>
            Save
          </button>
          <audio src={this.state.blobURL} controls="controls" />
        </header>
      </div>
    )
  }
}

export default AudioRecorder
