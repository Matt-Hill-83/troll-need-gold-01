import React, { useState } from "react"
import _get from "lodash.get"
import { Popover } from "@blueprintjs/core"
import cx from "classnames"

import { Button } from "@material-ui/core"
import CharacterPicker from "../../../QuestBuilder/components/CharacterPicker/CharacterPicker"
import Constants from "../../../Common/Constants/Constants"
import Images from "../../../Common/Images/images"
import images from "../../../Common/Images/images"
import QuestVisibilityUtils from "../../Utils/QuestVisibilityUtils.js"
import useGlobalState from "../../../Context/useGlobalState.js"
import Utils from "../../../Common/Utils/Utils"

import css from "./MiniLocation.module.scss"
import WorldBuilderUtils from "../../../QuestBuilder/Utils/WorldBuilderUtils"
import TopLevelUtils from "../../Utils/TopLevelUtils"

export default function MiniLocation(props) {
  // const { updateActiveScene, className } = props
  const { updateActiveScene, scene, className } = props
  // let { scene } = props

  const { coordinates, id } = scene

  const {
    globalState: { world, activeScene, questStatus = {} },
  } = useGlobalState()

  const [itemPickerItem, setItemPickerItem] = useState(null)
  const [showItemPicker, setShowItemPicker] = useState(false)

  const isActive = scene.id === activeScene.id ? true : false

  // These are the critters1 creatures from the first frame that hover over the active location.
  const renderCreatures = () => {
    const activeFrame = Utils.getFirstFrame({ activeScene }) || {}
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

  const isVisitedScene = questStatus.visitedScenes.some(
    (item) => item === scene.id
  )
  const locationName = scene.location.name

  const showNothing = QuestVisibilityUtils.isSceneHidden({
    sceneId: scene.id,
    questStatus,
  })

  const showLock = QuestVisibilityUtils.isSceneLocked({
    sceneId: scene.id,
    questStatus,
  })

  const isBlank = locationName === "blank" || showNothing

  if (isBlank) {
    return <div key={id} className={`${css.main} ${css.isBlank} `}></div>
  }

  const isClouded = QuestVisibilityUtils.isSceneClouded({
    sceneId: scene.id,
    questStatus,
  })

  const isActiveClass = isActive ? css.activeClass : ""
  const cloudImage = Images.backgrounds["cloud"]
  const lockImage = Images.items["lock02"]

  const scenesGrid = _get(world, "newGrid5") || []

  const neighbors = Utils.getNeighbors({ coordinates, grid: scenesGrid })
  const neighborsArray = Utils.getNeighborsAsArray({
    coordinates,
    grid: scenesGrid,
  }).filter((neighbor) => neighbor && neighbor.id)

  const neighborIsActive = neighborsArray.some((neighbor) => {
    return neighbor && neighbor.id === activeScene.id
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

  const preventClick = showCloud || showLock || showNothing

  let onClickLocation = () => {}
  if (!preventClick) {
    onClickLocation = () => {
      updateActiveScene({
        sceneId: scene.id,
      })
    }
  }

  const backgroundColor = QuestVisibilityUtils.getSubQuestColor({
    world,
    sceneId: scene.id,
  })

  const largeLocation = false
  const defaultImageSets = [images.newBackgrounds]
  const imageSets = defaultImageSets

  const onSelectItem = async ({ name }) => {
    setItemPickerItem(name)
    scene.backgroundImage = name

    await TopLevelUtils.updateMap2({ mapToUpdate: world })
    // saveChanges()
    toggleItemPicker({})
  }

  const toggleItemPicker = ({ item = null }) => {
    setShowItemPicker(!showItemPicker)
    setItemPickerItem(item)
  }

  return (
    <div
      key={id}
      className={cx(
        css.main,
        className,
        {
          [css.showNotAllowed]: preventClick,
          [css.showPointer]: !preventClick,
        },
        isActiveClass,
        largeLocation
      )}
      style={backgroundColor}
      onClick={onClickLocation}
    >
      <Popover className={css.locationPicker}>
        <Button>bk</Button>
        <CharacterPicker
          className={css.backgroundPicker}
          isOpen={true}
          // isOpen={showItemPicker}
          imageSets={imageSets}
          onClose={toggleItemPicker}
          onSelectItem={onSelectItem}
        />
      </Popover>
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
            <img className={css.lockImage} src={lockImage} alt={"imagex"} />
          </div>
        )}

        <div className={css.imagesBox}>
          <img
            className={css.miniLocationImage}
            alt={"imagex"}
            src={locationImage}
          />
        </div>

        {isActive && <div className={css.characters}>{renderCreatures()}</div>}

        <span className={css.locationTitle}>{locationName}</span>
      </div>
    </div>
  )
}
