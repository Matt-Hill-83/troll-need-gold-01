import { useContext } from "react"
import { myContext } from "../../../myProvider.js"

const useLocalStorage = () => {
  // const [localStorage, setLocalStorage] = useContext(myContext)
  // console.log("localStorage", localStorage) // zzz
  // // Play a specific track
  // const setDesiredItems = (props) => {
  //   setLocalStorage((prevVal) => {
  //     const newVal = { ...prevVal, test: props }
  //     return newVal
  //   })
  // }
  // const increaseNumber = () => {
  //   setLocalStorage((prevVal) => {
  //     const newVal = { ...prevVal }
  //     newVal.number += 1
  //     return newVal
  //   })
  // }
  // const setLocalStorageProp = (props) => {
  //   console.log("") // zzz
  //   console.log("") // zzz
  //   console.log("setLocalStorageProp---------------------------->") // zzz
  //   setLocalStorage((state) => {
  //     const test = { ...state, ...props, test: new Date() }
  //     return test
  //   })
  //   console.log("localStorage --- just set", localStorage) // zzz
  // }
  // return {
  //   localStorage,
  //   setLocalStorageProp,
  //   setLocalStorage,
  //   setDesiredItems,
  //   increaseNumber,
  // }
}

export default useLocalStorage
