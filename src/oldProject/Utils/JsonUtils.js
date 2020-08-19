import { toJS } from "mobx"
import _get from "lodash.get"
import Utils from "./Utils.js"
import WorldBuilderUtils from "./WorldBuilderUtils.js"

export default class JsonUtils {
  static addArrayElement = ({ newElement, before, index, array }) => {
    const adder = before === true ? 0 : 1
    array.splice(index + adder, 0, newElement)
  }

  static importWorldFromJson = async ({ newWorld, scenesGrid }) => {
    // await this.addNewWorld()

    const {
      title = "no title",
      description = "none",
      questConfig = { data: "none" },
    } = newWorld

    // I should probably create a new scenesGrid here, based on the required dimensions
    // I should probably create a new scenesGrid here, based on the required dimensions
    // I should probably create a new scenesGrid here, based on the required dimensions
    const sceneDefinitions = newWorld.scenes2 || newWorld.scenes

    // Scene defs from imported json
    sceneDefinitions.forEach((scene, sceneIndex) => {
      const { frames, sceneConfig, frames2 } = scene

      const coordinates = sceneConfig.coordinates || {
        col: sceneIndex,
        row: 0,
      }
      const newSceneProps = {
        coordinates,
        location: { name: scene.title },
      }

      if (scene.id) {
        newSceneProps.id = scene.id
      }

      const newBornScene = Utils.getBlankScene({
        props: newSceneProps,
      })
      if (scene.sceneConfig) {
        Object.assign(newBornScene, scene.sceneConfig)
      }

      newBornScene.frameSet.frames = this.createNewFramesFromJson({
        frames,
        sceneConfig,
      })

      if (frames2 && frames2.length > 0) {
        newBornScene.frameSet.frames2 = this.createNewFramesFromJson({
          frames: frames2,
          sceneConfig,
        })
      }
      scenesGrid[coordinates.row][coordinates.col] = newBornScene
    })

    const newProps = { title: title, description, questConfig }
    return newProps
  }

  static createNewFramesFromJson = ({ frames, sceneConfig }) => {
    // arrays of frames extracted from the json which has an easy to write struture,
    // but need to be transformed.

    // For each frame...
    const newFrames = frames.map((frame) => {
      const { dialogs, frameConfig } = frame
      if (!frameConfig) {
        return []
      }

      // Turn each row of dialog into a json object...
      const newDialogs = this.createNewDialogs({ dialogs })

      const configProps = {}
      if (frameConfig.faces) {
        configProps.faces = frameConfig.faces
      } else {
        configProps.faces = sceneConfig.faces || []
      }

      if (frameConfig.critters1) {
        configProps.critters1 = frameConfig.critters1
      } else {
        const critters1 =
          WorldBuilderUtils.getCritters1New({ frameConfig, sceneConfig }) || []
        configProps.critters1 = critters1.map((item) => {
          return { name: item }
        })
      }

      if (frameConfig.critters2) {
        configProps.critters2 = frameConfig.critters2
      } else {
        const critters2 =
          WorldBuilderUtils.getCritters2New({ frameConfig, sceneConfig }) || []

        configProps.critters2 = critters2.map((item) => {
          return { name: item }
        })
      }

      // and put the properties into the new Frame...
      const newFrame = WorldBuilderUtils.getNewFrame({
        props: { ...configProps, dialog: newDialogs },
      })
      return newFrame
    })

    return newFrames
  }

  static createNewDialogs = ({ dialogs }) => {
    if (!dialogs) {
      return []
    }
    const newDialogs = dialogs.map((sentenceObj) => {
      const itemObj = JSON.parse(sentenceObj)
      const itemKey = Object.keys(itemObj)[0]
      const itemValue = itemObj[itemKey]

      let characterIndex = Utils.getCharacterDialogIndex({
        characterName: itemKey,
      })

      return {
        character: itemKey,
        text: itemValue,
        characterIndex,
      }
    })
    return newDialogs
  }
}
