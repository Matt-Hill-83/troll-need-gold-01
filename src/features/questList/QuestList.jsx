import _get from "lodash.get"
import React from "react"
import QuestListItem from "./QuestListItem"
import cx from "classnames"

import useUpdateProfileWidget from "../../oldProject/components/TopLevel/useUpdateProfileWidget"
import QuestProgressUtils from "../../oldProject/Utils/QuestProgressUtils"

import css from "./QuestList.module.scss"
import { Button } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"

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

export default function QuestList({ worlds, className }) {
  const { getProfile } = useUpdateProfileWidget()
  const profile = getProfile()
  const completedQuests = _get(profile, "userStatus.completedQuests") || []

  const {
    earnedGold,
    allGoldInQuests,
  } = QuestProgressUtils.getTotalGoldInAllQuests({ worlds, completedQuests })

  const tableHeader = (
    <div className={cx(css.tableHeader)}>
      <div className={cx(css.tableCell, css.name)}>Quest</div>
      <div
        className={cx(css.tableCell, css.gold)}
      >{`Gold (${earnedGold} out of ${allGoldInQuests})`}</div>
      <div className={cx(css.tableCell, css.status)}>Completed</div>
    </div>
  )

  const convertAllQuestsToLua = ({ worlds }) => {
    let luaStrings = "{"

    // TODO: Do export based on Books
    // TODO: Do export based on Books
    // TODO: Do export based on Books
    // TODO: Do export based on Books

    worlds.slice(0, 10).map((world) => {
      console.log("world.location.name", world.title) // zzz
      const newString = convertToLua({ config: world.newGrid5 })

      if (newString) {
        luaStrings += `${newString}, `
      }
    })
    luaStrings += `}`

    console.log("luaStrings") // zzz
    console.log(luaStrings) // zzz
  }

  return (
    <div className={cx(className, css.main)}>
      <Button
        onClick={() => {
          convertAllQuestsToLua({ worlds })
        }}
        icon={IconNames.NINJA}
      />
      {tableHeader}
      {worlds.map((event) => (
        <QuestListItem event={event} key={event.id} />
      ))}
    </div>
  )
}
