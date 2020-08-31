import TopLevelUtils from "./TopLevelUtils.js"

const Utils2 = () => {
  const findItem = ({ itemsInScene, questStatus, desiredItems = [] }) => {
    console.log("itemsInScene", itemsInScene) // zzz
    console.log("desiredItems----------------->>>>>>>>>", desiredItems) // zzz
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
    console.log("foundItem", foundItem) // zzz
    if (!foundItem) {
      return null
    }

    if (!foundItem.amount) {
      foundItem.amount = 1
    }

    questStatus.pockets = TopLevelUtils.updatePocket({ foundItem, pockets })

    return foundItem
  }

  return {
    findItem,
  }
}

export default Utils2
