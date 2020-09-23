import { ButtonGroup, Button } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import cx from "classnames"
import React, { useState, useEffect } from "react"

import css from "./SceneBuilder.module.scss"
import CrudMachine from "../../../QuestBuilder/components/CrudMachine/CrudMachine"
import {
  Icon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core"
import MyJsonEditor from "../MyJsonEditor/MyJsonEditor"
import images from "../../../Common/Images/images"
import QuestVisibilityUtils from "../../Utils/QuestVisibilityUtils"
import worldBuilderStore from "../../../QuestBuilder/Stores/WorldBuilderStore"
import ImageDisplay from "../../../Common/Components/ImageDisplay/ImageDisplay"

export default function SceneBuilder(props) {
  const [showJsonEditor, setShowJsonEditor] = useState(null)

  useEffect(() => {
    console.log("onMount-------------------------------->>>>")

    // returned function will be called on component unmount
    return () => {
      console.log("unmount")
    }
  }, [])

  // on change in props
  useEffect(() => {
    console.log("new props =================================>>>>>")
  }, [props.worlds])

  useEffect(() => {
    console.log("new props =================================>>>>>")
  }, [props.books])

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
      return !usedNames.includes(name)
    })

    const randomName =
      filteredLocationNames[
        Math.floor(Math.random() * filteredLocationNames.length)
      ]

    location.name = randomName
    props.saveItems()
  }

  const itemRenderer = ({ item, className }) => {
    return <ImageDisplay className={className} item={item} />
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

  const renderCell = () => {
    const { world, saveItems, scene } = props
    const buttons = { add: false, trash: false, edit: true }
    const onSave = saveItems
    const locationImageSets = [images.all]
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
        itemRenderer={itemRenderer}
        saveItems={onSave}
        imageSets={locationImageSets}
      />
    )

    const locationPicker =
      scene.location.name === "blank"
        ? renderRandomLocationGenerator({ scene })
        : locationCrudMachine

    const hideScene = scene.location && scene.location.name === "blank"

    const handleClose = () => {}

    return (
      <div className={css.gridCell} style={backgroundColor}>
        {!hideScene && (
          <ButtonGroup>
            <Button
              className={css.scenePropsButton}
              onClick={() => setShowJsonEditor(showJsonEditor)}
            >
              <Icon icon={IconNames.AIRPLANE} />
            </Button>
          </ButtonGroup>
        )}
        <div className={css.column1}>{locationPicker}</div>
        {showJsonEditor && (
          <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={true}
          >
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              Modal title
            </DialogTitle>
            <DialogContent dividers>
              <MyJsonEditor world={world} json={scene} />
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose} color="primary">
                Save changes
              </Button>
            </DialogActions>
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
