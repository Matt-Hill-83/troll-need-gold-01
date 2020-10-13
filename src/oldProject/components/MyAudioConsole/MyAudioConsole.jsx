import { Button, ButtonGroup } from "@blueprintjs/core"
import cx from "classnames"
import React from "react"

import AudioPlayer from "../AudioPlayer/AudioPlayer"
import AudioRecorder from "../AudioRecorder/AudioRecorder"
import useUpdateProfileWidget from "../TopLevel/useUpdateProfileWidget"

import css from "./MyAudioConsole.module.scss"
import cuid from "cuid"
import { updateQuestInFirestore } from "../../../app/firestore/firestoreService"
import { uploadAudio } from "../../../app/firestore/firebaseService"

export default function MyAudioConsole(props) {
  const { className, audioURL } = props

  const { getProfile } = useUpdateProfileWidget()
  const loggedIn = !!getProfile().id

  function saveAudio({ frame, blob }) {
    console.log("saveAudio....") // zzz
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
          console.log("complete...") // zzz
          props.saveAudio({ audioURL })
          // frame.audioURL = audioURL
          // updateQuestInFirestore(globalState.world)
        })
      }
    )
  }

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

  // function saveAudio({ blob }) {
  //   props.saveAudio({ blob })
  // }

  return (
    <div className={cx(css.main, { [className]: !!className })}>
      <div className={css.scenesContainer}>{renderTools()}</div>
    </div>
  )
}
