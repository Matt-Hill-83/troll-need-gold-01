const story8010 = {
  title: "8010-dogAndPup-002",
  scenes: [
    {
      title: "home",
      sceneConfig: {
        worldTitle: "8010-dogAndPup-002",
        coordinates: { row: 1, col: 1 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, face: "happy", character: "liz2" },
              {
                face: "kat-dismayed.b719035a.png",
                characterIndex: 0,
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: ['{"kat" : "Boo Hoo!"}', '{"kat" : "Boo Hoo Hoo!"}'],
        },
      ],
    },

    {
      title: "log",
      sceneConfig: {
        worldTitle: "8010-dogAndPup-002",
        coordinates: { col: 1, row: 2 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              {
                characterIndex: 1,
                character: "liz2",
                face: "liz-4.481f07e2.png",
              },
              {
                characterIndex: 0,
                face: "kat-sad.cf8672a7.png",
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "Hi Kat!"}',
            '{"kat" : "Hi Liz!"}',
            '{"kat" : "I am sad!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                face: "liz-8.5a65d801.png",
                characterIndex: 1,
                character: "liz2",
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
            '{"liz2" : "You are sad?"}',
            '{"kat" : "Yes! I am soooooo sad!"}',
            '{"liz2" : "Why?"}',
            '{"liz2" : "Why are you soooooooo sad?"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                face: "liz-4.481f07e2.png",
                characterIndex: 1,
                character: "liz2",
              },
              {
                character: "kat",
                characterIndex: 0,
                face: "kat-sad.cf8672a7.png",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Pup Pup is missing!"}',
            '{"liz2" : "Pup Pup is missing?"}',
            '{"kat" : "Liz! Can we find Pup Pup?"}',
            '{"liz2" : "Yes Kat!"}',
            '{"liz2" : "We can find Pup Pup!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                character: "liz2",
                face: "liz-5.6c5f5f4d.png",
                characterIndex: 1,
              },
              {
                characterIndex: 0,
                character: "kat",
                face: "kat-smiling.49647334.png",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "We can look for Pup Pup"}',
            '{"kat" : "at the cup!"}',
            '{"liz2" : "We can look for Pup Pup"}',
            '{"liz2" : "at the cup cup!"}',
            '{"liz2" : "Tee Hee Hee!"}',
            '{"kat" : "ha! Liz you crack me up! up!"}',
          ],
        },
      ],
    },
    {
      title: "cup",
      sceneConfig: {
        worldTitle: "8010-dogAndPup-002",
        coordinates: { col: 2, row: 2 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              {
                character: "liz2",
                face: "liz-19.8fc8800f.png",
                characterIndex: 1,
              },
              {
                characterIndex: 0,
                character: "kat",
                face: "kat-scared.a3316950.png",
              },
            ],
            creatures: ["kat", "liz2", "elf", "log"],
          },
          dialogs: [
            '{"elf" : "DO NOT GO IN THE CAVE!"}',
            '{"liz2" : "I see a dog."}',
            '{"liz2" : "I see a dog... and a log."}',
            '{"kat" : "Liz! That is not a dog."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                face: "liz-2.abafcf11.png",
                character: "liz2",
                characterIndex: 1,
              },
              {
                characterIndex: 0,
                character: "kat",
                face: "kat-cringing.62a27ad4.png",
              },
            ],
            creatures: ["kat", "liz2", "elf", "log"],
          },
          dialogs: [
            '{"elf" : "DO NOT GO IN THE CAVE!"}',
            '{"liz2" : "Hi doggy doggy!"}',
            '{"kat" : "Liiiiizzzzzz!"}',
            '{"kat" : "That is not a dog!"}',
          ],
        },
      ],
    },
    {
      title: "hill",
      sceneConfig: {
        worldTitle: "8010-dogAndPup-002",
        coordinates: { row: 2, col: 3 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "log" }, { name: "babyTroll01" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              {
                face: "liz-23.5a4f9052.png",
                character: "liz2",
                characterIndex: 1,
              },
              {
                characterIndex: 0,
                face: "kat-hurt.b1c80ebb.png",
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"babyTroll01" : "BOO HOO!"}',
            '{"kat" : "oh brother..."}',
            '{"liz2" : "I see a troll!"}',
            '{"babyTroll01" : "<sniff> <sniff>"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                face: "liz-26.792f5b07.png",
                characterIndex: 1,
                character: "liz2",
              },
              {
                character: "kat",
                face: "kat-normal.e1bc2b82.png",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "Oh no!"}',
            '{"liz2" : "Baby Troll, are you sad?"}',
            '{"babyTroll01" : "BABY TROLL NEED MOMMY!"}',
            '{"liz2" : "We can help the troll!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                face: "liz-12.d70620b2.png",
                character: "liz2",
                characterIndex: 1,
              },
              {
                face: "kat-normal.e1bc2b82.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"babyTroll01" : "MOMMY! MOMMY!"}',
            '{"liz2" : "Troll, We will find your mommy!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                characterIndex: 1,
                face: "liz-2.abafcf11.png",
                character: "liz2",
              },
              {
                face: "kat-cringing.62a27ad4.png",
                characterIndex: 0,
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "We can look in the cave!"}',
            '{"kat" : "That sounds super safe."}',
            '{"babyTroll01" : "Goo Goo!"}',
            '{"babyTroll01" : "Gaa Gaa!"}',
          ],
        },
      ],
    },
    {
      title: "lulu01",
      sceneConfig: {
        worldTitle: "8010-dogAndPup-002",
        coordinates: { row: 2, col: 4 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", characterIndex: 1, face: "happy" },
              {
                characterIndex: 0,
                face: "kat-happy.9e02afab.png",
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"lulu01" : "My Choo Choo!"}',
            '{"kat" : "Hi Lulu!"}',
            '{"lulu01" : "Are you mommy?"}',
            '{"liz2" : "Lulu, we will find your mommy!"}',
          ],
        },
      ],
    },
    {
      title: "end",
      sceneConfig: {
        worldTitle: "8010-dogAndPup-002",
        coordinates: { row: 2, col: 5 },
        creatures: ["kat", "liz2"],
        isEndScene: true,
        isStartScene: false,
        items: [
          { name: "babyTroll01" },
          { name: "troll01" },
          { name: "chooChoo01" },
        ],
      },
      frames: [
        {
          frameConfig: {
            items: [
              { name: "babyTroll01" },
              { name: "troll01" },
              { name: "chooChoo01" },
            ],
            faces: [
              { characterIndex: 1, character: "liz2", face: "happy" },
              {
                characterIndex: 0,
                face: "kat-happy.9e02afab.png",
                character: "kat",
              },
            ],
            creatures: ["kat", "liz2", "pup01", "dog01"],
          },
          dialogs: [
            '{"kat" : "I see Pup Pup!"}',
            '{"liz2" : "Yay!"}',
            '{"kat" : "Yay!"}',
            '{"kat" : "Pup Pup made a new friend!"}',
            '{"pup01" : "Bark! Bark!"}',
            '{"dog01" : "Ruff! Ruff!"}',
          ],
        },
      ],
    },
    {
      title: "cave",
      sceneConfig: {
        worldTitle: "8010-dogAndPup-002",
        coordinates: { col: 3, row: 3 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [
          { name: "babyTroll01" },
          { name: "troll01" },
          { name: "chooChoo01" },
        ],
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
            '{"babyTroll01" : "MOMMY"}',
            '{"troll01" : "BABY TROLL"}',
            '{"troll01" : "GIRLS TAKE GIFT"}',
            '{"kat" : "A choo choo... ummmmmm...    ok...."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", characterIndex: 1, face: "happy" },
              { face: "happy", characterIndex: 0, character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "A choo choo!"}',
            '{"kat" : "Wow!  What a lovely gift!"}',
            '{"kat" : "We can go to the bog."}',
            '{"liz2" : "We can go to the bog to look for Pup Pup!."}',
          ],
        },
      ],
    },
  ],
  questConfig: {
    missions: [
      {
        rewards: [{ name: "gold", amount: 5 }],
        recipient: { name: "troll01" },
        name: "Get Baby Troll Home",
        item: { name: "babyTroll01" },
      },
      {
        item: { name: "chooChoo01" },
        rewards: [{ name: "gold", amount: 5 }],
        recipient: { name: "lulu01" },
        name: "Get the Choo Choo to Lu Lu",
      },
    ],
  },
};
export default story8010;
