import React, { useContext, useState, useEffect } from "react"
import _get from "lodash.get"
import { Toaster, Position, ButtonGroup, Button } from "@blueprintjs/core"

import Constants from "../../Utils/Constants/Constants.js"
import QuestStatusUtils from "../../Utils/QuestStatusUtils.js"
import StoryMode from "../StoryMode/StoryMode"
import TopLevelUtils from "../../Utils/TopLevelUtils.js"
import useLocalStorage from "./useLocalStorage.js"
import Utils from "../../Utils/Utils.js"
import Utils2 from "../../Utils/Utils2.js"

import css from "./TopLevel.module.scss"

const toaster = Toaster.create({
  position: Position.TOP,
  className: css.toasterContainer,
  canEscapeKeyClear: true,
})

export default function TopLevel(props) {
  const {
    localStorage,
    increaseNumber,
    setLocalStorageProp,
  } = useLocalStorage()

  const { test23, findItem } = Utils2()

  const [topLevelState, setTopLevelState] = useState([])

  const setTopLevelProps2 = (props) => {
    console.log("") // zzz
    console.log("") // zzz
    console.log("setTopLevelProps2---------------------------->") // zzz
    setTopLevelState((state) => {
      const test = { ...state, ...props, test: new Date() }
      return test
    })
    console.log("topLevelState --- just set", topLevelState) // zzz
  }

  console.log("topLevelState", topLevelState) // zzz

  console.log("localStorage-----------------------------------1", localStorage)

  // on mount
  useEffect(() => {
    // returned function will be called on component unmount

    return () => {}
  }, [])

  // on change in props
  useEffect(() => {
    console.log("new props =================================>>>>>")
    onChangeWorld()
  }, [props.quest])

  const updateQuestStatus = ({ theWorld, theActiveScene }) => {
    console.log("updateQuestStatus")
    toaster.clear()

    const activeScene = theActiveScene || localStorage.activeScene
    const { location } = activeScene

    const world = theWorld || localStorage.world

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

    const questStatus = localStorage.questStatus
    const modifiedQuestStatus = QuestStatusUtils.updateSceneVisibilityProps({
      questStatus,
      activeWorld: world,
    })

    setLocalStorageProp({ questStatus: { ...modifiedQuestStatus } })

    //TODO:  Do I need to udpate questStatus here?
    //TODO:  Do I need to udpate questStatus here?
    //TODO:  Do I need to udpate questStatus here?
  }

  const updateQuestState = ({ itemsInScene, charactersInScene, world }) => {
    const {
      questStatus,
      questStatus: { pockets, completedMissions },
    } = localStorage

    const { questConfig } = world
    const activeMissionIndex = questStatus.activeMissionIndex
    const activeMission = TopLevelUtils.getActiveMission({
      questConfig,
      questStatus,
    })

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

      // remove item from pockets
      const desiredItem = TopLevelUtils.getDesiredItem({ activeMission })
      delete pockets[desiredItem.name]
      questStatus.activeMissionIndex++

      const newPockets = TopLevelUtils.convertItemToObjFormat({
        itemsArray: activeMission.rewards,
      })

      questStatus.pockets = TopLevelUtils.addToPockets({
        newPockets,
        questStatus,
      })

      setLocalStorageProp({ questStatus: { ...questStatus } })
    }

    const test2 = topLevelState
    console.log("test2", test2) // zzz

    const foundItem = findItem({
      itemsInScene,
      questStatus,
      desiredItems: test2,
    })

    TopLevelUtils.removeItemFromDesiredItems({
      itemToRemove: foundItem,
      questStatus,
    })

    return {
      foundItem,
      completedMission: isMissionCompleted ? activeMission : false,
    }
  }

  const updateActiveScene = ({ sceneId, theWorld }) => {
    console.log("updateActiveScene")
    console.log("sceneId", sceneId) // zzz
    const { showMissionConsole, questStatus } = localStorage

    const world = theWorld || localStorage.world
    console.log("world", world) // zzz
    const { questConfig } = world

    const activeScene = TopLevelUtils.getActiveScene({ world, sceneId })
    questStatus.visitedScenes.push(sceneId)

    setLocalStorageProp({ activeScene, activeFrameIndex: 0, questStatus })
    console.log("localStorage ----updateActiveScene", localStorage) // zzz
    if (showMissionConsole && questConfig) {
      updateQuestStatus({ theWorld: world, theActiveScene: activeScene })
    }
  }

  const onChangeWorld = () => {
    console.log("onChangeWorld")
    const world = props.quest
    console.log(
      "world---------------------------------------------------->",
      world
    ) // zzz
    setLocalStorageProp({ world: { ...world } })
    if (!world) {
      return <div>no world</div>
    }
    const { questConfig } = world

    console.log("")
    console.log("-----------------------mapId-------------", world.id)
    toaster.clear()

    const questStatus = { ...Constants.getDefaultQuestStatus() }
    // For some reason, I need to pass world here, because localStorage is not updating correctly.
    const startScene = TopLevelUtils.getTerminalScene({ world })
    if (!startScene) return <div>no start scene</div>

    setLocalStorageProp({ world, activeScene: startScene })
    const test = []
    if (!questConfig) {
      debugger
      setLocalStorageProp({
        showMissionConsole: false,
      })
    } else {
      const missions = TopLevelUtils.getMissions({ questConfig })
      const desiredItems =
        missions.map((mission) => !!mission.item && mission.item) || []
      console.log("desiredItems", desiredItems) // zzz
      console.log("topLevelState", topLevelState) // zzz

      test.push(...desiredItems)
    }
    console.log("test", test) // zzz
    // setDesiredItems({ test })
    setTopLevelState(test)

    console.log("localStorage-----------after DI", localStorage) // zzz
    console.log(
      "localStorage-----------after DI",
      localStorage.questStatus.desiredItems
    ) // zzz
    updateActiveScene({ sceneId: startScene.id, theWorld: world })
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
