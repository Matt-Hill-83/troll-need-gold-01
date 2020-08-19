import _get from "lodash.get"
import { ButtonGroup, Button, Dialog } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import cx from "classnames"
import React from "react"

import { maps, books } from "../../Stores/InitStores.js"
import BookTableOfContents from "../BookTableOfContents/BookTableOfContents.js"
import Images from "../../images/images.js"
import Utils from "../../Utils/Utils.js"
import WorldMultiPicker2 from "../WorldMultiPicker2/WorldMultiPicker2.js"

import css from "./BookPicker.module.scss"

class BookPicker extends React.Component {
  state = {
    showBookBuilder: false,
    selectedBook: books.docs[0],
    showBookEditor: false,
    questToEdit: null,
    jsonUnderEdit: "null",
  }

  changeSelectedBook = ({ bookId }) => {
    const selectedBook = Utils.getBookFromId({ id: bookId })

    this.setState({
      selectedBook,
    })
  }

  editBook = ({ selectedBook }) => {
    this.setState({
      showBookBuilder: !this.state.showBookBuilder,
      jsonUnderEdit: selectedBook.data,
      selectedBook,
    })
  }

  onCloseBookBuilder = () => {
    this.setState({
      showBookBuilder: false,
      selectedBook: books.docs[0] || {},
    })
  }

  onChangeJSON = (json) => {
    this.setState({ jsonUnderEdit: json })
  }

  updateTime = () => {
    const time = new Date().toISOString()

    this.setState({
      // This is updating the wrong object
      json: Object.assign({}, this.state.json, { time }),
    })
  }

  saveBookChanges = ({ selectedBook, bookId }) => {
    this.setState({ showBookBuilder: false })
    this.updateBook({ newProps: selectedBook, bookId })
  }

  renderChapterView = () => {
    const { showBookBuilder, selectedBook, jsonUnderEdit } = this.state
    const { id: bookId } = selectedBook
    const { chapters, name } = selectedBook.data

    const isProdRelease = false

    const worldMultiPickerProps = {
      selectedWorlds: chapters || [],
      allWorlds: maps,
      bookId,
      onClose: ({ selectedItems }) => {
        const newChapters = selectedItems.map((item) => item.id)
        const newProps = { chapters: newChapters }
        this.updateBook({ newProps, bookId })
      },
    }

    const bookTableOfContents01 = Images.backgrounds["bookTableOfContents01"]
    return (
      <div className={css.chapterView}>
        <div className={css.selectedBook}>name {name}</div>
        <img
          className={cx(css.bookTableOfContents01)}
          src={bookTableOfContents01}
          alt={"imagex"}
        />
        <BookTableOfContents
          selectedBook={selectedBook}
          onChangeWorld={this.props.onChangeWorld}
        />
        {!isProdRelease && (
          <ButtonGroup className={css.buttonGroup} color="primary">
            <Button
              onClick={() => this.editBook({ selectedBook })}
              icon={IconNames.EDIT}
            />
            <Button
              onClick={(event) =>
                this.onDeleteBook({ book: selectedBook, event })
              }
              icon={IconNames.TRASH}
            />
          </ButtonGroup>
        )}
        <Dialog
          canEscapeKeyClose={true}
          canOutsideClickClose={true}
          isCloseButtonShown={true}
          isOpen={showBookBuilder}
          onClose={this.onCloseBookBuilder}
          title={"Edit Book"}
        >
          <div className="contents">
            {/* <JSONEditorDemo
              json={jsonUnderEdit}
              onChangeJSON={this.onChangeJSON}
            /> */}
          </div>
          <WorldMultiPicker2 props={worldMultiPickerProps}></WorldMultiPicker2>
          <Button
            className={css.playButton}
            onClick={() =>
              this.saveBookChanges({ selectedBook: jsonUnderEdit, bookId })
            }
          >
            Save Changes
          </Button>
        </Dialog>
      </div>
    )
  }

  onDeleteBook = async ({ book }) => {
    await book.delete()
    this.setState({ selectedBook: books.docs[0] || null })
  }

  onClose = async ({ book }) => {
    this.setState({ questToEdit: book, showBookEditor: true })
  }

  updateBook = async ({ bookId, newProps }) => {
    const bookUnderEdit = books.docs.find((item) => item.id === bookId)

    Object.assign(bookUnderEdit.data, newProps)
    await bookUnderEdit.update(bookUnderEdit.data)
  }

  addBook = async () => {
    const newBook = {
      name: "new book",
      chapters: [],
      imageName: "bookCover01BatOfDoom",
    }
    await books.add(newBook)
  }

  onChooseQuests = async ({ book }) => {
    this.setState({ questToEdit: book, showBookEditor: true })
  }

  render() {
    const isProdRelease = false

    const {} = this.props

    const sortedBooks = Utils.sortDataByNestedKey({
      data: books.docs,
      keys: ["data", "name"],
      order: "ASC",
    })

    const renderedBookList = sortedBooks.map((book) => {
      const bookItem = book.data
      const title = bookItem.name

      const bookId = book.id
      const bookImage = Images.backgrounds[bookItem.imageName]

      const renderedBook = (
        <div
          onClick={() => this.changeSelectedBook({ bookId })}
          className={css.questRow}
        >
          <div className={cx(css.tableCell)}>
            <div className={cx(css.questName)}>{title}</div>
            <img className={css.bookImage} src={bookImage} alt={"imagex"} />
          </div>
        </div>
      )
      return renderedBook
    })

    const backgroundImage = Images.backgrounds["meadow"]

    return (
      <Dialog isOpen={true} isCloseButtonShown={true} className={css.main}>
        <img
          className={css.backgroundImage}
          src={backgroundImage}
          alt={"imagex"}
        />

        <div className={css.questPage}>
          {/* <div className={css.header}>
            <span className={css.gameTitle}>Troll Need Gold</span>
          </div> */}

          <div className={css.content}>
            <div className={css.questTable}>
              <div className={css.scrollArea}>{renderedBookList}</div>
            </div>
            {this.renderChapterView()}
          </div>

          <Button className={css.addBookButton} onClick={this.addBook}>
            Add Book
          </Button>
        </div>
      </Dialog>
    )
  }
}

export default BookPicker
