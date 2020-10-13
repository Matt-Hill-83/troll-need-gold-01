import React, { useRef, useState } from "react"
import { PopoverInteractionKind, Popover, Button } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import cx from "classnames"

import css from "./AudioPlayer.module.scss"
import ReactPlayer from "react-player"

export default function AudioPlayer(props) {
  // const audioElement = useRef(null)
  const { sound } = props

  const [playing, setPlaying] = useState(false)

  const playAudio = ({ sound }) => {
    setPlaying(!playing)
    // const player = audioElement.current
    // player.src = sound
    // player.play()
  }

  // const playAudio = ({ sound }) => {
  //   const player = audioElement.current
  //   player.src = sound
  //   player.play()
  // }

  const reactPlayerProps = { width: "50vw" }

  return (
    <Popover interactionKind={PopoverInteractionKind.CLICK_TARGET_ONLY}>
      <Button
        className={cx(css.main)}
        onClick={() => playAudio({ sound })}
        icon={IconNames.MUSIC}
      />
      <ReactPlayer
        playing={playing}
        // autoplay={true}
        // controls
        loop={false}
        url={sound}
        {...reactPlayerProps}
      />
      {/* <audio ref={audioElement}>
        <source loop src={"sound"} type="audio/mp3" />
      </audio> */}
    </Popover>
  )
}
