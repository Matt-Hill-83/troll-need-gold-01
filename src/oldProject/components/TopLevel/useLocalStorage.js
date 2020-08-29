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

  function getState() {
    return localStorage
  }

  function setState(newState) {
    setLocalStorage(newState)
  }

  return {
    localStorage,
    getState,
    setState,
    setLocalStorage,
    setDesiredItems,
  }
}

export default useLocalStorage
