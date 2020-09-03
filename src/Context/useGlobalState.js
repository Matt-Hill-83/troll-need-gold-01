import { useContext } from "react"
import { myContext } from "../myProvider"

const useGlobalState = () => {
  const [globalState, setGlobalState] = useContext(myContext)

  const setGlobalStateProps = (props) => {
    setGlobalState((state) => {
      return { ...state, ...props }
    })
  }

  return {
    globalState,
    setGlobalStateProps,
    setGlobalState,
  }
}

export default useGlobalState
