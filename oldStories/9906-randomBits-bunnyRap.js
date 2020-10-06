const story9906 = {
  title: "9906 - bunnyRap",
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
            `{"liz2": "Bun Bun!"}`,
            `{"liz2": "Dag nabbit!"}`,
            `{"liz2": "Get over here, and don't be a bad rabbit!"}`,
            `{"liz2": "I said: watch my juice!"}`,
            `{"liz2": "And instead"}`,
            `{"liz2": "you let my dad grab it."}`,
            `{"liz2": "And splotch my shoes!"}`,

            `{"kat": "Liz, Liz, Liz, stop and listen"}`,
            `{"kat": "the clock's ticking"}`,
            `{"kat": "Can you please, put some pep in your step..."}`,
            `{"kat": "and get your clogs clickin?"}`,
            `{"kat": "You're slower than a frog on a log in a bog."}`,
            `{"kat": "Stapled to a lost chicken!"}`,
          ],
        },
      ],
    },
  ],
  questConfig: { data: "none" },
}
export default story9906
