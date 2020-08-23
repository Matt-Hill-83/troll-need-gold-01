import React, { useState, createContext } from "react"

export const xyzContext = createContext()

export const XyzProvider = (props) => {
  console.log("props", props) // zzz

  console.log("props.children", props.children) // zzz
  const [number, setNumber] = useState(0)

  return (
    <xyzContext.Provider value={[number, setNumber]}>
      {props.children}
    </xyzContext.Provider>
  )
}
