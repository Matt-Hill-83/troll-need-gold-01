import React, { useState, createContext } from "react"

export const myContext = createContext()

export const MyProvider = (props) => {
  console.log("props", props) // zzz

  console.log("props.children", props.children) // zzz
  const [localStorage, setLocalStorage] = useState({
    number: 0,

    activeFrameIndex: 0,
    activeMapId: null,
    activeSceneId: null,
    defaultWorldId: null,
    showBookPicker: false,
    showWorldBuilder: false,

    // _defaultQuestStatus: {
    //   visitedScenes: [],
    //   completedMissions: [],
    //   lockedScenes: [],
    //   hiddenScenes: [],
    //   cloudedScenes: [],
    //   activeSubQuestIndex: 0,
    //   activeMissionIndex: 0,
    //   pockets: { gold: { amount: 0 } },
    //   desiredItems: [],
    //   questConfig: {
    //     missions: [],
    //   },
    // },
  })

  // const [localStorage, setLocalStorage] = useState({ number: 0, test: 555 })

  return (
    <myContext.Provider value={[localStorage, setLocalStorage]}>
      {props.children}
    </myContext.Provider>
  )
}
