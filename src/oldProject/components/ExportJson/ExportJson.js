import { TextArea } from "@blueprintjs/core"
import React, { Component, useState } from "react"

import cx from "classnames"

import { observer } from "mobx-react"
import { toJS } from "mobx"
import _get from "lodash.get"

import css from "./ExportJson.module.scss"

class ExportJson extends Component {
  state = { text: `{"dumm":5}` }

  onChangeDialog = ({ event, lineIndex }) => {
    const text = event.target.value

    this.setState({ text })
  }

  formatFramesForExport = ({ frames }) => {
    const newFrames = frames.map((oldFrame) => {
      const frameConfig = {
        id: oldFrame.id,
      }
      if (oldFrame.critters1 && oldFrame.critters1.length > 0) {
        frameConfig.critters1 = oldFrame.critters1
      }
      if (oldFrame.critters2 && oldFrame.critters2.length > 0) {
        frameConfig.critters2 = oldFrame.critters2
      }
      if (oldFrame.faces && oldFrame.faces.length > 0) {
        frameConfig.faces = oldFrame.faces
      }

      const newFrame = {
        frameConfig,
      }
      const newDialogs = oldFrame.dialog.map((item) => {
        return `{"${item.character}" : "${item.text}"}`
      })

      newFrame.dialogs = newDialogs
      return newFrame
    })

    return newFrames
  }

  render = () => {
    const { world } = this.props
    if (!world) {
      return null
    }
    const scenesGrid = world.newGrid5
    const { questConfig } = world

    const scenesGridJs = toJS(scenesGrid)
    const newScenesList = []
    scenesGridJs.forEach((scene) => {
      const oldFrames = scene.frameSet.frames
      const oldFrames2 = scene.frameSet.frames2 || []

      // convert the old frames into the new frames
      const newFrames = this.formatFramesForExport({ frames: oldFrames })
      const newFrames2 = this.formatFramesForExport({ frames: oldFrames2 })

      const newBornScene = {
        title: scene.location.name,
        id: scene.id,
        sceneConfig: {
          worldId: world.id,
          coordinates: scene.coordinates,
          ...scene.sceneConfig,
        },
        frames: newFrames,
        frames2: newFrames2,
        faces: scene.frameSet.faces,
      }

      newScenesList.push(newBornScene)
    })

    const output = {
      title: world.title,
      scenes: newScenesList,
      questConfig,
    }

    const flatJson = JSON.stringify(output)

    return (
      <div className={css.main}>
        {flatJson}
        <TextArea
          className={`${css.jsonPaster} }`}
          id="text-input"
          value={flatJson}
        />
      </div>
    )
  }
}

export default observer(ExportJson)
