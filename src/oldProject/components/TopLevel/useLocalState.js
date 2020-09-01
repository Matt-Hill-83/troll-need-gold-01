import { useState } from "react"

const useLocalState = (initialValue) => {
  const [localState, setLocalState] = useState(initialValue)

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
