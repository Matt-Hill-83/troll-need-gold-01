import { Dialog, DialogTitle, DialogContent, Input } from "@material-ui/core"
import { IconNames } from "@blueprintjs/icons"
import { Popover, ButtonGroup, Button } from "@blueprintjs/core"
import React, { useState, useEffect } from "react"

import CrudMachine from "../../../QuestBuilder/components/CrudMachine/CrudMachine"
import MyJsonEditor from "../MyJsonEditor/MyJsonEditor"
import images from "../../../Common/Images/images"
import QuestVisibilityUtils from "../../Utils/QuestVisibilityUtils"
import worldBuilderStore from "../../../QuestBuilder/Stores/WorldBuilderStore"
import ImageDisplay from "../../../Common/Components/ImageDisplay/ImageDisplay"
import Utils from "../../../Common/Utils/Utils"

import css from "./SceneBuilder.module.scss"

export default function SceneBuilder(props) {
  const [showJsonEditor, setShowJsonEditor] = useState(false)
  const [row, setRow] = useState(999)
  const [col, setCol] = useState(999)

  useEffect(() => {
    // returned function will be called on component unmount
    return () => {}
  }, [])

  // on change in props
  useEffect(() => {
    setRow(props?.scene?.coordinates?.row)
    setCol(props?.scene?.coordinates?.col)
  }, [props.scene.coordinates])

  const getAllCritters1InScene = ({ scene }) => {
    const frames = scene?.frameSet?.frames || []
    const allCritters = {}

    frames.forEach((frame) => {
      const { critters1 = [] } = frame

      critters1.forEach((item) => {
        if (item.name) {
          allCritters[item.name] = item
        }
      })
    })

    return Object.values(allCritters)
  }

  const editFrameSet = ({ sceneToEdit }) => {
    props.editFrameSet && props.editFrameSet({ sceneToEdit })
  }

  const getAllCritters2InScene = ({ scene }) => {
    const frames = scene?.frameSet?.frames || []
    const allCritters = {}

    frames.forEach((frame) => {
      const { critters2 = [] } = frame

      critters2.forEach((item) => {
        if (item.name) {
          allCritters[item.name] = item
        }
      })
    })

    return Object.values(allCritters)
  }

  const generateRandomUnusedLocation = ({ location, locationNames }) => {
    const world = worldBuilderStore.getWorldBuilderWorld()
    const { newGrid5 } = world
    const usedNames = newGrid5.map((scene) => scene.location.name)

    const filteredLocationNames = locationNames.filter((name) => {
      return !usedNames.includes(name) || name !== "blank"
    })

    const randomName =
      filteredLocationNames[
        Math.floor(Math.random() * filteredLocationNames.length)
      ]

    if (randomName) {
      location.name = randomName
    } else {
      location.name = locationNames[0]
    }
    props.saveItems()
  }

  const itemRenderer = ({ item, className, props = {} }) => {
    if (!item.name || item.name === "empty") {
      return null
    }
    return (
      <ImageDisplay
        key={item.id}
        className={className}
        item={item}
        {...props}
      />
    )
  }

  const renderRandomLocationGenerator = ({ scene }) => {
    const locationNames = Object.keys(images.locations)

    return (
      <div
        className={`${css.crudMachine} ${css.locationMachine}`}
        onClick={() =>
          generateRandomUnusedLocation({
            location: scene.location,
            locationNames,
          })
        }
      />
    )
  }

  const renderCritters = ({ className, items }) => {
    const renderedItems = items.map((item) => {
      return itemRenderer({
        item,
        className,
      })
    })
    return <div className={css.critters1}>{renderedItems}</div>
  }

  const deleteScene = ({ scene }) => {
    scene.location.name = "blank"
    props.saveItems()
  }

  const moveScene = ({ scene }) => {
    console.log("scene.coordinates", scene.coordinates) // zzz
    scene.coordinates = { row, col }
    console.log("scene.coordinates", scene.coordinates) // zzz
    props.saveItems()
  }

  const duplicateScene = ({ scene }) => {
    const duplicateScene = JSON.parse(JSON.stringify(scene))
    duplicateScene.coordinates = { row: 0, col: 0 }
    duplicateScene.id = Utils.generateUuid()

    const scenesGrid = worldBuilderStore.getWorldBuilderScenesGrid()
    scenesGrid[0][0] = duplicateScene

    props.saveItems()
  }

  const onSaveJson = ({ scene }) => {
    Object.assign(props.scene, scene)
    props.saveItems()
    setShowJsonEditor(false)
  }

  const renderCell = () => {
    const { world, saveItems, scene } = props
    const buttons = { add: false, trash: false, edit: true }

    const locations = [scene.location]

    const backgroundColor = QuestVisibilityUtils.getSubQuestColor({
      world,
      sceneId: scene.id,
    })

    const allCritters1 = getAllCritters1InScene({ scene })
    const allCritters2 = getAllCritters2InScene({ scene })

    const locationCrudMachine = (
      <CrudMachine
        className={`${css.crudMachine} ${css.locationMachine}`}
        items={locations}
        buttons={buttons}
        itemRenderer={({ item, className }) =>
          itemRenderer({ item, className, props: { showLabel: true } })
        }
        saveItems={saveItems}
      />
    )

    const locationPicker =
      scene.location.name === "blank"
        ? renderRandomLocationGenerator({ scene })
        : locationCrudMachine

    const hideScene = scene.location && scene.location.name === "blank"

    const handleClose = async () => {}

    const handleColChange = async ({ event }) => {
      console.log("event.target.value", event.target.value) // zzz
      setCol(parseInt(event.target.value || 0))
    }

    const handleRowChange = async ({ event }) => {
      console.log("event.target.value", event.target.value) // zzz
      setRow(parseInt(event.target.value || 0))
    }

    return (
      <div className={css.gridCell} style={backgroundColor}>
        {!hideScene && (
          <Popover className={css.scenePropsButton}>
            <Button icon={IconNames.SETTINGS} />
            <ButtonGroup>
              <Button
                icon={IconNames.EDIT}
                onClick={() => editFrameSet({ sceneToEdit: scene })}
              ></Button>
              <Button onClick={() => setShowJsonEditor(!showJsonEditor)}>
                JSON
              </Button>
              <Button onClick={() => duplicateScene({ scene })}>Dup</Button>
              <Button onClick={() => deleteScene({ scene })}>Del</Button>
              <Popover>
                <Button>MV</Button>
                <div>
                  row:
                  <input
                    value={row}
                    onChange={(event) => handleRowChange({ event, scene })}
                    type="number"
                  />
                  col:
                  <input
                    value={col}
                    onChange={(event) => handleColChange({ event, scene })}
                    type="number"
                  />
                  <Button
                    label={"submit"}
                    onClick={() => moveScene({ scene })}
                    type="button"
                  >
                    submit
                  </Button>
                </div>
              </Popover>
            </ButtonGroup>
          </Popover>
        )}
        <div className={css.column1}>{locationPicker}</div>
        {showJsonEditor && (
          <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={true}
          >
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              Edit Scene JSON
            </DialogTitle>
            <DialogContent dividers>
              <MyJsonEditor world={world} json={scene} onSave={onSaveJson} />
            </DialogContent>
          </Dialog>
        )}
        {!hideScene && (
          <div className={css.crittersContainer}>
            {renderCritters({
              className: css.critterImage,
              items: allCritters1,
            })}
            {renderCritters({
              className: css.critterImage,
              items: allCritters2,
            })}
          </div>
        )}
      </div>
    )
  }

  return <div className={css.main}>{renderCell({ scene: props.scene })}</div>
}
