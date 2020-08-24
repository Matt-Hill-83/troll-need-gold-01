import React, { useContext, useState, useEffect } from "react"
import _get from "lodash.get"
import { Toaster, Position, ButtonGroup, Button } from "@blueprintjs/core"
import { Link } from "react-router-dom"

import { myContext } from "../../../myProvider.js"
import BookPicker from "../BookPicker/BookPicker.js"
import Constants from "../../Utils/Constants/Constants.js"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"
import QuestStatusUtils from "../../Utils/QuestStatusUtils.js"
import StoryMode from "../StoryMode/StoryMode"
import Utils from "../../Utils/Utils"

import css from "./TopLevel.module.scss"

const toaster = Toaster.create({
  position: Position.TOP,
  className: css.toasterContainer,
  canEscapeKeyClear: true,
})

export default function TopLevel(props) {
  const world = props.quest
  const [localStorage, setLocalStorage] = useContext(myContext)

  const increaseNumber = () => {
    setLocalStorage((prevVal) => {
      const newVal = { ...prevVal }
      newVal.number += 1
      return newVal
    })
  }

  const setLocalStorageProp = ({ prop, value }) => {
    setLocalStorage((state) => {
      return { ...state, [prop]: value }
    })
  }

  // on mount
  useEffect(() => {
    init()

    // returned function will be called on component unmount
    return () => {}
  }, [])

  // on change in props
  useEffect(() => {}, [props])

  const init = () => {
    onChangeWorld({ mapId: world.id })
  }

  const updateQuestState = ({ itemsInScene, charactersInScene }) => {
    const questStatus = localStorage.questStatus
    if (!questStatus.questConfig) {
      return {}
    }

    const missions = QuestStatusUtils.getActiveSubQuestMissions({ world })
    const { pockets, completedMissions } = questStatus
    if (!questStatus.completedMissions) {
      questStatus.completedMissions = []
    }

    if (!missions) {
      return {}
    }

    const activeMissionIndex = questStatus.activeMissionIndex
    const activeMission = missions[activeMissionIndex] || null
    if (!activeMission) {
      return {}
    }

    const isMissionCompleted = this._completeMission({
      charactersInScene,
      questStatus,
    })

    if (isMissionCompleted) {
      completedMissions.push(activeMissionIndex)

      // remove item from pocket
      const desiredItem = this.getDesiredItem()
      delete pockets[desiredItem.name]
      activeMission.completed = true
      questStatus.activeMissionIndex++

      const newPockets = this.convertItemToObjFormat({
        itemsArray: activeMission.rewards,
      })

      this.addToPockets({ newPockets })
      this.setQuestStatus(questStatus)
    }

    const foundItem = this._findItem({ itemsInScene })
    this.removeItemFromDesiredItems({ itemToRemove: foundItem })

    return {
      foundItem,
      completedMission: isMissionCompleted ? activeMission : false,
    }
  }

  const getTerminalScene = ({ start = true }) => {
    const scenesGrid = _get(world, "newGrid5") || []
    const endScene = scenesGrid.find((item) => item.id === world.endSceneId)
    const startScene = scenesGrid.find((item) => item.id === world.startSceneId)
    const terminalScene = start ? startScene : endScene
    const firstScene = scenesGrid[0]
    const lastScene = scenesGrid[scenesGrid.length - 1]
    // If no start and finish scenes are marked, choose some, so the program doesn't break
    return terminalScene || (start ? firstScene : lastScene)
  }

  const initWorld = async () => {
    const startScene = getTerminalScene({})
    if (!startScene) return

    localStateStore.setVisitedScenes([])

    setLocalStorageProp({ prop: "activeSceneId", value: startScene.id })
    setLocalStorageProp({ prop: "activeScene", value: startScene })
  }

  const updateActiveScene = ({ sceneId }) => {
    localStateStore.setActiveSceneId(sceneId)

    localStateStore.setActiveFrameIndex(0)
    localStateStore.addVisitedScenes(sceneId)

    const questStatus = localStateStore.getQuestStatus()
    const { hideMissionConsole } = questStatus

    if (!hideMissionConsole) {
      updateQuestStatus({ sceneId })
    }
  }

  const updateQuestStatus = () => {
    toaster.clear()
    const activeScene = localStorage.activeScene
    const { location } = activeScene

    const activeFrame = localStateStore.getFirstFrame({ activeScene }) || {}
    // const activeFrame = localStateStore.getFirstFrame() || {}
    const { critters1 = [], critters2 = [] } = activeFrame

    const { foundItem, completedMission } = updateQuestState({
      itemsInScene: [location, ...critters1, ...critters2],
      charactersInScene: [location, ...critters1, ...critters2],
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
    QuestStatusUtils.updateSceneVisibilityProps()
  }

  const onChangeWorld = ({ mapId }) => {
    console.log("")
    console.log("-----------------------mapId-------------", mapId)
    toaster.clear()

    const questStatus = { ...Constants.defaultQuestStatus }
    setLocalStorageProp({ prop: "world", value: world })
    setLocalStorageProp({ prop: "activeWorldId", value: mapId })
    setLocalStorageProp({ prop: "questStatus", value: questStatus })

    if (!world) {
      return
    }

    const { questConfig } = world

    if (questConfig) {
      const questStatus = localStorage.questStatus
      const missions = QuestStatusUtils.getActiveSubQuestMissions({
        world,
        questStatus,
      })
      const desiredItems =
        (missions && missions.map((mission) => mission.item)) || []

      const desiredItemsFiltered = desiredItems.filter((item) => !!item)
      const clonedQuestConfig = JSON.parse(JSON.stringify(questConfig))

      const combinedPockets = localStateStore.addToPockets({
        newPockets: clonedQuestConfig.pockets,
      })
      const defaultQuestStatus = localStateStore.getDefaultQuestStatus()

      const newProps = {
        activeMissionIndex: 0,
        pockets: combinedPockets,
        questConfig: clonedQuestConfig,
        desiredItems: desiredItemsFiltered,
      }
      const newQuestStatus = { ...defaultQuestStatus, ...newProps }

      localStateStore.setQuestStatus(newQuestStatus)
    } else {
      localStateStore.setQuestStatus({
        activeMissionIndex: 0,
        hideMissionConsole: true,
      })
    }
    // uncomment this after building feature
    localStateStore.setShowBookPicker(false)

    // setState({ showQuestPicker: false })
    initWorld()
  }

  const toggleBookPicker = () => {
    // setState({ showQuestPicker: false })
    const show = localStateStore.getShowBookPicker()
    localStateStore.setShowBookPicker(!show)
  }

  const closeBookPicker = () => {
    localStateStore.setShowBookPicker(false)
  }

  const renderBookPicker = () => {
    return (
      <BookPicker
        closeQuestPicker={closeBookPicker}
        // onChangeWorld={onChangeWorld}
      />
    )
  }

  const renderButtons = () => {
    const isProdRelease = localStateStore.getIsProdRelease()

    const path = "/quests"
    return (
      <div className={css.floatingButtons}>
        <ButtonGroup color="primary">
          {!isProdRelease && (
            <Button onClick={toggleBookPicker}>Pick a Book of Quests...</Button>
          )}
        </ButtonGroup>
      </div>
    )
  }

  console.log("")
  console.log("main story render")

  const { className } = props

  if (!world || !world.title) {
    return null
  }

  // const activeSceneId = localStorage.activeSceneId
  // const activeScene = localStateStore.getActiveScene({ world, activeSceneId })
  const activeScene = localStorage.activeScene

  if (!activeScene) {
    return null
  }

  return (
    <div className={`${css.main} ${className}`}>
      <div>
        <div>
          <h1>Number: {localStorage.number}</h1>
          <button onClick={increaseNumber}>+1</button>
        </div>
      </div>
      {renderButtons()}
      <StoryMode
        updateActiveScene={updateActiveScene}
        activeScene={activeScene}
        world={world}
        // openQuestPicker={openQuestPicker}
      />
      {/* {!isProdRelease && showBookPicker && renderBookPicker()} */}
    </div>
  )
}
