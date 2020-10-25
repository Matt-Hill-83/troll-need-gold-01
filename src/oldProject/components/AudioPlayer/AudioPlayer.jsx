import React, { useRef, useState } from "react"
import { Button } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import cx from "classnames"

import css from "./AudioPlayer.module.scss"
import ReactPlayer from "react-player"

export default function AudioPlayer(props) {
  // const audioElement = useRef(null)
  const { sound } = props

  const soundToPlay = sound?.url ? sound.url : sound

  const [playing, setPlaying] = useState(false)

  const toggleAudio = ({ sound }) => {
    setPlaying(!playing)
    // const player = audioElement.current
    // player.src = sound
    // player.play()
  }

  // const toggleAudio = ({ sound }) => {
  //   const player = audioElement.current
  //   player.src = sound
  //   player.play()
  // }

  const defaultReactPlayerProps = {
    width: "100%",
    height: "100%",
    attributes: {
      playsinline: true,
      controlslist: {
        nodownload: false,
        nofullscreen: true,
        noremoteplayback: true,
      },
    },
  }

  const reactPlayerProps = {
    ...defaultReactPlayerProps,
    ...props.reactPlayerProps,
  }

  const defaultStyle = { border: "1px solid red", display: "none" }
  const style = { ...defaultStyle, ...props.style }

  return (
    <>
      {/* <Popover interactionKind={PopoverInteractionKind.CLICK_TARGET_ONLY}> */}
      <Button
        className={cx(css.main)}
        onClick={() => toggleAudio({ sound: soundToPlay })}
        icon={playing ? IconNames.PAUSE : IconNames.PLAY}
      />
      <ReactPlayer
        playing={playing}
        style={style}
        // controls
        loop={false}
        url={sound}
        {...reactPlayerProps}
      />
      {/* <audio ref={audioElement}>
        <source loop src={"sound"} type="audio/mp3" />
      </audio> */}
      {/* </Popover> */}
    </>
  )
}
