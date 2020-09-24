import Utils from "../Utils/Utils.js"
import WorldBuilderUtils from "../../QuestBuilder/Utils/WorldBuilderUtils.js"

export default class Constants {
  static isProdRelease = true
  // static isProdRelease = false

  // static defaultWorldIdNonProdWB = "z8FxlpTrRVEehE6uyXvZ"
  static defaultWorldIdNonProdWB = "qxp5Dm2I3w3F7daVTDbh"
  // static defaultWorldIdNonProdWB = "R0viLtNU0LNDuB1a5hDF"
  // static defaultWorldIdNonProdWB = "2rtgfhGUG7W1mC4Bvrph"
  // static defaultWorldIdNonProdWB = "7aAH3bf667hWs4LYXxlG"
  static allowRecordAudioInProd = true
  // static allowRecordAudioInProd = false

  static featureFlags = {
    recordAudio: this.allowRecordAudioInProd ? true : !this.isProdRelease,
    // recordAudio: true,
  }

  static getNewWorld = ({ props = {} }) => {
    const questConfig = Constants.getNewQuestConfig({ props: {} })
    const defaultProps = {
      gridDimensions: {},
      ignore: false,
      name: "My New Name",
      newGrid5: [],
      questConfig,
      released: true,
      title: "My New Title",
    }

    return { ...defaultProps, ...props }
  }

  static getBlankScene = ({ props }) => {
    const id = Utils.generateUuid()

    const newFrame = WorldBuilderUtils.getNewFrame({})

    const blankScene = {
      location: { name: "blank" },
      id,
      frameSet: { frames: [newFrame] },
    }

    props && Object.assign(blankScene, props)
    return blankScene
  }

  static getDefaultQuestStatus = () => {
    return {
      activeMissionIndex: 0,
      activeMission: undefined,
      cloudedScenes: [],
      completedMissions: [],
      desiredItems: [],
      hiddenScenes: [],
      lockedScenes: [],
      pockets: { gold: { amount: 0 } },
      visitedScenes: [],
    }
  }

  static getDefaultUserStatus = () => {
    return {
      pockets: { gold: { amount: 0 } },
      completedQuests: [],
    }
  }

  static getDefaultGameStatus = () => {
    return {
      activeFrameIndex: 0,
      activeScene: null,
      pocketsLoaded: false,
      questStatus: null,
      showMissionConsole: true,
      userStatus: null,
      world: null,
    }
  }

  static posableCharacters = ["liz2", "kat"]

  static getNewSceneForSuqQuestData = ({ name = "blank" }) => {
    const id = Utils.generateUuid()
    return {
      name,
      id,
      sceneTriggers: [],
    }
  }

  static getNewBook = () => {
    const id = Utils.generateUuid()
    return {
      name: "new book",
      id,
      chapters: [],
      imageName: "bookCover01BatOfDoom",
      releaseToProd: false,
    }
  }

  static getNewSubQuest = ({ name = "new SubQuest" }) => {
    const id = Utils.generateUuid()

    const newSubQuest = {
      id,
      name,
      triggers: [],
      scenes: [this.getNewSceneForSuqQuestData({})],
      missions: [Constants.getNewMission()],
    }
    return newSubQuest
  }

  static getNewQuestConfig = () => {
    const id = Utils.generateUuid()

    return {
      id,
      subQuests: [Constants.getNewSubQuest({})],
    }
  }

  static getNewTrigger = () => {
    const id = Utils.generateUuid()
    return {
      id,
      name: "cloud",
      conditions: [
        {
          currentMission: 0,
        },
      ],
    }
  }

  static getNewMission = () => {
    const id = Utils.generateUuid()
    return {
      id,
      name: "Feed the pig",
      missionType: "giveItemToPerson",
      rewards: [{ amount: 5, name: "gold" }],
      recipient: { name: "pig" },
      item: { name: "fig" },
    }
  }

  static getNewDialog = () => {
    const id = Utils.generateUuid()
    return {
      id,
      character: "empty",
      text: "-----------",
    }
  }

  static neighborPositionsEnum = {
    left: "left",
    right: "right",
    bottom: "bottom",
    top: "top",
  }

  static subQuestColors = [
    "a9def9",
    "d0f4de",
    "e4c1f9",
    "fcf6bd",
    "ffe7bc",
    "ffebf8",
  ]

  static sceneVisibilityPropNames = {
    LOCKED_SCENES: "lockedScenes",
    HIDDEN_SCENES: "hiddenScenes",
    CLOUDED_SCENES: "cloudedScenes",
  }

  static triggers = {
    triggerTypes: {
      LOCK: "lock",
      UNLOCK: "unlock",
      HIDE: "hide",
      UNHIDE: "unhide",
      CLOUD: "cloud",
      UNCLOUD: "uncloud",
      UPDATE_FRAME_SET: "updateFrameSet",
    },
    baseConditions: {
      COMPLETED_MISSION: "completedMission",
      CURRENT_MISSION: "currentMission",
      // not yet implemented
      CURRENT_SUBQUEST: "currentSubQuest",
      COMPLETED_SCENE: "completedScene",
      POCKET_CONTAINS: "pocketContains",
      FRAME_SET_INDEX: "frameSetIndex", // remove this later
    },
  }
}

Constants.triggers.specialConditions = {
  [Constants.triggers.triggerTypes.UPDATE_FRAME_SET]: {
    FRAME_SET_INDEX: "frameSetIndex",
  },
}
