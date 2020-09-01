import React, { useContext, useState, useEffect } from "react"
import _get from "lodash.get"
import { Toaster, Position, ButtonGroup, Button } from "@blueprintjs/core"

import Constants from "../../Utils/Constants/Constants.js"
import QuestVisibilityUtils from "../../Utils/QuestVisibilityUtils.js"
import StoryMode from "../StoryMode/StoryMode"
import QuestProgressUtils from "../../Utils/QuestProgressUtils.js"
import TopLevelUtils from "../../Utils/TopLevelUtils.js"
import Utils from "../../Utils/Utils.js"
import useGlobalStorage from "../../../Context/useGlobalStorage.js"

import css from "./TopLevel.module.scss"

const toaster = Toaster.create({
  position: Position.TOP,
  className: css.toasterContainer,
  canEscapeKeyClear: true,
})

export default function TopLevel(props) {
  const { className } = props
  let world = props.quest

  console.log("FUNCTION START-----------------------------") // zzz

  const { globalStorage, setGlobalStorageProps } = useGlobalStorage()
  const [localProps, setLocalProps] = useState(Constants.getDefaultGameStatus())

  const { questStatus } = localProps
  console.log("localProps", localProps) // zzz
  console.log(
    "localProps.questStatus.desiredItems---TL",
    localProps.questStatus.desiredItems
  ) // zzz

  const setLocalStuff = (props) => {
    setLocalProps((state) => {
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
    console.log("globalStorage - new props", globalStorage.questStatus) // zzz
    // setLocalStuff({ questStatus: { ...globalStorage.questStatus } })
    world = props.quest
    onChangeWorld()
    console.log("world after onchangeworld>", world) // zzz
  }, [props.quest])

  const onChangeWorld = () => {
    console.log("onChangeWorld")
    toaster.clear()

    if (!world) {
      return <div>no world 1</div>
    }
    const { questConfig } = world

    console.log("")
    console.log("-----------------------mapId-------------", world.id)

    const startScene = TopLevelUtils.getTerminalScene({
      world,
    })
    console.log("startScene", startScene) // zzz

    if (!startScene) return <div>no start scene</div>
    if (!questConfig) {
      setLocalStuff({ showMissionConsole: false })
    } else {
      setLocalStuff({ showMissionConsole: true })
      const missions = TopLevelUtils.getMissions({ questConfig })
      console.log("missions", missions) // zzz

      const desiredItems =
        missions.map((mission) => !!mission.item && mission.item) || []
      console.log("desiredItems", desiredItems) // zzz

      questStatus.desiredItems = desiredItems
    }

    updateActiveScene({ sceneId: startScene.id })
  }

  const updateActiveScene = ({ sceneId }) => {
    console.log("updateActiveScene")
    toaster.clear()

    const { questConfig } = world
    const activeScene = TopLevelUtils.getSceneFromId({
      world,
      sceneId,
    })

    // This preserves activeScene until the next function render
    setLocalStuff({ activeScene })
    setGlobalStorageProps({ activeScene, world })

    questStatus.visitedScenes.push(sceneId)

    if (localProps.showMissionConsole && questConfig) {
      const { foundItem, completedMission } = updateQuestProgress({
        world,
        activeScene,
      })

      // mutates questStatus
      QuestVisibilityUtils.updateSceneVisibility({
        questStatus,
        world,
      })

      // TODO: this should probably happen on the appropriate frame.

      displayFoundItemToaster({ foundItem })
      displayCompletedMissionToaster({ completedMission })
    }
    setGlobalStorageProps({ questStatus: { ...questStatus } })
  }

  const updatePockets = ({ questStatus, activeMission }) => {
    // remove item from pockets
    const { rewards, item } = activeMission
    delete questStatus.pockets[item.name]

    const newPockets = TopLevelUtils.convertItemToObjFormat({
      itemsArray: rewards,
    })

    return QuestProgressUtils.addToPockets({
      newPockets,
      questStatus,
    })
  }

  const updateQuestProgress = ({ world, activeScene }) => {
    console.log("updateQuestStatus")
    const { questConfig } = world
    const { location } = activeScene
    const { activeMissionIndex, desiredItems, pockets } = questStatus
    console.log("desiredItems--------uqp", desiredItems) // zzz

    // TODO: what happened to my desired items?
    // TODO: what happened to my desired items?
    // TODO: what happened to my desired items?
    // TODO: what happened to my desired items?
    const firstFrame = Utils.getFirstFrame({ activeScene }) || {}
    const { critters1 = [], critters2 = [] } = firstFrame
    const crittersAndLocations = [location, ...critters1, ...critters2]

    const activeMission = QuestProgressUtils.getActiveMission({
      questConfig,
      questStatus,
    })

    if (!activeMission) {
      return {}
    }

    const isMissionCompleted = QuestProgressUtils.completeMission({
      charactersInScene: crittersAndLocations,
      pockets,
      activeMission,
    })

    // If mission completed, update pockets
    if (isMissionCompleted) {
      questStatus.completedMissions.push(activeMissionIndex)
      questStatus.activeMissionIndex++
      questStatus.pockets = updatePockets({ questStatus, activeMission })
    }

    // find new items
    const foundItem = QuestProgressUtils.findItem({
      itemsInScene: crittersAndLocations,
      questStatus,
      desiredItems,
    })

    QuestProgressUtils.removeItemFromDesiredItems({
      itemToRemove: foundItem,
      questStatus,
    })

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
      toaster.clear()
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
  console.log("localProps", localProps) // zzz
  console.log("-------------------globalStorage-----------TL", globalStorage) // zzz
  console.log("questStatus", questStatus) // zzz

  console.log("world", world) // zzz

  if (!world || !world.title) {
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
        world={world}
      />
      {/* {!isProdRelease && showBookPicker && renderBookPicker()} */}
    </div>
  )
}
