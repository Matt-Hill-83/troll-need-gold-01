import { Button, ButtonGroup } from "@blueprintjs/core"
import { Link } from "react-router-dom"
import cuid from "cuid"
import cx from "classnames"
import React, { useContext, useState } from "react"

import { myContext } from "../../../myProvider"
import { updateQuestInFirestore } from "../../../app/firestore/firestoreService"
import { uploadToFirebaseStorage } from "../../../app/firestore/firebaseService"
import Character from "../Character/Character"
import Constants from "../../../Common/Constants/Constants"
import Images from "../../../Common/images/images"
import useUpdateProfileWidget from "../TopLevel/useUpdateProfileWidget"
import WordGroup from "../WordGroup/WordGroup"

import AudioPlayer from "../AudioPlayer/AudioPlayer"
import AudioRecorder from "../AudioRecorder/AudioRecorder"

import css from "./FrameViewer.module.scss"

export default function FrameViewer(props) {
  const [globalState, setGlobalState] = useContext(myContext)
  const [loading, setLoading] = useState(false)

  const { getProfile } = useUpdateProfileWidget()
  const loggedIn = !!getProfile().id
  console.log("getProfile().id", getProfile().id) // zzz

  const { activeFrameIndex, activeScene } = globalState
  const { frames = [] } = activeScene.frameSet

  const frame = frames[activeFrameIndex]
  let isLastFrame = activeFrameIndex >= frames.length - 1

  const renderDialog = ({ cloneIndex }) => {
    const dialog = frame?.dialog || []
    const allCharactersInScene = {}

    frames.forEach((frame) => {
      const critters = [...frame.critters1, ...frame.critters2]
      critters.forEach((char) => {
        allCharactersInScene[char.name] = char
      })
    })

    const allCharactersInScene2 = Object.values(allCharactersInScene)
    const charIndexMap = {}
    const charactersAndLocation = [
      ...allCharactersInScene2,
      activeScene.location,
    ]

    charactersAndLocation.forEach((char, charIndex) => {
      charIndexMap[char.name] = charIndex
    })

    // TODO: for some reason, probably from cloning, some characters share the same id.
    const renderedDialogs = dialog.map((line, lineIndex) => {
      const { text, audioURL } = line

      const characterName = line.character || ""
      const characterIndex = charIndexMap[characterName] || 0

      if (!text) return null
      const className = `character${characterIndex}`

      const indexIsEven = characterIndex % 2 === 0
      const renderedWordGroup = (
        <WordGroup lineIndex={lineIndex} story={[text]} />
      )

      return (
        <div
          className={cx(css.line, css[className], {
            [css.isEven]: indexIsEven,
            [css.isOdd]: !indexIsEven,
          })}
        >
          {!indexIsEven && renderedWordGroup}
          <div className={cx(css.characterNameContainer)}>
            <span className={css.characterName}>{characterName}</span>
          </div>
          {indexIsEven && renderedWordGroup}

          <ButtonGroup className={css.audioButtons}>
            {audioURL && (
              <AudioPlayer className={css.audioPlayer} sound={audioURL} />
            )}
            {loggedIn && (
              <AudioRecorder
                saveAudio={({ blob }) => saveAudio({ dialog: line, blob })}
              />
            )}
          </ButtonGroup>
        </div>
      )
    })

    const scalingFactor = 1.6
    const style = {
      "margin-left": `-${cloneIndex * scalingFactor}vh`,
      "margin-top": `${cloneIndex * scalingFactor}vh`,
      border: "3px solid red",
    }

    return (
      <div className={css.dialogScroller} style={style}>
        <div className={css.dialog}>{renderedDialogs}</div>
      </div>
    )
  }

  const getMood = ({ name, faces }) => {
    let mood = "ok"
    const newMood = faces && faces.find((face) => face.character === name)
    mood = (newMood && newMood.face) || mood
    return mood
  }

  const getLocationName = () => {
    return activeScene?.location?.name
  }

  const renderLocationImage = () => {
    const locationName = getLocationName()
    const locationImage = Images.all[locationName]

    return (
      <div className={css.locationImageContainer}>
        <img className={css.locationImage} src={locationImage} alt={"imagex"} />
        <span className={`${css.locationLabel}`}>{locationName}</span>
      </div>
    )
  }

  const renderBackground = () => {
    const backgroundImageHill = Images.backgrounds["hill01"]
    const brokenMonitor01 = Images.backgrounds["brokenMonitor01"]

    return (
      <div className={css.backgroundImageContainer}>
        <div className={css.backgroundGrass}>
          <img
            className={css.backgroundGrassImage}
            src={backgroundImageHill}
            alt={`backgroundImage`}
          />
        </div>
        {/* <div className={css.backgroundGrass}>
          <img
            className={css.backgroundGrassImage}
            src={brokenMonitor01}
            alt={`backgroundImage`}
          />
        </div> */}
      </div>
    )
  }

  const renderCritters = ({ critters, className }) => {
    const filteredCritters =
      critters.filter((item) => {
        return !Constants.posableCharacters.includes(item.name)
      }) || []

    const critterNames = filteredCritters.map((item) => item.name)

    return critterNames.map((character, index) => {
      return (
        <div className={cx(css.characterContainer, className)} key={index}>
          <Character name={character} isEditMode={false} showHeadOnly={false} />
        </div>
      )
    })
  }

  const renderPosableCritters = () => {
    const { faces = [] } = frame
    if (!frame) return null

    const posableCharacters = Constants.posableCharacters

    const critters =
      frame.critters1.filter((item) => {
        return posableCharacters.includes(item.name)
      }) || []

    const critterNames = critters.map((item) => item.name)
    return critterNames.map((character, index) => {
      const mood = getMood({ name: character, faces })

      return (
        <div className={`${css.characterContainer2}`} key={index}>
          <Character
            name={character}
            mood={mood}
            isEditMode={false}
            showHeadOnly={false}
          />
        </div>
      )
    })
  }

  const onClickNext = () => {
    setGlobalState((prevVal) => {
      return {
        ...prevVal,
        activeFrameIndex: (prevVal.activeFrameIndex += 1),
      }
    })
  }

  function saveAudio({ dialog, blob }) {
    setLoading(true)

    const filename = cuid() + "-audio" + "." + "blob"
    const uploadTask = uploadToFirebaseStorage(blob, filename)
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log("Upload is " + progress + "% done")
      },
      (error) => {
        // toast.error(error.messege)
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          dialog.audioURL = downloadURL
          updateQuestInFirestore(globalState.world)
        })
      }
    )
  }

  const renderButtons = () => {
    const { isEndScene } = activeScene

    if (isEndScene && isLastFrame) {
      return (
        <div className={css.buttonsContainer}>
          <Link to={"/books"} className={css.newGameButton}>
            New Quest
          </Link>
        </div>
      )
    }

    return (
      <div className={css.buttonsContainer}>
        {!isLastFrame && (
          <Button onClick={onClickNext} className={css.nextButton}>
            Next Page
          </Button>
        )}
        {isLastFrame && (
          <div className={css.clickMapMsg}>Click map to move.</div>
        )}
      </div>
    )
  }

  const cloneDialogs = () => {
    const numPages = 1
    const dialogClones = []
    for (let cloneIndex = 0; cloneIndex < numPages; cloneIndex++) {
      const dialog = renderDialog({ cloneIndex })
      dialogClones.push(dialog)
    }

    return dialogClones
  }

  const renderFrame = () => {
    const { critters1, critters2 } = frame
    const sceneName = getLocationName()

    return (
      <div className={`${css.scenes}`}>
        {renderBackground()}
        {renderLocationImage()}

        <div className={css.relativePositionedContent}>
          <div className={css.wordsAndButtons}>
            <div className={css.sceneName}>{sceneName}</div>
            <div className={css.wordsContainer}>{cloneDialogs()}</div>
            {renderButtons()}
          </div>
          <div className={css.imageGroupsContainer}>
            <div className={css.lizAndKatContainer}>
              {renderPosableCritters()}
            </div>
            <div className={css.charactersContainer}>
              {renderCritters({
                critters: critters2,
              })}
            </div>
            <div
              className={cx(css.charactersContainer, css.charactersContainer2)}
            >
              {renderCritters({
                critters: critters1,
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!frame) {
    return null
  }

  return (
    <div className={css.main}>
      <div className={css.scenesContainer}>{renderFrame()}</div>
    </div>
  )
}
