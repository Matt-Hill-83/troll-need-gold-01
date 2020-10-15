import { IconNames } from "@blueprintjs/icons"
import { PopoverInteractionKind, Popover, Button } from "@blueprintjs/core"
import cx from "classnames"
import React, { useState } from "react"
import ReactPlayer from "react-player"

import AutoComplete2 from "../../../Common/Components/AutoComplete2/AutoComplete2"

import css from "./AudioPlayerWithPicker.module.scss"

export default function AudioPlayerWithPicker(props) {
  const { sound, trackList } = props
  const soundToPlay = sound?.url ? sound.url : sound
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

  const renderTrackPicker = ({ trackList }) => {
    if (!trackList || trackList.length === 0) {
      return <div>no tracklist</div>
    }

    const dropDownProps = {
      className: css.sceneDropdown,
      items: trackList,
      // defaultValue: selectedItem,
      getOptionLabel: (option) => option?.name || "--",
      // onChange: onChangeCritter,
    }

    // return null
    return <AutoComplete2 {...dropDownProps} />
  }

  // TODO: add useState here to store selected track.
  // TODO: add useState here to store selected track.
  // TODO: add useState here to store selected track.
  // TODO: add useState here to store selected track.
  // TODO: add useState here to store selected track.

  return (
    <>
      <Button
        className={cx(css.main)}
        onClick={() => toggleAudio({ sound: soundToPlay })}
        icon={playing ? IconNames.PAUSE : IconNames.PLAY}
      />
      {renderTrackPicker({ trackList })}
      <ReactPlayer
        playing={playing}
        style={style}
        loop={false}
        url={sound}
        {...reactPlayerProps}
      />
    </>
  )
}
