import useLocalStorage from "../components/TopLevel/useLocalStorage.js"
import TopLevelUtils from "./TopLevelUtils.js"

const Utils2 = () => {
  const {
    localStorage,
    setLocalStorage,
    setLocalStorageProp,
  } = useLocalStorage()

  const test23 = () => {
    console.log("zippy") // zzz
  }

  const findItem = ({ itemsInScene, questStatus, desiredItems = [] }) => {
    console.log("itemsInScene", itemsInScene) // zzz
    // const desiredItems = questStatus.desiredItems || []
    console.log(
      "desiredItems---------------------------->>>>>>>>>>>>>",
      desiredItems
    ) // zzz
    console.log("desiredItems", desiredItems) // zzz
    const { pockets = {} } = questStatus

    const foundItems = []
    desiredItems.forEach((desiredItem) => {
      const foundItem =
        itemsInScene.find((item) => {
          return item.name === (desiredItem && desiredItem.name)
        }) || null
      if (foundItem) {
        foundItems.push(foundItem)
      }
    })

    // TODO: I think I need to do this for each found item
    const foundItem = foundItems[0]
    if (!foundItem) {
      return null
    }

    if (!foundItem.amount) {
      foundItem.amount = 1
    }

    questStatus.pockets = TopLevelUtils.updatePocket({ foundItem, pockets })

    setLocalStorageProp({ questStatus: { ...questStatus } })
    return foundItem
  }

  return {
    test23,
    findItem,
  }
}

export default Utils2
