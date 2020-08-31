import React, { useContext } from "react"
import _get from "lodash.get"

import { myContext } from "../../../myProvider.js"
import Constants from "../../Utils/Constants/Constants.js"
import Images from "../../images/images.js"
import QuestVisibilityUtils from "../../Utils/QuestVisibilityUtils.js"
import Utils from "../../Utils/Utils.js"

import css from "./MiniLocation.module.scss"

export default function MiniLocation(props) {
  // console.log("") // zzz
  // console.log("MiniLocation----------------------") // zzz
  const { scene, isActive, className, id, world } = props
  const [globalStorage, setGlobalStorage] = useContext(myContext)
  const { questStatus } = globalStorage

  const { activeScene } = globalStorage
  console.log("activeScene----------------ML", activeScene) // zzz

  // These are the critters1 creatures from the first frame that hover over the active location.
  const renderCreatures = ({ isActive }) => {
    if (!isActive) {
      return null
    }

    const activeFrame = Utils.getFirstFrame({ activeScene }) || {}
    console.log("activeFrame", activeFrame) // zzz
    const { critters1 = [] } = activeFrame

    const renderedCharacters = critters1
      .map((item) => item.name)
      .map((creature) => {
        const image = Images.all[creature] || null
        if (!image) return null

        const friend = (
          <img
            className={`${css.characterImageMini} ${css.character1Mini}`}
            src={image}
            alt={"creatureType"}
          />
        )

        return friend
      })
    return <div className={css.charactersContainer}>{renderedCharacters}</div>
  }

  const renderBlankScene = ({ id }) => {
    return <div key={id} className={`${css.main} ${css.isBlank} `}></div>
  }

  const { coordinates, isStartScene, onClick } = scene
  const isVisitedScene = questStatus.visitedScenes.some(
    (item) => item === scene.id
  )
  const locationName = scene.location.name

  const showNothing = QuestVisibilityUtils.isSceneHidden({
    sceneId: scene.id,
    questStatus,
  })
  const isBlank = locationName === "blank" || showNothing
  if (isBlank) {
    return renderBlankScene({ id })
  }

  const isClouded = QuestVisibilityUtils.isSceneClouded({
    sceneId: scene.id,
    questStatus,
  })

  const localClass = isActive ? css.activeClass : ""
  const cloudImage = Images.backgrounds["cloud"]
  const lockImage = Images.items["lock02"]

  const showLocationOnly = locationName === "roadLeftRight01"
  const scenesGrid = _get(world, "newGrid5") || []

  const neighbors = Utils.getNeighbors({ coordinates, grid: scenesGrid })
  const neighborsArray = Utils.getNeighborsAsArray({ coordinates }).filter(
    (neighbor) => neighbor && neighbor.id
  )

  const neighborIsActive = neighborsArray.some((neighbor) => {
    return neighbor && neighbor.id === activeScene.id
  })

  if (showLocationOnly) {
    const roadLeftRight01 = Images.items["roadLeftRight01"]
    return (
      <div className={`${css.main} ${className} ${localClass} `}>
        <div className={css.container}>
          <div className={css.roadLeftRight01}>
            <img className={css.none} src={roadLeftRight01} alt={"imagex"} />
          </div>
        </div>
      </div>
    )
  }

  const showLock = QuestVisibilityUtils.isSceneLocked({
    sceneId: scene.id,
    questStatus,
  })
  // apply position based clouded state
  // If cloud is still hidden, apply config based state
  const hideCloud = isVisitedScene || neighborIsActive || !isClouded
  const showCloud = !hideCloud

  const locationImage = Images.all[locationName]
  const rockImage = Images.backgrounds["rock"]
  const rockImageVertical = Images.backgrounds["rock02Vertical"]
  const showBottomPath = neighbors[Constants.neighborPositionsEnum.bottom]
  const showRightPath = neighbors[Constants.neighborPositionsEnum.right]

  const backgroundColor = QuestVisibilityUtils.getSubQuestColor({
    world,
    sceneId: scene.id,
  })

  const largeLocation = false

  return (
    <div
      key={id}
      className={`${css.main} ${className} ${
        isStartScene ? css.isStartScene : ""
      }  ${localClass} ${largeLocation}`}
      style={backgroundColor}
      onClick={onClick}
    >
      <div className={css.container}>
        {/* Paths that connect scenes */}
        {showRightPath && (
          <div className={css.rightPath}>
            <img className={css.rockImage} src={rockImage} alt={"imagex"} />
          </div>
        )}
        {showBottomPath && (
          <div className={css.bottomPath}>
            <img
              className={css.rockImageVertical}
              src={rockImageVertical}
              alt={"imagex"}
            />
          </div>
        )}

        {showCloud && (
          <div className={css.cloudImageContainer}>
            <img className={css.cloudImage} src={cloudImage} alt={"imagex"} />
          </div>
        )}
        {showLock && (
          <div className={css.cloudImageContainer}>
            <img className={css.cloudImage} src={lockImage} alt={"imagex"} />
          </div>
        )}

        <div className={css.imagesBox}>
          <img
            className={css.miniLocationImage}
            alt={"imagex"}
            src={locationImage}
          />
        </div>

        <div className={css.characters}>
          {/* add this back after refactor */}
          {renderCreatures({ isActive })}
        </div>

        <span className={css.locationTitle}>{locationName}</span>
      </div>
    </div>
  )
}
