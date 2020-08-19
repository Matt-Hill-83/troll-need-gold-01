import React from "react"
import { FormControl, MenuItem, OutlinedInput, Select } from "@material-ui/core"
import _get from "lodash.get"

import Images from "../../images/images.js"
import Utils from "../../Utils/Utils.js"
import Constants from "../../Utils/Constants/Constants.js"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"

import css from "./MiniLocation.module.scss"
import QuestStatusUtils from "../../Utils/QuestStatusUtils.js"

class MiniLocation extends React.Component {
  defaultDoorIsOpen = {
    left: { image: "doorGreen", open: true },
    right: { image: "doorGreen", open: false },
    top: { image: "doorGreen", open: true },
    bottom: { image: "doorGreen", open: true },
  }

  changeDoor = ({ event }) => {
    this.setState({
      name: event.target.name,
    })
  }

  async componentWillMount() {
    const {
      scene: { doors },
      isStartScene,
      isEndScene,
    } = this.props

    this.setState({ isStartScene, isEndScene })

    if (doors) {
      this.setState({ doors })
    }
  }

  componentWillReceiveProps(newProps) {
    const {
      scene: { doors },
      isStartScene,
      isEndScene,
    } = newProps

    this.setState({ isStartScene, isEndScene })

    if (doors) {
      this.setState({ doors })
    }
  }

  state = {
    doors: this.defaultDoorIsOpen,
  }

  createDoorPickerOptions = () => {
    const doors = ["doorYellow", "door", "doorGreen"]
    const renderedMenuItems = doors.map((door, index) => {
      const doorImage = Images.doors[door]
      return (
        <MenuItem key={index} value={door}>
          <div className={css.doorPickerItem}>
            <img src={doorImage} alt={"imagex"} />
          </div>
          {/* {door && door.toUpperCase()} */}
        </MenuItem>
      )
    })

    return renderedMenuItems
  }

  renderButton = ({ className }) => {
    const defaultDoorName = "door"

    return (
      <div className={`${className} ${css.doorPickerContainer}`}>
        <FormControl variant="outlined">
          <Select
            className={css.doorPickerDropdown}
            value={defaultDoorName}
            onChange={(event) => {
              this.changeDoor({ event })
            }}
            input={<OutlinedInput id="outlined-age-simple" />}
          >
            {this.createDoorPickerOptions()}
          </Select>
        </FormControl>
      </div>
    )
  }

  renderCreatures = ({ isActive }) => {
    if (!isActive) {
      return null
    }
    const activeFrame = localStateStore.getFirstFrame() || {}
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

  renderBlankScene = ({ id }) => {
    return <div key={id} className={`${css.main} ${css.isBlank} `}></div>
  }

  render() {
    const { scene, isActive, className, id } = this.props
    const {
      coordinates,
      sceneConfig: { subQuestId = 0 } = {},
      isStartScene,
      onClick,
    } = scene
    const isVisitedScene = localStateStore.isVisitedScene(scene.id)
    const locationName = scene.location.name

    const showNothing = QuestStatusUtils.isSceneHidden({ sceneId: scene.id })
    if (showNothing) {
    }
    const isBlank = locationName === "blank" || showNothing
    if (isBlank) {
      return this.renderBlankScene({ id })
    }

    const isClouded = QuestStatusUtils.isSceneClouded({ sceneId: scene.id })

    const localClass = isActive ? css.activeClass : ""
    const cloudImage = Images.backgrounds["cloud"]
    const lockImage = Images.items["lock02"]

    const showLocationOnly = locationName === "roadLeftRight01"

    const neighbors = Utils.getNeighbors({ coordinates })
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

    const showLock = QuestStatusUtils.isSceneLocked({ sceneId: scene.id })
    // apply position based clouded state
    // If cloud is still hidden, apply config based state
    const hideCloud = isVisitedScene || neighborIsActive || !isClouded
    const showCloud = !hideCloud

    const locationImage = Images.all[locationName]
    const rockImage = Images.backgrounds["rock"]
    const rockImageVertical = Images.backgrounds["rock02Vertical"]
    const defaultDoorImage = Images.backgrounds["door"]
    const showBottomPath = neighbors[Constants.neighborPositionsEnum.bottom]
    const showRightPath = neighbors[Constants.neighborPositionsEnum.right]

    const world = localStateStore.getActiveWorld()

    const backgroundColor = QuestStatusUtils.getSubQuestColor({
      world: world,
      sceneId: scene.id,
    })

    const sceneTrggerConfig = QuestStatusUtils.getSceneTriggerConfigFromScene({
      sceneId: scene.id,
    })

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

          {/* Right door */}
          {false &&
            this.renderButton({
              position: "right",
              className: css.rightDoor,
              defaultDoorImage: defaultDoorImage,
            })}
          {false &&
            this.renderButton({
              position: "bottom",
              className: css.bottomDoor,
              defaultDoorImage: defaultDoorImage,
            })}
          <div className={css.imagesBox}>
            <img
              className={css.miniLocationImage}
              alt={"imagex"}
              src={locationImage}
            />
          </div>

          <div className={css.characters}>
            {this.renderCreatures({ isActive })}
          </div>

          <span className={css.locationTitle}>{locationName}</span>
        </div>
      </div>
    )
  }
}

export default MiniLocation
