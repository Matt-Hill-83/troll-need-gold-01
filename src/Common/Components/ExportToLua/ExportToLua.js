import React from "react"

import { Button, ButtonGroup } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"

import useUpdateProfileWidget from "../../../oldProject/components/TopLevel/useUpdateProfileWidget"

let isGod = false

export const convertAllQuestsToLua = (props) => {
  const { worlds, maxItems = 10 } = props
  let luaStrings = "{"
  let numWorldsConverted = 0

  worlds.slice(0, maxItems).map((world, index) => {
    const newString = convertToLua({ config: world.newGrid5 })

    if (newString) {
      luaStrings += `${newString}, `
      numWorldsConverted++
    }
  })
  luaStrings += `}`
  console.log("luaStrings") // zzz
  console.log(luaStrings) // zzz
}

const convertToLua = ({ config }) => {
  const newScenes = []
  const scenes = config.filter((item) => {
    return item.location.name !== "blank"
  })

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

  scenes2.map((scene) => {
    const name = scene?.location?.name || "no loc"
    const {
      coordinates,
      coordinates: { row, col },
    } = scene

    minRow = row < minRow ? row : minRow
    maxRow = row > maxRow ? row : maxRow
    minCol = col < minCol ? col : minCol
    maxCol = col > maxCol ? col : maxCol

    const frames = scene?.frameSet?.frames || []

    const newFrames = frames.map((frame) => {
      const { dialog, critters1, critters2 } = frame

      const newDialogs = dialog.map((dialog) => {
        return { char: dialog.character, text: dialog.text.trim() }
      })

      const newDialogs2 = newDialogs.filter((dialog) => {
        return dialog.character !== "empty"
      })

      const newCharacters01 = critters1.map((critter1) => {
        return { name: critter1.name }
      })

      const newCharacters02 = critters2.map((critter2) => {
        return { name: critter2.name }
      })

      return {
        dialogs: newDialogs2,
        characters01: newCharacters01,
        characters02: newCharacters02,
      }
    })
    const newScene = { name: name, frames: newFrames, coordinates: coordinates }

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
