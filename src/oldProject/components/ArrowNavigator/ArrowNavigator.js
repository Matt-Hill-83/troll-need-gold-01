import _get from "lodash.get"
import { Button } from "@blueprintjs/core"
import cx from "classnames"
import React, { useContext } from "react"

import Images from "../../images/images"
import Utils from "../../Utils/Utils"
import { myContext } from "../../../myProvider"

import css from "./ArrowNavigator.module.scss"

export default function ArrowNavigator(props) {
  const [globalState, setGlobalState] = useContext(myContext)

  const setGlobalStateProps = ({ prop, value }) => {
    setGlobalState((state) => {
      return { ...state, [prop]: value }
    })
  }

  const changeLocation = ({ sceneId }) => {
    // setGlobalStateProps({ prop: "activeFrameIndex", value: 0 })

    props.updateActiveScene({ sceneId })
  }

  const { activeScene } = props
  const { coordinates } = activeScene

  const neighbors = Utils.getNeighbors({
    coordinates,
  })

  const buttons = Object.keys(neighbors).map((neighborKey, i) => {
    const neighbor = neighbors[neighborKey]

    const neighborName = _get(neighbor, "location.name") || ""

    const onClick = neighbor
      ? () =>
          changeLocation({
            sceneId: neighbor.id,
          })
      : null

    const classNames = {
      left: css.sceneLeft,
      right: css.sceneRight,
      top: css.sceneTop,
      bottom: css.sceneBottom,
    }

    const className = classNames[neighborKey]

    return (
      <Button
        key={i}
        onClick={onClick}
        className={cx(css.choiceButton, className)}
      >
        {neighborName}
      </Button>
    )
  })

  const fourArrows = Images.backgrounds["four_arrows"]
  const diamond2 = Images.backgrounds["diamond2"]
  return (
    <div className={css.arrowNavigatorContainer}>
      <img className={css.diamond2Image} src={diamond2} alt={"imagex"} />
      <img className={css.fourArrowsImage} src={fourArrows} alt={"imagex"} />
      {buttons}
    </div>
  )
}
