import React from "react"
import _get from "lodash.get"
import { Toaster, Position, ButtonGroup, Button } from "@blueprintjs/core"

import { Link } from "react-router-dom"
import { maps } from "../../Stores/InitStores.js"
import BookPicker from "../BookPicker/BookPicker.js"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"
import QuestStatusUtils from "../../Utils/QuestStatusUtils.js"
import StoryMode from "../StoryMode/StoryMode"
import Utils from "../../Utils/Utils"

import css from "./TopLevel.module.scss"

let useDefaultWorldId
// useDefaultWorldId = true
useDefaultWorldId = false

const toaster = Toaster.create({
  position: Position.TOP,
  className: css.toasterContainer,
  canEscapeKeyClear: true,
})

class TopLevel extends React.Component {
  isProdRelease = localStateStore.getIsProdRelease()

  state = {
    activeScene: undefined,
    showQuestPicker: this.isProdRelease,
  }

  async componentWillMount() {
    console.log("this.props", this.props) // zzz
    maps.length = 0
    maps.push(...this.props.quests)
    console.log("maps", maps) // zzz

    // TODO - start cleanup here
    // TODO - start cleanup here
    // TODO - start cleanup here
    // TODO - start cleanup here
    // TODO - start cleanup here

    const defaultWorldId = "GhVDXZV8prb1XmwQVZjx"
    // const defaultWorldId = localStateStore.getDefaultWorldId()

    if (maps[0]) {
      const defaultMap = maps[0]
      const mapId = _get(defaultMap, "id")

      if (useDefaultWorldId) {
        localStateStore.setActiveMapId(defaultWorldId)
      } else {
        localStateStore.setActiveMapId(mapId)
      }
    }

    localStateStore.setShowBookPicker(true)

    this.init()
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    const worldId = _get(newProps, "match.params.worldId")

    this.setState({ showQuestPicker: false })

    if (worldId) {
      localStateStore.setActiveMapId(worldId)
      this.init()
    }
  }

  init = () => {
    const mapId = localStateStore.getActiveWorldId()
    this.onChangeWorld({ mapId })
  }

  forceUpdate = () => {
    this.setState({ test: Math.random() })
    console.log("forceUpdate---------------------->>>") // zzz
  }

  getTerminalScene = ({ start = true }) => {
    const map = localStateStore.getActiveWorld()
    const scenesGrid = _get(map, "newGrid5") || []
    const endScene = scenesGrid.find((item) => item.id === map.endSceneId)
    const startScene = scenesGrid.find((item) => item.id === map.startSceneId)
    const terminalScene = start ? startScene : endScene
    const firstScene = scenesGrid[0]
    const lastScene = scenesGrid[scenesGrid.length - 1]
    // If no start and finish scenes are marked, choose some, so the program doesn't break
    return terminalScene || (start ? firstScene : lastScene)
  }

  initWorld = async () => {
    const startScene = this.getTerminalScene({})
    if (!startScene) return

    localStateStore.setVisitedScenes([])
    this.updateActiveScene({ sceneId: startScene.id })
  }

  updateActiveScene = ({ sceneId }) => {
    localStateStore.setActiveSceneId(sceneId)

    localStateStore.setActiveFrameIndex(0)
    localStateStore.addVisitedScenes(sceneId)

    const questStatus = localStateStore.getQuestStatus()
    const { hideMissionConsole } = questStatus

    if (!hideMissionConsole) {
      this.updateQuestStatus({ sceneId })
    }

    // this.setState({ test: Math.random() })
  }

  updateQuestStatus = () => {
    toaster.clear()
    const activeScene = localStateStore.getActiveScene()
    const { location } = activeScene

    const activeFrame = localStateStore.getFirstFrame() || {}
    const { critters1 = [], critters2 = [] } = activeFrame

    const { foundItem, completedMission } = localStateStore.updateQuestState({
      itemsInScene: [location, ...critters1, ...critters2],
      charactersInScene: [location, ...critters1, ...critters2],
    })

    if (foundItem) {
      const message = (
        <div>
          <span>{`You find a ${foundItem.name}.`}</span>
          <br />
          <span>{`You put the ${foundItem.name} in your pocket.`}</span>
        </div>
      )
      toaster.show({
        message,
        className: css.toaster,
        timeout: 30000,
        canEscapeKeyClear: true,
      })
    }

    // TODO: this should probably happen on the last frame.
    if (completedMission) {
      const { rewards, item, recipient, name } = completedMission

      const reward = rewards[0]
      const message = `You give the  ${item.name} to the ${recipient.name}.`

      const message2 = (
        <div>
          <br />
          <span>{`Mission Complete: "${name}".`}</span>
          <br />
          <span>{`You win: ${reward.amount}  ${reward.name}.`}</span>
        </div>
      )
      toaster.show({
        message: message2,
        className: css.toaster,
        timeout: 30000,
      })
      toaster.show({ message, className: css.toaster, timeout: 30000 })
      // QuestStatusUtils.updateSceneVisibilityProps()
    }
    QuestStatusUtils.updateSceneVisibilityProps()

    this.setState({ dummy: new Date() })
  }

  onChangeWorld = ({ mapId }) => {
    console.log("")
    console.log("")
    console.log("-------------------------------------")
    console.log(
      "-----------------------mapId---------------------------",
      mapId
    )
    toaster.clear()

    localStateStore.setActiveMapId(mapId)
    const map = localStateStore.getActiveWorld()
    if (!map || !map) {
      return
    }
    const { questConfig } = map
    if (questConfig) {
      const missions = QuestStatusUtils.getActiveSubQuestMissions({
        world: map,
      })
      const desiredItems =
        (missions && missions.map((mission) => mission.item)) || []

      const desiredItemsFiltered = desiredItems.filter((item) => !!item)
      const clonedQuestConfig = JSON.parse(JSON.stringify(questConfig))

      const combinedPockets = localStateStore.addToPockets({
        newPockets: clonedQuestConfig.pockets,
      })
      const defaultQuestStatus = localStateStore.getDefaultQuestStatus()

      const newProps = {
        activeMissionIndex: 0,
        pockets: combinedPockets,
        questConfig: clonedQuestConfig,
        desiredItems: desiredItemsFiltered,
      }
      const newQuestStatus = { ...defaultQuestStatus, ...newProps }

      localStateStore.setQuestStatus(newQuestStatus)
    } else {
      localStateStore.setQuestStatus({
        activeMissionIndex: 0,
        hideMissionConsole: true,
      })
    }
    // uncomment this after building feature
    localStateStore.setShowBookPicker(false)

    this.setState({ showQuestPicker: false })
    this.initWorld()
  }

  toggleBookPicker = () => {
    this.setState({ showQuestPicker: false })
    const show = localStateStore.getShowBookPicker()
    localStateStore.setShowBookPicker(!show)
  }

  closeBookPicker = () => {
    localStateStore.setShowBookPicker(false)
  }

  renderBookPicker = () => {
    return (
      <BookPicker
        closeQuestPicker={this.closeBookPicker}
        onChangeWorld={this.onChangeWorld}
        forceUpdate={this.forceUpdate}
      />
    )
  }

  renderButtons = () => {
    const isProdRelease = localStateStore.getIsProdRelease()

    const path = "/quests"
    return (
      <div className={css.floatingButtons}>
        <ButtonGroup color="primary">
          <Button xxxonClick={this.toggleQuestPicker}>
            <Link to={path}>Back to Quest Picker</Link>
          </Button>
          {!isProdRelease && (
            <Button onClick={this.toggleBookPicker}>
              Pick a Book of Quests...
            </Button>
          )}
        </ButtonGroup>
      </div>
    )
  }

  render() {
    console.log("")
    console.log("main story render")
    console.log("this.props.quests", this.props.quests) // zzz

    const { className } = this.props
    const activeWorld = localStateStore.getActiveWorld()

    if (!activeWorld || !activeWorld.title) {
      return null
    }
    console.log("activeWorld", activeWorld) // zzz

    const activeScene = localStateStore.getActiveScene()
    console.log("activeScene", activeScene) // zzz

    if (!activeScene) {
      return null
    }

    const showBookPicker = localStateStore.getShowBookPicker()
    const isProdRelease = localStateStore.getIsProdRelease()

    return (
      <div className={`${css.main} ${className}`}>
        {this.renderButtons()}
        <StoryMode
          updateActiveScene={this.updateActiveScene}
          activeScene={activeScene}
          forceUpdate={this.forceUpdate}
          openQuestPicker={this.openQuestPicker}
        />
        {/* {!isProdRelease && showBookPicker && this.renderBookPicker()} */}
      </div>
    )
  }
}

export default TopLevel
