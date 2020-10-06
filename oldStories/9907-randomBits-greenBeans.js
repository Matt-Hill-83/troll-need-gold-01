const story9907 = {
  title: "9907-greenBeans",
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
            `{"kat": "...so I just grabbed on to the table leg with both arms and held it as tight as I could."}`,
            `{"liz2": "no.."}`,
            `{"kat": "And every time my dad would pull on my leg I would scream:"}`,
            `{"kat": "You are not the boss of meeeee!"}`,
            `{"liz2" : "Oh my gosh Kat, do you have a pencil or something?"}`,
            `{"liz2" : "I have to write this down."}`,
            `{"kat": "I had a crayon."}`,

            `{"liz2": "Just give me those blocks then, the ones with the alpahbet letters on them"}`,
            `{"kat": "Here you go"}`,
            `{"liz2": "So you must really hate green beans"}`,
            `{"kat": "What?"}`,
            `{"kat": "No. "}`,
            `{"kat": "No, no no no no."}`,
            `{"kat": "You’re missing the point."}`,
            `{"liz2": "I am?"}`,

            `{"kat": "I’ve never even tried green beans."}`,
            `{"liz2": "...oh...?"}`,
            `{"kat": "You should have seen my mom’s face."}`,

            `{"liz2": "Kat, you eat green beans at school!"}`,
            `{"kat": "I like them when the school makes them!"}`,
          ],
        },
      ],
    },
  ],
  questConfig: { data: "none" },
}
export default story9907
