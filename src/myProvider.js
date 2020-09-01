import React, { useState, createContext } from "react"
import Constants from "./oldProject/Utils/Constants/Constants"

export const myContext = createContext()

export const MyProvider = (props) => {
  // const initialState = { test: 234324 }
  const initialState = Constants.getDefaultGameStatus()
  const [globalState, setGlobalState] = useState(initialState)

  return (
    <myContext.Provider value={[globalState, setGlobalState]}>
      {props.children}
    </myContext.Provider>
  )
}
