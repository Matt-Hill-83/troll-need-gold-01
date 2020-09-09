import _get from "lodash.get"
import { ButtonGroup, Button } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import cx from "classnames"
import React, { useState, useEffect } from "react"

import BookTableOfContents from "../BookTableOfContents/BookTableOfContents.js"
import Constants from "../../Utils/Constants/Constants.js"
import Images from "../../images/images.js"
import JSONEditorDemo from "../JsonEdtor/JSONEditorDemo.js"
import Utils from "../../Utils/Utils.js"
import WorldMultiPicker2 from "../WorldMultiPicker2/WorldMultiPicker2.js"

import {
  updateBookInFirestore,
  addBookToFirestore,
} from "../../../app/firestore/firestoreService.js"

import css from "./BookPicker.module.scss"

let worlds = []
let books = []
const { isProdRelease } = Constants

export default function BookPicker(props) {
  worlds = props.worlds || []
  books = props.books || []

  useEffect(() => {
    console.log("onMount-------------------------------->>>>")
    worlds = props.worlds
    books = props.books

    // returned function will be called on component unmount
    return () => {
      console.log("unmount")
    }
  }, [])

  // on change in props
  useEffect(() => {
    console.log("new props =================================>>>>>")
    worlds = props.worlds
  }, [props.worlds])

  const [showBookBuilder, setShowBookBuilder] = useState(false)
  const [selectedBook, setSelectedBook] = useState(books[0])
  const [jsonUnderEdit, setJsonUnderEdit] = useState(null)

  const changeSelectedBook = ({ bookId }) => {
    const selectedBook = Utils.getBookFromId({ id: bookId, books })
    setSelectedBook(selectedBook)
  }

  const releaseToProd = ({ selectedBook }) => {
    selectedBook.releaseToProd = !selectedBook.releaseToProd
    saveBookChanges({ selectedBook, bookId: selectedBook.id })
  }

  const editBook = ({ selectedBook }) => {
    setJsonUnderEdit(selectedBook)
    setShowBookBuilder(true)
    setSelectedBook(selectedBook)
  }

  const onChangeJSON = (json) => {
    setJsonUnderEdit(json)
  }

  const saveBookChanges = ({ selectedBook, bookId }) => {
    const theBookId = bookId || selectedBook.id
    setShowBookBuilder(false)
    updateBook({ newProps: selectedBook, bookId: theBookId })
  }

  const renderChapterView = () => {
    if (!selectedBook) return null

    const { id: bookId, chapters, name } = selectedBook

    const worldMultiPickerProps = {
      selectedWorlds: chapters || [],
      allWorlds: worlds,
      bookId,
      onClose: ({ selectedItems }) => {
        const newChapters = selectedItems.map((item) => item.id)
        const newProps = { chapters: newChapters }
        updateBook({ newProps, bookId })
      },
    }

    const bookTableOfContents01 = Images.backgrounds["bookTableOfContents01"]

    return (
      <div className={css.chapterView}>
        <div className={css.selectedBook}>{name}</div>
        <img
          className={cx(css.bookTableOfContents01)}
          src={bookTableOfContents01}
          alt={"imagex"}
        />
        <BookTableOfContents
          selectedBook={selectedBook}
          worlds={worlds}
          onChangeWorld={props.onChangeWorld}
        />
        {!isProdRelease && (
          <ButtonGroup className={css.buttonGroup} color="primary">
            <Button
              onClick={() => releaseToProd({ selectedBook })}
              // icon={selectedBook.releaseToProd ? IconNames.AIRPLANE : ""}
            >
              {`prod: ${selectedBook.releaseToProd ? "T" : "F"}`}
            </Button>
            <Button
              onClick={() => editBook({ selectedBook })}
              icon={IconNames.EDIT}
            />
            <Button
              onClick={(event) => onDeleteBook({ book: selectedBook, event })}
              icon={IconNames.TRASH}
            />
          </ButtonGroup>
        )}
        {showBookBuilder && (
          <div className={css.bookEditor} title={"Edit Book"}>
            <div className="contents">
              <JSONEditorDemo
                json={jsonUnderEdit}
                onChangeJSON={onChangeJSON}
              />
            </div>
            <WorldMultiPicker2
              props={worldMultiPickerProps}
            ></WorldMultiPicker2>
            <Button
              className={css.playButton}
              onClick={() =>
                saveBookChanges({ selectedBook: jsonUnderEdit, bookId })
              }
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>
    )
  }

  const onDeleteBook = async ({ book }) => {
    // await book.delete()
    setSelectedBook(books[0] || null)
  }

  const updateBook = async ({ bookId, newProps }) => {
    const bookUnderEdit = books.find((item) => item.id === bookId)
    const updatedBook = { ...bookUnderEdit, ...newProps }
    updateBookInFirestore(updatedBook)
  }

  const addBook = async () => {
    const newBook = {
      name: "new book",
      chapters: [],
      imageName: "bookCover01BatOfDoom",
    }
    addBookToFirestore(newBook)
  }

  const sortedBooks = Utils.sortDataByNestedKey({
    data: books,
    keys: ["name"],
    order: "ASC",
  })

  const renderedBookList = sortedBooks.map((book) => {
    const { name, id: bookId } = book
    const bookImage = Images.backgrounds[book.imageName]

    const renderedBook = (
      <div
        onClick={() => changeSelectedBook({ bookId })}
        className={css.questRow}
      >
        <div className={cx(css.tableCell)}>
          <div className={cx(css.questName)}>{name}</div>
          <img className={css.bookImage} src={bookImage} alt={"imagex"} />
        </div>
      </div>
    )
    return renderedBook
  })

  const backgroundImage = Images.backgrounds["meadow"]

  return (
    <div className={css.main}>
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
          {renderChapterView()}
        </div>

        <Button className={css.addBookButton} onClick={addBook}>
          Add Book
        </Button>
      </div>
    </div>
  )
}
