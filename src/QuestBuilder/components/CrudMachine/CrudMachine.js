import { Button, Popover, PopoverInteractionKind } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"

import React, { Component } from "react"

import images from "../../images/images"
import CharacterPicker from "../CharacterPicker/CharacterPicker"
import ImageDisplay from "../ImageDisplay/ImageDisplay"
import Utils from "../../../Common/Utils/Utils"

import css from "./CrudMachine.module.scss"

const DEFAULT_BUTTONS = { trash: true, edit: true, add: true }

class CrudMachine extends Component {
  state = {
    items: [],
  }

  componentWillMount() {
    let { items = [] } = this.props
    items = this.addItemIfNone({ items })
    this.setState({ items })
  }

  componentWillReceiveProps(newProps) {
    let { items = [] } = newProps
    items = this.addItemIfNone({ items })
    this.setState({ items: [...items] })
  }

  getNewItem = () => {
    const id = Utils.generateUuid()
    return { name: "empty", id }
  }

  addItemIfNone = ({ items }) => {
    if (items && !items.length) {
      items.push(this.getNewItem())
    }
    return items
  }

  ////////////////////////////
  /////////////     CRUD     ///////////////
  ////////////////////////////

  onAddItemBefore = ({ index, event }) => {
    event.stopPropagation()
    const { items } = this.state

    const part1 = items.slice(0, index)
    const part2 = items.slice(index)
    const newItem = this.getNewItem()
    const final = [...part1, newItem, ...part2]

    const statePropsToSave = { items: final }
    this.setStateAndSave({ statePropsToSave })
  }

  onDeleteItem = ({ index, event }) => {
    event.stopPropagation()
    const { items } = this.state

    const part1 = items.slice(0, index)
    const part2 = items.slice(index + 1)
    const final = [...part1, ...part2]

    const statePropsToSave = {
      [this.props.propNameForItems]: final,
      items: final,
    }

    this.setStateAndSave({ statePropsToSave })
  }

  onAddItemAfter = ({ index, event }) => {
    event.stopPropagation()
    const { items } = this.state

    const part1 = items.slice(0, index + 1)
    const part2 = items.slice(index + 1)
    const newItem = this.getNewItem()
    const final = [...part1, newItem, ...part2]

    const statePropsToSave = { items: final }
    this.setStateAndSave({ statePropsToSave })
  }

  onEditItem = ({ index, item, event }) => {
    event.stopPropagation()
    this.toggleItemPicker({ item, index })
  }

  setStateAndSave = ({ statePropsToSave }) => {
    this.setState({ ...statePropsToSave }, () =>
      this.saveChanges({ statePropsToSave })
    )
  }

  onSelectItem = ({ name }) => {
    const { itemPickerItem } = this.state
    // I should probably ref this item by id
    itemPickerItem.name = name

    this.saveChanges()
    this.toggleItemPicker({})
  }

  saveChanges = () => {
    const { saveItems } = this.props
    const { items } = this.state

    // swap modified array elements into array reference instead of returning it.
    const test = this.props.items
    test.splice(0, test.length, ...items)

    saveItems && saveItems({})
  }

  toggleItemPicker = ({ item = null }) => {
    const showItemPicker = !this.state.showItemPicker
    this.setState({ showItemPicker, itemPickerItem: item })
  }

  renderButtons = ({ item, index }) => {
    const { buttons = DEFAULT_BUTTONS } = this.props
    const { edit, add, trash } = buttons

    return (
      <div className={css.buttonsRow} key={index}>
        {add && (
          <Button
            icon={IconNames.ADD}
            className={css.itemButton}
            onClick={(event) => this.onAddItemBefore({ item, index, event })}
          />
        )}
        {edit && (
          <Button
            icon={IconNames.EDIT}
            className={css.itemButton}
            onClick={(event) => this.onEditItem({ item, index, event })}
          />
        )}
        {trash && (
          <Button
            icon={IconNames.DELETE}
            className={css.itemButton}
            onClick={(event) => this.onDeleteItem({ item, index, event })}
          />
        )}
        {add && (
          <Button
            icon={IconNames.ADD}
            className={`${css.itemButton} ${css.addAfter} add-after`}
            onClick={(event) => this.onAddItemAfter({ item, index, event })}
          />
        )}
      </div>
    )
  }

  renderItems = () => {
    const { items } = this.state

    const defaultItemRenderer = ({ item }) => <ImageDisplay item={item} />
    const itemRenderer = this.props.itemRenderer || defaultItemRenderer

    const renderedItems = items.map((item, index) => {
      const isLastItem = index === items.length - 1

      return (
        <div
          className={`${css.itemContainer}`}
          key={index}
          onClick={(event) => this.onEditItem({ item, index, event })}
        >
          <Popover
            className={css.crudMachinePopoverWrapper}
            interactionKind={PopoverInteractionKind.HOVER}
          >
            {itemRenderer({ item })}
            {this.renderButtons({ item, index, isLastItem })}
          </Popover>
        </div>
      )
    })

    return renderedItems || null
  }

  render() {
    const { showItemPicker } = this.state
    const { className, title = "" } = this.props

    const defaultImageSets = [
      images.creatures,
      images.locations,
      images.vehicles,
      images.items,
    ]

    const imageSets = this.props.imageSets || defaultImageSets

    return (
      <div className={`${css.main} ${className ? className : ""}`}>
        {title}

        {/* TODO - pass in itemsContainer class, that can be used elsewhere without all the buttons? */}
        <div className={css.itemsContainer}>{this.renderItems()}</div>

        {showItemPicker && (
          <CharacterPicker
            isOpen={showItemPicker}
            imageSets={imageSets}
            className={css.test}
            onClose={this.toggleItemPicker}
            onSelectItem={this.onSelectItem}
          />
        )}
      </div>
    )
  }
}

export default CrudMachine
