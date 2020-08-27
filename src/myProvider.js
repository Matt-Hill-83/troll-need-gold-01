import React, { useState, createContext } from "react"
import Constants from "./oldProject/Utils/Constants/Constants"

export const myContext = createContext()

export const MyProvider = (props) => {
  const initialState = Constants.getDefaultLocalStorage()
  const [localStorage, setLocalStorage] = useState(initialState)

  return (
    <myContext.Provider value={[localStorage, setLocalStorage]}>
      {props.children}
    </myContext.Provider>
  )
}
