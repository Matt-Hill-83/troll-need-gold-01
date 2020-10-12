import cuid from "cuid"
import cx from "classnames"
import React, { useContext } from "react"

import { ButtonGroup } from "@material-ui/core"
import { myContext } from "../../../myProvider.js"
import { updateQuestInFirestore } from "../../../app/firestore/firestoreService.js"
import { uploadToFirebaseStorage } from "../../../app/firestore/firebaseService.js"
import MyAudioConsole from "../MyAudioConsole/MyAudioConsole.jsx"
import useUpdateProfileWidget from "../TopLevel/useUpdateProfileWidget.js"

import css from "./RecordingStudio.module.scss"

export default function RecordingStudio(props) {
  const [globalState] = useContext(myContext)
  const { world, activeScene, activeFrameIndex } = globalState

  const {} = props

  const { getProfile } = useUpdateProfileWidget()
  // const loggedIn = !!getProfile().id

  console.log("activeScene", activeScene) // zzz

  function saveAudioForScene({ blob }) {
    console.log("saveAudioForFrame") // zzz
    // setLoading(true)
    const filename = cuid() + "-audio.blob"
    const uploadTask = uploadToFirebaseStorage(blob, filename)
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
          activeScene.audioURLVocalTrack = audioURL
          updateQuestInFirestore(globalState.world)
        })
      }
    )
  }

  function saveBeatAudioForScene({ blob }) {
    console.log("saveBeatAudioForFrame") // zzz
    // setLoading(true)
    const filename = cuid() + "-audio.blob"
    const uploadTask = uploadToFirebaseStorage(blob, filename)
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
          activeScene.audioURLBeatTrack = audioURL
          updateQuestInFirestore(globalState.world)
        })
      }
    )
  }

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
