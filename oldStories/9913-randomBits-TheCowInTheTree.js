const story9913 = {
  title: "9913-TheCowInTheTree",
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
          dialogs: [
            '{"liz2" : "Do you see a bee in a tree?"}',
            '{"kat" : "Me?"}',
            '{"kat" : "Do I see a bee in a tree?"}',
            '{"liz2" : "Yes. A bee in a tree."}',
            '{"kat" : "Gee. Let me check."}',
            '{"kat" : "Nope. Not yet."}',
            '{"liz2" : "Wait a sec..."}',
            '{"liz2" : "Check now."}',
            '{"kat" : "I don\'t see a bee in a tree."}',
            '{"kat" : "But I do see a big red cow."}',
            '{"liz2" : "In the tree?"}',
            '{"kat" : "Nope. On the ground."}',
            '{"kat" : "She probably fell down."}',
            '{"liz2" : "Well that doesn\'t count."}',
            '{"kat" : "Oh wow."}',
            '{"kat" : "And we gotta get the gold to buy that dress somehow."}',
          ],
        },
      ],
    },
    {
      title: "pup01",
      sceneConfig: {
        worldTitle: "9908 - new kids on the block",
        coordinates: { col: 1, row: 0 },
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
          dialogs: [
            '{"kat" : "Liz, let\'s put the cow in the tree!"}',
            '{"liz2" : "Kat, that\'s not allowed!"}',
            '{"kat" : "You can\'t put a cow in a tree!"}',
            '{"kat" : "Why not?"}',
            '{"liz2" : "It would be too loud."}',
            '{"kat" : "Moo Moo Moo."}',
            '{"grownUp01" : "You kids turn that cow sound down! Now!"}',
            '{"kat" : "Sorry mom!"}',
            '{"liz2" : "Plus, how will you get the cow down?"}',
            '{"liz2" : "I don\' want to see a cow all splattered on the ground."}',
            '{"kat" : "Maybe we can use this ladder I found?"}',
            '{"kat" : "How does that sound?"}',
            '{"liz2" : "How does that sound?"}',
            '{"liz2" : "How does that sound?"}',
          ],
        },
      ],
    },
  ],
}

export default story9913
