import React, { useRef } from "react"
import { Button } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"

import css from "./AudioPlayer.module.scss"

export default function AudioPlayer(props) {
  const audioElement = useRef(null)
  const { sound } = props

  const playAudio = ({ sound }) => {
    console.log("playAudio") // zzz
    console.log("sound", sound) // zzz
    const player = audioElement.current
    player.src = sound
    player.play()
  }

  return (
    <div className={css.main}>
      <Button onClick={() => playAudio({ sound })} icon={IconNames.PLAY} />
      <audio ref={audioElement}>
        <source src={"sound"} type="audio/mp3" />
      </audio>
    </div>
  )
}
