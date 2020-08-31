import { useContext } from "react"
import { myContext } from "../../../myProvider.js"

const useTopLevelStorage = () => {
  const [globalStorage, setGlobalStorage] = useContext(myContext)
  // Play a specific track
  const setDesiredItems = (props) => {
    setGlobalStorage((prevVal) => {
      const newVal = { ...prevVal, test: props }
      return newVal
    })
  }
  const increaseNumber = () => {
    setGlobalStorage((prevVal) => {
      const newVal = { ...prevVal }
      newVal.number += 1
      return newVal
    })
  }
  const setGlobalStorageProp = (props) => {
    setGlobalStorage((state) => {
      const test = { ...state, ...props, test: new Date() }
      return test
    })
  }
  return {
    globalStorage,
    setGlobalStorageProp,
    setGlobalStorage,
    setDesiredItems,
    increaseNumber,
  }
}

export default useTopLevelStorage
