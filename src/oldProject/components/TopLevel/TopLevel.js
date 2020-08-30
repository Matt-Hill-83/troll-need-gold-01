import React, { useContext, useState, useEffect } from "react"
import _get from "lodash.get"
import { Toaster, Position, ButtonGroup, Button } from "@blueprintjs/core"

import Constants from "../../Utils/Constants/Constants.js"
import QuestStatusUtils from "../../Utils/QuestStatusUtils.js"
import StoryMode from "../StoryMode/StoryMode"
import TopLevelUtils from "../../Utils/TopLevelUtils.js"
// import useLocalStorage from "./useLocalStorage.js"
import Utils from "../../Utils/Utils.js"
import Utils2 from "../../Utils/Utils2.js"

import css from "./TopLevel.module.scss"

const toaster = Toaster.create({
  position: Position.TOP,
  className: css.toasterContainer,
  canEscapeKeyClear: true,
})

export default function TopLevel(props) {
  const { findItem } = Utils2()

  const [localProps, setLocalProps] = useState(
    Constants.getDefaultLocalStorage()
  )

  console.log("localProps - 1", localProps) // zzz

  const questStatus = { ...Constants.getDefaultQuestStatus() }
  // const localProps = Constants.getDefaultLocalStorage()
  let worldGlobal = 0
  const { className } = props

  worldGlobal = props.quest
  // on mount
  useEffect(() => {
    // returned function will be called on component unmount

    return () => {}
  }, [])

  // on change in props
  useEffect(() => {
    console.log("new props =================================>>>>>")
    setLocalProps((state) => {
      console.log("state", state) // zzz
      const test = { ...state, world: props.quest }
      console.log("test", test) // zzz
      return test
    })

    worldGlobal = props.quest
    onChangeWorld()
    console.log("worldGlobal after onchangeworld>", worldGlobal) // zzz
  }, [props.quest])

  const onChangeWorld = () => {
    worldGlobal = props.quest
    console.log("onChangeWorld")
    console.log(
      "worldGlobal---------------------------------------------------->",
      worldGlobal
    ) // zzz

    if (!worldGlobal) {
      return <div>no worldGlobal 1</div>
    }
    const { questConfig } = worldGlobal

    console.log("")
    console.log("-----------------------mapId-------------", worldGlobal.id)
    toaster.clear()

    const startScene = TopLevelUtils.getTerminalScene({ world: worldGlobal })
    console.log("startScene", startScene) // zzz

    if (!startScene) return <div>no start scene</div>
    localProps.activeScene = startScene
    if (!questConfig) {
      localProps.showMissionConsole = false
    } else {
      localProps.showMissionConsole = true
      const missions = TopLevelUtils.getMissions({ questConfig })

      const desiredItems =
        missions.map((mission) => !!mission.item && mission.item) || []
      console.log("desiredItems", desiredItems) // zzz

      questStatus.desiredItems = desiredItems
    }

    updateActiveScene({
      sceneId: startScene.id,
      world: worldGlobal,
      activeScene: localProps.activeScene,
    })
    console.log("worldGlobal --- 3--->", worldGlobal) // zzz
  }

  const updateQuestStatus = ({ world, activeScene }) => {
    console.log("updateQuestStatus")
    toaster.clear()

    const { location } = activeScene

    const firstFrame = Utils.getFirstFrame({ activeScene }) || {}
    const { critters1 = [], critters2 = [] } = firstFrame

    const crittersAndLocations = [location, ...critters1, ...critters2]

    const { foundItem, completedMission } = updateQuestState({
      itemsInScene: crittersAndLocations,
      charactersInScene: crittersAndLocations,
      world,
    })

    if (foundItem) {
      const message = (
        <div>
          <span>{`You find a ${foundItem.name}.`}</span>
          <br />
          <span>{`You put the ${foundItem.name} in your pockets.`}</span>
        </div>
      )
      toaster.show({
        message,
        className: css.toaster,
        timeout: 30000,
        canEscapeKeyClear: true,
      })
    }

    // TODO: this should probably happen on the last frame.
    if (completedMission) {
      const { rewards, item, recipient, name } = completedMission

      const reward = rewards[0]
      const message = `You give the  ${item.name} to the ${recipient.name}.`

      const message2 = (
        <div>
          <br />
          <span>{`Mission Complete: "${name}".`}</span>
          <br />
          <span>{`You win: ${reward.amount}  ${reward.name}.`}</span>
        </div>
      )
      toaster.show({
        message: message2,
        className: css.toaster,
        timeout: 30000,
      })
      toaster.show({ message, className: css.toaster, timeout: 30000 })
    }

    QuestStatusUtils.updateSceneVisibilityProps({
      questStatus,
      world,
    })
  }

  const updateQuestState = ({ itemsInScene, charactersInScene, world }) => {
    const { questConfig } = world
    const activeMissionIndex = questStatus.activeMissionIndex
    localProps.activeMission = TopLevelUtils.getActiveMission({
      questConfig,
      questStatus,
    })

    if (!localProps.activeMission) {
      return {}
    }

    const isMissionCompleted = TopLevelUtils.completeMission({
      charactersInScene,
      questStatus,
      activeMission: localProps.activeMission,
    })

    if (isMissionCompleted) {
      questStatus.completedMissions.push(activeMissionIndex)

      // remove item from pockets
      const desiredItem = TopLevelUtils.getDesiredItem({
        activeMission: localProps.activeMission,
      })

      delete questStatus.pockets[desiredItem.name]
      questStatus.activeMissionIndex++

      const newPockets = TopLevelUtils.convertItemToObjFormat({
        itemsArray: localProps.activeMission.rewards,
      })

      questStatus.pockets = TopLevelUtils.addToPockets({
        newPockets,
        questStatus,
      })
    }

    const foundItem = findItem({
      itemsInScene,
      questStatus,
      desiredItems: questStatus.desiredItems,
    })

    TopLevelUtils.removeItemFromDesiredItems({
      itemToRemove: foundItem,
      questStatus,
    })

    console.log("worldGlobal ----5--->", worldGlobal) // zzz

    return {
      foundItem,
      completedMission: isMissionCompleted ? localProps.activeMission : false,
    }
  }

  const updateActiveScene = ({ sceneId, world, activeScene }) => {
    console.log("updateActiveScene")
    console.log("sceneId", sceneId) // zzz

    console.log("world", world) // zzz
    const { questConfig } = world

    localProps.activeScene = TopLevelUtils.getActiveScene({ world, sceneId })
    questStatus.visitedScenes.push(sceneId)

    if (localProps.showMissionConsole && questConfig) {
      updateQuestStatus({ world, activeScene })
    }
    console.log("worldGlobal ----4--->", worldGlobal) // zzz
  }

  console.log("")
  console.log("main story render")

  console.log("--------------------RENDER-------------------->") // zzz
  console.log("worldGlobal", worldGlobal) // zzz
  console.log("localProps", localProps) // zzz
  if (!worldGlobal || !worldGlobal.title) {
    return <div>no world 2</div>
  }

  if (!localProps.activeScene) {
    return <div>no active scene</div>
  }

  return (
    <div className={`${css.main} ${className}`}>
      {/* {renderButtons()} */}
      <StoryMode
        updateActiveScene={updateActiveScene}
        activeScene={localProps.activeScene}
        world={worldGlobal}
      />
      {/* {!isProdRelease && showBookPicker && renderBookPicker()} */}
    </div>
  )
}
