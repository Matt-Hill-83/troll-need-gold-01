import { useContext } from "react"
import { myContext } from "../myProvider"

const useTopLevelStorage = () => {
  const [globalStorage, setGlobalStorage] = useContext(myContext)

  const setGlobalStorageProps = (props) => {
    setGlobalStorage((state) => {
      const test = { ...state, ...props }
      return test
    })
  }

  return {
    globalStorage,
    setGlobalStorageProps,
    setGlobalStorage,
  }
}

export default useTopLevelStorage
