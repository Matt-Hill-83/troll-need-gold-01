import React from "react"

import { Button, ButtonGroup } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"

import css from "./ExportToLua.module.scss"
import useUpdateProfileWidget from "../../../oldProject/components/TopLevel/useUpdateProfileWidget"

let isGod = false

export const convertAllQuestsToLua = (props) => {
  const { worlds, maxItems = 10 } = props
  let luaStrings = "{"
  let numWorldsConverted = 0

  // TODO: Do export based on Books
  // TODO: Pick a few stories and get them to work end to end
  // TODO: restrict camera angle so it's easier to read

  worlds.slice(0, maxItems).map((world, index) => {
    console.log("world.location.name", world.title) // zzz
    const newString = convertToLua({ config: world.newGrid5 })

    if (newString) {
      luaStrings += `${newString}, `
      numWorldsConverted++
    }
  })
  luaStrings += `}`

  console.log("numWorldsConverted", numWorldsConverted) // zzz
  console.log("luaStrings:-----------") // zzz
  console.log(luaStrings) // zzz
}

const convertToLua = ({ config }) => {
  const output = []
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

  scenes2.map((item) => {
    const name = item?.location?.name || "no loc"
    const frames = item?.frameSet?.frames || []

    const newFrames = frames.map((frame) => {
      const { dialog, critters1, critters2 } = frame

      const newDialogs = dialog.map((dialog) => {
        return { char: dialog.character, text: dialog.text.trim() }
      })

      const newDialogs2 = newDialogs.filter((dialog) => {
        return dialog.character !== "empty"
      })

      const newCharacters01 = critters1.map((item) => {
        return { name: item.name }
      })

      const newCharacters02 = critters2.map((item) => {
        return { name: item.name }
      })

      return {
        dialogs: newDialogs2,
        characters01: newCharacters01,
        characters02: newCharacters02,
      }
    })
    const newScene = { name: name, frames: newFrames }

    output.push(newScene)
  })

  let testString = JSON.stringify(output)
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
