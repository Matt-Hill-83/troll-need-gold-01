import _get from "lodash.get"
import { ButtonGroup, Button } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import cx from "classnames"
import React, { useState, useEffect } from "react"

import Constants from "../../Utils/Constants/Constants.js"
import Images from "../../images/images.js"
import JSONEditorDemo from "../JsonEdtor/JSONEditorDemo.js"
import QuestList from "../../../features/questList/QuestList.jsx"
import Utils from "../../Utils/Utils.js"
import WorldMultiPicker2 from "../WorldMultiPicker2/WorldMultiPicker2.js"

import {
  updateBookInFirestore,
  addBookToFirestore,
  deleteBookInFirestore,
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

  const [showBookEditor, setShowBookEditor] = useState(false)
  const [showUnfiledQuests, setShowUnfiledQuests] = useState(true)
  const [selectedBook, setSelectedBook] = useState(books[0])
  const [jsonUnderEdit, setJsonUnderEdit] = useState(null)

  const changeSelectedBook = ({ bookId }) => {
    setShowBookEditor(false)
    const selectedBook = Utils.getBookFromId({ id: bookId, books })
    setSelectedBook(selectedBook)
    editBook({ selectedBook })
    setShowBookEditor(true)
  }

  const releaseToProd = ({ selectedBook }) => {
    selectedBook.releaseToProd = !selectedBook.releaseToProd
    saveBookChanges({ selectedBook, bookId: selectedBook.id })
  }

  const editBook = ({ selectedBook }) => {
    setJsonUnderEdit(selectedBook)
    setShowBookEditor(!showBookEditor)
    setSelectedBook(selectedBook)
  }

  const onChangeJSON = (json) => {
    setJsonUnderEdit(json)
  }

  const saveBookChanges = ({ selectedBook, bookId }) => {
    const theBookId = bookId || selectedBook.id
    setShowBookEditor(false)
    updateBook({ newProps: selectedBook, bookId: theBookId })
  }

  const toggleShowUnfiledQuests = () => {
    setShowUnfiledQuests(!showUnfiledQuests)
  }

  const updateChapters = ({ newChapters }) => {
    selectedBook.chapters.length = 0
    selectedBook.chapters.push(...newChapters)
  }

  const renderChapterView = () => {
    if (!selectedBook) return null

    const allQuestsInAllBooks = Utils.getAllQuestsInAllBooks({ books, worlds })
    console.log("allQuestsInAllBooks", allQuestsInAllBooks) // zzz

    // TODO: filter our quest already in books, when feeding book picker
    const { id: bookId, chapters, name } = selectedBook

    const booksFromChapters = chapters.map((item) => {
      return worlds.find((world) => {
        return world.id === item
      })
    })

    const filteredBooksFromChapters = booksFromChapters.filter((item) => !!item)

    let worldsForPicker = worlds
    if (!showUnfiledQuests) {
      worldsForPicker = worlds.filter((world) => {
        return !allQuestsInAllBooks.includes(world.id)
      })
    }

    console.log("worlds", worlds) // zzz
    console.log("worldsForPicker", worldsForPicker) // zzz
    const worldMultiPickerProps = {
      selectedWorlds: chapters || [],
      worldsForPicker,
      worlds,
      updateChapters,
      bookId,
      books,
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

        <QuestList
          worlds={filteredBooksFromChapters}
          className={css.questList}
        />

        {!isProdRelease && (
          <ButtonGroup className={css.buttonGroup} color="primary">
            <Button onClick={() => releaseToProd({ selectedBook })}>
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
        {showBookEditor && (
          <div className={css.bookEditor} title={"Edit Book"}>
            <div className="contents">
              <JSONEditorDemo
                json={jsonUnderEdit}
                onChangeJSON={onChangeJSON}
              />
            </div>
            <WorldMultiPicker2 {...worldMultiPickerProps}></WorldMultiPicker2>
            <ButtonGroup className={css.buttonGroup} color="primary">
              <Button
                onClick={() =>
                  saveBookChanges({ selectedBook: jsonUnderEdit, bookId })
                }
              >
                Save Changes
              </Button>
              <Button onClick={() => toggleShowUnfiledQuests()}>
                {`${showUnfiledQuests ? "hide" : "show"} unfiled quests`}
              </Button>
            </ButtonGroup>
          </div>
        )}
      </div>
    )
  }

  const onDeleteBook = async ({ book }) => {
    await deleteBookInFirestore(book.id)
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

  const renderProdBooks = ({ books }) => {
    const prodBooks = books.filter((item) => item.releaseToProd)
    return renderBookList({ books: prodBooks })
  }

  const renderNonProdBooks = ({ books }) => {
    const nonProdBooks = books.filter((item) => !item.releaseToProd)
    return renderBookList({ books: nonProdBooks })
  }

  const renderBookList = ({ books }) => {
    const sortedBooks = Utils.sortDataByNestedKey({
      data: books,
      keys: ["name"],
      order: "ASC",
    })

    return sortedBooks.map((book) => {
      const { name, id: bookId } = book
      const bookImage = Images.backgrounds[book.imageName]

      const renderedBook = (
        <div
          onClick={() => changeSelectedBook({ bookId })}
          className={css.questRow}
        >
          <div className={cx(css.tableCell)}>
            <ButtonGroup className={css.buttonGroup} color="primary">
              {!isProdRelease && (
                <Button onClick={() => releaseToProd({ selectedBook: book })}>
                  {`${book.releaseToProd ? "T" : "F"}`}
                </Button>
              )}
            </ButtonGroup>
            <div className={cx(css.questName)}>{name}</div>
            <img className={css.bookImage} src={bookImage} alt={"imagex"} />
          </div>
        </div>
      )
      return renderedBook
    })
  }

  const backgroundImage = Images.backgrounds["meadow"]

  return (
    <div className={css.main}>
      <img
        className={css.backgroundImage}
        src={backgroundImage}
        alt={"imagex"}
      />

      <div className={css.questPage}>
        <div className={css.content}>
          <div className={css.questTable}>
            <div className={css.scrollArea}>{renderProdBooks({ books })}</div>
            {!isProdRelease && (
              <div className={css.scrollArea}>
                {renderNonProdBooks({ books })}
              </div>
            )}
          </div>
          {renderChapterView()}
        </div>

        {!isProdRelease && (
          <Button className={css.addBookButton} onClick={addBook}>
            Add Book
          </Button>
        )}
      </div>
    </div>
  )
}
