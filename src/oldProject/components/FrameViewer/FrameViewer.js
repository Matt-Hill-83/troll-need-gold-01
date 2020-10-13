import { Button, ButtonGroup } from "@blueprintjs/core"
import { Link } from "react-router-dom"
import cuid from "cuid"
import cx from "classnames"
import React, { useContext } from "react"

import { myContext } from "../../../myProvider"
import { updateQuestInFirestore } from "../../../app/firestore/firestoreService"
import {
  uploadToFirebaseStorage,
  uploadAudio,
} from "../../../app/firestore/firebaseService"
import useUpdateProfileWidget from "../TopLevel/useUpdateProfileWidget"
import WordGroup from "../WordGroup/WordGroup"

import ReactPlayer from "react-player"

import css from "./FrameViewer.module.scss"
import MyAudioConsole from "../MyAudioConsole/MyAudioConsole"

export default function FrameViewer() {
  const [globalState, setGlobalState] = useContext(myContext)

  const { getProfile } = useUpdateProfileWidget()
  const loggedIn = !!getProfile().id

  const { activeFrameIndex, activeScene } = globalState
  if (!activeScene?.frameSet) {
    return <div>no frames</div>
  }
  const { frames = [] } = activeScene.frameSet

  const frame = frames[activeFrameIndex]
  let isLastFrame = activeFrameIndex >= frames.length - 1

  const renderDialog = () => {
    const cloneIndex = 0
    const dialog = frame?.dialog || []
    const allCharactersInScene = {}

    frames.forEach((frame) => {
      const critters = [...frame.critters1, ...frame.critters2]
      critters.forEach((char) => {
        allCharactersInScene[char.name] = char
      })
    })

    const allCharactersInScene2 = Object.values(allCharactersInScene)
    const charIndexMap = {}
    const charactersAndLocation = [
      ...allCharactersInScene2,
      activeScene.location,
    ]

    charactersAndLocation.forEach((char, charIndex) => {
      charIndexMap[char.name] = charIndex
    })

    // TODO: for some reason, probably from cloning, some characters share the same id.
    const renderedDialogs = dialog.map((line, lineIndex) => {
      const { text, audioURL } = line

      const characterName = line.character || ""
      const characterIndex = charIndexMap[characterName] || 0

      if (!text) return null
      const className = `character${characterIndex}`

      const indexIsEven = characterIndex % 2 === 0
      const renderedWordGroup = (
        <WordGroup lineIndex={lineIndex} story={[text]} />
      )

      return (
        <div
          className={cx(css.line, css[className], {
            [css.isEven]: indexIsEven,
            [css.isOdd]: !indexIsEven,
          })}
        >
          {!indexIsEven && renderedWordGroup}
          <div className={cx(css.characterNameContainer)}>
            <span className={css.characterName}>{characterName}</span>
          </div>
          {indexIsEven && renderedWordGroup}
          <MyAudioConsole
            className={css.audioConsoleLine}
            audioURL={audioURL}
            saveAudio={({ blob }) => saveAudioForLine({ dialog: line, blob })}
            loggedIn={loggedIn}
          />
        </div>
      )
    })

    const scalingFactor = 1.6
    const style = {
      "margin-left": `-${cloneIndex * scalingFactor}vh`,
      "margin-top": `${cloneIndex * scalingFactor}vh`,
      border: "3px solid red",
    }
    const backgroundTrack =
      "https://firebasestorage.googleapis.com/v0/b/troll-need-gold-02-staging.appspot.com/o/AMAgzal2oAbHogUvO9vVeHWZygF3%2Fuser_images%2Fckg3rdbam00003h5oth71k2wt-audio.blob?alt=media&token=853c84d1-6671-40af-986e-b8eb8e5f6dfe"

    const tracks = [backgroundTrack, backgroundTrack, backgroundTrack]

    const { audioURL } = frame

    return (
      <div className={css.dialogScroller} style={style}>
        <ButtonGroup className={css.audioConsoleFrame}>
          <MyAudioConsole
            // className={css.audioConsoleFrame}
            audioURL={audioURL}
            saveAudio={({ blob }) => saveAudioForFrame({ frame, blob })}
            loggedIn={loggedIn}
          />
          <MyAudioConsole
            // className={css.audioConsoleFrame}
            audioURL={audioURL}
            saveAudio={({ blob }) => saveBeatAudioForFrame({ frame, blob })}
            loggedIn={loggedIn}
          />
        </ButtonGroup>
        <div className={css.dialog}>
          {/* <audio controls={true} loop={true} autoplay={true}>
            <source src={backgroundTrack} type="audio/mp3" />
          </audio> */}
          {/* <ReactPlayer autoplay={true} controls loop={true} url={tracks} /> */}
          {/* <ReactPlayer autoplay controls loop url={backgroundTrack} /> */}
          {renderedDialogs}
        </div>
      </div>
    )
  }

  const getLocationName = () => {
    return activeScene?.location?.name
  }

  const incrementFrame = ({ increment = true }) => {
    setGlobalState((prevVal) => {
      let newFrameIndex = (prevVal.activeFrameIndex += 1 * increment ? 1 : -1)
      newFrameIndex = newFrameIndex >= 0 ? newFrameIndex : 0
      return {
        ...prevVal,
        activeFrameIndex: newFrameIndex,
      }
    })
  }

  function saveAudioForFrame({ frame, blob }) {
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
          frame.audioURL = audioURL
          updateQuestInFirestore(globalState.world)
        })
      }
    )
  }

  function saveBeatAudioForFrame({ frame, blob }) {
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
          frame.audioURLForBeat = audioURL
          updateQuestInFirestore(globalState.world)
        })
      }
    )
  }

  function saveAudioForLine({ dialog, blob }) {
    console.log("blob", blob) // zzz
    // setLoading(true)

    const filename = cuid() + "-audio.blob"
    const uploadTask = uploadAudio(blob, filename)
    // const uploadTask = uploadToFirebaseStorage(blob, filename)
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log("Upload is " + progress + "% done")
      },
      (error) => {
        console.log("error", error) // zzz
        // toast.error(error.messege)
      },
      () => {
        console.log("uploadTask.snapshot", uploadTask.snapshot) // zzz
        console.log("uploadTask", uploadTask) // zzz
        uploadTask.snapshot.ref.getDownloadURL().then((audioURL) => {
          dialog.audioURL = audioURL
          updateQuestInFirestore(globalState.world)
        })
      }
    )
  }

  const renderButtons = () => {
    const { isEndScene } = activeScene

    if (isEndScene && isLastFrame) {
      return (
        <div className={css.buttonsContainer}>
          <Link to={"/books"} className={css.newGameButton}>
            New Quest
          </Link>
        </div>
      )
    }

    return (
      <div className={css.buttonsContainer}>
        {!isLastFrame && (
          <ButtonGroup className={css.nextButton}>
            <Button onClick={() => incrementFrame({ increment: false })}>
              Prev Page
            </Button>
            <Button onClick={() => incrementFrame({})}>Next Page</Button>
          </ButtonGroup>
        )}
        {isLastFrame && (
          <div className={css.clickMapMsg}>Click map to move.</div>
        )}
      </div>
    )
  }

  const renderFrame = () => {
    const sceneName = getLocationName()

    return (
      <div className={css.wordsAndButtons}>
        <div className={css.sceneName}>{sceneName}</div>
        <div className={css.wordsContainer}>{renderDialog()}</div>
        {renderButtons()}
      </div>
    )
  }

  if (!frame) {
    return null
  }

  return (
    <div className={css.main}>
      <div className={css.scenesContainer}>{renderFrame()}</div>
    </div>
  )
}
