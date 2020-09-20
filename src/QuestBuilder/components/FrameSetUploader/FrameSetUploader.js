import { Button } from "@blueprintjs/core"
import React, { Component } from "react"

import cx from "classnames"

import { observer } from "mobx-react"
import { toJS } from "mobx"
import _get from "lodash.get"
import css from "./FrameSetUploader.module.scss"

import story002 from "../../Scripts/002-BrightNewDay"
import story003 from "../../Scripts/003-KatGetsADress"
import story004 from "../../Scripts/004-KatGoesOffScript"
import story005 from "../../Scripts/005-Whambulance"
import story006 from "../../Scripts/006-KatHasFeelings"
import story007 from "../../Scripts/007-KatsFirstQuest"
import story010 from "../../Scripts/010-TrollSoSad"
import story011 from "../../Scripts/011-LizIsSlow"
import story020 from "../../Scripts/020-TrollCaveRapBattle"

import story013 from "../../Scripts/013-ChocolateMilk"
import story014 from "../../Scripts/014-TruthBomb"
import story015 from "../../Scripts/015-KatAndLizSplitUp"
import story050 from "../../Scripts/050-FindingScribbleScrabble"
import story200 from "../../Scripts/200-DennisTheMenace"
import story300 from "../../Scripts/300-MerlindaTheFairyPrincessPart1"

import story100 from "../../Scripts/100-LizGoesCrazy"
import story110 from "../../Scripts/110-LizBloops"
import story310 from "../../Scripts/310-MerlindaTheFairyPrincessPart2"
import story330 from "../../Scripts/330-MerlindaTheFairyPrincessPart3"
import story8000 from "../../Scripts/8000-dogAndPup-001.js"
import story8010 from "../../Scripts/8010-dogAndPup-002.js"
import story8013 from "../../Scripts/8013-CharAndLucy-003.js"
import story8054 from "../../Scripts/8054-math-NineTimesSix.js"
import story9000 from "../../Scripts/9000-ANewSoundInTheWoods"
import story9100 from "../../Scripts/9100-KatsSecondQuest"
import story9102 from "../../Scripts/9102-ThisOneIsFunnyISwear.js"
import story9103 from "../../Scripts/000-ScriptTemplate.js"
import story9903 from "../../Scripts/9903-randomBits03-LizHasElfEars.js"
import story9904 from "../../Scripts/9904-randomBits04-Pantloads.js"
import story9905 from "../../Scripts/9905-randomBits-aFlyInMyEye.js"
import story9906 from "../../Scripts/9906-randomBits-bunnyRap.js"
import story9907 from "../../Scripts/9907-randomBits-greenBeans.js"
import story9908 from "../../Scripts/9908-randomBits-newKids.js"
import story9909 from "../../Scripts/9909-randomBits-dennisRaps.js"
import story9912 from "../../Scripts/9912-randomBits-R2D2andTheDOMStringList.js"
import story9913 from "../../Scripts/9913-randomBits-TheCowInTheTree.js"
import story9914 from "../../Scripts/9914-randomBits-TheBloodyPotato.js"
import story9915 from "../../Scripts/9915-randomBits-KatGetsADressForReal.js"
import story9916 from "../../Scripts/9916-test-RapQuest01.js"
import story9917 from "../../Scripts/9917-test-MyDadIsSoCold.js"
import story9918 from "../../Scripts/9918-test-KatMightGetADress.js"
import story9919 from "../../Scripts/9919-test-ILikeJam.js"
import story9920 from "../../Scripts/9920-test-BugYuck.js"
import story9921 from "../../Scripts/9921-test-WeGetAPet.js"
import story9922 from "../../Scripts/9922-test-SoWhenDoWeGetTheCupcakes.js"

const worlds = [
  // Stories that didn't upload
  // story050,

  // story020,
  // story100,
  // story110,
  // story003,
  // story004,
  // story005,
  // story006,
  // story007,
  // story010,

  // story011,

  // story013,
  // story014,
  // story015,
  // story200,
  // story300,

  // story310,
  // story330,
  // story8000,
  // story8010,
  // story8054,
  // story9000,

  // story9100,
  // story9102,
  // story9103,
  // story9903,
  // story9904,

  // story9905,
  story9906,
  // story9907,
  // story9908,
  // story9909,

  // story9912,
  // story9913,
  // story9914,
  // story9915,

  // story9916,
  // story9917,
  // story9918,
  // story9919,
  // story9920,
  //
  // story9921,
  // story9922,
  // story8013,
]

class FrameSetUploader extends Component {
  importMultipleWorlds = async () => {
    for (let index = 0; index < worlds.length; index++) {
      const world = worlds[index]
      const newWorld = world
      await this.props.onImportJson({ newWorld })
    }
  }

  renderButton = () => {
    return (
      <Button
        onClick={() => this.importMultipleWorlds()}
        className={cx(css.uploadButton)}
      >
        Upload multiple JSON into multiple new quests
      </Button>
    )
  }

  render = () => {
    return <div className={css.main}>{this.renderButton()}</div>
  }
}

export default observer(FrameSetUploader)
