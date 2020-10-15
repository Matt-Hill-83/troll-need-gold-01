import React, { Component } from "react"
import cx from "classnames"
import { IconNames } from "@blueprintjs/icons"
import { Link } from "react-router-dom"

import {
  Button,
  Menu,
  MenuItem,
  Popover,
  Position,
  InputGroup,
  Classes,
  ButtonGroup,
} from "@blueprintjs/core"

import _get from "lodash.get"

import FrameBuilder from "../FrameBuilder/FrameBuilder"
import SubQuestWizard from "../SubQuestWizard/SubQuestWizard"
import Utils from "../../../Common/Utils/Utils"
import WorldBuilderScenesGrid from "../WorldBuilderScenesGrid/WorldBuilderScenesGrid"
import worldBuilderStore from "../../Stores/WorldBuilderStore"
import WorldBuilderUtils from "../../Utils/WorldBuilderUtils"
import WorldPicker from "../WorldPicker/WorldPicker"
import DialogBuilders from "../DialogBuilders/DialogBuilders"

import css from "./WorldBuilder.module.scss"

class WorldBuilder extends Component {
  state = {
    sceneToEdit: null,
    showFrameBuilder: false,
    showSubQuestWizard: false,
    showDialogBuilder: true,
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
    console.log("this.props", this.props) // zzz
    console.log("quest", this.props.quest) // zzz
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

    console.log("this.props.quest", this.props.quest) // zzz

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
    console.log("world----------------------------", world) // zzz
    this.setDefaultWorldId({ worldId: world.id })
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
    if (!map) return null

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

  addNewWorld = async () => {
    const worldProps = {
      // createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      createdAt: Date.now(),
      createdBy: this.props?.profile?.id || "none",
    }
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

  setDefaultWorldId = ({ worldId }) => {
    // this.props.updateDefaultWorldId({ worldId })
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
      <Link
        className={cx(css.tableCell, css.questName)}
        to={`/quests/${world.id}`}
      >
        View
      </Link>
    )

    return (
      <>
        {/* <Button
          icon={IconNames.SETTINGS}
          text={"set world as default"}
          onClick={() => this.setDefaultWorldId({ worldId: world.id })}
        /> */}
        {dialogBuilderButton}
        {subQuestWizardButton}
        {viewButton}
      </>
    )
    const buttons = (
      <ButtonGroup className={cx(Classes.ALIGN_LEFT, css.buttonGroup)}>
        {dialogBuilderButton}
        {subQuestWizardButton}
      </ButtonGroup>
    )

    return (
      <Popover
        className={css.worldPickerDropdown}
        portalClassName={css.worldPickerDropdownPopover}
        content={buttons}
        position={Position.BOTTOM}
      >
        <Button icon={IconNames.SETTINGS} text={"customize"} />
      </Popover>
    )
  }

  renderHeaders = ({ title, world }) => {
    console.log("world.id", world.id)

    return (
      <div className={css.subTitle}>
        <Button
          text={"+ New Quest"}
          onClick={() => this.onChangeWorld({ newWorld: true })}
        />
        {this.renderMainButtonGroup()}
        {!this.props.quest &
        (
          <WorldPicker
            maps={this.maps}
            initialValue={title}
            showDelete={true}
            showReleased={true}
            showReleasedToProd={true}
            updateIsReleasedProperty={this.updateIsReleasedProperty}
            updateReleasedToProd={this.updateReleasedToProd}
            onChangeWorld={this.onChangeWorld}
          />
        )}
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
            {this.renderScenesGrid({ world })}
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
