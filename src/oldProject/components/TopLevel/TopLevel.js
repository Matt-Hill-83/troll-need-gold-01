import React, { useEffect } from "react"
import _get from "lodash.get"
import _pick from "lodash.pick"
import { Toaster, Position } from "@blueprintjs/core"

import QuestProgressUtils from "../../Utils/QuestProgressUtils.js"
import QuestVisibilityUtils from "../../Utils/QuestVisibilityUtils.js"
import StoryMode from "../StoryMode/StoryMode"
import TopLevelUtils from "../../Utils/TopLevelUtils.js"
import useGlobalState from "../../../Context/useGlobalState.js"
import useLocalState from "./useLocalState.js"
import Utils from "../../Utils/Utils.js"
import useUpdateProfileWidget from "./useUpdateProfileWidget.js"
import Constants from "../../Utils/Constants/Constants.js"

import css from "./TopLevel.module.scss"

const toaster = Toaster.create({
  position: Position.TOP,
  className: css.toasterContainer,
  canEscapeKeyClear: true,
})

let isProdRelease
isProdRelease = true
isProdRelease = false

export default function TopLevel(props) {
  console.log("")
  console.log("-----------------------Top Level start------------------")
  const {
    getProfile,
    addQuestToCompletedQuests,
    updateUserStatusPocketsIfChanged,
  } = useUpdateProfileWidget()

  const { className } = props
  let world = props.quest

  console.log("world", world) // zzz

  // Save this in case I need localStorage
  // const initialLocalState = {}
  // const { localState, setLocalStateProps } = useLocalState(initialLocalState)
  const { globalState, setGlobalStateProps } = useGlobalState()
  const { questStatus = null, pocketsLoaded } = globalState

  console.log("pocketsLoaded---------------------------->>>>", pocketsLoaded) // zzz

  // on mount
  useEffect(() => {
    console.log("onMount-------------------------------->>>>") // zzz
    console.log("onMount-------------------------------->>>>") // zzz
    console.log("onMount-------------------------------->>>>") // zzz
    console.log("onMount-------------------------------->>>>") // zzz
    toaster.clear()

    // returned function will be called on component unmount
    return () => {
      console.log("unmount") // zzz
      toaster.clear()
      setGlobalStateProps(Constants.getDefaultGameStatus())
    }
  }, [])

  // on change in props
  useEffect(() => {
    console.log("new props =================================>>>>>")

    world = props.quest
    addSavedPocketsToLocalPockets()
  }, [props.quest])

  const addSavedPocketsToLocalPockets = () => {
    const { userStatus } = getProfile()

    const _questStatus = Constants.getDefaultQuestStatus()
    console.log("_questStatus-----------------props", _questStatus) // zzz
    // move saved pockets to local pockets
    const initialQuestStatus = {
      ..._questStatus,
      pockets: { ...userStatus.pockets },
    }
    console.log("add-gold", _get(initialQuestStatus, "pockets.gold")) // zzz

    setGlobalStateProps({
      pocketsLoaded: true,
      world,
    })

    onChangeWorld({ initialQuestStatus })
  }

  const onChangeWorld = ({ initialQuestStatus }) => {
    const _questStatus = questStatus || initialQuestStatus
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

      _questStatus.desiredItems =
        missions.map((mission) => !!mission.item && mission.item) || []
    }

    updateActiveScene({ sceneId: startScene.id, initialQuestStatus })
  }

  const updateActiveScene = ({ sceneId, initialQuestStatus }) => {
    const _questStatus = questStatus || initialQuestStatus
    console.log("updateActiveScene")

    toaster.clear()

    const { questConfig } = world
    const activeScene = TopLevelUtils.getSceneFromId({
      world,
      sceneId,
    })
    const { isEndScene } = activeScene

    // This preserves activeScene until the next function render
    setGlobalStateProps({ activeScene, activeFrameIndex: 0 })
    _questStatus.visitedScenes.push(sceneId)

    if (globalState.showMissionConsole && questConfig) {
      const { foundItem, completedMission } = updateQuestProgress({
        world,
        activeScene,
        questStatus: _questStatus,
      })

      // mutates questStatus
      QuestVisibilityUtils.updateSceneVisibility({
        questStatus: _questStatus,
        world,
      })

      // TODO: this should probably happen on the appropriate frame.
      displayFoundItemToaster({ foundItem })
      displayCompletedMissionToaster({ completedMission })
      console.log("_questStatus.pockets", _questStatus.pockets) // zzz

      const areAllMissionsCompleted = QuestProgressUtils.areAllMissionsCompleted(
        {
          completedMissions: _questStatus.completedMissions,
          missions: TopLevelUtils.getMissions({ questConfig }),
        }
      )

      if (isEndScene && areAllMissionsCompleted) {
        addQuestToCompletedQuests({ completedQuest: world.id })
      }

      updateUserStatusPocketsIfChanged({
        pockets: { ..._questStatus.pockets },
      })
    }

    // Set mutated questStatus after mutation is complete
    setGlobalStateProps({ questStatus: { ..._questStatus } })
  }

  const updateQuestProgress = ({ world, activeScene, questStatus }) => {
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
      <StoryMode updateActiveScene={updateActiveScene} />
    </div>
  )
}
