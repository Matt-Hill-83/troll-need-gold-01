const story9905 = {
  title: "9905 - aFlyInMyEye",
  scenes: [
    {
      title: "cat01",
      sceneConfig: {
        worldTitle: "000 - 001",
        coordinates: { row: 0, col: 0 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "pup01" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              {
                face: "liz-11.dc1d78bb.png",
                character: "liz2",
                characterIndex: 1,
              },
              {
                character: "kat",
                characterIndex: 0,
                face: "kat-happy.9e02afab.png",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            `{"liz2": "I see a bug."}`,
            `{"liz2": "I see a bug...  in a rug!"}`,
            `{"kat": "Tee Hee Hee..."}`,

            `{"kat": "I see a fly."}`,
            `{"kat": "I see a fly... in my eye!."}`,
            `{"kat": "Aaahhhh!  Liz!  There's a fly in my eye!"}`,
            `{"kat": "I'm not kidding!"}`,
            `{"liz2": "Oh no, what should we do?"}`,

            `{"kat": "That frog!!!"}`,
            `{"kat": "We have to get that frog!"}`,
            `{"liz2": "You mean the frog on the log in the bog?"}`,
            `{"kat": "Yes.  The frog on the log in the bog!"}`,

            `{"liz2": "Ummm...why do we need a frog?"}`,
            `{"kat": "It's the only way to get a fly out of your eye!!!"}`,
            `{"liz2": "What about a pig in a wig?"}`,
            `{"kat": "Liiiizzzz!!!!"}`,
            `{"kat": "That's just not how it works."}`,

            `{"liz2": "Oh no, oh no , oh no!"}`,
            `{"liz2": "Oh me, oh my!"}`,
            `{"kat": "Ha! Gotcha!"}`,
            `{"kat": "I was just kidding."}`,

            `{"liz2": "Kat!  You are the worst!"}`,
            `{"liz2": "You are bad to the bone!"}`,
          ],
        },
      ],
    },
  ],
  questConfig: { data: "none" },
}
export default story9905
