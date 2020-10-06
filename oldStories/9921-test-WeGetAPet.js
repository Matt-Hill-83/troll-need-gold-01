const story9921 = {
  title: "9921 - WeGetAPet - 001",
  questConfig: {
    missions: [
      {
        recipient: { name: "taffy01" },
        rewards: [{ name: "gold", amount: 5 }],
        item: { name: "dog01" },
        name: "Bring the dog to Taffy",
      },
      {
        item: { name: "goat01" },
        rewards: [{ name: "gold", amount: 5 }],
        recipient: { name: "madElf01" },
        name: "Find a pet for the elf.",
      },
      {
        recipient: { name: "wizard" },
        rewards: [{ name: "gold", amount: 5 }],
        item: { name: "skull01" },
        name: "Bring the skull to Grimelda.",
      },
    ],
  },
  scenes: [
    {
      title: "dress02",
      sceneConfig: {
        worldTitle: "----WeGetAPet - 001",
        coordinates: { row: 0, col: 2 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "cup" }, { name: "pig" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              { face: "happy", character: "kat", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "I see a dress."}',
            '{"liz2" : "I see a very pretty dress."}',
            '{"kat" : "Let\'s take it."}',
            '{"liz2" : "Are you crazy???"}',
            '{"kat" : "What? We take everything else..."}',
            '{"liz2" : "good point."}',
          ],
        },
      ],
      frames2: [],
    },
    {
      title: "dress08",
      sceneConfig: {
        worldTitle: "----WeGetAPet - 001",
        coordinates: { col: 5, row: 0 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "dog01" }, { name: "pup01" }],
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
            '{"kat" : "Goo! Goo! Ga! Ga!"}',
            '{"liz2" : "We want pretty dress!"}',
            '{"kat" : "Let\'s take it."}',
            '{"liz2" : "Kat! We are not criminals!"}',
            '{"kat" : "You stole that bun."}',
            '{"liz2" : "It\'s not the same!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", characterIndex: 1, character: "liz2" },
              { face: "happy", characterIndex: 0, character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "You are a bun robber!"}',
            '{"liz2" : "Am not!"}',
            '{"kat" : ""}',
            '{"liz2" : ""}',
            '{"kat" : ""}',
            '{"liz2" : ""}',
          ],
        },
      ],
      frames2: [],
    },
    {
      title: "home",
      sceneConfig: {
        worldTitle: "----WeGetAPet - 001",
        coordinates: { col: 0, row: 1 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: true,
        items: [{ name: "cup" }, { name: "pig" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, face: "happy", character: "liz2" },
              { characterIndex: 0, character: "kat", face: "happy" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "My name is Kat."}',
            '{"liz2" : "And my name is Liz!"}',
            '{"kat" : "Tee Hee Hee!"}',
            '{"liz2" : "Tee Hee Hee!"}',
            '{"kat" : ""}',
            '{"liz2" : ""}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", characterIndex: 1, character: "liz2" },
              { characterIndex: 0, face: "happy", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Today, we will do small words."}',
            '{"liz2" : "Tiny words."}',
            '{"kat" : "Itsy Bitsy words."}',
            '{"liz2" : "Teeny Weeny words."}',
            '{"kat" : ""}',
            '{"liz2" : ""}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", characterIndex: 1, face: "happy" },
              { face: "happy", character: "kat", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "I see a cow."}',
            '{"liz2" : "Moo cow, moo!"}',
            '{"kat" : "I can moo too!"}',
            '{"liz2" : "Moo moo moo."}',
            '{"kat" : ""}',
            '{"liz2" : ""}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", face: "happy", characterIndex: 1 },
              { characterIndex: 0, face: "happy", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "I see a moon!"}',
            '{"liz2" : "I see a moon too!"}',
            '{"kat" : "I see a moon and a ballon!"}',
            '{"liz2" : "And a raccoon!"}',
            '{"kat" : "<images not found>"}',
            '{"liz2" : ""}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", face: "happy", characterIndex: 1 },
              { character: "kat", characterIndex: 0, face: "happy" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "I see a raccoon... on the moon."}',
            '{"liz2" : "I see a raccoon... on the moon too!"}',
            '{"kat" : ""}',
            '{"liz2" : "And a big balloon!"}',
            '{"kat" : "I do not see a balloon."}',
            '{"liz2" : ""}',
          ],
        },
      ],
      frames2: [],
    },
    {
      title: "uniBow01",
      sceneConfig: {
        worldTitle: "----WeGetAPet - 001",
        coordinates: { row: 1, col: 1 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "bat" }, { name: "pig" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", characterIndex: 1, character: "liz2" },
              { character: "kat", face: "happy", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "I want a pet."}',
            '{"liz2" : "I want a pet too!"}',
            '{"kat" : "Let\'s get 2 pets!"}',
            '{"liz2" : "One for me... and one for you!"}',
            '{"kat" : ""}',
            '{"liz2" : ""}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, face: "happy", character: "liz2" },
              { characterIndex: 0, character: "kat", face: "happy" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "I want a unicorn."}',
            '{"liz2" : "A unicorn?"}',
            '{"kat" : "Yes, a bat."}',
            '{"liz2" : "You want a unicorn for a pet?"}',
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
            '{"kat" : "A unicorn is a good pet."}',
            '{"liz2" : "...if you are a princess."}',
            '{"kat" : "A unicorn is a good pet for a kid."}',
            '{"liz2" : "No no no...."}',
            '{"kat" : ""}',
            '{"liz2" : "A unicorn is a bad pet."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", face: "happy", characterIndex: 1 },
              { face: "happy", character: "kat", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "No way."}',
            '{"liz2" : "Way."}',
            '{"kat" : ""}',
            '{"liz2" : "A cat is a good pet."}',
            '{"kat" : "A cat? Yes, cats are good too."}',
            '{"liz2" : ""}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", face: "happy", characterIndex: 1 },
              { character: "kat", face: "happy", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "What are we talking about?"}',
            '{"liz2" : "I have no idea."}',
            '{"kat" : "Let\'s go get dresses."}',
            '{"liz2" : "Yes, let\'s get dresses."}',
            '{"kat" : ""}',
            '{"liz2" : ""}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", characterIndex: 1, character: "liz2" },
              { characterIndex: 0, face: "happy", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "...and a unicorn!"}',
            '{"liz2" : "Kaaaaat!!!"}',
            '{"kat" : ""}',
            '{"liz2" : ""}',
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
        worldTitle: "----WeGetAPet - 001",
        coordinates: { col: 2, row: 1 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "cup" }, { name: "pig" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, character: "liz2", face: "happy" },
              { face: "happy", character: "kat", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Look Look! I see a troll!"}',
            '{"liz2" : "You see a troll?"}',
            '{"kat" : "It is a baby troll!"}',
            '{"liz2" : "Hi baby troll!"}',
            '{"kat" : "baby troll: Goo Goo"}',
            '{"liz2" : ""}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", characterIndex: 1, character: "liz2" },
              { face: "happy", characterIndex: 0, character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Baby troll, are you lost?"}',
            '{"liz2" : "Oh no! Are you lost?"}',
            '{"kat" : "baby troll: BABY TROLL WANT MOMMY!"}',
            '{"liz2" : "So sad."}',
            '{"kat" : "We can help find your mom!"}',
            '{"liz2" : "baby troll: BOO HOO!"}',
          ],
        },
      ],
      frames2: [],
    },
    {
      title: "trumpetGirl01",
      sceneConfig: {
        worldTitle: "----WeGetAPet - 001",
        coordinates: { row: 1, col: 3 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "cup" }, { name: "pig" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", face: "happy", characterIndex: 1 },
              { characterIndex: 0, face: "happy", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "I see Trumpet Girl!"}',
            '{"liz2" : "Hi Trumpet Girl!"}',
            '{"kat" : "trumpet girl: Toot! Toot!"}',
            '{"liz2" : "car: Beep! Beep!"}',
            '{"kat" : "cow: Moo Moo Moooooooooo!"}',
            '{"liz2" : ""}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", face: "happy", characterIndex: 1 },
              { face: "happy", character: "kat", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "cat: meow! meow!"}',
            '{"liz2" : "dog: bark! bark!"}',
            '{"kat" : ""}',
            '{"liz2" : ""}',
            '{"kat" : ""}',
            '{"liz2" : ""}',
          ],
        },
      ],
      frames2: [],
    },
    {
      title: "cat01",
      sceneConfig: {
        worldTitle: "----WeGetAPet - 001",
        coordinates: { col: 4, row: 1 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "cup" }, { name: "pig" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", face: "happy", characterIndex: 1 },
              {
                characterIndex: 0,
                face: "kat-silly.57a8c5ca.png",
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "I see a cat."}',
            '{"liz2" : "I see a cat and a hat!"}',
            '{"kat" : "Tee Hee Hee!"}',
            '{"liz2" : ""}',
            '{"kat" : ""}',
            '{"liz2" : ""}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                character: "liz2",
                face: "liz-26.792f5b07.png",
                characterIndex: 1,
              },
              { face: "happy", characterIndex: 0, character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : ""}',
            '{"liz2" : "I see a helicopter."}',
            '{"kat" : "That\'s normal..."}',
            '{"liz2" : ""}',
            '{"kat" : "Let\'s take it."}',
            '{"liz2" : "What?"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                character: "liz2",
                face: "liz-10.578917c1.png",
                characterIndex: 1,
              },
              { face: "happy", character: "kat", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Let\'s take the helicopter."}',
            '{"liz2" : "Are you crazy?"}',
            '{"kat" : "Is that a trick question?"}',
            '{"liz2" : "Kat, you have gone mad!"}',
            '{"kat" : "What?"}',
            '{"liz2" : "I will not steal a helicopter!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                characterIndex: 1,
                face: "liz-25.7f6c8c15.png",
                character: "liz2",
              },
              { face: "happy", character: "kat", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "You stole the bun!"}',
            '{"liz2" : "That was a bun!"}',
            '{"kat" : "You still stole it."}',
            '{"liz2" : "I gave it to the pig!"}',
            '{"kat" : ""}',
            '{"liz2" : "And it was on the ground!"}',
          ],
        },
      ],
      frames2: [],
    },
    {
      title: "frogGirl01",
      sceneConfig: {
        worldTitle: "----WeGetAPet - 001",
        coordinates: { col: 5, row: 1 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "log" }, { name: "pig" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", face: "happy", characterIndex: 1 },
              { character: "kat", characterIndex: 0, face: "happy" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "I see a frog!"}',
            '{"liz2" : "That is not a frog."}',
            '{"kat" : "What is it?"}',
            '{"liz2" : "It is a frog girl."}',
            '{"kat" : ""}',
            '{"liz2" : ""}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", face: "happy", characterIndex: 1 },
              { face: "happy", character: "kat", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "What is the difference?"}',
            '{"liz2" : "One is a girl."}',
            '{"kat" : ""}',
            '{"liz2" : "And one is a frog."}',
            '{"kat" : "That\'s easy to remember."}',
            '{"liz2" : ""}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", characterIndex: 1, character: "liz2" },
              { face: "happy", characterIndex: 0, character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Say hi to the frog girl."}',
            '{"liz2" : "No Way! I\'m scared."}',
            '{"kat" : "Ask her if she has frog powers."}',
            '{"liz2" : "What?"}',
            '{"kat" : "Frog powers"}',
            '{"liz2" : "Frogs do not have powers!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", face: "happy", characterIndex: 1 },
              { face: "happy", character: "kat", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Yes they do."}',
            '{"liz2" : "What?"}',
            '{"kat" : "Jumping!"}',
            '{"liz2" : "Good point."}',
            '{"kat" : "And turning from a tadpole into a frog."}',
            '{"liz2" : "That is a good power."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", face: "happy", characterIndex: 1 },
              { face: "happy", characterIndex: 0, character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "I turned into a frog once."}',
            '{"liz2" : "Did you sit on a log?"}',
            '{"kat" : "Yes."}',
            '{"liz2" : "Was it nice."}',
            '{"kat" : "It was a nice log."}',
            '{"liz2" : ""}',
          ],
        },
      ],
      frames2: [],
    },
    {
      title: "dress05",
      sceneConfig: {
        worldTitle: "----WeGetAPet - 001",
        coordinates: { col: 3, row: 2 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "frogGirl01" }, { name: "pig" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
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
      title: "lulu01",
      sceneConfig: {
        worldTitle: "----WeGetAPet - 001",
        coordinates: { col: 5, row: 2 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "cup" }, { name: "pig" }],
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
            '{"kat" : "Hi LuLu!"}',
            '{"liz2" : "LuLu. Do you like Froot Loops!"}',
            '{"kat" : "Lulu: Yes, I do!"}',
            '{"liz2" : ""}',
            '{"kat" : ""}',
            '{"liz2" : ""}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, face: "happy", character: "liz2" },
              { characterIndex: 0, character: "kat", face: "happy" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Lulu: Boo Hoo!"}',
            '{"liz2" : "Are you sad?"}',
            '{"kat" : "Lulu: I got a boo boo!"}',
            '{"liz2" : ""}',
            '{"kat" : "Lulu: And I lost my choo choo."}',
            '{"liz2" : "The poo poo choo choo?"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              { character: "kat", face: "happy", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Lulu: Yes. I lost the poo poo choo choo."}',
            '{"liz2" : "Boo Hoo!"}',
            '{"kat" : "I am sad too."}',
            '{"liz2" : ""}',
            '{"kat" : "I will look for the poo poo choo choo."}',
            '{"liz2" : "Me too!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", characterIndex: 1, character: "liz2" },
              { face: "happy", character: "kat", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Who ever took the poo poo choo choo"}',
            '{"liz2" : "...is in deep doo doo!"}',
            '{"kat" : "Tee Hee Hee"}',
            '{"liz2" : "Ha ha!"}',
            '{"kat" : "troll01: Ha Ha! Hoo Hoo!"}',
            '{"liz2" : ""}',
          ],
        },
      ],
      frames2: [],
    },
    {
      title: "castle",
      sceneConfig: {
        worldTitle: "----WeGetAPet - 001",
        coordinates: { col: 6, row: 2 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "dress04" }, { name: "dress06" }],
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
            '{"kat" : "Goo Goo! Gaa Gaa!"}',
            '{"liz2" : "Me want pretty dress!"}',
            '{"kat" : ""}',
            '{"liz2" : ""}',
            '{"kat" : ""}',
            '{"liz2" : ""}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", characterIndex: 1, character: "liz2" },
              { characterIndex: 0, character: "kat", face: "happy" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "We got dresses!"}',
            '{"liz2" : "We win!"}',
            '{"kat" : ""}',
            '{"liz2" : ""}',
            '{"kat" : ""}',
            '{"liz2" : ""}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", face: "happy", characterIndex: 1 },
              { character: "kat", face: "happy", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "I want more dresses."}',
            '{"liz2" : "Me too!"}',
            '{"kat" : "...and candy."}',
            '{"liz2" : "...and TV."}',
            '{"kat" : "...and a unicorn."}',
            '{"liz2" : ""}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                face: "liz-20.5a422291.png",
                characterIndex: 1,
                character: "liz2",
              },
              {
                characterIndex: 0,
                face: "kat-silly.57a8c5ca.png",
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : ""}',
            '{"liz2" : "Kaaaaaat!!!"}',
            '{"kat" : ""}',
            '{"liz2" : "You are not getting a unicorn!"}',
            '{"kat" : "Too late!"}',
            '{"liz2" : ""}',
          ],
        },
      ],
      frames2: [],
    },
  ],
}
export default story9921
