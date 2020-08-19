import React, { Component } from "react"
import { observer } from "mobx-react"
import { toJS } from "mobx"
import cx from "classnames"

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

import { maps, gameConfig } from "../../Stores/InitStores"
import { worldNameStore } from "../../Stores/FrameSetStore"
import Constants from "../../Utils/Constants/Constants"
// import DialogBuilder from "../DialogBuilder/DialogBuilder"
import DialogBuilder2 from "../DialogBuilder2/DialogBuilder2"
import ExportJson from "../ExportJson/ExportJson"
import FrameBuilder from "../FrameBuilder/FrameBuilder"
import JsonEditor2 from "../JsonEditor2/JsonEditor2"
import JsonUtils from "../../Utils/JsonUtils"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore"
import SubQuestWizard from "../SubQuestWizard/SubQuestWizard"
import Utils from "../../Utils/Utils"
import WorldBuilderScenesGrid from "../WorldBuilderScenesGrid/WorldBuilderScenesGrid"
import worldBuilderStore from "../../Stores/WorldBuilderStore"
import WorldBuilderUtils from "../../Utils/WorldBuilderUtils"
import WorldPicker from "../WorldPicker/WorldPicker"

import css from "./WorldBuilder.module.scss"
import MyAccordion from "../MyAccordion/MyAccordion"
import FrameSetUploader from "../FrameSetUploader/FrameSetUploader"

const NUM_ROWS_LOCATIONS_GRID = 8
const NUM_COLS_LOCATIONS_GRID = 20

class WorldBuilder extends Component {
  state = {
    sceneToEdit: null,
    showFrameBuilder: false,
    showQuestConfig: false,
    showSceneConfig: false,
    // showSubQuestWizard: true,
    showSubQuestWizard: false,
    showDialogBuilder: true,
    expandedDialogAccordions: {},
    // showDialogBuilder: false,
  }

  // Changing this to DidMount breaks things
  async componentWillMount() {
    await worldNameStore.fetch()
    await gameConfig.fetch()
    const gameConfigData = Utils.getGameConfig()
    const defaultWorldId = localStateStore.getDefaultWorldId()
    this.onChangeWorld({ mapId: defaultWorldId })
  }

  forceUpdate2 = () => {
    this.setState({ test: Math.random() })
  }

  hideAllModals = () => {
    this.setState({
      showFrameBuilder: false,
      showQuestConfig: false,
      showSceneConfig: false,
      showSubQuestWizard: false,
      showDialogBuilder: false,
    })
  }

  onChangeWorld = ({ mapId, newWorld }) => {
    this.setState({ showQuestConfig: false })
    // new map
    if (newWorld) {
      this.addNewWorld()
      return
    } else {
      const world = Utils.getWorldFromId2({ id: mapId })
      if (!world || !world.data) {
        return
      }

      const {
        data: { gridDimensions, newGrid5 },
      } = world

      const reCreatedScenesGrid = Utils.reCreateGridFromCondensedGrid({
        gridDimensions,
        newGrid5,
      })

      worldBuilderStore.setWorldBuilderWorld(world)
      worldBuilderStore.setWorldBuilderScenesGrid(reCreatedScenesGrid)
    }
  }

  getMapById = (mapId) => {
    const savedWorlds = Utils.getItemsFromDbObj({ dbList: maps })

    return savedWorlds.find((map) => {
      return map.id === mapId
    })
  }

  updateIsReleasedProperty = ({ id }) => {
    const map = this.getMapById(id)
    const released = !map.data.released
    map.update({ released })
  }

  updateReleasedToProd = ({ id }) => {
    const map = this.getMapById(id)
    const releasedToProd = !map.data.releasedToProd
    map.update({ releasedToProd })
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
      map.data.startSceneId = scene.id
      map.data.startScene = name
    } else {
      scene.isEndScene = true
      map.data.endSceneId = scene.id
      map.data.endScene = name
    }

    WorldBuilderUtils.updateMap({ newProps: { ...map.data }, mapToUpdate: map })
  }

  // turn this into a component
  renderTerminalScenePicker = ({ isStartScene }) => {
    const map = worldBuilderStore.getWorldBuilderWorld()
    if (!map) return null

    if (!map.data) {
      return null
    }

    const { startScene, endScene, newGrid5 } = map.data

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
    let previousMapName =
      toJS(
        worldNameStore.docs &&
          worldNameStore.docs[0] &&
          worldNameStore.docs[0].data.previousMapName
      ) || 100

    const newName = previousMapName + 1
    if (worldNameStore.docs[0]) {
      await worldNameStore.docs[0].update({
        previousMapName: newName,
        // Transitioning to this new name
        previousWorld: newName,
      })
    }
    const { grid, gridDimensions } = this.createNewGrid()

    worldBuilderStore.setWorldBuilderScenesGrid(grid)
    const newWorldProps = {
      name: newName,
      title: "-------" + newName,
      gridDimensions,
    }

    const newWorld = Constants.getNewWorld({ props: newWorldProps })

    const newMapReturned = await maps.add(newWorld)
    worldBuilderStore.setWorldBuilderWorld(newMapReturned)
  }

  onChangeTitle = async ({ event }) => {
    const world = worldBuilderStore.getWorldBuilderWorld()
    world.data.title = event.target.value
    worldBuilderStore.setWorldBuilderWorld(world)
    this.setState({ world })
  }

  saveTitle = async ({ event }) => {
    const title = event.target.value
    await WorldBuilderUtils.updateMap({ title })
  }

  createNewGrid = () => {
    const rows = Array(NUM_ROWS_LOCATIONS_GRID).fill(0)
    const columns = Array(NUM_COLS_LOCATIONS_GRID).fill(0)

    const gridDimensions = {
      numRows: NUM_ROWS_LOCATIONS_GRID,
      numCols: NUM_COLS_LOCATIONS_GRID,
    }

    const grid = []

    rows.forEach((row, rowIndex) => {
      const gridRow = []
      columns.forEach((col, colIndex) => {
        const id = Utils.generateUuid()

        const coordinates = {
          col: colIndex,
          row: rowIndex,
        }
        const isLastRow = rowIndex === NUM_ROWS_LOCATIONS_GRID - 1
        const isLastCol = colIndex === NUM_COLS_LOCATIONS_GRID - 1

        const props = {
          isLastRow,
          isLastCol,
          coordinates,
          id,
        }

        const blankScene = Utils.getBlankScene({ props })

        gridRow.push(blankScene)
      })
      grid.push(gridRow)
    })
    return { grid, gridDimensions }
  }

  saveItems = async () => {
    const world = worldBuilderStore.getWorldBuilderWorld() || {}
    await WorldBuilderUtils.updateMap({ mapToUpdate: world })
  }

  saveItemsDialogBuilder = async () => {
    const world = worldBuilderStore.getWorldBuilderWorld() || {}
    this.setState({ dialogBuilderKey: new Date() })
    await WorldBuilderUtils.updateMap({ mapToUpdate: world })
  }

  importWorldFromJson = async ({ newWorld }) => {
    await this.addNewWorld()

    // I should probably create a new scenesGrid here, based on the required dimensions
    // I should probably create a new scenesGrid here, based on the required dimensions
    // I should probably create a new scenesGrid here, based on the required dimensions
    const scenesGrid = worldBuilderStore.getWorldBuilderScenesGrid()
    const newProps = JsonUtils.importWorldFromJson({ newWorld, scenesGrid })

    WorldBuilderUtils.updateMap({ newProps })
  }

  onChangeJSON = (json) => {
    // this.setState({ jsonUnderEdit: json })
  }

  onSaveJSON = ({ json }) => {
    const world = worldBuilderStore.getWorldBuilderWorld() || {}
    WorldBuilderUtils.updateMap({
      newProps: { questConfig: json },
      mapToUpdate: world,
    })
  }

  onSaveQuestConfig = async ({ questConfig }) => {
    const world = worldBuilderStore.getWorldBuilderWorld() || {}
    await WorldBuilderUtils.updateMap({
      newProps: { questConfig },
      mapToUpdate: world,
    })
    // this.setState({ update: Math.random() })
  }

  onCloseJsonEditor = () => {
    this.setState({ showQuestConfig: false })
  }

  renderSceneConfig = ({ world }) => {
    const { showSceneConfig } = this.state
    if (!showSceneConfig) {
      return null
    }

    return (
      <div className={css.buttonHolder}>
        world config for download
        <ExportJson
          className={css.frameSetUploaderBox1}
          onSave={this.onChangeDialog}
          world={world.data}
        />
      </div>
    )
  }

  renderQuestConfig = ({ questConfig }) => {
    const { showQuestConfig } = this.state
    if (!showQuestConfig) {
      return null
    }

    const jsonEditorProps = {
      json: questConfig,
      onChangeJSON: this.onChangeJSON,
      onSaveJSON: this.onSaveJSON,
      onClose: this.onCloseJsonEditor,
    }

    return (
      <div className={css.jsonEditor}>
        <JsonEditor2 props={jsonEditorProps} />
      </div>
    )
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

  openDialogBuilder = ({}) => {
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
    const { showQuestConfig, showSceneConfig } = this.state

    const world = worldBuilderStore.getWorldBuilderWorld() || {}
    const dialogBuilderButton = (
      <Button
        className={css.xxxsaveButton}
        onClick={() => this.openDialogBuilder({ world })}
      >
        Dialog Builder
      </Button>
    )

    const subQuestWizardButton = (
      <Button
        icon="document"
        text="SubQuest Wizard"
        onClick={this.toggleSubQuestPicker}
      />
    )

    const questConfigButton = (
      <Button
        icon="document"
        text="quest config"
        onClick={() =>
          this.setState({
            showQuestConfig: !showQuestConfig,
          })
        }
      />
    )
    const getJsonButton = (
      <Button
        icon="document"
        text="get JSON for world"
        onClick={() =>
          this.setState({
            showSceneConfig: !showSceneConfig,
          })
        }
      />
    )
    const uploadJsonButton = (
      <Button
        icon="document"
        text="upload JSON"
        onClick={() =>
          this.setState({
            showSceneConfig: !showSceneConfig,
          })
        }
      />
    )

    return (
      <ButtonGroup className={cx(Classes.ALIGN_LEFT, css.buttonGroup)}>
        {dialogBuilderButton}
        {subQuestWizardButton}
        <Popover
          content={
            <ButtonGroup
              vertical={true}
              className={cx(Classes.ALIGN_LEFT, css.buttonGroup)}
            >
              {questConfigButton}
              {getJsonButton}
              {uploadJsonButton}
              <FrameSetUploader
                onImportJson={this.importWorldFromJson}
              ></FrameSetUploader>
            </ButtonGroup>
          }
          target={
            <Button icon="document" rightIcon="caret-down" text="Config" />
          }
        ></Popover>
      </ButtonGroup>
    )
  }

  renderHeaders = ({ title, world }) => {
    return (
      <div className={css.subTitle}>
        <WorldPicker
          initialValue={title}
          showDelete={true}
          showReleased={true}
          showReleasedToProd={true}
          updateIsReleasedProperty={this.updateIsReleasedProperty}
          updateReleasedToProd={this.updateReleasedToProd}
          onChangeWorld={this.onChangeWorld}
        />
        <div className={css.terminalScenePickers}>
          start:
          {this.renderTerminalScenePicker({ isStartScene: true })}
          end:
          {this.renderTerminalScenePicker({ isStartScene: false })}
        </div>
        {`${world.id}`}
        <Button
          text={"+ New Map"}
          onClick={() => this.onChangeWorld({ newWorld: true })}
        />
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
        <WorldBuilderScenesGrid
          {...worldBuilderScenesGridProps}
        ></WorldBuilderScenesGrid>
      </div>
    )
  }

  renderDialogBuilder = ({ world }) => {
    const { expandedDialogAccordions } = this.state

    const scenes = _get(world, "data.newGrid5") || []

    const dialogBuilders = scenes.map((scene, sceneIndex) => {
      const dialogBuilderProps = {
        saveItems: this.saveItemsDialogBuilder,
        scene,
        world,
        sceneIndex,
      }

      const onChange = ({ expanded }) => {
        const { expandedDialogAccordions } = this.state

        expandedDialogAccordions[sceneIndex] = expanded
        this.setState({ expandedDialogAccordions })
      }

      const subQuestAccordion = {
        title: <div className={css.subQuestHeader}>{scene.location.name}</div>,
        expanded: expandedDialogAccordions[sceneIndex],
        onChange,
        content: () => (
          <DialogBuilder2 props={dialogBuilderProps}></DialogBuilder2>
        ),
        className: css.sceneDialogAccordion,
      }

      return <MyAccordion props={subQuestAccordion} />
    })

    return dialogBuilders
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

    if (world.data) {
      questConfig = world.data.questConfig || {}
      newGrid5 = world.data.newGrid5 || []

      // Record title for when map is copied
      this.previousTitle =
        (world.data && world.data.title) || this.previousTitle

      title = (world.data && world.data.title) || this.previousTitle + " copy"
    }

    return (
      <div className={css.main}>
        {this.renderSceneConfig({ world })}
        {this.renderQuestConfig({ questConfig })}

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
              <div className={css.right}>
                <div
                  key={dialogBuilderKey}
                  className={css.dialogBuildersContainer}
                >
                  {this.renderDialogBuilder({ world })}
                </div>
              </div>
            )}
          </div>
        )}
        {showFrameBuilder && (
          <div className={css.content2}>
            <FrameBuilder
              world={world}
              scene={sceneToEdit}
              onExitFrameBuilder={(frame) => this.onExitFrameBuilder({ frame })}
              updateMap={WorldBuilderUtils.updateMap}
            />
          </div>
        )}
      </div>
    )
  }
}
export default observer(WorldBuilder)
