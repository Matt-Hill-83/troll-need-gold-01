const story9908 = {
  title: "9908 - new kids on the block",
  scenes: [
    {
      title: "bubbleGirl01",
      sceneConfig: {
        worldTitle: "9908 - new kids on the block",
        coordinates: { col: 0, row: 0 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: true,
        items: [{ name: "trumpetGirl01" }, { name: "sweaterGirl01" }],
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
            '{"sweaterGirl01" : "Could you put a pair of sox in a box?"}',
            '{"trumpetGirl01" : "Could I put a pair of socks in a box?"}',
            '{"trumpetGirl01" : "I could put a pair of socks in a box"}',
            '{"trumpetGirl01" : "with a fox!"}',

            '{"sweaterGirl01" : "I could put a pair of socks in a box"}',
            '{"sweaterGirl01" : "with a fox and an ox"}',
            '{"sweaterGirl01" : "Two ferrets and a family of frogs!"}',
            '{"sweaterGirl01" : "A couple carrots!"}',
            '{"sweaterGirl01" : "And a pair of purple parrots for you parents."}',
            '{"sweaterGirl01" : "And a carriage full of little itty bitty dogs."}',

            '{"kat" : "Wow!  Rappers!"}',
            '{"kat" : "Go talk to them..."}',
            '{"liz2" : "Ok."}',
          ],
        },
      ],
    },
    {
      title: "log",
      sceneConfig: {
        worldTitle: "9908 - new kids on the block",
        coordinates: { col: 1, row: 0 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: true,
        items: [{ name: "trumpetGirl01" }, { name: "sweaterGirl01" }],
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
            '{"liz2" : "um....... hi..."}',
            '{"trumpetGirl01" : "hello"}',
            '{"sweaterGirl01" : "how are you?"}',
            '{"liz2" : "um....... "}',
            '{"liz2" : "I saw a frog."}',
            '{"sweaterGirl01" : "Cool."}',
            '{"trumpetGirl01" : "Tell me more..."}',
            '{"liz2" : "I saw a frog... on a log."}',
            '{"trumpetGirl01" : "You saw a frog on a log?"}',
            '{"sweaterGirl01" : "...a frog on a log?"}',
            '{"liz2" : "Yeah."}',
            '{"sweaterGirl01" : "...mmmmm...hmmmm..."}',
            '{"trumpetGirl01" : "You saw a frog on a log..."}',
            '{"trumpetGirl01" : "But did you see a frog on a log in a bog?"}',
            '{"trumpetGirl01" : "Did you see a frog on a log in the fog?"}',
            '{"sweaterGirl01" : "Or did you see a frog on a log in the not fog?"}',
            '{"sweaterGirl01" : "With a plate of cheesy nachos and a hot dog?"}',
            '{"sweaterGirl01" : "With a goat in a coat in a boat in a moat"}',
            '{"sweaterGirl01" : "with a tote with a bottle full of hot sauce."}',
          ],
        },
      ],
    },
  ],
};
export default story9908;
