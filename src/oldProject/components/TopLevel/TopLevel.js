import React, { useContext, useState, useEffect } from "react"
import _get from "lodash.get"
import { Toaster, Position, ButtonGroup, Button } from "@blueprintjs/core"

import Constants from "../../Utils/Constants/Constants.js"
import QuestVisibilityUtils from "../../Utils/QuestVisibilityUtils.js"
import StoryMode from "../StoryMode/StoryMode"
import QuestProgressUtils from "../../Utils/QuestProgressUtils.js"
import TopLevelUtils from "../../Utils/TopLevelUtils.js"
import Utils from "../../Utils/Utils.js"
import Utils2 from "../../Utils/Utils2.js"
import useTopLevelStorage from "../../../Context/useTopLevelStorage.js"

import css from "./TopLevel.module.scss"

const toaster = Toaster.create({
  position: Position.TOP,
  className: css.toasterContainer,
  canEscapeKeyClear: true,
})

export default function TopLevel(props) {
  console.log("FUNCTION START-----------------------------") // zzz
  const { findItem } = Utils2()

  const { globalStorage, setGlobalStorageProps } = useTopLevelStorage()
  const [localProps, setLocalProps] = useState(Constants.getDefaultGameStatus())

  const [questStatusGlobal, setQuestStatusGlobal] = useState(
    Constants.getDefaultQuestStatus()
  )

  console.log("localProps - 1", localProps) // zzz

  const questStatus = { ...Constants.getDefaultQuestStatus() }
  const { className } = props
  let worldLocal = props.quest

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
    worldLocal = props.quest
    return () => {}
  }, [])

  // on change in props
  useEffect(() => {
    console.log("new props =================================>>>>>")
    worldLocal = props.quest
    onChangeWorld()
    console.log("worldLocal after onchangeworld>", worldLocal) // zzz
  }, [props.quest])

  const onChangeWorld = () => {
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

    const startScene = TopLevelUtils.getTerminalScene({
      world: worldLocal,
    })
    console.log("startScene", startScene) // zzz

    if (!startScene) return <div>no start scene</div>
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
    })
  }

  const updateActiveScene = ({ sceneId, world }) => {
    console.log("updateActiveScene")

    const { questConfig } = world
    const activeScene = TopLevelUtils.getSceneFromId({ world, sceneId })
    setLocalStuff({ activeScene })
    console.log("activeScene", activeScene) // zzz

    // Should I do this after
    setGlobalStorageProps({ activeScene })

    // TODO: is this getting published correctly?
    // TODO: is this getting published correctly?
    // TODO: is this getting published correctly?
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

    QuestVisibilityUtils.updateSceneVisibilityProps({
      questStatus,
      world,
    })

    const { foundItem, completedMission } = updateQuestState({
      itemsInScene: crittersAndLocations,
      charactersInScene: crittersAndLocations,
      world,
    })

    // TODO: this should probably happen on the appropriate frame.
    displayFoundItemToaster({ foundItem })
    displayCompletedMissionToaster({ completedMission })
  }

  const updateQuestState = ({ itemsInScene, charactersInScene, world }) => {
    const { questConfig } = world
    const activeMissionIndex = questStatus.activeMissionIndex
    const activeMission = QuestProgressUtils.getActiveMission({
      questConfig,
      questStatus,
    })

    if (!activeMission) {
      return {}
    }

    const isMissionCompleted = QuestProgressUtils.completeMission({
      charactersInScene,
      questStatus,
      activeMission,
    })

    if (isMissionCompleted) {
      questStatus.completedMissions.push(activeMissionIndex)

      // remove item from pockets
      const desiredItem = activeMission.item
      delete questStatus.pockets[desiredItem.name]
      questStatus.activeMissionIndex++

      const newPockets = QuestProgressUtils.TopLevelUtils({
        itemsArray: activeMission.rewards,
      })

      questStatus.pockets = QuestProgressUtils.addToPockets({
        newPockets,
        questStatus,
      })
    }

    const foundItem = QuestProgressUtils.findItem({
      itemsInScene,
      questStatus,
      desiredItems: questStatus.desiredItems,
    })

    QuestProgressUtils.removeItemFromDesiredItems({
      itemToRemove: foundItem,
      questStatus,
    })

    console.log("worldLocal ----5--->", worldLocal) // zzz

    return {
      foundItem,
      completedMission: isMissionCompleted ? activeMission : false,
    }
  }

  const displayFoundItemToaster = ({ foundItem }) => {
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
  }

  const displayCompletedMissionToaster = ({ completedMission }) => {
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
  }

  console.log("")
  console.log("main story render")

  console.log("--------------------RENDER-TopLevel------------------->") // zzz
  console.log("worldLocal", worldLocal) // zzz
  console.log("localProps.activeScene", localProps.activeScene) // zzz
  console.log("-------------------globalStorage", globalStorage) // zzz
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
