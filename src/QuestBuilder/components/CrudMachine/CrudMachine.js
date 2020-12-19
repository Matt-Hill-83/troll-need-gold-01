import {
  Button,
  ButtonGroup,
  Popover,
  PopoverInteractionKind,
} from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import React, { useState, useEffect } from "react"
import cx from "classnames"

import images from "../../../Common/Images/images"
import CharacterPicker from "../CharacterPicker/CharacterPicker"
import ImageDisplay from "../../../Common/Components/ImageDisplay/ImageDisplay"
import Utils from "../../../Common/Utils/Utils"

import css from "./CrudMachine.module.scss"

const DEFAULT_BUTTONS = { trash: true, edit: true, add: true }

const getNewItem = () => {
  const id = Utils.generateUuid()
  return { name: "empty", id }
}

const addItemIfNone = ({ items = [] }) => {
  if (items && !items.length) {
    items.push(getNewItem())
  }
  return items
}

export default function CrudMachine(props) {
  const initialItems = addItemIfNone({ items: [...props.items] })

  const [items, setItems] = useState(initialItems)
  const [showItemPicker, setShowItemPicker] = useState(false)
  const [itemPickerItem, setItemPickerItem] = useState(false)

  useEffect(() => {
    const items = addItemIfNone({ items: [...props.items] })
    setItems(items)
    return () => {}
  }, [])

  useEffect(() => {
    const items = addItemIfNone({ items: [...props.items] })
    setItems(items)
  }, [props.items])

  const setItemsAndSave = ({ items }) => {
    const { saveItems } = props

    const newItems = [...items]
    setItems(items)

    props.items.length = 0
    props.items.push(...newItems)

    saveItems && saveItems()
  }

  const onAddItemBefore = ({ index, event }) => {
    event.stopPropagation()

    const part1 = items.slice(0, index)
    const part2 = items.slice(index)
    const newItem = getNewItem()
    const final = [...part1, newItem, ...part2]

    setItemsAndSave({ items: final })
  }

  const onDeleteItem = ({ index, event }) => {
    event.stopPropagation()

    const part1 = items.slice(0, index)
    const part2 = items.slice(index + 1)
    const final = [...part1, ...part2]

    setItemsAndSave({ items: final })
  }

  const onAddItemAfter = ({ index, event }) => {
    event.stopPropagation()

    const part1 = items.slice(0, index + 1)
    const part2 = items.slice(index + 1)
    const newItem = getNewItem()
    const final = [...part1, newItem, ...part2]

    setItemsAndSave({ items: final })
  }

  const onFlipImage = ({ item, event }) => {
    item.flipImage = !item.flipImage
    event.stopPropagation()

    setItemsAndSave({ items })
  }

  const onEditItem = ({ index, item, event }) => {
    event.stopPropagation()
    toggleItemPicker({ item, index })
  }

  const onSelectItem = ({ name }) => {
    // I should probably ref this item by id
    itemPickerItem.name = name
    setItemPickerItem(itemPickerItem)

    saveChanges()
    toggleItemPicker({})
  }

  const saveChanges = () => {
    const { saveItems } = props

    // swap modified array elements into array reference instead of returning it.
    const test = props.items
    test.splice(0, test.length, ...items)

    saveItems && saveItems()
  }

  const toggleItemPicker = ({ item = null }) => {
    setItemPickerItem(item)
    setShowItemPicker(!showItemPicker)
  }

  const renderButtons = ({ item, index }) => {
    const {
      buttons = DEFAULT_BUTTONS,
      extraButtons = null,
      allowFlipImage = true,
    } = props
    const { edit, add, trash } = buttons

    return (
      <ButtonGroup className={css.buttonsRow} key={index}>
        {add && (
          <Button
            icon={IconNames.ADD}
            className={css.itemButton}
            onClick={(event) => onAddItemBefore({ item, index, event })}
          />
        )}
        {edit && (
          <Button
            icon={IconNames.EDIT}
            className={css.itemButton}
            onClick={(event) => onEditItem({ item, index, event })}
          />
        )}
        <div>{extraButtons ? extraButtons : null}</div>
        {allowFlipImage && (
          <Button
            icon={IconNames.FLAG}
            className={css.itemButton}
            onClick={(event) => onFlipImage({ item, index, event })}
          />
        )}
        {trash && (
          <Button
            icon={IconNames.DELETE}
            className={css.itemButton}
            onClick={(event) => onDeleteItem({ item, index, event })}
          />
        )}
        {add && (
          <Button
            icon={IconNames.ADD}
            className={`${css.itemButton} ${css.addAfter} add-after`}
            onClick={(event) => onAddItemAfter({ item, index, event })}
          />
        )}
      </ButtonGroup>
    )
  }

  const renderItems = () => {
    const defaultItemRenderer = ({ item }) => (
      <ImageDisplay showLabel={true} item={item} />
    )

    const itemRenderer = props.itemRenderer || defaultItemRenderer

    const renderedItems = items.map((item, index) => {
      const isLastItem = index === items.length - 1
      console.log("item", item) // zzz
      return (
        <div
          className={`${css.itemContainer}`}
          key={index}
          onClick={(event) => onEditItem({ item, index, event })}
        >
          <Popover
            className={css.crudMachinePopoverWrapper}
            interactionKind={PopoverInteractionKind.HOVER}
          >
            {itemRenderer({ item })}
            {renderButtons({ item, index, isLastItem })}
          </Popover>
        </div>
      )
    })

    return renderedItems || null
  }

  const { className, classNameCharPicker = "", title = "" } = props
  console.log("images.creatures2animals", images.creatures2animals) // zzz
  console.log("images.creatures4LizAndKat", images.creatures4LizAndKat) // zzz

  console.log("props.imageSets", props.imageSets) // zzz
  const defaultImageSets = [
    images.creatures4LizAndKat,
    images.creatures2animals,
    images.creatures3animals,
    images.locations,
    images.creatures,
    images.vehicles,
    images.items,
  ]

  let imageSets = []
  let characterPicker = null
  if (showItemPicker) {
    // imageSets = defaultImageSets
    imageSets = props.imageSets || defaultImageSets
    characterPicker = (
      <CharacterPicker
        className={classNameCharPicker}
        imageSets={imageSets}
        onClose={toggleItemPicker}
        onSelectItem={onSelectItem}
      />
    )
  }

  return (
    <div className={cx(css.main, { [className]: !!className })}>
      {title}

      {/* TODO - pass in itemsContainer class, that can be used elsewhere without all the buttons? */}
      <div className={css.itemsContainer}>{renderItems()}</div>
      {characterPicker}
    </div>
  )
}
