import { IconNames } from "@blueprintjs/icons"
import _get from "lodash.get"
import { Button, Classes, ButtonGroup } from "@blueprintjs/core"
import { toJS } from "mobx"
import cx from "classnames"
import React, { useEffect, useState } from "react"

import MyTextEditor from "../MyTextEditor/MyTextEditor"
import AddDeleteButtonGroup from "../AddDeleteButtonGroup/AddDeleteButtonGroup"
import css from "./DialogBuilder.module.scss"
import AutoComplete2 from "../AutoComplete2/AutoComplete2"
import Constants from "../../Utils/Constants/Constants"
import Utils from "../../Utils/Utils"
import WorldBuilderUtils from "../../Utils/WorldBuilderUtils"

export default function DialogBuilder({ props }) {
  const [fakeDivs, setFakeDivs] = useState([])

  const { saveItems, world } = props
  const scenes = _get(world, "data.newGrid5") || []

  useEffect(() => {
    setFakeDivs([])
    // on mount

    // returned function will be called on component unmount
    return () => {}
  }, [])

  // on change in props
  useEffect(() => {
    setFakeDivs([])
  }, [props.world])

  const dataParts = {
    content: "",
  }

  let rowNum = { value: 0 }

  const updateTextChanges = ({ content, scenes, metaInfoMap }) => {
    const linesArray = content.split("\n")

    linesArray.forEach((line, lineIndex) => {
      const dataStructureIndices = metaInfoMap[lineIndex]

      if (dataStructureIndices) {
        const newText = line

        const { sceneIndex, frameIndex, dialogIndex } = dataStructureIndices

        const scene = scenes[sceneIndex]
        const frames = _get(scene, "frameSet.frames") || []
        const frame = frames[frameIndex]
        const dialog = frame.dialog[dialogIndex]

        if (dialog !== newText) {
          frame.dialog[dialogIndex].text = newText
        }
      }
    })
    saveItems()
  }

  const renderCritterPicker = ({ dialog, frame }) => {
    const { critters1, critters2 } = frame
    const crittersInFrame = [...critters1, ...critters2]
    const selectedItem = crittersInFrame.find(
      (item) => item.name === dialog.character
    )

    const onChangeCritter = (newValue) => {
      dialog.character = newValue.name
      saveItems()
    }

    const dropDownProps = {
      className: css.sceneDropdown,
      items: crittersInFrame,
      defaultValue: selectedItem,
      getOptionLabel: (option) => _get(option, "name") || "--",
      onChange: onChangeCritter,
    }
    return <AutoComplete2 props={dropDownProps} />
  }

  const getStyles = ({ sceneIndex }) => {
    const colors = Constants.subQuestColors
    const colorIndex = sceneIndex % colors.length
    const backgroundColor = colors[colorIndex]
    return {
      "background-color": `#${backgroundColor}`,
    }
  }

  const addNewRowToTextArea = ({ text, fakeDiv, rowNum, dataParts }) => {
    fakeDivs.push(fakeDiv)
    dataParts.content += `${text}\n`
    rowNum.value++
  }

  const insertDummyRowBetweenFrames = ({
    frameIndex,
    frame,
    frames,
    scene,
    style,
    rowNum,
    dataParts,
  }) => {
    const dummyRowLabel = `${scene.location.name}  - F${frameIndex}`

    const { dialog = [] } = frame

    const renderDuplicateFrameButton = ({}) => {
      return (
        <Button
          onClick={() =>
            onDuplicateFrame({
              rowIndex: frameIndex,
              frames,
              frame,
            })
          }
          // icon={IconNames.ADD}
        >
          Dup
        </Button>
      )
    }

    const renderDeleteFrameButton = ({}) => {
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

    const renderAddDialogRowButton = ({}) => {
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

    const renderJoinFramesButton = ({}) => {
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
          // icon={IconNames.ADD}
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

    const text = dummyRowLabel

    addNewRowToTextArea({ text, fakeDiv, rowNum, dataParts })
  }

  const onDuplicateFrame = ({ rowIndex, frames, frame }) => {
    const newElement = WorldBuilderUtils.getNewFrame({ props: { ...frame } })

    Utils.addArrayElement({
      newElement,
      before: false,
      index: rowIndex,
      array: frames,
    })

    saveItems()
  }

  const onDeleteFrame = ({ rowIndex, frames }) => {
    Utils.deleteArrayElement({ index: rowIndex, array: frames })
    saveItems()
  }

  const onAddDialogRow = ({ rowIndex, before, items }) => {
    const newElement = Constants.getNewDialog()
    Utils.addArrayElement({
      newElement,
      before,
      index: rowIndex,
      array: items,
    })

    saveItems()
  }

  const onDeleteRow = ({ rowIndex, items }) => {
    Utils.deleteArrayElement({ index: rowIndex, array: items })
    saveItems()
  }

  const splitFrame = ({ dialogIndex, frame, frames, frameIndex }) => {
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

    saveItems()
  }

  const joinFrames = ({ rowIndex, frame, frames, prevFrame }) => {
    prevFrame.dialog.push(...frame.dialog)
    Utils.deleteArrayElement({ index: rowIndex, array: frames })

    saveItems()
  }

  const metaInfoMap = {}
  const renderTextAreaRow = ({
    dialog,
    dialogIndex,
    dialogs,
    frame,
    frameIndex,
    frames,
    rowNum,
    sceneIndex,
    style,
  }) => {
    if (dialog.text.length >= 0) {
      const renderSplitFrameButton = ({}) => {
        return (
          <Button
            onClick={() =>
              splitFrame({
                dialogIndex,
                frameIndex,
                frames,
                frame,
              })
            }
          >
            Split
          </Button>
        )
      }

      const moreButtons = [
        renderCritterPicker({ dialog, frame }),
        renderSplitFrameButton({}),
      ]

      metaInfoMap[rowNum.value] = { sceneIndex, frameIndex, dialogIndex }

      const text = `${dialog.text}`
      const fakeDiv = (
        <div className={css.fakeDiv} style={style}>
          <AddDeleteButtonGroup
            props={{
              rowIndex: dialogIndex,
              onDelete: ({ rowIndex }) =>
                onDeleteRow({ items: dialogs, rowIndex }),
              onAdd: ({ rowIndex, before }) =>
                onAddDialogRow({ items: dialogs, rowIndex, before }),
              vertical: false,
              noPopover: true,
              className: css.dialogBuilderButtonGroup,
              moreButtons: moreButtons,
            }}
          />
          <div className={css.emptySpace}></div>
        </div>
      )
      addNewRowToTextArea({ text, fakeDiv, rowNum, dataParts })
    }
  }

  scenes.forEach((scene, sceneIndex) => {
    const frames = _get(scene, "frameSet.frames") || []
    const style = getStyles({ sceneIndex })

    frames.forEach((frame, frameIndex) => {
      insertDummyRowBetweenFrames({
        frameIndex,
        frame,
        frames,
        scene,
        style,
        rowNum,
        dataParts,
      })

      if (!frame.dialog) {
        frame.dialog = []
      }

      frame.dialog.forEach((dialog, dialogIndex) => {
        renderTextAreaRow({
          dialog,
          dialogIndex,
          dialogs: frame.dialog,
          frame,
          frameIndex,
          frames,
          rowNum,
          sceneIndex,
          style,
        })
      })
    })
  })

  const myTextEditorProps = {
    content: dataParts.content,
    className: css.textEditor,
    onSubmit: ({ content }) =>
      updateTextChanges({ content, scenes, metaInfoMap }),
  }

  return (
    <div className={css.main}>
      <div className={css.containerToGetMaxHeight}>
        <div className={css.controlPanel}>{fakeDivs}</div>
        {/* To size the parent container of an absolute div, create a
         dup of the absolute div that is hidden. */}
        {/* <div className={cx(css.controlPanel, css.hidden)}>{fakeDivs}</div> */}
        <MyTextEditor props={myTextEditorProps}></MyTextEditor>
      </div>
    </div>
  )
}
