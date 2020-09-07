import _get from "lodash.get"
import { ButtonGroup, Button, Dialog } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import cx from "classnames"
import React, { useState, useEffect } from "react"

// import { maps, books } from "../../Stores/InitStores.js"
import BookTableOfContents from "../BookTableOfContents/BookTableOfContents.js"
import Images from "../../images/images.js"
import Utils from "../../Utils/Utils.js"
import WorldMultiPicker2 from "../WorldMultiPicker2/WorldMultiPicker2.js"

import css from "./BookPicker.module.scss"

let maps = []
const books = [
  {
    id: "888",
    name: "test",
    imageName: "bookCover01BatOfDoom",
    chapters: [
      "4NB2bhzIpQZCc5801Ju0",
      "Y6lTC5po2Pt0vXIwFRA8",
      "phSGKxjTKM0HBm5xO4Mv",
    ],
  },
]

export default function BookPicker(props) {
  maps = props.maps || []
  console.log("maps", maps) // zzz
  console.log("books", books) // zzz

  useEffect(() => {
    console.log("onMount-------------------------------->>>>")
    console.log("props", props) // zzz
    maps = props.maps

    // returned function will be called on component unmount
    return () => {
      console.log("unmount")
    }
  }, [])

  // on change in props
  useEffect(() => {
    console.log("new props =================================>>>>>")
    maps = props.maps
  }, [props.maps])

  const [showBookBuilder, setShowBookBuilder] = useState(false)
  const [selectedBook, setSelectedBook] = useState(books[0])
  const [showBookEditor, setshowBookEditor] = useState(false)
  const [questToEdit, setQuestToEdit] = useState(null)
  const [jsonUnderEdit, setJsonUnderEdit] = useState("null")

  const state = {
    showBookBuilder: false,
    selectedBook: books[0],
    showBookEditor: false,
    questToEdit: null,
    jsonUnderEdit: "null",
  }

  const changeSelectedBook = ({ bookId }) => {
    const selectedBook = Utils.getBookFromId({ id: bookId })
    setSelectedBook(selectedBook)
    setState({
      selectedBook,
    })
  }

  const setState = () => {}

  const editBook = ({ selectedBook }) => {
    setState({
      showBookBuilder: !state.showBookBuilder,
      jsonUnderEdit: selectedBook,
      selectedBook,
    })
  }

  const onCloseBookBuilder = () => {
    setState({
      showBookBuilder: false,
      selectedBook: books[0] || {},
    })
  }

  const onChangeJSON = (json) => {
    setState({ jsonUnderEdit: json })
  }

  const updateTime = () => {
    const time = new Date().toISOString()

    setState({
      // This is updating the wrong object
      json: Object.assign({}, state.json, { time }),
    })
  }

  const saveBookChanges = ({ selectedBook, bookId }) => {
    setState({ showBookBuilder: false })
    updateBook({ newProps: selectedBook, bookId })
  }

  const renderChapterView = () => {
    const { showBookBuilder, selectedBook, jsonUnderEdit } = state
    const { id: bookId } = selectedBook
    const { chapters, name } = selectedBook

    // const isProdRelease = true
    const isProdRelease = false

    const worldMultiPickerProps = {
      selectedWorlds: chapters || [],
      allWorlds: maps,
      bookId,
      onClose: ({ selectedItems }) => {
        const newChapters = selectedItems.map((item) => item.id)
        const newProps = { chapters: newChapters }
        updateBook({ newProps, bookId })
      },
    }

    console.log("selectedBook", selectedBook) // zzz

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
          worlds={maps}
          onChangeWorld={props.onChangeWorld}
        />
        {!isProdRelease && (
          <ButtonGroup className={css.buttonGroup} color="primary">
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
        <Dialog
          canEscapeKeyClose={true}
          canOutsideClickClose={true}
          isCloseButtonShown={true}
          // isOpen={showBookBuilder}
          isOpen={true}
          onClose={onCloseBookBuilder}
          title={"Edit Book"}
        >
          <div className="contents">
            {/* <JSONEditorDemo
              json={jsonUnderEdit}
              onChangeJSON={onChangeJSON}
            /> */}
          </div>
          <WorldMultiPicker2 props={worldMultiPickerProps}></WorldMultiPicker2>
          <Button
            className={css.playButton}
            onClick={() =>
              saveBookChanges({ selectedBook: jsonUnderEdit, bookId })
            }
          >
            Save Changes
          </Button>
        </Dialog>
      </div>
    )
  }

  const onDeleteBook = async ({ book }) => {
    await book.delete()
    setState({ selectedBook: books[0] || null })
  }

  const onClose = async ({ book }) => {
    setState({ questToEdit: book, showBookEditor: true })
  }

  const updateBook = async ({ bookId, newProps }) => {
    const bookUnderEdit = books.find((item) => item.id === bookId)

    Object.assign(bookUnderEdit, newProps)
    await bookUnderEdit.update(bookUnderEdit)
  }

  const addBook = async () => {
    const newBook = {
      name: "new book",
      chapters: [],
      imageName: "bookCover01BatOfDoom",
    }
    await books.add(newBook)
  }

  const onChooseQuests = async ({ book }) => {
    setState({ questToEdit: book, showBookEditor: true })
  }

  const isProdRelease = false

  const {} = props

  const sortedBooks = Utils.sortDataByNestedKey({
    data: books,
    keys: ["name"],
    order: "ASC",
  })

  const renderedBookList = sortedBooks.map((book) => {
    // const bookItem = book
    const title = book.name

    const bookId = book.id
    const bookImage = Images.backgrounds[book.imageName]

    const renderedBook = (
      <div
        onClick={() => changeSelectedBook({ bookId })}
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

  // return <div>test----------------------------------</div>

  return (
    <div className={css.main}>
      <img
        className={css.backgroundImage}
        src={backgroundImage}
        alt={"imagex"}
      />

      <div className={css.questPage}>
        <div className={css.header}>
          <span className={css.gameTitle}>Troll Need Gold</span>
        </div>

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

// export default BookPicker
