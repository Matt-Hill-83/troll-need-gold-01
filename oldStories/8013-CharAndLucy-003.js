const story8013 = {
  title: "8013-CharAndLucy-003",
  questConfig: {
    subQuestTriggersList: [
      // { subQuestId: 0, unHideTriggers: {} },
      { subQuestId: 1, unHideTriggers: { completedMission: 0 } },
      { subQuestId: 2, unHideTriggers: { completedMission: 1 } },
      { subQuestId: 3, unHideTriggers: { completedMission: 2 } },
      { subQuestId: 4, unHideTriggers: { completedMission: 2 } },
      { subQuestId: 5, unHideTriggers: { completedMission: 3 } },
    ],
    missions: [
      {
        item: { name: "pin" },
        name: "Give the pin to the troll",
        rewards: [{ amount: 5, name: "gold" }],
        recipient: { name: "babyTroll01" },
      },
      {
        item: { name: "bun" },
        name: "Feed the pup.",
        rewards: [{ amount: 5, name: "gold" }],
        recipient: { name: "pup01" },
      },
    ],
  },
  scenes: [
    {
      title: "log",
      sceneConfig: {
        subQuestId: 0,
        worldTitle: "--- lucy and char - 003",
        coordinates: { col: 0, row: 1 },
        creatures: ["kat", "liz2", "dog01"],
        isEndScene: false,
        isStartScene: true,
        items: [{ name: "dog01" }, { name: "pin" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", characterIndex: 1, face: "happy" },
              { character: "kat", characterIndex: 0, face: "happy" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "I see a dog."}',
            '{"liz2" : "You see a dog?"}',
            '{"kat" : "Yes. I see a dog on a log."}',
            '{"liz2" : "I do not see a dog."}',
            '{"kat" : ""}',
            '{"liz2" : ""}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", characterIndex: 1, face: "happy" },
              { character: "kat", characterIndex: 0, face: "happy" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "I see a frog."}',
            '{"liz2" : "A frog?"}',
            '{"kat" : "Yes. I see a frog on a dog."}',
            '{"liz2" : "I do not see a frog."}',
            '{"kat" : "I do."}',
            '{"liz2" : "I do not see a dog."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", characterIndex: 1, face: "happy" },
              { character: "kat", characterIndex: 0, face: "happy" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Do you see a bog?"}',
            '{"liz2" : "I do not see a bog."}',
            '{"kat" : "What do you see?"}',
            '{"liz2" : "I see a pin."}',
            '{"kat" : "A pin? Cool!"}',
            '{"liz2" : ""}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", characterIndex: 1, face: "happy" },
              { character: "kat", characterIndex: 0, face: "happy" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : ""}',
            '{"liz2" : "A pin is cool?"}',
            '{"kat" : "Yes. A pin is cool."}',
            '{"liz2" : "I will get the pin."}',
            '{"kat" : "We can give the pin to the troll."}',
            '{"liz2" : ""}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", characterIndex: 1, face: "happy" },
              { character: "kat", characterIndex: 0, face: "happy" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : ""}',
            '{"liz2" : "Give the pin to the troll?"}',
            '{"kat" : "Yes. The troll needs a pin."}',
            '{"liz2" : "The troll needs a pin?"}',
            '{"kat" : "Yes."}',
            '{"liz2" : ""}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", characterIndex: 1, face: "happy" },
              { character: "kat", characterIndex: 0, face: "happy" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Why does the troll need a pin?"}',
            '{"liz2" : "For baby troll!"}',
            '{"kat" : "We can go find troll!"}',
            '{"liz2" : "Yay!"}',
            '{"kat" : ""}',
            '{"liz2" : ""}',
          ],
        },
      ],
      frames2: [],
    },
    {
      title: "babyTroll01",
      sceneConfig: {
        subQuestId: 0,
        worldTitle: "--- lucy and char - 003",
        coordinates: { col: 1, row: 1 },
        creatures: ["kat", "liz2", "dog01"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "cat01" }, { name: "rat" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", characterIndex: 1, face: "happy" },
              { character: "kat", characterIndex: 0, face: "happy" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "I see a cat."}',
            '{"liz2" : ""}',
            '{"kat" : "I see a cat... and a hat!"}',
            '{"liz2" : "I see a rat."}',
            '{"kat" : ""}',
            '{"liz2" : "I love you rat rat!"}',
          ],
        },
      ],
      frames2: [],
    },
    {
      title: "bun",
      sceneConfig: {
        triggers: {
          unlockSceneConditions: { currentMission: 1 },
        },
        subQuestId: 1,
        worldTitle: "--- lucy and char - 003",
        coordinates: { col: 2, row: 1 },
        creatures: ["kat", "liz2", "dog01"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "cup" }, { name: "pin" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", characterIndex: 1, face: "happy" },
              {
                character: "kat",
                characterIndex: 0,
                face: "kat-happy.9e02afab.png",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "We can play."}',
            '{"liz2" : ""}',
            '{"liz2" : ""}',
            '{"liz2" : ""}',
          ],
        },
      ],
      frames2: [],
    },
    {
      title: "pup01",
      sceneConfig: {
        subQuestId: 1,
        worldTitle: "--- lucy and char - 003",
        coordinates: { col: 3, row: 1 },
        creatures: ["kat", "liz2", "dog01"],
        isEndScene: true,
        isStartScene: false,
        items: [{ name: "cup" }, { name: "mop" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", characterIndex: 1, face: "happy" },
              {
                character: "kat",
                characterIndex: 0,
                face: "kat-happy.9e02afab.png",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "We can play."}',
            '{"liz2" : ""}',
            '{"liz2" : ""}',
            '{"liz2" : ""}',
          ],
        },
      ],
      frames2: [],
    },
  ],
}
export default story8013
