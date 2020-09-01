import _get from "lodash.get"
import { Button } from "@blueprintjs/core"
import cx from "classnames"
import React, { useContext } from "react"

import { myContext } from "../../../myProvider"
import ArrowNavigator from "../ArrowNavigator/ArrowNavigator"
import Character from "../Character/Character"
import Constants from "../../Utils/Constants/Constants"
import Images from "../../images/images"
import WordGroup from "../WordGroup/WordGroup"

import css from "./FrameViewer.module.scss"

export default function FrameViewer(props) {
  const [globalStorage, setGlobalStorage] = useContext(myContext)

  const renderDialog = ({ cloneIndex }) => {
    const { frame, scene } = props
    const dialog = (frame && frame.dialog) || []
    const allCharactersInScene = {}

    scene.frameSet &&
      scene.frameSet.frames &&
      scene.frameSet.frames.forEach((frame) => {
        const test = [...frame.critters1, ...frame.critters2]
        test.forEach((char) => {
          allCharactersInScene[char.id] = char
        })
      })

    const allCharactersInScene2 = Object.values(allCharactersInScene)

    const charIndexMap = {}
    const charactersAndLocation = [...allCharactersInScene2, scene.location]

    charactersAndLocation.forEach((char, charIndex) => {
      charIndexMap[char.name] = charIndex
    })

    // TODO: for some reason, probably from cloning, some characters share the same id.
    const renderedDialogs = dialog.map((line, lineIndex) => {
      const { text } = line

      const characterName = line.character || ""
      const characterIndex = charIndexMap[characterName]

      if (!text) return null
      const className = `character${characterIndex}`

      const indexIsEven = characterIndex % 2 === 0

      const isEven = (
        <div className={cx(css.line, css[className], css.isEven)}>
          <div className={cx(css.characterNameContainer)}>
            <span className={css.characterName}>{characterName}</span>
          </div>
          <WordGroup lineIndex={lineIndex} story={[text]} />
        </div>
      )

      const isOdd = (
        <div className={cx(css.line, css[className], css.isOdd)}>
          <WordGroup lineIndex={lineIndex} story={[text]} />
          <div className={cx(css.characterNameContainer)}>
            <span className={css.characterName}>{characterName}</span>
          </div>
        </div>
      )

      return indexIsEven ? isEven : isOdd
    })

    const scalingFactor = 1.6
    const style = {
      "margin-left": `-${cloneIndex * scalingFactor}vh`,
      "margin-top": `${cloneIndex * scalingFactor}vh`,
      border: "3px solid red",
    }
    return (
      <div className={css.dialogScroller} style={style}>
        <div className={css.dialog}>{renderedDialogs}</div>
      </div>
    )
  }

  const getMood = ({ name, faces }) => {
    let mood = "ok"
    const newMood = faces && faces.find((face) => face.character === name)
    mood = (newMood && newMood.face) || mood
    return mood
  }

  const renderLocationImage = () => {
    const locationName = _get(props, "scene.location.name")
    const locationImage = Images.all[locationName]

    return (
      <div className={css.locationImageContainer}>
        <img className={css.locationImage} src={locationImage} alt={"imagex"} />
        <span className={`${css.locationLabel}`}>{locationName}</span>
      </div>
    )
  }

  const renderBackground = () => {
    const backgroundImageHill = Images.backgrounds["hill01"]
    const brokenMonitor01 = Images.backgrounds["brokenMonitor01"]

    return (
      <div className={css.backgroundImageContainer}>
        <div className={css.backgroundGrass}>
          <img
            className={css.backgroundGrassImage}
            src={backgroundImageHill}
            alt={`backgroundImage`}
          />
        </div>
        {/* <div className={css.backgroundGrass}>
          <img
            className={css.backgroundGrassImage}
            src={brokenMonitor01}
            alt={`backgroundImage`}
          />
        </div> */}
      </div>
    )
  }

  const renderCritters = ({ critters, className }) => {
    const filteredCritters =
      critters.filter((item) => {
        return !Constants.posableCharacters.includes(item.name)
      }) || []

    const critterNames = filteredCritters.map((item) => item.name)

    return critterNames.map((character, index) => {
      return (
        <div className={cx(css.characterContainer, className)} key={index}>
          <Character name={character} isEditMode={false} showHeadOnly={false} />
        </div>
      )
    })
  }

  const renderPosableCritters = () => {
    const { frame } = props
    const { faces = [] } = frame

    if (!frame) return null

    const posableCharacters = Constants.posableCharacters

    const critters =
      frame.critters1.filter((item) => {
        return posableCharacters.includes(item.name)
      }) || []

    const critterNames = critters.map((item) => item.name)
    return critterNames.map((character, index) => {
      const mood = getMood({ name: character, faces })

      return (
        <div className={`${css.characterContainer2}`} key={index}>
          <Character
            name={character}
            mood={mood}
            isEditMode={false}
            showHeadOnly={false}
          />
        </div>
      )
    })
  }

  const onClickNext = () => {
    setGlobalStorage((prevVal) => {
      return {
        ...prevVal,
        activeFrameIndex: (prevVal.activeFrameIndex += 1),
      }
    })
  }

  const renderArrowNavigator = () => {
    const activeScene = globalStorage.activeScene
    const { isLastFrame, updateActiveScene, openQuestPicker } = props
    const { isEndScene } = activeScene

    if (isEndScene && isLastFrame) {
      return (
        <Button onClick={openQuestPicker} className={css.newGameButton}>
          New Game
        </Button>
      )
    }

    return (
      <div className={css.arrowNavigatorBox}>
        {!isLastFrame && (
          <div className={css.nextPageButtonRow}>
            <Button onClick={onClickNext} className={css.nextButton}>
              Next Page
            </Button>
          </div>
        )}
        {isLastFrame && (
          <div>Click a new location to move</div>
          // <ArrowNavigator
          //   activeScene={activeScene}
          //   updateActiveScene={updateActiveScene}
          // />
        )}
      </div>
    )
  }

  const cloneDialogs = () => {
    const numPages = 3
    const dialogClones = []
    for (let cloneIndex = 0; cloneIndex < numPages; cloneIndex++) {
      const dialog = renderDialog({ cloneIndex })
      dialogClones.push(dialog)
    }

    return dialogClones
  }

  const renderFrame = () => {
    const { frame, scene, isLastFrame } = props
    const critters1 = frame.critters1 || []
    const critters2 = frame.critters2 || []
    const sceneName = scene.location.name

    return (
      <div className={`${css.scenes}`}>
        {renderBackground()}
        {renderLocationImage()}

        <div className={css.relativePositionedContent}>
          <div className={css.wordsAndButtons}>
            <div className={css.sceneName}>{sceneName}</div>
            <div className={css.wordsContainer}>{cloneDialogs()}</div>
            <div className={css.buttonsContainer}>{renderArrowNavigator()}</div>
          </div>
          <div className={css.imageGroupsContainer}>
            <div className={css.lizAndKatContainer}>
              {renderPosableCritters()}
            </div>
            <div className={css.charactersContainer}>
              {renderCritters({
                critters: critters2,
              })}
            </div>
            <div
              className={cx(css.charactersContainer, css.charactersContainer2)}
            >
              {renderCritters({
                critters: critters1,
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const { frame } = props

  if (!frame) {
    return null
  }

  return (
    <div className={css.main}>
      <div className={css.scenesContainer}>{renderFrame()}</div>
    </div>
  )
}
