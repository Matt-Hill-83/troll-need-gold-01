import React, { useState, createContext } from "react"
import Constants from "./Common/Constants/Constants"
export const myContext = createContext()

export const MyProvider = (props) => {
  const initialState = Constants.getDefaultGameStatus()
  const [globalState, setGlobalState] = useState(initialState)

  return (
    <myContext.Provider value={[globalState, setGlobalState]}>
      {props.children}
    </myContext.Provider>
  )
}
