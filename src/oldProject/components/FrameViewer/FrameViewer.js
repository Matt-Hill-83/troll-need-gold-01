import { Button, ButtonGroup } from "@blueprintjs/core"
import { Link } from "react-router-dom"
import cuid from "cuid"
import cx from "classnames"
import React, { useContext } from "react"

import { myContext } from "../../../myProvider"
import { updateQuestInFirestore } from "../../../app/firestore/firestoreService"
import useUpdateProfileWidget from "../TopLevel/useUpdateProfileWidget"
import WordGroup from "../WordGroup/WordGroup"
import MyAudioConsole from "../MyAudioConsole/MyAudioConsole"

import css from "./FrameViewer.module.scss"

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
            loggedIn={loggedIn}
            saveAudio={({ audioURL }) =>
              onSaveAudioForLine({ dialog: line, audioURL })
            }
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

    // const tracks = [backgroundTrack, backgroundTrack, backgroundTrack]

    const { audioURL } = frame

    const trackList = [
      { name: "test", url: backgroundTrack },
      { name: "test", url: backgroundTrack },
      { name: "test", url: backgroundTrack },
      { name: "test", url: backgroundTrack },
    ]
    return (
      <div className={css.dialogScroller} style={style}>
        <MyAudioConsole
          className={css.audioConsoleFrame}
          audioURL={audioURL}
          trackList={trackList}
          saveAudio={onSaveAudioForFrame}
          loggedIn={loggedIn}
        />
        <div className={css.dialog}>{renderedDialogs}</div>
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

  function onSaveAudioForFrame({ audioURL }) {
    console.log("saveAudioForFrame") // zzz

    frame.audioURL = audioURL
    updateQuestInFirestore(globalState.world)
  }

  function onSaveAudioForLine({ audioURL, dialog }) {
    console.log("onSaveAudioForLine") // zzz

    dialog.audioURL = audioURL

    console.log("dialog", dialog) // zzz
    console.log("globalState.world", globalState.world) // zzz
    updateQuestInFirestore(globalState.world)
  }

  const renderButtons = () => {
    const { isEndScene } = activeScene

    if (isEndScene && isLastFrame) {
      return (
        <div className={css.buttonsContainer}>
          <Link to={"/books"} className={css.newGameButton}>
            Play Again
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
