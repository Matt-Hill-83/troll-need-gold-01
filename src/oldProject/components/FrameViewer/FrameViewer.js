import { Button, ButtonGroup } from "@blueprintjs/core"
import { Link } from "react-router-dom"
import cx from "classnames"
import React, { useContext } from "react"

import { myContext } from "../../../myProvider"
import { updateQuestInFirestore } from "../../../app/firestore/firestoreService"
import useUpdateProfileWidget from "../TopLevel/useUpdateProfileWidget"
import WordGroup from "../WordGroup/WordGroup"
import MyAudioConsole from "../MyAudioConsole/MyAudioConsole"
import useGlobalState from "../../../Context/useGlobalState"
import QuestProgressUtils from "../../Utils/QuestProgressUtils"

import css from "./FrameViewer.module.scss"
import TopLevelUtils from "../../Utils/TopLevelUtils"

export default function FrameViewer() {
  const [globalState, setGlobalState] = useContext(myContext)

  const { getProfile } = useUpdateProfileWidget()
  const loggedIn = !!getProfile().id
  const profile = getProfile()

  const {
    setGlobalStateProps,
    globalState: { showMap, world, activeFrameIndex, activeScene, questStatus },
  } = useGlobalState()

  if (!activeScene?.frameSet) {
    return <div>no frames</div>
  }
  const { frames = [] } = activeScene.frameSet
  const { questConfig = {} } = world

  const frame = frames[activeFrameIndex]
  const isLastFrame = activeFrameIndex >= frames.length - 1
  const isPenultimateFrame = activeFrameIndex >= frames.length - 2
  const isFirstFrame = activeFrameIndex === 0

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

    const { audioURL, trackList } = frame

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
        {renderButtons()}
      </div>
    )
  }

  const getLocationName = () => {
    return activeScene?.location?.name
  }

  const incrementFrame = ({ increment = true }) => {
    if (increment) {
      // Show map if the user advances to the last frame
      if (isPenultimateFrame) {
        unHideMap()
      } else {
        hideMap()
      }
    }

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
    const userName = profile?.displayName || ""

    if (!frame.trackList) {
      frame.trackList = []
    }
    const length = frame.trackList.length

    const item = {
      name: `track-${userName}-${length + 101}`,
      url: audioURL,
    }

    frame.trackList.push(item)
    updateQuestInFirestore(world)
  }

  function onSaveAudioForLine({ audioURL, dialog }) {
    dialog.audioURL = audioURL

    updateQuestInFirestore(world)
  }

  const toggleMap = () => {
    setGlobalStateProps({
      showMap: !showMap,
    })
  }

  const hideMap = () => {
    setGlobalStateProps({
      showMap: false,
    })
  }

  const unHideMap = () => {
    setGlobalStateProps({
      showMap: true,
    })
  }

  const renderButtons = () => {
    const { isEndScene } = activeScene
    let areAllMissionsCompleted = true

    if (questConfig) {
      areAllMissionsCompleted = QuestProgressUtils.areAllMissionsCompleted({
        completedMissions: questStatus.completedMissions,
        missions: TopLevelUtils.getMissions({ questConfig }),
      })
    }

    if (isEndScene && isLastFrame && areAllMissionsCompleted) {
      return (
        <ButtonGroup large={true} className={css.buttonsContainer}>
          <Button>
            <Link to={"/books"}>Play Again</Link>
          </Button>
        </ButtonGroup>
      )
    }

    return (
      <ButtonGroup large={true} className={css.buttonsContainer}>
        <Button onClick={toggleMap}>{`${
          showMap ? "Hide" : "Show"
        } Map`}</Button>
        <Button
          disabled={isFirstFrame}
          onClick={() => incrementFrame({ increment: false })}
        >
          Prev Page
        </Button>
        <Button disabled={isLastFrame} onClick={() => incrementFrame({})}>
          Next Page
        </Button>
      </ButtonGroup>
    )
  }

  const renderFrame = () => {
    const sceneName = getLocationName()

    return (
      <div className={css.wordsAndButtons}>
        <div className={css.sceneName}>{sceneName}</div>
        <div className={css.wordsContainer}>{renderDialog()}</div>
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
