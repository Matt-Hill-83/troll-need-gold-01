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
      console.log("Permission Denied")
    } else {
      Mp3Recorder.start()
        .then(() => {
          this.setState({ isRecording: true })
        })
        .catch((e) => console.error(e))
    }
  }

  stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        // console.log("blob", blob) // zzz
        const blobURL = URL.createObjectURL(blob)
        this.setState({ blobURL, isRecording: false, blob })
      })
      .catch((e) => console.log(e))
  }

  save = () => {
    const { blob } = this.state
    // console.log("blob", blob) // zzz
    this.props.saveAudio({ blob })
  }

  componentDidMount() {
    navigator.getUserMedia(
      { audio: true },
      () => {
        // console.log("Permission Granted")
        this.setState({ isBlocked: false })
      },
      () => {
        // console.log("Permission Denied")
        this.setState({ isBlocked: true })
      }
    )
  }

  render() {
    const { blobURL } = this.state

    // console.log("blobURL", blobURL) // zzz
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
