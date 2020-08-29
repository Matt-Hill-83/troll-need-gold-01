import { useContext } from "react"
import { myContext } from "../../../myProvider.js"

const useLocalStorage = () => {
  const [localStorage, setLocalStorage] = useContext(myContext)

  console.log("localStorage", localStorage) // zzz
  // Play a specific track

  const setDesiredItems = (props) => {
    setLocalStorage((prevVal) => {
      const newVal = { ...prevVal, test: props }
      return newVal
    })
  }

  const increaseNumber = () => {
    setLocalStorage((prevVal) => {
      const newVal = { ...prevVal }
      newVal.number += 1
      return newVal
    })
  }

  const setLocalStorageProp2 = (props) => {
    console.log("") // zzz
    console.log("") // zzz
    console.log("setLocalStorageProp2---------------------------->") // zzz
    // console.log("props", props) // zzz
    setLocalStorage((state) => {
      // console.log("state", state) // zzz
      const test = { ...state, ...props, test: new Date() }
      // console.log("test.world", test.world) // zzz
      return test
    })
    console.log("localStorage --- just set", localStorage) // zzz
    // console.log("localStorage --- just set", localStorage.world) // zzz
  }

  return {
    localStorage,
    setLocalStorageProp2,
    setLocalStorage,
    setDesiredItems,
    increaseNumber,
  }
}

export default useLocalStorage
