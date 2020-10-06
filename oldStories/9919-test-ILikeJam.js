const story9919 = {
  title: "9919 - ILikeJam",
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
            '{"gram" : "My name is Gram."}',
            '{"gram" : "And I like Jam."}',
            '{"sweaterGirl01" : "Hi Gram."}',
            '{"gram" : "Hello ma\'am."}',
            '{"sweaterGirl01" : "Gram? Do you like fancy jam?"}',
            '{"gram" : "Do I like fancy jam?"}',
            '{"gram" : "I\'m a dancing man!"}',
            '{"gram" : "You know I like fancy jam!"}',

            '{"sweaterGirl01" : "Gram, Gram, Gram"}',
            '{"sweaterGirl01" : "What if you get jam"}',
            '{"sweaterGirl01" : "on your brand new pants"}',
            '{"sweaterGirl01" : "and can\'t dance?"}',
            '{"gram" : "If I get jam "}',
            '{"gram" : "on my brand new pants"}',
            '{"gram" : "and can\'t dance?"}',
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
            '{"gram" : "Oh man!"}',
            '{"gram" : "If I get jam on my brand new pants and can\'t dance..."}',
            '{"gram" : "Then you better call the Wham-bulance."}',
            '{"sweaterGirl01" : "Waaa-werrrr"}',
            '{"gram" : "And bring a big bottle of ants."}',
            '{"sweaterGirl01" : "The little black ones?"}',
            '{"gram" : "No man.  The ants from France."}',
            '{"sweaterGirl01" : "The fancy ants?"}',
            '{"gram" : "Look at my pants!"}',
            '{"gram" : "These are fancy pants!"}',
            '{"gram" : "Yes, I need the fancy ants!"}',
            '{"gram" : "I\'m a dancing man!"}',
            '{"sweaterGirl01" : "Then you need to pay in advance."}',
            '{"gram" : "I need the fancy ants..."}',
            '{"gram" : "to get the jam off my dancing pants!"}',
            '{"gram" : "I can\'t stand"}',
            '{"gram" : "getting jam on my dancing pants!"}',
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
export default story9919
