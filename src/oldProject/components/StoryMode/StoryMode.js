import cx from "classnames"
import { Rnd } from "react-rnd"

import React, { useContext, useState, useEffect } from "react"

import { myContext } from "../../../myProvider.js"
import Character from "../../../Common/Components/Character/Character.js"
import Constants from "../../../Common/Constants/Constants.js"
import FrameViewer from "../FrameViewer/FrameViewer.js"
import images from "../../../Common/Images/images.js"
import MissionConsole from "../MissionConsole/MissionConsole.js"
import WorldViewer from "../WorldViewer/WorldViewer.js"
import useUpdateProfileWidget from "../TopLevel/useUpdateProfileWidget.js"

import css from "./StoryMode.module.scss"
import LocationImage from "../LocationImage/LocationImage.jsx"

export default function StoryMode(props) {
  const [globalState] = useContext(myContext)
  const {
    world,
    showMissionConsole,
    activeScene,
    activeFrameIndex,
  } = globalState

  const { getProfile } = useUpdateProfileWidget()
  const profile = getProfile()

  const isGod = profile.id === "AMAgzal2oAbHogUvO9vVeHWZygF3"
  const { updateActiveScene } = props

  const getInitialRnD = () => {
    const innerWidth = window.innerWidth
    const innerHeight = window.innerHeight
    const locationWidth = 300
    const locationHeight = locationWidth

    console.log("innerWidth", innerWidth) // zzz
    // x defines the NE corner
    const x = innerWidth * 1

    // y defines the top
    const y = innerHeight * 0.7 - locationHeight

    console.log("x", x) // zzz
    console.log("y", y) // zzz
    const initialRnD = {
      width: locationWidth,
      height: locationHeight,
      x,
      y,
    }
    return initialRnD
  }

  console.log("activeScene", activeScene) // zzz
  const [itemPosition, setItemPosition] = useState(getInitialRnD())

  useEffect(() => {
    // returned function will be called on component unmount
    return () => {}
  }, [])

  // on change in props
  useEffect(() => {
    const initialRnD = getInitialRnD()
    setItemPosition(initialRnD)
    console.log("new props =================================>>>>>")
  }, [props])

  const { backgroundImage } = activeScene

  if (!world || !world.title) {
    return <div>no world</div>
  }

  const mainBackground = backgroundImage
    ? images.newBackgrounds[backgroundImage]
    : images.backgrounds["hill01"]
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

  const getPosition = () => {
    if (!activeScene?.location?.position) {
      activeScene.location.position = {}
    }
    return activeScene?.location?.position
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
  console.log("itemPosition", itemPosition) // zzz

  const { critters1, critters2 } = frame

  return (
    <div className={`${css.main}`}>
      <img className={css.backgroundImage} src={mainBackground} alt={"bk"} />
      <img className={css.backgroundImage2} src={mainBackground2} alt={"bk"} />
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
      <div className={css.lizAndKatContainer}>{renderPosableCritters()}</div>

      <div className={`${css.halfPage} ${css.rightHalf}`}>
        <WorldViewer updateActiveScene={updateActiveScene} />
      </div>
      <LocationImage></LocationImage>
    </div>
  )
}
