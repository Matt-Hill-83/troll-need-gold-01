import _get from "lodash.get"
import { Button, Icon, TextArea } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"

import cx from "classnames"
import React, { Component } from "react"

import CrudMachine from "../CrudMachine/CrudMachine"
import Images from "../../../Common/Images/images"
import ImageDisplay from "../../../Common/Components/ImageDisplay/ImageDisplay"
import Character from "../../../Common/Components/Character/Character"
import Head from "../../../Common/Components/Head/Head"

import css from "./Frame.module.scss"
class Frame extends Component {
  state = {
    showFacePicker: false,
    showItemPicker: false,
  }

  componentWillMount() {
    const { frameIndex, scene = {} } = this.props
    const frameSet = scene.frameSet
    const frame = frameSet && frameSet.frames && frameSet.frames[frameIndex]

    this.setState({ frame })
  }

  componentWillReceiveProps(newProps) {
    const { frameIndex, scene = {} } = newProps
    const frameSet = scene.frameSet
    const frame = frameSet && frameSet.frames && frameSet.frames[frameIndex]
    this.setState({ frame })
  }

  deleteFrame = async () => {
    const { deleteFrame, frameIndex } = this.props
    await deleteFrame({ frameIndex })
  }

  // cloneFrame = async () => {
  //   const { cloneFrame, frameIndex } = this.props
  //   await cloneFrame({ frameIndex })
  // }

  selectHead = ({ name, head }) => {
    const { updateFrameSet } = this.props

    const {
      frame,
      frame: { faces },
    } = this.state

    const thisFace = faces.find((face) => face.character === name)
    thisFace.face = head.mood

    //  /TODO - chage to update world maybe?
    updateFrameSet({})

    this.setState({ frame })
    this.toggleFacePicker({})
  }

  onSelectItem = ({ itemId, name }) => {
    this.toggleItemPicker({})
  }

  renderFacePicker = ({ character }) => {
    const girlImages = Images.posableCharacters
    const images = girlImages.find((girl) => girl.name === character)

    // For characters with no posable images
    if (!images) return null

    const {
      images: { heads },
    } = images

    const headImages = heads.map((head, headIndex) => {
      return (
        <div
          className={css.girlHead}
          key={headIndex}
          onClick={() => this.selectHead({ head, name: character })}
        >
          <Head name={character} head={head} />
        </div>
      )
    })

    return (
      <div className={css.girlPickerContainer}>
        <div className={css.girlPicker}>{headImages}</div>
      </div>
    )
  }

  toggleFacePicker = ({ character }) => {
    const showFacePicker = !this.state.showFacePicker
    this.setState({ showFacePicker, facePickerCharacter: character })
  }

  toggleItemPicker = ({ item = null }) => {
    const showItemPicker = !this.state.showItemPicker
    this.setState({ showItemPicker, itemPickerItem: item })
  }

  renderNarrative = () => {
    const { frame } = this.state
    console.log("frame", frame) // zzz
    const { story = [] } = frame

    if (!story.length || !story[0]) return null
  }

  renderDialog = () => {
    const { frame } = this.state
    const dialog = (frame && frame.dialog) || []
    console.log("dialog", dialog) // zzz

    const renderedDialogs = dialog.map((line, lineIndex) => {
      const { text, characterIndex = 1 } = line

      const className = `character${characterIndex}`
      const characterName = line.character || ""

      return (
        <div className={css.textAreaWrapper}>
          <div className={cx(css.characterNameContainer)}>
            <span className={css.characterName}>{characterName}</span>
          </div>
          <TextArea
            className={`${css.line} ${css[className]}`}
            onChange={(event) => this.onChangeDialog({ event, lineIndex })}
            id="text-input"
            value={text}
            onBlur={(event) => this.saveDialog({ event })}
          />
        </div>
      )
    })

    return <div className={css.dialog}>{renderedDialogs}</div>
  }

  onChangeDialog = ({ event, lineIndex }) => {
    const { frame } = this.state
    const dialog = (frame && frame.dialog) || []

    const newLine = event.target.value
    if (dialog[lineIndex]["text"]) {
      dialog[lineIndex]["text"] = newLine
    } else {
      frame.dialog[lineIndex] = { text: newLine }
    }
    this.setState({ frame })
  }

  getMood = ({ name, faces }) => {
    let mood = "ok"
    const newMood = faces && faces.find((face) => face.character === name)
    mood = (newMood && newMood.face) || mood
    return mood
  }

  saveDialog = async (event) => {
    if (event && !event.value) {
      return
    }

    const { updateMap } = this.props
    await updateMap({})
  }

  onChangeNarrative = ({ event, lineIndex }) => {
    const { frame } = this.state
    const newLine = event.target.value
    frame.story[lineIndex] = newLine
    this.setState({ frame })
  }

  renderLocationImage = () => {
    const { scene = true } = this.props
    const locationImage = Images.all[_get(this.props, "scene.location.name")]

    return (
      <div className={css.locationImageContainer}>
        <img className={css.locationImage} src={locationImage} alt={"imagex"} />
        <span className={`${css.locationLabel}`}>{scene.name}</span>
      </div>
    )
  }

  saveItems = async () => {
    const { frame } = this.state
    const { updateMap } = this.props

    this.setState({ frame }, () => updateMap({}))
  }

  renderCharacters = () => {
    const { frame } = this.state
    const { faces = [] } = frame
    if (!frame) return null

    const allCharacters = frame.critters1.map((item) => item.name) || []

    return allCharacters.map((friend, index) => {
      const mood = this.getMood({ name: friend, faces })

      return (
        <div className={`${css.characterContainer}`} key={index}>
          <div onClick={() => this.toggleFacePicker({ character: friend })}>
            <Character
              showHeadOnly={true}
              name={friend}
              mood={mood}
              isEditMode={true}
            />
          </div>
        </div>
      )
    })
  }

  renderFrame = () => {
    console.log("renderFrame") // zzz
    const { frame } = this.state
    if (!frame) return null

    const renderedFriends = this.renderCharacters()

    return (
      <div className={`${css.scenes}`}>
        <div className={css.relativePositionedContent}>
          <div className={css.wordsContainer}>
            {this.renderNarrative()}
            {this.renderDialog()}
          </div>

          <div className={css.imageGroupsContainer}>
            <div className={css.itemsContainer}></div>
            <div>Scene.characters, will be overridden by Frame.characters</div>
            <div className={css.charactersContainer}>{renderedFriends}</div>
          </div>
        </div>
      </div>
    )
  }

  renderCritters = ({ imageSet }) => {
    if (!imageSet) return null

    const renderedImages = Object.keys(imageSet).map((key, index) => {
      const image = imageSet[key]

      return (
        <div
          className={css.itemImageContainer}
          key={index}
          onClick={() => this.selectItem({ name: key })}
        >
          <span className={css.itemLabel}>{key}</span>
          <img className={css.itemImage} src={image} alt={"imagex"} />
        </div>
      )
    })

    return (
      <div className={css.girlPickerContainer}>
        <div className={css.girlPicker}>{renderedImages}</div>
      </div>
    )
  }

  render() {
    // const { scene } = this.props

    const { frame, showFacePicker, facePickerCharacter } = this.state

    if (!frame) {
      return null
    }

    const { critters1 = [], critters2 = [] } = frame

    const itemRenderer = ({ item }) => {
      return <ImageDisplay item={item} />
    }

    return (
      <div className={`${css.main}`}>
        <div className={` ${css.scenesContainer}`}>
          {this.renderFrame()}

          <CrudMachine
            className={css.crudMachine}
            items={critters1}
            itemRenderer={itemRenderer}
            saveItems={this.saveItems}
            title={"critters1"}
          />

          <CrudMachine
            className={css.crudMachine}
            items={critters2}
            itemRenderer={itemRenderer}
            saveItems={this.saveItems}
            title={"critters2"}
          />

          <Button className={css.closeButton} onClick={this.deleteFrame}>
            X
          </Button>
        </div>
        {showFacePicker && (
          <div className={css.girlPickersContainer}>
            {this.renderFacePicker({ character: facePickerCharacter })}
            <Button
              className={css.closeFacePickerButton}
              onClick={() => this.toggleFacePicker({})}
            >
              <Icon icon={IconNames.CROSS} />
            </Button>
          </div>
        )}
      </div>
    )
  }
}

export default Frame
