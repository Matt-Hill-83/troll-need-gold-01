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

  const [localProps, setLocalProps] = useState(Constants.getDefaultGameStatus())

  const [questStatusGlobal, setQuestStatusGlobal] = useState(
    Constants.getDefaultQuestStatus()
  )

  console.log("localProps - 1", localProps) // zzz

  const questStatus = { ...Constants.getDefaultQuestStatus() }
  const { className } = props
  const worldLocal = props.quest
  console.log("localProps.activeScene", localProps.activeScene) // zzz

  const setLocalStuff = (props) => {
    setLocalProps((state) => {
      const test = { ...state, ...props }

      return test
    })
  }

  const setQuestStatusStuff = (props) => {
    setQuestStatusGlobal((state) => {
      const test = { ...state, ...props }

      return test
    })
  }

  // on mount
  useEffect(() => {
    // returned function will be called on component unmount

    return () => {}
  }, [])

  // on change in props
  useEffect(() => {
    console.log("new props =================================>>>>>")

    // worldLocal = props.quest
    onChangeWorld()
    console.log("worldLocal after onchangeworld>", worldLocal) // zzz
  }, [props.quest])

  const onChangeWorld = () => {
    // worldLocal = props.quest
    console.log("onChangeWorld")
    console.log(
      "worldLocal---------------------------------------------------->",
      worldLocal
    ) // zzz

    if (!worldLocal) {
      return <div>no worldLocal 1</div>
    }
    const { questConfig } = worldLocal

    console.log("")
    console.log("-----------------------mapId-------------", worldLocal.id)
    toaster.clear()

    const startScene = TopLevelUtils.getTerminalScene({ world: worldLocal })
    console.log("startScene", startScene) // zzz

    if (!startScene) return <div>no start scene</div>
    const activeScene = startScene
    if (!questConfig) {
      setLocalStuff({ showMissionConsole: false })
    } else {
      setLocalStuff({ showMissionConsole: true })
      const missions = TopLevelUtils.getMissions({ questConfig })

      const desiredItems =
        missions.map((mission) => !!mission.item && mission.item) || []
      console.log("desiredItems", desiredItems) // zzz

      questStatus.desiredItems = desiredItems
    }

    updateActiveScene({
      sceneId: startScene.id,
      world: worldLocal,
      activeScene: localProps.activeScene,
    })
    console.log("worldLocal --- 3--->", worldLocal) // zzz
  }

  const updateActiveScene = ({ sceneId, world, activeScene }) => {
    console.log("updateActiveScene")
    console.log("sceneId", sceneId) // zzz

    console.log("world", world) // zzz
    const { questConfig } = world

    localProps.activeScene = TopLevelUtils.getActiveScene({ world, sceneId })
    console.log("localProps.activeScene", localProps.activeScene) // zzz
    questStatus.visitedScenes.push(sceneId)

    if (localProps.showMissionConsole && questConfig) {
      updateQuestStatus({ world, activeScene })
    }
    console.log("worldLocal ----4--->", worldLocal) // zzz
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

    console.log("worldLocal ----5--->", worldLocal) // zzz

    return {
      foundItem,
      completedMission: isMissionCompleted ? localProps.activeMission : false,
    }
  }

  console.log("")
  console.log("main story render")

  console.log("--------------------RENDER-------------------->") // zzz
  console.log("localProps.activeScene", localProps.activeScene) // zzz
  console.log("worldLocal", worldLocal) // zzz
  console.log("localProps", localProps) // zzz
  console.log("questStatus", questStatus) // zzz

  if (!worldLocal || !worldLocal.title) {
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
        world={worldLocal}
      />
      {/* {!isProdRelease && showBookPicker && renderBookPicker()} */}
    </div>
  )
}
