import React, { useState } from "react"
import { Button } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import ReactPlayer from "react-player"
import cx from "classnames"

import css from "./AudioPlayer.module.scss"

export default function AudioPlayer(props) {
  const { sound } = props
  // const soundToPlay = sound?.url ? sound.url : sound
  const [playing, setPlaying] = useState(false)

  const toggleAudio = () => {
    setPlaying(!playing)
  }

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
      <Button
        className={cx(css.main)}
        onClick={() => toggleAudio()}
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
    </>
  )
}
