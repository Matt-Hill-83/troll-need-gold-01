import { useState } from "react"

const useLocalState = () => {
  const [localState, setLocalState] = useState({})

  const setLocalStateProps = (props) => {
    setLocalState((state) => {
      const test = { ...state, ...props }
      return test
    })
  }

  return {
    setLocalStateProps,
    setLocalState,
    localState,
  }
}

export default useLocalState
