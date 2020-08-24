import React, { useContext, useState, useEffect } from "react"
import _get from "lodash.get"
import { Toaster, Position, ButtonGroup, Button } from "@blueprintjs/core"

import { Link } from "react-router-dom"
import { maps } from "../../Stores/InitStores.js"
import BookPicker from "../BookPicker/BookPicker.js"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"
import QuestStatusUtils from "../../Utils/QuestStatusUtils.js"
import StoryMode from "../StoryMode/StoryMode"
import Utils from "../../Utils/Utils"
import { myContext } from "../../../myProvider.js"

import css from "./TopLevel.module.scss"

let useDefaultWorldId
// useDefaultWorldId = true
useDefaultWorldId = false

const toaster = Toaster.create({
  position: Position.TOP,
  className: css.toasterContainer,
  canEscapeKeyClear: true,
})

export default function TopLevel(props) {
  const isProdRelease = localStateStore.getIsProdRelease()
  const [activeScene, setActiveScene] = useState({})
  const activeWorld = props.quest
  const world = props.quest

  const [localStorage, setLocalStorage] = useContext(myContext)

  const increaseNumber = () => {
    setLocalStorage((prevVal) => {
      const newVal = { ...prevVal }
      newVal.number += 1
      return newVal
    })
  }

  useEffect(() => {
    console.log("mount---------------------------->>>>>") // zzz
    console.log("mount---------------------------->>>>>") // zzz
    console.log("props", props) // zzz
    // maps.length = 0
    // maps.push(...props.quests)
    // console.log("maps", maps) // zzz

    // localStateStore.setActiveMapId(mapId)

    // TODO - start cleanup here
    // TODO - start cleanup here
    // TODO - start cleanup here
    // TODO - start cleanup here
    // TODO - start cleanup here

    const defaultWorldId = "GhVDXZV8prb1XmwQVZjx"
    // const defaultWorldId = localStateStore.getDefaultWorldId()

    // if (maps[0]) {
    //   const defaultMap = maps[0]
    //   localStateStore.setActiveMapId(mapId)
    //   const mapId = _get(defaultMap, "id")

    //   if (useDefaultWorldId) {
    //     localStateStore.setActiveMapId(defaultWorldId)
    //   } else {
    //     localStateStore.setActiveMapId(mapId)
    //   }
    // }

    // localStateStore.setShowBookPicker(true)

    init()
    // on mount

    // returned function will be called on component unmount
    return () => {}
  }, [])

  // on change in props
  useEffect(() => {
    console.log("newProps===============================+>>>>>>>>>>>") // zzz
    console.log("newProps===============================+>>>>>>>>>>>") // zzz
    console.log("props", props) // zzz
    // const worldId = _get(props, "match.params.worldId")
    // console.log("worldId", worldId) // zzz
    // // setState({ showQuestPicker: false })

    // if (worldId) {
    //   localStateStore.setActiveMapId(worldId)
    //   init()
    // }
    // init()
  }, [props])

  const componentWillMount = () => {
    // console.log("props", props) // zzz
    // maps.length = 0
    // maps.push(...props.quests)
    // console.log("maps", maps) // zzz
    // const defaultWorldId = "GhVDXZV8prb1XmwQVZjx"
    // // const defaultWorldId = localStateStore.getDefaultWorldId()
    // if (maps[0]) {
    //   const defaultMap = maps[0]
    //   const mapId = _get(defaultMap, "id")
    //   if (useDefaultWorldId) {
    //     localStateStore.setActiveMapId(defaultWorldId)
    //   } else {
    //     localStateStore.setActiveMapId(mapId)
    //   }
    // }
    // localStateStore.setShowBookPicker(true)
    // init()
  }

  const UNSAFE_componentWillReceiveProps = (newProps) => {
    // const worldId = _get(newProps, "match.params.worldId")
    // // setState({ showQuestPicker: false })
    // if (worldId) {
    //   localStateStore.setActiveMapId(worldId)
    //   init()
    // }
  }

  const init = () => {
    console.log("init") // zzz
    // const mapId = localStateStore.getActiveWorldId()
    onChangeWorld({ mapId: activeWorld.id })
  }

  const forceUpdate = () => {
    // setState({ test: Math.random() })
    console.log("forceUpdate---------------------->>>") // zzz
  }

  const getTerminalScene = ({ start = true }) => {
    const map = localStateStore.getActiveWorld()
    const scenesGrid = _get(map, "newGrid5") || []
    const endScene = scenesGrid.find((item) => item.id === map.endSceneId)
    const startScene = scenesGrid.find((item) => item.id === map.startSceneId)
    const terminalScene = start ? startScene : endScene
    const firstScene = scenesGrid[0]
    const lastScene = scenesGrid[scenesGrid.length - 1]
    // If no start and finish scenes are marked, choose some, so the program doesn't break
    return terminalScene || (start ? firstScene : lastScene)
  }

  const initWorld = async () => {
    console.log("initWorld------------------------>>>") // zzz
    console.log("initWorld------------------------>>>") // zzz
    const startScene = getTerminalScene({})
    console.log("startScene", startScene) // zzz
    if (!startScene) return

    localStateStore.setVisitedScenes([])
    updateActiveScene({ sceneId: startScene.id })
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

    // setState({ test: Math.random() })
  }

  const updateQuestStatus = () => {
    toaster.clear()
    const activeScene = localStateStore.getActiveScene()
    const { location } = activeScene

    const activeFrame = localStateStore.getFirstFrame() || {}
    const { critters1 = [], critters2 = [] } = activeFrame

    const { foundItem, completedMission } = localStateStore.updateQuestState({
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
      // QuestStatusUtils.updateSceneVisibilityProps()
    }
    QuestStatusUtils.updateSceneVisibilityProps()

    // setState({ dummy: new Date() })
  }

  const onChangeWorld = ({ mapId }) => {
    console.log("")
    console.log("")
    console.log("-------------------------------------")
    console.log(
      "-----------------------mapId---------------------------",
      mapId
    )
    toaster.clear()

    localStateStore.setActiveMapId(mapId)
    if (!world || !world) {
      return
    }
    const { questConfig } = world
    if (questConfig) {
      const missions = QuestStatusUtils.getActiveSubQuestMissions({
        world,
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
        forceUpdate={forceUpdate}
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
  // const activeWorld = localStateStore.getActiveWorld()

  const { className } = props
  console.log("activeWorld", activeWorld) // zzz

  if (!activeWorld || !activeWorld.title) {
    return null
  }

  // const activeScene = localStateStore.getActiveScene()
  console.log("activeScene", activeScene) // zzz

  if (!activeScene) {
    return null
  }

  // const showBookPicker = localStateStore.getShowBookPicker()
  // const isProdRelease = localStateStore.getIsProdRelease()

  console.log("localStorage", localStorage) // zzz
  console.log("localStorage.number", localStorage.number) // zzz

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
        forceUpdate={forceUpdate}
        // openQuestPicker={openQuestPicker}
      />
      {/* {!isProdRelease && showBookPicker && renderBookPicker()} */}
    </div>
  )
}
