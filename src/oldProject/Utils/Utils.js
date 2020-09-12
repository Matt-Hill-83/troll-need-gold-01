import _get from "lodash.get"
import { maps, books } from "../Stores/InitStores.js"
import Constants from "./Constants/Constants.js"
export default class Utils {
  static addArrayElement = ({ newElement, before, index, array }) => {
    const adder = before === true ? 0 : 1
    array.splice(index + adder, 0, newElement)
  }

  static isQuestCompleted = ({ questId, completedQuests = [] }) => {
    return completedQuests.includes(questId)
  }

  static getAllQuestsInAllBooks = ({ books, worlds }) => {
    const questsInBooks = {}
    books.forEach((book) => {
      book.chapters.forEach((chapter) => {
        if (!questsInBooks[chapter]) {
          questsInBooks[chapter] = true
        }
      })
    })
    // console.log("questsInBooks", questsInBooks) // zzz
    return Object.keys(questsInBooks)
  }

  static getAllItemsInScene = ({ scene }) => {
    const allItems = []
    scene.frameSet.frames.forEach((item) => {
      allItems.push(...item.critters1, ...item.critters2)
    })
    return allItems
  }

  static getAllItemsInScenes = ({ scenes }) => {
    const allItems = {}
    scenes.forEach((scene) => {
      const items = Utils.getAllItemsInScene({ scene })
      items.forEach((item) => {
        if (!allItems[item.name]) {
          item.sceneId = scene.id
          allItems[item.name] = item
        }
      })
    })
    return Object.values(allItems)
  }

  static getFirstFrame = ({ activeScene }) =>
    _get(activeScene, "frameSet.frames[0]")

  static getSimpleSceneObjects = ({ scenes }) => {
    return scenes.map((scene) => {
      return { name: scene.location.name, id: scene.id }
    })
  }

  static deleteArrayElement = ({ array, index }) => {
    array.splice(index, 1)
  }

  static getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
  }

  static sortWorlds = ({ worlds, keys }) => {
    const sortedWorlds = Utils.sortDataByNestedKey({
      data: worlds,
      keys: keys || ["title"],
      order: "ASC",
    })

    return sortedWorlds
  }

  static belongsToABook = ({ books, worldId }) => {
    // console.log("books---belongsToABook", books) // zzz
    const owningBooks = []

    let bookFound = false
    books.forEach((book) => {
      const belongstoThisBook = book.chapters.includes(worldId)
      if (belongstoThisBook) {
        owningBooks.push(book.name)
        bookFound = true
      }
    })

    return bookFound ? owningBooks : null
  }

  static getItemsFromDbObj = ({ dbList }) => {
    const items = dbList

    const filteredItems = items && items.filter((item) => !item.ignore)
    return filteredItems || []
  }

  static sortDataByKey(data, key, order, tiebreakerKey) {
    const isAscending = order === "ASC"
    return data.sort(function (item1, item2) {
      const val1 = item1[key] ? item1[key].toString().trim().toLowerCase() : ""
      const val2 = item2[key] ? item2[key].toString().trim().toLowerCase() : ""
      if (val1 < val2) {
        return isAscending ? -1 : 1 // Lower if ascending
      } else if (val1 > val2) {
        return isAscending ? 1 : -1 // Higher if ascending
        // for tiebreaker
      } else if (tiebreakerKey) {
        const tiebreakerVal1 = item1[tiebreakerKey]
          ? item1[tiebreakerKey].toString().trim().toLowerCase()
          : ""
        const tiebreakerVal2 = item2[tiebreakerKey]
          ? item2[tiebreakerKey].toString().trim().toLowerCase()
          : ""
        if (tiebreakerVal1 < tiebreakerVal2) {
          return isAscending ? -1 : 1
        } else if (tiebreakerVal1 > tiebreakerVal2) {
          return isAscending ? 1 : -1
        }
      }
      return 0
    })
  }

  // Sorts array of objects based on the value of a deeply nested property.
  // Properties should be ordered sequentially in keys array.
  static sortDataByNestedKey({ data, keys, order }) {
    function getNestedValue(data, keys) {
      let result = data
      keys.forEach((key) => (result ? (result = result[key]) : null))

      return result ? result.toString().toLowerCase() : ""
    }

    const isAscending = order === "ASC"
    return data.sort(function (item1, item2) {
      if (getNestedValue(item1, keys) < getNestedValue(item2, keys)) {
        return isAscending ? -1 : 1 // Lower if ascending
      } else if (getNestedValue(item1, keys) > getNestedValue(item2, keys)) {
        return isAscending ? 1 : -1 // Higher if ascending
      }
      return 0
    })
  }

  static getWorldFromId = ({ id }) => {
    const mapsDocs = maps
    const defaultMap = this.getFirstReleasedMap() || {}

    if (!id) return defaultMap

    const filteredMaps = mapsDocs.filter((map) => map.released)
    const foundMap = filteredMaps
      ? filteredMaps.find((map) => map.id === id)
      : defaultMap

    return foundMap
  }

  static getBookFromId = ({ id, books }) => {
    return books.find((map) => map.id === id)
  }

  static getFirstReleasedMap = () => maps.find((map) => map.released)

  static generateUuid() {
    const sepStr = "-"
    let date = new Date().getTime()
    const uuid = `xxxxxxxx${sepStr}xxxx${sepStr}4xxx${sepStr}yxxx${sepStr}xxxxxxxxxxxx`.replace(
      /[xy]/g,
      (c) => {
        const randNum = (date + Math.random() * 16) % 16 | 0
        date = Math.floor(date / 16)
        return (c === "x" ? randNum : (randNum & 0x3) | 0x8).toString(16)
      }
    )
    return uuid
  }

  static getBlankScene = ({ props }) => {
    const id = Utils.generateUuid()

    const blankScene = {
      location: { name: "blank" },
      id,
    }

    props && Object.assign(blankScene, props)
    return blankScene
  }

  static reCreateGridFromCondensedGrid = ({ gridDimensions, newGrid5 }) => {
    const { numRows, numCols } = gridDimensions

    const maxDimensions = { maxRows: 8, maxCols: 20 }

    const finalRows = Math.min(numRows, maxDimensions.maxRows)
    const finalCols = Math.min(numCols, maxDimensions.maxCols)

    const rows = Array(finalRows).fill(0)
    const columns = Array(finalCols).fill(0)
    const grid = []

    rows.forEach((row, rowIndex) => {
      const gridRow = []
      columns.forEach((col, colIndex) => {
        const coordinates = {
          col: colIndex,
          row: rowIndex,
        }
        const isLastRow = rowIndex === finalRows - 1
        const isLastCol = colIndex === finalCols - 1

        const props = {
          isLastRow,
          isLastCol,
          coordinates,
        }

        const sceneObj =
          newGrid5.find((scene) => {
            if (!scene.coordinates) {
              return Utils.getBlankScene({ props })
            }

            return (
              scene.coordinates.row === rowIndex &&
              scene.coordinates.col === colIndex
            )
          }) || Utils.getBlankScene({ props })

        gridRow.push(sceneObj)
      })
      grid.push(gridRow)
    })

    return grid
  }

  static getNeighbor = ({ coordinates, direction, grid = [] }) => {
    const neighborPositions = {
      [Constants.neighborPositionsEnum.left]: {
        row: coordinates.row,
        col: coordinates.col - 1,
      },
      [Constants.neighborPositionsEnum.right]: {
        row: coordinates.row,
        col: coordinates.col + 1,
      },
      [Constants.neighborPositionsEnum.bottom]: {
        row: coordinates.row + 1,
        col: coordinates.col,
      },
      [Constants.neighborPositionsEnum.top]: {
        row: coordinates.row - 1,
        col: coordinates.col,
      },
    }

    return grid.find((item) => {
      return (
        (item.coordinates.row === neighborPositions[direction]["row"] &&
          item.coordinates.col === neighborPositions[direction]["col"]) ||
        null
      )
    })
  }

  static getNeighbors = ({ coordinates, grid }) => {
    const directions = Object.keys(Constants.neighborPositionsEnum)
    const neighbors = {}

    directions.forEach((direction) => {
      neighbors[direction] = Utils.getNeighbor({
        coordinates,
        grid,
        direction,
      })
    })

    return neighbors
  }

  static getNeighborsAsArray = ({ coordinates, grid }) => {
    const directions = Object.keys(Constants.neighborPositionsEnum)
    const neighbors = []

    directions.forEach((direction) => {
      neighbors.push(
        Utils.getNeighbor({
          coordinates,
          grid,
          direction,
        })
      )
    })

    return neighbors
  }
}
