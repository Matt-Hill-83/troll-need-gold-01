import React, { Component } from "react"
import cx from "classnames"

import { addQuestToFirestore } from "../../../app/firestore/firestoreService.js"

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

import DialogBuilder2 from "../DialogBuilder2/DialogBuilder2"
import FrameBuilder from "../FrameBuilder/FrameBuilder"
import MyAccordion from "../MyAccordion/MyAccordion"
import SubQuestWizard from "../SubQuestWizard/SubQuestWizard"
import Utils from "../../../Common/Utils/Utils"
import WorldBuilderScenesGrid from "../WorldBuilderScenesGrid/WorldBuilderScenesGrid"
import worldBuilderStore from "../../Stores/WorldBuilderStore"
import Constants from "../../../Common/Constants/Constants"
import WorldBuilderUtils from "../../Utils/WorldBuilderUtils"
import WorldPicker from "../WorldPicker/WorldPicker"

import css from "./WorldBuilder.module.scss"

const NUM_ROWS_LOCATIONS_GRID = 8
const NUM_COLS_LOCATIONS_GRID = 20

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
    const defaultWorldId = "1zRS8eoqWLrJc9QeamkT"
    this.onChangeWorld({ mapId: defaultWorldId })
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
    let previousMapName = 100

    const newName = previousMapName + 1

    const { grid, gridDimensions } = this.createNewGrid()

    worldBuilderStore.setWorldBuilderScenesGrid(grid)
    const newWorldProps = {
      name: newName,
      title: "-------" + newName,
      gridDimensions,
    }

    const newWorld = Constants.getNewWorld({ props: newWorldProps })

    const newMapReturned = await addQuestToFirestore(newWorld)
    newWorld.id = newMapReturned.id
    const test = this.maps.find((item) => item.id == newMapReturned.id)
    worldBuilderStore.setWorldBuilderWorld(newWorld)
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
    this.setState({ dialogBuilderKey: new Date() })
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

    const buttons = (
      <ButtonGroup className={cx(Classes.ALIGN_LEFT, css.buttonGroup)}>
        {dialogBuilderButton}
        {subQuestWizardButton}
      </ButtonGroup>
    )

    return (
      <Popover
        // className={css.worldPickerDropdown}
        // portalClassName={css.worldPickerDropdownPopover}
        content={buttons}
        position={Position.BOTTOM}
      >
        <Button icon="share" text={"buttonText"} />
      </Popover>
    )
  }

  renderHeaders = ({ title, world }) => {
    return (
      <div className={css.subTitle}>
        <div className={css.terminalScenePickers}>
          start:
          {this.renderTerminalScenePicker({ isStartScene: true })}
          end:
          {this.renderTerminalScenePicker({ isStartScene: false })}
        </div>
        {`${world.id}`}
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

  renderDialogBuilder = ({ world }) => {
    const { expandedDialogAccordions } = this.state

    const scenes = _get(world, "newGrid5") || []

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
              onExitFrameBuilder={this.onExitFrameBuilder}
              updateMap={WorldBuilderUtils.updateMap}
            />
          </div>
        )}
      </div>
    )
  }
}
export default WorldBuilder
