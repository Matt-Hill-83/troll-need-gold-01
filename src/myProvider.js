import React, { useState, createContext } from "react"

export const myContext = createContext()

export const MyProvider = (props) => {
  console.log("props", props) // zzz

  console.log("props.children", props.children) // zzz
  const [number, setNumber] = useState(0)

  return (
    <myContext.Provider value={[number, setNumber]}>
      {props.children}
    </myContext.Provider>
  )
}
