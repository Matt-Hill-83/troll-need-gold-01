import React, { Component } from "react"
import cx from "classnames"
import { IconNames } from "@blueprintjs/icons"

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

import Constants from "../../../Common/Constants/Constants"
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
    expandedDialogAccordions: {},
  }

  maps = []
  // Changing this to DidMount breaks things
  async componentWillMount() {
    this.maps = this.props.maps || []
    const defaultWorldId = Constants.defaultWorldIdNonProdWB
    const defaultWorld = this.maps.find((item) => item.id === defaultWorldId)

    const id = defaultWorld ? defaultWorldId : this.maps[0]?.id || ""
    this.onChangeWorld({ mapId: id })
  }

  hideAllModals = () => {
    this.setState({
      showFrameBuilder: false,
      showSubQuestWizard: false,
      showDialogBuilder: false,
    })
  }

  onChangeWorld = ({ mapId, newWorld }) => {
    // new map
    if (newWorld) {
      this.addNewWorld()
      return
    } else {
      const world = this.maps.find((item) => item.id === mapId)
      if (!world) {
        return <div>world not found</div>
      }

      const { gridDimensions, newGrid5 } = world

      const reCreatedScenesGrid = Utils.reCreateGridFromCondensedGrid({
        gridDimensions,
        newGrid5,
      })

      worldBuilderStore.setWorldBuilderWorld(world)
      worldBuilderStore.setWorldBuilderScenesGrid(reCreatedScenesGrid)
    }
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
    WorldBuilderUtils.addNewWorld()
    this.forceUpdate2()
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
    // this.setState({ dialogBuilderKey: new Date() })
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
      <Button
        // icon="document"
        text="SubQuest Wizard"
        onClick={this.toggleSubQuestPicker}
      />
    )

    return (
      <>
        {dialogBuilderButton}
        {subQuestWizardButton}
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
        <div className={css.terminalScenePickers}>
          start:
          {this.renderTerminalScenePicker({ isStartScene: true })}
          end:
          {this.renderTerminalScenePicker({ isStartScene: false })}
        </div>
        <Button
          text={"+ New Quest"}
          onClick={() => this.onChangeWorld({ newWorld: true })}
        />
        {this.renderMainButtonGroup()}
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
        <WorldBuilderScenesGrid
          {...worldBuilderScenesGridProps}
        ></WorldBuilderScenesGrid>
      </div>
    )
  }

  render() {
    const {
      sceneToEdit,
      showSubQuestWizard,
      showFrameBuilder,
      showDialogBuilder,
      dialogBuilderKey,
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
        <InputGroup
          value={title}
          id="text-input"
          placeholder="Title"
          onChange={(event) => this.onChangeTitle({ event })}
          onBlur={(event) => this.saveTitle({ event })}
          className={css.titleInput}
        />

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
              <DialogBuilders
                saveItemsDialogBuilder={this.saveItemsDialogBuilder}
                world={world}
              />
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
