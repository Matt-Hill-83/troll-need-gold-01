import { Button } from "@blueprintjs/core"
import { Rnd } from "react-rnd"
import cx from "classnames"
import React, { useContext, useState, useEffect } from "react"

import { myContext } from "../../../myProvider.js"
import { updateQuestInFirestore } from "../../../app/firestore/firestoreService.js"
import ImageDisplay from "../../../Common/Components/ImageDisplay/ImageDisplay.js"
import useUpdateProfileWidget from "../TopLevel/useUpdateProfileWidget.js"

import css from "./LocationImage.module.scss"

export default function LocationImage(props) {
  const [globalState] = useContext(myContext)
  const { world, activeScene } = globalState

  const { getProfile } = useUpdateProfileWidget()
  const profile = getProfile()

  const isGod = profile.id === "AMAgzal2oAbHogUvO9vVeHWZygF3"

  const getInitialRnD = () => {
    const innerWidth = window.innerWidth
    const innerHeight = window.innerHeight
    const locationWidth = 300
    const locationHeight = locationWidth

    console.log("innerWidth", innerWidth) // zzz
    // x defines the NE corner
    const x = innerWidth * 0.9

    // y defines the top
    const y = innerHeight * 0.7 - locationHeight

    console.log("x", x) // zzz
    console.log("y", y) // zzz

    const savedPosition = {
      width: locationWidth,
      height: locationHeight,
      x,
      y,
    }

    if (activeScene?.location?.position) {
      const position = activeScene.location.position
      return { ...savedPosition, ...position }
    } else {
      return savedPosition
    }
  }

  console.log("activeScene", activeScene) // zzz
  const [itemPosition, setItemPosition] = useState(getInitialRnD())

  useEffect(() => {
    // returned function will be called on component unmount
    return () => {}
  }, [])

  // on change in props
  useEffect(() => {
    const initialRnD = getInitialRnD()
    setItemPosition(initialRnD)
    console.log("new props =================================>>>>>")
  }, [props])

  const getPosition = () => {
    if (!activeScene?.location?.position) {
      activeScene.location.position = {}
    }
    return activeScene?.location?.position
  }

  const renderLocationImage = () => {
    const locationName = activeScene?.location?.name
    const newItem = { name: locationName }

    const style = {
      right: "0",
      bottom: "0",
      top: "unset",
      left: "unset",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "solid 1px #ddd",
      background: "#f0f0f0",
    }

    const onDragStop = ({ d, e }) => {
      const prevPosition = getPosition()
      const newPosition = { x: d.x, y: d.y }
      const mergedPosition = { ...prevPosition, ...newPosition }
      setItemPosition(mergedPosition)

      console.log("mergedPosition - drag", mergedPosition) // zzz
    }

    const onResizeStop = ({ ref, position }) => {
      console.log("onResizeStop---------------") // zzz
      console.log("position", position) // zzz
      const prevPosition = getPosition()
      const newPosition = {
        width: ref.style.width,
        height: ref.style.height,
        ...position,
      }
      console.log("position", position) // zzz
      console.log("prevPosition", prevPosition) // zzz
      const mergedPosition = { ...prevPosition, ...newPosition }

      console.log("mergedPosition", mergedPosition) // zzz
      setItemPosition(mergedPosition)
    }

    const savePositions = () => {
      console.log("savePositions") // zzz
      console.log("itemPosition", itemPosition) // zzz
      if (activeScene?.location?.position) {
        activeScene.location.position = itemPosition
      }
      updateQuestInFirestore(world)
    }

    const defaultPosition = { x: itemPosition.x, y: itemPosition.y }
    let position = defaultPosition
    // if (activeScene?.location?.position) {
    //   position = activeScene.location.position
    // }

    const { width, height } = position

    console.log(
      "activeScene.location.position",
      activeScene?.location?.position || "no saved  position"
    ) // zzz
    console.log("position", position) // zzz

    const size = {
      width: width || itemPosition.width,
      height: height || itemPosition.height,
    }

    const buttons = (
      <Button className={css.saveButton} onClick={savePositions}>
        save
      </Button>
    )

    console.log("size", size) // zzz
    console.log("itemPosition---------final", itemPosition) // zzz
    return (
      <Rnd
        className={css.locationImageDragger}
        style={style}
        size={size}
        position={position}
        onDragStop={(e, d) => {
          onDragStop({ d, e })
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          onResizeStop({ ref, position })
        }}
      >
        <div className={css.locationDragger}>
          <ImageDisplay
            className={css.locationImage}
            item={newItem}
            showLabel={true}
          />
        </div>
        {/* Div to shield child element from clicks */}
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: "100",
          }}
        />
        {isGod && buttons}
      </Rnd>
    )

    // return (
    //   <Rnd
    //     default={{
    //       x: 0,
    //       y: 0,
    //       width: 620,
    //       height: 400,
    //     }}
    //     onDragStop={(e, d) => {
    //       onDragStop({ d, e })
    //     }}
    //     onResizeStop={(e, direction, ref, delta, position) => {
    //       onResizeStop({ ref, position })
    //     }}
    //   >
    //     <div className={css.locationDragger}>
    //       <ImageDisplay
    //         // className={css.locationImage}
    //         item={newItem}
    //         showLabel={true}
    //       />
    //     </div>
    //     {/* <div className={css.locationDragger}>Rnd</div> */}
    //   </Rnd>
    // )
  }

  return renderLocationImage()
}
