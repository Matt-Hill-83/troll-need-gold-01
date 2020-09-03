import React, { useEffect } from "react"
import _get from "lodash.get"
import _pick from "lodash.pick"
// import _isEqual from "lodash.isequal"
import { Toaster, Position } from "@blueprintjs/core"

import QuestProgressUtils from "../../Utils/QuestProgressUtils.js"
import QuestVisibilityUtils from "../../Utils/QuestVisibilityUtils.js"
import StoryMode from "../StoryMode/StoryMode"
import TopLevelUtils from "../../Utils/TopLevelUtils.js"
import useGlobalState from "../../../Context/useGlobalState.js"
// import useLocalState from "./useLocalState.js"
import Utils from "../../Utils/Utils.js"
import useUpdateProfileWidget from "./useUpdateProfileWidget.js"

import css from "./TopLevel.module.scss"
import Constants from "../../Utils/Constants/Constants.js"
// import useUtils2 from "../../Utils/useUtils2.js"

// const { test23 } = useUtils2

const toaster = Toaster.create({
  position: Position.TOP,
  className: css.toasterContainer,
  canEscapeKeyClear: true,
})

export default function TopLevel(props) {
  const { className } = props
  let world = props.quest

  const { globalState, setGlobalStateProps } = useGlobalState()
  const { updatePropsIfChanged } = useUpdateProfileWidget()
  // console.log("test", test) // zzz

  // Save this in case I need localStorage
  // const initialLocalState = Constants.getDefaultGameStatus()
  // const { localState, setLocalStateProps } = useLocalState(initialLocalState)

  const { questStatus, userStatus } = globalState

  // on mount
  useEffect(() => {
    console.log("onMount") // zzz

    const defaultUserStatus = Constants.getDefaultUserStatus()
    const keys = Object.keys(defaultUserStatus)

    const newsUserStatus = _pick(questStatus, keys)
    console.log("newsUserStatus", newsUserStatus) // zzz

    // const newsUserStatus = { ...userStatus, pockets: questStatus.pockets }
    console.log("newsUserStatus", newsUserStatus) // zzz
    setGlobalStateProps({
      userStatus: newsUserStatus,
    })
    toaster.clear()
    // returned function will be called on component unmount
    return () => {}
  }, [])

  // on change in props
  useEffect(() => {
    console.log("new props =================================>>>>>")
    world = props.quest
    setGlobalStateProps({ world })
    onChangeWorld()
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

    if (!startScene) return <div>no start scene</div>

    if (!questConfig) {
      setGlobalStateProps({ showMissionConsole: false })
    } else {
      setGlobalStateProps({ showMissionConsole: true })
      const missions = TopLevelUtils.getMissions({ questConfig })

      questStatus.desiredItems =
        missions.map((mission) => !!mission.item && mission.item) || []
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
    setGlobalStateProps({ activeScene })

    questStatus.visitedScenes.push(sceneId)

    if (globalState.showMissionConsole && questConfig) {
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
      const newsUserStatus = { ...userStatus, pockets: questStatus.pockets }
      console.log("newsUserStatus", newsUserStatus) // zzz
      setGlobalStateProps({
        userStatus: newsUserStatus,
      })
    }

    // Set mutated questStatus after mutation is complete
    setGlobalStateProps({ questStatus: { ...questStatus } })

    updatePropsIfChanged({ newProfileProps: userStatus })
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

  if (!world || !world.title) {
    return <div>no world 2</div>
  }

  if (!globalState.activeScene) {
    return <div>no active scene</div>
  }

  return (
    <div className={`${css.main} ${className}`}>
      {/* <useUpdateProfileWidget
        newProfileProps={{ userStatus }}
      ></useUpdateProfileWidget> */}
      <StoryMode updateActiveScene={updateActiveScene} />
    </div>
  )
}
