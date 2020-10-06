const story9902 = {
  title: "9902 - Space Dog",
  scenes: [
    {
      title: "log",
      sceneConfig: {
        worldTitle: "000 - 001",
        coordinates: { row: 0, col: 0 },
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
              { characterIndex: 1, face: "happy", character: "liz2" },
              { face: "happy", character: "kat", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"dog01" : "Hot dog!"}',
            '{"pup01" : "Hot diggety dog!"}',
            '{"dog01" : "Hot diggety ding dong!"}',
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
            '{"dog01" : "Ding! Dong!"}',
            '{"dog01" : "Ping Pong!"}',
            '{"pup01" : "Arf! Arf!"}',
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
            '{"dog01" : "Hi Liz."}',
            '{"pup01" : "Hi Kat!"}',
            '{"dog01" : "You have a dog!"}',
            '{"pup01" : "I have a new dog!"}',
            '{"dog01" : "You have two dogs!"}',
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
            '{"pup01" : "Two dogs!"}',
            '{"pup01" : "New dogs!"}',
            '{"dog01" : "Tee Hee Hee!"}',
            '{"pup01" : "Tee Hee Hee!"}',
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
            '{"dog02" : "Hot diggety ding dong!"}',
            '{"dog02" : "Hot piggety ping pong!"}',
            '{"dog02" : "diggety ding dang dong!"}',
          ],
        },
      ],
    },
    {
      title: "stump",
      sceneConfig: {
        worldTitle: "000 - 001",
        coordinates: { row: 0, col: 1 },
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
              { characterIndex: 1, face: "happy", character: "liz2" },
              { face: "happy", character: "kat", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"dog01" : "Wait!"}',
            '{"dog01" : "Humans?"}',
            '{"dog01" : "Are you girls Humans???"}',
            '{"kat" : "...ummmmm..."}',

            '{"kat" : "...I don\'t know..."}',
            '{"dog01" : "You speak human?!?"}',
            '{"liz2" : "...soooo...maybe..."}',
            '{"kat" : "...It\'s never come up..."}',

            '{"dog01" : "Humans!"}',
            '{"dog01" : "Wait, we can test..."}',
            '{"dog01" : "Can you go on the Bouncin\' Boogie ride at the fair, with no grown up?"}',
            '{"liz2" : "Ummmm, hello small purple doggy, I\'m six years old..."}',
            '{"liz2" : "...they let me go on the Silly Sliders"}',

            '{"dog01" : "Oh, thank you Zorblat!"}',
            '{"dog01" : "Thank you!"}',
            '{"dog01" : "Thank you!"}',
            '{"dog01" : "Thank you Zorblat!"}',

            '{"kat" : "Oh brother..."}',
            '{"kat" : "...here we go again..."}',
            '{"dog01" : "Thank you!"}',
            '{"dog01" : "Thank you Zorblat!"}',
            '{"dog01" : "You\'ve gotten all my letters!"}',
            '{"dog01" : "We are saved!"}',
            '{"dog01" : "We are saved!"}',

            '{"liz2" : "Hot dog?!?"}',
            '{"liz2" : "What in the world are you jabbering about?"}',
            '{"dog01" : "Now we can get the lava diamond from the volcano and fix the space ship!"}',
            '{"dog01" : "And use the tractor beam to stop the Sneetches from invading!"}',

            '{"liz2" : "Wow hot dog!  Slow down pal."}',
            '{"liz2" : "Hot Dog, did you eat your script again this morning?"}',
            '{"dog01" : "No!"}',
            '{"dog01" : "No, no no!"}',
            '{"dog01" : "This is for real."}',

            '{"dog01" : "The ship is real, the lava is real."}',
            '{"dog01" : "And the invasion will be real too if we don\'t find a way to steal the Lava Diamond from Mount Dracmore."}',
            '{"kat" : "Oh brother..."}',
            '{"liz2" : "You are so adorable..."}',

            '{"dog01" : "This is not a drill!"}',
            '{"dog01" : "Wait, is that the ring of Zandar?"}',
            '{"dog01" : "I\'ll show you."}',
            '{"dog01" : "Stand back..."}',

            '{"dog01" : "By the power of Andakar..."}',
            '{"dog01" : "I summon the lava monster!"}',
            '{"kat" : "Oh brother..."}',
            '{"cricket01" : "....crick...eet..."}',
            '{"cricket01" : "....crick...eet..."}',

            '{"dog01" : "By the power of Andakar..."}',
            '{"cricket01" : "....crick...eet..."}',
            '{"cricket01" : "....crick...eet..."}',
            '{"pup02" : "Arf! Arf!"}',

            '{"kat" : "I say let\'s run with it..."}',
            '{"kat" : "He\'s on to something here... "}',
            '{"liz2" : "<flip> <flip> <flip>"}',
            '{"liz2" : "It sure beats frog on a log..."}',
          ],
        },
      ],
    },
  ],
  questConfig: { data: "none" },
}
export default story9902
