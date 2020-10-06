const story9920 = {
  title: "9920 - BugYuck",
  scenes: [
    {
      title: "bun",
      sceneConfig: {
        worldTitle: "9918 - KatMightGetADress - 2",
        coordinates: { row: 1, col: 1 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "sweaterGirl01", amount: 1 }, { name: "pig" }],
        // items: [{ name: "bun", amount: 1 }, { name: "pig" }],
      },
      frames: [
        {
          frameConfig: {
            faces: [
              { characterIndex: 1, face: "happy", character: "liz2" },
              {
                character: "kat",
                face: "kat-happy.9e02afab.png",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "I see a bug."}',
            '{"kat" : "I see a bug... and a mug."}',
            '{"kat" : "The bug is a slug!"}',
            '{"kat" : "We need a slug!."}',
            '{"kat" : "A slug! A slug!"}',
            '{"kat" : "Put the slug... in the mug!"}',

            '{"liz" : "Oh no!"}',
            '{"liz" : "The pug!"}',
            '{"liz" : "The pug!"}',
            '{"liz" : "Stop the pug!"}',
            '{"liz" : "No pug! No!"}',
            '{"liz" : "Go slug! Go!"}',
            '{"liz" : "Slug too slow!"}',

            '{"liz" : "The pug sat on the bug!"}',
            '{"kat" : "Uuuug!  Uuuug!"}',
            '{"kat" : "Oh no!"}',
            '{"liz" : "The slug is..."}',
            '{"liz" : "Bug Yuck!"}',
            '{"liz" : "The slug is bug yuck!"}',
          ],
        },
      ],
    },
    {
      title: "mop",
      sceneConfig: {
        worldTitle: "9918 - KatMightGetADress - 2",
        coordinates: { col: 2, row: 1 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "mop", amount: 1 }, { name: "pig" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", characterIndex: 1, face: "happy" },
              {
                characterIndex: 0,
                character: "kat",
                face: "kat-happy.9e02afab.png",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "Bug Yuck?"}',
            '{"liz2" : "Yes, bug Yuck."}',
            '{"liz2" : "Bug Yuck is a big yuck!"}',
            '{"liz2" : "Tee Hee Hee!"}',
            '{"liz2" : "Bug Yuck is bad luck!"}',
            '{"liz2" : "Tee Hee Hee!"}',
            '{"kat" : "Bug yuck on a mug."}',
            '{"kat" : "Bug yuck on a rug!"}',
            '{"liz" : "Bug yuck is stuck on a pug!"}',

            '{"kat" : "I see a truck!"}',
            '{"kat" : "I see a Duck!"}',
            '{"kat" : "I see a Duck... in a truck!"}',
            '{"liz2" : "Tee Hee Hee!"}',
            '{"kat" : "Duck! Duck!"}',
            '{"kat" : "Do you like bug yuck!"}',
            '{"duck" : "Do I like bug yuck!"}',
            '{"duck" : "Cluck Cluck!"}',
            '{"kat" : "Good Luck!"}',
            '{"kat" : "No more bug yuck."}',
            '{"kat" : "No more bug yuck...stuck on pug."}',
          ],
        },
      ],
    },
  ],
  questConfig: {
    missions: [
      {
        item: { name: "bun" },
        rewards: [{ name: "gold", amount: 1 }],
        name: "Feed a Pig In A Wig",
        recipient: { name: "pigInAWig" },
      },
    ],
  },
}
export default story9920
