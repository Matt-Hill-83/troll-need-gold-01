import { Button, ButtonGroup } from "@blueprintjs/core"
import { Link } from "react-router-dom"
import cuid from "cuid"
import cx from "classnames"
import React, { useContext } from "react"

import { myContext } from "../../../myProvider"
import { updateQuestInFirestore } from "../../../app/firestore/firestoreService"
import { uploadToFirebaseStorage } from "../../../app/firestore/firebaseService"
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

  const renderDialog = ({ cloneIndex }) => {
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
            className={css.audioConsole}
            audioURL={audioURL}
            saveAudio={saveAudio}
            dialog={line}
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
    return (
      <div className={css.dialogScroller} style={style}>
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

  const onClickNext = () => {
    setGlobalState((prevVal) => {
      return {
        ...prevVal,
        activeFrameIndex: (prevVal.activeFrameIndex += 1),
      }
    })
  }

  function saveAudio({ dialog, blob }) {
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
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          dialog.audioURL = downloadURL
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
          <Button onClick={onClickNext} className={css.nextButton}>
            Next Page
          </Button>
        )}
        {isLastFrame && (
          <div className={css.clickMapMsg}>Click map to move.</div>
        )}
      </div>
    )
  }

  const cloneDialogs = () => {
    const numPages = 1
    const dialogClones = []
    for (let cloneIndex = 0; cloneIndex < numPages; cloneIndex++) {
      const dialog = renderDialog({ cloneIndex })
      dialogClones.push(dialog)
    }

    return dialogClones
  }

  const renderFrame = () => {
    const sceneName = getLocationName()

    return (
      <div className={css.wordsAndButtons}>
        <div className={css.sceneName}>{sceneName}</div>
        <div className={css.wordsContainer}>{cloneDialogs()}</div>
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
