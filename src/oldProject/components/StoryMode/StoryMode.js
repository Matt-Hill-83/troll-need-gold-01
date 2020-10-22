import cx from "classnames"
import React, { useContext } from "react"

import { myContext } from "../../../myProvider.js"
import Character from "../../../Common/Components/Character/Character.js"
import Constants from "../../../Common/Constants/Constants.js"
import FrameViewer from "../FrameViewer/FrameViewer.js"
import images from "../../../Common/Images/images.js"
import LocationImage from "../LocationImage/LocationImage.jsx"
import MissionConsole from "../MissionConsole/MissionConsole.js"
import WorldViewer from "../WorldViewer/WorldViewer.js"

import css from "./StoryMode.module.scss"

export default function StoryMode(props) {
  const [globalState] = useContext(myContext)
  const {
    world,
    showMissionConsole,
    activeScene,
    activeFrameIndex,
  } = globalState

  const { updateActiveScene } = props

  const { backgroundImage } = activeScene

  if (!world || !world.title) {
    return <div>no world</div>
  }

  const defaultBackground = images.backgrounds["hill01"]

  const mainBackground = backgroundImage
    ? images.newBackgrounds[backgroundImage]
    : defaultBackground

  const mainBackground2 = images.backgrounds["planetGlorp03"]

  const renderCritters = ({ critters, className }) => {
    const filteredCritters =
      critters.filter((item) => {
        return !Constants.posableCharacters.includes(item.name)
      }) || []

    return filteredCritters.map((character, index) => {
      return (
        <div className={cx(css.characterContainer, className)} key={index}>
          <Character
            name={character.name}
            flipImage={character.flipImage}
            isEditMode={false}
            showHeadOnly={false}
          />
        </div>
      )
    })
  }

  const renderPosableCritters = () => {
    const { faces = [] } = frame
    if (!frame) return null

    const posableCharacters = Constants.posableCharacters

    const critters =
      frame.critters1.filter((item) => {
        return posableCharacters.includes(item.name)
      }) || []

    const critterNames = critters.map((item) => item.name)
    const output = critterNames.map((character, index) => {
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

    return <div className={css.lizAndKatContainer}>{output}</div>
  }

  const getMood = ({ name, faces }) => {
    let mood = "ok"
    const newMood = faces && faces.find((face) => face.character === name)
    return newMood?.face || mood
  }

  const getActiveFrame = ({ activeFrameIndex }) => {
    const frames = activeScene?.frameSet?.frames || []
    return frames[activeFrameIndex]
  }

  const frame = getActiveFrame({ activeFrameIndex })
  const { critters1, critters2 } = frame

  return (
    <div className={`${css.main}`}>
      <div className={css.backgroundImageBox}>
        <img className={css.backgroundImage1} src={mainBackground} alt={"bk"} />
        <img className={css.backgroundImage2} src={mainBackground} alt={"bk"} />
        <img className={css.backgroundImage3} src={mainBackground} alt={"bk"} />
      </div>
      {false && (
        <img
          className={css.extraBackgroundImage}
          src={mainBackground2}
          alt={"bk"}
        />
      )}
      <div className={`${css.missionConsoleBox}`}>
        {showMissionConsole && <MissionConsole world={world} />}
      </div>
      <div className={`${css.halfPage} ${css.leftHalf}`}>
        <FrameViewer />
      </div>
      <div className={css.charactersContainer}>
        {renderCritters({
          critters: critters2,
        })}
      </div>
      <div className={cx(css.charactersContainer, css.charactersContainer2)}>
        {renderCritters({
          critters: critters1,
        })}
      </div>
      {renderPosableCritters()}

      <WorldViewer updateActiveScene={updateActiveScene} />
      <LocationImage />
    </div>
  )
}
