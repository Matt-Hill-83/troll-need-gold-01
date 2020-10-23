import { ButtonGroup, Button } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import cx from "classnames"
import React, { useState, useEffect } from "react"

import Constants from "../../../Common/Constants/Constants"
import Images from "../../../Common/Images/images"
import JSONEditorDemo from "../JsonEdtor/JSONEditorDemo.js"
import QuestList from "../../../features/questList/QuestList.jsx"
import QuestProgressUtils from "../../Utils/QuestProgressUtils.js"
import WorldMultiPicker2 from "../WorldMultiPicker2/WorldMultiPicker2.js"

import Utils from "../../../Common/Utils/Utils"

import useUpdateProfileWidget from "../TopLevel/useUpdateProfileWidget.js"

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
  const { getCompletedQuests } = useUpdateProfileWidget()

  worlds = props.worlds || []
  books = sortBooks({ books: props.books })

  useEffect(() => {
    // worlds = props.worlds
    // books = sortBooks({ books: props.books })

    // returned function will be called on component unmount
    return () => {}
  }, [])

  // on change in props
  useEffect(() => {
    console.log("new props =================================>>>>>")
    worlds = props.worlds
    books = sortBooks({ books: props.books })
  }, [props.worlds])

  useEffect(() => {
    console.log("new props =================================>>>>>")
    books = sortBooks({ books: props.books })
  }, [props.books])

  const { getProfile } = useUpdateProfileWidget()

  const profile = getProfile()

  const [jsonUnderEdit, setJsonUnderEdit] = useState(null)

  const [showBookEditor, setShowBookEditor] = useState(false)
  const [showUnfiledQuests, setShowUnfiledQuests] = useState(true)
  // const [selectedBook, setSelectedBook] = useState(books[0])
  const sortedBooks = sortBooks({ books })
  const [selectedBook, setSelectedBook] = useState(
    getInitialBook({ books: sortedBooks })
  )

  const changeSelectedBook = ({ bookId }) => {
    setShowBookEditor(false)
    const selectedBook = Utils.getBookFromId({ id: bookId, books })
    setSelectedBook(selectedBook)
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
    if (selectedBook.chapters) {
      selectedBook.chapters.length = 0
    } else {
      selectedBook.chapters = []
    }
    selectedBook.chapters.push(...newChapters)
  }

  const renderChapterView = () => {
    if (!selectedBook) return null

    const allQuestsInAllBooks = Utils.getAllQuestsInAllBooks({ books, worlds })

    // TODO: filter our quest already in books, when feeding book picker
    const { id: bookId, chapters = [], name } = selectedBook

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

    const worldMultiPickerProps = {
      selectedWorlds: chapters || [],
      worldsForPicker,
      worlds,
      updateChapters,
      bookId,
      books,
    }

    const bookTableOfContents01 = Images.backgrounds["bookTableOfContents01"]

    let titlePageImage = "bookCover01BatOfDoom"
    if (selectedBook.titlePageImage) {
      titlePageImage = Images.backgrounds[selectedBook.titlePageImage]
    }

    return (
      <div className={css.chapterView}>
        <div className={css.selectedBook}>{name}</div>
        <img
          className={cx(css.bookTableOfContents01)}
          src={bookTableOfContents01}
          alt={"imagex"}
        />

        <img
          className={cx(css.titlePageImage)}
          src={titlePageImage}
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
            <WorldMultiPicker2 {...worldMultiPickerProps} />
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
    const props = {
      createdAt: Date.now(),
      createdBy: profile?.id || "none",
    }
    addBookToFirestore(Constants.getNewBook(props))
  }

  const hardRefresh = async () => {
    console.log("hardRefresh")
    window.location.reload(true)
  }

  const renderProdBooks = ({ books }) => {
    const prodBooks = getProdBooks({ books })
    return [
      renderBookList({ books: prodBooks.slice(0, 4), showLocks: true }),
      renderBookList({ books: prodBooks.slice(4), showLocks: true }),
    ]
  }

  const renderNonProdBooks = ({ books }) => {
    const nonProdBooks = getNonProdBooks({ books })
    return renderBookList({ books: nonProdBooks })
  }

  const renderBookList = ({ books, showLocks }) => {
    let prevBookCompleted = true

    const renderedList = books.map((book, index) => {
      const { name, id: bookId } = book
      // const bookImage = Images.backgrounds[book.imageName]
      const bookImage = Images.backgrounds["bookSpines01"]

      const truncatedTitle = Utils.trimToDashIfProd({
        isProdRelease,
        title: name,
      })

      const chapters = book?.chapters || []
      const completedQuests = getCompletedQuests()

      const bookIsCompleted = QuestProgressUtils.isBookCompleted({
        chapters,
        completedQuests,
      })

      const lockImage = Images.items["lock02"]

      const onClick = showLocks
        ? () => {}
        : () => releaseToProd({ selectedBook: book })

      const renderedBook = (
        <div
          onClick={() => changeSelectedBook({ bookId })}
          className={css.questRow}
        >
          <div className={cx(css.tableCell)}>
            {!isProdRelease && (
              <ButtonGroup className={css.buttonGroup} color="primary">
                <Button onClick={onClick}>
                  {`${book.releaseToProd ? "T" : "F"}`}
                </Button>
              </ButtonGroup>
            )}
            <div className={cx(css.questName)}>{truncatedTitle}</div>
            <img className={css.bookImage} src={bookImage} alt={"imagex"} />
            {showLocks && !prevBookCompleted && (
              <div className={css.lockImageContainer}>
                <img className={css.lockImage} src={lockImage} alt={"imagex"} />
              </div>
            )}
          </div>
        </div>
      )

      prevBookCompleted = bookIsCompleted
      return renderedBook
    })

    return <div className={css.bookStack}> {renderedList} </div>
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
            Books
            <div className={css.scrollArea}>{renderProdBooks({ books })}</div>
            Not Released
            {!isProdRelease && (
              <div className={css.scrollArea}>
                {renderNonProdBooks({ books })}
              </div>
            )}
          </div>
          {renderChapterView()}
        </div>

        {!isProdRelease && (
          <ButtonGroup className={css.addBookButton}>
            <Button onClick={addBook}>Add Book -- refreshed-6</Button>
            <Button className={css.xxxaddBookButton} onClick={hardRefresh}>
              Hard Refresh
            </Button>
          </ButtonGroup>
        )}
      </div>
    </div>
  )
}

const sortBooks = ({ books }) => {
  const sortedBooks = Utils.sortDataByNestedKey({
    data: books,
    keys: ["name"],
    order: "ASC",
  })

  return sortedBooks
}

const getInitialBook = ({ books }) => {
  const prodBooks = getProdBooks({ books })
  const initialBook = prodBooks[0] || books[0]
  return initialBook
}

const getProdBooks = ({ books }) => {
  return books.filter((item) => item.releaseToProd)
}

const getNonProdBooks = ({ books }) => {
  return books.filter((item) => !item.releaseToProd)
}
