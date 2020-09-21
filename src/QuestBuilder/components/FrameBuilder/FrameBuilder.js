import { Button, Icon } from "@blueprintjs/core"

import React, { Component } from "react"

import Frame from "../Frame/Frame"
import { IconNames } from "@blueprintjs/icons"
import WorldBuilderUtils from "../../Utils/WorldBuilderUtils"

import css from "./FrameBuilder.module.scss"

class FrameBuilder extends Component {
  state = {
    frames: [],
    frameSet: "",
  }

  componentWillMount() {
    const { scene } = this.props
    this.setState({ scene })
  }

  componentWillReceiveProps(newProps) {
    const { scene } = newProps
    this.setState({ scene })
  }

  getNewFrame = () => {
    const {
      scene: { characters = [] },
    } = this.state

    return WorldBuilderUtils.getNewFrame({ characters: characters })
  }

  onAddFrame = async () => {
    const {
      scene: { frameSet },
    } = this.state
    const { updateMap } = this.props

    const newFrame = WorldBuilderUtils.getNewFrame({})
    frameSet.frames.push(newFrame)

    await updateMap({})
  }

  updateFrameSet = async () => {
    const { updateMap } = this.props
    const frameSet = this.state

    updateMap({})
    this.setState({ frameSet })
  }

  deleteFrame = async ({ frameIndex }) => {
    const {
      scene,
      scene: {
        frameSet: { frames },
      },
    } = this.state

    const { updateMap } = this.props
    frames.splice(frameIndex, 1)

    await updateMap({})
    this.setState({ scene })
  }

  onPressDelete = async ({ item }) => {
    if (this._deleting) return
    this._deleting = true
    try {
      await item.delete()
      this._deleting = false
    } catch (err) {
      this._deleting = false
    }
  }

  getFrameSet = () => {
    return (this.state.scene && this.state.scene.frameSet) || {}
  }

  renderFrames = () => {
    const { scene, updateMap } = this.props

    if (!scene.frameSet) {
      scene.frameSet = { frames: [WorldBuilderUtils.getNewFrame()] }
    }

    let frames = scene?.frameSet?.frames || []

    return frames.map((frame, index) => {
      return (
        <Frame
          frame={frame}
          scene={scene}
          updateFrameSet={this.updateFrameSet}
          deleteFrame={this.deleteFrame}
          frameIndex={index}
          updateMap={updateMap}
        />
      )
    })
  }

  render() {
    const { scene, onExitFrameBuilder } = this.props

    if (!scene) {
      return <div>no scene</div>
    }

    return (
      <div className={css.main}>
        <div className={css.sceneName}>{scene.location.name}</div>
        <div className={css.buttonContainer}>
          <Button className={css.closeButton} onClick={this.onAddFrame}>
            <Icon icon={IconNames.CLOSE} />
            Add Frame
          </Button>
          <Button className={css.closeButton} onClick={onExitFrameBuilder}>
            <Icon icon={IconNames.CLOSE} />
            Close
          </Button>
        </div>
        <div className={css.framesContainer}>{this.renderFrames()}</div>
      </div>
    )
  }
}

export default FrameBuilder
