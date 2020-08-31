import React, { useState, createContext } from "react"
import Constants from "./oldProject/Utils/Constants/Constants"

export const myContext = createContext()

export const MyProvider = (props) => {
  const initialState = Constants.getDefaultGameStatus()
  const [globalStorage, setGlobalStorage] = useState(initialState)

  return (
    <myContext.Provider value={[globalStorage, setGlobalStorage]}>
      {props.children}
    </myContext.Provider>
  )
}
