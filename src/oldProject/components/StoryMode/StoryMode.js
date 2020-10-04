import React, { useContext } from "react"

import { myContext } from "../../../myProvider.js"
import MissionConsole from "../MissionConsole/MissionConsole.js"
import WorldViewer from "../WorldViewer/WorldViewer.js"
import FrameViewer from "../FrameViewer/FrameViewer.js"
import images from "../../../Common/Images/images.js"

import css from "./StoryMode.module.scss"
import ImageDisplay from "../../../Common/Components/ImageDisplay/ImageDisplay.js"

export default function StoryMode(props) {
  const { updateActiveScene } = props

  const [globalState] = useContext(myContext)
  const { world, showMissionConsole, activeScene } = globalState
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

  const renderLocationImage = () => {
    const locationName = activeScene?.location?.name
    const locationImage = images.all[locationName]
    const newItem = { name: locationName }
    return (
      <ImageDisplay
        className={css.locationImage}
        item={newItem}
        showLabel={true}
        // amount={amount}
        // showAmount={true}
      />
    )

    return (
      <div className={css.locationImageContainer}>
        <img className={css.locationImage} src={locationImage} alt={"imagex"} />
        <span className={`${css.locationLabel}`}>{locationName}</span>
      </div>
    )
  }

  return (
    <div className={`${css.main}`}>
      <img className={css.backgroundImage} src={mainBackground} alt={"bk"} />
      <img className={css.backgroundImage2} src={mainBackground2} alt={"bk"} />
      {renderWorldName}
      <div className={`${css.missionConsoleBox}`}>
        {showMissionConsole && <MissionConsole world={world} />}
      </div>
      <div className={`${css.halfPage} ${css.leftHalf}`}>
        <FrameViewer />
      </div>
      {renderLocationImage()}

      <div className={`${css.halfPage} ${css.rightHalf}`}>
        <WorldViewer updateActiveScene={updateActiveScene} />
      </div>
    </div>
  )
}
