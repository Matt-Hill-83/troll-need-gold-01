import cx from "classnames"
import { Rnd } from "react-rnd"

import React, { useContext, useState } from "react"

import { myContext } from "../../../myProvider.js"
import { updateQuestInFirestore } from "../../../app/firestore/firestoreService.js"
import Character from "../../../Common/Components/Character/Character.js"
import Constants from "../../../Common/Constants/Constants.js"
import FrameViewer from "../FrameViewer/FrameViewer.js"
import ImageDisplay from "../../../Common/Components/ImageDisplay/ImageDisplay.js"
import images from "../../../Common/Images/images.js"
import MissionConsole from "../MissionConsole/MissionConsole.js"
import WorldViewer from "../WorldViewer/WorldViewer.js"
import useUpdateProfileWidget from "../TopLevel/useUpdateProfileWidget.js"

import css from "./StoryMode.module.scss"

export default function StoryMode(props) {
  const { getProfile } = useUpdateProfileWidget()
  const profile = getProfile()

  const isGod = profile.id === "AMAgzal2oAbHogUvO9vVeHWZygF3"

  const { updateActiveScene } = props
  const innerWidth = window.innerWidth
  const innerHeight = window.innerHeight
  const locationWidth = 200

  const initialRnD = {
    width: locationWidth,
    height: locationWidth,
    x: innerWidth * 0.8,
    y: innerHeight * 0.6,
  }

  const [itemPosition, setItemPosition] = useState(initialRnD)

  const [globalState] = useContext(myContext)
  const {
    world,
    showMissionConsole,
    activeScene,
    activeFrameIndex,
  } = globalState

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

  const getMood = ({ name, faces }) => {
    let mood = "ok"
    const newMood = faces && faces.find((face) => face.character === name)
    return newMood?.face || mood
  }

  const renderLocationImage = () => {
    const locationName = activeScene?.location?.name
    const newItem = { name: locationName }

    const style = {
      right: "0",
      bottom: "0",
      top: "unset",
      left: "unset",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "solid 1px #ddd",
      background: "#f0f0f0",
    }

    const onDragStop = ({ d, e, activeScene }) => {
      // console.log("onDragStop") // zzz
      // console.log("e", e) // zzz
      const newPosition = { x: d.x, y: d.y }
      setItemPosition(newPosition)
      console.log("newPosition - drag", newPosition) // zzz
      console.log("activeScene.location", activeScene.location) // zzz
      if (!activeScene?.location?.position) {
        activeScene.location.position = newPosition
      }
      const prevPosition = activeScene?.location?.position
      console.log(
        "activeScene.location.position",
        activeScene.location.position
      ) // zzz
      Object.assign(prevPosition || {}, newPosition)
      updateQuestInFirestore(world)
    }

    const onResizeStop = ({ ref, position }) => {
      console.log("onResizeStop") // zzz
      console.log("position", position) // zzz
      const prevPosition = activeScene?.location?.position
      const newPosition = {
        // ...position,
        prevPosition,
        width: ref.style.width,
        height: ref.style.height,
      }
      console.log("newPosition", newPosition) // zzz
      setItemPosition(newPosition)
      if (!activeScene?.location?.position) {
        activeScene.location.position = newPosition
      }

      Object.assign(prevPosition || {}, newPosition)

      console.log(
        "activeScene.location.position",
        activeScene.location.position
      ) // zzz
      updateQuestInFirestore(world)
    }

    // TODO - convert this to vw, vh and use it.
    // TODO - convert this to vw, vh and use it.
    // TODO - convert this to vw, vh and use it.
    // TODO - convert this to vw, vh and use it.
    // TODO - convert this to vw, vh and use it.
    // const defaultPosition = { x: 1813, y: 596 }

    const defaultPosition = { x: itemPosition.x, y: itemPosition.y }
    // let position = defaultPosition
    let position = activeScene?.location?.position || defaultPosition
    const image = images.all[locationName]

    const size = { width: itemPosition.width, height: itemPosition.height }
    console.log("size", size) // zzz

    return (
      <Rnd
        className={css.locationImageDragger}
        style={style}
        size={size}
        position={position}
        onDragStop={(e, d) => {
          console.log("e", e) // zzz
          console.log("d", d) // zzz
          onDragStop({ d, e, activeScene })
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          onResizeStop({ ref, position })
        }}
      >
        <div className={css.locationDragger}>
          {/* <img className={css.image} src={image} alt={"locationName"} /> */}
          <ImageDisplay
            className={css.locationImage}
            item={newItem}
            showLabel={true}
          />
        </div>
        {/* <div className={css.locationDragger}>Rnd</div> */}
      </Rnd>
    )

    return (
      <Rnd
        default={{
          x: 0,
          y: 0,
          width: 620,
          height: 400,
        }}
      >
        <div className={css.locationDragger}>
          <ImageDisplay
            // className={css.locationImage}
            item={newItem}
            showLabel={true}
          />
        </div>
        {/* <div className={css.locationDragger}>Rnd</div> */}
      </Rnd>
    )
  }
  const getActiveFrame = ({ activeFrameIndex }) => {
    const frames = activeScene?.frameSet?.frames || []
    return frames[activeFrameIndex]
  }

  const frame = getActiveFrame({ activeFrameIndex })
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
      {renderLocationImage()}
    </div>
  )
}
