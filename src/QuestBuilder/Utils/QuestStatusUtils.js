import _get from "lodash.get"
import Constants from "./Constants/Constants.js"

export default class QuestStatusUtils {
  // update new scene visibility props based on rules in subQuest

  static getActiveSubQuestMissions = ({ world }) => {
    const activeSubQuest = this.getActiveSubQuest({ world })
    return (activeSubQuest && activeSubQuest.missions) || null
  }

  static getSceneTriggerConfigFromScene = ({ sceneId }) => {
    const questConfig = this.getActiveQuestConfig()
    const allScenes = []

    questConfig.subQuests &&
      questConfig.subQuests.forEach((subQuest) => {
        allScenes.push(...subQuest.scenes)
      })

    const foundScene = allScenes.find((scene) => scene.id === sceneId)
    return foundScene || {}
  }

  static getSceneTriggersFromScene = ({ sceneId }) => {
    const foundScene = this.getSceneTriggerConfigFromScene({ sceneId })
    return (foundScene && foundScene.sceneTriggers) || []
  }

  static getSubQuestColor = ({ world, sceneId }) => {
    const colors = Constants.subQuestColors

    const parentSubQuestFromScene = this.getParentSubQuestIndexFromScene({
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
  // Object getter functions --- END

  // Data Manupulation --- END
}
