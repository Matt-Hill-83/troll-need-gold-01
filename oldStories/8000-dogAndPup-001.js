const story8000 = {
  title: "8000-dogAndPup-001",
  scenes: [
    {
      title: "pin",
      sceneConfig: {
        worldTitle: "1000 - The Glitch",
        coordinates: { col: 0, row: 0 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: true,
        items: [{ name: "pup01" }, { name: "cup" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, face: "happy", character: "liz2" },
              { characterIndex: 0, face: "happy", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Hi Liz!"}',
            '{"liz2" : "Hi Kat!"}',
            '{"kat" : "I see a pup."}',
            '{"liz2" : "I see a pup... and a cup!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                face: "liz-26.792f5b07.png",
                character: "liz2",
                characterIndex: 1,
              },
              {
                characterIndex: 0,
                face: "kat-dismayed.b719035a.png",
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "I see a pup... go up!!!"}',
            '{"liz2" : "No pup, no!"}',
            '{"kat" : "Boo Hoo!"}',
            '{"liz2" : "up... up... up..."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                face: "liz-14.6eef68da.png",
                character: "liz2",
                characterIndex: 1,
              },
              {
                character: "kat",
                characterIndex: 0,
                face: "kat-cringing.62a27ad4.png",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "I see a pup."}',
            '{"liz2" : "I see a pup... and a pin!"}',
            '{"kat" : "Oh no. No pin! No pin!"}',
            '{"liz2" : "Pup go POP!"}',
            '{"kat" : "Boooooo... Hoooooooo....."}',
          ],
        },
      ],
    },
  ],
  questConfig: {
    missions: [
      {
        name: "Give Gerald a Dress",
        recipient: { name: "gerald01" },
        item: { name: "dress01" },
        rewards: [{ name: "gold", amount: 7000 }],
      },
      {
        name: "Give Lucy a Pin",
        recipient: { name: "lucy" },
        rewards: [{ name: "gold", amount: 5 }],
        item: { name: "pin" },
      },
      {
        rewards: [{ amount: 5, name: "gold" }],
        item: { name: "cup" },
        recipient: { name: "rori" },
        name: "Give the cup to the Queen of Crazy",
      },
    ],
    pockets: [{ name: "apple" }],
  },
};
export default story8000;
