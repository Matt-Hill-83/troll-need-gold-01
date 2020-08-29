import React, { useContext, useState, useEffect } from "react"
import _get from "lodash.get"
import { Toaster, Position, ButtonGroup, Button } from "@blueprintjs/core"

import { myContext } from "../../../myProvider.js"
import Constants from "../../Utils/Constants/Constants.js"
import QuestStatusUtils from "../../Utils/QuestStatusUtils.js"
import StoryMode from "../StoryMode/StoryMode"
import TopLevelUtils from "../../Utils/TopLevelUtils.js"
import Utils from "../../Utils/Utils.js"

import css from "./TopLevel.module.scss"

const toaster = Toaster.create({
  position: Position.TOP,
  className: css.toasterContainer,
  canEscapeKeyClear: true,
})

export default function TopLevel(props) {
  const [localStorage, setLocalStorage] = useContext(myContext)

  console.log("localStorage-----------------------------------1", localStorage)

  const increaseNumber = () => {
    setLocalStorage((prevVal) => {
      const newVal = { ...prevVal }
      newVal.number += 1
      return newVal
    })
  }

  const setLocalStorageProp = ({ prop, value }) => {
    setLocalStorage((state) => {
      const test = { ...state, [prop]: value }
      return test
    })
  }

  // on mount
  useEffect(() => {
    const world = props.quest
    if (!world) {
      return <div>no world on mount</div>
    }
    // setLocalStorageProp({ prop: "world", value: world })
    // onChangeWorld({ mapId: world.id })

    // returned function will be called on component unmount
    return () => {}
  }, [])

  // on change in props
  useEffect(() => {
    const world = props.quest
    setLocalStorageProp({ prop: "world", value: world })
    onChangeWorld({ mapId: world.id })
  }, [props.quest])

  const getDesiredItem = ({ activeMission }) => {
    if (!activeMission) {
      return null
    }
    return activeMission.item
  }

  const findItem = ({ itemsInScene, questStatus }) => {
    const desiredItems = questStatus.desiredItems || []
    const { pockets = {} } = questStatus

    const foundItems = []
    desiredItems.forEach((desiredItem) => {
      const foundItem =
        itemsInScene.find((item) => {
          return item.name === (desiredItem && desiredItem.name)
        }) || null
      if (foundItem) {
        foundItems.push(foundItem)
      }
    })
    const foundItem = foundItems[0]
    if (!foundItem) {
      return null
    }

    if (!foundItem.amount) {
      foundItem.amount = 1
    }

    const itemsInPockets = pockets[foundItem.name]

    if (itemsInPockets) {
      itemsInPockets.amount = itemsInPockets.amount + foundItem.amount
    } else {
      pockets[foundItem.name] = { amount: foundItem.amount }
    }

    setLocalStorageProp({ prop: "questStatus", value: questStatus })
    return foundItem
  }

  const updateQuestStatus = () => {
    console.log("updateQuestStatus")
    toaster.clear()
    const {
      activeScene,
      activeScene: { location },
      world,
    } = localStorage

    const firstFrame = Utils.getFirstFrame({ activeScene }) || {}
    const { critters1 = [], critters2 = [] } = firstFrame

    const crittersAndLocations = [location, ...critters1, ...critters2]

    const { foundItem, completedMission } = updateQuestState({
      itemsInScene: crittersAndLocations,
      charactersInScene: crittersAndLocations,
    })

    if (foundItem) {
      const message = (
        <div>
          <span>{`You find a ${foundItem.name}.`}</span>
          <br />
          <span>{`You put the ${foundItem.name} in your pocket.`}</span>
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
    const questStatus = localStorage.questStatus
    QuestStatusUtils.updateSceneVisibilityProps({
      questStatus,
      activeWorld: world,
    })
  }

  const updateQuestState = ({ itemsInScene, charactersInScene }) => {
    const {
      questStatus,
      world: { questConfig },
    } = localStorage

    const missions = TopLevelUtils.getMissions({ questConfig })

    const { pockets, completedMissions } = questStatus

    const activeMissionIndex = questStatus.activeMissionIndex
    const activeMission = missions[activeMissionIndex] || null

    if (!activeMission) {
      return {}
    }

    const isMissionCompleted = TopLevelUtils.completeMission({
      charactersInScene,
      questStatus,
      activeMission,
    })

    if (isMissionCompleted) {
      completedMissions.push(activeMissionIndex)

      // remove item from pocket
      const desiredItem = getDesiredItem({ activeMission })
      delete pockets[desiredItem.name]
      activeMission.completed = true
      questStatus.activeMissionIndex++

      const newPockets = TopLevelUtils.convertItemToObjFormat({
        itemsArray: activeMission.rewards,
      })

      TopLevelUtils.addToPockets({ newPockets, questStatus })
      setLocalStorageProp({ prop: "questStatus", value: questStatus })
    }

    const foundItem = findItem({ itemsInScene, questStatus })
    TopLevelUtils.removeItemFromDesiredItems({
      itemToRemove: foundItem,
      questStatus,
    })

    return {
      foundItem,
      completedMission: isMissionCompleted ? activeMission : false,
    }
  }

  const updateActiveScene = ({ sceneId }) => {
    console.log("updateActiveScene")
    setLocalStorageProp({ prop: "activeFrameIndex", value: 0 })
    const {
      showMissionConsole,
      world,
      world: { questConfig },
    } = localStorage

    const scenesGrid = _get(world, "newGrid5") || []
    const activeScene = scenesGrid.find((item) => item.id === sceneId)
    setLocalStorageProp({ prop: "activeScene", value: activeScene })

    const questStatus = { ...localStorage.questStatus }
    questStatus.visitedScenes.push(sceneId)

    setLocalStorageProp({ prop: "questStatus", value: questStatus })

    if (showMissionConsole && questConfig) {
      updateQuestStatus({ sceneId })
    }
  }

  const onChangeWorld = () => {
    console.log("onChangeWorld")
    const world = props.quest
    if (!world) {
      return <div>no world</div>
    }

    console.log("")
    console.log("-----------------------mapId-------------", world.id)
    toaster.clear()

    const questStatus = { ...Constants.getDefaultQuestStatus() }
    // For some reason, I need to pass world here, because localStorage is not updating correctly.
    const startScene = TopLevelUtils.getTerminalScene({ world })
    if (!startScene) return <div>no start scene</div>

    setLocalStorageProp({ prop: "world", value: world })
    setLocalStorageProp({ prop: "activeScene", value: startScene })

    const { questConfig } = world

    if (!questConfig) {
      setLocalStorageProp({
        prop: "showMissionConsole",
        value: false,
      })
    } else {
      const missions = TopLevelUtils.getMissions({ questConfig })
      const desiredItems =
        missions.map((mission) => !!mission.item && mission.item) || []

      setLocalStorageProp({
        prop: "questStatus",
        value: { ...questStatus, desiredItems },
      })
    }
  }

  const renderButtons = () => {
    const isProdRelease = false

    return (
      <div className={css.floatingButtons}>
        <ButtonGroup color="primary">
          {!isProdRelease && <Button>Pick a Book of Quests...</Button>}
        </ButtonGroup>
      </div>
    )
  }

  console.log("")
  console.log("main story render")

  const { className } = props
  const { world, activeScene } = localStorage

  if (!world || !world.title) {
    return <div>no world</div>
  }

  if (!activeScene) {
    return <div>no active scene</div>
  }

  const test = () => {
    setLocalStorageProp({ prop: "number", value: 999 })
  }

  return (
    <div className={`${css.main} ${className}`}>
      <div>
        <div>
          <h1>Number: {localStorage.number}</h1>
          {/* <button onClick={test}>+1</button> */}
          <button onClick={increaseNumber}>+1</button>
        </div>
      </div>
      {renderButtons()}
      <StoryMode
        updateActiveScene={updateActiveScene}
        activeScene={activeScene}
        world={world}
      />
      {/* {!isProdRelease && showBookPicker && renderBookPicker()} */}
    </div>
  )
}
