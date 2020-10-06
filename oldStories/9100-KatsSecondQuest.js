const story9100 = {
  title: "9100 - I see a Skull",
  scenes: [
    {
      title: "mop",
      sceneConfig: {
        worldTitle: "9100 - I see a Skull",
        coordinates: { col: 0, row: 0 },
        creatures: ["liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "pup01" }],
      },
      frames: [
        {
          frameConfig: { items: [], faces: [], creatures: ["dog01"] },
          dialogs: [
            '{"dog01" : "Hot Dog!"}',
            '{"pup01" : "Hot Diggety Dog!"}',
            '{"dog01" : "Woo Hoo!"}',
          ],
        },
        {
          frameConfig: { items: [], faces: [], creatures: ["dog01"] },
          dialogs: [
            '{"dog01" : "We are in Dog Town!"}',
            '{"pup01" : "I love Dog Town!"}',
            '{"dog01" : "Yes, Dog Town!"}',
          ],
        },
        {
          frameConfig: { items: [], faces: [], creatures: ["dog01"] },
          dialogs: [
            '{"dog01" : "We can find a ball!"}',
            '{"pup01" : "Oh yes!"}',
            '{"dog01" : "Let\'s get a ball!"}',
            '{"pup01" : "Dog Town!"}',
            '{"dog01" : "Dog Town!"}',
          ],
        },
      ],
    },
    {
      title: "cave",
      sceneConfig: {
        worldTitle: "9100 - I see a Skull",
        coordinates: { col: 1, row: 0 },
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "blank" }, { name: "blank" }],
      },
      frames: [
        {
          frameConfig: { items: [], faces: [], creatures: ["dog01", "pup01"] },
          dialogs: [
            '{"dog01" : "A Ball! A Ball!"}',
            '{"pup01" : "We will get a ball!"}',
            '{"dog01" : "A red ball!"}',
            '{"pup01" : "Yes! A red ball!"}',
          ],
        },
        {
          frameConfig: { items: [], faces: [], creatures: ["dog01", "pup01"] },
          dialogs: [
            '{"dog01" : "Look, a cave!"}',
            '{"pup01" : "A cave! A cave!"}',
            '{"dog01" : "Let\'s go in the cave."}',
            '{"pup01" : "In the cave! In the cave!"}',
          ],
        },
        {
          frameConfig: { items: [], faces: [], creatures: ["dog01", "pup01"] },
          dialogs: [
            '{"dog01" : "Woof!"}',
            '{"pup01" : "Woof! Woof!"}',
            '{"dog01" : "Let\'s dig."}',
            '{"pup01" : "Let\'s dig in the cave."}',
          ],
        },
        {
          frameConfig: { items: [], faces: [], creatures: ["dog01", "pup01"] },
          dialogs: [
            '{"dog01" : "Woof Woof!"}',
            '{"pup01" : "What?"}',
            '{"dog01" : "Woof Woof!"}',
            '{"pup01" : "A bone?!?"}',
            '{"dog01" : "Woof!"}',
            '{"pup01" : "Woof Woof!"}',
          ],
        },
      ],
    },
    {
      title: "cave",
      sceneConfig: {
        worldTitle: "9100 - I see a Skull",
        coordinates: { col: 2, row: 0 },
        creatures: ["liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "skull01" }],
      },
      frames: [
        {
          frameConfig: { items: [], faces: [], creatures: ["dog01", "pup01"] },
          dialogs: [
            '{"dog01" : "I got a bone!"}',
            '{"pup01" : "He got a bone!"}',
            '{"dog01" : "Yum. Yum."}',
            '{"dog01" : "Troll Bone."}',
            '{"pup01" : "Yum. Yum."}',
          ],
        },
      ],
    },
    {
      title: "pond",
      sceneConfig: {
        worldTitle: "9100 - I see a Skull",
        coordinates: { col: 2, row: 1 },
        creatures: ["blank", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "pup01" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [{ face: "happy", characterIndex: 1, character: "liz2" }],
            creatures: ["liz2"],
          },
          dialogs: [
            '{"liz2" : "I got a bone."}',
            '{"liz2" : "Doo Do Doo..."}',
            '{"liz2" : "Doo Do Doo..."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [{ character: "liz2", face: "happy", characterIndex: 1 }],
            creatures: ["liz2"],
          },
          dialogs: [
            '{"liz2" : "Hi pup!. Are you lost?"}',
            '{"dog01" : "I got a bone!"}',
            '{"liz2" : "Oooh! Look at that!"}',
            '{"liz2" : "Looks like an old dragon bone!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [{ face: "happy", character: "liz2", characterIndex: 1 }],
            creatures: ["liz2"],
          },
          dialogs: [
            '{"liz2" : "My friend will like this."}',
            '{"dog01" : "Ruff. Ruff."}',
            '{"liz2" : "Come on, pup. Let\'s go find the queen of crazy!"}',
            '{"liz2" : "Look for smoke..."}',
          ],
        },
      ],
    },
    {
      title: "swamp",
      sceneConfig: {
        worldTitle: "9100 - I see a Skull",
        coordinates: { row: 2, col: 2 },
        creatures: ["blank", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "rori" }, { name: "pup01" }, { name: "bag" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [{ face: "happy", character: "liz2", characterIndex: 1 }],
            creatures: ["liz2"],
          },
          dialogs: [
            '{"rori" : "Liz, this skull is very old."}',
            '{"liz2" : "The doggy found it."}',
            '{"rori" : "It is from an old, old dragon."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [{ face: "happy", character: "liz2", characterIndex: 1 }],
            creatures: ["liz2"],
          },
          dialogs: [
            '{"liz2" : "Who is a good doggy?"}',
            '{"pup01" : "Me! Me! Me!"}',
            '{"pup01" : "I\'m a good doggy!"}',
            '{"rori" : "Can you take this bag to the porcupine?"}',
            '{"liz2" : "Sure!"}',
          ],
        },
      ],
    },
    {
      title: "stump",
      sceneConfig: {
        worldTitle: "9100 - I see a Skull",
        coordinates: { col: 1, row: 3 },
        creatures: ["ash01"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "cat01" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [{ characterIndex: 0, face: "kat-happy.9e02afab.png" }],
            creatures: ["pup01", "liz2", "ash01"],
          },
          dialogs: [
            '{"ash01" : "Oh my gosh!"}',
            '{"ash01" : "You are just in time!"}',
            '{"ash01" : "What is in the bag?"}',
          ],
        },
      ],
    },
    {
      title: "tree",
      sceneConfig: {
        worldTitle: "9100 - I see a Skull",
        coordinates: { row: 3, col: 2 },
        creatures: ["liz2"],
        isEndScene: false,
        isStartScene: false,
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [{ characterIndex: 0, character: "pup01" }],
            creatures: ["pup01", "liz2"],
          },
          dialogs: [
            '{"liz2" : "I see a bee."}',
            '{"liz2" : "I see a bee ...in a tree!"}',
            '{"dog01" : "Arf Arf"}',
            '{"liz2" : "It\'s okay Pup, you will beeeeeee okay!"}',
            '{"liz2" : "Ha!"}',
            '{"dog01" : "Arf Arf"}',
          ],
        },
      ],
    },
  ],
  questConfig: {
    pockets: [{ name: "apple" }],
    missions: [
      {
        item: { name: "skull01" },
        name: "Bring the skull to Rori",
        recipient: { name: "rori" },
        rewards: [{ amount: 5, name: "gold" }],
      },
      {
        recipient: { name: "ash01" },
        item: { name: "bag" },
        name: "Give the porcupine a present.",
        rewards: [{ name: "gold", amount: 5 }],
      },
    ],
  },
};
export default story9100;
