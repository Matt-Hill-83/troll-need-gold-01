import _get from "lodash.get"
import Constants from "../../Common/Constants/Constants"

export default class QuestVisibilityUtils {
  // update new scene visibility props based on rules in subQuest

  static updateSceneVisibility = ({ questStatus, world }) => {
    const {
      newGrid5,
      questConfig,
      questConfig: { subQuests = null },
    } = world

    const { activeMissionIndex } = questStatus

    if (!subQuests) {
      return
    }

    // For each scene, calculate new visibility props based on conditions defined in triggers
    newGrid5.forEach((scene) => {
      const sceneTriggers = this._getSceneTriggersFromScene({
        sceneId: scene.id,
        questConfig,
      })

      const parentSubQuestIndexFromScene = this._getParentSubQuestIndexFromScene(
        {
          world: world,
          sceneId: scene.id,
        }
      )

      const parentSubQuestFromScene = subQuests[parentSubQuestIndexFromScene]
      const subQuestTriggers = _get(parentSubQuestFromScene, "triggers") || []

      const accumulatedPropertyValuesForSubQuest = this._calcAccumulatedPropertyValues(
        {
          triggers: subQuestTriggers,
          questStatus,
          scene,
          activeMissionIndex,
        }
      )

      const accumulatedPropertyValuesForScene = this._calcAccumulatedPropertyValues(
        {
          triggers: sceneTriggers,
          questStatus,
          scene,
          activeMissionIndex,
        }
      )

      const accumulatedPropertyValuesCombined = {
        ...accumulatedPropertyValuesForSubQuest,
        ...accumulatedPropertyValuesForScene,
      }

      const propertyNames = Object.keys(accumulatedPropertyValuesCombined)

      // Iterate through each accumulated value and update that property in the local store.
      propertyNames.forEach((propertyName) => {
        const value = accumulatedPropertyValuesCombined[propertyName]

        questStatus = this._updateProperty({
          propertyName,
          questStatus,
          sceneId: scene.id,
          value,
        })
      })
    })
    return questStatus
  }

  static _calcAccumulatedPropertyValues = ({
    triggers,
    activeMissionIndex,
    questStatus,
  }) => {
    const triggerTypes = Constants.triggers.triggerTypes

    //  The accumulators store the cumulative value of the props while the evaluators run.
    // Could I replace this with a simple map?
    const propValueAccumulators = {
      sceneIsLocked: {
        value: null,
        propertyName: Constants.sceneVisibilityPropNames.LOCKED_SCENES,
      },
      sceneIsHidden: {
        value: null,
        propertyName: Constants.sceneVisibilityPropNames.HIDDEN_SCENES,
      },
      sceneIsClouded: {
        value: null,
        propertyName: Constants.sceneVisibilityPropNames.CLOUDED_SCENES,
      },
    }

    const evaluateCurrentMission = ({
      activeMissionIndex,
      currentMission,
      falseFunc = () => {},
      trueFunc = () => {},
    }) => {
      if (currentMission >= 0) {
        if (currentMission === activeMissionIndex) {
          trueFunc()
        } else {
          falseFunc()
        }
      }
    }

    const evaluateCompletedMission = ({
      completedMission,
      completedMissions = [],
      trueFunc = () => {},
    }) => {
      if (
        completedMission >= 0 &&
        completedMissions.includes(completedMission)
      ) {
        trueFunc()
      }
    }

    const evaluateAllConditions = ({
      completedMission,
      completedMissions,
      activeMissionIndex,
      currentMission,
      falseFunc,
      trueFunc,
    }) => {
      evaluateCurrentMission({
        activeMissionIndex,
        currentMission,
        falseFunc,
        trueFunc,
      })
      evaluateCompletedMission({
        completedMission,
        completedMissions,
        trueFunc,
      })
    }
    if (triggers && triggers.length > 0) {
      const completedMissions = questStatus.completedMissions
      const lockScene = () => (propValueAccumulators.sceneIsLocked.value = true)
      const unLockScene = () =>
        (propValueAccumulators.sceneIsLocked.value = false)

      const hideScene = () => {
        propValueAccumulators.sceneIsHidden.value = true
      }
      const unHideScene = () => {
        propValueAccumulators.sceneIsHidden.value = false
      }

      const cloudScene = () =>
        (propValueAccumulators.sceneIsClouded.value = true)
      const unCloudScene = () =>
        (propValueAccumulators.sceneIsClouded.value = false)

      triggers.forEach((trigger) => {
        const { conditions = [] } = trigger

        conditions.forEach((condition) => {
          const { currentMission, completedMission } = condition

          if (trigger.name === triggerTypes.LOCK) {
            evaluateAllConditions({
              activeMissionIndex,
              currentMission,
              completedMission,
              completedMissions,
              falseFunc: unLockScene,
              trueFunc: lockScene,
            })
          }
          if (trigger.name === triggerTypes.UNLOCK) {
            evaluateAllConditions({
              activeMissionIndex,
              currentMission,
              completedMission,
              completedMissions,
              trueFunc: unLockScene,
            })
          }
          if (trigger.name === triggerTypes.HIDE) {
            evaluateAllConditions({
              activeMissionIndex,
              currentMission,
              completedMission,
              completedMissions,
              falseFunc: unHideScene,
              trueFunc: hideScene,
            })
          }
          if (trigger.name === triggerTypes.UNHIDE) {
            evaluateAllConditions({
              activeMissionIndex,
              currentMission,
              completedMission,
              completedMissions,
              trueFunc: unHideScene,
            })
          }
          if (trigger.name === triggerTypes.CLOUD) {
            evaluateAllConditions({
              activeMissionIndex,
              currentMission,
              completedMission,
              completedMissions,
              falseFunc: unCloudScene,
              trueFunc: cloudScene,
            })
          }
          if (trigger.name === triggerTypes.UNCLOUD) {
            evaluateAllConditions({
              activeMissionIndex,
              currentMission,
              completedMission,
              completedMissions,
              trueFunc: unCloudScene,
            })
          }
        })
      })
    }

    const output = {}
    const accumulatorKeys = Object.keys(propValueAccumulators)
    accumulatorKeys.forEach((key) => {
      const value = propValueAccumulators[key]

      if (value.value !== null) {
        output[value.propertyName] = value.value
      }
    })

    return output
  }

  static _getParentSubQuestIndexFromScene = ({ world, sceneId }) => {
    if (!world) return 0

    const {
      questConfig: { subQuests = [] },
    } = world
    let parentSubQuest = -1
    subQuests.forEach((subQuest, subQuestIndex) => {
      const subQuestMatch =
        subQuest.scenes &&
        subQuest.scenes.find((scene) => {
          return scene.id === sceneId
        })
      if (subQuestMatch) {
        parentSubQuest = subQuestIndex
      }
    })

    return parentSubQuest
  }

  static _getSceneTriggersFromScene = ({ sceneId, questConfig }) => {
    const allScenes = []

    questConfig.subQuests.forEach((subQuest) => {
      allScenes.push(...subQuest.scenes)
    })

    return allScenes.find((scene) => scene.id === sceneId) || []
  }

  // Data Manupulation --- START
  static _updateProperty = ({ questStatus, sceneId, propertyName, value }) => {
    if (!questStatus[propertyName]) {
      questStatus[propertyName] = []
    }
    if (value === true) {
      // add element to list
      if (!questStatus[propertyName].includes(sceneId)) {
        questStatus[propertyName].push(sceneId)
      }
    } else {
      // remove element from list
      questStatus[propertyName] = questStatus[propertyName].filter(
        (item) => item !== sceneId
      )
    }
    return questStatus
  }

  // Data Manupulation --- END

  // Get property functions --- START
  static isSceneLocked = ({ sceneId, questStatus }) => {
    const { lockedScenes = [] } = questStatus
    return lockedScenes.includes(sceneId) ? true : false
  }

  static isSceneClouded = ({ sceneId, questStatus }) => {
    const { cloudedScenes = [] } = questStatus
    return cloudedScenes.includes(sceneId) ? true : false
  }

  static isSceneHidden = ({ sceneId, questStatus }) => {
    const { hiddenScenes = [] } = questStatus
    return hiddenScenes.includes(sceneId) ? true : false
  }

  static getSubQuestColor = ({ world, sceneId }) => {
    const colors = Constants.subQuestColors

    const parentSubQuestFromScene = this._getParentSubQuestIndexFromScene({
      world,
      sceneId,
    })
    const colorIndex = parentSubQuestFromScene % colors.length
    const backgroundColor = colors[colorIndex]
    const style = {
      "background-color": `#${backgroundColor}`,
    }
    return style
  }

  // Get property functions --- START
}
