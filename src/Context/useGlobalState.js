import { useContext } from "react"
import { myContext } from "../myProvider"

const useGlobalState = () => {
  const [globalState, setGlobalState] = useContext(myContext)

  const setGlobalStateProps = (props) => {
    setGlobalState((state) => {
      const test = { ...state, ...props }
      console.log("test--------------------->>>>>>>>>>>", test) // zzz
      return test
    })
  }

  return {
    globalState,
    setGlobalStateProps,
    setGlobalState,
  }
}

export default useGlobalState
