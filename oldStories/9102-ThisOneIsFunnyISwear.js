const story9102 = {
  title: "9102-ThisOneIsFunnyISwear",
  scenes: [
    {
      title: "home",
      sceneConfig: {
        worldTitle: "--- test - 002",
        coordinates: { col: 0, row: 0 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: true,
        items: [{ name: "skull01", amount: 1 }],
        subQuestId: 1,
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, character: "liz2", face: "happy" },
              { character: "kat", characterIndex: 0, face: "happy" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Hi. I am Kat."}',
            '{"liz2" : "And I am Liz."}',
            '{"kat" : ""}',
            '{"liz2" : "Look! Look!"}',
            '{"kat" : "What?"}',
            '{"liz2" : "I see a skull!"}',
          ],
        },
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
            '{"kat" : "ummmm.... you see a what?"}',
            '{"liz2" : "I see a skull... and a..."}',
            '{"kat" : ""}',
            '{"liz2" : "What?!! A skull?"}',
            '{"kat" : "I see a skull too..."}',
            '{"liz2" : "Is that weird?"}',
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
            '{"kat" : "Is it weird to see a skull?"}',
            '{"liz2" : "yes."}',
            '{"kat" : "No. I don\'t think so..."}',
            '{"liz2" : "huh?"}',
            '{"kat" : "Wait, is this your first day?"}',
            '{"liz2" : "yup."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", characterIndex: 1, face: "happy" },
              { character: "kat", face: "happy", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Oh. ok. So yes, it is a bit weird..."}',
            '{"liz2" : "Oh good! I thought I was going crazy again..."}',
            '{"kat" : "I mean, it\'s weird... But for this place... it\'s kind of normal."}',
            '{"liz2" : "Oh wow."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, character: "liz2", face: "happy" },
              { character: "kat", face: "happy", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Let\'s take a look at that skull."}',
            '{"liz2" : "It looks like there is an old old ring on the skull."}',
            '{"kat" : "Oh my gosh! It\'s the... the..."}',
            '{"liz2" : "Spit it out Kat!"}',
            '{"kat" : "That\'s the ring of andakar!"}',
            '{"liz2" : "Do what now?"}',
          ],
        },
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
            '{"kat" : "There is no time to explain!"}',
            '{"liz2" : "ok."}',
            '{"kat" : "We have to get this ring to Grimelda!"}',
            '{"liz2" : "What do you mean we? Do you have a mouse in your pocket."}',
            '{"kat" : "We need to hurry!"}',
            '{"liz2" : "And B. Who or what is a Grimelda?"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", face: "happy", characterIndex: 1 },
              { characterIndex: 0, character: "kat", face: "happy" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "The witch. Grimelda is the witch, who lives behind the waterfall!"}',
            '{"liz2" : "Ok. Actually, how about you take it? You seem pretty... uhhhh... what\'s the word..."}',
            '{"kat" : "There is no time to explain..."}',
            '{"liz2" : "...bonkers..."}',
            '{"kat" : "Come with me if you want to live!"}',
            '{"liz2" : "Oh what the heck! You seem fun."}',
          ],
        },
      ],
    },
    {
      title: "taffy01",
      sceneConfig: {
        worldTitle: "--- test - 002",
        coordinates: { row: 0, col: 1 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        triggers: { newFrameSetConditions: { currentMission: 1 } },
        items: [{ name: "empty" }],
        subQuestId: 1,
      },

      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", characterIndex: 1, face: "happy" },
              { characterIndex: 0, face: "happy", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Hi Taffy!"}',
            '{"liz2" : "Taffy: Hi Liz and Kat. I lost my dog."}',
            '{"kat" : "Wow. So sad."}',
            '{"liz2" : "We will look for your dog."}',
            '{"kat" : "Bye Bye."}',
            '{"liz2" : "Taffy. See you later."}',
          ],
        },
      ],
      frames2: [
        {
          dialogs: [
            '{"taffy01" : "You found my dog!"}',
            '{"kat" : "Yes.  Did you see the elf\'s goat?"}',
            '{"taffy01" : "The goat is on the hill."}',
          ],
          frameConfig: {
            items: [],
            creatures: ["kat", "liz2"],
            faces: [
              { characterIndex: 1, character: "liz2", face: "happy" },
              {
                characterIndex: 0,
                face: "kat-happy.9e02afab.png",
                character: "kat",
              },
            ],
          },
        },
      ],
    },
    {
      title: "strawberry01",
      sceneConfig: {
        worldTitle: "--- test - 002",
        coordinates: { row: 0, col: 2 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "empty" }],
        subQuestId: 1,
      },
      frames: [
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
            '{"kat" : "Hi Strawberry. Did you see the dog?"}',
            '{"liz2" : "Strawberry: I saw the dog in the woods."}',
            '{"kat" : "oh good! We will go to the woods."}',
            '{"liz2" : "We will find the dog."}',
            '{"kat" : "Strawberry. Look out for the elf!"}',
            '{"liz2" : "Bye Bye."}',
          ],
        },
      ],
    },
    {
      title: "madElf01",
      sceneConfig: {
        worldTitle: "--- test - 002",
        coordinates: { col: 3, row: 0 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        subQuestId: 1,
        items: [{ name: "empty" }],
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
            '{"kat" : "Hi elf! Can we go to the water fall in your boat?"}',
            '{"liz2" : "Hi elf!"}',
            '{"kat" : "elf: A goat! A goat!"}',
            '{"liz2" : "huh?"}',
            '{"kat" : "elf: I need a goat in my boat!"}',
            '{"liz2" : "That\'s normal..."}',
          ],
        },
      ],
    },
    {
      title: "bog",
      sceneConfig: {
        worldTitle: "--- test - 002",
        coordinates: { row: 0, col: 4 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        triggers: { unlockSceneConditions: { currentMission: 2 } },
        subQuestId: 1,
        items: [{ name: "empty" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", characterIndex: 1, face: "happy" },
              {
                face: "kat-happy.9e02afab.png",
                character: "kat",
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
    },
    {
      title: "waterfall",
      sceneConfig: {
        worldTitle: "--- test - 002",
        coordinates: { col: 5, row: 0 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        subQuestId: 1,
        items: [{ name: "wizard" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", characterIndex: 1, character: "liz2" },
              {
                face: "kat-happy.9e02afab.png",
                character: "kat",
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
    },
    {
      title: "hill",
      sceneConfig: {
        worldTitle: "--- test - 002",
        coordinates: { row: 1, col: 1 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "goat01" }],
        subQuestId: 1,
        triggers: { unlockSceneConditions: { currentMission: 1 } },
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", characterIndex: 1, character: "liz2" },
              {
                character: "kat",
                face: "kat-happy.9e02afab.png",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "test - 100."}',
            '{"liz2" : ""}',
            '{"liz2" : ""}',
            '{"liz2" : ""}',
          ],
        },
      ],
    },
    {
      title: "dog01",
      sceneConfig: {
        worldTitle: "--- test - 002",
        coordinates: { row: 1, col: 3 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "empty" }],
        subQuestId: 1,
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", characterIndex: 1, face: "happy" },
              {
                face: "kat-happy.9e02afab.png",
                character: "kat",
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
    },
    {
      title: "razzleDazzle01",
      sceneConfig: {
        worldTitle: "--- test - 002",
        coordinates: { row: 1, col: 5 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "empty" }],
        subQuestId: 2,
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", face: "happy", characterIndex: 1 },
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
    },
    {
      title: "cave",
      sceneConfig: {
        worldTitle: "--- test - 002",
        coordinates: { col: 6, row: 1 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        subQuestId: 2,
        items: [{ name: "empty" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, character: "liz2", face: "happy" },
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
    },
    {
      title: "zanzibar01",
      sceneConfig: {
        worldTitle: "--- test - 002",
        coordinates: { col: 5, row: 2 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        subQuestId: 2,
        items: [{ name: "empty" }],
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
            '{"kat" : "We can play."}',
            '{"liz2" : ""}',
            '{"liz2" : ""}',
            '{"liz2" : ""}',
          ],
        },
      ],
    },
    {
      title: "dress04",
      sceneConfig: {
        worldTitle: "--- test - 002",
        coordinates: { col: 1, row: 3 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        subQuestId: 2,
        items: [{ name: "empty" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
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
    },
    {
      title: "pond",
      sceneConfig: {
        worldTitle: "--- test - 002",
        coordinates: { col: 3, row: 3 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "empty" }],
        subQuestId: 2,
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, face: "happy", character: "liz2" },
              {
                characterIndex: 0,
                face: "kat-happy.9e02afab.png",
                character: "kat",
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
    },
    {
      title: "gerald01",
      sceneConfig: {
        worldTitle: "--- test - 002",
        coordinates: { row: 3, col: 5 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        subQuestId: 3,
        items: [{ name: "empty" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", characterIndex: 1, character: "liz2" },
              {
                characterIndex: 0,
                face: "kat-happy.9e02afab.png",
                character: "kat",
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
    },
    {
      title: "log",
      sceneConfig: {
        worldTitle: "--- test - 002",
        coordinates: { col: 6, row: 3 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        subQuestId: 3,
        items: [{ name: "empty" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, face: "happy", character: "liz2" },
              {
                face: "kat-happy.9e02afab.png",
                character: "kat",
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
    },
    {
      title: "ringOfZandar01",
      sceneConfig: {
        worldTitle: "--- test - 002",
        coordinates: { col: 0, row: 4 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "empty" }],
        subQuestId: 3,
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, face: "happy", character: "liz2" },
              {
                characterIndex: 0,
                face: "kat-happy.9e02afab.png",
                character: "kat",
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
    },
    {
      title: "zanyDog01",
      sceneConfig: {
        worldTitle: "--- test - 002",
        coordinates: { col: 1, row: 4 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        subQuestId: 3,
        items: [{ name: "empty" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", characterIndex: 1, character: "liz2" },
              {
                characterIndex: 0,
                character: "kat",
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
    },
    {
      title: "ghandi01",
      sceneConfig: {
        worldTitle: "--- test - 002",
        coordinates: { col: 2, row: 4 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        subQuestId: 3,
        items: [{ name: "empty" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
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
    },
    {
      title: "dennisTheMenace",
      sceneConfig: {
        worldTitle: "--- test - 002",
        coordinates: { row: 4, col: 3 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        subQuestId: 3,
        items: [{ name: "empty" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, face: "happy", character: "liz2" },
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
    },
    {
      title: "lucy",
      sceneConfig: {
        worldTitle: "--- test - 002",
        coordinates: { col: 4, row: 4 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        subQuestId: 3,
        items: [{ name: "empty" }],
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
            '{"kat" : "We can play."}',
            '{"liz2" : ""}',
            '{"liz2" : ""}',
            '{"liz2" : ""}',
          ],
        },
      ],
    },
    {
      title: "hill",
      sceneConfig: {
        worldTitle: "--- test - 002",
        coordinates: { row: 4, col: 5 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        subQuestId: 3,
        items: [{ name: "empty" }],
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
            '{"kat" : "We can play."}',
            '{"liz2" : ""}',
            '{"liz2" : ""}',
            '{"liz2" : ""}',
          ],
        },
      ],
    },
    {
      title: "rose01",
      sceneConfig: {
        worldTitle: "--- test - 002",
        coordinates: { col: 1, row: 5 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "empty" }],
        subQuestId: 3,
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
    },
    {
      title: "log",
      sceneConfig: {
        worldTitle: "--- test - 002",
        coordinates: { col: 0, row: 6 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "empty" }],
        subQuestId: 3,
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
    },
    {
      title: "slicerDicer01",
      sceneConfig: {
        worldTitle: "--- test - 002",
        coordinates: { row: 6, col: 1 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "empty" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, face: "happy", character: "liz2" },
              {
                face: "kat-happy.9e02afab.png",
                characterIndex: 0,
                character: "kat",
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
    },
    {
      title: "pantherGirl02",
      sceneConfig: {
        worldTitle: "--- test - 002",
        coordinates: { row: 6, col: 2 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "empty" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, character: "liz2", face: "happy" },
              {
                face: "kat-happy.9e02afab.png",
                characterIndex: 0,
                character: "kat",
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
    },
    {
      title: "pinky01",
      sceneConfig: {
        worldTitle: "--- test - 002",
        coordinates: { row: 6, col: 3 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "empty" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, face: "happy", character: "liz2" },
              {
                characterIndex: 0,
                character: "kat",
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
    },
    {
      title: "donutShop01",
      sceneConfig: {
        worldTitle: "--- test - 002",
        coordinates: { col: 4, row: 6 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "empty" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, character: "liz2", face: "happy" },
              {
                characterIndex: 0,
                face: "kat-happy.9e02afab.png",
                character: "kat",
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
    },
    {
      title: "hippityHop01",
      sceneConfig: {
        worldTitle: "--- test - 002",
        coordinates: { row: 6, col: 5 },
        creatures: ["kat", "liz2"],
        isEndScene: true,
        isStartScene: false,
        items: [{ name: "empty" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", face: "happy", characterIndex: 1 },
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
    },
    {
      title: "end",
      sceneConfig: {
        worldTitle: "--- test - 002",
        coordinates: { row: 6, col: 6 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "empty" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, character: "liz2", face: "happy" },
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
    },
  ],
  questConfig: {
    missions: [
      {
        item: { name: "dog01" },
        rewards: [{ name: "gold", amount: 5 }],
        recipient: { name: "taffy01" },
        name: "Bring the dog to Taffy",
      },
      {
        recipient: { name: "madElf01" },
        item: { name: "goat01" },
        name: "Find a pet for the elf.",
        rewards: [{ name: "gold", amount: 5 }],
      },
      {
        item: { name: "skull01" },
        name: "Bring the skull to Grimelda.",
        rewards: [{ amount: 5, name: "gold" }],
        recipient: { name: "wizard" },
      },
    ],
  },
}
export default story9102
