import React, { useRef } from "react"
import { Button } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"

import css from "./AudioPlayer.module.scss"

export default function AudioPlayer(props) {
  const audioElement = useRef(null)
  // const sound = `https://firebasestorage.googleapis.com/v0/b/troll-need-gold-02.appspot.com/o/mrOWUjrN11g1KsoG2YfDaLH14Pg1%2Fuser_images%2Fckf6e2yz500003h5oz9byr6r5-audio.blob?alt=media&token=d35ef8ae-3411-467b-b9a9-d023d623f98d`
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
