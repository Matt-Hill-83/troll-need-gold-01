import React, { useContext } from "react"

import { myContext } from "../../../myProvider.js"
import MissionConsole from "../MissionConsole/MissionConsole.js"
import WorldViewer from "../WorldViewer/WorldViewer.js"
import FrameViewer from "../FrameViewer/FrameViewer.js"
import images from "../../../Common/Images/images.js"
import cx from "classnames"

import ImageDisplay from "../../../Common/Components/ImageDisplay/ImageDisplay.js"
import Constants from "../../../Common/Constants/Constants.js"
import Character from "../../../Common/Components/Character/Character.js"

import css from "./StoryMode.module.scss"

export default function StoryMode(props) {
  const { updateActiveScene } = props

  const [globalState] = useContext(myContext)
  const {
    world,
    showMissionConsole,
    activeScene,
    activeFrameIndex,
  } = globalState
  console.log("globalState", globalState) // zzz
  const { backgroundImage } = activeScene

  if (!world || !world.title) {
    return <div>no world</div>
  }

  const renderWorldName = (
    <div tabIndex={0} className={css.worldTitle}>
      <span> {world.title} </span>
    </div>
  )

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

  const renderLocationImage = () => {
    const locationName = activeScene?.location?.name

    const newItem = { name: locationName }

    return (
      <ImageDisplay
        className={css.locationImage}
        item={newItem}
        showLabel={true}
      />
    )
  }

  const frames = activeScene?.frameSet?.frames || []
  const frame = frames[activeFrameIndex]

  const { critters1, critters2 } = frame

  return (
    <div className={`${css.main}`}>
      <img className={css.backgroundImage} src={mainBackground} alt={"bk"} />
      <img className={css.backgroundImage2} src={mainBackground2} alt={"bk"} />
      {renderWorldName}
      {/* <div className={`${css.missionConsoleBox}`}>
        {showMissionConsole && <MissionConsole world={world} />}
      </div> */}
      <div className={`${css.halfPage} ${css.leftHalf}`}>
        {/* <FrameViewer /> */}
      </div>
      {/* {renderLocationImage()} */}
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

      {/* <div className={`${css.halfPage} ${css.rightHalf}`}>
        <WorldViewer updateActiveScene={updateActiveScene} />
      </div> */}
    </div>
  )
}
