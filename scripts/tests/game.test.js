/**
 * @jest-environment jsdom
 */

// Import necessary functions and game object from the game module
const {
  game,
  newGame,
  showScore,
  addTurn,
  lightsOn,
  showTurns,
  playerTurn,
} = require("../game");

// Mock the alert function to prevent it from showing dialog boxes during testing
jest.spyOn(window, "alert").mockImplementation(() => {});

// Set up the HTML document with the contents of index.html before running tests
beforeAll(() => {
  // Read the contents of the HTML file
  let fs = require("fs");
  let fileContents = fs.readFileSync("index.html", "utf-8");
  // Open a new document, write the HTML contents, and close it
  document.open();
  document.write(fileContents);
  document.close();
});

// Test suite for pre-game behavior
describe("pre-game", () => {
  // Test case to ensure that clicking buttons before starting a game doesn't register
  test("clicking buttons before newGame should fail", () => {
    // Arrange: Reset lastButton to ensure no previous button clicks are stored
    game.lastButton = "";
    // Act: Simulate a click on a button before starting a game
    document.getElementById("button2").click();
    // Assert: Ensure that no button click is registered before starting the game
    expect(game.lastButton).toEqual("");
  });
});

// Test suite for game object properties
describe("game object contains correct keys", () => {
  // Test cases to ensure that necessary keys exist in the game object
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
  // Test case to ensure that the choices array contains correct button IDs
  test("choices contain correct ids", () => {
    expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
  });
  test("turnNumber key exists", () => {
    expect("turnNumber" in game).toBe(true);
  });
});

// Test suite for newGame function
describe("newGame works correctly", () => {
  beforeAll(() => {
    // Arrange: Set initial game state
    game.score = 42; // Set initial score
    game.playerMoves = ["button1", "button2"]; // Set initial player moves
    game.currentGame = ["button1", "button2"]; // Set initial AI moves
    // Set the score display to 42
    document.getElementById("score").innerText = "42";
    // Act: Call newGame function to start a new game
    newGame();
  });

  // Test cases to ensure that newGame function resets the game state and initializes a new game
  test("expect data-listener to be true", () => {
    // Assert: Check if data-listener attribute is set to true for all buttons
    const elements = document.getElementsByClassName("circle");
    for (let element of elements) {
      expect(element.getAttribute("data-listener")).toEqual("true");
    }
  });

  test("should set game score to zero", () => {
    // Assert: Check if the game score is reset to zero
    expect(game.score).toEqual(0);
  });
  test("should display 0 for the element with id of score", () => {
    //Assert: Check if the score display is updated to show zero
    expect(document.getElementById("score").innerText).toEqual(0);
  });
  test("should clear the player moves array", () => {
    // Assert: Check if the player moves array is cleared
    expect(game.playerMoves.length).toBe(0);
  });

  test("should add one move to the computer's game array", () => {
    // Assert: Check if the AI's game array has one move added
    expect(game.currentGame.length).toBe(1);
  });
});

// Test suite for gameplay functions
describe("gameplay works correctly", () => {
  beforeEach(() => {
    // Arrange: Set up initial game state before each test
    game.score = 0; // Reset score
    game.currentGame = []; // Reset AI's game array
    game.playerMoves = []; // Reset player's moves array
    // Act: Start a new turn
    addTurn();
  });

  afterEach(() => {
    // Act: Reset game state after each test
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
  });

  // Test cases to ensure that gameplay functions work as expected
  test("addTurn adds a new turn to the game", () => {
    // Act: Add a new turn to the game
    addTurn();
    // Assert: Check if addTurn function adds a new turn to the game
    expect(game.currentGame.length).toBe(2);
  });

  test("should add correct class to light up the buttons", () => {
    // Act: Light up a button
    let button = document.getElementById(game.currentGame[0]);
    lightsOn(game.currentGame[0]);
    // Assert: Check if the correct class is added to light up the buttons
    expect(button.classList).toContain("light");
  });

  test("should toggle turnInProgress to true", () => {
    // Act: Show turns to start AI's turn
    showTurns();
    // Assert: Check if turnInProgress flag is toggled to true during AI's turn
    expect(game.turnInProgress).toBe(true);
  });

  test("showTurns should update game.turnNumber", () => {
    // Arrange: Set the turnNumber to a specific value
    game.turnNumber = 42;
    // Act: Show turns to update turnNumber
    showTurns();
    // Assert: Check if showTurns function updates game.turnNumber correctly
    expect(game.turnNumber).toBe(0);
  });

  test("should increment the score if the turn is correct", () => {
    // Arrange: Simulate player's move matching AI's move
    game.playerMoves.push(game.currentGame[0]);
    // Act: Evaluate player's turn
    playerTurn();
    // Assert: Check if the score is incremented when the player's move matches AI's move
    expect(game.score).toBe(1);
  });

  test("clicking during computer sequence should fail", () => {
    // Act: Show AI's turns
    showTurns();
    // Arrange: Simulate clicking during AI's turn
    game.lastButton = "";
    document.getElementById("button2").click();
    // Assert: Check if clicking during AI's turn doesn't register
    expect(game.lastButton).toEqual("");
  });
});
