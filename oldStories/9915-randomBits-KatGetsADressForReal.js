const story9115 = {
  title: "9915-KatGetsADressForReal",
  questConfig: {
    // pockets: { cup: { amount: 1 }, gold: { amount: 5 } },
    missions: [
      {
        name: "Feed a Pig In A Wig",
        rewards: [{ name: "gold", amount: 1 }],
        item: { name: "bun" },
        recipient: { name: "pig" },
      },
      {
        name: "2",
        rewards: [{ name: "gold", amount: 5 }],
        item: { name: "pig" },
        recipient: { name: "troll" },
      },
    ],
  },
  scenes: [
    {
      title: "bog",
      sceneConfig: {
        worldTitle: "Test Map",
        coordinates: { col: 1, row: 1 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [
          { name: "oopsieCat01" },
          { name: "dog01" },
          { name: "pup01" },
          { name: "cat01" },
          { name: "boomALoo01" },
        ],
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
            '{"kat" : "Big day today Liz!  Big day."}',
            '{"kat" : "Liz, today we will stay on task."}',
            '{"kat" : "We can get the dress if we follow the steps."}',
            '{"kat" : "Follow the steps.  Get the dress."}',
            '{"liz2" : "But Kat, what about the singing contest?"}',
            '{"kat" : "Step #1: Give the bun to the pig."}',
            '{"liz2" : "Kat, what about dog01\'s outer space thing?"}',
            '{"kat" : "Bun to the pig."}',
            '{"liz2" : "Kat, what about Happy Time Baby Land?"}',
            '{"kat" : "La! La! La! La! La!"}',
            '{"kat" : "I can\'t hear you Liz!"}',
            '{"kat" : "Follow the steps.  Get to the pig."}',
            '{"kat" : "Get the gold.  Get the dress."}',

            '{"liz2" : "What about Cold Girl\'s lost penguin."}',
            '{"liz2" : "Do we just stop looking for her?"}',
            '{"liz2" : "Is that who we are now Kat?"}',
            '{"liz2" : "Is your heart that cold?"}',
            '{"kat" : "Ummm.... ok calm down Anna of Arendelle."}',
            '{"kat" : "She\'s probably just at the zoo."}',
            '{"liz2" : "Who is at the zoo?"}',
            '{"kat" : "The Penguin.  Cold girl\'s lost penguin. "}',
            '{"kat" : "Focus Liz, focus. "}',
            '{"liz2" : "oh yeah, right"}',
            '{"liz2" : "...gosh you sound like my mom..."}',
            '{"kat" : "Liz you get more distracted than a cat gets"}',
            '{"kat" : "...when it does a triple back flip and lands smack dab in a patch of cat nip."}',
            '{"liz2" : "Sorry, the Anna of Arendale thing kind of threw me for a loop."}',
            '{"liz2" : "Do you think kids will understand the reference?"}',
            '{"kat" : "The graders... for sure.  but these younger kids... I just don\'t know."}',
            '{"liz2" : "Why do you think the penguin is at the zoo? "}',
            '{"kat" : "Think about it Liz, what would you rather eat, some real live dead fish, or cat food from a can?"}',
            '{"kat" : "ooohhhhh... geez, I hate these questions..."}',
            '{"troll01" : "we don\'t say hate"}',
            '{"liz2" : "Ooops. sorry.  These questions are not my favortie."}',
            '{"liz2" : "Can I be excused, please and thank you?"}',
            '{"troll01" : "Three more bites Liz."}',
            '{"liz2" : "But Daaaaaad!"}',
            '{"liz2" : "Wait, cold girl feeds Penny catfood out of a can?"}',
            '{"kat" : "That\'s what I just said."}',
            '{"liz2" : "No you didn\'t, you inferred it."}',
            '{"kat" : "I implied it."}',
            '{"liz2" : "oh thanks,  Ruth Bader Ginsberg"}',
            '{"kat" : "Let\'s go see Rose."}',
            '{"kat" : "You mean that new girl who lives on top of the mountain?"}',
            '{"kat" : "Out in Carcassan?"}',
            '{"kat" : "That place is so chill."}',
            '{"kat" : "Yeah. We better put our parkas on."}',
            '{"liz2" : "We can start fresh on dress quest tomorrow."}',
            '{"liz2" : "We said that yesterday."}',
            '{"liz2" : "It might be part of our process..."}',
            '{"liz2" : "What? Getting distracted all the time?"}',
            '{"liz2" : "It might be ALL of our process..."}',
            '{"kat" : "Tomorrow we will hit it really hard."}',
            '{"liz2" : "Yeah.  Big day tomorrow.  Big day."}',
            '{"liz2" : "Let\'s go to the zoo."}',
            '{"liz2" : "Yeah, we\'ll find some answers at the zoo."}',
          ],
        },
      ],
    },
    {
      title: "hill",
      sceneConfig: {
        worldTitle: "Test Map",
        coordinates: { col: 4, row: 1 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [
          { name: "oopsieCat01" },
          { name: "dog01" },
          { name: "pup01" },
          { name: "cat01" },
          { name: "boomALoo01" },
        ],
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
      title: "castle",
      sceneConfig: {
        worldTitle: "Test Map",
        coordinates: { col: 1, row: 2 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [
          { name: "oopsieCat01" },
          { name: "dog01" },
          { name: "pup01" },
          { name: "cat01" },
          { name: "boomALoo01" },
        ],
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
            '{"liz2" : "Boo Hoo!"}',
            '{"liz2" : "I got a boo boo."}',
            '{"kat" : "You got a Boo boo?"}',
            '{"liz2" : "Yup."}',
            '{"kat" : "Me too!"}',
            '{"kat" : "I got a boo boo too!"}',
            '{"liz2" : "Toodle Loo!"}',
            '{"kat" : "Toodle Loo to you too!"}',
            '{"OTheOwl" : "Hoo! Hoo!"}',
          ],
        },
      ],
    },
    {
      title: "tree",
      sceneConfig: {
        worldTitle: "Test Map",
        coordinates: { col: 2, row: 2 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [
          { name: "oopsieCat01" },
          { name: "dog01" },
          { name: "pup01" },
          { name: "cat01" },
          { name: "boomALoo01" },
        ],
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
      title: "castle",
      sceneConfig: {
        worldTitle: "Test Map",
        coordinates: { col: 3, row: 2 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [
          { name: "oopsieCat01" },
          { name: "dog01" },
          { name: "pup01" },
          { name: "cat01" },
          { name: "boomALoo01" },
        ],
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
      title: "pond",
      sceneConfig: {
        worldTitle: "Test Map",
        coordinates: { col: 4, row: 2 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [
          { name: "oopsieCat01" },
          { name: "dog01" },
          { name: "pup01" },
          { name: "cat01" },
          { name: "boomALoo01" },
        ],
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
      title: "end",
      sceneConfig: {
        worldTitle: "Test Map",
        coordinates: { col: 5, row: 2 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [
          { name: "oopsieCat01" },
          { name: "dog01" },
          { name: "pup01" },
          { name: "cat01" },
          { name: "boomALoo01" },
        ],
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
      title: "barn",
      sceneConfig: {
        worldTitle: "Test Map",
        coordinates: { col: 3, row: 3 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [
          { name: "oopsieCat01" },
          { name: "dog01" },
          { name: "pup01" },
          { name: "cat01" },
          { name: "boomALoo01" },
        ],
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
  ],
}
export default story9115
