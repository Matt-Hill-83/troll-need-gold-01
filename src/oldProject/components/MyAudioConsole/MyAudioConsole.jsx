import cx from "classnames"
import cuid from "cuid"
import React from "react"

import { uploadAudio } from "../../../app/firestore/firebaseService"
import AudioPlayer from "../AudioPlayer/AudioPlayer"
import AudioPlayerWithPicker from "../AudioPlayerWithPicker/AudioPlayerWithPicker"
import AudioRecorder from "../AudioRecorder/AudioRecorder"
import useUpdateProfileWidget from "../TopLevel/useUpdateProfileWidget"

import css from "./MyAudioConsole.module.scss"

export default function MyAudioConsole(props) {
  const { trackList, className, audioURL } = props

  const { getProfile } = useUpdateProfileWidget()
  const loggedIn = !!getProfile().id

  function saveAudio({ blob }) {
    // setLoading(true)
    const filename = cuid() + "-audio.blob"
    const uploadTask = uploadAudio(blob, filename)
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log("Upload is " + progress + "% done")
      },
      (error) => {
        // toast.error(error.messege)
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((audioURL) => {
          props.saveAudio({ audioURL })
        })
      }
    )
  }

  const hasTrackList = trackList && trackList.length > 0

  const renderTools = () => {
    return (
      <div className={css.audioButtonsContainer}>
        {loggedIn && (
          <AudioRecorder
            recorderClassName={css.audioRecorder}
            saveAudio={({ blob }) => saveAudio({ blob })}
          />
        )}
        {hasTrackList && (
          <AudioPlayerWithPicker
            className={css.audioPlayer}
            sound={audioURL}
            trackList={trackList}
            deleteTrack={props.deleteTrack}
          />
        )}
        {!hasTrackList && audioURL && (
          <AudioPlayer className={css.audioPlayer} sound={audioURL} />
        )}
      </div>
    )
  }

  return (
    <div className={cx(css.main, { [className]: !!className })}>
      <div className={css.scenesContainer}>{renderTools()}</div>
    </div>
  )
}
