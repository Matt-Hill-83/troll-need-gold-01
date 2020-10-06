import cx from "classnames"
import { Rnd } from "react-rnd"

import React, { useContext, useState, useEffect } from "react"

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
import { Button } from "@blueprintjs/core"

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
    const x = innerWidth * 0.9

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

  // const renderLocationImage = () => {
  //   const locationName = activeScene?.location?.name
  //   const newItem = { name: locationName }

  //   const style = {
  //     right: "0",
  //     bottom: "0",
  //     top: "unset",
  //     left: "unset",
  //     display: "flex",
  //     alignItems: "center",
  //     justifyContent: "center",
  //     border: "solid 1px #ddd",
  //     background: "#f0f0f0",
  //   }

  //   const onDragStop = ({ d, e }) => {
  //     const prevPosition = getPosition()
  //     const newPosition = { x: d.x, y: d.y }
  //     const mergedPosition = { ...prevPosition, ...newPosition }
  //     setItemPosition(mergedPosition)

  //     console.log("mergedPosition - drag", mergedPosition) // zzz
  //     // if (activeScene?.location?.position) {
  //     //   activeScene.location.position = mergedPosition
  //     // }

  //     // Object.assign(prevPosition, mergedPosition)
  //     // updateQuestInFirestore(world)
  //   }

  //   const onResizeStop = ({ ref, position }) => {
  //     console.log("onResizeStop---------------") // zzz
  //     console.log("position", position) // zzz
  //     const prevPosition = getPosition()
  //     const newPosition = {
  //       width: ref.style.width,
  //       height: ref.style.height,
  //       ...position,
  //     }
  //     console.log("position", position) // zzz
  //     console.log("prevPosition", prevPosition) // zzz
  //     const mergedPosition = { ...prevPosition, ...newPosition }

  //     console.log("mergedPosition", mergedPosition) // zzz
  //     setItemPosition(mergedPosition)

  //     // if (activeScene?.location?.position) {
  //     //   activeScene.location.position = mergedPosition
  //     // }
  //     // Object.assign(prevPosition, mergedPosition)

  //     console.log(
  //       "activeScene.location.position",
  //       activeScene.location.position
  //     ) // zzz
  //     // updateQuestInFirestore(world)
  //   }

  //   const savePositions = () => {
  //     console.log("savePositions") // zzz
  //     console.log("itemPosition", itemPosition) // zzz
  //     if (activeScene?.location?.position) {
  //       activeScene.location.position = itemPosition
  //     }
  //     updateQuestInFirestore(world)
  //   }

  //   const defaultPosition = { x: itemPosition.x, y: itemPosition.y }
  //   let position = defaultPosition
  //   // let position = activeScene?.location?.position || defaultPosition
  //   const { width, height } = position

  //   const size = {
  //     width: width || itemPosition.width,
  //     height: height || itemPosition.height,
  //   }
  //   console.log("itemPosition", itemPosition) // zzz
  //   console.log("size", size) // zzz

  //   const buttons = <Button onClick={savePositions}>test</Button>

  //   return (
  //     <Rnd
  //       className={css.locationImageDragger}
  //       style={style}
  //       size={size}
  //       position={position}
  //       onDragStop={(e, d) => {
  //         onDragStop({ d, e })
  //       }}
  //       onResizeStop={(e, direction, ref, delta, position) => {
  //         onResizeStop({ ref, position })
  //       }}
  //     >
  //       <div className={css.locationDragger}>
  //         {/* <img className={css.image} src={image} alt={"locationName"} /> */}
  //         <ImageDisplay
  //           className={css.locationImage}
  //           item={newItem}
  //           showLabel={true}
  //           buttons={buttons}
  //         />
  //       </div>
  //       {/* Div to shield child element from clicks */}
  //       <div
  //         style={{
  //           width: "100%",
  //           height: "100%",
  //           // backgroundColor: "blue",
  //           position: "absolute",
  //           zIndex: "100",
  //         }}
  //       >
  //         test-----
  //       </div>
  //       {/* <div className={css.locationDragger}>Rnd</div> */}
  //     </Rnd>
  //   )

  //   // return (
  //   //   <Rnd
  //   //     default={{
  //   //       x: 0,
  //   //       y: 0,
  //   //       width: 620,
  //   //       height: 400,
  //   //     }}
  //   //     onDragStop={(e, d) => {
  //   //       onDragStop({ d, e })
  //   //     }}
  //   //     onResizeStop={(e, direction, ref, delta, position) => {
  //   //       onResizeStop({ ref, position })
  //   //     }}
  //   //   >
  //   //     <div className={css.locationDragger}>
  //   //       <ImageDisplay
  //   //         // className={css.locationImage}
  //   //         item={newItem}
  //   //         showLabel={true}
  //   //       />
  //   //     </div>
  //   //     {/* <div className={css.locationDragger}>Rnd</div> */}
  //   //   </Rnd>
  //   // )
  // }
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
      {renderLocationImage()}
    </div>
  )
}
