import _get from "lodash.get"
import { Button, ButtonGroup } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import cx from "classnames"
import React, { useEffect } from "react"
import { TextareaAutosize } from "@material-ui/core"

import AddDeleteButtonGroup from "../AddDeleteButtonGroup/AddDeleteButtonGroup"
import AutoComplete2 from "../AutoComplete2/AutoComplete2"

import MyTextEditor from "../MyTextEditor/MyTextEditor"
import Utils from "../../../Common/Utils/Utils"
import WorldBuilderUtils from "../../Utils/WorldBuilderUtils"
import Constants from "../../../Common/Constants/Constants"

import css from "./DialogBuilder2.module.scss"

export default function DialogBuilder2(props) {
  // const simpleView = false
  const simpleView = true || Constants.isProdRelease

  const fakeDivs = []
  const fakeDivs2 = []
  const metaInfoMap = {}
  let content = ""

  const { scene, sceneIndex } = props

  useEffect(() => {
    // on mount

    // returned function will be called on component unmount
    return () => {}
  }, [])

  // on change in props
  useEffect(() => {}, [])

  let rowNum = { value: 0 }

  const localSave = () => {
    props.saveItems()
  }

  const updateTextChanges = ({ content }) => {
    const linesArray = content.split("\n")
    linesArray.forEach((line, lineIndex) => {
      const dataStructureIndices = metaInfoMap[lineIndex]
      if (dataStructureIndices) {
        const newText = line

        const { frameIndex, dialogIndex } = dataStructureIndices

        const frames = scene?.frameSet?.frames || []
        const frame = frames[frameIndex]
        const dialog = frame.dialog[dialogIndex]

        if (dialog !== newText) {
          frame.dialog[dialogIndex].text = newText
        }
      }
    })
    localSave()
  }

  const renderCritterPicker = ({ dialog, frame }) => {
    const { critters1, critters2 } = frame
    const crittersInFrame = [...critters1, ...critters2]
    const selectedItem = crittersInFrame.find(
      (item) => item.name === dialog.character
    )

    const onChangeCritter = (newValue) => {
      dialog.character = newValue.name
      localSave()
    }

    const filteredCritters = crittersInFrame.filter(
      (item) => item.name !== "blank"
    )

    const dropDownProps = {
      className: css.sceneDropdown,
      items: filteredCritters,
      defaultValue: selectedItem,
      getOptionLabel: (option) => _get(option, "name") || "--",
      onChange: onChangeCritter,
    }
    return <AutoComplete2 {...dropDownProps} />
  }

  const getStyles = ({ sceneIndex }) => {
    const colors = Constants.subQuestColors
    const colorIndex = sceneIndex % colors.length
    const backgroundColor = colors[colorIndex]
    return {
      "background-color": `#${backgroundColor}`,
    }
  }

  const addNewRowToTextArea = ({ text, fakeDiv, rowNum }) => {
    fakeDivs.push(fakeDiv)
    const newText = `${text}\n`
    content += newText
    rowNum.value++
  }

  const insertDummyRowBetweenFrames = ({
    frameIndex,
    frames,
    scene,
    style,
    rowNum,
  }) => {
    const frame = frames[frameIndex]

    const dummyRowLabel = `${scene.location.name}  - frame ${frameIndex + 1}`

    const { dialog = [] } = frame

    const renderDuplicateFrameButton = () => {
      return (
        <Button
          onClick={() =>
            onDuplicateFrame({
              rowIndex: frameIndex,
              frames,
              frame,
            })
          }
        >
          Dup
        </Button>
      )
    }

    const renderDeleteFrameButton = () => {
      return (
        <Button
          onClick={() =>
            onDeleteFrame({
              rowIndex: frameIndex,
              frames,
              frame,
            })
          }
          icon={IconNames.Trash}
        >
          Del
        </Button>
      )
    }

    const renderAddDialogRowButton = () => {
      return (
        <Button
          onClick={() =>
            onAddDialogRow({
              items: dialog,
              before: false,
              rowIndex: 0,
            })
          }
          icon={IconNames.ADD}
        >
          dialog
        </Button>
      )
    }

    const renderJoinFramesButton = () => {
      return (
        <Button
          onClick={() =>
            joinFrames({
              rowIndex: frameIndex,
              prevFrame: frames[frameIndex - 1],
              frames,
              frame,
            })
          }
        >
          Join
        </Button>
      )
    }

    const showAddDialogButton = !dialog || dialog.length === 0

    const fakeDiv = (
      <div
        className={`${css.fakeDiv} ${css.frameSeparatorDiv}
   ${frameIndex === 0 ? css.newSceneRow : ""}
   
   `}
        style={style}
      >
        {dummyRowLabel}
        <ButtonGroup className={css.frameButtons}>
          {renderJoinFramesButton({})}
          {renderDuplicateFrameButton({})}
          {renderDeleteFrameButton({})}
          {showAddDialogButton && renderAddDialogRowButton({})}
        </ButtonGroup>
      </div>
    )

    const fakeDiv2 = <div>test</div>
    const fakeDiv3 = (
      <div
        className={`${css.fakeDiv} ${css.frameSeparatorDiv}
   ${frameIndex === 0 ? css.newSceneRow : ""}
   
   `}
        style={style}
      >
        {dummyRowLabel}
        <ButtonGroup className={css.frameButtons}>
          {renderJoinFramesButton({})}
          {renderDuplicateFrameButton({})}
          {renderDeleteFrameButton({})}
          {showAddDialogButton && renderAddDialogRowButton({})}
        </ButtonGroup>
      </div>
    )

    const text = dummyRowLabel

    addNewRowToTextArea({ text, fakeDiv, fakeDiv2, rowNum })
  }

  const onDuplicateFrame = ({ rowIndex, frames, frame }) => {
    const newElement = WorldBuilderUtils.getNewFrame({ props: { ...frame } })

    Utils.addArrayElement({
      newElement,
      before: false,
      index: rowIndex,
      array: frames,
    })

    localSave()
  }

  const onDeleteFrame = ({ rowIndex, frames }) => {
    Utils.deleteArrayElement({ index: rowIndex, array: frames })
    localSave()
  }

  const onAddDialogRow = ({ rowIndex, before, items }) => {
    const newElement = Constants.getNewDialog()
    Utils.addArrayElement({
      newElement,
      before,
      index: rowIndex,
      array: items,
    })

    localSave()
  }

  const onDeleteRow = ({ rowIndex, items }) => {
    Utils.deleteArrayElement({ index: rowIndex, array: items })
    localSave()
  }

  const splitFrame = ({ dialogIndex, frames, frameIndex }) => {
    const frame = frames[frameIndex]
    const newFrame = WorldBuilderUtils.getNewFrame({ props: { ...frame } })
    const dialog1 = frame.dialog.slice(0, dialogIndex)
    const dialog2 = frame.dialog.slice(dialogIndex)

    frame.dialog.length = 0
    frame.dialog.push(...dialog1)
    newFrame.dialog = [...dialog2]

    Utils.addArrayElement({
      newElement: newFrame,
      before: false,
      index: frameIndex,
      array: frames,
    })

    localSave()
  }

  const joinFrames = ({ rowIndex, frame, frames, prevFrame }) => {
    prevFrame.dialog.push(...frame.dialog)
    Utils.deleteArrayElement({ index: rowIndex, array: frames })

    localSave()
  }

  const renderFrameButtons = ({ dialogIndex, dialogs, frameIndex, frames }) => {
    const frame = frames[frameIndex]
    const dialog = dialogs[dialogIndex]

    const renderSplitFrameButton = () => {
      return (
        <Button
          onClick={() =>
            splitFrame({
              dialogIndex,
              frameIndex,
              frames,
            })
          }
        >
          Split
        </Button>
      )
    }

    const moreButtons = [
      renderCritterPicker({ dialog, frame }),
      renderSplitFrameButton(),
    ]

    return (
      <AddDeleteButtonGroup
        props={{
          rowIndex: dialogIndex,
          onDelete: ({ rowIndex }) => onDeleteRow({ items: dialogs, rowIndex }),
          onAdd: ({ rowIndex, before }) =>
            onAddDialogRow({ items: dialogs, rowIndex, before }),
          vertical: false,
          noPopover: true,
          className: css.dialogBuilderButtonGroup,
          moreButtons,
        }}
      />
    )
  }

  const renderDialogRow = ({
    dialogIndex,
    dialogs,
    frameIndex,
    frames,
    rowNum,
    sceneIndex,
    style,
  }) => {
    const dialog = dialogs[dialogIndex]

    if (dialog.text.length >= 0) {
      metaInfoMap[rowNum.value] = { sceneIndex, frameIndex, dialogIndex }
      const text = `${dialog.text}`

      const frameButtons = renderFrameButtons({
        dialogIndex,
        dialogs,
        frameIndex,
        frames,
      })

      const fakeDiv = (
        <div className={css.fakeDiv} style={style}>
          {frameButtons}
          <div className={css.emptySpace}></div>
        </div>
      )

      addNewRowToTextArea({ text, fakeDiv, rowNum })
    }
  }

  const renderDialogRow2 = ({
    dialogIndex,
    dialogs,
    frameIndex,
    frames,
    style,
  }) => {
    const dialog = dialogs[dialogIndex]

    if (dialog.text.length >= 0) {
      const frameButtons = renderFrameButtons({
        dialogIndex,
        dialogs,
        frameIndex,
        frames,
      })

      const text = `${dialog.text}`

      const updateText = ({ dialog, event }) => {
        const newValue = event.target.value
        if (dialog.text !== newValue) {
          dialog.text = newValue
          localSave()
        }
      }

      const fakeDiv2 = (
        <div className={css.fakeDiv} style={style}>
          {frameButtons}
          <TextareaAutosize
            className={css.dialogText}
            rowsMax={4}
            aria-label="maximum height"
            placeholder="Maximum 4 rows"
            defaultValue={text}
            onBlur={(event) => {
              updateText({ event, dialog })
            }}
          />
        </div>
      )
      fakeDivs2.push(fakeDiv2)
    }
  }

  const renderContent = () => {
    const frames = scene?.frameSet?.frames || []
    const style = getStyles({ sceneIndex })

    frames.forEach((frame, frameIndex) => {
      insertDummyRowBetweenFrames({
        frameIndex,
        frames,
        scene,
        style,
        rowNum,
      })

      if (!frame.dialog) {
        frame.dialog = []
      }

      if (simpleView) {
        frame.dialog.forEach((dialog, dialogIndex) => {
          renderDialogRow2({
            dialogIndex,
            dialogs: frame.dialog,
            frameIndex,
            frames,
            rowNum,
            sceneIndex,
            style,
          })
        })
      } else {
        frame.dialog.forEach((dialog, dialogIndex) => {
          renderDialogRow({
            dialogIndex,
            dialogs: frame.dialog,
            frameIndex,
            frames,
            rowNum,
            sceneIndex,
            style,
          })
        })
      }
    })

    const myTextEditorProps = {
      content: content,
      className: css.textEditor,
      onSubmit: ({ content }) => updateTextChanges({ content }),
    }

    if (simpleView) {
      return (
        <div className={css.main}>
          <div className={css.controlPanel2}>{fakeDivs2}</div>
        </div>
      )
    } else {
      return (
        <div className={css.main}>
          <div className={css.containerToGetMaxHeight}>
            <div className={css.controlPanel}>{fakeDivs}</div>
            {/* To size the parent container of an absolute div, create a
           dup of the absolute div that is hidden. */}
            <div className={cx(css.controlPanel, css.hidden)}>{fakeDivs}</div>
            <MyTextEditor props={myTextEditorProps}></MyTextEditor>
          </div>
        </div>
      )
    }
  }

  return renderContent()
}
