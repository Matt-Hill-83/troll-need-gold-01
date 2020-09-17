import React, { useRef } from "react"
import Sounds from "../../Sounds/Sounds"
import cx from "classnames"

import css from "./WordGroup.module.scss"

export default function WordGroup(props) {
  const audioElement = useRef(null)
  const { className } = props

  const getAudioFileForWord = ({ word }) => {
    word = word.replace(/[.|,|/?]/, "")
    return Sounds[word] || null
  }

  const renderNarrative = () => {
    const { lineIndex } = props

    const renderedNarrative = props.story.map((sentence, sentenceIndex) => {
      const parsedSentence = sentence.split(/\s/)

      const renderedSentence = parsedSentence.map((word, wordIndex) => {
        const tabIndex =
          1000 * lineIndex + 100 * sentenceIndex + (wordIndex + 1)

        // TODO - fix autofocus
        const autofocus = tabIndex === 1 ? { autoFocus: true } : { test: 3 }
        const sound = getAudioFileForWord({ word })

        return (
          <>
            <span
              key={tabIndex}
              {...autofocus}
              autoFocus={true}
              tabIndex={tabIndex}
              className={cx(css.sentenceWord)}
              // className={cx(css.sentenceWord, { [css.hasAudio]: !!sound })}
              onClick={false ? () => playAudio({ sound }) : () => {}}
              // onClick={sound ? () => playAudio({ sound }) : () => {}}
            >
              {word}
            </span>
          </>
        )
      })

      return (
        <span key={sentenceIndex} className={css.sentence}>
          {renderedSentence}
        </span>
      )
    })

    return <div className={css.narrative}>{renderedNarrative}</div>
  }

  const playAudio = ({ sound }) => {
    const player = audioElement.current
    player.src = sound
    player.play()
  }

  return (
    <div className={`${css.main} ${className}`}>
      <audio ref={audioElement}>
        <source src={"sound"} type="audio/mp3" />
      </audio>
      {renderNarrative()}
    </div>
  )
}
