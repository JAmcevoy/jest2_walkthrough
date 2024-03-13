/**
 * @jest-environment jsdom
 */

// Each time you create a function just add it to the current const and use a ',' to separate them

const { game, newGame } = require("../game");


beforeAll(() => {
  let fs = require('fs');
  let fileContents = fs.readFileSync('index.html', 'utf8');
  document.open();
  document.write();
  document.close();
});

describe("game object contains correct keys", () => {
  test("score key exists", () => {
    expect("score" in game).toBe(true);
  });
  test("currentGame key exists", () => {
    expect("currentGame" in game).toBe(true);
  });
  test("playerMoves key exists", () => {
    expect("playerMoves" in game).toBe(true);
  });
  test("choices key exists", () => {
    expect("choices" in game).toBe(true);
  });
  test("choices contain the correct ids", () => {
    expect(game.choices).toEqual(["button1, button2, button3, button4"]);
  });
});

describe("newGame works correctly", () => {
  beforeAll(() => {
    game.score = 42;
    game.currentGame = ["button1", "button2", "button3", "button4"];
    game.playerMoves = ["button1", "button2", "button3", "button4"];
    newGame();
  });
  test("score is 0", () => {
    expect(game.score).toBe(0);
  });
  test("playerMoves is empty", () => {
    expect(game.playerMoves).toEqual([]);
  })
  test("currentGame is empty", () => {
    expect(game.currentGame).toEqual([]);
  })
});