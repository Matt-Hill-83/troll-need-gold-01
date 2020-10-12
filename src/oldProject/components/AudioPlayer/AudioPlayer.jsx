import React, { useRef } from "react"
import { Button } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import cx from "classnames"

import css from "./AudioPlayer.module.scss"

export default function AudioPlayer(props) {
  const audioElement = useRef(null)
  const { sound } = props

  const playAudio = ({ sound }) => {
    const player = audioElement.current
    player.src = sound
    player.play()
  }

  return (
    <Button
      className={cx(css.main)}
      onClick={() => playAudio({ sound })}
      icon={IconNames.PLAY}
    >
      <audio ref={audioElement}>
        <source loop src={"sound"} type="audio/mp3" />
      </audio>
    </Button>
  )
}
