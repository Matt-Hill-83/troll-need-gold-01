const story9910 = {
  title: "9910-rapGirls",
  scenes: [
    {
      title: "bubbleGirl01",
      sceneConfig: {
        worldTitle: "9908 - new kids on the block",
        coordinates: { col: 0, row: 0 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: true,
        items: [
          { name: "boomALoo01" },
          { name: "dog01" },
          { name: "pup01" },
          { name: "queenZupula01" },
          { name: "rose01" },
          { name: "crow01" },
        ],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, face: "happy", character: "liz2" },
              { character: "kat", face: "happy", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: ['{"liz2" : "Do you see a bee in a tree?"}'],
        },
      ],
    },
  ],
}

export default story9910
