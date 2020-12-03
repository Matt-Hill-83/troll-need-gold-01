import React from "react"

import { Button, ButtonGroup } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"

import useUpdateProfileWidget from "../../../oldProject/components/TopLevel/useUpdateProfileWidget"
import Utils from "../../Utils/Utils"
import Constants from "../../Constants/Constants"

let isGod = false

export const convertAllQuestsToLua = (props) => {
  const { worlds, maxItems = 10 } = props
  let luaStrings = "{"
  let numWorldsConverted = 0

  worlds.slice(0, maxItems).forEach((world, index) => {
    const newString = convertToLua({ world })

    if (newString) {
      luaStrings += `${newString}, `
      numWorldsConverted++
    }
  })

  luaStrings += `}`

  // Do not delete these console logs
  console.log("luaStrings")
  console.log(luaStrings)
  // Do not delete these console logs
}

const convertToLua = ({ world }) => {
  const scenesGrid = world.newGrid5
  const newScenes = []
  const scenes = scenesGrid.filter((item) => {
    console.log("item", item) // zzz
    return item.location.name !== "blank"
  })

  const startScene = scenes.find((item) => item.isStartScene) || {}
  const endScene = scenes.find((item) => item.isEndScene) || {}
  console.log("startScene-------------------------->>", startScene) // zzz
  // filter out scenes with no dialog
  const scenes2 = scenes.filter((item) => {
    const frames = item?.frameSet?.frames || []

    const sceneHasDialog = frames.some((frame) =>
      frame.dialog.some((dialog) => dialog.text)
    )

    return sceneHasDialog
  })

  let minRow = 10000
  let maxRow = -1
  let minCol = 10000
  let maxCol = -1
  console.log("scenes2", scenes2) // zzz
  scenes2.map((scene) => {
    const name = scene?.location?.name || "no loc"
    console.log("scene", scene) // zzz
    const {
      coordinates,
      coordinates: { row, col },
    } = scene

    minRow = row < minRow ? row : minRow
    maxRow = row > maxRow ? row : maxRow
    minCol = col < minCol ? col : minCol
    maxCol = col > maxCol ? col : maxCol

    const frames = scene?.frameSet?.frames || []

    const isValidValue = ({ value }) => {
      if (!value) return false

      const unwantedNames = ["empty", "blank", ""]
      const test = !unwantedNames.includes(value)
      !test && console.log("-------------------------------value", value) // zzz
      return test
    }

    const newFrames = frames.map((frame) => {
      const { dialog, critters1, critters2 } = frame

      const newDialogs = dialog.filter((dialog) => {
        const isValid = isValidValue({ value: dialog.character })
        return dialog.text.trim() !== "" && isValid
      })

      const newDialogs2 = newDialogs.map((dialog) => {
        const text = dialog.text.trim()
        const char = dialog.character
        return { char, text }
      })

      const newCharacters01 = critters1.map((item) => {
        const name = item.name
        return isValidValue({ value: name }) ? { name } : null
      })

      const newCharacters02 = critters2.map((item) => {
        const name = item.name
        return isValidValue({ value: name }) ? { name } : null
      })

      return {
        dialogs: newDialogs2.filter((item) => !!item),
        characters01: newCharacters01.filter((item) => !!item),
        characters02: newCharacters02.filter((item) => !!item),
      }
    })

    const neighbors = Utils.getNeighbors({ coordinates, grid: scenesGrid })
    const showBottomPath = !!neighbors[Constants.neighborPositionsEnum.bottom]
    const showRightPath = !!neighbors[Constants.neighborPositionsEnum.right]
    const showTopPath = !!neighbors[Constants.neighborPositionsEnum.top]
    const showLeftPath = !!neighbors[Constants.neighborPositionsEnum.left]

    const newScene = {
      name: name,
      frames: newFrames,
      coordinates: coordinates,
      showBottomPath,
      showRightPath,
      showTopPath,
      showLeftPath,
    }

    newScenes.push(newScene)
  })

  // trim top and left row padding and set max rows
  let newMaxRow = 0
  let newMaxCol = 0
  newScenes.forEach((scene) => {
    const {
      coordinates,
      coordinates: { row, col },
    } = scene

    const newRow = row - minRow
    const newCol = col - minCol
    coordinates.row = newRow
    coordinates.col = newCol

    newMaxRow = newRow > newMaxRow ? newRow : newMaxRow
    newMaxCol = newCol > newMaxCol ? newCol : newMaxCol

    scene.maxRow = newMaxRow
    scene.maxCol = newMaxCol
  })

  const newQuest = {
    questTitle: world.title,
    startSceneCoords: startScene.coordinates,
    endSceneCoords: endScene.coordinates,
    sceneConfigs: newScenes,
    gridSize: {
      rows: newMaxRow + 1,
      cols: newMaxCol + 1,
    },
  }

  let testString = JSON.stringify(newQuest)
  let testString02 = testString.replaceAll("[", "{")
  testString02 = testString02.replaceAll("]", "}")
  testString02 = testString02.replaceAll(":", "=")

  // This is weird edge case that the regex messes up.
  testString02 = testString02.replaceAll(',"}', '"}')

  function replacer(match, p1, p2) {
    const output = `${p1}${p2}=`
    return output
  }

  let newString = testString02.replace(/([{ ,])"(.+?)"(=)/g, replacer)
  return newString
}

export function ExportToLua(props) {
  const { worlds } = props
  const { getProfile } = useUpdateProfileWidget()
  const profile = getProfile()
  isGod = profile.id === "AMAgzal2oAbHogUvO9vVeHWZygF3"

  return (
    <ButtonGroup>
      <Button
        disabled={!isGod}
        onClick={() => {
          convertAllQuestsToLua({ worlds })
        }}
        icon={IconNames.NINJA}
      />
    </ButtonGroup>
  )
}
