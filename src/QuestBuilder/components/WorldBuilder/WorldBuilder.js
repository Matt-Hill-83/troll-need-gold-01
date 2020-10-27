import React, { Component } from "react"
import cx from "classnames"
import { Link } from "react-router-dom"
import { IconNames } from "@blueprintjs/icons"
import cuid from "cuid"
import _get from "lodash.get"

import {
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
  Popover,
  Position,
  InputGroup,
} from "@blueprintjs/core"

import FrameBuilder from "../FrameBuilder/FrameBuilder"
import SubQuestWizard from "../SubQuestWizard/SubQuestWizard"
import Utils from "../../../Common/Utils/Utils"
import WorldBuilderScenesGrid from "../WorldBuilderScenesGrid/WorldBuilderScenesGrid"
import worldBuilderStore from "../../Stores/WorldBuilderStore"
import WorldBuilderUtils from "../../Utils/WorldBuilderUtils"
import DialogBuilders from "../DialogBuilders/DialogBuilders"

import css from "./WorldBuilder.module.scss"

class WorldBuilder extends Component {
  state = {
    sceneToEdit: null,
    showFrameBuilder: false,
    showSubQuestWizard: false,
    showDialogBuilder: true,
    world: null,
  }

  maps = []
  // Changing this to DidMount breaks things
  componentWillMount() {
    this.init()
  }

  componentWillReceiveProps() {
    this.init()
  }

  init() {
    const { quest = null, maps, defaultWorldId } = this.props
    let id = null

    this.maps = maps || []
    if (quest) {
      id = quest.id
    } else {
      const defaultWorld = this.maps.find((item) => item.id === defaultWorldId)
      id = defaultWorld ? defaultWorldId : this.maps[0]?.id || ""
    }
    this.onChangeWorld({ mapId: id })
  }

  hideAllModals = () => {
    this.setState({
      showFrameBuilder: false,
      showSubQuestWizard: false,
      showDialogBuilder: false,
    })
  }

  setData = ({ world }) => {
    const { gridDimensions, newGrid5 } = world

    const reCreatedScenesGrid = Utils.reCreateGridFromCondensedGrid({
      gridDimensions,
      newGrid5,
    })

    worldBuilderStore.setWorldBuilderWorld(world)
    worldBuilderStore.setWorldBuilderScenesGrid(reCreatedScenesGrid)
  }

  onChangeWorld = async ({ mapId, newWorld }) => {
    // new map
    let world = null

    if (newWorld) {
      await this.addNewWorld()
    }

    if (this.props.quest) {
      world = this.props.quest
      this.setData({ world })
    } else {
      const world = this.maps.find((item) => item.id === mapId)
      if (!world) {
        return <div>world not found</div>
      }

      this.setData({ world })
    }

    world = worldBuilderStore.getWorldBuilderWorld()
    this.setState({ update: new Date() })
  }

  changeTerminalScene = ({ name, scenesList, scene, map, isStartScene }) => {
    scenesList.forEach((scene) => {
      if (isStartScene) {
        scene.isStartScene = false
      } else {
        scene.isEndScene = false
      }
    })

    if (isStartScene) {
      scene.isStartScene = true
      map.startSceneId = scene.id
      map.startScene = name
    } else {
      scene.isEndScene = true
      map.endSceneId = scene.id
      map.endScene = name
    }

    this.updateWorld({ newProps: { ...map }, mapToUpdate: map })
  }

  // turn this into a component
  renderTerminalScenePicker = ({ isStartScene }) => {
    const map = worldBuilderStore.getWorldBuilderWorld()

    if (!map) {
      return null
    }

    const { startScene, endScene, newGrid5 } = map

    const buttonText = isStartScene
      ? `${startScene || "Start Scene"}`
      : `${endScene || "End Scene"}`

    const renderedSceneNames = newGrid5.map((scene, index) => {
      const { name } = scene.location

      const text = (
        <div className={css.mapPickerRow}>
          <span
            className={css.mapPickerRowTitle}
            onClick={() =>
              this.changeTerminalScene({
                name,
                scenesList: newGrid5,
                scene,
                map,
                isStartScene,
              })
            }
          >
            {name}
          </span>
        </div>
      )
      return <MenuItem key={index} text={text} />
    })

    const renderedMapList = <Menu>{renderedSceneNames}</Menu>

    const scenePicker = (
      <Popover
        className={css.worldPickerDropdown}
        portalClassName={css.worldPickerDropdownPopover}
        content={renderedMapList}
        position={Position.BOTTOM}
      >
        <Button icon="share" text={buttonText} />
      </Popover>
    )

    return scenePicker
  }

  editFrameSet = ({ sceneToEdit }) => {
    this.setState({ sceneToEdit, showFrameBuilder: true })
  }

  onExitFrameBuilder = () => {
    this.setState({ sceneToEdit: "", showFrameBuilder: false })
  }

  getNewWorldProps = () => {
    return {
      createdAt: Date.now(),
      createdBy: this.props?.profile?.id || "none",
    }
  }

  addNewWorld = async () => {
    const worldProps = this.getNewWorldProps()
    const questId = await WorldBuilderUtils.addNewWorld({ worldProps })
    this.props.history.push(`/quest-builder/${questId}`)
  }

  onChangeTitle = async ({ event }) => {
    const world = worldBuilderStore.getWorldBuilderWorld()
    world.title = event.target.value
    worldBuilderStore.setWorldBuilderWorld(world)
    this.setState({ world })
  }

  saveTitle = async ({ event }) => {
    const title = event.target.value
    await this.updateWorld({ title })
  }

  updateWorld = async (props) => {
    await WorldBuilderUtils.updateMap(props)
    this.forceUpdate2()
  }

  forceUpdate2 = async () => {
    this.setState({ update: Date.now() })
  }

  saveItems = async () => {
    const world = worldBuilderStore.getWorldBuilderWorld() || {}
    this.updateWorld({ mapToUpdate: world })
  }

  saveItemsDialogBuilder = async () => {
    const world = worldBuilderStore.getWorldBuilderWorld() || {}
    await this.updateWorld({ mapToUpdate: world })
  }

  onSaveQuestConfig = async ({ questConfig }) => {
    const world = worldBuilderStore.getWorldBuilderWorld() || {}
    await this.updateWorld({
      newProps: { questConfig },
      mapToUpdate: world,
    })
  }

  renderSubQuestWizard = ({ questConfig, newGrid5 }) => {
    const { showSubQuestWizard } = this.state
    if (!showSubQuestWizard) {
      return null
    }
    const world = worldBuilderStore.getWorldBuilderWorld() || {}
    const subQuestWizardProps = {
      questConfig: questConfig,
      scenes: newGrid5,
      onSave: this.onSaveQuestConfig,
      worldId: world.id,
    }

    return (
      <div className={css.subQuestConfigTool}>
        <SubQuestWizard props={subQuestWizardProps} />
      </div>
    )
  }

  openDialogBuilder = () => {
    this.hideAllModals()
    this.setState({ showDialogBuilder: !this.state.showDialogBuilder })
  }

  toggleSubQuestPicker = () => {
    this.hideAllModals()
    this.setState({
      showSubQuestWizard: !this.state.showSubQuestWizard,
    })
  }

  renderMainButtonGroup = () => {
    const world = worldBuilderStore.getWorldBuilderWorld() || {}
    const dialogBuilderButton = (
      <Button onClick={() => this.openDialogBuilder({ world })}>
        Dialog Wizard
      </Button>
    )

    const subQuestWizardButton = (
      <Button text="SubQuest Wizard" onClick={this.toggleSubQuestPicker} />
    )

    const viewButton = (
      <Button>
        <Link
          className={cx(css.tableCell, css.questName)}
          to={`/quests/${world.id}`}
        >
          View
        </Link>
      </Button>
    )

    return (
      <>
        {dialogBuilderButton}
        {subQuestWizardButton}
        {viewButton}
      </>
    )
  }

  dupQuest = async () => {
    const world = worldBuilderStore.getWorldBuilderWorld()

    const dupWorld = JSON.parse(JSON.stringify(world))
    dupWorld.id = "none"
    dupWorld.title = world.title + " --- copy"
    worldBuilderStore.setWorldBuilderWorld(dupWorld)

    dupWorld.newGrid5.forEach((scene) => {
      WorldBuilderUtils.addIdToAllItemsInScene({ scene, overWrite: true })
      const frames = _get(scene, "frameSet.frames") || []
      frames.map((frame) => {
        frame.id = cuid()
      })
    })

    await WorldBuilderUtils.addWorld({ world: dupWorld })
    this.forceUpdate2()
  }

  renderHeaders = ({ world }) => {
    console.log("world.id", world.id)

    return (
      <div className={css.subTitle}>
        <Popover>
          <Button icon={IconNames.SETTINGS} />
          <ButtonGroup>
            <Button icon={IconNames.DUPLICATE} onClick={this.dupQuest}></Button>
            <Button
              icon={IconNames.ADD}
              onClick={() => this.onChangeWorld({ newWorld: true })}
            />
          </ButtonGroup>
        </Popover>
        {this.renderMainButtonGroup()}
      </div>
    )
  }

  renderScenesGrid = ({ world }) => {
    const worldBuilderScenesGridProps = {
      editFrameSet: this.editFrameSet,
      saveItems: this.saveItems,
      world,
    }

    return (
      <div className={css.left}>
        <WorldBuilderScenesGrid {...worldBuilderScenesGridProps} />
      </div>
    )
  }

  render() {
    const {
      sceneToEdit,
      showSubQuestWizard,
      showFrameBuilder,
      showDialogBuilder,
    } = this.state

    const world = worldBuilderStore.getWorldBuilderWorld() || {}

    let questConfig
    let newGrid5
    let title = "no title"

    if (world) {
      questConfig = world.questConfig || {}
      newGrid5 = world.newGrid5 || []

      // Record title for when map is copied
      this.previousTitle = (world && world.title) || this.previousTitle

      title = (world && world.title) || this.previousTitle + " copy"
    }

    return (
      <div className={css.main}>
        <div className={css.titleRow}>
          <InputGroup
            value={title}
            id="text-input"
            placeholder="Title"
            onChange={(event) => this.onChangeTitle({ event })}
            onBlur={(event) => this.saveTitle({ event })}
            className={css.titleInput}
          />

          <div className={css.terminalScenePickers}>
            start:
            {this.renderTerminalScenePicker({ isStartScene: true })}
            end:
            {this.renderTerminalScenePicker({ isStartScene: false })}
          </div>
        </div>

        {!showFrameBuilder && this.renderHeaders({ title, world })}
        {!showFrameBuilder && (
          <div className={css.content}>
            {showSubQuestWizard && (
              <div className={css.right}>
                {this.renderSubQuestWizard({ questConfig, newGrid5 })}
              </div>
            )}
            {showDialogBuilder && (
              <div className={css.right}>
                <DialogBuilders
                  saveItemsDialogBuilder={this.saveItemsDialogBuilder}
                  world={world}
                />
              </div>
            )}
            {this.renderScenesGrid({ world })}
          </div>
        )}
        {showFrameBuilder && (
          <div className={css.content2}>
            <FrameBuilder
              world={world}
              scene={sceneToEdit}
              onExitFrameBuilder={this.onExitFrameBuilder}
              updateMap={() => this.updateWorld({})}
            />
          </div>
        )}
      </div>
    )
  }
}
export default WorldBuilder
