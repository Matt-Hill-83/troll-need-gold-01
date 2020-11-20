import _get from "lodash.get"
import { Button, ButtonGroup } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import { Link } from "react-router-dom"
import cx from "classnames"
import React from "react"

import { deleteQuestInFirestore } from "../../app/firestore/firestoreService"
import Constants from "../../Common/Constants/Constants"
import QuestProgressUtils from "../../oldProject/Utils/QuestProgressUtils"
import TopLevelUtils from "../../oldProject/Utils/TopLevelUtils"
import useUpdateProfileWidget from "../../oldProject/components/TopLevel/useUpdateProfileWidget"
import Utils from "../../Common/Utils/Utils"

import css from "./QuestListItem.module.scss"

const { isProdRelease } = Constants

const convertToLua = ({ config }) => {
  console.log("config", config) // zzz
  const output = []
  const scenes = config.filter((item) => {
    return item.location.name !== "blank"
  })

  const scenes2 = scenes.filter((item) => {
    // let sceneHasDialog = ""
    const frames = item?.frameSet.frames || "no loc"

    const sceneHasDialog = frames.every((frame) => {
      const { dialog } = frame

      return dialog.every((dialog) => {
        return !dialog.text
        if (dialog.text !== "") {
          sceneHasDialog = true
        }
      })
    })

    return !sceneHasDialog
  })

  scenes2.map((item) => {
    const name = item?.location?.name || "no loc"
    const frames = item?.frameSet.frames || "no loc"

    const newFrames = frames.map((frame) => {
      const { dialog, critters1, critters2 } = frame

      const newDialogs = dialog.map((dialog) => {
        return { char: dialog.character, text: dialog.text.trim() }
      })

      const newCharacters01 = critters1.map((item) => {
        return { name: item.name }
      })

      const newCharacters02 = critters2.map((item) => {
        return { name: item.name }
      })

      return {
        dialogs: newDialogs,
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
  console.log("newString:") // zzz
  console.log(newString) // zzz
  return newString
}

export default function QuestListItem({ event: world }) {
  const { questConfig = {} } = world

  const { getProfile } = useUpdateProfileWidget()
  const profile = getProfile()
  const isGod = profile.id === "AMAgzal2oAbHogUvO9vVeHWZygF3"
  const completedQuests = _get(profile, "userStatus.completedQuests") || []

  const missions = TopLevelUtils.getMissions({ questConfig }) || []
  const totalGold = QuestProgressUtils.getTotalGoldInQuest({ missions })

  const renderItem = () => {
    const { title, id: questId } = world
    if (!world.title) {
      return <div>Quest not found</div>
    }
    const truncatedTitle = Utils.trimToDashIfProd({ isProdRelease, title })
    const questCompleted = Utils.isQuestCompleted({ questId, completedQuests })

    return (
      <div key={questId} className={css.questRow}>
        <Link
          className={cx(css.tableCell, css.questName)}
          to={`/quests/${questId}`}
        >
          {truncatedTitle}
        </Link>
        {isGod && (
          <Link
            className={cx(css.tableCell, css.questName)}
            to={`/quest-builder/${questId}`}
          >
            Edit
          </Link>
        )}

        <div className={cx(css.tableCell, css.dragonPoints)}>{totalGold} </div>
        <div className={cx(css.tableCell, css.questStatus)}>
          <span role="img">{`${questCompleted ? "✅" : "--"}`}</span>
        </div>
        {!isProdRelease && (
          <ButtonGroup>
            <Button
              xxxonClick={() => {
                deleteQuestInFirestore(questId)
              }}
              icon={IconNames.TRASH}
            />
            <Button
              onClick={() => {
                convertToLua({ config: world.newGrid5 })
              }}
              icon={IconNames.NINJA}
            />
          </ButtonGroup>
        )}
      </div>
    )
  }

  return renderItem()
}
