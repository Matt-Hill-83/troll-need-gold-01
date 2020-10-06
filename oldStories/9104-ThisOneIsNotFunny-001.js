const story9104 = {
  title: "9104-ThisOneIsNotFunny-001",
  scenes: [
    {
      title: "cat01",
      sceneConfig: {
        worldTitle: "--- test - 002",
        coordinates: { col: 0, row: 0 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: true,
        subQuestId: 1,
        items: [{ amount: 1, name: "skull01" }],
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
            '{"kat" : "Hi. I am Kat"}',
            '{"liz2" : "And I am Liz."}',
            '{"kat" : "Tee Hee Hee!"}',
            '{"liz2" : "We will be your pals!"}',
            '{"kat" : ""}',
            '{"liz2" : ""}',
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
            '{"kat" : "Hi kid."}',
            '{"liz2" : "We can see you kid."}',
            '{"kat" : "Yup! We can see you reading this."}',
            '{"liz2" : "I\'m talking to you kid."}',
            '{"kat" : "Did you comb your hair with a chicken bone?"}',
            '{"liz2" : "Oh Snap! That was a good one Kat!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, face: "happy", character: "liz2" },
              { face: "happy", characterIndex: 0, character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "So Kid, what is your name?"}',
            '{"liz2" : "Go on tell us your name."}',
            '{"kat" : "We won\'t turn the page until you do."}',
            '{"liz2" : ""}',
            '{"kat" : ""}',
            '{"liz2" : ""}',
          ],
        },
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
            '{"kat" : "Hi <kid\'s name here>."}',
            '{"liz2" : "Do you like to like to read?"}',
            '{"kat" : "Wait, do you think this is boring?"}',
            '{"liz2" : "Oh, I get it. She doesn\'t like to read."}',
            '{"kat" : "Look at that face."}',
            '{"liz2" : "Wow."}',
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
            '{"kat" : "She looks like she just ate a worm."}',
            '{"liz2" : "yuck!"}',
            '{"kat" : ""}',
            '{"liz2" : "Do you think she eats worms?"}',
            '{"kat" : "She\'s right there, just ask her."}',
            '{"liz2" : "Hey kid!"}',
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
            '{"kat" : "Hey kid! Do you eat worms?"}',
            '{"liz2" : "She\'s laughing. I think that means yes."}',
            '{"kat" : "Wow. This kid is cool."}',
            '{"liz2" : ""}',
            '{"kat" : ""}',
            '{"liz2" : ""}',
          ],
        },
      ],
      frames2: [],
    },
    {
      title: "boomALoo01",
      sceneConfig: {
        worldTitle: "--- test - 002",
        coordinates: { row: 0, col: 1 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        subQuestId: 1,
        items: [{ name: "empty" }],
        triggers: { newFrameSetConditions: { currentMission: 1 } },
      },
      frames: [
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
            '{"kat" : "Ok, kid. Here\'s the deal."}',
            '{"liz2" : "Are your parents making you read this?"}',
            '{"kat" : "Yup."}',
            '{"liz2" : "I thought so."}',
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
            '{"kat" : "So we are going to make this as easy as we can for you."}',
            '{"liz2" : "I see a bee."}',
            '{"kat" : "tee hee hee."}',
            '{"liz2" : "I see a bee in a tree!"}',
            '{"kat" : ""}',
            '{"liz2" : ""}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, face: "happy", character: "liz2" },
              { face: "happy", character: "kat", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "If you like easy words, we can give you easy words."}',
            '{"liz2" : "And we can do hard words too."}',
            '{"kat" : "Do you want easy or hard words."}',
            '{"liz2" : "Ok, easy."}',
            '{"kat" : "I see a dog."}',
            '{"liz2" : "I see a dog and a frog!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", characterIndex: 1, face: "happy" },
              { characterIndex: 0, character: "kat", face: "happy" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Tee Hee Hee."}',
            '{"liz2" : "I see a bee. I see a bee in a tree."}',
            '{"kat" : "Tee Hee Hee."}',
            '{"liz2" : "I see a ball."}',
            '{"kat" : "I see a ball... in the hall."}',
            '{"liz2" : ""}',
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
            '{"kat" : "Wait, you see a ball in a hall?"}',
            '{"liz2" : "Yes, I see a ball in a hall."}',
            '{"kat" : ""}',
            '{"liz2" : ""}',
            '{"kat" : "Do you have peanut butter in your ears?"}',
            '{"liz2" : "Kaaaat!!!"}',
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
            '{"kat" : "What?"}',
            '{"liz2" : "You cant say: "}',
            '{"liz2" : "do you have peanut butter in your ears?"}',
            '{"kat" : "Why? Actually, now that I think about it, that\'s a really good question."}',
            '{"liz2" : "Kaaaaaat!!!!"}',
            '{"kat" : "That would actually explain a lot about you."}',
            '{"liz2" : "Kaaaaaat!!!!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, face: "happy", character: "liz2" },
              { face: "happy", character: "kat", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : ""}',
            '{"liz2" : "Kat you are using big words!"}',
            '{"kat" : "So...."}',
            '{"liz2" : "The kids wants little words."}',
            '{"kat" : "Oh right."}',
            '{"liz2" : "Oops."}',
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
            '{"kat" : "Hi kid. Goo Goo."}',
            '{"liz2" : "There you go Kat."}',
            '{"kat" : "Me eat worm. yum yum!"}',
            '{"liz2" : "Kaaat!!!! You are being gross."}',
            '{"kat" : "Me eat frog. yum yum!"}',
            '{"liz2" : ""}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              { character: "kat", characterIndex: 0, face: "happy" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Ha! Look, the kid laughed!"}',
            '{"liz2" : "Tee Hee Hee!"}',
            '{"kat" : "And look! She laughs when you do that."}',
            '{"liz2" : "But she does now like the word laugh."}',
            '{"kat" : "Nope, when she sees it, her nostrils start to flare."}',
            '{"liz2" : "Cool!"}',
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
            '{"kat" : "I have an idea. Watch this Liz."}',
            '{"liz2" : ""}',
            '{"kat" : "LAUGH"}',
            '{"liz2" : "OMG. She did it."}',
            '{"kat" : ""}',
            '{"liz2" : "When she sees the word LAUGH, her eyes kind of cross."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, face: "happy", character: "liz2" },
              { face: "happy", character: "kat", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Oh my gosh!"}',
            '{"liz2" : "Let\'s think of some other fun things to say!"}',
            '{"kat" : "OK."}',
            '{"liz2" : "And then she has to say them!"}',
            '{"kat" : ""}',
            '{"liz2" : ""}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              { characterIndex: 0, face: "happy", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Oh my gosh, wait."}',
            '{"liz2" : "This is just like that book!"}',
            '{"kat" : "It is."}',
            '{"liz2" : "It totally is."}',
            '{"kat" : ""}',
            '{"liz2" : ""}',
          ],
        },
      ],
      frames2: [
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
            '{"taffy01" : "You found my dog!"}',
            '{"kat" : "Yes. Did you see the elf\'s goat?"}',
            '{"taffy01" : "The goat is on the hill."}',
          ],
        },
      ],
    },
    {
      title: "unicorn",
      sceneConfig: {
        worldTitle: "--- test - 002",
        coordinates: { col: 2, row: 0 },
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
              { characterIndex: 1, face: "happy", character: "liz2" },
              { character: "kat", face: "happy", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "It\'s like that book where you make your parents say all kinds of crazy things!"}',
            '{"liz2" : "Except here, we can say all kind of crazy things!"}',
            '{"kat" : "OMG, say that thing from the book!"}',
            '{"liz2" : "Noooooo! you do it."}',
            '{"kat" : "I don\'t remember it."}',
            '{"liz2" : "Ughhhh!"}',
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
            '{"kat" : "Tell me it..."}',
            '{"liz2" : "My only friend..."}',
            '{"kat" : "OMG, she\'s saying it! She\'s saying it!"}',
            '{"liz2" : "...in the whole wide world..."}',
            '{"kat" : "No way! "}',
            '{"liz2" : ""}',
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
            '{"kat" : "No hecka-frickin way!"}',
            '{"liz2" : "No way! I am not saying the rest!"}',
            '{"kat" : "Liiiiiiz!!! You have to say it. I will be sooooo funny!"}',
            '{"liz2" : "Kat, stop it. Stop that this instant! I am not going to say that!"}',
            '{"kat" : "Wait?"}',
            '{"liz2" : "What?"}',
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
            '{"kat" : "OMG. You are chicken."}',
            '{"liz2" : "No I\'m not!"}',
            '{"kat" : "You are totally chicken!"}',
            '{"liz2" : "Bock Bock Ba-Gock!"}',
            '{"kat" : "Liz is a chicken!"}',
            '{"liz2" : "Kaaaat!!!! Stop that!"}',
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
            '{"kat" : ""}',
            '{"liz2" : "Stop that this instant!"}',
            '{"kat" : "Hey Troll. Liz is a chicken!"}',
            '{"liz2" : "troll01: LIZ IS CHICKEN!"}',
            '{"kat" : "troll02: LIZ chicken!"}',
            '{"liz2" : "Ugggghhhhh!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              { characterIndex: 0, character: "kat", face: "happy" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : ""}',
            '{"liz2" : "I am not chicken!"}',
            '{"kat" : "Then say it!"}',
            '{"liz2" : "Ok I will!"}',
            '{"kat" : ""}',
            '{"liz2" : ""}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { characterIndex: 1, character: "liz2", face: "happy" },
              { characterIndex: 0, character: "kat", face: "happy" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : ""}',
            '{"liz2" : "Fine! I will say it!"}',
            '{"kat" : ""}',
            '{"liz2" : "My only friend..."}',
            '{"kat" : "Liz: ...in the whole wide world..."}',
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
            '{"kat" : ""}',
            '{"liz2" : "...is a hippo named..."}',
            '{"kat" : "Say it Liz!"}',
            '{"liz2" : "troll01: Troll like hippo!"}',
            '{"kat" : "...named..."}',
            '{"liz2" : "oh rats! Now I can\'t remember the name."}',
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
            '{"kat" : "Oh well."}',
            '{"liz2" : "Let\'s go to the log."}',
            '{"kat" : "If you think of it, tell me."}',
            '{"liz2" : "ok"}',
            '{"kat" : ""}',
            '{"liz2" : ""}',
          ],
        },
      ],
      frames2: [],
    },
  ],
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
}
export default story9104
