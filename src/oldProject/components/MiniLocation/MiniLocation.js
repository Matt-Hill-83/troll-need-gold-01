import React, { useContext } from "react"
import _get from "lodash.get"

import { myContext } from "../../../myProvider.js"
import Constants from "../../Utils/Constants/Constants.js"
import Images from "../../images/images.js"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"
import QuestStatusUtils from "../../Utils/QuestStatusUtils.js"
import Utils from "../../Utils/Utils.js"

import css from "./MiniLocation.module.scss"

export default function MiniLocation(props) {
  const { scene, isActive, className, id, world } = props
  const [localStorage, setLocalStorage] = useContext(myContext)
  const { questStatus } = localStorage

  const renderCreatures = ({ isActive }) => {
    if (!isActive) {
      return null
    }

    const activeScene = localStorage.activeScene
    const activeFrame = localStateStore.getFirstFrame({ activeScene }) || {}
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

  const showNothing = QuestStatusUtils.isSceneHidden({
    sceneId: scene.id,
    questStatus,
  })
  const isBlank = locationName === "blank" || showNothing
  if (isBlank) {
    return renderBlankScene({ id })
  }

  const isClouded = QuestStatusUtils.isSceneClouded({
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

  // const neighborWasVisited = neighborsArray.some((neighbor) =>
  //   localStateStore.isVisitedScene(neighbor && neighbor.id)
  // )

  const neighborIsActive = neighborsArray.some((neighbor) => {
    const activeSceneId = localStateStore.getActiveSceneId()
    return neighbor && neighbor.id === activeSceneId
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

  const showLock = QuestStatusUtils.isSceneLocked({
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

  const backgroundColor = QuestStatusUtils.getSubQuestColor({
    world,
    sceneId: scene.id,
  })

  // const sceneTrggerConfig = QuestStatusUtils.getSceneTriggerConfigFromScene({
  //   sceneId: scene.id,
  // })

  const largeLocation = false
  // const largeLocation = sceneTrggerConfig.largeImage ? css.large : ""

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
          {false && renderCreatures({ isActive })}
        </div>

        <span className={css.locationTitle}>{locationName}</span>
      </div>
    </div>
  )
}
