// liz2
import liz1 from "./rigged-girls/liz/png/liz-1.png"
import liz2 from "./rigged-girls/liz/png/liz-2.png"
import liz3 from "./rigged-girls/liz/png/liz-3.png"
import liz4 from "./rigged-girls/liz/png/liz-4.png"
import liz5 from "./rigged-girls/liz/png/liz-5.png"
import liz6 from "./rigged-girls/liz/png/liz-6.png"
import liz7 from "./rigged-girls/liz/png/liz-7.png"
import liz8 from "./rigged-girls/liz/png/liz-8.png"
import liz9 from "./rigged-girls/liz/png/liz-9.png"
import liz10 from "./rigged-girls/liz/png/liz-10.png"
import liz11 from "./rigged-girls/liz/png/liz-11.png"
import liz12 from "./rigged-girls/liz/png/liz-12.png"
import liz13 from "./rigged-girls/liz/png/liz-13.png"
import liz14 from "./rigged-girls/liz/png/liz-14.png"
import liz15 from "./rigged-girls/liz/png/liz-15.png"
import liz16 from "./rigged-girls/liz/png/liz-16.png"
import liz17 from "./rigged-girls/liz/png/liz-17.png"
import liz18 from "./rigged-girls/liz/png/liz-18.png"
import liz19 from "./rigged-girls/liz/png/liz-19.png"
import liz20 from "./rigged-girls/liz/png/liz-20.png"
import liz21 from "./rigged-girls/liz/png/liz-21.png"
import liz22 from "./rigged-girls/liz/png/liz-22.png"
import liz23 from "./rigged-girls/liz/png/liz-23.png"
import liz24 from "./rigged-girls/liz/png/liz-24.png"
import liz25 from "./rigged-girls/liz/png/liz-25.png"
import liz26 from "./rigged-girls/liz/png/liz-26.png"
import liz27 from "./rigged-girls/liz/png/liz-27.png"
import liz28 from "./rigged-girls/liz/png/liz-28.png"

// rigged girl - kat
import katBody from "./rigged-girls/kat/kat-body.png"
import katBlissful from "./rigged-girls/kat/kat-blissful.png"
import katCringing from "./rigged-girls/kat/kat-cringing.png"
import katCrying from "./rigged-girls/kat/kat-crying.png"
import katDisgusted from "./rigged-girls/kat/kat-disgusted.png"
import katDismayed from "./rigged-girls/kat/kat-dismayed.png"
import katFunny from "./rigged-girls/kat/kat-funny.png"
import katHappy from "./rigged-girls/kat/kat-happy.png"
import katHurt from "./rigged-girls/kat/kat-hurt.png"
import katKissing from "./rigged-girls/kat/kat-kissing.png"
import katLauging from "./rigged-girls/kat/kat-lauging.png"
import katLoud from "./rigged-girls/kat/kat-loud.png"
import katMad from "./rigged-girls/kat/kat-mad.png"
import katNormal from "./rigged-girls/kat/kat-normal.png"
import katOptimistic from "./rigged-girls/kat/kat-optimistic.png"
import katSad from "./rigged-girls/kat/kat-sad.png"
import katScared from "./rigged-girls/kat/kat-scared.png"
import katSilly from "./rigged-girls/kat/kat-silly.png"
import katSinister from "./rigged-girls/kat/kat-sinister.png"
import katSmiling from "./rigged-girls/kat/kat-smiling.png"
import katSurprised from "./rigged-girls/kat/kat-surprised.png"
import katTired from "./rigged-girls/kat/kat-tired.png"
import katUnsure from "./rigged-girls/kat/kat-unsure.png"
import katWinking from "./rigged-girls/kat/kat-winking.png"
import katPigtails from "./rigged-girls/kat/kat-pigtails.png"
import katPonytail from "./rigged-girls/kat/kat-ponytail.png"

const lizHeads = [
  liz1,
  liz2,
  liz3,
  liz4,
  liz5,
  liz6,
  liz7,
  liz8,
  liz9,
  liz10,
  liz11,
  liz12,
  liz13,
  liz14,
  liz15,
  liz16,
  liz17,
  liz18,
  liz19,
  liz20,
  liz21,
  liz22,
  liz23,
  liz24,
  liz25,
  liz26,
  liz27,
  liz28,
]

const katHeads = [
  katHappy,
  katLauging,
  katNormal,
  katOptimistic,
  //
  katSurprised,
  katUnsure,
  katFunny,
  katKissing,
  //
  katSilly,
  katSmiling,
  katWinking,
  katBlissful,
  //
  katMad,
  katLoud,
  katScared,
  katCringing,
  //
  katCrying,
  katSad,
  katDisgusted,
  katDismayed,
  //
  katHurt,
  katSinister,
  katTired,
  katPigtails,
  katPonytail,
]

const posableLiz = {
  name: "liz2",
  type: "liz2",
  mood: "liz1",
  images: {
    heads: [],
    body: { image: katBody },
  },
}

posableLiz.images.heads = lizHeads.map((image) => {
  const regex = `([^/]+?)$`
  const match = image.match(regex)
  const mood = match && match[0]

  return {
    image,
    mood,
  }
})

const posableKat = {
  name: "kat",
  type: "kat",
  mood: "katHappy",
  images: {
    heads: [],
    body: { image: katBody },
  },
}

posableKat.images.heads = katHeads.map((image) => {
  const regex = `([^/]+?)$`
  const match = image.match(regex)

  // We are assigning the file name to the mood since the file names do not contain the mood.
  const mood = match && match[0]
  return {
    image,
    mood,
  }
})

const posableCharacters = [posableLiz, posableKat]
export default posableCharacters
