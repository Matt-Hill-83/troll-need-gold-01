import React, { useState, createContext } from "react"

export const myContext = createContext()

export const MyProvider = (props) => {
  const [localStorage, setLocalStorage] = useState({
    number: 0,

    activeFrameIndex: 0,
    activeMapId: null,
    activeSceneId: null,
    defaultWorldId: null,
    showBookPicker: false,
    showWorldBuilder: false,
  })

  return (
    <myContext.Provider value={[localStorage, setLocalStorage]}>
      {props.children}
    </myContext.Provider>
  )
}
